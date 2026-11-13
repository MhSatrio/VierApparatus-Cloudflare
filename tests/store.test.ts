import { setMinWords } from "@/lib/store/site-settings";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { PNG_1X1, tempDb, markReferencesChecked } from "./helpers";
import { conn } from "@/lib/db/client";
import { importMarkdown } from "@/lib/content/markdown";
import {
  archiveArticle, ArticleError, createArticle, deleteArticle, getFeatured, getPublishedBySlug, listForAdmin, listForSitemap, listPublished, publishArticle,
  publishProblems, resolveRedirect, unpublishArticle, updateArticle, countByStatus, getRelated,
} from "@/lib/store/articles";
import { createCategory, deleteCategory, listCategories, updateCategory } from "@/lib/store/categories";
import { getMedia, imageInfo, saveImage, deleteMedia } from "@/lib/store/media";
import { saveAttachment } from "@/lib/store/attachments";
import { convertToDraft, createInquiry, createSubmission, getSubmission, listInquiries, listSubmissions, reviewSubmission } from "@/lib/store/submissions";
import { exportCsv, rangeFromDays, recordEvent, visitTable, deviceOf, browserOf, COUNT_CAP } from "@/lib/store/analytics";
import { MAX_ROLLUPS_PER_REQUEST, overview } from "@/lib/store/analytics-rollup";
import { contactSchema, submissionSchema } from "@/lib/forms";
import type { Doc } from "@/lib/content/schema";

let cleanup: () => void;
beforeAll(async () => {
  cleanup = tempDb();
  // The publishing minimum is a product default (600 words). These tests check other behaviour with short fixtures,
  // so they switch the minimum off; tests/publish-rules.test.ts checks the rule itself.
  await setMinWords(0);
});
afterAll(() => cleanup());

const doc = (text: string): Doc => ({ version: 1, blocks: [{ type: "paragraph", content: [{ t: "text", text }] }] });
const base = { authorName: "Test Author", excerpt: "A summary that is long enough to publish.", tags: ["mic", "Lab"] };

describe("topics", () => {
  it("seeds the starting topics and supports add/rename/delete rules", async () => {
    const cats = await listCategories();
    expect(cats.map((c) => c.slug)).toContain("microbiology");
    expect(cats.length).toBeGreaterThanOrEqual(9);
    const made = await createCategory("Plant Science");
    expect(made.ok && made.category.slug).toBe("plant-science");
    expect((await createCategory("plant science")).ok).toBe(false);
    if (!made.ok) throw new Error();
    const renamed = await updateCategory(made.category.id, { name: "Plant Biology" });
    expect(renamed.ok && renamed.category.slug).toBe("plant-science"); // slug (URL) stays
    expect((await deleteCategory(made.category.id)).ok).toBe(true);
  });
});

