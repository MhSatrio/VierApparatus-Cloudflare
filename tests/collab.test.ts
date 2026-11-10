import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { tempDb } from "./helpers";
import { setMinWords } from "@/lib/store/site-settings";

// Route handlers read the session cookie through next/headers; tests swap identities by changing this jar.
const jar = new Map<string, string>();
vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: (name: string) => (jar.has(name) ? { name, value: jar.get(name)! } : undefined),
    set: (name: string, value: string) => void jar.set(name, value),
  }),
}));

import { bootstrapOwner, createContributorAccount, login } from "@/lib/auth/service";
import { csrfTokenFor } from "@/lib/auth/request";
import { SESSION_COOKIE } from "@/lib/auth/guard";
import { sha256Hex } from "@/lib/crypto";
import { conn } from "@/lib/db/client";
import { canEditArticle, canViewArticle } from "@/lib/article-access";
import { applyView, emptyConfig, isOverdue, type PlannerRecord } from "@/lib/planner-shared";
import { viewerOf } from "@/lib/planner-http";
import { ArticleError, createArticle, getArticleById, getArticleMeta, updateArticle } from "@/lib/store/articles";
import { addComment, listComments } from "@/lib/store/comments";
import {
  assignRecord, collabSummary, createDraftForRecord, createField, createRecord, deleteView, exportRecordsCsv, getInfo, getRecord, linkArticle, listFields, listRecords, listViews, PlannerError,
  saveView, setInfo, shareRecord, transition, updateRecord,
} from "@/lib/store/planner";
import { getRevision, listRevisions, KEEP_AUTO } from "@/lib/store/revisions";
import { getAttachmentMetas } from "@/lib/store/attachments";
import { overview } from "@/lib/store/analytics-rollup";
import { getUserByEmail, type User } from "@/lib/store/users";

import * as plannerRoute from "@/app/api/admin/planner/route";
import * as plannerIdRoute from "@/app/api/admin/planner/[id]/route";
import * as plannerActionRoute from "@/app/api/admin/planner/[id]/action/route";
import * as plannerInfoRoute from "@/app/api/admin/planner/info/route";
import * as plannerFieldsRoute from "@/app/api/admin/planner/fields/route";
import * as plannerBulkRoute from "@/app/api/admin/planner/bulk/route";
import * as plannerExportRoute from "@/app/api/admin/planner/export/route";
import * as commentsRoute from "@/app/api/admin/comments/route";
import * as commentRoute from "@/app/api/admin/comments/[id]/route";
import * as revisionsRoute from "@/app/api/admin/articles/[id]/revisions/route";
import * as metaRoute from "@/app/api/admin/articles/[id]/meta/route";
import * as articleRoute from "@/app/api/admin/articles/[id]/route";
import * as statusRoute from "@/app/api/admin/articles/[id]/status/route";
import * as usersRoute from "@/app/api/admin/users/route";
import * as userRoute from "@/app/api/admin/users/[id]/route";
import * as passwordRoute from "@/app/api/admin/users/[id]/password/route";
import * as changePw from "@/app/api/auth/change-password/route";
import * as analyticsExport from "@/app/api/admin/analytics/export/route";

const ORIGIN = "http://localhost:3000";
let cleanup: () => void;
let owner: User;
let wendy: User; // contributor with every grantable permission
let sam: User; // contributor with every grantable permission, never assigned anything
let plain: User; // contributor WITHOUT collab access
const tokens: Record<string, string> = {};
const csrf: Record<string, string> = {};
let n = 0;

const viewer = (u: User) => viewerOf(u);
const as = (who: string | null) => {
  jar.clear();
  if (who) jar.set(SESSION_COOKIE, tokens[who]);
};
const req = (path: string, init: { method?: string; body?: unknown; csrfFor?: string | null } = {}) => {
  const headers: Record<string, string> = { host: "localhost:3000", "x-forwarded-for": `10.1.0.${(n++ % 250) + 1}`, origin: ORIGIN };
  if (init.csrfFor) headers["x-csrf-token"] = csrf[init.csrfFor];
  let body: BodyInit | undefined;
  if (init.body !== undefined) {
    headers["content-type"] = "application/json";
    body = JSON.stringify(init.body);
  }
  return new Request(`${ORIGIN}${path}`, { method: init.method ?? "POST", headers, body });
};
const post = (path: string, who: string, body: unknown, method = "POST") => req(path, { method, body, csrfFor: who });
const params = <T extends Record<string, string>>(p: T) => ({ params: Promise.resolve(p) });
const doc = (text: string) => ({ version: 1 as const, blocks: [{ type: "paragraph" as const, content: [{ t: "text" as const, text }] }] });
const articleBody = (title: string, text = "Body text", over: Record<string, unknown> = {}) => ({ title, excerpt: "A summary that is long enough to publish.", authorName: "Someone", doc: doc(text), ...over });

async function signIn(key: string, email: string, password: string) {
  const r = await login({ email, password, ipHash: `ip-${key}`, userAgent: "vitest" });
  if (!r.ok) throw new Error(`login ${key}`);
  tokens[key] = r.token;
  csrf[key] = await csrfTokenFor(await sha256Hex(r.token));
}

