import { setMinWords } from "@/lib/store/site-settings";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { PNG_1X1, tempDb } from "./helpers";

// The route handlers read the session cookie through next/headers; tests swap identities by changing this jar.
const jar = new Map<string, string>();
vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: (name: string) => (jar.has(name) ? { name, value: jar.get(name)! } : undefined),
    set: (name: string, value: string) => void jar.set(name, value),
  }),
}));

import { bootstrapOwner, login } from "@/lib/auth/service";
import { csrfTokenFor } from "@/lib/auth/request";
import { SESSION_COOKIE } from "@/lib/auth/guard";
import { createSession } from "@/lib/auth/session";
import { sha256Hex } from "@/lib/crypto";
import { getUserByEmail, setPermissions } from "@/lib/store/users";
import { createContributorAccount } from "@/lib/auth/service";
import { createArticle, getArticleById, publishArticle } from "@/lib/store/articles";
import { listSubmissions } from "@/lib/store/submissions";
import { conn } from "@/lib/db/client";

import * as loginRoute from "@/app/api/auth/login/route";
import * as changePw from "@/app/api/auth/change-password/route";
import * as articlesRoute from "@/app/api/admin/articles/route";
import * as articleRoute from "@/app/api/admin/articles/[id]/route";
import * as statusRoute from "@/app/api/admin/articles/[id]/status/route";
import * as importRoute from "@/app/api/admin/articles/import/route";
import * as usersRoute from "@/app/api/admin/users/route";
import * as catsRoute from "@/app/api/admin/categories/route";
import * as exportRoute from "@/app/api/admin/analytics/export/route";
import * as mediaRoute from "@/app/api/admin/media/route";
import * as subRoute from "@/app/api/admin/submissions/[id]/route";
import * as contactRoute from "@/app/api/contact/route";
import * as contributeRoute from "@/app/api/contribute/route";
import * as collectRoute from "@/app/api/collect/route";
import * as mediaPublic from "@/app/media/[id]/route";

const ORIGIN = "http://localhost:3000";
let cleanup: () => void;
let ownerToken: string;
let ownerCsrf: string;
let writerToken: string;
let writerCsrf: string;
let writerId: string;
let ownerId: string;
let n = 0;

async function csrfFor(token: string) {
  return csrfTokenFor(await sha256Hex(token));
}
const as = (token: string | null) => {
  jar.clear();
  if (token) jar.set(SESSION_COOKIE, token);
};
const req = (path: string, init: { method?: string; csrf?: string | null; body?: unknown; origin?: string | null; ip?: string; raw?: BodyInit; headers?: Record<string, string> } = {}) => {
  const headers: Record<string, string> = { host: "localhost:3000", "x-forwarded-for": init.ip ?? `10.0.0.${(n++ % 250) + 1}`, ...init.headers };
  if (init.origin !== null) headers.origin = init.origin ?? ORIGIN;
  if (init.csrf) headers["x-csrf-token"] = init.csrf;
  let body: BodyInit | undefined = init.raw;
  if (init.body !== undefined) {
    headers["content-type"] = "application/json";
    body = JSON.stringify(init.body);
  }
  return new Request(`${ORIGIN}${path}`, { method: init.method ?? "POST", headers, body });
};
const params = <T extends Record<string, string>>(p: T) => ({ params: Promise.resolve(p) });
const draftBody = (over: Record<string, unknown> = {}) => ({
  title: "A contributor draft",
  excerpt: "A summary that is long enough to publish properly.",
  authorName: "Someone Else",
  categoryId: "cat_microbiology",
  featured: true,
  doc: { version: 1, blocks: [{ type: "paragraph", content: [{ t: "text", text: "Hello" }] }] },
  ...over,
});