describe("articles", () => {
  it("creates a draft with derived html/text/reading time and a unique slug", async () => {
    const a = await createArticle({ ...base, title: "Understanding MIC", categoryId: "cat_microbiology", doc: doc("Hello **not bold** <b>x</b>") }, { id: null });
    expect(a.status).toBe("draft");
    expect(a.slug).toBe("understanding-mic");
    expect(a.html).toContain("&lt;b&gt;x&lt;/b&gt;");
    expect(a.bodyText).toContain("Hello");
    const b = await createArticle({ ...base, title: "Understanding MIC", doc: doc("second") }, { id: null });
    expect(b.slug).toBe("understanding-mic-2");
    await expect(createArticle({ ...base, title: "x y z", slug: "understanding-mic", doc: doc("a") }, { id: null })).rejects.toMatchObject({ code: "slug_taken" });
  });

  it("is invisible publicly until published, and publish checks the required fields", async () => {
    const a = await createArticle({ ...base, title: "Publish me", categoryId: null, excerpt: "short", doc: doc("Body") }, { id: null });
    expect(await getPublishedBySlug(a.slug)).toBeNull();
    const refused = await publishArticle(a.id, null);
    expect(refused.ok).toBe(false);
    expect(!refused.ok && refused.problems.join(" ")).toMatch(/topic/);
    const fixed = await updateArticle(a.id, { ...base, title: "Publish me", categoryId: "cat_biotechnology", doc: doc("Body") }, { id: null }, a.version);
    await markReferencesChecked("article", fixed.id);
    const ok = await publishArticle(fixed.id, null);
    expect(ok.ok).toBe(true);
    expect((await getPublishedBySlug(a.slug))?.title).toBe("Publish me");
    expect((await listPublished()).items.map((x) => x.slug)).toContain(a.slug);
    expect((await listForSitemap()).map((x) => x.slug)).toContain(a.slug);
    // unpublish removes it everywhere
    await unpublishArticle(a.id, null);
    expect(await getPublishedBySlug(a.slug)).toBeNull();
    expect((await listForSitemap()).map((x) => x.slug)).not.toContain(a.slug);
  });

  it("refuses stale saves (autosave conflict) instead of overwriting", async () => {
    const a = await createArticle({ ...base, title: "Conflict test", doc: doc("v1") }, { id: null });
    const v2 = await updateArticle(a.id, { ...base, title: "Conflict test", doc: doc("v2") }, { id: null }, a.version);
    expect(v2.version).toBe(a.version + 1);
    await expect(updateArticle(a.id, { ...base, title: "Conflict test", doc: doc("stale") }, { id: null }, a.version)).rejects.toMatchObject({ code: "conflict" });
    expect((await listForAdmin({ q: "Conflict" })).items[0].version).toBe(v2.version);
  });

  it("keeps old URLs alive as redirects when a published slug changes, and remembers deleted slugs", async () => {
    const a = await createArticle({ ...base, title: "Moving article", categoryId: "cat_microbiology", doc: doc("Body") }, { id: null });
    await markReferencesChecked("article", a.id);
    await publishArticle(a.id, null);
    await updateArticle(a.id, { ...base, title: "Moving article", slug: "moved-article", categoryId: "cat_microbiology", doc: doc("Body") }, { id: null });
    expect(await resolveRedirect("moving-article")).toEqual({ kind: "redirect", slug: "moved-article" });
    expect((await getPublishedBySlug("moved-article"))?.id).toBe(a.id);
    await deleteArticle(a.id, null);
    expect(await getPublishedBySlug("moved-article")).toBeNull();
    expect(await resolveRedirect("moved-article")).toEqual({ kind: "gone" });
    // the address of a deleted published article can never be reused
    const again = await createArticle({ ...base, title: "Moved article", doc: doc("new") }, { id: null });
    expect(again.slug).not.toBe("moved-article");
  });

  it("supports search, topic filter, pagination, featured, related and archive", async () => {
    for (let i = 1; i <= 5; i++) {
      const a = await createArticle({ ...base, title: `Searchable paper ${i}`, categoryId: "cat_molecular-biology", doc: doc(`The quokka number ${i} lives here`), featured: i === 2 }, { id: null });
      await markReferencesChecked("article", a.id);
      await publishArticle(a.id, null);
    }
    const q = await listPublished({ q: "quokka", perPage: 2 });
    expect(q.total).toBe(5);
    expect(q.items).toHaveLength(2);
    expect(q.pageCount).toBe(3);
    expect((await listPublished({ q: "100%_" })).total).toBe(0); // LIKE wildcards are escaped
    expect((await listPublished({ categorySlug: "molecular-biology" })).total).toBe(5);
    expect((await listPublished({ tag: "LAB" })).total).toBeGreaterThan(0);
    expect((await getFeatured())?.title).toBe("Searchable paper 2");
    const first = q.items[0];
    expect((await getRelated(first)).length).toBeGreaterThan(0);
    const arch = await archiveArticle(first.id, null);
    expect(arch.status).toBe("archived");
    expect(await getPublishedBySlug(first.slug)).toBeNull();
    const counts = await countByStatus();
    expect(counts.archived).toBe(1);
  });

  it("flags problems before publishing", () => {
    const p = publishProblems({ title: "ab", excerpt: "", categoryId: null, coverUrl: "/media/x", coverAlt: "", doc: { version: 1, blocks: [{ type: "image", src: "/media/x", alt: "" }] } });
    expect(p.length).toBeGreaterThanOrEqual(5);
  });

  it("rejects invalid input", async () => {
    await expect(createArticle({ ...base, title: "x", doc: doc("a") }, { id: null })).rejects.toThrow();
    await expect(createArticle({ ...base, title: "Bad cover", coverUrl: "javascript:alert(1)", doc: doc("a") }, { id: null })).rejects.toThrow();
    await expect(updateArticle("nope", { ...base, title: "Does not exist", doc: doc("a") }, { id: null })).rejects.toBeInstanceOf(ArticleError);
  });

  it("an imported Markdown article is stored and rendered through the same path as editor content", async () => {
    const r = importMarkdown("---\ntitle: Imported via markdown\ndescription: A description long enough to count.\ncategory: Microbiology\nauthor: Imp Orter\n---\n\n## Section\n\nText with H<sub>2</sub>O.\n");
    const a = await createArticle({ title: r.meta.title!, excerpt: r.meta.excerpt!, authorName: r.meta.author!, categoryId: "cat_microbiology", doc: r.doc, source: "markdown" }, { id: null });
    expect(a.html).toContain('<h2 id="section">Section</h2>');
    expect(a.html).toContain("<sub>2</sub>");
    expect(a.source).toBe("markdown");
  });
});

