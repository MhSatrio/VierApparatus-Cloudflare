import { z } from "zod";
import { conn } from "../db/client";
import { newId } from "../crypto";
import { docSchema, isSafeImageSrc, type Doc } from "../content/schema";
import { renderDoc } from "../content/render";
import { docToText, readingMinutes, slugify, truncate, wordCount } from "../content/text";
import { getMinWords } from "./site-settings";
import { belowMinimum } from "../publish-rules";
import { audit, b, json, likePattern, n, nn, nowIso, s, sn, type Row } from "./util";
import { readRefcheck, refcheckGate, type RefcheckStatus, type StoredItem, type StoredRef } from "./refcheck";
import { recordRevision, type RevisionKind } from "./revisions";

export type ArticleStatus = "draft" | "published" | "archived";
export type ReviewStatus = "none" | "requested" | "revision" | "approved";

export type ArticleSummary = {
  /** The references checked against Crossref (APA text and DOI), and the state of the last check. */
  refs: StoredRef[];
  refcheckStatus: RefcheckStatus;
  /** False when the reference list has changed since the last check, so that check no longer applies. */
  refcheckCurrent: boolean;
  refcheckAt: string | null;
  refcheckReport: StoredItem[];
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  categoryId: string | null;
  categoryName: string | null;
  categorySlug: string | null;
  authorName: string;
  authorId: string | null;
  status: ArticleStatus;
  coverUrl: string | null;
  coverAlt: string;
  coverCredit: string;
  coverWidth: number | null;
  coverHeight: number | null;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  readingMinutes: number;
  featured: boolean;
  submittedForReview: boolean;
  reviewStatus: ReviewStatus;
  assignedTo: string | null;
  assignedToName: string | null;
  lastEditorId: string | null;
  lastEditorName: string;
  source: string;
  version: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
};

export type ArticleRecord = ArticleSummary & { doc: Doc; html: string; bodyText: string; hasMath: boolean };

const SUMMARY_COLS = `a.id, a.slug, a.title, a.excerpt, a.category_id, c.name AS category_name, c.slug AS category_slug, a.author_name, a.author_id, a.status,
  a.cover_url, a.cover_alt, a.cover_credit, a.cover_width, a.cover_height, a.tags, a.seo_title, a.seo_description, a.reading_minutes, a.featured,
  a.submitted_for_review, a.review_status, a.assigned_to, u.name AS assigned_name, a.last_editor_id, a.last_editor_name,
  a.source, a.version, a.created_at, a.updated_at, a.published_at, a.refs, a.refcheck_status, a.refcheck_hash, a.refcheck_report, a.refcheck_at`;
const FROM = `FROM articles a LEFT JOIN categories c ON c.id = a.category_id LEFT JOIN users u ON u.id = a.assigned_to`;

const toSummary = (r: Row): ArticleSummary => {
  const rc = readRefcheck(r);
  return {
  refs: json<StoredRef[]>(r.refs, []),
  refcheckStatus: rc.status,
  refcheckCurrent: rc.current,
  refcheckAt: rc.checkedAt,
  refcheckReport: rc.items,
  id: s(r.id),
  slug: s(r.slug),
  title: s(r.title),
  excerpt: s(r.excerpt),
  categoryId: sn(r.category_id),
  categoryName: sn(r.category_name),
  categorySlug: sn(r.category_slug),
  authorName: s(r.author_name),
  authorId: sn(r.author_id),
  status: s(r.status) as ArticleStatus,
  coverUrl: sn(r.cover_url),
  coverAlt: s(r.cover_alt),
  coverCredit: s(r.cover_credit),
  coverWidth: nn(r.cover_width),
  coverHeight: nn(r.cover_height),
  tags: json<string[]>(r.tags, []),
  seoTitle: s(r.seo_title),
  seoDescription: s(r.seo_description),
  readingMinutes: n(r.reading_minutes) || 1,
  featured: b(r.featured),
  submittedForReview: s(r.review_status) === "requested",
  reviewStatus: (s(r.review_status) || "none") as ReviewStatus,
  assignedTo: sn(r.assigned_to),
  assignedToName: sn(r.assigned_name),
  lastEditorId: sn(r.last_editor_id),
  lastEditorName: s(r.last_editor_name),
  source: s(r.source),
  version: n(r.version),
  createdAt: s(r.created_at),
  updatedAt: s(r.updated_at),
  publishedAt: sn(r.published_at),
  };
};

