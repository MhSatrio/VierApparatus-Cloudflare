import fs from "node:fs";
import path from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { tempDb } from "./helpers";

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
import { viewerOf } from "@/lib/planner-http";
import { parseReferenceLines } from "@/lib/modules/shared";
import { splitSections } from "@/lib/tts/narration";
import { assignRecord, listRecords } from "@/lib/store/planner";
import { getUserByEmail, type User } from "@/lib/store/users";
import * as seedRoute from "@/app/api/admin/modules/seed/route";
import * as plannerModulesRoute from "@/app/api/admin/planner/modules/route";
import * as moduleRoute from "@/app/api/admin/modules/[id]/route";
import * as publicationRoute from "@/app/api/admin/modules/[id]/publication/route";

const ORIGIN = "http://localhost:3000";
const ROOT = path.resolve(__dirname, "..");

describe("pasted references", () => {
  it("takes a DOI out of the line and keeps it as a link, in any of its forms", () => {
    const text = "Placeholder, A. (2020). A title written for a test. Journal of Tests, 1(1), 1-2.";
    expect(parseReferenceLines(`${text} https://doi.org/10.1234/test.1\n${text} doi:10.1234/test.2\n${text} 10.1234/test.3.`)).toEqual([
      { text, doi: "10.1234/test.1" },
      { text, doi: "10.1234/test.2" },
      { text, doi: "10.1234/test.3" },
    ]);
  });
  it("keeps a reference without a DOI, and ignores blank lines", () => {
    expect(parseReferenceLines("\n  A reference with no identifier at all.  \n\n")).toEqual([{ text: "A reference with no identifier at all.", doi: "" }]);
  });
});

describe("read-aloud preparation", () => {
  it("splits a lesson into sections at its headings, in order, as plain text", () => {
    const html = '<p>Intro text.</p><h2 id="a">First</h2><p>One <b>bold</b>.</p><h3 id="b">Second</h3><p>Two.</p>';
    expect(splitSections(html, [{ id: "a", text: "First" }, { id: "b", text: "Second" }])).toEqual([
      { id: "start", title: "Introduction", text: "Intro text." },
      { id: "a", title: "First", text: "First One bold ." },
      { id: "b", title: "Second", text: "Second Two." },
    ]);
    expect(splitSections("<p>Only text.</p>", [])).toEqual([{ id: "start", title: "Lesson", text: "Only text." }]);
  });
});

describe("advertising rules of the learning platform", () => {
  const read = (rel: string) => fs.readFileSync(path.join(ROOT, rel), "utf8");
  const ADS = /LandingAds|AdSlot|AdColumn|SponsorBox|adsbygoogle|googlesyndication|resolveSponsor|components\/ads/;

  it("has no advertising or sponsor code in the lesson page, or anything it is built from", () => {
    const lesson = "src/app/(site)/module/[subject]/[spec]/[level]/[...path]/page.tsx";
    expect(read(lesson)).not.toMatch(ADS);
    const shared = fs.readdirSync(path.join(ROOT, "src/components/modules")).filter((f) => f !== "LandingAds.tsx");
    expect(shared.length).toBeGreaterThan(5);
    for (const f of shared) expect(read(`src/components/modules/${f}`), f).not.toMatch(ADS);
  });

  it("allows it only on the subject, specialization and level (contents) pages", () => {
    expect(read("src/app/(site)/module/[subject]/page.tsx")).toMatch(/LandingAds/);
    expect(read("src/app/(site)/module/[subject]/[spec]/page.tsx")).toMatch(/LandingAds/);
    expect(read("src/app/(site)/module/[subject]/[spec]/[level]/page.tsx")).toMatch(/LandingAds/);
    expect(read("src/app/(site)/module/page.tsx")).not.toMatch(ADS);
  });

  it("keeps every other place that reads modules free of ads as well", () => {
    for (const f of ["src/lib/store/modules.ts", "src/lib/modules/loaders.ts", "src/components/modules/ContentsList.tsx"]) expect(read(f), f).not.toMatch(ADS);
  });
});