describe("media", () => {
  it("identifies images by content and stores them once", async () => {
    expect(imageInfo(PNG_1X1)).toEqual({ mime: "image/png", width: 1, height: 1 });
    const a = await saveImage(PNG_1X1, { userId: null });
    expect(a.ok && a.image.url).toMatch(/^\/media\/m_/);
    const b = await saveImage(PNG_1X1, { userId: null });
    expect(b.ok && b.image.duplicate).toBe(true);
    if (!a.ok) throw new Error();
    const got = await getMedia(a.image.id);
    expect(got?.mime).toBe("image/png");
    expect(got?.data.length).toBe(PNG_1X1.length);
    expect(await getMedia("../etc/passwd")).toBeNull();
  });
  it("rejects SVG, scripts disguised as images, empty and oversized files", async () => {
    const svg = new TextEncoder().encode('<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>' + " ".repeat(40));
    expect((await saveImage(svg, { userId: null })).ok).toBe(false);
    expect((await saveImage(new Uint8Array(0), { userId: null })).ok).toBe(false);
    expect((await saveImage(new Uint8Array(2_000_000), { userId: null })).ok).toBe(false);
    const fake = new Uint8Array(100);
    fake.set([0xff, 0xd8, 0xff]);
    expect((await saveImage(fake, { userId: null })).ok).toBe(false);
  });
  it("will not delete an image that an article still uses", async () => {
    const m = await saveImage(Uint8Array.from([...PNG_1X1.slice(0, 40), 0, 0, 0, 0, 1, 2, 3]), { userId: null });
    if (!m.ok) throw new Error(JSON.stringify(m));
    const a = await createArticle({ ...base, title: "With image", doc: { version: 1, blocks: [{ type: "image", src: m.image.url, alt: "a" }] } }, { id: null });
    expect((await deleteMedia(m.image.id, "x")).ok).toBe(false);
    await deleteArticle(a.id, null);
    expect((await deleteMedia(m.image.id, "x")).ok).toBe(true);
  });
});

