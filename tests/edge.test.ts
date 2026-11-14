import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createClient, type Client } from "@libsql/client";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { MIGRATIONS, migrate } from "@/lib/db/migrations";
import { cacheKeyUrl, GONE_TTL, isLessonPath, isShareImagePath, LESSON_TTL, negativeCacheControl, negativeTtl, NOT_FOUND_TTL, pageCacheControl, PAGE_TTL, pageTtl } from "@/lib/edge/policy";
import { productNotFoundResponse, productSlugOf, productVerdict } from "@/lib/edge/product-gate";
import { ttlMemo } from "@/lib/memo";
import { conn } from "@/lib/db/client";
import { findRedirect } from "@/lib/store/modules";
import { tempDb } from "./helpers";

describe("edge cache policy", () => {
  it("keeps lessons for an hour and other pages for five minutes", () => {
    expect(pageTtl("/module/bio/general-biology/foundations/cells/ribosomes")).toBe(LESSON_TTL);
    expect(pageTtl("/module")).toBe(LESSON_TTL);
    expect(pageTtl("/articles/some-article")).toBe(PAGE_TTL);
    expect(pageTtl("/modules-are-fun")).toBe(PAGE_TTL); // only the /module tree, not any path that starts with the word
    expect(isLessonPath("/module/bio")).toBe(true);
    expect(isLessonPath("/modulex")).toBe(false);
  });

  it("caches 404 briefly, 410 for an hour, and never other statuses", () => {
    expect(negativeTtl(404)).toBe(NOT_FOUND_TTL);
    expect(negativeTtl(410)).toBe(GONE_TTL);
    for (const status of [200, 301, 308, 400, 403, 429, 500, 503]) expect(negativeTtl(status)).toBeNull();
    expect(NOT_FOUND_TTL).toBeLessThan(LESSON_TTL);
  });

  it("builds Cache-Control with the right edge lifetime", () => {
    expect(pageCacheControl(PAGE_TTL)).toBe("public, max-age=0, s-maxage=300, stale-while-revalidate=3600");
    expect(pageCacheControl(LESSON_TTL)).toBe("public, max-age=0, s-maxage=3600, stale-while-revalidate=86400");
    expect(negativeCacheControl(120)).toBe("public, max-age=0, s-maxage=120");
  });

  it("drops tracking parameters from the cache key but keeps the ones that change the page", () => {
    const key = cacheKeyUrl("https://vierapparatus.com/articles?q=cell&utm_source=x&utm_medium=y&fbclid=1&gclid=2&page=2");
    expect(key.searchParams.get("q")).toBe("cell");
    expect(key.searchParams.get("page")).toBe("2");
    expect([...key.searchParams.keys()].sort()).toEqual(["page", "q"]);
    expect(cacheKeyUrl("https://vierapparatus.com/a?utm_source=x").search).toBe("");
    expect(cacheKeyUrl("https://vierapparatus.com/a").toString()).toBe("https://vierapparatus.com/a");
  });

  it("recognises the generated share images", () => {
    expect(isShareImagePath("/opengraph-image")).toBe(true);
    expect(isShareImagePath("/articles/x/opengraph-image-1a2b3c")).toBe(true);
    expect(isShareImagePath("/twitter-image")).toBe(true);
    expect(isShareImagePath("/media/abc")).toBe(false);
  });
});

describe("product fast-fail: which addresses it looks at", () => {
  it("only inspects a single /products/<slug> address", () => {
    expect(productSlugOf("/products/microman-e")).toBe("microman-e");
    expect(productSlugOf("/products/caf%C3%A9")).toBe("café");
    expect(productSlugOf("/products")).toBeNull();
    expect(productSlugOf("/products/")).toBeNull();
    expect(productSlugOf("/products/microman-e/")).toBeNull(); // Next redirects the trailing slash itself
    expect(productSlugOf("/products/category/centrifuges/6")).toBeNull();
    expect(productSlugOf("/products/category/centrifuges")).toBeNull();
    expect(productSlugOf("/articles/x")).toBeNull();
    expect(productSlugOf("/products/%E0%A4%A")).toBeNull(); // malformed escape goes to Next
  });
});

