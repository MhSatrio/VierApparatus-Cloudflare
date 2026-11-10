// Local SEO crawler. Mimics the checks in the Ahrefs report: title/description length, JSON-LD validity,
// orphan pages (zero incoming internal <a> links) and click depth. It crawls a RUNNING server (build + start first).
//   node scripts/seo-audit.mjs [baseUrl] [label]      e.g. node scripts/seo-audit.mjs http://localhost:3000 after
// Output: console summary + .tmp/seo-audit-<label>.json (with sample URLs per issue).
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const label = process.argv[3] ?? "run";
// --strict: ignore every link that sits on an /sitemap-html page, to measure the catalogue's own link structure.
const STRICT = process.argv.includes("--strict");
const CONCURRENCY = 20;
const TITLE_MAX = 60;
const DESC_MIN = 120;
const DESC_MAX = 160; // Ahrefs flags > 160 as too long

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));

async function get(url, tries = 3) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, { redirect: "manual", signal: AbortSignal.timeout(30000) });
      const type = res.headers.get("content-type") ?? "";
      return { status: res.status, type, text: type.includes("html") || type.includes("xml") ? await res.text() : "" };
    } catch (e) {
      if (i === tries - 1) return { status: 0, type: "", text: "", error: String(e) };
    }
  }
}

// ---- 1. seeds from the sitemap(s)
async function sitemapUrls() {
  const out = new Set();
  const queue = [`${base}/sitemap.xml`];
  const seen = new Set();
  while (queue.length) {
    const u = queue.shift();
    if (seen.has(u)) continue;
    seen.add(u);
    const r = await get(u);
    if (r.status !== 200) {
      console.warn("sitemap fetch failed:", u, r.status);
      continue;
    }
    const locs = [...r.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decode(m[1]));
    if (/<sitemapindex/.test(r.text)) {
      for (const l of locs) queue.push(l.replace(/^https?:\/\/[^/]+/, base));
    } else {
      for (const l of locs) out.add(new URL(l).pathname + new URL(l).search);
    }
  }
  return out;
}

const contactQueryUrls = new Set(); // /contact?product=... links: counted, not fetched (they are on-demand pages)
const norm = (href, from) => {
  try {
    const u = new URL(href, `${base}${from}`);
    if (u.origin !== base && u.host !== "vierapparatus.com" && u.host !== "www.vierapparatus.com") return null;
    if (/^\/(api|_next)\//.test(u.pathname) || /\.(png|jpe?g|webp|avif|svg|ico|css|js|txt|xml|pdf)$/i.test(u.pathname)) return null;
    let p = u.pathname.replace(/\/+$/, "") || "/";
    if (p === "/contact" && u.search) {
      contactQueryUrls.add(u.search);
      return null;
    }
    return p + u.search;
  } catch {
    return null;
  }
};

function analyse(html, path) {
  const title = decode((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "").trim());
  const metaTag = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i) ?? html.match(/<meta\s+content="([^"]*)"\s+name="description"/i);
  const desc = metaTag ? decode(metaTag[1]).trim() : "";
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/i)?.[1] ?? "";
  const robots = html.match(/<meta name="robots" content="([^"]*)"/i)?.[1] ?? "";
  const links = new Set();
  for (const m of html.matchAll(/<a\s[^>]*?href="([^"]+)"/gi)) {
    const n = norm(decode(m[1]), path);
    if (n) links.add(n);
  }
  const ld = [];
  const ldIssues = [];
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    let data;
    try {
      data = JSON.parse(m[1]);
    } catch {
      ldIssues.push("jsonld.invalid-json");
      continue;
    }
    for (const node of Array.isArray(data) ? data : [data]) {
      ld.push(node["@type"]);
      if (node["@type"] === "Product") {
        if (!node.name) ldIssues.push("product.missing-name");
        const imgs = [].concat(node.image ?? []);
        if (!imgs.length) ldIssues.push("product.missing-image");
        else if (imgs.some((i) => typeof i !== "string" || !/^https?:\/\//.test(i))) ldIssues.push("product.image-not-absolute-url");
        if (/placeholder/i.test(imgs.join(" "))) ldIssues.push("product.placeholder-image");
        if (!node.sku && !node.mpn && !node.gtin) ldIssues.push("product.missing-identifier");
        if (!node.brand) ldIssues.push("product.missing-brand");
        // Google's Product snippet rule: name + at least one of offers / review / aggregateRating.
        if (!node.offers && !node.review && !node.aggregateRating) ldIssues.push("product.needs-offers-review-or-rating");
        for (const o of [].concat(node.offers ?? [])) {
          if (o.price === undefined && !o.priceSpecification) ldIssues.push("offer.missing-price");
          if (!o.priceCurrency && !o.priceSpecification?.priceCurrency) ldIssues.push("offer.missing-priceCurrency");
        }
      }
      if (node["@type"] === "BreadcrumbList") {
        for (const it of node.itemListElement ?? []) {
          if (!it.name || !it.position) ldIssues.push("breadcrumb.missing-name-or-position");
        }
      }
    }
  }
  return { title, desc, canonical, robots, links, ld, ldIssues };
}

