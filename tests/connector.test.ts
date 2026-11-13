import { beforeAll, describe, expect, it, vi } from "vitest";
import { tempDb, markReferencesChecked } from "./helpers";

// Route handlers read the session cookie through next/headers; the tests change identity through this jar.
const jar = new Map<string, string>();
vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: (name: string) => (jar.has(name) ? { name, value: jar.get(name)! } : undefined),
    set: (name: string, value: string) => void jar.set(name, value),
  }),
}));

import { bootstrapOwner, login } from "@/lib/auth/service";
import { can } from "@/lib/auth/permissions";
import { csrfTokenFor } from "@/lib/auth/request";
import { SESSION_COOKIE } from "@/lib/auth/guard";
import { createSession } from "@/lib/auth/session";
import { sha256Hex } from "@/lib/crypto";
import { conn } from "@/lib/db/client";
import { viewerOf } from "@/lib/planner-http";
import { connectorArticlePublished, connectorProductPublished } from "@/lib/connector/hooks";
import { claimJobs, createJob, listJobs, reportJob } from "@/lib/connector/jobs";
import { eventsAfter, recentEvents } from "@/lib/connector/events";
import { authenticateConnector, createConnectorToken, listConnectorTokens, revokeConnectorToken } from "@/lib/connector/tokens";
import { setMinWords } from "@/lib/store/site-settings";
import { createArticle, publishArticle, unpublishArticle } from "@/lib/store/articles";
import { createProduct, setProductStatus, updateProduct } from "@/lib/store/products";
import { getUserByEmail } from "@/lib/store/users";
import * as eventsRoute from "@/app/api/connector/v1/events/route";
import * as tokensRoute from "@/app/api/admin/connector/tokens/route";
import * as changePw from "@/app/api/auth/change-password/route";

const ORIGIN = "http://localhost:3000";
const TEMP = "Connector-Temp-Pass-1";
const OWNER_EMAIL = "info@vierapparatus.com";
let ownerId = "";
let ownerToken = "";

const bearer = (token?: string) => new Request(`${ORIGIN}/api/connector/v1/events`, { headers: token ? { authorization: `Bearer ${token}` } : {} });
const productInput = (over: Record<string, unknown> = {}) => ({ name: "Example benchtop centrifuge", manufacturer: "Example Maker", category: "Centrifuges", modelNumber: "EX-100", shortDescription: "A benchtop centrifuge.", ...over });

/** An admin request as the browser sends it: session cookie, same origin, the per-session CSRF token. */
function adminReq(path: string, init: { method?: string; body?: unknown; csrf?: string } = {}) {
  const headers: Record<string, string> = { host: "localhost:3000", origin: ORIGIN, "x-forwarded-for": "10.9.9.9" };
  if (init.csrf) headers["x-csrf-token"] = init.csrf;
  let body: string | undefined;
  if (init.body !== undefined) { headers["content-type"] = "application/json"; body = JSON.stringify(init.body); }
  return new Request(`${ORIGIN}${path}`, { method: init.method ?? "POST", headers, body });
}

beforeAll(async () => {
  tempDb();
  await setMinWords(0);
  await bootstrapOwner({ email: OWNER_EMAIL, name: "Master Admin", password: TEMP });
  ownerId = (await getUserByEmail(OWNER_EMAIL))!.id;
  // The owner must rotate the temporary password before any admin route answers (the same gate the site uses).
  const pre = await createSession(ownerId, "ua");
  jar.clear();
  jar.set(SESSION_COOKIE, pre.token);
  await changePw.POST(adminReq("/api/auth/change-password", { csrf: await csrfTokenFor(await sha256Hex(pre.token)), body: { current: TEMP, next: "Connector-Owner-Pass-2" } }));
  const s = await login({ email: OWNER_EMAIL, password: "Connector-Owner-Pass-2", ipHash: "test", userAgent: "ua" });
  if (!s.ok) throw new Error("owner login failed in the test");
  ownerToken = s.token;
});

describe("connector tokens", () => {
  it("shows a token once and stores only its hash", async () => {
    const { token, record } = await createConnectorToken(ownerId, "DCE test", ["events:read"]);
    expect(token).toMatch(/^vca_/);
    expect(record.scopes).toEqual(["events:read"]);
    const raw = JSON.stringify((await conn().then((c) => c.execute("SELECT * FROM connector_tokens"))).rows);
    expect(raw).not.toContain(token);
    expect((await listConnectorTokens()).some((t) => t.id === record.id)).toBe(true);
  });

  it("accepts a valid token with the right scope, refuses the others, and stops working when revoked", async () => {
    const { token, record } = await createConnectorToken(ownerId, "Scoped", ["events:read"]);
    await expect(authenticateConnector(bearer(token), "events:read")).resolves.toMatchObject({ id: record.id });
    await expect(authenticateConnector(bearer(token), "jobs:run")).rejects.toMatchObject({ status: 403 });
    await expect(authenticateConnector(bearer(undefined), null)).rejects.toMatchObject({ status: 401 });
    await expect(authenticateConnector(bearer("vca_" + "x".repeat(30)), null)).rejects.toMatchObject({ status: 401 });
    expect(await revokeConnectorToken(record.id)).toBe(true);
    await expect(authenticateConnector(bearer(token), "events:read")).rejects.toMatchObject({ status: 401 });
    expect(await revokeConnectorToken(record.id)).toBe(false);
  });

  it("only the owner's permission can reach the token admin (contributors cannot be granted it)", () => {
    expect(can({ role: "owner", permissions: [] }, "connector.manage")).toBe(true);
    expect(can({ role: "contributor", permissions: ["connector.manage"] }, "connector.manage")).toBe(false);
  });
});