const toRecord = (r: Row): ArticleRecord => {
  const parsed = docSchema.safeParse(json<unknown>(r.doc, null));
  return { ...toSummary(r), doc: parsed.success ? parsed.data : { version: 1, blocks: [] }, html: s(r.html), bodyText: s(r.body_text), hasMath: b(r.has_math) };
};

const FULL_COLS = `${SUMMARY_COLS}, a.doc, a.html, a.body_text, a.has_math`;

// ---------------------------------------------------------------- input

const slugSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(3)
  .max(100)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens");

export const articleInputSchema = z.object({
  title: z.string().trim().min(3, "Add a title (at least 3 characters)").max(160),
  slug: slugSchema.optional(),
  excerpt: z.string().trim().max(320).default(""),
  categoryId: z.string().max(60).nullable().default(null),
  authorName: z.string().trim().min(2, "Add an author name").max(80),
  tags: z.array(z.string().trim().min(1).max(40)).max(12).default([]),
  coverUrl: z.string().refine(isSafeImageSrc, "Unsafe cover image address").nullable().default(null),
  coverAlt: z.string().trim().max(300).default(""),
  coverCredit: z.string().trim().max(300).default(""),
  coverWidth: z.number().int().positive().max(20_000).nullable().default(null),
  coverHeight: z.number().int().positive().max(20_000).nullable().default(null),
  seoTitle: z.string().trim().max(70).default(""),
  seoDescription: z.string().trim().max(170).default(""),
  featured: z.boolean().default(false),
  doc: docSchema,
  source: z.enum(["editor", "markdown", "legacy", "submission"]).default("editor"),
});
export type ArticleInput = z.input<typeof articleInputSchema>;
export type ArticleData = z.output<typeof articleInputSchema>;

export class ArticleError extends Error {
  constructor(
    public code: "not_found" | "conflict" | "invalid" | "slug_taken",
    message: string,
  ) {
    super(message);
  }
}

/** What must be true before an article can go live. Returns human-readable problems (empty = ready). */
export function publishProblems(a: Pick<ArticleSummary, "title" | "excerpt" | "categoryId" | "coverUrl" | "coverAlt"> & { doc: Doc }): string[] {
  const out: string[] = [];
  if (a.title.trim().length < 3) out.push("Add a title.");
  if (a.excerpt.trim().length < 20) out.push("Add a summary of at least 20 characters.");
  if (!a.categoryId) out.push("Choose a topic.");
  if (!a.doc.blocks.length) out.push("The article has no content.");
  if (a.coverUrl && a.coverAlt.trim().length < 3) out.push("Describe the cover image (alt text).");
  for (const bl of a.doc.blocks) if (bl.type === "image" && bl.alt.trim().length < 3) {
    out.push("Every image needs alt text (a short description).");
    break;
  }
  return out;
}

// ---------------------------------------------------------------- slugs

export async function slugInUse(slug: string, exceptId?: string): Promise<boolean> {
  const db = await conn();
  const r = await db.execute({ sql: "SELECT id FROM articles WHERE slug = ?", args: [slug] });
  if (r.rows[0] && s(r.rows[0].id) !== exceptId) return true;
  // A slug that points at another article via a redirect, or that belonged to a deleted article, is not reusable.
  const red = await db.execute({ sql: "SELECT article_id FROM slug_redirects WHERE old_slug = ?", args: [slug] });
  if (red.rows[0] && s(red.rows[0].article_id) !== exceptId) return true;
  return (await db.execute({ sql: "SELECT 1 FROM gone_slugs WHERE slug = ?", args: [slug] })).rows.length > 0;
}