// ---- 2. crawl (BFS from "/" plus all sitemap URLs as additional nodes)
const seeds = await sitemapUrls();
console.log(`sitemap URLs: ${seeds.size}`);

const pages = new Map(); // path -> summary
const inlinks = new Map(); // path -> Set of source paths count (stored as number)
const depth = new Map([["/", 0]]);
const queue = ["/"];
const queued = new Set(["/"]);

let active = 0;
let fetched = 0;
const statuses = {};
const pending = [...seeds].filter((s) => !queued.has(s));

async function worker() {
  while (true) {
    let path = queue.shift();
    let viaLinks = true;
    if (!path) {
      path = pending.shift();
      viaLinks = false;
    }
    if (!path) {
      if (active === 0 && queue.length === 0 && pending.length === 0) return;
      await new Promise((r) => setTimeout(r, 25));
      continue;
    }
    if (pages.has(path)) continue;
    active++;
    const r = await get(base + path);
    active--;
    fetched++;
    statuses[r.status] = (statuses[r.status] ?? 0) + 1;
    if (fetched % 1000 === 0) console.log(`  crawled ${fetched} (queue ${queue.length}, pending ${pending.length})`);
    if (r.status !== 200 || !r.type.includes("html")) {
      pages.set(path, { status: r.status });
      continue;
    }
    const a = analyse(r.text, path);
    pages.set(path, { status: 200, ...a, links: undefined, linkCount: a.links.size });
    for (const l of a.links) {
      if (l === path) continue;
      if (STRICT && path.startsWith("/sitemap-html")) continue;
      inlinks.set(l, (inlinks.get(l) ?? 0) + 1);
      if (!depth.has(l) && viaLinks !== undefined && depth.has(path)) {
        depth.set(l, depth.get(path) + 1);
        if (!queued.has(l)) {
          queued.add(l);
          queue.push(l);
        }
      }
    }
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));

// ---- 3. report
const ok = [...pages.entries()].filter(([, v]) => v.status === 200);
const sample = (arr, n = 5) => arr.slice(0, n);
const bucket = {};
const add = (k, p) => (bucket[k] ??= []).push(p);

const titleSeen = new Map();
const descSeen = new Map();
for (const [p, v] of ok) {
  const isIndexable = !/noindex/i.test(v.robots);
  if (!v.title) add("title.missing", p);
  else if (v.title.length > TITLE_MAX) add("title.too-long", p);
  if (!v.desc) add("description.missing", p);
  else if (v.desc.length < DESC_MIN) add("description.too-short", p);
  else if (v.desc.length > DESC_MAX) add("description.too-long", p);
  if (isIndexable) {
    if (!v.canonical) add("canonical.missing", p);
    titleSeen.set(v.title, [...(titleSeen.get(v.title) ?? []), p]);
    descSeen.set(v.desc, [...(descSeen.get(v.desc) ?? []), p]);
  }
  for (const i of new Set(v.ldIssues)) add(i, p);
}
for (const [t, ps] of titleSeen) if (t && ps.length > 1) for (const p of ps) add("title.duplicate", p);
for (const [d, ps] of descSeen) if (d && ps.length > 1) for (const p of ps) add("description.duplicate", p);

const sitemapList = [...seeds];
const orphans = sitemapList.filter((p) => !(inlinks.get(p) > 0));
const unreachable = sitemapList.filter((p) => !depth.has(p));
const depths = sitemapList.map((p) => depth.get(p)).filter((d) => d !== undefined);
const maxDepth = depths.length ? Math.max(...depths) : null;
const over3 = depths.filter((d) => d > 3).length;
const over10 = depths.filter((d) => d > 10).length;

const summary = {
  label,
  base,
  strictModeIgnoringHtmlSitemap: STRICT,
  crawledPages: pages.size,
  statuses,
  distinctContactQueryUrlsLinked: contactQueryUrls.size,
  sitemapUrls: sitemapList.length,
  orphanPages_noIncomingLinks: orphans.length,
  sitemapPages_unreachableFromHome: unreachable.length,
  maxClickDepth: maxDepth,
  sitemapPagesDeeperThan3Clicks: over3,
  sitemapPagesDeeperThan10Clicks: over10,
  issueCounts: Object.fromEntries(Object.entries(bucket).map(([k, v]) => [k, v.length]).sort()),
  samples: Object.fromEntries(Object.entries(bucket).map(([k, v]) => [k, sample(v)])),
  orphanSamples: sample(orphans, 10),
  unreachableSamples: sample(unreachable, 10),
  longestTitles: ok.filter(([, v]) => v.title).sort((a, b) => b[1].title.length - a[1].title.length).slice(0, 3).map(([p, v]) => `${v.title.length}: ${p}`),
};
const out = fileURLToPath(new URL(`../.tmp/seo-audit-${label}.json`, import.meta.url));
fs.mkdirSync(fileURLToPath(new URL("../.tmp/", import.meta.url)), { recursive: true });
fs.writeFileSync(out, JSON.stringify(summary, null, 2));
const printable = Object.fromEntries(Object.entries(summary).filter(([k]) => !["samples", "orphanSamples", "unreachableSamples", "longestTitles"].includes(k)));
console.log(JSON.stringify(printable, null, 2));
console.log("saved", out);