/** Counts database round trips made while `fn` runs (a Cloudflare Worker allows only 50 subrequests per request). */
async function roundTrips<T>(fn: () => Promise<T>): Promise<{ result: T; calls: number }> {
  const db = await conn();
  let calls = 0;
  const e = db.execute.bind(db);
  const b = db.batch.bind(db);
  (db as unknown as { execute: unknown }).execute = (...a: unknown[]) => (calls++, (e as (...x: unknown[]) => unknown)(...a));
  (db as unknown as { batch: unknown }).batch = (...a: unknown[]) => (calls++, (b as (...x: unknown[]) => unknown)(...a));
  try {
    return { result: await fn(), calls };
  } finally {
    (db as unknown as { execute: unknown }).execute = e;
    (db as unknown as { batch: unknown }).batch = b;
  }
}

beforeAll(async () => {
  cleanup = tempDb();
  // The publishing minimum is a product default (600 words). These tests check other behaviour with short fixtures,
  // so they switch the minimum off; tests/publish-rules.test.ts checks the rule itself.
  await setMinWords(0);
  const PW = "Owner-Collab-Pass-2026!";
  await bootstrapOwner({ email: "info@vierapparatus.com", name: "Editor In Chief", password: PW });
  owner = (await getUserByEmail("info@vierapparatus.com"))!;
  const db = await conn();
  await db.execute({ sql: "UPDATE users SET must_change_password = 0 WHERE id = ?", args: [owner.id] });
  const mk = async (name: string, email: string, permissions?: string[]) => {
    const r = await createContributorAccount(owner.id, { name, email, password: "Contributor-Pass-2026!", permissions });
    if (!r.ok) throw new Error(r.error);
    return r.user;
  };
  wendy = await mk("Wendy Writer", "wendy@example.org");
  sam = await mk("Sam Scientist", "sam@example.org");
  plain = await mk("Pat Plain", "pat@example.org", ["articles.write"]);
  await signIn("owner", "info@vierapparatus.com", PW);
  await signIn("wendy", "wendy@example.org", "Contributor-Pass-2026!");
  await signIn("sam", "sam@example.org", "Contributor-Pass-2026!");
  await signIn("plain", "pat@example.org", "Contributor-Pass-2026!");
});
afterAll(() => cleanup());
beforeEach(() => jar.clear());