export async function uniqueSlug(base: string, exceptId?: string): Promise<string> {
  const root = slugify(base, 90) || "article";
  let slug = root.length >= 3 ? root : `${root}-article`;
  for (let i = 2; await slugInUse(slug, exceptId); i++) slug = `${root.slice(0, 90)}-${i}`;
  return slug;
}

// ---------------------------------------------------------------- reads

export async function getArticleById(id: string): Promise<ArticleRecord | null> {
  const db = await conn();
  const r = await db.execute({ sql: `SELECT ${FULL_COLS} ${FROM} WHERE a.id = ?`, args: [id] });
  return r.rows[0] ? toRecord(r.rows[0]) : null;
}

export async function getPublishedBySlug(slug: string): Promise<ArticleRecord | null> {
  const db = await conn();
  const r = await db.execute({ sql: `SELECT ${FULL_COLS} ${FROM} WHERE a.slug = ? AND a.status = 'published'`, args: [slug] });
  return r.rows[0] ? toRecord(r.rows[0]) : null;
}

/** For a retired URL: where did it go? */
export async function resolveRedirect(slug: string): Promise<{ kind: "redirect"; slug: string } | { kind: "gone" } | null> {
  const db = await conn();
  const red = (await db.execute({ sql: "SELECT a.slug FROM slug_redirects r JOIN articles a ON a.id = r.article_id WHERE r.old_slug = ? AND a.status = 'published'", args: [slug] })).rows[0];
  if (red) return { kind: "redirect", slug: s(red.slug) };
  const gone = (await db.execute({ sql: "SELECT 1 FROM gone_slugs WHERE slug = ?", args: [slug] })).rows[0];
  return gone ? { kind: "gone" } : null;
}

export type PublishedQuery = { page?: number; perPage?: number; categorySlug?: string; tag?: string; q?: string };

export async function listPublished(query: PublishedQuery = {}): Promise<{ items: ArticleSummary[]; total: number; page: number; pageCount: number }> {
  const db = await conn();
  const perPage = Math.min(Math.max(query.perPage ?? 12, 1), 50);
  const where = ["a.status = 'published'"];
  const args: (string | number)[] = [];
  if (query.categorySlug) {
    where.push("c.slug = ?");
    args.push(query.categorySlug);
  }
  if (query.tag) {
    where.push("EXISTS (SELECT 1 FROM json_each(a.tags) WHERE json_each.value = ? COLLATE NOCASE)");
    args.push(query.tag);
  }
  const q = query.q?.trim().slice(0, 80);
  if (q) {
    where.push("(a.title LIKE ? ESCAPE '\\' OR a.excerpt LIKE ? ESCAPE '\\' OR a.body_text LIKE ? ESCAPE '\\')");
    const p = likePattern(q);
    args.push(p, p, p);
  }
  const cond = where.join(" AND ");
  const total = n((await db.execute({ sql: `SELECT COUNT(*) AS c ${FROM} WHERE ${cond}`, args })).rows[0].c);
  const pageCount = Math.max(1, Math.ceil(total / perPage));
  const page = Math.min(Math.max(query.page ?? 1, 1), pageCount);
  const r = await db.execute({
    sql: `SELECT ${SUMMARY_COLS} ${FROM} WHERE ${cond} ORDER BY a.published_at DESC, a.id LIMIT ? OFFSET ?`,
    args: [...args, perPage, (page - 1) * perPage],
  });
  return { items: r.rows.map(toSummary), total, page, pageCount };
}

/** The editor's pick if one is marked, otherwise the newest published article. */
export async function getFeatured(): Promise<ArticleSummary | null> {
  const db = await conn();
  const r = await db.execute(`SELECT ${SUMMARY_COLS} ${FROM} WHERE a.status = 'published' ORDER BY a.featured DESC, a.published_at DESC LIMIT 1`);
  return r.rows[0] ? toSummary(r.rows[0]) : null;
}

