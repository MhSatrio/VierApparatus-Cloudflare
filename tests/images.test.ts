import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { PNG_1X1, tempDb } from "./helpers";
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
import { signRequest } from "@/lib/images/sigv4";
import { deleteImage, isImageKind, listImages, storeImage } from "@/lib/images/assets";
import { imageBackend } from "@/lib/images/storage";
import { thumbnailUrl } from "@/lib/images/url";
import { createArticle } from "@/lib/store/articles";
import { getUserByEmail, type User } from "@/lib/store/users";
import * as imagesRoute from "@/app/api/admin/images/route";
import * as imageIdRoute from "@/app/api/admin/images/[id]/route";

const ORIGIN = "http://localhost:3000";
const CTX = Symbol.for("__cloudflare-context__");

/** A minimal WebP header (lossless chunk) with the given size. `seed` makes the bytes unique, so the checksum differs. */
function webp(width: number, height: number, seed = 1, length = 200): Uint8Array {
  const b = new Uint8Array(length);
  const put = (o: number, s: string) => [...s].forEach((c, i) => (b[o + i] = c.charCodeAt(0)));
  put(0, "RIFF");
  put(8, "WEBP");
  put(12, "VP8L");
  b[20] = 0x2f;
  const bits = (width - 1) | ((height - 1) << 14);
  b[21] = bits & 0xff;
  b[22] = (bits >> 8) & 0xff;
  b[23] = (bits >> 16) & 0xff;
  b[24] = (bits >>> 24) & 0xff;
  for (let i = 30; i < length; i++) b[i] = (i * 31 + seed * 17) & 0xff;
  return b;
}

type Put = { key: string; type?: string; cache?: string };
function fakeBucket(failOn?: (n: number) => boolean) {
  const puts: Put[] = [];
  const deletes: string[] = [];
  let n = 0;
  return {
    puts,
    deletes,
    put: async (key: string, _v: unknown, o?: { httpMetadata?: { contentType?: string; cacheControl?: string } }) => {
      n++;
      if (failOn?.(n)) throw new Error("storage down");
      puts.push({ key, type: o?.httpMetadata?.contentType, cache: o?.httpMetadata?.cacheControl });
    },
    delete: async (key: string) => void deletes.push(key),
  };
}

const bindBucket = (b: ReturnType<typeof fakeBucket> | null) => {
  if (b) (globalThis as Record<symbol, unknown>)[CTX] = { env: { IMAGES: b } };
  else delete (globalThis as Record<symbol, unknown>)[CTX];
};

let cleanup: () => void;
let owner: User;
let contributor: User;
const tokens: Record<string, string> = {};
const csrf: Record<string, string> = {};
let ipN = 0;

async function signIn(key: string, email: string, password: string) {
  const r = await login({ email, password, ipHash: `ip-${key}`, userAgent: "vitest" });
  if (!r.ok) throw new Error(`login ${key}`);
  tokens[key] = r.token;
  csrf[key] = await csrfTokenFor(await sha256Hex(r.token));
}
const as = (who: string | null) => {
  jar.clear();
  if (who) jar.set(SESSION_COOKIE, tokens[who]);
};
const uploadReq = (who: string | null, form: FormData) => {
  const headers: Record<string, string> = { host: "localhost:3000", origin: ORIGIN, "x-forwarded-for": `10.2.0.${(ipN++ % 250) + 1}` };
  if (who) headers["x-csrf-token"] = csrf[who];
  return new Request(`${ORIGIN}/api/admin/images`, { method: "POST", headers, body: form });
};
const formOf = (main: Uint8Array, extra: { thumb?: Uint8Array; kind?: string; name?: string } = {}) => {
  const f = new FormData();
  f.set("file", new File([main as BlobPart], "photo.webp", { type: "image/webp" }));
  if (extra.thumb) f.set("thumb", new File([extra.thumb as BlobPart], "photo-thumb.webp", { type: "image/webp" }));
  if (extra.kind) f.set("kind", extra.kind);
  if (extra.name) f.set("name", extra.name);
  return f;
};