describe("planner records and the access policy", () => {
  let a: PlannerRecord;
  let b: PlannerRecord;

  it("numbers tasks and lets only the owner create them", async () => {
    a = await createRecord(viewer(owner), { title: "Candida auris surveillance", brief: "Cover the 2026 data", assignedTo: wendy.id, priority: "high", dueDate: "2026-12-01", notes: "PRIVATE owner note" });
    b = await createRecord(viewer(owner), { title: "Unassigned idea" });
    expect(a.ref).toBe("T-0001");
    expect(b.ref).toBe("T-0002");
    expect(a.status).toBe("planned"); // assigning an idea moves it to planned
    await expect(createRecord(viewer(wendy), { title: "I would like to create one" })).rejects.toMatchObject({ code: "forbidden" });
  });

  it("shows a contributor only what is assigned to, created by or shared with them", async () => {
    expect((await getRecord(viewer(wendy), a.id))?.id).toBe(a.id);
    expect(await getRecord(viewer(wendy), b.id)).toBeNull();
    expect(await getRecord(viewer(sam), a.id)).toBeNull();
    expect((await listRecords(viewer(wendy))).items.map((r) => r.id)).toEqual([a.id]);
    expect((await listRecords(viewer(sam))).total).toBe(0);
    expect((await listRecords(viewer(owner))).total).toBe(2);
    await shareRecord(viewer(owner), a.id, [sam.id]);
    expect((await getRecord(viewer(sam), a.id))?.id).toBe(a.id); // shared: read access
    await shareRecord(viewer(owner), a.id, []);
    expect(await getRecord(viewer(sam), a.id)).toBeNull(); // un-sharing takes effect at once
  });

  it("hides the owner's private notes from contributors and denies everything without collab access", async () => {
    expect((await getRecord(viewer(owner), a.id))?.notes).toBe("PRIVATE owner note");
    const seen = await getRecord(viewer(wendy), a.id);
    expect(seen?.notes).toBe("");
    expect(JSON.stringify(await listRecords(viewer(wendy)))).not.toContain("PRIVATE");
    await assignRecord(viewer(owner), b.id, plain.id);
    expect(await getRecord(viewer(plain), b.id)).toBeNull(); // assigned, but no collab.access
    expect((await listRecords(viewer(plain))).items).toEqual([]);
    expect(await collabSummary(viewer(plain))).toMatchObject({ open: 0, mine: 0 });
    await assignRecord(viewer(owner), b.id, null);
  });

  it("lets a contributor write research notes and nothing else", async () => {
    const r = await updateRecord(viewer(wendy), a.id, { researchNotes: "Source: CDC report" }, (await getRecord(viewer(wendy), a.id))!.version);
    expect(r.researchNotes).toBe("Source: CDC report");
    await expect(updateRecord(viewer(wendy), a.id, { title: "Hijacked" })).rejects.toMatchObject({ code: "forbidden" });
    await expect(updateRecord(viewer(wendy), a.id, { priority: "low" })).rejects.toMatchObject({ code: "forbidden" });
    await expect(updateRecord(viewer(wendy), a.id, { status: "done" })).rejects.toMatchObject({ code: "forbidden" });
    await expect(updateRecord(viewer(sam), a.id, { researchNotes: "not mine" })).rejects.toMatchObject({ code: "not_found" });
    expect((await getRecord(viewer(owner), a.id))?.title).toBe("Candida auris surveillance");
  });

  it("refuses a stale save instead of overwriting", async () => {
    const cur = (await getRecord(viewer(owner), a.id))!;
    await updateRecord(viewer(owner), a.id, { brief: "Edited once" }, cur.version);
    await expect(updateRecord(viewer(owner), a.id, { brief: "Edited from a stale page" }, cur.version)).rejects.toMatchObject({ code: "conflict" });
    expect((await getRecord(viewer(owner), a.id))?.brief).toBe("Edited once");
  });

  it("validates custom fields and ignores unknown or badly typed values", async () => {
    const f = await createField({ name: "Source type", type: "select", options: ["Journal", "Preprint"] });
    const n2 = await createField({ name: "Words", type: "number", options: [] });
    const cur = (await getRecord(viewer(owner), a.id))!;
    const r = await updateRecord(viewer(owner), a.id, { custom: { [f.id]: "Journal", [n2.id]: "abc", ghost: "x" } }, cur.version);
    expect(r.custom).toEqual({ [f.id]: "Journal" });
    const r2 = await updateRecord(viewer(owner), a.id, { custom: { [f.id]: "Podcast", [n2.id]: "1200" } });
    expect(r2.custom).toEqual({ [f.id]: "Journal", [n2.id]: 1200 });
    await expect(updateRecord(viewer(wendy), a.id, { custom: { [f.id]: "Preprint" } })).rejects.toMatchObject({ code: "forbidden" });
  });

  it("keeps the information box owner-only to edit but readable by everyone", async () => {
    await setInfo(viewer(owner), "Deadlines are Fridays.");
    await expect(setInfo(viewer(wendy), "mine now")).rejects.toBeInstanceOf(PlannerError);
    expect(await getInfo()).toBe("Deadlines are Fridays.");
  });

  it("saved views: owner's can be global; a contributor's are private and cannot touch global ones", async () => {
    const g = await saveView(viewer(owner), { name: "Everything urgent", kind: "table", scope: "collab", config: { filters: { priority: "urgent" }, hidden: [] }, global: true });
    expect(g.userId).toBeNull();
    const mine = await saveView(viewer(wendy), { name: "My kanban", kind: "kanban", scope: "collab", config: { filters: {}, hidden: [] }, global: true }); // global ignored
    expect(mine.userId).toBe(wendy.id);
    expect((await listViews(viewer(wendy), "collab")).map((v) => v.name).sort()).toEqual(["Everything urgent", "My kanban"]);
    expect((await listViews(viewer(sam), "collab")).map((v) => v.name)).toEqual(["Everything urgent"]); // sam never sees wendy's
    await expect(deleteView(viewer(wendy), g.id)).rejects.toMatchObject({ code: "forbidden" });
    await expect(deleteView(viewer(sam), mine.id)).rejects.toMatchObject({ code: "forbidden" });
    expect(await deleteView(viewer(wendy), mine.id)).toBe(true);
    expect(await deleteView(viewer(owner), g.id)).toBe(true);
    await expect(saveView(viewer(wendy), { name: "x", kind: "table", scope: "collab", config: {} })).rejects.toBeInstanceOf(PlannerError);
  });

  it("exports CSV for the owner only, with spreadsheet formulas neutralised", async () => {
    await createRecord(viewer(owner), { title: "=HYPERLINK(\"http://evil\")" });
    const csv = await exportRecordsCsv(viewer(owner));
    expect(csv.split("\n")[0]).toContain("Task ID,Title,Status");
    expect(csv).toContain("'=HYPERLINK");
    await expect(exportRecordsCsv(viewer(wendy))).rejects.toMatchObject({ code: "forbidden" });
  });
});