export async function getRelated(article: Pick<ArticleSummary, "id" | "categoryId" | "tags">, limit = 3): Promise<ArticleSummary[]> {
  const db = await conn();
  const r = await db.execute({ sql: `SELECT ${SUMMARY_COLS} ${FROM} WHERE a.status = 'published' AND a.id <> ? ORDER BY a.published_at DESC LIMIT 60`, args: [article.id] });
  return r.rows
    .map(toSummary)
    .map((a) => ({ a, score: (a.categoryId && a.categoryId === article.categoryId ? 2 : 0) + a.tags.filter((t) => article.tags.some((x) => x.toLowerCase() === t.toLowerCase())).length }))
    .sort((x, y) => y.score - x.score || (y.a.publishedAt ?? "").localeCompare(x.a.publishedAt ?? ""))
    .slice(0, limit)
    .map((x) => x.a);
}

export async function listForSitemap(): Promise<{ slug: string; updatedAt: string; publishedAt: string }[]> {
  const db = await conn();
  const r = await db.execute("SELECT slug, updated_at, published_at FROM articles WHERE status = 'published' ORDER BY published_at DESC");
  return r.rows.map((x) => ({ slug: s(x.slug), updatedAt: s(x.updated_at), publishedAt: s(x.published_at) }));
}

/** Articles published (or updated) in the last N days, newest first: the source of the "copy all links" list in the admin area. */
export async function listRecentlyPublished(days = 30, limit = 200): Promise<{ title: string; slug: string; publishedAt: string; updatedAt: string }[]> {
  const db = await conn();
  const since = new Date(Date.now() - days * 86_400_000).toISOString();
  const r = await db.execute({
    sql: "SELECT title, slug, published_at, updated_at FROM articles WHERE status = 'published' AND (published_at >= ? OR updated_at >= ?) ORDER BY published_at DESC LIMIT ?",
    args: [since, since, limit],
  });
  return r.rows.map((x) => ({ title: s(x.title), slug: s(x.slug), publishedAt: s(x.published_at), updatedAt: s(x.updated_at) }));
}

export async function listTags(limit = 30): Promise<{ tag: string; count: number }[]> {
  const db = await conn();
  const r = await db.execute({
    sql: `SELECT lower(j.value) AS tag, COUNT(*) AS c FROM articles a, json_each(a.tags) j WHERE a.status = 'published' GROUP BY lower(j.value) ORDER BY c DESC, tag LIMIT ?`,
    args: [limit],
  });
  return r.rows.map((x) => ({ tag: s(x.tag), count: n(x.c) }));
}

export type AdminQuery = { status?: ArticleStatus; authorId?: string; involvedUserId?: string; q?: string; page?: number; perPage?: number; review?: boolean };

export async function listForAdmin(query: AdminQuery = {}): Promise<{ items: ArticleSummary[]; total: number; page: number; pageCount: number }> {
  const db = await conn();
  const perPage = Math.min(Math.max(query.perPage ?? 25, 1), 100);
  const where = ["1 = 1"];
  const args: (string | number)[] = [];
  if (query.status) {
    where.push("a.status = ?");
    args.push(query.status);
  }
  if (query.authorId) {
    where.push("a.author_id = ?");
    args.push(query.authorId);
  }
  if (query.involvedUserId) {
    // A contributor sees articles they wrote or that were assigned to them, nothing else.
    where.push("(a.author_id = ? OR a.assigned_to = ?)");
    args.push(query.involvedUserId, query.involvedUserId);
  }
  if (query.review) where.push("a.review_status = 'requested'");
  const q = query.q?.trim().slice(0, 80);
  if (q) {
    // An exact Article ID (a_…) matches exactly; anything else searches the title and the address.
    where.push("(a.title LIKE ? ESCAPE '\\' OR a.slug LIKE ? ESCAPE '\\' OR a.id = ?)");
    args.push(likePattern(q), likePattern(q), q);
  }
  const cond = where.join(" AND ");
  const total = n((await db.execute({ sql: `SELECT COUNT(*) AS c ${FROM} WHERE ${cond}`, args })).rows[0].c);
  const pageCount = Math.max(1, Math.ceil(total / perPage));
  const page = Math.min(Math.max(query.page ?? 1, 1), pageCount);
  const r = await db.execute({ sql: `SELECT ${SUMMARY_COLS} ${FROM} WHERE ${cond} ORDER BY a.updated_at DESC LIMIT ? OFFSET ?`, args: [...args, perPage, (page - 1) * perPage] });
  return { items: r.rows.map(toSummary), total, page, pageCount };
}

