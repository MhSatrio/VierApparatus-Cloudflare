import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { tempDb, markReferencesChecked } from "./helpers";
import { belowMinimum } from "@/lib/publish-rules";
import { createArticle, getArticleById, publishArticle } from "@/lib/store/articles";
import { DEFAULT_MIN_WORDS, getMinWords, setMinWords } from "@/lib/store/site-settings";
import { conn } from "@/lib/db/client";

const longText = (words: number) => Array.from({ length: words }, (_, i) => `word${i}`).join(" ");
const body = (words: number) => ({ version: 1 as const, blocks: [{ type: "paragraph" as const, content: [{ t: "text" as const, text: longText(words) }] }] });
const draft = (title: string, words: number) =>
  createArticle({ title, excerpt: "A summary that is long enough to publish properly.", authorName: "Muhammad Satrio", categoryId: "cat_microbiology", doc: body(words), tags: [], featured: false, source: "editor" } as never, { id: null, name: "Owner" });

let cleanup: () => void;
beforeAll(() => {
  cleanup = tempDb();
});
afterAll(() => cleanup());

describe("minimum word count", () => {
  it("is a pure rule: below the minimum only when a minimum is set", () => {
    expect(belowMinimum(599, 600)).toBe(true);
    expect(belowMinimum(600, 600)).toBe(false);
    expect(belowMinimum(0, 0)).toBe(false); // 0 switches the rule off
  });

  it("defaults to 600 and stores only whole numbers from 0 to 5000", async () => {
    expect(await getMinWords()).toBe(DEFAULT_MIN_WORDS);
    await setMinWords(250);
    expect(await getMinWords()).toBe(250);
    await expect(setMinWords(-1)).rejects.toThrow();
    await expect(setMinWords(5001)).rejects.toThrow();
    await expect(setMinWords(12.5)).rejects.toThrow();
    expect(await getMinWords()).toBe(250);
  });

  it("refuses to publish a short article, names the count, and publishes with an explicit override", async () => {
    await setMinWords(250);
    const a = await draft("Short but honest", 40);
    const refused = await publishArticle(a.id, "owner-1");
    expect(refused.ok).toBe(false);
    if (!refused.ok) {
      expect(refused.belowMinimum).toEqual({ min: 250, words: expect.any(Number) });
      expect(refused.problems.join(" ")).toMatch(/minimum for publication is 250/);
    }
    expect((await getArticleById(a.id))?.status).toBe("draft");

    await markReferencesChecked("article", a.id);
    const forced = await publishArticle(a.id, "owner-1", { override: true });
    expect(forced.ok).toBe(true);
    const logged = (await (await conn()).execute({ sql: "SELECT COUNT(*) AS c FROM audit_log WHERE action = 'article.publish_override' AND detail LIKE ?", args: ["%minimum 250%"] })).rows[0];
    expect(Number(logged.c)).toBe(1);
  });

  it("publishes a long enough article without any override", async () => {
    await setMinWords(250);
    const a = await draft("Long enough review", 300);
    await markReferencesChecked("article", a.id);
    const ok = await publishArticle(a.id, "owner-1");
    expect(ok.ok).toBe(true);
  });

  it("switching the rule off (0) lets any article publish", async () => {
    await setMinWords(0);
    const a = await draft("A very short note", 5);
    await markReferencesChecked("article", a.id);
    expect((await publishArticle(a.id, "owner-1")).ok).toBe(true);
  });
});
