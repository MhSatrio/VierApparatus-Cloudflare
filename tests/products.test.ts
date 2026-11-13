import fs from "node:fs";
import path from "node:path";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
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
import { issueChallenge, verifyChallenge } from "@/lib/captcha";
import { sha256Hex } from "@/lib/crypto";
import { conn } from "@/lib/db/client";
import { viewerOf } from "@/lib/planner-http";
import { PRODUCT_TEMPLATE_CSV } from "@/lib/products/template";
import { parseImportRecord } from "@/lib/products/import";
import { canMove, MIN_RATINGS_FOR_SCORE, NEXT_STATUSES, PRODUCT_STATUSES, productSlug, publishProblems, specsFromText } from "@/lib/products/shared";
import { IMPORT_COLUMNS, detectDelimiter, parseTable, suggestMapping, toRecords } from "@/lib/products/table";
import { productDescription, productJsonLd, productTitle } from "@/lib/products/seo";
import { checkComment } from "@/lib/spam";
import { ratingFor, listApprovedComments, listComments, moderateComment, submitComment, countPendingComments } from "@/lib/store/product-comments";
import {
  bulkUpdate, createProduct, DEFAULT_TEXTS, deleteProduct, findProductRedirect, getProduct, getProductTexts, getPublishedProduct, getRelatedProducts, importLegacyCatalogue, listAllProducts, listProductCategories,
  listProductSitemap, listPublishedProducts, ProductError, runImport, setProductStatus, setProductTexts, updateProduct, type LegacyProduct,
} from "@/lib/store/products";
import { getUserByEmail, type User } from "@/lib/store/users";
import * as productPage from "@/app/(site)/products/[slug]/page";
import * as productsRoute from "@/app/api/admin/products/route";
import * as productRoute from "@/app/api/admin/products/[id]/route";
import * as statusRoute from "@/app/api/admin/products/[id]/status/route";
import * as bulkRoute from "@/app/api/admin/products/bulk/route";
import * as importRoute from "@/app/api/admin/products/import/route";
import * as exportRoute from "@/app/api/admin/products/export/route";
import * as textsRoute from "@/app/api/admin/products/texts/route";
import * as commentsAdminRoute from "@/app/api/admin/products/comments/route";
import * as commentAdminRoute from "@/app/api/admin/products/comments/[id]/route";
import * as captchaRoute from "@/app/api/products/captcha/route";
import * as commentRoute from "@/app/api/products/[slug]/comments/route";
import * as contactRoute from "@/app/api/contact/route";

const ORIGIN = "http://localhost:3000";

describe("products: shared rules", () => {
  it("allows only the workflow's moves: Draft -> Under review -> Approved -> Published", () => {
    expect(PRODUCT_STATUSES).toEqual(["draft", "under_review", "approved", "published", "archived", "rejected"]);
    expect(canMove("draft", "under_review")).toBe(true);
    expect(canMove("draft", "published")).toBe(false);
    expect(canMove("under_review", "approved")).toBe(true);
    expect(canMove("approved", "published")).toBe(true);
    expect(canMove("published", "approved")).toBe(true); // unpublish
    expect(canMove("published", "draft")).toBe(false);
    expect(canMove("archived", "draft")).toBe(true);
    expect(canMove("rejected", "draft")).toBe(true);
    for (const s of PRODUCT_STATUSES) if (s !== "archived") expect(NEXT_STATUSES[s]).toContain("archived");
  });

  it("makes readable addresses, and reads specifications written Label: Value", () => {
    expect(productSlug("Auto-control Water Distiller", "WD-A5")).toBe("auto-control-water-distiller-wd-a5");
    expect(productSlug("Freezer BDF-150H128", "BDF-150H128")).toBe("freezer-bdf-150h128");
    expect(productSlug("  Ünïcode & Co.  ")).toBe("unicode-and-co");
    expect(productSlug("***")).toBe("product");
    expect(specsFromText("Speed: 200 to 15000 rpm\nnot a spec line\nCapacity: 24 x 1.5 mL")).toEqual([
      { label: "Speed", value: "200 to 15000 rpm" },
      { label: "Capacity", value: "24 x 1.5 mL" },
    ]);
  });

  it("asks for the minimum before publishing", () => {
    expect(publishProblems({ name: "A", manufacturer: "", category: "", shortDescription: "" })).toHaveLength(3);
    expect(publishProblems({ name: "A product", manufacturer: "Maker", category: "Centrifuges", shortDescription: "What it is." })).toEqual([]);
  });
});