beforeAll(async () => {
  cleanup = tempDb();
  await setMinWords(0);
  const PW = "Owner-Images-Pass-2026!";
  await bootstrapOwner({ email: "info@vierapparatus.com", name: "Editor In Chief", password: PW });
  owner = (await getUserByEmail("info@vierapparatus.com"))!;
  const db = await conn();
  await db.execute({ sql: "UPDATE users SET must_change_password = 0 WHERE id = ?", args: [owner.id] });
  const mk = async (name: string, email: string, permissions?: string[]) => {
    const r = await createContributorAccount(owner.id, { name, email, password: "Contributor-Pass-2026!", permissions });
    if (!r.ok) throw new Error(r.error);
    return r.user;
  };
  contributor = await mk("Wendy Writer", "wendy@example.org");
  await mk("Pat Plain", "pat@example.org", ["articles.write"]);
  await signIn("owner", "info@vierapparatus.com", PW);
  await signIn("wendy", "wendy@example.org", "Contributor-Pass-2026!");
  await signIn("plain", "pat@example.org", "Contributor-Pass-2026!");
});
afterAll(() => cleanup());
beforeEach(() => {
  jar.clear();
  bindBucket(fakeBucket()); // uploads in these tests go to a fake R2 bucket unless a test says otherwise
});
afterEach(() => {
  bindBucket(null);
  vi.unstubAllGlobals();
  delete process.env.R2_ACCOUNT_ID;
  delete process.env.R2_ACCESS_KEY_ID;
  delete process.env.R2_SECRET_ACCESS_KEY;
  delete process.env.R2_BUCKET;
  delete process.env.IMAGE_PUBLIC_BASE_URL;
});

describe("request signing (AWS Signature Version 4)", () => {
  it("reproduces the signature published in the AWS documentation", async () => {
    const h = await signRequest({
      method: "GET",
      url: "https://examplebucket.s3.amazonaws.com/test.txt",
      region: "us-east-1",
      accessKeyId: "AKIAIOSFODNN7EXAMPLE",
      secretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
      headers: { Range: "bytes=0-9" },
      now: new Date("2013-05-24T00:00:00Z"),
    });
    expect(h.Authorization).toContain("Credential=AKIAIOSFODNN7EXAMPLE/20130524/us-east-1/s3/aws4_request");
    expect(h.Authorization).toContain("SignedHeaders=host;range;x-amz-content-sha256;x-amz-date");
    expect(h.Authorization).toContain("Signature=f0e8bdb87c964420e857bd35b5d6ed310bd44f0170aba48dd91039c6036bdb41");
  });
});

describe("image addresses", () => {
  it("knows the four kinds of content", () => {
    for (const k of ["articles", "modules", "products", "sponsors"]) expect(isImageKind(k)).toBe(true);
    expect(isImageKind("../etc")).toBe(false);
    expect(isImageKind(undefined)).toBe(false);
  });
  it("finds the thumbnail of an image made by the upload service, and leaves every other address alone", () => {
    expect(thumbnailUrl("https://images.vierapparatus.com/articles/2026/11/i_abc-DEF_1.webp")).toBe("https://images.vierapparatus.com/thumbnails/articles/2026/11/i_abc-DEF_1.webp");
    expect(thumbnailUrl("https://images.vierapparatus.com/modules/2026/11/i_x.webp")).toBe("https://images.vierapparatus.com/thumbnails/modules/2026/11/i_x.webp");
    expect(thumbnailUrl("/media/m_abcdefgh")).toBe("/media/m_abcdefgh");
    expect(thumbnailUrl("https://elsewhere.example/articles/2026/11/i_x.webp")).toBe("https://elsewhere.example/articles/2026/11/i_x.webp");
    expect(thumbnailUrl("https://images.vierapparatus.com/something/else.png")).toBe("https://images.vierapparatus.com/something/else.png");
    expect(thumbnailUrl(null)).toBeNull();
  });
});