describe("module endpoints", () => {
  let cleanup: () => void;
  let owner: User;
  let wendy: User;
  const tokens: Record<string, string> = {};
  const csrf: Record<string, string> = {};
  let ip = 0;

  const as = (who: string | null) => {
    jar.clear();
    if (who) jar.set(SESSION_COOKIE, tokens[who]);
  };
  const call = (route: string, who: string | null, method: string, body?: unknown) => {
    const headers: Record<string, string> = { host: "localhost:3000", origin: ORIGIN, "x-forwarded-for": `10.3.0.${(ip++ % 250) + 1}` };
    if (who) headers["x-csrf-token"] = csrf[who];
    let b: BodyInit | undefined;
    if (body !== undefined) {
      headers["content-type"] = "application/json";
      b = JSON.stringify(body);
    }
    return new Request(`${ORIGIN}${route}`, { method, headers, body: b });
  };
  const ctx = (id: string) => ({ params: Promise.resolve({ id }) });
  const signIn = async (key: string, email: string, password: string) => {
    const r = await login({ email, password, ipHash: `ip-${key}`, userAgent: "vitest" });
    if (!r.ok) throw new Error(`login ${key}`);
    tokens[key] = r.token;
    csrf[key] = await csrfTokenFor(await sha256Hex(r.token));
  };
  const words = (n: number) => Array.from({ length: n }, (_, i) => `word${i % 9}`).join(" ");
  const readyBody = (over: Record<string, unknown> = {}) => ({
    title: "Introduction to Biology",
    summary: "What biology is.",
    objectives: ["Explain what biology studies"],
    prerequisites: [],
    references: [{ text: "Placeholder Author. (2020). A reference written for this automated test only. Journal of Tests, 1(1), 1-2.", doi: "10.1234/test.2020.1" }],
    contentStatus: "drafting",
    doc: { version: 1, blocks: [{ type: "heading", level: 2, content: [{ t: "text", text: "Section" }] }, { type: "paragraph", content: [{ t: "text", text: words(140) }] }] },
    ...over,
  });

  beforeAll(async () => {
    cleanup = tempDb();
    const PW = "Owner-Module-Routes-2026!";
    await bootstrapOwner({ email: "info@vierapparatus.com", name: "Editor In Chief", password: PW });
    owner = (await getUserByEmail("info@vierapparatus.com"))!;
    const db = await conn();
    await db.execute({ sql: "UPDATE users SET must_change_password = 0 WHERE id = ?", args: [owner.id] });
    const r = await createContributorAccount(owner.id, { name: "Wendy Writer", email: "wendy@example.org", password: "Contributor-Pass-2026!", permissions: ["collab.access", "articles.write", "modules.write"] });
    if (!r.ok) throw new Error(r.error);
    wendy = r.user;
    const r2 = await createContributorAccount(owner.id, { name: "Sam Scientist", email: "sam@example.org", password: "Contributor-Pass-2026!", permissions: ["collab.access", "articles.write", "modules.write"] });
    if (!r2.ok) throw new Error(r2.error);
    await signIn("owner", "info@vierapparatus.com", PW);
    await signIn("wendy", "wendy@example.org", "Contributor-Pass-2026!");
    await signIn("sam", "sam@example.org", "Contributor-Pass-2026!");
  });
  afterAll(() => cleanup());
  beforeEach(() => jar.clear());

  it("installs the curriculum for the owner only, and a second run adds nothing", async () => {
    as(null);
    expect((await seedRoute.POST(call("/api/admin/modules/seed", null, "POST"))).status).toBe(401);
    as("wendy");
    expect((await seedRoute.POST(call("/api/admin/modules/seed", "wendy", "POST"))).status).toBe(403);
    as("owner");
    const first = await seedRoute.POST(call("/api/admin/modules/seed", "owner", "POST"));
    expect(first.status).toBe(200);
    expect(await first.json()).toMatchObject({ ok: true, subjects: 6, specializations: 40, modules: 232, tasks: 232 });
    const again = (await (await seedRoute.POST(call("/api/admin/modules/seed", "owner", "POST"))).json()) as Record<string, number>;
    expect([again.subjects, again.levels, again.modules, again.tasks]).toEqual([0, 0, 0, 0]);
  });

  it("creates a module task for the owner, and refuses a contributor, a bad form and a duplicate", async () => {
    const form = { subjectSlug: "chem", specializationSlug: "general-chemistry", levelSlug: "basic", discipline: "Atoms and bonds", moduleTitle: "The periodic table", objectives: ["Read the periodic table"], references: [{ text: "Placeholder Author. (2020). A reference written for this test only. Journal.", doi: "10.1234/chem.1" }] };
    as("wendy");
    expect((await plannerModulesRoute.POST(call("/api/admin/planner/modules", "wendy", "POST", form))).status).toBe(403);
    as("owner");
    const ok = await plannerModulesRoute.POST(call("/api/admin/planner/modules", "owner", "POST", form));
    expect(ok.status).toBe(200);
    expect(await ok.json()).toMatchObject({ ok: true, ref: expect.stringMatching(/^T-\d{4}$/) });
    expect((await plannerModulesRoute.POST(call("/api/admin/planner/modules", "owner", "POST", { ...form, moduleTitle: "" }))).status).toBe(400);
    expect((await plannerModulesRoute.POST(call("/api/admin/planner/modules", "owner", "POST", { ...form, subjectSlug: "nope", moduleTitle: "Something else" }))).status).toBe(400);
    expect((await plannerModulesRoute.POST(call("/api/admin/planner/modules", "owner", "POST", { ...form, references: [{ text: "A reference that is long enough.", doi: "not-a-doi" }], moduleTitle: "Another" }))).status).toBe(400);
    expect((await plannerModulesRoute.POST(call("/api/admin/planner/modules", "owner", "POST", form))).status).toBe(409);
  });

  describe("writing and publishing through the endpoints", () => {
    let id: string;
    let taskId: string;
    beforeAll(async () => {
      const t = (await listRecords(viewerOf(owner), { type: "module", limit: 500 })).items.find((r) => r.title === "Introduction to Biology")!;
      id = t.module!.nodeId;
      taskId = t.id;
      await assignRecord(viewerOf(owner), taskId, wendy.id);
    });

    it("shows a module only to the owner and the person it is assigned to", async () => {
      as("wendy");
      const mine = await moduleRoute.GET(call(`/api/admin/modules/${id}`, null, "GET"), ctx(id));
      expect(mine.status).toBe(200);
      expect(await mine.json()).toMatchObject({ ok: true, canWrite: true, module: { id, title: "Introduction to Biology" } });
      as("sam");
      expect((await moduleRoute.GET(call(`/api/admin/modules/${id}`, null, "GET"), ctx(id))).status).toBe(404);
      as(null);
      expect((await moduleRoute.GET(call(`/api/admin/modules/${id}`, null, "GET"), ctx(id))).status).toBe(401);
    });

    it("saves for the assigned contributor, refuses a stranger, a stale version and a broken document", async () => {
      as("sam");
      expect((await moduleRoute.PUT(call(`/api/admin/modules/${id}`, "sam", "PUT", readyBody()), ctx(id))).status).toBe(404);
      as("wendy");
      const saved = await moduleRoute.PUT(call(`/api/admin/modules/${id}`, "wendy", "PUT", readyBody()), ctx(id));
      expect(saved.status).toBe(200);
      const body = (await saved.json()) as { version: number; wordCount: number };
      expect(body.wordCount).toBeGreaterThan(100);
      expect((await moduleRoute.PUT(call(`/api/admin/modules/${id}`, "wendy", "PUT", readyBody({ expectedVersion: body.version - 1 })), ctx(id))).status).toBe(409);
      expect((await moduleRoute.PUT(call(`/api/admin/modules/${id}`, "wendy", "PUT", readyBody({ doc: { version: 9, blocks: [] } })), ctx(id))).status).toBe(400);
      expect((await moduleRoute.PUT(call(`/api/admin/modules/${id}`, "wendy", "PUT", readyBody({ contentStatus: "final" })), ctx(id))).status).toBe(403);
      expect((await moduleRoute.PUT(call(`/api/admin/modules/${id}`, "wendy", "PUT", readyBody({ title: "x" })), ctx(id))).status).toBe(400);
    });

    it("lets only the owner publish, and says what is missing first", async () => {
      as("wendy");
      expect((await publicationRoute.POST(call(`/api/admin/modules/${id}/publication`, "wendy", "POST", { status: "published" }), ctx(id))).status).toBe(403);
      as("owner");
      const notReady = await publicationRoute.POST(call(`/api/admin/modules/${id}/publication`, "owner", "POST", { status: "published" }), ctx(id));
      expect(notReady.status).toBe(422);
      expect(((await notReady.json()) as { problems: string[] }).problems.join(" ")).toMatch(/Final/);
      await moduleRoute.PUT(call(`/api/admin/modules/${id}`, "owner", "PUT", readyBody({ contentStatus: "final" })), ctx(id));
      expect((await publicationRoute.POST(call(`/api/admin/modules/${id}/publication`, "owner", "POST", { status: "published" }), ctx(id))).status).toBe(200);
      expect((await publicationRoute.POST(call(`/api/admin/modules/${id}/publication`, "owner", "POST", { status: "bogus" }), ctx(id))).status).toBe(400);
    });
  });
});