describe("assignment, the editorial workflow and publishing", () => {
  let rec: PlannerRecord;
  let articleId: string;

  it("creates ONE draft for a task, assigned to the same person, with no duplicate records", async () => {
    rec = await createRecord(viewer(owner), { title: "Workflow task", assignedTo: wendy.id });
    const d = await createDraftForRecord(viewer(owner), rec.id);
    articleId = d.articleId;
    expect((await createDraftForRecord(viewer(owner), rec.id)).articleId).toBe(articleId); // idempotent
    const art = (await getArticleById(articleId))!;
    expect(art.assignedTo).toBe(wendy.id);
    expect((await getRecord(viewer(owner), rec.id))?.articleId).toBe(articleId);
    const count = Number((await (await conn()).execute({ sql: "SELECT COUNT(*) AS c FROM planner_records WHERE article_id = ?", args: [articleId] })).rows[0].c);
    expect(count).toBe(1);
    const other = await createRecord(viewer(owner), { title: "Another" });
    await expect(linkArticle(viewer(owner), other.id, articleId)).rejects.toMatchObject({ code: "conflict" }); // an article belongs to one task
  });

  it("lets the assignee see and edit the draft, and nobody else", async () => {
    const art = (await getArticleById(articleId))!;
    expect(canViewArticle(wendy, art) && canEditArticle(wendy, art)).toBe(true);
    expect(canViewArticle(sam, art)).toBe(false);
    expect(canEditArticle(plain, art)).toBe(false);
    expect(canEditArticle(owner, art)).toBe(true);
  });

  it("follows the workflow: start, submit (locks editing), revision, resubmit, approve, never publish", async () => {
    let r = await transition(viewer(wendy), rec.id, "start");
    expect(r.status).toBe("in_progress");
    await expect(transition(viewer(sam), rec.id, "start")).rejects.toMatchObject({ code: "not_found" });
    await expect(transition(viewer(wendy), rec.id, "approve")).rejects.toMatchObject({ code: "forbidden" });
    await expect(transition(viewer(wendy), rec.id, "complete")).rejects.toMatchObject({ code: "forbidden" });
    await expect(transition(viewer(wendy), rec.id, "request_revision")).rejects.toMatchObject({ code: "forbidden" });

    r = await transition(viewer(wendy), rec.id, "submit", "Ready for a look");
    expect(r.status).toBe("in_review");
    let art = (await getArticleById(articleId))!;
    expect(art.reviewStatus).toBe("requested");
    expect(canEditArticle(wendy, art)).toBe(false); // locked while in review
    expect(canViewArticle(wendy, art)).toBe(true); // still readable

    r = await transition(viewer(owner), rec.id, "request_revision", "Please add the 2026 figures");
    expect(r.status).toBe("revision");
    art = (await getArticleById(articleId))!;
    expect(art.reviewStatus).toBe("revision");
    expect(canEditArticle(wendy, art)).toBe(true);
    expect((await listComments({ recordId: rec.id })).map((c) => c.body)).toEqual(expect.arrayContaining(["Ready for a look", "Please add the 2026 figures"]));

    await transition(viewer(wendy), rec.id, "submit");
    r = await transition(viewer(owner), rec.id, "approve");
    expect(r.status).toBe("approved");
    art = (await getArticleById(articleId))!;
    expect(art.reviewStatus).toBe("approved");
    expect(art.status).toBe("draft"); // approving does not publish
  });

  it("keeps a snapshot at every review step", async () => {
    const kinds = (await listRevisions(articleId)).map((x) => x.kind);
    expect(kinds).toEqual(expect.arrayContaining(["submit", "revision", "approve"]));
  });

  it("reassigning moves access immediately and keeps the draft in step", async () => {
    await assignRecord(viewer(owner), rec.id, sam.id);
    expect(await getRecord(viewer(wendy), rec.id)).toBeNull();
    expect((await getRecord(viewer(sam), rec.id))?.id).toBe(rec.id);
    const art = (await getArticleById(articleId))!;
    expect(art.assignedTo).toBe(sam.id);
    expect(canViewArticle(wendy, art)).toBe(false);
    expect(canViewArticle(sam, art)).toBe(true);
    await assignRecord(viewer(owner), rec.id, wendy.id);
  });

  it("marks the task done only when the OWNER publishes, through the API", async () => {
    as("wendy");
    const denied = await statusRoute.POST(post(`/api/admin/articles/${articleId}/status`, "wendy", { action: "publish" }), params({ id: articleId }));
    expect(denied.status).toBe(403);
    expect((await getArticleById(articleId))?.status).toBe("draft");
    for (const action of ["approve", "request_revision", "unpublish", "archive"]) {
      expect((await statusRoute.POST(post(`/api/admin/articles/${articleId}/status`, "wendy", { action }), params({ id: articleId }))).status).toBe(403);
    }
    // give it what publishing needs, then publish as the owner
    const db = await conn();
    const cat = (await db.execute("SELECT id FROM categories LIMIT 1")).rows[0].id as string;
    await updateArticle(articleId, { ...articleBody("Workflow task"), categoryId: cat, coverUrl: "/media/x", coverAlt: "cover" }, { id: owner.id, name: owner.name });
    as("owner");
    const ok = await statusRoute.POST(post(`/api/admin/articles/${articleId}/status`, "owner", { action: "publish" }), params({ id: articleId }));
    expect(ok.status).toBe(200);
    {
      expect((await getRecord(viewer(owner), rec.id))?.status).toBe("done");
      await transition(viewer(owner), rec.id, "reopen");
    }
  });
});