beforeAll(async () => {
  cleanup = tempDb();
  // The publishing minimum is a product default (600 words). These tests check other behaviour with short fixtures,
  // so they switch the minimum off; tests/publish-rules.test.ts checks the rule itself.
  await setMinWords(0);
  const TEMP = "Api-Test-Temp-Pass-88";
  await bootstrapOwner({ email: "info@vierapparatus.com", name: "Owner", password: TEMP });
  const owner = (await getUserByEmail("info@vierapparatus.com"))!;
  ownerId = owner.id;
  // a "must change password" owner session (before rotation) to test the gate
  const pre = await createSession(owner.id, "ua");
  as(pre.token);
  const gate = await articlesRoute.POST(req("/api/admin/articles", { csrf: await csrfFor(pre.token), body: draftBody() }));
  expect(gate.status).toBe(403);
  expect((await gate.json()).error).toBe("password_change_required");
  const rot = await changePw.POST(req("/api/auth/change-password", { csrf: await csrfFor(pre.token), body: { current: TEMP, next: "Rotated-Owner-Pass-99!" } }));
  expect(rot.status).toBe(200);
  const s = await login({ email: "info@vierapparatus.com", password: "Rotated-Owner-Pass-99!", ipHash: "x", userAgent: "ua" });
  if (!s.ok) throw new Error("owner login");
  ownerToken = s.token;
  ownerCsrf = await csrfFor(ownerToken);

  const acc = await createContributorAccount(owner.id, { name: "Wendy Writer", email: "writer@example.org", password: "Wendy-Secret-Phrase-55!", permissions: ["articles.write"] });
  if (!acc.ok) throw new Error("create contributor");
  writerId = acc.user.id;
  const ws = await login({ email: "writer@example.org", password: "Wendy-Secret-Phrase-55!", ipHash: "y", userAgent: "ua" });
  if (!ws.ok) throw new Error("writer login");
  writerToken = ws.token;
  writerCsrf = await csrfFor(writerToken);
});
afterAll(() => cleanup());
beforeEach(() => jar.clear());

describe("authentication gate", () => {
  it("rejects anonymous requests with 401", async () => {
    as(null);
    expect((await articlesRoute.POST(req("/api/admin/articles", { csrf: "x", body: draftBody() }))).status).toBe(401);
    expect((await exportRoute.GET(req("/api/admin/analytics/export", { method: "GET" }))).status).toBe(401);
  });
  it("requires the CSRF token, a same-origin request and a JSON body for state changes", async () => {
    as(ownerToken);
    expect((await articlesRoute.POST(req("/api/admin/articles", { body: draftBody() }))).status).toBe(403); // no token
    expect((await articlesRoute.POST(req("/api/admin/articles", { csrf: "wrong", body: draftBody() }))).status).toBe(403);
    expect((await articlesRoute.POST(req("/api/admin/articles", { csrf: ownerCsrf, origin: "https://evil.example", body: draftBody() }))).status).toBe(403);
    expect((await articlesRoute.POST(req("/api/admin/articles", { csrf: ownerCsrf, origin: null, body: draftBody() }))).status).toBe(403);
    expect((await articlesRoute.POST(req("/api/admin/articles", { csrf: ownerCsrf, raw: "title=x", headers: { "content-type": "text/plain" } }))).status).toBe(415);
    expect((await articlesRoute.POST(req("/api/admin/articles", { csrf: writerCsrf, body: draftBody() }))).status).toBe(403); // another user's token
  });
  it("login: same-origin only, generic failure, sets an HttpOnly session cookie", async () => {
    as(null);
    expect((await loginRoute.POST(req("/api/auth/login", { origin: "https://evil.example", body: { email: "a@b.co", password: "x" } }))).status).toBe(403);
    const bad = await loginRoute.POST(req("/api/auth/login", { body: { email: "info@vierapparatus.com", password: "nope" } }));
    expect(bad.status).toBe(401);
    expect(await bad.json()).toEqual({ ok: false, error: "invalid" });
    const good = await loginRoute.POST(req("/api/auth/login", { body: { email: "info@vierapparatus.com", password: "Rotated-Owner-Pass-99!" } }));
    expect(good.status).toBe(200);
    expect((await good.json()).mustChangePassword).toBe(false);
    expect(jar.has(SESSION_COOKIE)).toBe(true);
  });
});

