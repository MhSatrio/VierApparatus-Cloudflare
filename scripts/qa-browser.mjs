// Browser QA: console errors, failed requests, horizontal overflow, link checks, screenshots.
// Usage: node scripts/qa-browser.mjs [baseUrl]   (run `npm run build && npm start` first)
import { chromium } from "@playwright/test";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const base = process.argv[2] ?? "http://localhost:3100";
const out = fileURLToPath(new URL("../.tmp/shots/", import.meta.url));
fs.mkdirSync(out, { recursive: true });

const pages = ["/", "/about", "/products", "/products?q=centrifuge", "/products/blood-centrifuge-bkc-tl4bii", "/articles", "/articles/blood-centrifuge-bkc-tl4bii", "/contact", "/privacy", "/does-not-exist"];
const browser = await chromium.launch();
const report = [];

for (const [name, viewport] of [["desktop", { width: 1366, height: 900 }], ["mobile", { width: 390, height: 844 }]]) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1 });
  for (const p of pages) {
    const page = await ctx.newPage();
    const problems = [];
    page.on("console", (m) => m.type() === "error" && !(p.includes("does-not-exist") && /404/.test(m.text())) && problems.push(`console: ${m.text().slice(0, 200)}`));
    page.on("pageerror", (e) => problems.push(`pageerror: ${e.message.slice(0, 200)}`));
    // Aborted RSC prefetches happen when a page is closed mid-prefetch; they are not real failures.
    page.on("requestfailed", (r) => !(r.url().includes("_rsc=") && r.failure()?.errorText === "net::ERR_ABORTED") && problems.push(`requestfailed: ${r.url().slice(0, 120)} ${r.failure()?.errorText}`));
    page.on("response", (r) => r.status() >= 400 && !p.includes("does-not-exist") && problems.push(`http ${r.status()}: ${r.url().slice(0, 120)}`));
    await page.goto(base + p, { waitUntil: "networkidle" });
    // Scroll through the page so lazy-loaded images load before checks/screenshots.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
      window.scrollTo(0, 0);
    });
    await page.waitForLoadState("networkidle");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    const h1 = await page.locator("h1").count();
    const brokenImgs = await page.evaluate(() => [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src.slice(0, 100)));
    if (overflow > 0) problems.push(`horizontal overflow ${overflow}px`);
    if (h1 !== 1 && !p.includes("does-not-exist")) problems.push(`h1 count ${h1}`);
    if (brokenImgs.length) problems.push(`broken images: ${brokenImgs.join(", ")}`);
    await page.screenshot({ path: `${out}${name}-${p.replace(/[^a-z0-9]+/gi, "_")}.png`, fullPage: true });
    report.push({ viewport: name, page: p, problems });
    await page.close();
  }
  await ctx.close();
}
await browser.close();
for (const r of report) console.log(`${r.problems.length ? "✖" : "✔"} ${r.viewport.padEnd(7)} ${r.page}${r.problems.length ? "\n    " + r.problems.join("\n    ") : ""}`);
process.exit(report.some((r) => r.problems.length) ? 1 : 0);