describe("comments", () => {
  let rec: PlannerRecord;
  beforeAll(async () => {
    rec = await createRecord(viewer(owner), { title: "Comment task", assignedTo: wendy.id });
  });

  it("lets the people who can see a task comment, and nobody else", async () => {
    as("wendy");
    const ok = await commentsRoute.POST(post("/api/admin/comments", "wendy", { recordId: rec.id, parentId: null, body: "First thoughts" }));
    expect(ok.status).toBe(200);
    const c = (await ok.json()).comment;
    expect(c.authorName).toBe("Wendy Writer"); // the author comes from the session, never from the request
    as("sam");
    expect((await commentsRoute.POST(post("/api/admin/comments", "sam", { recordId: rec.id, body: "Sneaky" }))).status).toBe(404);
    as("owner");
    expect((await commentsRoute.POST(post("/api/admin/comments", "owner", { recordId: rec.id, body: "Reply", parentId: c.id }))).status).toBe(200);
    const nested = await commentsRoute.POST(post("/api/admin/comments", "owner", { recordId: rec.id, body: "Too deep", parentId: (await listComments({ recordId: rec.id })).find((x) => x.parentId)!.id }));
    expect(nested.status).toBe(400); // one level of replies only
  });

  it("lets you edit or delete only your own; only the owner resolves", async () => {
    const [mine] = (await listComments({ recordId: rec.id })).filter((c) => c.authorId === wendy.id);
    as("sam");
    expect((await commentRoute.PATCH(post(`/api/admin/comments/${mine.id}`, "sam", { body: "edited" }, "PATCH"), params({ id: mine.id }))).status).toBe(404);
    as("wendy");
    expect((await commentRoute.PATCH(post(`/api/admin/comments/${mine.id}`, "wendy", { resolved: true }, "PATCH"), params({ id: mine.id }))).status).toBe(403);
    expect((await commentRoute.PATCH(post(`/api/admin/comments/${mine.id}`, "wendy", { body: "Better wording" }, "PATCH"), params({ id: mine.id }))).status).toBe(200);
    as("owner");
    const theirs = (await listComments({ recordId: rec.id })).find((c) => c.authorId === owner.id)!;
    as("wendy");
    expect((await commentRoute.PATCH(post(`/api/admin/comments/${theirs.id}`, "wendy", { body: "rewriting the editor" }, "PATCH"), params({ id: theirs.id }))).status).toBe(403);
    expect((await commentRoute.DELETE(post(`/api/admin/comments/${theirs.id}`, "wendy", undefined, "DELETE"), params({ id: theirs.id }))).status).toBe(403);
    as("owner");
    expect((await commentRoute.PATCH(post(`/api/admin/comments/${mine.id}`, "owner", { resolved: true }, "PATCH"), params({ id: mine.id }))).status).toBe(200);
    expect((await listComments({ recordId: rec.id })).find((c) => c.id === mine.id)?.resolved).toBe(true);
  });

  it("rejects empty, oversized and control-character comments", async () => {
    expect(await addComment({ recordId: rec.id, author: { id: owner.id, name: "x" }, body: "   " })).toBeNull();
    expect(await addComment({ recordId: rec.id, author: { id: owner.id, name: "x" }, body: "a".repeat(4001) })).toBeNull();
    const c = await addComment({ recordId: rec.id, author: { id: owner.id, name: "x" }, body: "he\u0000llo <b>bold</b>" });
    expect(c?.body).toBe("hello <b>bold</b>"); // stored as text; the UI renders it as text, never as HTML
  });
});