export async function countByStatus(): Promise<{ draft: number; published: number; archived: number; review: number }> {
  const db = await conn();
  const r = await db.execute("SELECT status, COUNT(*) AS c FROM articles GROUP BY status");
  const out = { draft: 0, published: 0, archived: 0, review: 0 };
  for (const row of r.rows) out[s(row.status) as ArticleStatus] = n(row.c);
  out.review = n((await db.execute("SELECT COUNT(*) AS c FROM articles WHERE review_status = 'requested' AND status = 'draft'")).rows[0].c);
  return out;
}

// ---------------------------------------------------------------- writes

function derived(doc: Doc, data: Pick<ArticleData, "excerpt">) {
  const rendered = renderDoc(doc);
  const text = docToText(doc);
  return { html: rendered.html, hasMath: rendered.hasMath, text, minutes: readingMinutes(text), excerpt: data.excerpt || truncate(text, 280) };
}

/** Creates a draft. The author id is the signed-in user's id (or null for imports). */
export async function createArticle(input: ArticleInput, actor: { id: string | null; name?: string }, extra: { assignedTo?: string | null } = {}): Promise<ArticleRecord> {
  const data = articleInputSchema.parse(input);
  const db = await conn();
  const id = newId("a_");
  if (data.slug && (await slugInUse(data.slug))) throw new ArticleError("slug_taken", "That address is already used by another article.");
  const slug = data.slug ?? (await uniqueSlug(data.title));
  const d = derived(data.doc, data);
  const t = nowIso();
  await db.execute({
    sql: `INSERT INTO articles(id, slug, title, excerpt, category_id, author_name, author_id, status, doc, html, body_text, has_math, cover_url, cover_alt, cover_credit,
            cover_width, cover_height, tags, seo_title, seo_description, reading_minutes, featured, source, version, created_at, updated_at,
            assigned_to, last_editor_id, last_editor_name)
          VALUES (?, ?, ?, ?, ?, ?, ?, 'draft', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?, ?, ?)`,
    args: [
      id, slug, data.title, data.excerpt, data.categoryId, data.authorName, actor.id, JSON.stringify(data.doc), d.html, d.text, d.hasMath ? 1 : 0,
      data.coverUrl, data.coverAlt, data.coverCredit, data.coverWidth, data.coverHeight, JSON.stringify(data.tags), data.seoTitle, data.seoDescription,
      d.minutes, data.featured ? 1 : 0, data.source, t, t, extra.assignedTo ?? null, actor.id, actor.name ?? data.authorName,
    ],
  });
  await audit(actor.id, "article.create", id);
  const created = (await getArticleById(id))!;
  await recordRevision({ articleId: id, version: created.version, title: created.title, excerpt: created.excerpt, doc: created.doc, editor: { id: actor.id, name: actor.name ?? data.authorName }, kind: "auto" });
  return created;
}

/**
 * Saves changes. `expectedVersion` makes autosave safe: if another tab or person saved in between, the write is refused
 * (code "conflict") instead of silently overwriting their work.
 */