describe("contributor isolation", () => {
  let articleId: string;

  it("can create a draft: always theirs, never featured, author name fixed to their own", async () => {
    as(writerToken);
    const r = await articlesRoute.POST(req("/api/admin/articles", { csrf: writerCsrf, body: draftBody() }));
    expect(r.status).toBe(200);
    articleId = (await r.json()).id;
    const a = (await getArticleById(articleId))!;
    expect(a.status).toBe("draft");
    expect(a.featured).toBe(false);
    expect(a.authorId).toBe(writerId);
    expect(a.authorName).toBe("Wendy Writer");
  });

  it("cannot publish, unpublish, archive or delete; can submit for review", async () => {
    as(writerToken);
    for (const action of ["publish", "unpublish", "archive"]) {
      expect((await statusRoute.POST(req(`/api/admin/articles/${articleId}/status`, { csrf: writerCsrf, body: { action } }), params({ id: articleId }))).status).toBe(403);
    }
    expect((await articleRoute.DELETE(req(`/api/admin/articles/${articleId}`, { method: "DELETE", csrf: writerCsrf, body: { confirmSlug: "x" } }), params({ id: articleId }))).status).toBe(403);
    const sub = await statusRoute.POST(req(`/api/admin/articles/${articleId}/status`, { csrf: writerCsrf, body: { action: "submit" } }), params({ id: articleId }));
    expect(sub.status).toBe(200);
    expect((await getArticleById(articleId))!.submittedForReview).toBe(true);
    expect((await getArticleById(articleId))!.status).toBe("draft");
  });

  it("cannot see or edit someone else's article (404, not 403), and cannot edit their own once published", async () => {
    const owners = await createArticle({ title: "Owner article", excerpt: "A summary that is long enough to publish.", authorName: "Owner", categoryId: "cat_biotechnology", doc: { version: 1, blocks: [{ type: "paragraph", content: [{ t: "text", text: "x" }] }] } }, { id: ownerId });
    as(writerToken);
    expect((await articleRoute.GET(req(`/api/admin/articles/${owners.id}`, { method: "GET" }), params({ id: owners.id }))).status).toBe(404);
    expect((await articleRoute.PUT(req(`/api/admin/articles/${owners.id}`, { method: "PUT", csrf: writerCsrf, body: draftBody() }), params({ id: owners.id }))).status).toBe(404);

    await publishArticle(articleId, ownerId);
    const put = await articleRoute.PUT(req(`/api/admin/articles/${articleId}`, { method: "PUT", csrf: writerCsrf, body: draftBody({ title: "Sneaky edit after publishing" }) }), params({ id: articleId }));
    expect(put.status).toBe(403);
    expect((await getArticleById(articleId))!.title).toBe("A contributor draft");
  });

  it("is locked out of every owner-only area", async () => {
    as(writerToken);
    expect((await exportRoute.GET(req("/api/admin/analytics/export", { method: "GET" }))).status).toBe(403);
    expect((await usersRoute.GET(req("/api/admin/users", { method: "GET" }))).status).toBe(403);
    expect((await usersRoute.POST(req("/api/admin/users", { csrf: writerCsrf, body: { name: "Mallory", email: "m@example.org", permissions: ["articles.write"] } }))).status).toBe(403);
    expect((await catsRoute.POST(req("/api/admin/categories", { csrf: writerCsrf, body: { name: "Mine" } }))).status).toBe(403);
    expect((await subRoute.POST(req("/api/admin/submissions/x", { csrf: writerCsrf, body: { action: "accept" } }), params({ id: "x" }))).status).toBe(403);
    // the media library needs its own permission, which this contributor was not given
    expect((await mediaRoute.GET(req("/api/admin/media", { method: "GET" }))).status).toBe(403);
    // reading the topic list (to file their article) is allowed
    expect((await catsRoute.GET(req("/api/admin/categories", { method: "GET" }))).status).toBe(200);
  });

  it("loses access immediately when permission is withdrawn", async () => {
    await setPermissions(writerId, [], ownerId);
    as(writerToken);
    expect((await articlesRoute.POST(req("/api/admin/articles", { csrf: writerCsrf, body: draftBody({ title: "No longer allowed" }) }))).status).toBe(403);
    await setPermissions(writerId, ["articles.write", "media.upload"], ownerId);
  });

  it("can upload images only with the media permission, and only real images", async () => {
    as(writerToken);
    const form = new FormData();
    form.set("file", new File([PNG_1X1], "x.png", { type: "image/png" }));
    const ok = await mediaRoute.POST(new Request(`${ORIGIN}/api/admin/media`, { method: "POST", headers: { host: "localhost:3000", origin: ORIGIN, "x-csrf-token": writerCsrf }, body: form }));
    expect(ok.status).toBe(200);
    const id = (await ok.json()).image.id as string;

    const bad = new FormData();
    bad.set("file", new File([new TextEncoder().encode("<svg onload=alert(1)></svg>".padEnd(60, " "))], "x.svg", { type: "image/svg+xml" }));
    const rej = await mediaRoute.POST(new Request(`${ORIGIN}/api/admin/media`, { method: "POST", headers: { host: "localhost:3000", origin: ORIGIN, "x-csrf-token": writerCsrf }, body: bad }));
    expect(rej.status).toBe(400);

    const pub = await mediaPublic.GET(new Request(`${ORIGIN}/media/${id}`), params({ id }));
    expect(pub.status).toBe(200);
    expect(pub.headers.get("content-type")).toBe("image/png");
    expect(pub.headers.get("cache-control")).toContain("immutable");
    expect(pub.headers.get("x-content-type-options")).toBe("nosniff");
    expect((await mediaPublic.GET(new Request(`${ORIGIN}/media/nope`), params({ id: "nope" }))).status).toBe(404);
  });
});