describe("version history and conflicts", () => {
  let id: string;
  beforeAll(async () => {
    id = (await createArticle(articleBody("History article", "v1"), { id: owner.id, name: owner.name }, { assignedTo: wendy.id })).id;
  });

  it("detects a stale save and names who changed it", async () => {
    const a = (await getArticleById(id))!;
    await updateArticle(id, articleBody("History article", "by owner"), { id: owner.id, name: "Editor In Chief" }, a.version);
    const err = await updateArticle(id, articleBody("History article", "by wendy, stale"), { id: wendy.id, name: "Wendy Writer" }, a.version).catch((e) => e);
    expect(err).toBeInstanceOf(ArticleError);
    expect(err.code).toBe("conflict");
    expect((await getArticleById(id))?.doc.blocks).toEqual(doc("by owner").blocks); // nothing was overwritten
  });

  it("answers the 'is my copy current?' check with one tiny row", async () => {
    const meta = await getArticleMeta(id);
    expect(meta).toMatchObject({ lastEditorName: "Editor In Chief", status: "draft" });
    as("wendy");
    const r = await metaRoute.GET(req(`/api/admin/articles/${id}/meta`, { method: "GET" }), params({ id }));
    expect((await r.json()).version).toBe(meta!.version);
    as("sam");
    expect((await metaRoute.GET(req(`/api/admin/articles/${id}/meta`, { method: "GET" }), params({ id }))).status).toBe(404);
  });

  it("returns 409 over HTTP and refuses edits while the draft is in review", async () => {
    const a = (await getArticleById(id))!;
    as("wendy");
    const stale = await articleRoute.PUT(post(`/api/admin/articles/${id}`, "wendy", { ...articleBody("History article", "late"), expectedVersion: a.version - 1 }, "PUT"), params({ id }));
    expect(stale.status).toBe(409);
    const fresh = await articleRoute.PUT(post(`/api/admin/articles/${id}`, "wendy", { ...articleBody("History article", "wendy edit"), expectedVersion: a.version }, "PUT"), params({ id }));
    expect(fresh.status).toBe(200);
    // submit through the API (loose article, no task), then try to edit
    expect((await statusRoute.POST(post(`/api/admin/articles/${id}/status`, "wendy", { action: "submit" }), params({ id }))).status).toBe(200);
    const cur = (await getArticleById(id))!;
    expect(cur.version).toBe(Number((await fresh.json()).version)); // a review step is not a content change: the open editor stays current
    const locked = await articleRoute.PUT(post(`/api/admin/articles/${id}`, "wendy", { ...articleBody("History article", "while locked"), expectedVersion: cur.version }, "PUT"), params({ id }));
    expect(locked.status).toBe(403);
    expect((await locked.json()).error).toBe("locked_in_review");
    expect((await statusRoute.POST(post(`/api/admin/articles/${id}/status`, "wendy", { action: "withdraw" }), params({ id }))).status).toBe(200);
    const again = await articleRoute.PUT(post(`/api/admin/articles/${id}`, "wendy", { ...articleBody("History article", "after withdrawing"), expectedVersion: cur.version }, "PUT"), params({ id }));
    expect(again.status).toBe(200);
  });

  it("keeps history sensibly: no duplicates, no per-save noise, capped, and restore writes a NEW version", async () => {
    const before = (await listRevisions(id)).length;
    const cur = (await getArticleById(id))!;
    await updateArticle(id, articleBody("History article", "after withdrawing"), { id: wendy.id, name: "Wendy Writer" }, cur.version); // identical content
    expect((await listRevisions(id)).length).toBe(before); // identical content is never stored twice
    const revs = await listRevisions(id);
    expect(new Set(revs.map((r) => r.editorName)).size).toBeGreaterThanOrEqual(2); // a different editor does create a version
    const first = revs[revs.length - 1];
    const snap = await getRevision(id, first.id);
    expect(snap?.doc.blocks).toBeTruthy();
    expect(await getRevision("someone-elses-article", first.id)).toBeNull(); // a revision id cannot be read through another article

    // restore: owner only
    as("wendy");
    expect((await revisionsRoute.POST(post(`/api/admin/articles/${id}/revisions`, "wendy", { action: "restore", revisionId: first.id }), params({ id }))).status).toBe(403);
    as("owner");
    const v = (await getArticleById(id))!.version;
    const ok = await revisionsRoute.POST(post(`/api/admin/articles/${id}/revisions`, "owner", { action: "restore", revisionId: first.id }), params({ id }));
    expect(ok.status).toBe(200);
    expect((await getArticleById(id))!.version).toBe(v + 1);
    expect((await listRevisions(id)).some((r) => r.kind === "restore")).toBe(true);
    // the list and the viewers respect access
    as("sam");
    expect((await revisionsRoute.GET(req(`/api/admin/articles/${id}/revisions`, { method: "GET" }), params({ id }))).status).toBe(404);
    as("wendy");
    expect((await revisionsRoute.GET(req(`/api/admin/articles/${id}/revisions`, { method: "GET" }), params({ id }))).status).toBe(200);
  });

  it("caps automatic revisions", async () => {
    const aid = (await createArticle(articleBody("Capped", "0"), { id: owner.id, name: "Owner" })).id;
    for (let i = 1; i <= KEEP_AUTO + 8; i++) {
      const cur = (await getArticleById(aid))!;
      // alternate editors so each save is a "different person" and therefore stored
      await updateArticle(aid, articleBody("Capped", `text ${i}`), i % 2 ? { id: wendy.id, name: "W" } : { id: owner.id, name: "O" }, cur.version);
    }
    const autos = (await listRevisions(aid, 200)).filter((r) => r.kind === "auto");
    expect(autos.length).toBeLessThanOrEqual(KEEP_AUTO);
  });
});