describe("products: reading a table of products", () => {
  it("detects tab (a paste from a spreadsheet), semicolon and comma, and reads quotes", () => {
    expect(detectDelimiter("name\tmanufacturer\ncell\tvalue")).toBe("\t");
    expect(detectDelimiter("name;manufacturer\nx;y")).toBe(";");
    expect(detectDelimiter('name,manufacturer\n"a, b",c')).toBe(",");
    const t = parseTable('name,manufacturer,category\n"Centrifuge, benchtop",Maker,"Cent ""fuges"""\n');
    expect(t.headers).toEqual(["name", "manufacturer", "category"]);
    expect(t.rows).toEqual([["Centrifuge, benchtop", "Maker", 'Cent "fuges"']]);
  });

  it("ignores comment lines and blank rows and says how many it ignored", () => {
    const t = parseTable("# note one\n# note two\nname\tmanufacturer\n\nA\tB\n#EXAMPLE\tx\n");
    expect(t.headers).toEqual(["name", "manufacturer"]);
    expect(t.rows).toEqual([["A", "B"]]);
    expect(t.skipped).toBe(3);
  });

  it("matches the columns of a file to the Product Manager's, by name and by common alternatives, each column once", () => {
    expect(suggestMapping(["Product Name", "Brand", "Category", "Model No", "Specs", "Status", "Nonsense"])).toEqual(["name", "manufacturer", "category", "model_number", "technical_specifications", "publication_status", null]);
    expect(suggestMapping(["name", "name"])).toEqual(["name", null]);
    expect(toRecords([["A", "B", "C"]], ["name", null, "category"])).toEqual([{ name: "A", category: "C" }]);
  });

  it("ships a template that opens in Excel, has every column, marks the required ones, and imports nothing as it is", () => {
    expect(PRODUCT_TEMPLATE_CSV.startsWith("﻿")).toBe(true);
    const t = parseTable(PRODUCT_TEMPLATE_CSV);
    expect(t.headers).toEqual(IMPORT_COLUMNS.map((c) => c.header));
    expect(t.rows).toEqual([]); // instructions and examples are all comment rows
    expect(t.skipped).toBeGreaterThanOrEqual(8);
    expect(PRODUCT_TEMPLATE_CSV).toContain("REQUIRED");
    expect(PRODUCT_TEMPLATE_CSV).toMatch(/Do not enter prices/);
    const file = path.join(process.cwd(), "public/templates/product-import-template.csv");
    expect(fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n")).toBe(PRODUCT_TEMPLATE_CSV.replace(/\r\n/g, "\n"));
  });

  it("validates a row and says what is wrong, in words", () => {
    const ok = parseImportRecord({ name: "A centrifuge", manufacturer: "Maker", category: "Centrifuges", technical_specifications: "Speed: 15000 rpm | Rotor: 24 x 1.5 mL", key_features: "Quiet | Compact", image_url: "https://example.org/a.jpg" });
    expect(ok.ok).toBe(true);
    if (ok.ok) {
      expect(ok.data.specs).toHaveLength(2);
      expect(ok.data.features).toEqual(["Quiet", "Compact"]);
      expect(ok.status).toBe("draft");
      expect(ok.warnings.join(" ")).toMatch(/short description/);
    }
    const bad = parseImportRecord({ name: "x", manufacturer: "", category: "C", image_url: "javascript:alert(1)", product_url: "ftp://x", review_status: "great", publication_status: "live", technical_specifications: "no colon here" });
    expect(bad.ok).toBe(false);
    if (!bad.ok) {
      const text = bad.errors.join("\n");
      expect(text).toMatch(/name:/);
      expect(text).toMatch(/manufacturer:/);
      expect(text).toMatch(/imageUrl:/);
      expect(text).toMatch(/productUrl:/);
      expect(text).toMatch(/review_status/);
      expect(text).toMatch(/publication_status/);
      expect(text).toMatch(/Label: Value/);
    }
    expect(parseImportRecord({ name: "A name", manufacturer: "M", category: "C", product_id: "banana" }).ok).toBe(false);
  });
});

describe("products: spam signals and the human check", () => {
  it("never judges a name, flags links and spam words, and files heavy spam apart", () => {
    const real = checkComment({ name: "Griffith", affiliation: "", role: "", body: "We ran this incubator for six months with stable temperature. No issues so far." });
    expect(real.flags).toEqual([]);
    expect(checkComment({ name: "Harry Potter", body: "Used it for routine cell culture and it held temperature well." }).flags).toEqual([]);
    expect(checkComment({ name: "Ann", body: "Nice, see https://example.org/x for more details on how I used the machine." }).flags.join()).toMatch(/link/);
    const spam = checkComment({ name: "Best casino", body: "Buy followers now https://a.example https://b.example https://c.example casino casino" });
    expect(spam.spam).toBe(true);
    expect(spam.flags.length).toBeGreaterThanOrEqual(2);
  });

  it("issues a question that expires, cannot be answered instantly, and works once", async () => {
    const done = tempDb(); // a used question is remembered in the database
    try {
    const ch = await issueChallenge(Date.now() - 10_000);
    const solve = (q: string) => {
      const w = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen"];
      const m = /What is (\w+) (plus|minus) (\w+)\?/.exec(q);
      if (m) return String(m[2] === "plus" ? w.indexOf(m[1]) + w.indexOf(m[3]) : w.indexOf(m[1]) - w.indexOf(m[3]));
      return String(/"(\w+)"/.exec(q)![1].length);
    };
    expect(ch.question).toMatch(/Answer with digits/);
    expect(await verifyChallenge(ch.token, "")).toEqual({ ok: false, reason: "missing" });
    expect(await verifyChallenge(ch.token, "999")).toEqual({ ok: false, reason: "wrong" });
    expect(await verifyChallenge("garbage", "1")).toEqual({ ok: false, reason: "missing" });
    const answer = solve(ch.question);
    expect((await verifyChallenge(ch.token, answer)).ok).toBe(true);
    expect(await verifyChallenge(ch.token, answer)).toEqual({ ok: false, reason: "used" }); // replay
    const fast = await issueChallenge(Date.now());
    expect(await verifyChallenge(fast.token, solve(fast.question), Date.now() + 500)).toEqual({ ok: false, reason: "too_fast" });
    const old = await issueChallenge(Date.now() - 3_600_000);
    expect(await verifyChallenge(old.token, solve(old.question))).toEqual({ ok: false, reason: "expired" });
    } finally {
      done();
    }
  });
});

describe("products: catalogue, comments and routes (database)", () => {
  let cleanup: () => void;
  let owner: User;
  const tokens: Record<string, string> = {};
  const csrf: Record<string, string> = {};
  let ip = 0;

  const as = (who: string | null) => {
    jar.clear();
    if (who) jar.set(SESSION_COOKIE, tokens[who]);
  };
  const call = (route: string, who: string | null, method: string, body?: unknown) => {
    const headers: Record<string, string> = { host: "localhost:3000", origin: ORIGIN, "x-forwarded-for": `10.4.0.${(ip++ % 250) + 1}` };
    if (who) headers["x-csrf-token"] = csrf[who];
    let b: BodyInit | undefined;
    if (body !== undefined) {
      headers["content-type"] = "application/json";
      b = JSON.stringify(body);
    }
    return new Request(`${ORIGIN}${route}`, { method, headers, body: b });
  };
  const id = (x: string) => ({ params: Promise.resolve({ id: x }) });
  const slugCtx = (slug: string) => ({ params: Promise.resolve({ slug }) });
  const signIn = async (key: string, email: string, password: string) => {
    const r = await login({ email, password, ipHash: `ip-${key}`, userAgent: "vitest" });
    if (!r.ok) throw new Error(`login ${key}`);
    tokens[key] = r.token;
    csrf[key] = await csrfTokenFor(await sha256Hex(r.token));
  };
  const input = (over: Record<string, unknown> = {}) => ({ name: "Example benchtop centrifuge", manufacturer: "Example Maker", category: "Centrifuges", modelNumber: "EX-100", shortDescription: "A benchtop centrifuge.", ...over });
  let ownerView: ReturnType<typeof viewerOf>;

  beforeAll(async () => {
    cleanup = tempDb();
    const PW = "Owner-Products-Pass-2026!";
    await bootstrapOwner({ email: "info@vierapparatus.com", name: "Editor In Chief", password: PW });
    owner = (await getUserByEmail("info@vierapparatus.com"))!;
    const db = await conn();
    await db.execute({ sql: "UPDATE users SET must_change_password = 0 WHERE id = ?", args: [owner.id] });
    const r = await createContributorAccount(owner.id, { name: "Wendy Writer", email: "wendy@example.org", password: "Contributor-Pass-2026!" });
    if (!r.ok) throw new Error(r.error);
    ownerView = viewerOf(owner);
    await signIn("owner", "info@vierapparatus.com", PW);
    await signIn("wendy", "wendy@example.org", "Contributor-Pass-2026!");
  });
  afterAll(() => cleanup());
  beforeEach(() => jar.clear());
  afterEach(() => vi.restoreAllMocks());

  const wendyView = () => ({ ...ownerView, role: "contributor" as const, permissions: ["collab.access"], id: "someone-else", name: "Wendy" });

  it("lets only the owner manage products, in the store and on every route", async () => {
    await expect(createProduct(wendyView() as never, input())).rejects.toMatchObject({ code: "forbidden" });
    as(null);
    expect((await productsRoute.GET(call("/api/admin/products", null, "GET"))).status).toBe(401);
    as("wendy");
    expect((await productsRoute.GET(call("/api/admin/products", "wendy", "GET"))).status).toBe(403);
    expect((await productsRoute.POST(call("/api/admin/products", "wendy", "POST", input()))).status).toBe(403);
    expect((await bulkRoute.POST(call("/api/admin/products/bulk", "wendy", "POST", { ids: ["x"], action: { type: "delete" } }))).status).toBe(403);
    expect((await importRoute.POST(call("/api/admin/products/import", "wendy", "POST", { mode: "preview", records: [{ name: "x" }] }))).status).toBe(403);
    expect((await commentsAdminRoute.GET(call("/api/admin/products/comments", "wendy", "GET"))).status).toBe(403);
    expect((await exportRoute.GET(call("/api/admin/products/export", "wendy", "GET"))).status).toBe(403);
    as("owner");
    expect((await productsRoute.GET(call("/api/admin/products", "owner", "GET"))).status).toBe(200);
  });

  it("creates a draft, keeps its address when it is renamed, and redirects an address that was changed on purpose", async () => {
    const p = await createProduct(ownerView, input());
    expect(p).toMatchObject({ status: "draft", ref: "P-00001", slug: "example-benchtop-centrifuge-ex-100", category: "Centrifuges", reviewStatus: "listed" });
    expect(await getPublishedProduct(p.slug)).toBeNull(); // a draft is not public
    const renamed = await updateProduct(ownerView, p.id, { ...input({ name: "Example centrifuge, renamed" }), expectedVersion: p.version });
    expect(renamed.name).toBe("Example centrifuge, renamed");
    expect(renamed.slug).toBe(p.slug); // the URL does not move by accident
    const moved = await updateProduct(ownerView, p.id, { ...input({ name: "Example centrifuge, renamed", slug: "Centrifuge EX 100" }), expectedVersion: renamed.version });
    expect(moved.slug).toBe("centrifuge-ex-100");
    await setProductStatus(ownerView, p.id, "under_review");
    await setProductStatus(ownerView, p.id, "approved");
    await setProductStatus(ownerView, p.id, "published");
    expect(await findProductRedirect(p.slug)).toBe("centrifuge-ex-100"); // the old address keeps working
    expect((await getPublishedProduct("centrifuge-ex-100"))?.id).toBe(p.id);
    // a second product cannot take a used address
    const other = await createProduct(ownerView, input({ name: "Another", modelNumber: "", slug: "centrifuge-ex-100" }));
    expect(other.slug).toBe("centrifuge-ex-100-2");
    await expect(updateProduct(ownerView, other.id, { ...input({ name: "Another", modelNumber: "", slug: "centrifuge-ex-100" }), expectedVersion: other.version })).rejects.toMatchObject({ code: "conflict" });
  });

  it("refuses a stale save and a published product that loses what it needs to be public", async () => {
    const p = await createProduct(ownerView, input({ name: "Stale test product", modelNumber: "ST-1" }));
    await updateProduct(ownerView, p.id, { ...input({ name: "Stale test product", modelNumber: "ST-1" }), expectedVersion: p.version });
    await expect(updateProduct(ownerView, p.id, { ...input({ name: "Stale test product", modelNumber: "ST-1" }), expectedVersion: p.version })).rejects.toMatchObject({ code: "conflict" });
    const live = await createProduct(ownerView, input({ name: "Live test product", modelNumber: "LT-1" }));
    for (const s of ["under_review", "approved", "published"] as const) await setProductStatus(ownerView, live.id, s);
    const cur = (await getProduct(live.id))!;
    await expect(updateProduct(ownerView, live.id, { ...input({ name: "Live test product", modelNumber: "LT-1", shortDescription: "" }), expectedVersion: cur.version })).rejects.toMatchObject({ code: "invalid" });
  });

  it("walks the workflow, refuses a jump, and refuses to publish without a short description (with the reasons)", async () => {
    const p = await createProduct(ownerView, input({ name: "Workflow product", modelNumber: "WF-1", shortDescription: "" }));
    await expect(setProductStatus(ownerView, p.id, "published")).rejects.toMatchObject({ code: "invalid" });
    await setProductStatus(ownerView, p.id, "under_review");
    await setProductStatus(ownerView, p.id, "approved");
    const err = await setProductStatus(ownerView, p.id, "published").catch((e) => e);
    expect(err).toBeInstanceOf(ProductError);
    expect(err.problems.join(" ")).toMatch(/short description/);
    // through the route: 422 with the problems
    as("owner");
    const res = await statusRoute.POST(call(`/api/admin/products/${p.id}/status`, "owner", "POST", { status: "published" }), id(p.id));
    expect(res.status).toBe(422);
    expect((await res.json()).problems.join(" ")).toMatch(/short description/);
    await updateProduct(ownerView, p.id, { ...input({ name: "Workflow product", modelNumber: "WF-1" }), expectedVersion: (await getProduct(p.id))!.version });
    expect((await setProductStatus(ownerView, p.id, "published")).status).toBe("published");
    expect((await setProductStatus(ownerView, p.id, "approved")).status).toBe("approved"); // unpublished
    expect((await setProductStatus(ownerView, p.id, "archived")).status).toBe("archived");
    expect((await getProduct(p.id))!.publishedAt).toBeTruthy(); // the first publication date is kept
  });

  it("lists with search, filters, sort and pages on the server, and the public list shows only published products", async () => {
    for (let i = 1; i <= 7; i++) await createProduct(ownerView, input({ name: `Search item ${String(i).padStart(2, "0")}`, modelNumber: `SI-${i}`, manufacturer: i % 2 ? "Odd Maker" : "Even Maker", category: i < 4 ? "Mixers" : "Freezers" }));
    const all = await listAllProducts({ q: "search item", perPage: 3, sort: "name" });
    expect(all.total).toBe(7);
    expect(all.pageCount).toBe(3);
    expect(all.items.map((x) => x.name)).toEqual(["Search item 01", "Search item 02", "Search item 03"]);
    expect((await listAllProducts({ q: "search item", perPage: 3, sort: "name", dir: "desc" })).items[0].name).toBe("Search item 07");
    expect((await listAllProducts({ q: "search item", manufacturer: "even maker" })).total).toBe(3);
    expect((await listAllProducts({ q: "search item", category: "mixers" })).total).toBe(3);
    expect((await listAllProducts({ q: "SI-5" })).total).toBe(1);
    expect((await listAllProducts({ q: "50% off_ 'quote\"" })).total).toBe(0); // odd characters are plain text
    const before = (await listPublishedProducts({ q: "search item" })).total;
    expect(before).toBe(0); // all drafts
    const first = (await listAllProducts({ q: "search item", sort: "name" })).items[0];
    for (const s of ["under_review", "approved", "published"] as const) await setProductStatus(ownerView, first.id, s);
    expect((await listPublishedProducts({ q: "search item" })).items.map((x) => x.id)).toEqual([first.id]);
    expect((await getRelatedProducts({ id: "x", categoryId: (await getProduct(first.id))!.categoryId, manufacturer: "Odd Maker" })).map((x) => x.id)).toContain(first.id);
    // A new product is "listed" (not reviewed): it is published and readable, but it is noindex and not in the sitemap.
    expect((await listProductSitemap()).map((x) => x.slug)).not.toContain(first.slug);
    const meta = () => productPage.generateMetadata({ params: Promise.resolve({ slug: first.slug }) });
    expect((await meta()).robots).toEqual({ index: false, follow: true });
    await bulkUpdate(ownerView, [first.id], { type: "review", review: "reviewed" });
    expect((await listProductSitemap()).map((x) => x.slug)).toContain(first.slug);
    expect((await meta()).robots).toEqual({ index: true, follow: true });
    const cats = await listProductCategories({ publishedOnly: true });
    expect(cats.every((c) => c.count > 0)).toBe(true);
  });

  it("applies one change to many products and reports the ones it could not change", async () => {
    const items = (await listAllProducts({ q: "search item", sort: "name", perPage: 50 })).items;
    const ids = items.map((x) => x.id);
    const r = await bulkUpdate(ownerView, ids, { type: "status", status: "under_review" });
    // the published one cannot go to under review directly; the six drafts can
    expect(r.done).toBe(6);
    expect(r.failed).toHaveLength(1);
    expect(r.failed[0].reason).toMatch(/cannot become/);
    expect((await bulkUpdate(ownerView, ids, { type: "category", category: "Bulk category" })).done).toBe(7);
    expect((await getProduct(ids[0]))!.category).toBe("Bulk category");
    expect((await bulkUpdate(ownerView, ids, { type: "review", review: "in_review" })).done).toBe(7);
    expect((await listAllProducts({ q: "search item", review: "in_review" })).total).toBe(7);
    // archive: allowed for every status
    expect((await bulkUpdate(ownerView, ids, { type: "status", status: "archived" })).done).toBe(7);
    expect((await listPublishedProducts({ q: "search item" })).total).toBe(0);
    await expect(bulkUpdate(ownerView, [], { type: "delete" })).rejects.toMatchObject({ code: "invalid" });
    await bulkUpdate(ownerView, ids.slice(1), { type: "delete" });
    expect(await getProduct(ids[1])).toBeNull();
  });

  it("checks an import row by row before writing, finds duplicates in the file and in the catalogue, and never skips silently", async () => {
    await createProduct(ownerView, input({ name: "Existing import product", modelNumber: "EI-1", manufacturer: "Import Maker" }));
    const existing = (await listAllProducts({ q: "existing import" })).items[0];
    const rows: Record<string, string>[] = [
      { name: "New import product", manufacturer: "Import Maker", category: "Centrifuges", model_number: "NI-1", short_description: "Fine." },
      { name: "New import product, again", manufacturer: "Import Maker", category: "Centrifuges", model_number: "NI-1" }, // same manufacturer and model as row 1
      { name: "Existing import product", manufacturer: "Import Maker", category: "Centrifuges", model_number: "EI-1" }, // already in the catalogue
      { name: "Update by id", manufacturer: "Import Maker", category: "Centrifuges", product_id: existing.ref, short_description: "Updated sentence." },
      { name: "Bad row", manufacturer: "", category: "Centrifuges" },
      { name: "Wrong id", manufacturer: "M", category: "C", product_id: "P-99999" },
      { name: "Brand new category", manufacturer: "Import Maker", category: "Spectrometers", model_number: "BN-1", publication_status: "published" }, // cannot be published: no short description
    ];
    const preview = await runImport(ownerView, rows, { onDuplicate: "skip", source: "csv", filename: "test.csv" }, false);
    expect(preview).toMatchObject({ total: 7, added: 1, updated: 1, skipped: 2, failed: 3 });
    expect(preview.rows.map((r) => r.action)).toEqual(["add", "duplicate", "duplicate", "update", "error", "error", "error"]);
    expect(preview.rows[1].note).toMatch(/row 1/);
    expect(preview.rows[4].errors.join(" ")).toMatch(/manufacturer/);
    expect(preview.rows[5].errors.join(" ")).toMatch(/does not exist/);
    expect(preview.rows[6].errors.join(" ")).toMatch(/short description/);
    expect(preview.newCategories).toEqual([]); // the failed row's category is not announced
    // the preview wrote nothing
    expect((await listAllProducts({ q: "new import product" })).total).toBe(0);
    expect((await listProductCategories()).map((c) => c.name)).not.toContain("Spectrometers");

    const done = await runImport(ownerView, rows, { onDuplicate: "skip", source: "csv", filename: "test.csv" }, true);
    expect(done).toMatchObject({ added: 1, updated: 1, skipped: 2, failed: 3 });
    expect((await listAllProducts({ q: "new import product" })).items[0]).toMatchObject({ name: "New import product", status: "draft", origin: "import" });
    expect((await getProduct(existing.id))!.shortDescription).toBe("Updated sentence.");
    expect((await getProduct(existing.id))!.name).toBe("Update by id"); // the row names the new name
    const hist = await conn().then((db) => db.execute("SELECT * FROM product_imports"));
    expect(hist.rows).toHaveLength(1);
    expect(Number(hist.rows[0].failed)).toBe(3);

    // with the "update" rule a matching product is updated, not left out; empty cells never erase
    const again = await runImport(ownerView, [{ name: "New import product", manufacturer: "Import Maker", category: "Centrifuges", model_number: "NI-1", description: "Now with a description." }], { onDuplicate: "update", source: "paste" }, true);
    expect(again).toMatchObject({ added: 0, updated: 1 });
    const upd = (await listAllProducts({ q: "new import product" })).items[0];
    expect((await getProduct(upd.id))!).toMatchObject({ description: "Now with a description.", shortDescription: "Fine." });
  });

  it("imports through the route, and exports the table in the same columns so it can be imported back", async () => {
    as("owner");
    const rec = [{ name: "Route import product", manufacturer: "Route Maker", category: "Routes", model_number: "RI-1", short_description: "Via the route.", technical_specifications: "Speed: 10 rpm | Mass: 2 kg", publication_status: "approved" }];
    const prev = await importRoute.POST(call("/api/admin/products/import", "owner", "POST", { mode: "preview", records: rec }));
    expect(prev.status).toBe(200);
    expect(await prev.json()).toMatchObject({ mode: "preview", added: 1 });
    expect((await importRoute.POST(call("/api/admin/products/import", "owner", "POST", { mode: "commit", records: rec }))).status).toBe(200);
    expect((await importRoute.POST(call("/api/admin/products/import", "owner", "POST", { mode: "commit", records: [] }))).status).toBe(400);
    const csv = await (await exportRoute.GET(call("/api/admin/products/export?q=route+import", "owner", "GET"))).text();
    const t = parseTable(csv);
    expect(t.headers).toEqual(IMPORT_COLUMNS.map((c) => c.header));
    expect(t.rows).toHaveLength(1);
    const rec2 = toRecords(t.rows, t.headers.map((h) => h));
    expect(rec2[0]).toMatchObject({ name: "Route import product", technical_specifications: "Speed: 10 rpm | Mass: 2 kg", publication_status: "approved" });
    expect(rec2[0].product_id).toMatch(/^P-\d{5}$/);
    // round trip: the exported row is a valid import row that names its own product, so it updates it
    const back = await runImport(ownerView, rec2, { onDuplicate: "skip", source: "csv" }, false);
    expect(back).toMatchObject({ updated: 1, failed: 0 });
  });

  it("edits, saves and deletes through the routes, and edits one cell in place", async () => {
    as("owner");
    const made = await productsRoute.POST(call("/api/admin/products", "owner", "POST", input({ name: "Route product", modelNumber: "RP-1" })));
    expect(made.status).toBe(200);
    const { id: pid } = (await made.json()) as { id: string };
    expect((await productsRoute.POST(call("/api/admin/products", "owner", "POST", { name: "x" }))).status).toBe(400);
    const cur = (await getProduct(pid))!;
    const cell = await productRoute.PATCH(call(`/api/admin/products/${pid}`, "owner", "PATCH", { field: "manufacturer", value: "Cell Maker", expectedVersion: cur.version }), id(pid));
    expect(cell.status).toBe(200);
    expect((await getProduct(pid))!.manufacturer).toBe("Cell Maker");
    const stale = await productRoute.PATCH(call(`/api/admin/products/${pid}`, "owner", "PATCH", { field: "name", value: "Stale", expectedVersion: cur.version }), id(pid));
    expect(stale.status).toBe(409);
    expect((await productRoute.PATCH(call(`/api/admin/products/${pid}`, "owner", "PATCH", { field: "imageUrl", value: "javascript:alert(1)", expectedVersion: (await getProduct(pid))!.version }), id(pid))).status).toBe(400);
    expect((await productRoute.DELETE(call(`/api/admin/products/${pid}`, "owner", "DELETE"), id(pid))).status).toBe(200);
    expect((await productRoute.GET(call(`/api/admin/products/${pid}`, "owner", "GET"), id(pid))).status).toBe(404);
  });

  it("keeps the disclaimer and the invitation editable, with the brief's text as the starting point", async () => {
    const t = await getProductTexts();
    expect(t.disclaimer.title).toBe("About Our Product Reviews");
    expect(t.disclaimer.body).toContain("does not automatically constitute an endorsement");
    expect(t.invite.title).toBe("Want Your Scientific Equipment Reviewed?");
    expect(t).toEqual(DEFAULT_TEXTS);
    await setProductTexts(ownerView, { disclaimer: { title: "Our review policy", body: "A new paragraph about how we review products, long enough to save." }, invite: DEFAULT_TEXTS.invite });
    expect((await getProductTexts()).disclaimer.title).toBe("Our review policy");
    await expect(setProductTexts(ownerView, { disclaimer: { title: "x", body: "short" }, invite: DEFAULT_TEXTS.invite })).rejects.toMatchObject({ code: "invalid" });
    as("owner");
    expect((await textsRoute.GET(call("/api/admin/products/texts", "owner", "GET"))).status).toBe(200);
    expect((await textsRoute.PUT(call("/api/admin/products/texts", "owner", "PUT", { disclaimer: DEFAULT_TEXTS.disclaimer, invite: DEFAULT_TEXTS.invite }))).status).toBe(200);
  });

  describe("comments", () => {
    let slug: string;
    let pid: string;
    const solve = (q: string) => {
      const w = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen"];
      const m = /What is (\w+) (plus|minus) (\w+)\?/.exec(q);
      if (m) return String(m[2] === "plus" ? w.indexOf(m[1]) + w.indexOf(m[3]) : w.indexOf(m[1]) - w.indexOf(m[3]));
      return String(/"(\w+)"/.exec(q)![1].length);
    };
    /** The public form's request, as the browser sends it. A question needs a few seconds to be answered, so time is moved forward. */
    async function post(fields: Record<string, string>, opts: { answer?: string; startedAgo?: number; forwarded?: string } = {}) {
      const ch = (await (await captchaRoute.GET(call("/api/products/captcha", null, "GET"))).json()) as { token: string; question: string };
      const real = Date.now();
      vi.spyOn(Date, "now").mockImplementation(() => real + 6000);
      const req = call(`/api/products/${slug}/comments`, null, "POST", {
        displayName: "Dr Griffith", role: "Research technician", affiliation: "Example University", body: "We used this centrifuge daily for three months and it kept its speed well.", rating: "4",
        captchaToken: ch.token, captchaAnswer: opts.answer ?? solve(ch.question), startedAt: String(real - (opts.startedAgo ?? 20_000)), website: "", ...fields,
      });
      if (opts.forwarded) req.headers.set("x-forwarded-for", opts.forwarded);
      const res = await commentRoute.POST(req, slugCtx(slug));
      vi.restoreAllMocks();
      return res;
    }

    beforeAll(async () => {
      const p = await createProduct(ownerView, input({ name: "Commented product", modelNumber: "CP-1" }));
      for (const s of ["under_review", "approved", "published"] as const) await setProductStatus(ownerView, p.id, s);
      slug = p.slug;
      pid = p.id;
    });

    it("hands out a fresh question that is never cached, to our own pages only", async () => {
      const ok = await captchaRoute.GET(call("/api/products/captcha", null, "GET"));
      expect(ok.status).toBe(200);
      expect(ok.headers.get("cache-control")).toBe("no-store");
      const j = await ok.json();
      expect(j.question).toMatch(/Answer with digits/);
      const foreign = new Request(`${ORIGIN}/api/products/captcha`, { headers: { host: "localhost:3000", origin: "https://evil.example" } });
      expect((await captchaRoute.GET(foreign)).status).toBe(403);
    });

    it("refuses a comment without a valid human check, with the reason, and stores nothing", async () => {
      const before = (await listComments({})).total;
      expect((await post({}, { answer: "" })).status).toBe(400);
      const wrong = await post({}, { answer: "999" });
      expect(wrong.status).toBe(400);
      expect((await wrong.json()).error).toBe("captcha");
      expect((await post({ captchaToken: "forged.token.value" })).status).toBe(400);
      expect((await listComments({})).total).toBe(before);
    });

    it("quietly drops a bot: a filled honeypot, or a form submitted within seconds of being shown", async () => {
      const before = (await listComments({})).total;
      const hp = await post({ website: "https://spam.example" });
      expect(hp.status).toBe(200); // the bot is told nothing
      const fast = await post({}, { startedAgo: -5500 }); // shown half a second before it was sent (time is moved 6 s forward inside post)
      expect(fast.status).toBe(200);
      expect((await listComments({})).total).toBe(before);
    });

    it("validates and cleans every field on the server", async () => {
      const bad = await post({ displayName: "A", body: "too short" });
      expect(bad.status).toBe(400);
      const j = await bad.json();
      expect(j.error).toBe("validation");
      expect(Object.keys(j.fields)).toEqual(expect.arrayContaining(["displayName", "body"]));
      expect((await post({ rating: "9" })).status).toBe(400);
      const ok = await post({ displayName: "Eve\r\nBcc: x@evil.example", body: "<script>alert(1)</script> The unit ran quietly during our overnight protocols with no faults at all." });
      expect(ok.status).toBe(200);
      const c = (await listComments({ productId: pid })).items[0];
      expect(c.displayName).not.toMatch(/[\r\n]/); // no header injection
      expect(c.body).toContain("<script>"); // stored as plain text; the page escapes it, it is never rendered as HTML
      expect(c.status).toBe("pending");
    });

    it("keeps every comment out of the public page until it is approved, then shows it with an unverified affiliation", async () => {
      expect(await listApprovedComments(pid)).toEqual([]);
      const pending = (await listComments({ productId: pid, status: "pending" })).items;
      expect(pending.length).toBeGreaterThan(0);
      expect(await countPendingComments()).toBeGreaterThan(0);
      const c = pending.find((x) => x.displayName === "Eve Bcc: x@evil.example") ?? pending[0];
      await moderateComment(ownerView, c.id, { type: "approve", note: "Looks genuine" });
      const shown = await listApprovedComments(pid);
      expect(shown.map((x) => x.id)).toEqual([c.id]);
      expect(shown[0].affiliationVerified).toBe(false);
      await moderateComment(ownerView, c.id, { type: "verify" });
      expect((await listApprovedComments(pid))[0].affiliationVerified).toBe(true);
      const h = (await listComments({ productId: pid })).items.find((x) => x.id === c.id)!.history.map((e) => e.action);
      expect(h).toEqual(["submitted", "approved", "affiliation verified"]);
    });

    it("accepts an unusual or fictional-sounding name as typed, and never invents one", async () => {
      const r = await post({ displayName: "Harry Potter", body: "Held its temperature well across a long run of cultures in our teaching laboratory." });
      expect(r.status).toBe(200);
      const c = (await listComments({ productId: pid })).items.find((x) => x.displayName === "Harry Potter")!;
      expect(c.status).toBe("pending"); // not rejected, not flagged for the name
      expect(c.flags.join()).not.toMatch(/name/i);
    });

    it("refuses the same text twice and limits one visitor to a few comments a day", async () => {
      const same = await post({ body: "Held its temperature well across a long run of cultures in our teaching laboratory." });
      expect(same.status).toBe(409);
      let last = 200;
      for (let i = 0; i < 4 && last === 200; i++) last = (await post({ body: `A separate and sufficiently long remark number ${i} about the speed accuracy of the unit.`, displayName: `Visitor ${i}` }, { forwarded: "10.9.9.9" })).status;
      expect(last).toBe(429);
    });

    it("files heavy spam apart without publishing it, and lets the owner restore it", async () => {
      const r = await post({ displayName: "Cheap casino", body: "Buy followers casino casino https://a.example https://b.example https://c.example http://d.example" }, { forwarded: "10.8.8.8" });
      expect(r.status).toBe(200); // the sender cannot tell
      const spam = (await listComments({ productId: pid, status: "spam" })).items;
      expect(spam).toHaveLength(1);
      expect(spam[0].flags.length).toBeGreaterThan(1);
      expect((await listApprovedComments(pid)).some((x) => x.id === spam[0].id)).toBe(false);
      await moderateComment(ownerView, spam[0].id, { type: "pending" });
      expect((await listComments({ productId: pid, status: "pending" })).items.some((x) => x.id === spam[0].id)).toBe(true);
    });

    it("moderates through the routes: approve, edit with the original kept, verify, delete; contributors cannot", async () => {
      const c = (await listComments({ productId: pid, status: "pending" })).items[0];
      as("wendy");
      expect((await commentAdminRoute.POST(call(`/api/admin/products/comments/${c.id}`, "wendy", "POST", { type: "approve" }), id(c.id))).status).toBe(403);
      as("owner");
      const list = await commentsAdminRoute.GET(call("/api/admin/products/comments?status=pending", "owner", "GET"));
      expect((await list.json()).counts.pending).toBeGreaterThan(0);
      expect((await commentAdminRoute.POST(call(`/api/admin/products/comments/${c.id}`, "owner", "POST", { type: "edit", body: "An edited version of the comment that is long enough." }), id(c.id))).status).toBe(200);
      const edited = (await listComments({ productId: pid })).items.find((x) => x.id === c.id)!;
      expect(edited.edited).toBe(true);
      expect(edited.history.some((h) => h.action === "edited" && h.note.includes("before:"))).toBe(true);
      expect((await commentAdminRoute.POST(call(`/api/admin/products/comments/${c.id}`, "owner", "POST", { type: "verify" }), id(c.id))).status).toBe(200);
      expect((await commentAdminRoute.POST(call(`/api/admin/products/comments/${c.id}`, "owner", "POST", { type: "bogus" }), id(c.id))).status).toBe(400);
      expect((await commentAdminRoute.DELETE(call(`/api/admin/products/comments/${c.id}`, "owner", "DELETE"), id(c.id))).status).toBe(200);
      expect((await commentAdminRoute.DELETE(call(`/api/admin/products/comments/${c.id}`, "owner", "DELETE"), id(c.id))).status).toBe(404);
    });

    it("shows a score only when there are enough approved ratings", async () => {
      const p = await createProduct(ownerView, input({ name: "Rated product", modelNumber: "RT-1" }));
      for (const s of ["under_review", "approved", "published"] as const) await setProductStatus(ownerView, p.id, s);
      const db = await conn();
      const add = async (n: number, rating: number | null) => {
        const r = await submitComment(p.id, { displayName: `Rater ${n}`, body: `A genuine experience report number ${n} of sufficient length.`, rating }, "iphash");
        await moderateComment(ownerView, r.id, { type: "approve" });
      };
      await add(1, 5);
      await add(2, 4);
      expect((await ratingFor([p.id])).get(p.id)).toMatchObject({ ratedCount: 2, average: null }); // two ratings are not a score
      await add(3, 3);
      await add(4, null);
      const r = (await ratingFor([p.id])).get(p.id)!;
      expect(MIN_RATINGS_FOR_SCORE).toBe(3);
      expect(r).toMatchObject({ count: 4, ratedCount: 3, average: 4 });
      const rec = (await getProduct(p.id))!;
      expect((productJsonLd(rec, r) as { aggregateRating?: { ratingValue: number } }).aggregateRating?.ratingValue).toBe(4);
      expect((productJsonLd(rec, { count: 1, ratedCount: 1, average: null }) as { aggregateRating?: unknown }).aggregateRating).toBeUndefined();
      expect(Number((await db.execute({ sql: "SELECT COUNT(*) AS c FROM product_comments WHERE product_id = ?", args: [p.id] })).rows[0].c)).toBe(4);
    });
  });

  it("describes a product for search engines without a price, an offer or an invented rating", async () => {
    const p = (await getProduct((await listAllProducts({ q: "commented product" })).items[0].id))!;
    const ld = productJsonLd(p) as Record<string, unknown>;
    expect(ld["@type"]).toBe("Product");
    expect(ld.offers).toBeUndefined();
    expect(ld.aggregateRating).toBeUndefined();
    expect(ld.brand).toEqual({ "@type": "Brand", name: "Example Maker" });
    expect(productTitle(p).length).toBeLessThanOrEqual(60);
    const d = productDescription(p);
    expect(d.length).toBeGreaterThanOrEqual(120);
    expect(d.length).toBeLessThanOrEqual(155);
    expect(d).not.toMatch(/quot|pric/i);
  });

  it("takes the contact form's new Product submission type, with the product and organisation", async () => {
    const ch = (name: string) => name;
    void ch;
    const req = (body: Record<string, string>) =>
      new Request(`${ORIGIN}/api/contact`, { method: "POST", headers: { host: "localhost:3000", origin: ORIGIN, "content-type": "application/json", "x-forwarded-for": `10.5.0.${(ip++ % 250) + 1}` }, body: JSON.stringify({ startedAt: String(Date.now() - 20_000), ...body }) });
    const ok = await contactRoute.POST(req({ type: "Product submission", name: "Pat Supplier", email: "pat@supplier.example", organization: "Supplier Ltd", productName: "Benchtop incubator range", message: "Please consider our incubators. The datasheet is linked below.", links: "https://supplier.example/datasheet" }));
    expect(ok.status).toBe(200);
    const row = (await (await conn()).execute("SELECT type, extra FROM inquiries WHERE type = 'Product submission'")).rows[0];
    expect(JSON.parse(String(row.extra))).toMatchObject({ organization: "Supplier Ltd", product: "Benchtop incubator range" });
    const bad = await contactRoute.POST(req({ type: "Product submission", name: "Pat", email: "pat@supplier.example", message: "too short" }));
    expect(bad.status).toBe(400);
  });

  it("takes a Learn more lead: name, email, institution, the product and its link on this site; the link must be one of ours", async () => {
    const ip = `10.6.0.${(Date.now() % 200) + 1}`;
    const req = (body: Record<string, string>) =>
      new Request(`${ORIGIN}/api/contact`, { method: "POST", headers: { host: "localhost:3000", origin: ORIGIN, "content-type": "application/json", "x-forwarded-for": ip }, body: JSON.stringify({ startedAt: String(Date.now() - 20_000), ...body }) });
    const ok = await contactRoute.POST(req({ type: "Quotation request", name: "Dr Lead", email: "lead@lab.example", organization: "Lab Institute", productName: "-150℃ freezer 128L", productPath: "/products/150-c-freezer-128l", message: "Can you tell me the warranty?" }));
    expect(ok.status).toBe(200);
    const row = (await (await conn()).execute("SELECT extra, message FROM inquiries WHERE type = 'Quotation request'")).rows[0];
    expect(JSON.parse(String(row.extra))).toMatchObject({ Institution: "Lab Institute", Product: "-150℃ freezer 128L", "Product link": expect.stringMatching(/\/products\/150-c-freezer-128l$/) });
    expect(String(row.message)).toBe("Can you tell me the warranty?");
    // a product name typed by hand, no link, and no message: still a lead
    expect((await contactRoute.POST(req({ type: "Quotation request", name: "Ann Typed", email: "ann@lab.example", productName: "Some centrifuge" }))).status).toBe(200);
    // a link to anywhere else is refused, so an e-mail can never carry a foreign address
    const foreign = await contactRoute.POST(req({ type: "Quotation request", name: "Eve Link", email: "eve@lab.example", productPath: "https://evil.example/x" }));
    expect(foreign.status).toBe(400);
  });

  it("brings the old catalogue in without loss: BIOBASE stays public, everything else is archived, addresses are kept, and a second run changes nothing", async () => {
    const mk = (n: number, manufacturer: string): LegacyProduct => ({
      id: `p_legacy${n}`, slug: `legacy-product-${n}`, name: `Legacy product ${n}`, sku: null, modelCode: `LG-${n}`, category: n % 2 ? "Old Category A" : "Old Category B", subcategory: null, manufacturer, supplier: manufacturer,
      shortDescription: `Model LG-${n}`, description: `Model LG-${n}`, specifications: [], imageUrl: "https://img.example.net/a.jpg", datasheetUrl: null, sourceUrl: null, price: "USD 10", availability: "In stock", originCountry: "CN",
      importSource: "legacy.csv", updatedAt: "2026-10-10T00:00:00.000Z", keywords: ["k"],
    });
    const records = [mk(1, "BIOBASE"), mk(2, "Biobase "), mk(3, "Corning Life Sciences"), mk(4, "BIOBASED GmbH"), mk(5, "Other")];
    const r = await importLegacyCatalogue(records, "BIOBASE");
    expect(r).toMatchObject({ inserted: 5, published: 2, archived: 3 });
    expect((await getPublishedProduct("legacy-product-1"))?.name).toBe("Legacy product 1"); // the old address still works
    expect(await getPublishedProduct("legacy-product-3")).toBeNull();
    const archived = (await listAllProducts({ q: "legacy product 3" })).items[0];
    expect(archived.status).toBe("archived"); // kept, hidden, restorable
    expect((await setProductStatus(ownerView, archived.id, "draft")).status).toBe("draft");
    const kept = JSON.parse(String((await (await conn()).execute({ sql: "SELECT legacy_data FROM products WHERE legacy_id = 'p_legacy3'", args: [] })).rows[0].legacy_data));
    expect(kept).toMatchObject({ price: "USD 10", availability: "In stock", supplier: "Corning Life Sciences" }); // nothing the old record said was dropped
    const again = await importLegacyCatalogue(records, "BIOBASE");
    expect(again).toMatchObject({ inserted: 0, existing: 5 });
    expect((await getProduct(archived.id))!.status).toBe("draft"); // a repeat does not undo what was done since
    await deleteProduct(ownerView, archived.id);
  });
});

describe("products: the real catalogue file", () => {
  it("has exactly 1,476 BIOBASE records to keep public and archives all the others, without losing one", async () => {
    const cleanup = tempDb();
    try {
      await bootstrapOwner({ email: "info@vierapparatus.com", name: "Editor", password: "Owner-Legacy-Pass-2026!" });
      const all = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data/products.json"), "utf8")) as LegacyProduct[];
      const keep = all.filter((p) => (p.manufacturer ?? "").trim().toLowerCase() === "biobase");
      expect(keep).toHaveLength(1476);
      const r = await importLegacyCatalogue(all, "BIOBASE");
      expect(r.inserted).toBe(all.length);
      expect(r.published).toBe(1476);
      expect(r.archived).toBe(all.length - 1476);
      const db = await conn();
      const count = async (where: string) => Number((await db.execute(`SELECT COUNT(*) AS c FROM products WHERE ${where}`)).rows[0].c);
      expect(await count("status = 'published'")).toBe(1476);
      expect(await count("status = 'archived'")).toBe(all.length - 1476);
      expect(await count("status = 'published' AND lower(manufacturer) <> 'biobase'")).toBe(0);
      expect(Number((await db.execute("SELECT COUNT(DISTINCT slug) AS c FROM products")).rows[0].c)).toBe(all.length);
      expect(Number((await db.execute("SELECT COUNT(*) AS c FROM product_categories")).rows[0].c)).toBeGreaterThan(5);
      const pub = await listPublishedProducts({ perPage: 24 });
      expect(pub.total).toBe(1476);
      expect(pub.items).toHaveLength(24);
      expect(pub.items.every((p) => p.manufacturer === "BIOBASE")).toBe(true);
    } finally {
      cleanup();
    }
  }, 120_000);
});