describe("storing images", () => {
  it("stores nothing and refuses the upload when R2 is not configured", async () => {
    bindBucket(null);
    expect(imageBackend()).toBe("none");
    const r = await storeImage({ main: webp(800, 600, 1), thumb: webp(320, 240, 2), kind: "articles", originalName: "Cell photo.JPG", userId: owner.id });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toMatch(/R2/);
    expect(Number((await (await conn()).execute("SELECT COUNT(*) AS c FROM image_assets")).rows[0].c)).toBe(0);
  });

  it("returns the existing image when the same picture is uploaded again", async () => {
    const bytes = webp(640, 480, 3);
    const a = await storeImage({ main: bytes, kind: "articles", userId: owner.id });
    const b = await storeImage({ main: bytes, kind: "modules", userId: owner.id });
    expect(a.ok && b.ok).toBe(true);
    if (a.ok && b.ok) {
      expect(b.duplicate).toBe(true);
      expect(b.image.id).toBe(a.image.id);
    }
  });

  it("refuses anything that is not WebP, however it is labelled", async () => {
    const png = await storeImage({ main: PNG_1X1, kind: "articles", userId: owner.id });
    expect(png.ok).toBe(false);
    if (!png.ok) expect(png.error).toMatch(/WebP/);
    expect((await storeImage({ main: new Uint8Array(0), kind: "articles", userId: owner.id })).ok).toBe(false);
    expect((await storeImage({ main: new TextEncoder().encode("<svg xmlns='http://www.w3.org/2000/svg'></svg>".repeat(5)), kind: "articles", userId: owner.id })).ok).toBe(false);
  });

  it("refuses images that are too large or too wide, and a bad thumbnail", async () => {
    expect((await storeImage({ main: webp(5000, 100, 4), kind: "articles", userId: owner.id })).ok).toBe(false);
    expect((await storeImage({ main: webp(100, 100, 5, 1_600_000), kind: "articles", userId: owner.id })).ok).toBe(false);
    const wide = await storeImage({ main: webp(900, 900, 6), thumb: webp(900, 900, 7), kind: "articles", userId: owner.id });
    expect(wide.ok).toBe(false);
    if (!wide.ok) expect(wide.error).toMatch(/thumbnail/);
  });

  it("writes to the R2 binding under organised keys, with cache and type headers", async () => {
    const bucket = fakeBucket();
    bindBucket(bucket);
    expect(imageBackend()).toBe("r2-binding");
    const r = await storeImage({ main: webp(1200, 800, 10), thumb: webp(480, 320, 11), kind: "modules", originalName: "diagram.png", userId: owner.id });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.image.storage).toBe("r2");
    expect(r.image.url).toMatch(/^https:\/\/images\.vierapparatus\.com\/modules\/\d{4}\/\d{2}\/i_[A-Za-z0-9_-]+\.webp$/);
    expect(r.image.thumbUrl).toMatch(/^https:\/\/images\.vierapparatus\.com\/thumbnails\/modules\/\d{4}\/\d{2}\/i_[A-Za-z0-9_-]+\.webp$/);
    expect(bucket.puts).toHaveLength(2);
    expect(bucket.puts[0].type).toBe("image/webp");
    expect(bucket.puts[0].cache).toContain("immutable");
    // the public address of the thumbnail is the one the card code derives from the main address
    expect(thumbnailUrl(r.image.url)).toBe(r.image.thumbUrl);
  });

  it("honours IMAGE_PUBLIC_BASE_URL", async () => {
    process.env.IMAGE_PUBLIC_BASE_URL = "https://img.example.test/";
    bindBucket(fakeBucket());
    const r = await storeImage({ main: webp(300, 300, 12), kind: "products", userId: owner.id });
    expect(r.ok && r.image.url.startsWith("https://img.example.test/products/")).toBe(true);
  });

  it("removes the first file when the thumbnail cannot be written, and records nothing", async () => {
    const bucket = fakeBucket((n) => n === 2);
    bindBucket(bucket);
    const db = await conn();
    const before = Number((await db.execute("SELECT COUNT(*) AS c FROM image_assets")).rows[0].c);
    const r = await storeImage({ main: webp(500, 500, 13), thumb: webp(200, 200, 14), kind: "articles", userId: owner.id });
    expect(r.ok).toBe(false);
    expect(bucket.deletes).toHaveLength(1);
    expect(bucket.deletes[0]).toMatch(/^articles\//);
    expect(Number((await db.execute("SELECT COUNT(*) AS c FROM image_assets")).rows[0].c)).toBe(before);
  });

  it("signs uploads to R2's S3 API when only credentials are configured", async () => {
    bindBucket(null); // the Worker binding would take precedence over the keys
    process.env.R2_ACCOUNT_ID = "acct123";
    process.env.R2_ACCESS_KEY_ID = "AKIDEXAMPLE";
    process.env.R2_SECRET_ACCESS_KEY = "secret-example";
    process.env.R2_BUCKET = "vier-images";
    expect(imageBackend()).toBe("r2-s3");
    const calls: { url: string; method: string; headers: Record<string, string>; body: Uint8Array }[] = [];
    vi.stubGlobal("fetch", async (url: string, init: { method: string; headers: Record<string, string>; body: Uint8Array }) => {
      calls.push({ url, method: init.method, headers: init.headers, body: init.body });
      return new Response(null, { status: 200 });
    });
    const main = webp(700, 500, 15);
    const r = await storeImage({ main, thumb: webp(300, 200, 16), kind: "articles", userId: owner.id });
    expect(r.ok).toBe(true);
    expect(calls).toHaveLength(2);
    expect(calls[0].method).toBe("PUT");
    expect(calls[0].url).toMatch(/^https:\/\/acct123\.r2\.cloudflarestorage\.com\/vier-images\/articles\/\d{4}\/\d{2}\/i_/);
    expect(calls[0].headers.Authorization).toContain("Credential=AKIDEXAMPLE/");
    expect(calls[0].headers["x-amz-content-sha256"]).toBe(await sha256Hex(main));
    expect(calls[0].headers["content-type"]).toBe("image/webp");
    expect(JSON.stringify(calls)).not.toContain("secret-example");
  });

  it("reports a refusal from storage without leaving a record", async () => {
    bindBucket(null);
    process.env.R2_ACCOUNT_ID = "acct123";
    process.env.R2_ACCESS_KEY_ID = "AKIDEXAMPLE";
    process.env.R2_SECRET_ACCESS_KEY = "secret-example";
    process.env.R2_BUCKET = "vier-images";
    vi.stubGlobal("fetch", async () => new Response("denied", { status: 403 }));
    const db = await conn();
    const before = Number((await db.execute("SELECT COUNT(*) AS c FROM image_assets")).rows[0].c);
    const r = await storeImage({ main: webp(400, 400, 17), kind: "articles", userId: owner.id });
    expect(r.ok).toBe(false);
    expect(Number((await db.execute("SELECT COUNT(*) AS c FROM image_assets")).rows[0].c)).toBe(before);
  });
});

