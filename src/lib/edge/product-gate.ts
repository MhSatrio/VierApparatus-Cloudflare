/**
 * Fast-fail for product addresses, used by custom-worker.ts BEFORE Next.js runs.
 *
 * Why: the retired procurement catalogue left many /products/<slug> addresses in search and SEO tools. Crawlers still request them
 * (in the 2026-11-14 logs, 364 of 878 requests were such dead addresses). Answering one of them through Next.js costs a full server render plus four database round trips, about 100 to
 * 1,000 ms of CPU, and the free Workers plan allows 10 ms. This module asks Turso ONE tiny question ("is this slug a published
 * product, or an old address of one?") over its HTTP API, using nothing but fetch, so a dead address costs about 1 ms of CPU and
 * one round trip, and the 404 it produces is cacheable.
 *
 * Fails open: if the question cannot be asked or answered (no credentials, timeout, error, schema not there yet), the verdict is
 * "unknown" and the request goes on to Next.js exactly as before. Only a clean "no rows" answer produces a 404.
 *
 * Deliberately imports nothing from the app (no Next.js, no @libsql/client) so it stays tiny inside the Worker bundle.
 */

export type GateEnv = { TURSO_DATABASE_URL?: string; TURSO_AUTH_TOKEN?: string };
export type GateVerdict = "exists" | "missing" | "unknown";

/** Longest address a product can have; anything longer cannot exist and is not worth a database question. */
const MAX_SLUG = 300;

// Matches /products/<slug> only: not /products, not /products/category/..., not a trailing slash (Next redirects that itself).
const PRODUCT_PATH = /^\/products\/([^/]+)$/;

/** The slug in a /products/<slug> pathname, or null when the path is not a single product address. */
export function productSlugOf(pathname: string): string | null {
  const m = PRODUCT_PATH.exec(pathname);
  if (!m) return null;
  try {
    return decodeURIComponent(m[1]);
  } catch {
    return null; // malformed escape: let Next.js deal with it
  }
}

// A product counts when it is published, under its current address or under an address it used to have (getPublishedProduct and
// findProductRedirect in src/lib/store/products.ts use the same two conditions). LIMIT 1 stops at the first hit; both lookups use an index.
const EXISTS_SQL =
  "SELECT 1 FROM products WHERE slug = ? AND status = 'published' " +
  "UNION ALL SELECT 1 FROM product_redirects x JOIN products p ON p.id = x.product_id WHERE x.old_slug = ? AND p.status = 'published' LIMIT 1";

/** Turso's HTTP API lives at https://<host>/v2/pipeline; the libsql:// and wss:// schemes of the dashboard URL mean the same host over HTTPS. */
function pipelineUrl(databaseUrl: string): string {
  return `${databaseUrl.replace(/^(libsql|wss?):/i, "https:").replace(/\/+$/, "")}/v2/pipeline`;
}

export async function productVerdict(slug: string, env: GateEnv, fetchImpl: typeof fetch = fetch, timeoutMs = 2500): Promise<GateVerdict> {
  if (slug.length > MAX_SLUG) return "missing";
  const url = env.TURSO_DATABASE_URL;
  if (!url) return "unknown";
  try {
    const arg = { type: "text", value: slug };
    const res = await fetchImpl(pipelineUrl(url), {
      method: "POST",
      headers: { "content-type": "application/json", ...(env.TURSO_AUTH_TOKEN ? { authorization: `Bearer ${env.TURSO_AUTH_TOKEN}` } : {}) },
      body: JSON.stringify({ requests: [{ type: "execute", stmt: { sql: EXISTS_SQL, args: [arg, arg] } }, { type: "close" }] }),
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (!res.ok) return "unknown";
    const body = (await res.json()) as { results?: { type?: string; response?: { result?: { rows?: unknown[] } } }[] };
    const first = body.results?.[0];
    if (first?.type !== "ok" || !Array.isArray(first.response?.result?.rows)) return "unknown";
    return first.response.result.rows.length > 0 ? "exists" : "missing";
  } catch {
    return "unknown";
  }
}

const PAGE = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Product not found · VierApparatus</title><style>body{font:16px/1.6 system-ui,sans-serif;max-width:34rem;margin:15vh auto;padding:0 1.25rem;color:#12263a}a{color:#0b5cab}</style></head><body><h1>This product page is not available</h1><p>The address may have changed, or the product is no longer listed.</p><p><a href="/products">Browse product reviews</a> · <a href="/">Home</a></p></body></html>`;

/** The 404 answer for an address that is not a product. Small, static, noindex, and cacheable by the edge for `ttl` seconds. */
export function productNotFoundResponse(ttl: number): Response {
  return new Response(PAGE, {
    status: 404,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": `public, max-age=0, s-maxage=${ttl}`,
      "X-Robots-Tag": "noindex",
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; frame-ancestors 'none'",
      "X-Edge-Gate": "product-missing",
    },
  });
}
