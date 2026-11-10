import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { tempDb } from "./helpers";
import { DESC_MAX, DESC_MIN, TITLE_MAX, fitDescription, fitTitle, truncateAtWord } from "@/lib/seo";
import { INDEXNOW_KEY, chunk, cleanUrls, indexNowPayload } from "@/lib/indexnow";

describe("title / description fitting", () => {
  it("truncates at word boundaries and never exceeds the limit", () => {
    expect(truncateAtWord("Automatic Digital Refractometer with Temperature Compensation", 30)).toBe("Automatic Digital…");
    expect(truncateAtWord("short", 30)).toBe("short");
  });

  it("keeps the model code when a long title must be shortened", () => {
    const t = fitTitle("Horizontal Shaking Incubator With Large Capacity BJPX-SW20-L", { keep: "BJPX-SW20-L" });
    expect(t.length).toBeLessThanOrEqual(TITLE_MAX);
    expect(t).toContain("BJPX-SW20-L");
    expect(t.endsWith("| VierApparatus")).toBe(true);
  });

  it("pads short descriptions into 120-155 and trims long ones", () => {
    const short = fitDescription("Benchtop centrifuge.");
    expect(short.length).toBeGreaterThanOrEqual(DESC_MIN);
    expect(short.length).toBeLessThanOrEqual(DESC_MAX);
    const long = fitDescription("x ".repeat(200));
    expect(long.length).toBeLessThanOrEqual(DESC_MAX);
  });
});

describe("IndexNow", () => {
  it("serves the key file from the site root and it matches the configured key", () => {
    const file = path.join(__dirname, "..", "public", `${INDEXNOW_KEY}.txt`);
    expect(fs.existsSync(file)).toBe(true);
    expect(fs.readFileSync(file, "utf8").trim()).toBe(INDEXNOW_KEY);
    expect(INDEXNOW_KEY).toMatch(/^[a-f0-9]{32}$/);
  });

  it("builds a valid payload and only accepts https URLs on our host", () => {
    const urls = cleanUrls([
      "https://vierapparatus.com/products/a",
      "https://vierapparatus.com/products/a",
      "http://vierapparatus.com/products/b",
      "https://evil.example/products/c",
      "not a url",
    ]);
    expect(urls).toEqual(["https://vierapparatus.com/products/a"]);
    expect(indexNowPayload(urls)).toMatchObject({ host: "vierapparatus.com", key: INDEXNOW_KEY, urlList: urls });
    expect(indexNowPayload(urls).keyLocation).toBe(`https://vierapparatus.com/${INDEXNOW_KEY}.txt`);
  });

  it("splits into batches of at most 10,000", () => {
    const batches = chunk(Array.from({ length: 25000 }, (_, i) => String(i)));
    expect(batches.map((b) => b.length)).toEqual([10000, 10000, 5000]);
  });
});

describe("IndexNow CLI (--dry-run, no network)", () => {
  const run = (...args: string[]) =>
    spawnSync(process.execPath, [path.join(__dirname, "..", "node_modules/tsx/dist/cli.mjs"), "scripts/indexnow.ts", ...args, "--dry-run"], {
      cwd: path.join(__dirname, ".."),
      encoding: "utf8",
    });

  it("keeps only valid URLs on our host and sends nothing", () => {
    const r = run("--urls", "https://vierapparatus.com/about,https://evil.example/x,http://vierapparatus.com/insecure");
    expect(r.status).toBe(0);
    expect(r.stdout).toContain("1 URL(s)");
    expect(r.stdout).toContain("Dry run: nothing was sent");
    expect(r.stdout).not.toContain("evil.example");
  });

  it("--all and --since-last list the published articles from the database (and never drafts)", async () => {
    const cleanup = tempDb();
    await (await import("@/lib/store/site-settings")).setMinWords(0);
    try {
      const { createArticle, publishArticle } = await import("@/lib/store/articles");
      const doc = { version: 1 as const, blocks: [{ type: "paragraph" as const, content: [{ t: "text" as const, text: "Body" }] }] };
      const base = { excerpt: "A summary that is long enough to publish.", authorName: "Test Author", categoryId: "cat_microbiology", doc };
      const live = await createArticle({ ...base, title: "Live article for indexing" }, { id: null });
      await publishArticle(live.id, null);
      await createArticle({ ...base, title: "Draft that must not be submitted" }, { id: null });

      const all = run("--all");
      expect(all.status, all.stderr).toBe(0);
      expect(all.stdout).toContain("/articles/live-article-for-indexing");
      expect(all.stdout).toContain("/topics/microbiology");
      expect(all.stdout).not.toContain("draft-that-must-not");

      const since = run("--since-last");
      expect(since.status, since.stderr).toBe(0);
      expect(since.stdout).toContain("/articles/live-article-for-indexing");
      expect(since.stdout).toContain("Dry run: nothing was sent");
      // a dry run must not move the "last submitted" marker
      const again = run("--since-last");
      expect(again.stdout).toContain("/articles/live-article-for-indexing");
    } finally {
      cleanup();
    }
  });
});