export async function updateArticle(id: string, input: ArticleInput, actor: { id: string | null; name?: string }, expectedVersion?: number, opts: { kind?: RevisionKind; note?: string } = {}): Promise<ArticleRecord> {
  const data = articleInputSchema.parse(input);
  const cur = await getArticleById(id);
  if (!cur) throw new ArticleError("not_found", "Article not found.");
  if (expectedVersion != null && expectedVersion !== cur.version) throw new ArticleError("conflict", "This article was changed somewhere else. Reload to continue.");
  let slug = cur.slug;
  if (data.slug && data.slug !== cur.slug) {
    if (await slugInUse(data.slug, id)) throw new ArticleError("slug_taken", "That address is already used by another article.");
    slug = data.slug;
  }
  const d = derived(data.doc, data);
  const db = await conn();
  const stmts = [];
  if (slug !== cur.slug && cur.status === "published") {
    // Keep the old URL alive as a permanent redirect so links and search results do not break.
    stmts.push({ sql: "INSERT OR REPLACE INTO slug_redirects(old_slug, article_id) VALUES (?, ?)", args: [cur.slug, id] });
  }
  stmts.push({ sql: "DELETE FROM slug_redirects WHERE old_slug = ?", args: [slug] });
  stmts.push({
    sql: `UPDATE articles SET slug = ?, title = ?, excerpt = ?, category_id = ?, author_name = ?, doc = ?, html = ?, body_text = ?, has_math = ?, cover_url = ?,
            cover_alt = ?, cover_credit = ?, cover_width = ?, cover_height = ?, tags = ?, seo_title = ?, seo_description = ?, reading_minutes = ?, featured = ?,
            source = ?, version = version + 1, updated_at = ?, last_editor_id = ?, last_editor_name = ?
          WHERE id = ? AND version = ?`,
    args: [
      slug, data.title, data.excerpt, data.categoryId, data.authorName, JSON.stringify(data.doc), d.html, d.text, d.hasMath ? 1 : 0, data.coverUrl, data.coverAlt,
      data.coverCredit, data.coverWidth, data.coverHeight, JSON.stringify(data.tags), data.seoTitle, data.seoDescription, d.minutes, data.featured ? 1 : 0,
      data.source === "editor" ? cur.source : data.source, nowIso(), actor.id, actor.name ?? "", id, cur.version,
    ],
  });
  const res = await db.batch(stmts, "write");
  if (res[res.length - 1].rowsAffected === 0) throw new ArticleError("conflict", `This article was changed by ${cur.lastEditorName || "someone else"} while you were editing. Reload to continue.`);
  const updated = (await getArticleById(id))!;
  await recordRevision({ articleId: id, version: updated.version, title: updated.title, excerpt: updated.excerpt, doc: updated.doc, editor: { id: actor.id, name: actor.name ?? "" }, kind: opts.kind ?? "auto", note: opts.note });
  return updated;
}

/** Review workflow state. Only the owner can set "approved" (the API enforces who may do what). */
export async function setReviewStatus(id: string, status: ReviewStatus): Promise<void> {
  const db = await conn();
  await db.execute({ sql: "UPDATE articles SET review_status = ?, submitted_for_review = ?, updated_at = ? WHERE id = ? AND status = 'draft'", args: [status, status === "requested" ? 1 : 0, nowIso(), id] });
}

export async function setAssignedTo(id: string, userId: string | null): Promise<void> {
  const db = await conn();
  await db.execute({ sql: "UPDATE articles SET assigned_to = ?, updated_at = ? WHERE id = ?", args: [userId, nowIso(), id] });
}

/** Lightweight "is my copy still current?" check used by the editor's "Check for updates" button (one row, no content). */
export async function getArticleMeta(id: string): Promise<{ version: number; updatedAt: string; lastEditorName: string; status: ArticleStatus; reviewStatus: ReviewStatus } | null> {
  const db = await conn();
  const r = (await db.execute({ sql: "SELECT version, updated_at, last_editor_name, status, review_status FROM articles WHERE id = ?", args: [id] })).rows[0];
  return r ? { version: n(r.version), updatedAt: s(r.updated_at), lastEditorName: s(r.last_editor_name), status: s(r.status) as ArticleStatus, reviewStatus: s(r.review_status) as ReviewStatus } : null;
}

export type StatusResult = { ok: true; article: ArticleRecord } | { ok: false; problems: string[]; belowMinimum?: { min: number; words: number } };