describe("owner capabilities", () => {
  it("publishes only when ready, and deletion needs the address typed back", async () => {
    as(ownerToken);
    const made = await articlesRoute.POST(req("/api/admin/articles", { csrf: ownerCsrf, body: draftBody({ title: "Owner draft", categoryId: null, authorName: "Owner" }) }));
    const { id, slug } = await made.json();
    const early = await statusRoute.POST(req(`/api/admin/articles/${id}/status`, { csrf: ownerCsrf, body: { action: "publish" } }), params({ id }));
    expect(early.status).toBe(422);
    expect((await early.json()).problems.join(" ")).toMatch(/topic/);

    await articleRoute.PUT(req(`/api/admin/articles/${id}`, { method: "PUT", csrf: ownerCsrf, body: draftBody({ title: "Owner draft", authorName: "Owner" }) }), params({ id }));
    expect((await statusRoute.POST(req(`/api/admin/articles/${id}/status`, { csrf: ownerCsrf, body: { action: "publish" } }), params({ id }))).status).toBe(200);

    const wrong = await articleRoute.DELETE(req(`/api/admin/articles/${id}`, { method: "DELETE", csrf: ownerCsrf, body: { confirmSlug: "not-it" } }), params({ id }));
    expect(wrong.status).toBe(400);
    expect((await getArticleById(id))?.id).toBe(id);
    const del = await articleRoute.DELETE(req(`/api/admin/articles/${id}`, { method: "DELETE", csrf: ownerCsrf, body: { confirmSlug: slug } }), params({ id }));
    expect(del.status).toBe(200);
    expect(await getArticleById(id)).toBeNull();
  });

  it("rejects a stale save with 409 instead of overwriting", async () => {
    as(ownerToken);
    const a = await createArticle({ title: "Version test", excerpt: "A summary that is long enough to publish.", authorName: "Owner", doc: { version: 1, blocks: [] } }, { id: ownerId });
    const ok = await articleRoute.PUT(req(`/api/admin/articles/${a.id}`, { method: "PUT", csrf: ownerCsrf, body: { ...draftBody({ title: "Version test" }), expectedVersion: a.version } }), params({ id: a.id }));
    expect(ok.status).toBe(200);
    const stale = await articleRoute.PUT(req(`/api/admin/articles/${a.id}`, { method: "PUT", csrf: ownerCsrf, body: { ...draftBody({ title: "Version test" }), expectedVersion: a.version } }), params({ id: a.id }));
    expect(stale.status).toBe(409);
  });

  it("only the owner creates contributors; the table never contains secrets; creation needs no link or token", async () => {
    const payload = { name: "New Person", email: "new@example.org", password: "New-Person-Passphrase-61!", specialization: "Mycology" };
    as(writerToken);
    expect((await usersRoute.POST(req("/api/admin/users", { csrf: writerCsrf, body: payload }))).status).toBe(403);
    expect((await usersRoute.GET(req("/api/admin/users", { method: "GET" }))).status).toBe(403);
    expect(await getUserByEmail("new@example.org")).toBeNull();

    as(ownerToken);
    const weak = await usersRoute.POST(req("/api/admin/users", { csrf: ownerCsrf, body: { ...payload, password: "weak" } }));
    expect(weak.status).toBe(400);
    const r = await usersRoute.POST(req("/api/admin/users", { csrf: ownerCsrf, body: payload }));
    expect(r.status).toBe(200);
    const body = await r.json();
    expect(JSON.stringify(body)).not.toMatch(/New-Person-Passphrase|link|token/i);
    const created = (await getUserByEmail("new@example.org"))!;
    expect(created.role).toBe("contributor");
    expect((await usersRoute.POST(req("/api/admin/users", { csrf: ownerCsrf, body: payload }))).status).toBe(409); // duplicate e-mail

    const list = await (await usersRoute.GET(req("/api/admin/users", { method: "GET" }))).json();
    expect(JSON.stringify(list)).not.toMatch(/passwordHash|password_hash|pbkdf2|New-Person-Passphrase/i);
    expect(list.contributors.some((c: { email: string }) => c.email === "new@example.org")).toBe(true);
  });

  it("converts Markdown through the API", async () => {
    as(ownerToken);
    const r = await importRoute.POST(req("/api/admin/articles/import", { csrf: ownerCsrf, body: { markdown: "# T\n\nHello **world** <script>alert(1)</script>" } }));
    const j = await r.json();
    expect(j.ok).toBe(true);
    expect(JSON.stringify(j.doc)).not.toContain("script");
    expect(j.warnings.join(" ")).toMatch(/HTML/);
  });

  it("can export analytics as CSV", async () => {
    as(ownerToken);
    const r = await exportRoute.GET(req("/api/admin/analytics/export", { method: "GET" }));
    expect(r.status).toBe(200);
    expect(r.headers.get("content-type")).toContain("text/csv");
    expect(r.headers.get("content-disposition")).toContain("attachment");
  });
});

