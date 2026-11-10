/* IndexNow submission (manual). Publishing, updating, unpublishing or deleting an article in the admin area already notifies
 * IndexNow automatically when the site runs on the real domain, so this script is for bulk or catch-up submissions.
 *
 *   npm run indexnow -- --since-last              articles published/updated since the last successful run of this script
 *   npm run indexnow -- --recent-days 7           articles published or updated in the last N days
 *   npm run indexnow -- --urls https://vierapparatus.com/about,https://vierapparatus.com/contact
 *   npm run indexnow -- --all                     home, articles, topics and every published article (use sparingly)
 *   npm run indexnow -- --import                  (only with the product catalogue on) products changed by the last product import
 *   add --dry-run to print every URL without sending, --skip-verify to skip the live key-file check
 * Needs TURSO_DATABASE_URL (+ TURSO_AUTH_TOKEN) for the article options. Flags can be combined; URLs are merged and de-duplicated.
 */
import "./_local-client";
import fs from "node:fs";
import path from "node:path";
import { conn, dbConfigured } from "../src/lib/db/client";
import {
  INDEXNOW_ENDPOINT,
  INDEXNOW_KEY,
  INDEXNOW_KEY_LOCATION,
  INDEXNOW_ORIGIN,
  articleUrlFor,
  chunk,
  cleanUrls,
  indexNowPayload,
  productUrlFor,
} from "../src/lib/indexnow";

const root = path.resolve(__dirname, "..");
const args = process.argv.slice(2);
const flag = (n: string) => args.includes(n);
const opt = (n: string) => {
  const i = args.indexOf(n);
  return i >= 0 ? args[i + 1] : undefined;
};
const readJson = <T>(file: string): T | null => (fs.existsSync(file) ? (JSON.parse(fs.readFileSync(file, "utf8")) as T) : null);

const MARK = "indexnow_last_submitted";

async function articleSlugsSince(since: string | null): Promise<string[]> {
  const db = await conn();
  const r = since
    ? await db.execute({ sql: "SELECT slug FROM articles WHERE status = 'published' AND updated_at > ? ORDER BY published_at DESC", args: [since] })
    : await db.execute("SELECT slug FROM articles WHERE status = 'published' ORDER BY published_at DESC");
  return r.rows.map((x) => String(x.slug));
}

async function collect(): Promise<{ urls: string[]; usedSinceLast: boolean }> {
  const urls: string[] = [];
  let usedSinceLast = false;
  const needsDb = flag("--since-last") || opt("--recent-days") || flag("--all");
  if (needsDb && !dbConfigured()) throw new Error("TURSO_DATABASE_URL is not set (needed to read the articles).");

  if (flag("--since-last")) {
    usedSinceLast = true;
    const db = await conn();
    const last = (await db.execute({ sql: "SELECT value FROM settings WHERE key = ?", args: [MARK] })).rows[0]?.value;
    const slugs = await articleSlugsSince(last ? String(last) : null);
    console.log(last ? `Articles published or updated since ${String(last)}: ${slugs.length}` : "No earlier run recorded: submitting every published article.");
    urls.push(...slugs.map(articleUrlFor));
  }
  const days = opt("--recent-days");
  if (days) urls.push(...(await articleSlugsSince(new Date(Date.now() - Number(days) * 86_400_000).toISOString())).map(articleUrlFor));

  if (flag("--import")) {
    const m = readJson<{ added: string[]; updated: string[]; restored: string[]; archived: string[] }>(path.join(root, "data/indexnow-last-import.json"));
    if (!m) console.warn("No data/indexnow-last-import.json (the product importer has not been run).");
    else for (const slug of [...m.added, ...m.updated, ...m.restored, ...m.archived]) urls.push(productUrlFor(slug));
  }

  if (flag("--all")) {
    urls.push(INDEXNOW_ORIGIN + "/", INDEXNOW_ORIGIN + "/articles", INDEXNOW_ORIGIN + "/topics", INDEXNOW_ORIGIN + "/about", INDEXNOW_ORIGIN + "/contribute");
    const db = await conn();
    for (const r of (await db.execute("SELECT slug FROM categories")).rows) urls.push(`${INDEXNOW_ORIGIN}/topics/${String(r.slug)}`);
    urls.push(...(await articleSlugsSince(null)).map(articleUrlFor));
  }

  const explicit = opt("--urls");
  if (explicit) urls.push(...explicit.split(",").map((u) => u.trim()));
  return { urls, usedSinceLast };
}

async function main() {
  const { urls, usedSinceLast } = await collect();
  const list = cleanUrls(urls);
  if (list.length === 0) {
    console.log("Nothing to submit.");
    return;
  }
  console.log(`IndexNow: ${list.length} URL(s) in ${chunk(list).length} request(s).`);
  for (const u of list) console.log("  " + u);

  if (flag("--dry-run")) {
    console.log("\nDry run: nothing was sent.");
    return;
  }
  if (!flag("--skip-verify")) {
    // Submitting before the key file is live would make engines reject us.
    const res = await fetch(INDEXNOW_KEY_LOCATION, { cache: "no-store", signal: AbortSignal.timeout(15000) }).catch(() => null);
    const body = res?.ok ? (await res.text()).trim() : "";
    if (body !== INDEXNOW_KEY) {
      console.error(`\n✖ ${INDEXNOW_KEY_LOCATION} is not serving the key yet (HTTP ${res?.status ?? "no response"}). Deploy first, then re-run. Nothing was sent.`);
      process.exitCode = 1;
      return;
    }
  }
  let failed = false;
  for (const batch of chunk(list)) {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(indexNowPayload(batch)),
      signal: AbortSignal.timeout(30000),
    });
    // 200 = accepted, 202 = accepted (key validation pending). 400 bad request, 403 key invalid, 422 URL/host mismatch, 429 too many.
    const ok = res.status === 200 || res.status === 202;
    console.log(`${ok ? "✔" : "✖"} batch of ${batch.length}: HTTP ${res.status}`);
    if (!ok) failed = true;
  }
  if (failed) process.exitCode = 1;
  else if (usedSinceLast) {
    const db = await conn();
    await db.execute({ sql: "INSERT INTO settings(key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value", args: [MARK, new Date().toISOString()] });
    console.log("Recorded this run, so the next --since-last only sends newer changes.");
  }
}

main().catch((e) => {
  console.error("IndexNow failed:", e instanceof Error ? e.message : e);
  process.exitCode = 1;
});