describe("product fast-fail: the verdict", () => {
  const env = { TURSO_DATABASE_URL: "libsql://example-org.turso.io", TURSO_AUTH_TOKEN: "tok" };
  const answer = (rows: unknown[], type = "ok") => new Response(JSON.stringify({ results: [{ type, response: { type: "execute", result: { rows } } }, { type: "ok", response: { type: "close" } }] }), { status: 200 });

  it("asks Turso over https with the token and one execute statement", async () => {
    const seen: { url: string; init: RequestInit }[] = [];
    const fake = (async (url: string, init: RequestInit) => {
      seen.push({ url, init });
      return answer([]);
    }) as unknown as typeof fetch;
    expect(await productVerdict("microman-e", env, fake)).toBe("missing");
    expect(seen).toHaveLength(1);
    expect(seen[0].url).toBe("https://example-org.turso.io/v2/pipeline");
    expect((seen[0].init.headers as Record<string, string>).authorization).toBe("Bearer tok");
    const body = JSON.parse(seen[0].init.body as string);
    expect(body.requests[0].type).toBe("execute");
    expect(body.requests[0].stmt.args).toEqual([{ type: "text", value: "microman-e" }, { type: "text", value: "microman-e" }]);
  });

  it("says exists when a row comes back and missing when none does", async () => {
    expect(await productVerdict("x", env, (async () => answer([[{ type: "integer", value: "1" }]])) as unknown as typeof fetch)).toBe("exists");
    expect(await productVerdict("x", env, (async () => answer([])) as unknown as typeof fetch)).toBe("missing");
  });

  it("fails open: any problem means unknown, never a false 404", async () => {
    const f = (impl: () => Promise<Response>) => impl as unknown as typeof fetch;
    expect(await productVerdict("x", {}, f(async () => answer([])))).toBe("unknown"); // no credentials
    expect(await productVerdict("x", env, f(async () => new Response("nope", { status: 500 })))).toBe("unknown");
    expect(await productVerdict("x", env, f(async () => answer([], "error")))).toBe("unknown"); // e.g. the table is not there yet
    expect(await productVerdict("x", env, f(async () => new Response("not json", { status: 200 })))).toBe("unknown");
    expect(await productVerdict("x", env, f(async () => Promise.reject(new Error("network"))))).toBe("unknown");
    expect(await productVerdict("x", env, f(async () => new Response(JSON.stringify({ results: [] }), { status: 200 })))).toBe("unknown");
  });

  it("answers missing for an impossibly long address without asking the database", async () => {
    const fake = vi.fn();
    expect(await productVerdict("a".repeat(301), env, fake as unknown as typeof fetch)).toBe("missing");
    expect(fake).not.toHaveBeenCalled();
  });

  it("builds a small, noindex, cacheable 404", async () => {
    const r = productNotFoundResponse(120);
    expect(r.status).toBe(404);
    expect(r.headers.get("Cache-Control")).toBe("public, max-age=0, s-maxage=120");
    expect(r.headers.get("X-Robots-Tag")).toBe("noindex");
    expect((await r.text()).length).toBeLessThan(1500);
  });
});

/** Runs the gate's real SQL against the real schema (a throw-away SQLite file), through a fetch stand-in that speaks Turso's pipeline format. */
describe("product fast-fail: the SQL matches the product tables", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "vier-gate-"));
  let db: Client;
  const env = { TURSO_DATABASE_URL: "libsql://example-org.turso.io" };
  const viaDb = (async (_url: string, init: RequestInit) => {
    const stmt = JSON.parse(init.body as string).requests[0].stmt as { sql: string; args: { value: string }[] };
    try {
      const r = await db.execute({ sql: stmt.sql, args: stmt.args.map((a) => a.value) });
      return new Response(JSON.stringify({ results: [{ type: "ok", response: { type: "execute", result: { rows: r.rows.map((x) => Object.values(x)) } } }] }), { status: 200 });
    } catch (e) {
      return new Response(JSON.stringify({ results: [{ type: "error", error: { message: String(e) } }] }), { status: 200 });
    }
  }) as unknown as typeof fetch;

  beforeAll(async () => {
    db = createClient({ url: `file:${path.join(dir, "gate.db").replace(/\\/g, "/")}` });
    await migrate(db);
    const now = new Date().toISOString();
    const add = (id: string, num: number, slug: string, status: string) =>
      db.execute({ sql: "INSERT INTO products(id, num, slug, name, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)", args: [id, num, slug, slug, status, now, now] });
    await add("p1", 1, "live-product", "published");
    await add("p2", 2, "draft-product", "draft");
    await add("p3", 3, "archived-product", "archived");
    await add("p4", 4, "renamed-product-new", "published");
    await db.execute({ sql: "INSERT INTO product_redirects(old_slug, product_id) VALUES (?, ?)", args: ["renamed-product-old", "p4"] });
    await db.execute({ sql: "INSERT INTO product_redirects(old_slug, product_id) VALUES (?, ?)", args: ["draft-old", "p2"] });
  });
  afterAll(() => {
    db.close();
    try {
      fs.rmSync(dir, { recursive: true, force: true });
    } catch {
      /* Windows may keep the file locked briefly */
    }
  });

  it("lets published products and their old addresses through, and 404s everything else", async () => {
    expect(await productVerdict("live-product", env, viaDb)).toBe("exists");
    expect(await productVerdict("renamed-product-new", env, viaDb)).toBe("exists");
    expect(await productVerdict("renamed-product-old", env, viaDb)).toBe("exists"); // Next answers this one with a permanent redirect
    expect(await productVerdict("draft-product", env, viaDb)).toBe("missing");
    expect(await productVerdict("archived-product", env, viaDb)).toBe("missing");
    expect(await productVerdict("draft-old", env, viaDb)).toBe("missing"); // the old address of an unpublished product
    expect(await productVerdict("microman-e", env, viaDb)).toBe("missing");
  });
});