describe("events", () => {
  const body = "Hello from the connector test.\n\n## A heading\n\nSecond paragraph with *emphasis*.";
  const doc = { version: 1 as const, blocks: [{ type: "paragraph" as const, content: [{ t: "text" as const, text: body }] }] };

  it("records one article.published event per article, however often it is published again", async () => {
    const a = await createArticle({ title: "Connector article", excerpt: "A summary that is long enough to publish.", authorName: "Master Admin", categoryId: "cat_microbiology", doc }, { id: ownerId });
    await markReferencesChecked("article", a.id);
    expect((await publishArticle(a.id, ownerId)).ok).toBe(true);
    await connectorArticlePublished(a.id);
    await unpublishArticle(a.id, ownerId);
    expect((await publishArticle(a.id, ownerId)).ok).toBe(true);
    await connectorArticlePublished(a.id);
    await connectorArticlePublished(a.id);
    const mine = (await recentEvents(100)).filter((e) => e.entityId === a.id);
    expect(mine.map((e) => e.type)).toEqual(["article.published"]);
    const p = mine[0].payload;
    expect(p.title).toBe("Connector article");
    expect(String(p.url)).toMatch(/\/articles\/connector-article/);
    expect(String(p.body)).toContain("Hello from the connector test.");
    expect(String(p.body)).not.toMatch(/[#*]/); // plain text: no markdown left
    expect(JSON.stringify(p)).not.toMatch(/@/); // no e-mail addresses
  });

  it("records product.published and product.reviewed once each, and nothing for a later edit", async () => {
    const v = viewerOf((await getUserByEmail(OWNER_EMAIL))!);
    const prod = await createProduct(v, productInput());
    await setProductStatus(v, prod.id, "under_review");
    await setProductStatus(v, prod.id, "approved");
    const published = await setProductStatus(v, prod.id, "published");
    await connectorProductPublished(published);
    await updateProduct(v, prod.id, { ...productInput(), reviewStatus: "reviewed" });
    await updateProduct(v, prod.id, { ...productInput(), reviewStatus: "reviewed", shortDescription: "A changed description." });
    const mine = (await recentEvents(200)).filter((e) => e.entityId === prod.id);
    expect(mine.map((e) => e.type).sort()).toEqual(["product.published", "product.reviewed"]);
    const reviewed = mine.find((e) => e.type === "product.reviewed")!;
    expect(reviewed.payload.reviewStatus).toBe("reviewed");
    expect(reviewed.payload.name).toBe("Example benchtop centrifuge");
  });

  it("serves events after a cursor, hands each job to one token only, and refuses a report from any other token", async () => {
    const all = await eventsAfter(0, 500);
    expect(all.length).toBeGreaterThanOrEqual(3);
    const rest = await eventsAfter(all[0].id, 500);
    expect(rest[0].id).toBe(all[1].id);
    const a = await createConnectorToken(ownerId, "Job A", ["jobs:run"]);
    const b = await createConnectorToken(ownerId, "Job B", ["jobs:run"]);
    const jobId = await createJob(ownerId, "replay_event", all[0]);
    expect((await claimJobs(a.record.id, 10)).map((j) => j.id)).toContain(jobId);
    expect((await claimJobs(b.record.id, 10)).map((j) => j.id)).not.toContain(jobId);
    await expect(reportJob(b.record.id, jobId, "done", "", "")).rejects.toMatchObject({ status: 409 });
    await reportJob(a.record.id, jobId, "done", "sent", "");
    const j = (await listJobs(50)).find((x) => x.id === jobId)!;
    expect(j.status).toBe("done");
    expect(j.result).toBe("sent");
    expect((j.payload.event as { id: number }).id).toBe(all[0].id);
  });

  it("the events route answers only a valid token with events:read, and returns the next cursor", async () => {
    const t = await createConnectorToken(ownerId, "Route", ["events:read"]);
    const ok = await eventsRoute.GET(new Request(`${ORIGIN}/api/connector/v1/events?after=0&limit=2`, { headers: { authorization: `Bearer ${t.token}` } }));
    expect(ok.status).toBe(200);
    const body2 = await ok.json();
    expect(body2.events.length).toBe(2);
    expect(body2.next).toBe(body2.events[1].id);
    const none = await eventsRoute.GET(new Request(`${ORIGIN}/api/connector/v1/events`));
    expect(none.status).toBe(401);
  });
});

describe("admin: tokens (Master Admin session)", () => {
  it("the owner lists and creates tokens; the new token is returned once", async () => {
    const csrf = await csrfTokenFor(await sha256Hex(ownerToken));
    jar.clear();
    jar.set(SESSION_COOKIE, ownerToken);
    const list = await tokensRoute.GET(adminReq("/api/admin/connector/tokens", { method: "GET" }));
    expect(list.status).toBe(200);
    const created = await tokensRoute.POST(adminReq("/api/admin/connector/tokens", { csrf, body: { name: "DCE on my PC", scopes: ["events:read", "jobs:run"] } }));
    expect(created.status).toBe(200);
    const made = await created.json();
    expect(made.token).toMatch(/^vca_/);
    expect(made.record.name).toBe("DCE on my PC");
  });
});