describe("attachments, submissions and inquiries", () => {
  it("validates attachments by content", async () => {
    expect((await saveAttachment({ name: "shot.png", bytes: PNG_1X1 }, ["image"])).ok).toBe(true);
    expect((await saveAttachment({ name: "evil.exe", bytes: new TextEncoder().encode("MZ....") }, ["image", "text"])).ok).toBe(false);
    expect((await saveAttachment({ name: "x.png", bytes: new TextEncoder().encode("<html>not an image</html>" + " ".repeat(30)) }, ["image"])).ok).toBe(false);
    expect((await saveAttachment({ name: "draft.md", bytes: new TextEncoder().encode("# Title\n\nHello") }, ["text"])).ok).toBe(true);
    expect((await saveAttachment({ name: "bin.md", bytes: Uint8Array.from([0, 1, 2, 255, 254]) }, ["text"])).ok).toBe(false);
    expect((await saveAttachment({ name: "../../etc/passwd.md", bytes: new TextEncoder().encode("hi") }, ["text"])).ok).toBe(true);
  });

  it("stores a proposal as pending, and converting it makes a draft only (no account, no publishing)", async () => {
    const att = await saveAttachment({ name: "draft.md", bytes: new TextEncoder().encode("---\ntitle: From attachment\n---\n\n## Intro\n\nBody text.") }, ["text"]);
    if (!att.ok) throw new Error();
    const parsed = submissionSchema.parse({ name: "Ada", email: "ADA@example.com", title: "A proposed article", topic: "Microbiology", proposal: "x".repeat(60) });
    const id = await createSubmission(parsed, att.id);
    expect((await getSubmission(id))?.status).toBe("pending");
    expect((await listSubmissions({ status: "pending" })).pending).toBe(1);
    expect(await reviewSubmission(id, "revision", "Please add references", "owner")).toBe(true);
    const r = await convertToDraft(id, "owner");
    if (!r.ok) throw new Error();
    const db = await conn();
    const row = (await db.execute({ sql: "SELECT status, source, title FROM articles WHERE id = ?", args: [r.articleId] })).rows[0];
    expect(row.status).toBe("draft");
    expect(row.title).toBe("From attachment");
    expect((await getSubmission(id))?.status).toBe("accepted");
    expect((await db.execute("SELECT COUNT(*) AS c FROM users")).rows[0].c).toBe(0); // no account created
  });

  it("validates the conditional contact form per type", () => {
    expect(contactSchema.safeParse({ type: "Join as contributor", name: "A B", email: "a@b.co", articleTitle: "A title", proposal: "short" }).success).toBe(false);
    expect(contactSchema.safeParse({ type: "Report a bug", email: "a@b.co", message: "The menu does not open on mobile." }).success).toBe(true);
    expect(contactSchema.safeParse({ type: "Partnership", name: "A B", email: "bad", message: "long enough message" }).success).toBe(false);
    expect(contactSchema.safeParse({ type: "Join as contributor", name: "A B", email: "a@b.co", articleTitle: "A title", proposal: "y".repeat(40), links: "javascript:alert(1)" }).success).toBe(false);
    expect(contactSchema.safeParse({ type: "Phone call", name: "A B", email: "a@b.co" }).success).toBe(false);
  });

  it("stores inquiries", async () => {
    await createInquiry({ type: "General inquiry", name: "N", email: "n@example.com", message: "Hello there", extra: {}, attachmentId: null });
    const l = await listInquiries();
    expect(l.total).toBe(1);
    expect(l.unread).toBe(1);
  });
});