describe("contributor management over HTTP", () => {
  it("lets contributors do none of the account operations", async () => {
    as("wendy");
    const body = { name: "Mallory", email: "mallory@example.org", password: "Mallory-Pass-2026!!" };
    expect((await usersRoute.POST(post("/api/admin/users", "wendy", body))).status).toBe(403);
    expect((await usersRoute.GET(req("/api/admin/users", { method: "GET" }))).status).toBe(403);
    expect((await passwordRoute.POST(post(`/api/admin/users/${sam.id}/password`, "wendy", { password: "Hijacked-Pass-2026!!" }), params({ id: sam.id }))).status).toBe(403);
    expect((await userRoute.PATCH(post(`/api/admin/users/${wendy.id}`, "wendy", { permissions: ["articles.write"], disabled: false }, "PATCH"), params({ id: wendy.id }))).status).toBe(403);
    expect((await userRoute.DELETE(post(`/api/admin/users/${sam.id}`, "wendy", undefined, "DELETE"), params({ id: sam.id }))).status).toBe(403);
    expect((await changePw.POST(post("/api/auth/change-password", "wendy", { current: "Contributor-Pass-2026!", next: "Self-Chosen-Pass-2026!!" }))).status).toBe(403);
    expect((await getUserByEmail("mallory@example.org"))).toBeNull();
    // and every owner-only workspace route
    expect((await plannerRoute.POST(post("/api/admin/planner", "wendy", { title: "Not allowed" }))).status).toBe(403);
    expect((await plannerFieldsRoute.POST(post("/api/admin/planner/fields", "wendy", { name: "x", type: "text" }))).status).toBe(403);
    expect((await plannerInfoRoute.PUT(post("/api/admin/planner/info", "wendy", { text: "hi" }, "PUT"))).status).toBe(403);
    expect((await plannerExportRoute.GET(req("/api/admin/planner/export", { method: "GET" }))).status).toBe(403);
    expect((await plannerBulkRoute.POST(post("/api/admin/planner/bulk", "wendy", { rows: [{ id: null, set: { title: "Sneaky task" } }] }))).status).toBe(403);
    expect((await analyticsExport.GET(req("/api/admin/analytics/export", { method: "GET" }))).status).toBe(403);
  });

  it("lets the owner reset a password (old one stops working) and cannot be tricked into touching the owner", async () => {
    as("owner");
    const t = await createContributorAccount(owner.id, { name: "Temp Person", email: "temp@example.org", password: "Quiet-Orchard-Lantern-2026!" });
    if (!t.ok) throw new Error("create");
    const r = await passwordRoute.POST(post(`/api/admin/users/${t.user.id}/password`, "owner", { password: "Fresh-Orchard-Pass-2026!!" }), params({ id: t.user.id }));
    expect(r.status).toBe(200);
    expect(JSON.stringify(await r.json())).not.toContain("Fresh-Temp");
    expect((await login({ email: "temp@example.org", password: "Quiet-Orchard-Lantern-2026!", ipHash: "z1", userAgent: "x" })).ok).toBe(false);
    expect((await login({ email: "temp@example.org", password: "Fresh-Orchard-Pass-2026!!", ipHash: "z2", userAgent: "x" })).ok).toBe(true);
    expect((await passwordRoute.POST(post(`/api/admin/users/${owner.id}/password`, "owner", { password: "Overwrite-Owner-2026!!" }), params({ id: owner.id }))).status).toBe(400);
    expect((await userRoute.DELETE(post(`/api/admin/users/${owner.id}`, "owner", undefined, "DELETE"), params({ id: owner.id }))).status).toBe(404);
    expect((await getUserByEmail("info@vierapparatus.com"))?.role).toBe("owner");
    // deleting a contributor clears their assignments and ends their access
    const rec = await createRecord(viewer(owner), { title: "Orphan test", assignedTo: t.user.id });
    expect((await userRoute.DELETE(post(`/api/admin/users/${t.user.id}`, "owner", undefined, "DELETE"), params({ id: t.user.id }))).status).toBe(200);
    expect((await getRecord(viewer(owner), rec.id))?.assignedTo).toBeNull();
  });

  it("enforces the planner rules over HTTP: contributors may only write research notes and run their own transitions", async () => {
    as("owner");
    const created = await (await plannerRoute.POST(post("/api/admin/planner", "owner", { title: "HTTP task", assignedTo: wendy.id }))).json();
    expect(created.ref).toMatch(/^T-\d{4}$/);
    as("wendy");
    expect((await plannerIdRoute.PATCH(post(`/api/admin/planner/${created.id}`, "wendy", { researchNotes: "notes" }, "PATCH"), params({ id: created.id }))).status).toBe(200);
    expect((await plannerIdRoute.PATCH(post(`/api/admin/planner/${created.id}`, "wendy", { priority: "urgent" }, "PATCH"), params({ id: created.id }))).status).toBe(403);
    expect((await plannerActionRoute.POST(post(`/api/admin/planner/${created.id}/action`, "wendy", { action: "assign", userId: sam.id }), params({ id: created.id }))).status).toBe(403);
    expect((await plannerActionRoute.POST(post(`/api/admin/planner/${created.id}/action`, "wendy", { action: "transition", transition: "approve" }), params({ id: created.id }))).status).toBe(403);
    expect((await plannerActionRoute.POST(post(`/api/admin/planner/${created.id}/action`, "wendy", { action: "transition", transition: "submit" }), params({ id: created.id }))).status).toBe(200);
    as("sam");
    expect((await plannerIdRoute.PATCH(post(`/api/admin/planner/${created.id}`, "sam", { researchNotes: "x" }, "PATCH"), params({ id: created.id }))).status).toBe(404);
    expect((await plannerIdRoute.DELETE(post(`/api/admin/planner/${created.id}`, "sam", undefined, "DELETE"), params({ id: created.id }))).status).toBe(403);
    as(null);
    expect((await plannerIdRoute.PATCH(req(`/api/admin/planner/${created.id}`, { method: "PATCH", body: { researchNotes: "x" } }), params({ id: created.id }))).status).toBe(401);
  });
});

describe("custom fields over HTTP", () => {
  it("lets the owner add and delete a field, and a contributor do neither", async () => {
    as("owner");
    const made = await (await plannerFieldsRoute.POST(post("/api/admin/planner/fields", "owner", { name: "Temp column", type: "text" }))).json();
    expect(made.field.id).toMatch(/^pf_/);
    as("wendy");
    expect((await plannerFieldsRoute.DELETE(post("/api/admin/planner/fields", "wendy", { id: made.field.id }, "DELETE"))).status).toBe(403);
    as("owner");
    const del = await plannerFieldsRoute.DELETE(post("/api/admin/planner/fields", "owner", { id: made.field.id }, "DELETE"));
    expect(del.status).toBe(200);
    expect((await listFields()).some((f) => f.id === made.field.id)).toBe(false);
  });
});

describe("spreadsheet edits over HTTP", () => {
  it("lets the owner paste rows through the bulk endpoint and rejects malformed bodies", async () => {
    as("owner");
    const ok = await plannerBulkRoute.POST(post("/api/admin/planner/bulk", "owner", { rows: [{ id: null, set: { title: "Bulk made task", priority: "urgent" } }] }));
    expect(ok.status).toBe(200);
    expect((await ok.json()).created).toBe(1);
    expect((await plannerBulkRoute.POST(post("/api/admin/planner/bulk", "owner", { rows: [] }))).status).toBe(400);
    expect((await plannerBulkRoute.POST(post("/api/admin/planner/bulk", "owner", { rows: [{ id: null, set: { title: "Extra key", role: "owner" } }] }))).status).toBe(400);
    as(null);
    expect((await plannerBulkRoute.POST(req("/api/admin/planner/bulk", { body: { rows: [] } }))).status).toBe(401);
  });
});