describe("migrate: one read when the schema is current", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "vier-mig-rt-"));
  let db: Client;
  afterAll(() => {
    db?.close();
    try {
      fs.rmSync(dir, { recursive: true, force: true });
    } catch {
      /* ignore */
    }
  });

  it("creates everything on a new database, then needs exactly one statement", async () => {
    db = createClient({ url: `file:${path.join(dir, "rt.db").replace(/\\/g, "/")}` });
    await migrate(db, { pragma: false });
    const v = (await db.execute("SELECT value FROM meta WHERE key = 'schema_version'")).rows[0];
    expect(Number(v.value)).toBe(MIGRATIONS[MIGRATIONS.length - 1].version);

    const spy = vi.spyOn(db, "execute");
    await migrate(db, { pragma: false });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(JSON.stringify(spy.mock.calls[0][0])).toMatch(/schema_version/);
    spy.mockRestore();
  });

  it("still issues the SQLite busy_timeout pragma by default (local files)", async () => {
    const spy = vi.spyOn(db, "execute");
    await migrate(db);
    expect(String(spy.mock.calls[0][0])).toMatch(/busy_timeout/);
    spy.mockRestore();
  });
});

describe("ttlMemo", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("is a pass-through under test, so tests never see stale data", async () => {
    const fn = vi.fn(async (n: number) => n);
    const m = ttlMemo(fn, { ttlMs: 60_000 });
    await m(1);
    await m(1);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("reuses a result within the lifetime, per key, and drops it after", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.useFakeTimers();
    try {
      const fn = vi.fn(async (n: number) => n * 2);
      const m = ttlMemo(fn, { ttlMs: 1000 });
      expect(await m(2)).toBe(4);
      expect(await m(2)).toBe(4);
      expect(await m(3)).toBe(6);
      expect(fn).toHaveBeenCalledTimes(2);
      vi.advanceTimersByTime(1001);
      await m(2);
      expect(fn).toHaveBeenCalledTimes(3);
      m.clear();
      await m(2);
      expect(fn).toHaveBeenCalledTimes(4);
    } finally {
      vi.useRealTimers();
    }
  });

  it("shares one in-flight call, never remembers a failure, and stays bounded", async () => {
    vi.stubEnv("NODE_ENV", "production");
    let calls = 0;
    const slow = ttlMemo(async () => {
      await Promise.resolve();
      return ++calls;
    }, { ttlMs: 1000 });
    expect(await Promise.all([slow(), slow(), slow()])).toEqual([1, 1, 1]);

    let fail = true;
    const flaky = ttlMemo(async () => {
      if (fail) throw new Error("db down");
      return "ok";
    }, { ttlMs: 1000 });
    await expect(flaky()).rejects.toThrow("db down");
    fail = false;
    expect(await flaky()).toBe("ok");

    const fn = vi.fn(async (k: string) => k);
    const small = ttlMemo(fn, { ttlMs: 1000, max: 2 });
    await small("a");
    await small("b");
    await small("c"); // evicts "a"
    await small("a");
    expect(fn).toHaveBeenCalledTimes(4);
  });
});

describe("findRedirect: one query for all candidate prefixes", () => {
  let cleanup: () => void;
  beforeAll(async () => {
    cleanup = tempDb();
    const db = await conn();
    const now = new Date().toISOString();
    const add = (from: string, to: string) => db.execute({ sql: "INSERT INTO module_redirects(from_path, to_path, created_at) VALUES (?, ?, ?)", args: [from, to, now] });
    await add("/module/bio", "/module/bio/general-biology");
    await add("/module/bio/foundations", "/module/bio/general-biology/foundations");
    await add("/module/chem/atoms", "/module/chem/atoms"); // points at itself: no redirect
  });
  afterAll(() => cleanup());

  it("prefers the longest matching prefix and appends the rest of the address", async () => {
    expect(await findRedirect("/module/bio/foundations/cells/ribosomes")).toBe("/module/bio/general-biology/foundations/cells/ribosomes");
    expect(await findRedirect("/module/bio/other/x")).toBe("/module/bio/general-biology/other/x");
    expect(await findRedirect("/module/bio/foundations")).toBe("/module/bio/general-biology/foundations");
    expect(await findRedirect("module//bio//foundations/")).toBe("/module/bio/general-biology/foundations");
  });

  it("returns null when nothing matches, when the target is the address itself, or for a bare /module", async () => {
    expect(await findRedirect("/module/physics/waves/deep/page")).toBeNull();
    expect(await findRedirect("/module/chem/atoms")).toBeNull();
    expect(await findRedirect("/module")).toBeNull();
  });

  it("asks the database once, however deep the address is", async () => {
    const db = await conn();
    const spy = vi.spyOn(db, "execute");
    await findRedirect("/module/a/b/c/d/e/f");
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });
});