describe("public forms", () => {
  const post = (handler: { POST: (r: Request) => Promise<Response> }, path: string, fields: Record<string, string>, ip?: string) => {
    const f = new FormData();
    for (const [k, v] of Object.entries(fields)) f.set(k, v);
    return handler.POST(new Request(`${ORIGIN}${path}`, { method: "POST", headers: { host: "localhost:3000", origin: ORIGIN, "x-forwarded-for": ip ?? `192.0.2.${(n++ % 250) + 1}` }, body: f }));
  };
  const old = String(Date.now() - 60_000);

  it("contact: validates per type, stores the message, rejects cross-site posts", async () => {
    const bad = await post(contactRoute, "/api/contact", { type: "General inquiry", name: "A", email: "nope", message: "short", startedAt: old });
    expect(bad.status).toBe(400);
    expect(Object.keys((await bad.json()).fields).sort()).toEqual(["email", "message", "name"]);
    const ok = await post(contactRoute, "/api/contact", { type: "General inquiry", name: "Ann Reader", email: "ann@example.org", message: "A perfectly fine question.", startedAt: old });
    expect(ok.status).toBe(200);
    const db = await conn();
    expect((await db.execute("SELECT COUNT(*) AS c FROM inquiries WHERE email = 'ann@example.org'")).rows[0].c).toBe(1);
    const cross = await contactRoute.POST(new Request(`${ORIGIN}/api/contact`, { method: "POST", headers: { host: "localhost:3000", origin: "https://evil.example" }, body: new FormData() }));
    expect(cross.status).toBe(403);
  });

  it("contact: honeypot and instant submissions pretend to succeed but store nothing", async () => {
    const db = await conn();
    const before = Number((await db.execute("SELECT COUNT(*) AS c FROM inquiries")).rows[0].c);
    const bot = await post(contactRoute, "/api/contact", { type: "General inquiry", name: "Bot Bot", email: "bot@example.org", message: "buy cheap things now", website: "http://spam", startedAt: old });
    expect(bot.status).toBe(200);
    const fast = await post(contactRoute, "/api/contact", { type: "General inquiry", name: "Fast Bot", email: "fast@example.org", message: "buy cheap things now", startedAt: String(Date.now()) });
    expect(fast.status).toBe(200);
    expect(Number((await db.execute("SELECT COUNT(*) AS c FROM inquiries")).rows[0].c)).toBe(before);
  });

  it("contact: no phone or whatsapp type exists", async () => {
    const r = await post(contactRoute, "/api/contact", { type: "WhatsApp", name: "Ann Reader", email: "ann@example.org", message: "call me", startedAt: old });
    expect(r.status).toBe(400);
  });

  it("contributor proposals become PENDING submissions and never accounts", async () => {
    const usersBefore = Number((await (await conn()).execute("SELECT COUNT(*) AS c FROM users")).rows[0].c);
    const r = await post(contributeRoute, "/api/contribute", { name: "Carl Candidate", email: "carl@example.org", title: "On the physics of pipettes", topic: "Methods", proposal: "p".repeat(80), startedAt: old });
    expect(r.status).toBe(200);
    const { items } = await listSubmissions({ status: "pending" });
    expect(items.some((s) => s.email === "carl@example.org")).toBe(true);
    expect(await getUserByEmail("carl@example.org")).toBeNull();
    expect(Number((await (await conn()).execute("SELECT COUNT(*) AS c FROM users")).rows[0].c)).toBe(usersBefore);
  });

  it("rate-limits repeated submissions from one visitor", async () => {
    const results: number[] = [];
    for (let i = 0; i < 6; i++) {
      const r = await post(contributeRoute, "/api/contribute", { name: "Spam Spam", email: `spam${i}@example.org`, title: "Spam title here", topic: "Spam", proposal: "s".repeat(80), startedAt: old }, "198.51.100.99");
      results.push(r.status);
    }
    expect(results.slice(0, 3)).toEqual([200, 200, 200]);
    expect(results.slice(3)).toEqual([429, 429, 429]);
  });
});