describe("library and deletion", () => {
  it("lists new uploads together with older ones, and limits a contributor to their own", async () => {
    const db = await conn();
    // an older image, stored before the upload service existed
    await db.execute({
      sql: "INSERT INTO media(id, mime, size, width, height, sha256, alt, data, created_by, created_at) VALUES ('m_legacy0001', 'image/webp', 5, 10, 10, 'legacysha', '', x'0102030405', ?, '2020-01-01T00:00:00.000Z')",
      args: [owner.id],
    });
    const mine = await storeImage({ main: webp(200, 200, 20), kind: "articles", userId: contributor.id });
    expect(mine.ok).toBe(true);
    const everything = await listImages({ limit: 200 });
    expect(everything.some((i) => i.id === "m_legacy0001" && i.legacy)).toBe(true);
    expect(everything.some((i) => !i.legacy)).toBe(true);
    const own = await listImages({ userId: contributor.id });
    expect(own.length).toBeGreaterThan(0);
    expect(own.every((i) => !i.legacy)).toBe(true);
  });

  it("deletes the files from R2 and the record, but never an image that content still uses", async () => {
    const bucket = fakeBucket();
    bindBucket(bucket);
    const r = await storeImage({ main: webp(600, 400, 21), thumb: webp(240, 160, 22), kind: "articles", userId: owner.id });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const article = await createArticle(
      {
        title: "Uses the image",
        excerpt: "A summary that is long enough to publish.",
        authorName: "Owner",
        categoryId: "cat_microbiology",
        doc: { version: 1, blocks: [{ type: "image", src: r.image.url, alt: "x", width: 600, height: 400 }] },
        tags: [],
        featured: false,
        source: "editor",
      } as never,
      { id: null, name: "Owner" },
    );
    const used = await deleteImage(r.image.id, owner.id);
    expect(used.ok).toBe(false);
    expect(bucket.deletes).toHaveLength(0);

    const db = await conn();
    await db.execute({ sql: "DELETE FROM articles WHERE id = ?", args: [article.id] });
    const done = await deleteImage(r.image.id, owner.id);
    expect(done.ok).toBe(true);
    expect(bucket.deletes).toHaveLength(2);
    expect(bucket.deletes[1]).toMatch(/^thumbnails\/articles\//);
    expect((await listImages({ limit: 200 })).some((i) => i.id === r.image.id)).toBe(false);
  });

  it("applies the original rules to an older image", async () => {
    expect((await deleteImage("m_missing0001", owner.id)).ok).toBe(false);
    expect((await deleteImage("i_missing", owner.id)).ok).toBe(false);
  });
});

describe("the upload endpoint", () => {
  it("answers 401 without a session", async () => {
    as(null);
    expect((await imagesRoute.POST(uploadReq(null, formOf(webp(100, 100, 30))))).status).toBe(401);
  });

  it("accepts a WebP from a contributor with upload rights, and stores the original file name", async () => {
    as("wendy");
    const res = await imagesRoute.POST(uploadReq("wendy", formOf(webp(640, 360, 31), { thumb: webp(320, 180, 32), kind: "modules", name: "Original Name.PNG" })));
    expect(res.status).toBe(200);
    const body = (await res.json()) as { image: { kind: string; originalName: string; width: number } };
    expect(body.image.kind).toBe("modules");
    expect(body.image.originalName).toBe("Original Name.PNG");
    expect(body.image.width).toBe(640);
  });

  it("refuses a contributor without upload rights, a PNG, and an unknown kind", async () => {
    as("plain");
    expect((await imagesRoute.POST(uploadReq("plain", formOf(webp(100, 100, 33))))).status).toBe(403);
    as("wendy");
    expect((await imagesRoute.POST(uploadReq("wendy", formOf(PNG_1X1)))).status).toBe(400);
    expect((await imagesRoute.POST(uploadReq("wendy", formOf(webp(100, 100, 34), { kind: "../../etc" })))).status).toBe(400);
  });

  it("lists images for the signed-in person", async () => {
    as("wendy");
    const res = await imagesRoute.GET(new Request(`${ORIGIN}/api/admin/images`, { headers: { host: "localhost:3000", "x-forwarded-for": "10.2.9.9" } }));
    expect(res.status).toBe(200);
    const body = (await res.json()) as { items: { legacy: boolean }[] };
    expect(body.items.length).toBeGreaterThan(0);
  });

  it("lets only the owner delete", async () => {
    const stored = await storeImage({ main: webp(120, 120, 35), kind: "articles", userId: owner.id });
    expect(stored.ok).toBe(true);
    if (!stored.ok) return;
    const del = (who: string) => imageIdRoute.DELETE(new Request(`${ORIGIN}/api/admin/images/${stored.image.id}`, { method: "DELETE", headers: { host: "localhost:3000", origin: ORIGIN, "x-csrf-token": csrf[who], "x-forwarded-for": "10.2.8.8" } }), { params: Promise.resolve({ id: stored.image.id }) });
    as("wendy");
    expect((await del("wendy")).status).toBe(403);
    as("owner");
    expect((await del("owner")).status).toBe(200);
  });
});