describe("pure view logic", () => {
  const rec = (over: Partial<PlannerRecord>): PlannerRecord => ({
    id: "1", num: 1, ref: "T-0001", title: "A", brief: "", topicId: null, topicName: null, status: "planned", priority: "normal", dueDate: null, assignedTo: null, assignedToName: null, sharedWith: [],
    articleId: null, articleTitle: null, articleStatus: null, articleVersion: null, articleLastEditor: null, articleUpdatedAt: null, reviewStatus: "none", researchNotes: "", notes: "", custom: {}, contentType: "article", module: null,
    createdBy: "o", createdByName: "O", updatedByName: "O", version: 1, createdAt: "2026-01-01T00:00:00Z", updatedAt: "2026-01-01T00:00:00Z", ...over,
  });
  const all = [
    rec({ id: "1", num: 1, title: "Alpha", assignedTo: "u1", priority: "low", updatedAt: "2026-01-03T00:00:00Z" }),
    rec({ id: "2", num: 2, title: "Beta", assignedTo: "u2", status: "in_review", priority: "urgent", dueDate: "2026-01-05", updatedAt: "2026-01-02T00:00:00Z" }),
    rec({ id: "3", num: 3, title: "gamma", assignedTo: "u1", status: "done", updatedAt: "2026-01-01T00:00:00Z" }),
  ];
  it("filters, sorts and presets without a request", () => {
    const ids = (x: PlannerRecord[]) => x.map((r) => r.id);
    expect(ids(applyView(all, emptyConfig(), { userId: "u1", preset: "mine" }))).toEqual(["1"]);
    expect(ids(applyView(all, emptyConfig(), { userId: "u1", preset: "team" }))).toEqual(["1", "2"]);
    expect(ids(applyView(all, emptyConfig(), { userId: "u1", preset: "review" }))).toEqual(["2"]);
    expect(ids(applyView(all, emptyConfig(), { userId: "u1", preset: "completed" }))).toEqual(["3"]);
    expect(ids(applyView(all, emptyConfig(), { userId: "u1", preset: "recent" }))).toEqual(["1", "2", "3"]);
    expect(ids(applyView(all, { filters: { q: "BETA" }, hidden: [] }))).toEqual(["2"]);
    expect(ids(applyView(all, { filters: { assignee: "none" }, hidden: [] }))).toEqual([]);
    expect(ids(applyView(all, { filters: { priority: "urgent" }, hidden: [] }))).toEqual(["2"]);
    expect(ids(applyView(all, { filters: {}, sort: { key: "priority", dir: "asc" }, hidden: [] }))).toEqual(["2", "3", "1"]);
    expect(ids(applyView(all, { filters: {}, sort: { key: "title", dir: "desc" }, hidden: [] }))).toEqual(["3", "2", "1"]);
  });
  it("flags overdue tasks only while they are open", () => {
    expect(isOverdue({ dueDate: "2026-01-01", status: "planned" }, "2026-02-01")).toBe(true);
    expect(isOverdue({ dueDate: "2026-01-01", status: "done" }, "2026-02-01")).toBe(false);
    expect(isOverdue({ dueDate: null, status: "planned" }, "2026-02-01")).toBe(false);
  });
});

describe("free-tier friendliness: few database round trips per page", () => {
  it("loads each admin page with a handful of round trips (a Worker allows 50 per request)", async () => {
    const list = await roundTrips(() => listRecords(viewer(owner), { limit: 500 }));
    expect(list.calls).toBeLessThanOrEqual(2);
    const sum = await roundTrips(() => collabSummary(viewer(wendy)));
    expect(sum.calls).toBeLessThanOrEqual(3);
    const csv = await roundTrips(() => exportRecordsCsv(viewer(owner)));
    expect(csv.calls).toBeLessThanOrEqual(4);
    // 40 rows with attachments cost ONE query, not 40
    const metas = await roundTrips(() => getAttachmentMetas(Array.from({ length: 40 }, (_, i) => `att${i}`)));
    expect(metas.calls).toBe(1);
    // a warm 30-day dashboard reads the roll-ups, not the raw log
    const range = { from: new Date(Date.now() - 30 * 86400_000).toISOString(), to: new Date().toISOString() };
    for (let i = 0; i < 6 && (await overview(range)).pendingDays > 0; i++); // first views after a long gap summarise a few days each
    const warm = await roundTrips(() => overview(range));
    expect(warm.result.pendingDays).toBe(0);
    expect(warm.calls).toBeLessThanOrEqual(4);
    // and a task page's data
    const rec = (await listRecords(viewer(owner))).items[0];
    const one = await roundTrips(async () => {
      await getRecord(viewer(owner), rec.id);
      await listComments({ recordId: rec.id, articleId: rec.articleId });
    });
    expect(one.calls).toBeLessThanOrEqual(3);
  });
});