describe("analytics collection", () => {
  const body = { type: "pageview", path: "/articles/x", sessionId: "abcdef123456", landing: true, referrer: "https://news.example/story" };
  const send = (b: unknown, ua = "Mozilla/5.0 (X11; Linux) Chrome/120", extra: Record<string, string> = {}) =>
    collectRoute.POST(new Request(`${ORIGIN}/api/collect`, { method: "POST", headers: { host: "localhost:3000", origin: ORIGIN, "user-agent": ua, "content-type": "application/json", "x-forwarded-for": "203.0.113.50", "x-vercel-ip-country": "ID", ...extra }, body: JSON.stringify(b) }));

  it("records a page view, ignores bots, Do Not Track, admin and malformed paths", async () => {
    const db = await conn();
    const count = async () => Number((await db.execute("SELECT COUNT(*) AS c FROM events")).rows[0].c);
    const start = await count();
    expect((await send(body)).status).toBe(204);
    expect(await count()).toBe(start + 1);
    await send(body, "Googlebot/2.1");
    await send(body, "Mozilla/5.0 Chrome/120", { dnt: "1" });
    await send({ ...body, path: "/admin/articles" });
    await send({ ...body, path: "//evil.example" });
    await send({ ...body, type: "purchase" });
    expect(await count()).toBe(start + 1);
    const row = (await db.execute("SELECT * FROM events ORDER BY id DESC LIMIT 1")).rows[0];
    expect(row.country).toBe("ID");
    expect(row.referrer_host).toBe("news.example");
    expect(JSON.stringify(row)).not.toContain("203.0.113.50");
  });

  it("refuses cross-site posts", async () => {
    const r = await collectRoute.POST(new Request(`${ORIGIN}/api/collect`, { method: "POST", headers: { host: "localhost:3000", origin: "https://evil.example", "user-agent": "Mozilla/5.0 Chrome/120" }, body: JSON.stringify(body) }));
    expect(r.status).toBe(403);
  });
});