export async function publishArticle(id: string, actorId: string | null, opts: { override?: boolean } = {}): Promise<StatusResult> {
  const a = await getArticleById(id);
  if (!a) throw new ArticleError("not_found", "Article not found.");
  const problems = publishProblems(a);
  // Every reference must pass the check against the current list (no owner override for this).
  problems.push(...refcheckGate({ count: a.refs.length, status: a.refcheckStatus, current: a.refcheckCurrent, report: a.refcheckReport }));
  // Minimum length: a short article is refused unless the owner explicitly overrides the rule for this publication.
  const min = await getMinWords();
  const words = wordCount(a.bodyText);
  const short = belowMinimum(words, min);
  if (short && !opts.override) {
    problems.push(`This article has ${words} words; the minimum for publication is ${min}. Add content, or publish anyway as the owner (override).`);
    return { ok: false, problems, belowMinimum: { min, words } };
  }
  if (problems.length) return { ok: false, problems };
  if (short) await audit(actorId, "article.publish_override", `${words} words, minimum ${min}`);
  const db = await conn();
  const t = nowIso();
  await db.execute({
    sql: "UPDATE articles SET status = 'published', published_at = COALESCE(published_at, ?), archived_at = NULL, submitted_for_review = 0, review_status = 'none', version = version + 1, updated_at = ? WHERE id = ?",
    args: [t, t, id],
  });
  await db.execute({ sql: "DELETE FROM gone_slugs WHERE slug = ?", args: [a.slug] });
  await audit(actorId, "article.publish", id);
  const live = (await getArticleById(id))!;
  await recordRevision({ articleId: id, version: live.version, title: live.title, excerpt: live.excerpt, doc: live.doc, editor: { id: actorId, name: "Owner" }, kind: "publish" });
  return { ok: true, article: live };
}

/** Back to draft: the page disappears from the site, listings and sitemap but nothing is lost. */
export async function unpublishArticle(id: string, actorId: string | null): Promise<ArticleRecord> {
  const db = await conn();
  const t = nowIso();
  const r = await db.execute({ sql: "UPDATE articles SET status = 'draft', version = version + 1, updated_at = ? WHERE id = ? AND status <> 'draft'", args: [t, id] });
  if (!r.rowsAffected && !(await getArticleById(id))) throw new ArticleError("not_found", "Article not found.");
  await audit(actorId, "article.unpublish", id);
  return (await getArticleById(id))!;
}

export async function archiveArticle(id: string, actorId: string | null): Promise<ArticleRecord> {
  const db = await conn();
  const t = nowIso();
  const r = await db.execute({ sql: "UPDATE articles SET status = 'archived', archived_at = ?, featured = 0, version = version + 1, updated_at = ? WHERE id = ?", args: [t, t, id] });
  if (!r.rowsAffected) throw new ArticleError("not_found", "Article not found.");
  await audit(actorId, "article.archive", id);
  return (await getArticleById(id))!;
}

/**
 * Permanent delete. If the article was ever public its address is remembered ("gone") so it can never be re-used for a
 * different article and the site answers 404 rather than guessing. Redirects that pointed at it are dropped.
 */
export async function deleteArticle(id: string, actorId: string | null): Promise<boolean> {
  const a = await getArticleById(id);
  if (!a) return false;
  const db = await conn();
  const stmts = [
    { sql: "DELETE FROM slug_redirects WHERE article_id = ?", args: [id] },
    { sql: "DELETE FROM article_sponsorships WHERE article_id = ?", args: [id] },
    { sql: "UPDATE submissions SET article_id = NULL WHERE article_id = ?", args: [id] },
    { sql: "DELETE FROM articles WHERE id = ?", args: [id] },
  ];
  if (a.publishedAt) stmts.push({ sql: "INSERT OR REPLACE INTO gone_slugs(slug, deleted_at) VALUES (?, ?)", args: [a.slug, nowIso()] });
  await db.batch(stmts, "write");
  await audit(actorId, "article.delete", `${id} ${a.slug}`);
  return true;
}