describe("analytics", () => {
  const ev = (over: Partial<Parameters<typeof recordEvent>[0]> = {}) => ({
    type: "pageview" as const, path: "/articles/a-b", sessionId: "sess1234", referrer: "https://www.google.com/search?q=x",
    utm: { source: "", medium: "", campaign: "", content: "", term: "" }, country: "id", city: "Denpasar", device: "Desktop", browser: "Chrome",
    landing: true, durationMs: null, scrollPct: null, ip: "203.0.113.5", userAgent: "UA-1", ...over,
  });

  it("records events without storing IP addresses and aggregates honestly", async () => {
    await recordEvent(ev(), "vierapparatus.com");
    await recordEvent(ev({ path: "/", landing: false }), "vierapparatus.com");
    await recordEvent(ev({ sessionId: "sess5678", ip: "198.51.100.7", utm: { source: "newsletter", medium: "email", campaign: "=SUM(A1)", content: "", term: "" }, country: "us", device: "Mobile" }), "vierapparatus.com");
    await recordEvent(ev({ type: "engage", durationMs: 42_000, scrollPct: 80 }), "vierapparatus.com");

    const db = await conn();
    const raw = JSON.stringify((await db.execute("SELECT * FROM events")).rows);
    expect(raw).not.toContain("203.0.113.5");
    expect(raw).not.toContain("198.51.100.7");

    const range = rangeFromDays(null, null);
    const ov = await overview(range);
    const sum = ov.summary;
    expect(sum.pageViews).toBe(3);
    expect(sum.visitors).toBe(2);
    expect(sum.articleViews).toBe(2);
    expect(sum.avgEngagedSeconds).toBe(42);
    expect(ov.days.reduce((a, d) => a + d.pageViews, 0)).toBe(3);
    expect(ov.topArticles[0]).toEqual({ label: "/articles/a-b", count: 2 });
    expect(ov.sources.map((x) => x.label).sort()).toEqual(["google.com", "newsletter"]);
    expect(ov.campaigns[0].campaign).toBe("=SUM(A1)");
    expect(ov.countries.map((x) => x.label)).toContain("ID");

    const t = await visitTable({ ...range, perPage: 2, sort: "date", dir: "desc" });
    expect(t.total).toBe(3);
    expect(t.rows).toHaveLength(2);
    expect(t.capped).toBe(false);
    expect(COUNT_CAP).toBeGreaterThan(1000);
    expect((await visitTable({ ...range, device: "Mobile" })).total).toBe(1);
    expect((await visitTable({ ...range, q: "SUM" })).total).toBe(1);
    const row = (await visitTable({ ...range, q: "/articles/a-b", country: "ID" })).rows[0];
    expect(row.duration).toBeGreaterThanOrEqual(42);
    expect(row.events).toBe(3);

    const csv = await exportCsv(range);
    expect(csv.split("\n")[0]).toContain("visitor,date,time");
    expect(csv).toContain("'=SUM(A1)"); // formula injection neutralised
  });

  it("reports an honest empty state and parses devices/browsers", async () => {
    const empty = (await overview(rangeFromDays("2001-01-01", "2001-01-02"))).summary;
    expect(empty.hasData).toBe(false);
    expect(deviceOf("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0) Mobile/15E148")).toBe("Mobile");
    expect(deviceOf("Mozilla/5.0 (iPad; CPU OS 17_0)")).toBe("Tablet");
    expect(browserOf("Mozilla/5.0 Chrome/120 Safari/537 Edg/120")).toBe("Edge");
    expect(rangeFromDays("2026-02-01", "2026-01-01")).toMatchObject({ fromDay: "2026-01-01", toDay: "2026-02-01" });
  });

  it("summarises a finished day once; later views read the roll-up, not the raw log", async () => {
    const db = await conn();
    // 40 days back: outside the window the previous test already summarised (a finished day is summarised once and then final)
    const day = new Date(Date.now() - 40 * 86400_000).toISOString().slice(0, 10);
    const insert = (i: number, type: string, path: string) =>
      db.execute({
        sql: "INSERT INTO events(ts, visitor_id, session_id, type, path, landing, country, device, browser) VALUES (?, ?, ?, ?, ?, 1, 'ID', 'Desktop', 'Chrome')",
        args: [`${day}T10:0${i}:00.000Z`, `v${i}`, `s${i}`, type, path],
      });
    for (let i = 0; i < 4; i++) await insert(i, "pageview", i < 3 ? "/articles/rollup-test" : "/");
    const range = { from: `${day}T00:00:00.000Z`, to: new Date(Date.parse(`${day}T00:00:00.000Z`) + 86400_000).toISOString() };

    const first = await overview(range);
    expect(first.summary.pageViews).toBe(4);
    expect(first.summary.visitors).toBe(4);
    expect(first.topArticles[0]).toEqual({ label: "/articles/rollup-test", count: 3 });
    expect(Number((await db.execute({ sql: "SELECT COUNT(*) AS c FROM analytics_daily WHERE day = ?", args: [day] })).rows[0].c)).toBe(1);

    // Prove the second view comes from the roll-up: remove the raw rows, the numbers must not change.
    await db.execute({ sql: "DELETE FROM events WHERE ts LIKE ?", args: [`${day}%`] });
    const second = await overview(range);
    expect(second.summary.pageViews).toBe(4);
    expect(second.topArticles[0]?.count).toBe(3);
  });

  it("bounds the work one request may do after a long gap", () => {
    expect(MAX_ROLLUPS_PER_REQUEST).toBeLessThanOrEqual(10);
  });
});
