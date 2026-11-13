import type { InStatement } from "@libsql/client/web";
import { conn } from "../db/client";
import { newId } from "../crypto";
import { can } from "../auth/permissions";
import { slugify } from "../content/text";
import {
  canMove, productInput, productRef, productSlug, publishProblems, searchText,
  type GalleryImage, type ProductCategory, type ProductData, type ProductDocument, type ProductInput, type ProductListItem, type ProductRecord, type ProductReference, type ProductStatus, type ReviewStatus, type Spec,
} from "../products/shared";
import { duplicateKey, parseImportRecord, parseProductRef, type ImportRecord, type ImportSummary, type RowReport } from "../products/import";
import type { Viewer } from "./planner";
import { audit, json, likePattern, n, nowIso, s, sn, type Row } from "./util";
import { connectorProductPublished, connectorProductReviewed } from "../connector/hooks";

/**
 * The product catalogue: products, their categories, the publication workflow, bulk changes, imports, and the texts of the public
 * Product page. Everything a visitor sees is read here with a "published only" filter; everything an editor changes goes through
 * here, and every rule (who may change it, which status moves are allowed, what must be true before publishing) is enforced here.
 */

export class ProductError extends Error {
  constructor(
    public code: "not_found" | "forbidden" | "conflict" | "invalid",
    message: string,
    public problems: string[] = [],
  ) {
    super(message);
  }
}

const manage = (v: Viewer) => {
  if (!can(v, "products.manage")) throw new ProductError("forbidden", "Only the owner can manage products.");
};

/**
 * Who may add and change products. The owner may do everything. A contributor with "products.write" may add a product as a draft,
 * edit their OWN drafts, and send them for review. They may not publish, approve, delete, import, moderate, or touch the editorial
 * part of a product (its review, assessment and internal notes).
 */
const isOwner = (v: Viewer) => can(v, "products.manage");
const writer = (v: Viewer) => {
  if (!can(v, "products.write")) throw new ProductError("forbidden", "You do not have permission to add or change products.");
};
/** A contributor may change only their own product, and only while it is a draft. */
const ownDraft = (v: Viewer, cur: ProductRecord) => {
  if (!isOwner(v) && (cur.createdBy !== v.id || cur.status !== "draft")) throw new ProductError("forbidden", "You can change only your own drafts. Once a product is under review, the owner takes it from here.");
};

// ---------------------------------------------------------------- mapping

const FULL = `SELECT p.*, c.name AS category_name, c.slug AS category_slug FROM products p LEFT JOIN product_categories c ON c.id = p.category_id`;

const arr = <T>(v: unknown): T[] => {
  const a = json<unknown>(v, []);
  return Array.isArray(a) ? (a as T[]) : [];
};

function toRecord(r: Row): ProductRecord {
  return {
    id: s(r.id), num: n(r.num), ref: productRef(n(r.num)), slug: s(r.slug), name: s(r.name), manufacturer: s(r.manufacturer), modelNumber: s(r.model_number), sku: s(r.sku),
    categoryId: sn(r.category_id), category: s(r.category_name), categorySlug: s(r.category_slug), shortDescription: s(r.short_description), description: s(r.description),
    specs: arr<Spec>(r.specs), features: arr<string>(r.features), applications: arr<string>(r.applications), advantages: arr<string>(r.advantages), limitations: arr<string>(r.limitations), certifications: arr<string>(r.certifications),
    imageUrl: s(r.image_url), thumbUrl: s(r.thumb_url), gallery: arr<GalleryImage>(r.gallery), documents: arr<ProductDocument>(r.documents),
    productUrl: s(r.product_url), manufacturerUrl: s(r.manufacturer_url), datasheetUrl: s(r.datasheet_url), references: arr<ProductReference>(r.refs),
    editorialReview: s(r.editorial_review), editorialNotes: s(r.editorial_notes), reviewStatus: s(r.review_status) as ReviewStatus, status: s(r.status) as ProductStatus,
    seoTitle: s(r.seo_title), seoDescription: s(r.seo_description), origin: s(r.origin), version: n(r.version), createdAt: s(r.created_at), updatedAt: s(r.updated_at), publishedAt: sn(r.published_at),
    createdBy: sn(r.created_by),
  };
}

const LIST_COLUMNS = `p.id, p.num, p.slug, p.name, p.manufacturer, p.model_number, p.short_description, p.image_url, p.thumb_url, p.review_status, p.status, p.origin, p.created_at, p.updated_at,
  p.product_url, p.manufacturer_url, p.specs, p.applications, c.name AS category_name, c.slug AS category_slug`;

function toItem(r: Row): ProductListItem {
  const specs = arr<Spec>(r.specs);
  return {
    id: s(r.id), num: n(r.num), ref: productRef(n(r.num)), slug: s(r.slug), name: s(r.name), manufacturer: s(r.manufacturer), modelNumber: s(r.model_number), category: s(r.category_name), categorySlug: s(r.category_slug),
    shortDescription: s(r.short_description), imageUrl: s(r.image_url), thumbUrl: s(r.thumb_url), reviewStatus: s(r.review_status) as ReviewStatus, status: s(r.status) as ProductStatus, origin: s(r.origin),
    createdAt: s(r.created_at), updatedAt: s(r.updated_at), productUrl: s(r.product_url), manufacturerUrl: s(r.manufacturer_url),
    specCount: specs.length, keySpecs: specs.slice(0, 3), applications: arr<string>(r.applications).slice(0, 3),
  };
}

// ---------------------------------------------------------------- categories

export async function listProductCategories(opts: { publishedOnly?: boolean } = {}): Promise<ProductCategory[]> {
  const db = await conn();
  const rows = (
    await db.execute(
      `SELECT c.id, c.slug, c.name, c.description, COUNT(p.id) AS count FROM product_categories c
       LEFT JOIN products p ON p.category_id = c.id ${opts.publishedOnly ? "AND p.status = 'published'" : ""}
       GROUP BY c.id ORDER BY c.sort, c.name COLLATE NOCASE`,
    )
  ).rows;
  return rows.map((r) => ({ id: s(r.id), slug: s(r.slug), name: s(r.name), description: s(r.description), count: n(r.count) })).filter((c) => !opts.publishedOnly || c.count > 0);
}

/** The category with this name (any case), created when it does not exist yet. */
async function ensureCategory(db: Awaited<ReturnType<typeof conn>>, name: string, cache?: Map<string, string>): Promise<{ id: string; created: boolean }> {
  const key = name.trim().toLowerCase();
  const cached = cache?.get(key);
  if (cached) return { id: cached, created: false };
  const have = (await db.execute({ sql: "SELECT id FROM product_categories WHERE name = ? COLLATE NOCASE", args: [name.trim()] })).rows[0];
  if (have) {
    cache?.set(key, s(have.id));
    return { id: s(have.id), created: false };
  }
  const id = newId("pc_");
  let slug = slugify(name, 60) || "category";
  const taken = new Set((await db.execute({ sql: "SELECT slug FROM product_categories WHERE slug = ? OR slug LIKE ?", args: [slug, `${slug}-%`] })).rows.map((r) => s(r.slug)));
  for (let i = 2; taken.has(slug); i++) slug = `${slugify(name, 56)}-${i}`;
  const sort = n((await db.execute("SELECT COALESCE(MAX(sort), 0) + 10 AS x FROM product_categories")).rows[0].x);
  await db.execute({ sql: "INSERT INTO product_categories(id, slug, name, description, sort, created_at) VALUES (?, ?, ?, '', ?, ?)", args: [id, slug, name.trim(), sort, nowIso()] });
  cache?.set(key, id);
  return { id, created: true };
}

// ---------------------------------------------------------------- reading

const SORTS: Record<string, string> = {
  name: "p.name COLLATE NOCASE",
  manufacturer: "p.manufacturer COLLATE NOCASE",
  category: "c.name COLLATE NOCASE",
  model: "p.model_number COLLATE NOCASE",
  status: "p.status",
  review: "p.review_status",
  created: "p.created_at",
  updated: "p.updated_at",
  id: "p.num",
};

export type ListQuery = {
  q?: string;
  status?: ProductStatus | "";
  /** A category slug. */
  category?: string;
  /** Only the products this account created (what a contributor sees). */
  createdBy?: string;
  manufacturer?: string;
  review?: ReviewStatus | "";
  origin?: string;
  sort?: string;
  dir?: "asc" | "desc";
  page?: number;
  perPage?: number;
};

export type ProductPage = { items: ProductListItem[]; total: number; page: number; pageCount: number; perPage: number };

async function listWhere(q: ListQuery, publicOnly: boolean): Promise<{ where: string; args: (string | number)[] }> {
  const where: string[] = [];
  const args: (string | number)[] = [];
  if (publicOnly) where.push("p.status = 'published'");
  else if (q.status) {
    where.push("p.status = ?");
    args.push(q.status);
  }
  if (q.category) {
    where.push("c.slug = ?");
    args.push(q.category);
  }
  if (q.manufacturer) {
    where.push("p.manufacturer = ? COLLATE NOCASE");
    args.push(q.manufacturer);
  }
  if (q.review) {
    where.push("p.review_status = ?");
    args.push(q.review);
  }
  if (q.origin) {
    where.push("p.origin = ?");
    args.push(q.origin);
  }
  if (q.createdBy) {
    where.push("p.created_by = ?");
    args.push(q.createdBy);
  }
  for (const term of (q.q ?? "").trim().toLowerCase().split(/\s+/).filter(Boolean).slice(0, 6)) {
    where.push("p.search LIKE ? ESCAPE '\\'");
    args.push(likePattern(term.slice(0, 60)));
  }
  return { where: where.length ? `WHERE ${where.join(" AND ")}` : "", args };
}

async function page(q: ListQuery, publicOnly: boolean): Promise<ProductPage> {
  const db = await conn();
  const perPage = Math.min(Math.max(1, q.perPage ?? 50), 200);
  const { where, args } = await listWhere(q, publicOnly);
  const from = `FROM products p LEFT JOIN product_categories c ON c.id = p.category_id ${where}`;
  const total = n((await db.execute({ sql: `SELECT COUNT(*) AS c ${from}`, args })).rows[0].c);
  const pageCount = Math.max(1, Math.ceil(total / perPage));
  const at = Math.min(Math.max(1, Math.floor(q.page ?? 1) || 1), pageCount);
  const order = `${SORTS[q.sort ?? ""] ?? (publicOnly ? "p.name COLLATE NOCASE" : "p.num")} ${q.dir === "desc" ? "DESC" : "ASC"}, p.num ASC`;
  const rows = (await db.execute({ sql: `SELECT ${LIST_COLUMNS} ${from} ORDER BY ${order} LIMIT ? OFFSET ?`, args: [...args, perPage, (at - 1) * perPage] })).rows;
  return { items: rows.map(toItem), total, page: at, pageCount, perPage };
}

/** The public listing: published products only. */
export const listPublishedProducts = (q: ListQuery) => page({ ...q, status: "" }, true);
/** The Product Manager's listing: every status. */
export const listAllProducts = (q: ListQuery) => page(q, false);

export async function productStatusCounts(createdBy?: string): Promise<Record<ProductStatus | "all", number>> {
  const db = await conn();
  const rows = createdBy
    ? (await db.execute({ sql: "SELECT status, COUNT(*) AS c FROM products WHERE created_by = ? GROUP BY status", args: [createdBy] })).rows
    : (await db.execute("SELECT status, COUNT(*) AS c FROM products GROUP BY status")).rows;
  const out = { all: 0, draft: 0, under_review: 0, approved: 0, published: 0, archived: 0, rejected: 0 } as Record<ProductStatus | "all", number>;
  for (const r of rows) {
    out[s(r.status) as ProductStatus] = n(r.c);
    out.all += n(r.c);
  }
  return out;
}

export async function listManufacturers(opts: { publishedOnly?: boolean } = {}): Promise<{ name: string; count: number }[]> {
  const db = await conn();
  const rows = (await db.execute(`SELECT manufacturer, COUNT(*) AS c FROM products ${opts.publishedOnly ? "WHERE status = 'published'" : ""} GROUP BY manufacturer COLLATE NOCASE ORDER BY c DESC, manufacturer COLLATE NOCASE LIMIT 100`)).rows;
  return rows.map((r) => ({ name: s(r.manufacturer), count: n(r.c) })).filter((r) => r.name);
}

export async function getProduct(id: string): Promise<ProductRecord | null> {
  const db = await conn();
  const r = (await db.execute({ sql: `${FULL} WHERE p.id = ?`, args: [id] })).rows[0];
  return r ? toRecord(r) : null;
}

/** A published product by its address, or null. */
export async function getPublishedProduct(slug: string): Promise<ProductRecord | null> {
  const db = await conn();
  const r = (await db.execute({ sql: `${FULL} WHERE p.slug = ? AND p.status = 'published'`, args: [slug] })).rows[0];
  return r ? toRecord(r) : null;
}

/** The current address of a published product that used to have this one, or null. */
export async function findProductRedirect(oldSlug: string): Promise<string | null> {
  const db = await conn();
  const r = (await db.execute({ sql: "SELECT p.slug FROM product_redirects x JOIN products p ON p.id = x.product_id WHERE x.old_slug = ? AND p.status = 'published'", args: [oldSlug] })).rows[0];
  return r ? s(r.slug) : null;
}

/** Other published products in the same category, those of the same manufacturer first. */
export async function getRelatedProducts(p: Pick<ProductRecord, "id" | "categoryId" | "manufacturer">, limit = 4): Promise<ProductListItem[]> {
  if (!p.categoryId) return [];
  const db = await conn();
  const rows = (
    await db.execute({
      sql: `SELECT ${LIST_COLUMNS} FROM products p LEFT JOIN product_categories c ON c.id = p.category_id
            WHERE p.status = 'published' AND p.category_id = ? AND p.id <> ? ORDER BY (p.manufacturer = ? COLLATE NOCASE) DESC, p.name COLLATE NOCASE LIMIT ?`,
      args: [p.categoryId, p.id, p.manufacturer, limit],
    })
  ).rows;
  return rows.map(toItem);
}

export async function listProductSitemap(): Promise<{ slug: string; updatedAt: string }[]> {
  const db = await conn();
  // Only reviewed products are indexable (see isIndexableProduct), so only they are listed for search engines.
  return (await db.execute("SELECT slug, updated_at FROM products WHERE status = 'published' AND review_status = 'reviewed' ORDER BY num")).rows.map((r) => ({ slug: s(r.slug), updatedAt: s(r.updated_at) }));
}

// ---------------------------------------------------------------- writing

type Db = Awaited<ReturnType<typeof conn>>;

/** A free address for a product: the wished one, then -2, -3, ... Addresses of other products and addresses kept as redirects are taken. */
async function freeSlug(db: Db, wish: string, exceptId?: string): Promise<string> {
  const base = productSlug(wish).slice(0, 150);
  let slug = base;
  for (let i = 2; i < 500; i++) {
    const hit = (await db.execute({ sql: "SELECT id FROM products WHERE slug = ? AND id <> ? UNION SELECT product_id FROM product_redirects WHERE old_slug = ? AND product_id <> ?", args: [slug, exceptId ?? "", slug, exceptId ?? ""] })).rows[0];
    if (!hit) return slug;
    slug = `${base}-${i}`;
  }
  return `${base}-${newId().slice(0, 6).toLowerCase()}`;
}

const cols = (d: ProductData, categoryId: string) => ({
  category_id: categoryId,
  name: d.name,
  manufacturer: d.manufacturer,
  model_number: d.modelNumber,
  sku: d.sku,
  short_description: d.shortDescription,
  description: d.description,
  specs: JSON.stringify(d.specs),
  features: JSON.stringify(d.features),
  applications: JSON.stringify(d.applications),
  advantages: JSON.stringify(d.advantages),
  limitations: JSON.stringify(d.limitations),
  certifications: JSON.stringify(d.certifications),
  image_url: d.imageUrl,
  thumb_url: d.thumbUrl || d.imageUrl,
  gallery: JSON.stringify(d.gallery.filter((g) => g.url)),
  documents: JSON.stringify(d.documents.filter((x) => x.url)),
  product_url: d.productUrl,
  manufacturer_url: d.manufacturerUrl,
  datasheet_url: d.datasheetUrl,
  refs: JSON.stringify(d.references),
  editorial_review: d.editorialReview,
  editorial_notes: d.editorialNotes,
  review_status: d.reviewStatus,
  seo_title: d.seoTitle,
  seo_description: d.seoDescription,
  search: searchText({ ...d, category: d.category }),
});

export async function createProduct(actor: Viewer, input: ProductInput, opts: { status?: ProductStatus; origin?: string } = {}): Promise<ProductRecord> {
  writer(actor);
  const parsed = productInput.parse(input);
  // a contributor's product is a draft, and the editorial part is the owner's to write
  const owner = isOwner(actor);
  const d = owner ? parsed : { ...parsed, reviewStatus: "listed" as const, editorialReview: "", editorialNotes: "", advantages: [], limitations: [] };
  const db = await conn();
  const cat = await ensureCategory(db, d.category);
  const id = newId("pr_");
  const slug = await freeSlug(db, d.slug || productSlug(d.name, d.modelNumber));
  const status = owner ? (opts.status ?? "draft") : "draft";
  if (status === "published") {
    const problems = publishProblems(d);
    if (problems.length) throw new ProductError("invalid", "Not ready to publish.", problems);
  }
  const t = nowIso();
  const c = cols(d, cat.id);
  const keys = Object.keys(c);
  await db.execute({
    sql: `INSERT INTO products(id, num, slug, status, origin, created_at, updated_at, published_at, updated_by, created_by, ${keys.join(", ")})
          VALUES (?, (SELECT COALESCE(MAX(num), 0) + 1 FROM products), ?, ?, ?, ?, ?, ?, ?, ?, ${keys.map(() => "?").join(", ")})`,
    args: [id, slug, status, owner ? (opts.origin ?? "manual") : "manual", t, t, status === "published" ? t : null, actor.id, actor.id, ...Object.values(c)],
  });
  await audit(actor.id, "product.created", `${id} ${d.name}`);
  return (await getProduct(id))!;
}

/**
 * Saves a product's details. The address stays as it is (so the public URL never moves by accident) unless one is typed on
 * purpose, in which case the old address keeps redirecting. A save made from an out-of-date copy is refused.
 */
export async function updateProduct(actor: Viewer, id: string, input: ProductInput): Promise<ProductRecord> {
  writer(actor);
  const parsed = productInput.parse(input);
  const db = await conn();
  const cur = await getProduct(id);
  if (!cur) throw new ProductError("not_found", "Product not found.");
  ownDraft(actor, cur);
  // a contributor cannot change the editorial part: it keeps what the owner wrote
  const d = isOwner(actor) ? parsed : { ...parsed, reviewStatus: cur.reviewStatus, editorialReview: cur.editorialReview, editorialNotes: cur.editorialNotes, advantages: cur.advantages, limitations: cur.limitations };
  if (d.expectedVersion != null && d.expectedVersion !== cur.version) throw new ProductError("conflict", "This product was changed in the meantime. Reload to continue.");
  if (cur.status === "published") {
    const problems = publishProblems(d);
    if (problems.length) throw new ProductError("invalid", "A published product must keep its name, manufacturer, category and short description.", problems);
  }
  const cat = await ensureCategory(db, d.category);
  let slug = cur.slug;
  const wish = d.slug ? productSlug(d.slug) : "";
  if (wish && wish !== cur.slug) {
    slug = await freeSlug(db, wish, id);
    if (slug !== wish) throw new ProductError("conflict", `The address "${wish}" is already used by another product.`);
  }
  const c = cols(d, cat.id);
  const keys = Object.keys(c);
  const stmts: InStatement[] = [
    {
      sql: `UPDATE products SET slug = ?, ${keys.map((k) => `${k} = ?`).join(", ")}, version = version + 1, updated_at = ?, updated_by = ? WHERE id = ? AND version = ?`,
      args: [slug, ...Object.values(c), nowIso(), actor.id, id, cur.version],
    },
  ];
  if (slug !== cur.slug) {
    stmts.push({ sql: "DELETE FROM product_redirects WHERE old_slug = ?", args: [slug] }, { sql: "INSERT OR REPLACE INTO product_redirects(old_slug, product_id) VALUES (?, ?)", args: [cur.slug, id] });
  }
  const res = await db.batch(stmts, "write");
  if (!res[0].rowsAffected) throw new ProductError("conflict", "This product was changed in the meantime. Reload to continue.");
  await audit(actor.id, "product.updated", `${id} ${d.name}`);
  const after = (await getProduct(id))!;
  if (cur.reviewStatus !== "reviewed" && after.reviewStatus === "reviewed") await connectorProductReviewed(after);
  return after;
}

/** Moves a product along the publication workflow. The move must be one the workflow allows; publishing also needs the minimum content. */
export async function setProductStatus(actor: Viewer, id: string, to: ProductStatus): Promise<ProductRecord> {
  writer(actor);
  const cur = await getProduct(id);
  if (!cur) throw new ProductError("not_found", "Product not found.");
  // a contributor may only send their own draft for review; everything else is the owner's
  if (!isOwner(actor) && !(cur.createdBy === actor.id && cur.status === "draft" && to === "under_review")) throw new ProductError("forbidden", "You can only send your own draft for review. The owner approves and publishes.");
  if (cur.status === to) return cur;
  if (!canMove(cur.status, to)) throw new ProductError("invalid", `A ${cur.status.replace("_", " ")} product cannot become ${to.replace("_", " ")} directly.`);
  if (to === "published") {
    const problems = publishProblems({ name: cur.name, manufacturer: cur.manufacturer, category: cur.category, shortDescription: cur.shortDescription });
    if (problems.length) throw new ProductError("invalid", "Not ready to publish.", problems);
  }
  const db = await conn();
  const t = nowIso();
  await db.execute({
    sql: `UPDATE products SET status = ?, published_at = CASE WHEN ? = 'published' THEN COALESCE(published_at, ?) ELSE published_at END, version = version + 1, updated_at = ?, updated_by = ? WHERE id = ?`,
    args: [to, to, t, t, actor.id, id],
  });
  await audit(actor.id, `product.${to}`, `${id} ${cur.name}`);
  const after = (await getProduct(id))!;
  if (to === "published") await connectorProductPublished(after);
  return after;
}

/** Deletes a product for good, with its comments. Everything that is not a mistake should be archived instead. */
export async function deleteProduct(actor: Viewer, id: string): Promise<void> {
  manage(actor);
  const cur = await getProduct(id);
  if (!cur) throw new ProductError("not_found", "Product not found.");
  const db = await conn();
  await db.batch([{ sql: "DELETE FROM product_comments WHERE product_id = ?", args: [id] }, { sql: "DELETE FROM product_redirects WHERE product_id = ?", args: [id] }, { sql: "DELETE FROM products WHERE id = ?", args: [id] }], "write");
  await audit(actor.id, "product.deleted", `${id} ${cur.name}`);
}

export type BulkAction =
  | { type: "status"; status: ProductStatus }
  | { type: "category"; category: string }
  | { type: "review"; review: ReviewStatus }
  | { type: "delete" };

export type BulkResult = { done: number; failed: { id: string; ref: string; reason: string }[] };

/** One change applied to many products. A product the change does not apply to (a status move the workflow forbids, say) is reported, not skipped silently. */
export async function bulkUpdate(actor: Viewer, ids: string[], action: BulkAction): Promise<BulkResult> {
  manage(actor);
  if (!ids.length || ids.length > 500) throw new ProductError("invalid", "Choose between 1 and 500 products.");
  const db = await conn();
  const out: BulkResult = { done: 0, failed: [] };
  const catId = action.type === "category" ? (await ensureCategory(db, action.category)).id : null;
  for (const id of ids) {
    try {
      if (action.type === "status") await setProductStatus(actor, id, action.status);
      else if (action.type === "delete") await deleteProduct(actor, id);
      else if (action.type === "category") {
        await db.execute({ sql: "UPDATE products SET category_id = ?, search = ?, version = version + 1, updated_at = ?, updated_by = ? WHERE id = ?", args: [catId, "", nowIso(), actor.id, id] });
        const p = await getProduct(id);
        if (p) await db.execute({ sql: "UPDATE products SET search = ? WHERE id = ?", args: [searchText(p), id] });
      } else await db.execute({ sql: "UPDATE products SET review_status = ?, version = version + 1, updated_at = ?, updated_by = ? WHERE id = ?", args: [action.review, nowIso(), actor.id, id] });
      out.done++;
    } catch (e) {
      const p = await getProduct(id).catch(() => null);
      out.failed.push({ id, ref: p?.ref ?? id, reason: e instanceof ProductError ? e.message : "Could not be changed." });
    }
  }
  await audit(actor.id, `product.bulk.${action.type}`, `${out.done} done, ${out.failed.length} failed`);
  return out;
}

/** Inline edit of one table cell: only the fields the table shows. Everything goes through the same validation as the full form. */
export async function updateCell(actor: Viewer, id: string, field: "name" | "manufacturer" | "modelNumber" | "category" | "shortDescription" | "imageUrl" | "reviewStatus" | "productUrl" | "manufacturerUrl", value: string, expectedVersion: number): Promise<ProductRecord> {
  const cur = await getProduct(id);
  if (!cur) throw new ProductError("not_found", "Product not found.");
  const input: ProductInput = { ...cur, [field]: value, expectedVersion, slug: "" };
  return updateProduct(actor, id, input);
}

// ---------------------------------------------------------------- imports

export type ImportOptions = { onDuplicate: "skip" | "update"; filename?: string; source: "csv" | "paste" };

/**
 * Checks every row, and with `commit` writes them. The preview and the import share this one function, so the preview is exact.
 * A row is "added" (a new product), "updated" (it names an existing Product ID, or matches one and the rule says update),
 * "duplicate" (same product as an earlier row or an existing product, left out by the rule) or "error". Nothing is dropped silently.
 */
export async function runImport(actor: Viewer, records: ImportRecord[], opts: ImportOptions, commit: boolean): Promise<ImportSummary> {
  manage(actor);
  const db = await conn();
  const byNum = new Map((await db.execute("SELECT id, num FROM products")).rows.map((r) => [n(r.num), s(r.id)]));
  const byKey = new Map<string, string>();
  for (const r of (await db.execute("SELECT id, manufacturer, model_number, name FROM products")).rows) {
    byKey.set(duplicateKey({ name: s(r.name), manufacturer: s(r.manufacturer), modelNumber: s(r.model_number) }), s(r.id));
  }
  const knownCategories = new Map((await db.execute("SELECT id, name FROM product_categories")).rows.map((r) => [s(r.name).toLowerCase(), s(r.id)]));
  const newCategories = new Set<string>();
  const seenInFile = new Map<string, number>();
  const rows: RowReport[] = [];
  const summary: ImportSummary = { total: records.length, added: 0, updated: 0, skipped: 0, failed: 0, newCategories: [], rows };

  for (let i = 0; i < records.length; i++) {
    const rowNo = i + 1;
    const p = parseImportRecord(records[i]);
    const name = (records[i].name ?? "").slice(0, 80) || "(no name)";
    if (!p.ok) {
      rows.push({ row: rowNo, action: "error", name, errors: p.errors, warnings: [] });
      summary.failed++;
      continue;
    }
    const key = duplicateKey(p.data);
    const warnings = [...p.warnings];
    let existingId: string | null = null;
    if (p.productNum !== null) {
      existingId = byNum.get(p.productNum) ?? null;
      if (!existingId) {
        rows.push({ row: rowNo, action: "error", name, errors: [`product_id ${productRef(p.productNum)} does not exist. Leave it empty to add a new product.`], warnings });
        summary.failed++;
        continue;
      }
    } else if (seenInFile.has(key)) {
      rows.push({ row: rowNo, action: "duplicate", name, errors: [], warnings, note: `Same product as row ${seenInFile.get(key)} of this file.` });
      summary.skipped++;
      continue;
    } else if (byKey.has(key)) {
      if (opts.onDuplicate === "skip") {
        rows.push({ row: rowNo, action: "duplicate", name, errors: [], warnings, note: "Already in the catalogue (same manufacturer and model). Left unchanged." });
        summary.skipped++;
        continue;
      }
      existingId = byKey.get(key)!;
    }
    if (p.status === "published") {
      const problems = publishProblems(p.data);
      if (problems.length) {
        rows.push({ row: rowNo, action: "error", name, errors: ["Cannot be published as it is: " + problems.join(" ")], warnings });
        summary.failed++;
        continue;
      }
    }
    seenInFile.set(key, rowNo);
    if (!knownCategories.has(p.data.category.toLowerCase()) && !newCategories.has(p.data.category.toLowerCase())) {
      newCategories.add(p.data.category.toLowerCase());
      summary.newCategories.push(p.data.category);
      warnings.push(`New category: "${p.data.category}".`);
    }
    if (commit) {
      try {
        if (existingId) {
          const cur = (await getProduct(existingId))!;
          // a row updates the fields it fills; an empty cell leaves the product's value alone
          const rec = records[i];
          const merged: ProductInput = {
            ...cur,
            ...Object.fromEntries(Object.entries(p.data).filter(([k, v]) => (Array.isArray(v) ? v.length > 0 : v !== "") && k !== "reviewStatus")),
            reviewStatus: rec.review_status?.trim() ? p.data.reviewStatus : cur.reviewStatus,
            slug: "",
            expectedVersion: cur.version,
          };
          await updateProduct(actor, existingId, merged);
          if (rec.publication_status?.trim() && p.status !== cur.status) await setProductStatus(actor, existingId, p.status).catch((e) => warnings.push(`Status not changed: ${e instanceof ProductError ? e.message : "not allowed"}`));
          rows.push({ row: rowNo, action: "update", name, errors: [], warnings });
          summary.updated++;
        } else {
          const made = await createProduct(actor, p.data, { status: p.status, origin: "import" });
          byKey.set(key, made.id);
          knownCategories.set(p.data.category.toLowerCase(), made.categoryId ?? "");
          rows.push({ row: rowNo, action: "add", name, errors: [], warnings });
          summary.added++;
        }
      } catch (e) {
        rows.push({ row: rowNo, action: "error", name, errors: [e instanceof ProductError ? e.message : "Could not be saved."], warnings });
        summary.failed++;
      }
    } else {
      rows.push({ row: rowNo, action: existingId ? "update" : "add", name, errors: [], warnings });
      if (existingId) summary.updated++;
      else summary.added++;
    }
  }
  if (commit) {
    await db.execute({
      sql: `INSERT INTO product_imports(id, actor_id, actor_name, source, filename, rows_total, created, updated, skipped, failed, errors, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        newId("pi_"), actor.id, actor.name.slice(0, 80), opts.source, (opts.filename ?? "").slice(0, 200), summary.total, summary.added, summary.updated, summary.skipped, summary.failed,
        JSON.stringify(rows.filter((r) => r.action === "error" || r.action === "duplicate").slice(0, 200)), nowIso(),
      ],
    });
    await audit(actor.id, "product.import", `${summary.added} added, ${summary.updated} updated, ${summary.skipped} skipped, ${summary.failed} failed`);
  }
  return summary;
}

export type ImportHistoryItem = { id: string; actorName: string; source: string; filename: string; total: number; added: number; updated: number; skipped: number; failed: number; at: string; problems: RowReport[] };

export async function listImportHistory(limit = 15): Promise<ImportHistoryItem[]> {
  const db = await conn();
  return (await db.execute({ sql: "SELECT * FROM product_imports ORDER BY created_at DESC LIMIT ?", args: [limit] })).rows.map((r) => ({
    id: s(r.id), actorName: s(r.actor_name), source: s(r.source), filename: s(r.filename), total: n(r.rows_total), added: n(r.created), updated: n(r.updated), skipped: n(r.skipped), failed: n(r.failed), at: s(r.created_at),
    problems: json<RowReport[]>(r.errors, []),
  }));
}

// ---------------------------------------------------------------- the catalogue that existed before (data/products.json)

export type LegacyProduct = {
  id: string; slug: string; name: string; sku: string | null; modelCode: string | null; category: string; subcategory: string | null; manufacturer: string | null; supplier: string | null;
  shortDescription: string | null; description: string | null; specifications: Spec[]; imageUrl: string | null; datasheetUrl: string | null; sourceUrl: string | null;
  price: string | null; availability: string | null; originCountry: string | null; importSource: string; updatedAt: string; keywords: string[];
};

export type LegacyResult = { inserted: number; existing: number; published: number; archived: number; categories: number };

/**
 * Brings the catalogue that existed before the Product Manager into the database, once and without loss: every record is kept.
 * Records of `keepManufacturer` stay public (status published); every other record is archived, so it can be restored later.
 * Addresses are kept, so old links still work. A record that is already imported (by its old id) is left exactly as it is, which
 * makes the import safe to repeat. Fields the new platform does not show (price, supplier, availability, origin) are kept in legacy_data.
 */
export async function importLegacyCatalogue(records: LegacyProduct[], keepManufacturer: string, onProgress?: (done: number, total: number) => void): Promise<LegacyResult> {
  const db = await conn();
  const out: LegacyResult = { inserted: 0, existing: 0, published: 0, archived: 0, categories: 0 };
  const have = new Set((await db.execute("SELECT legacy_id FROM products WHERE legacy_id IS NOT NULL")).rows.map((r) => s(r.legacy_id)));
  const cache = new Map<string, string>();
  const slugs = new Set((await db.execute("SELECT slug FROM products")).rows.map((r) => s(r.slug)));
  let nextNum = n((await db.execute("SELECT COALESCE(MAX(num), 0) AS x FROM products")).rows[0].x);
  const t = nowIso();
  const batch: InStatement[] = [];
  const flush = async () => {
    if (batch.length) await db.batch(batch.splice(0), "write");
  };
  let i = 0;
  for (const r of records) {
    i++;
    if (have.has(r.id)) {
      out.existing++;
      continue;
    }
    const cat = await ensureCategory(db, r.category || "Uncategorised", cache);
    if (cat.created) out.categories++;
    const keep = (r.manufacturer ?? "").trim().toLowerCase() === keepManufacturer.trim().toLowerCase();
    const status: ProductStatus = keep ? "published" : "archived";
    let slug = r.slug || productSlug(r.name);
    for (let k = 2; slugs.has(slug); k++) slug = `${r.slug}-${k}`;
    slugs.add(slug);
    const short = r.shortDescription ?? "";
    const model = r.modelCode ?? "";
    nextNum++;
    batch.push({
      sql: `INSERT INTO products(id, num, slug, name, manufacturer, model_number, sku, category_id, short_description, description, specs, image_url, thumb_url, product_url, datasheet_url,
              review_status, status, origin, legacy_id, legacy_data, search, created_at, updated_at, published_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'listed', ?, 'legacy', ?, ?, ?, ?, ?, ?)`,
      args: [
        newId("pr_"), nextNum, slug, r.name, r.manufacturer ?? "", model, r.sku ?? "", cat.id, short, r.description && r.description !== short ? r.description : "", JSON.stringify(r.specifications ?? []),
        r.imageUrl ?? "", r.imageUrl ?? "", r.sourceUrl ?? "", r.datasheetUrl ?? "", status, r.id,
        JSON.stringify({ supplier: r.supplier, price: r.price, availability: r.availability, originCountry: r.originCountry, subcategory: r.subcategory, keywords: r.keywords, importSource: r.importSource, sourceUpdatedAt: r.updatedAt }),
        searchText({ name: r.name, manufacturer: r.manufacturer ?? "", modelNumber: model, sku: r.sku ?? "", category: r.category, shortDescription: short }), t, r.updatedAt || t, keep ? t : null,
      ],
    });
    out.inserted++;
    if (keep) out.published++;
    else out.archived++;
    if (batch.length >= 100) {
      await flush();
      onProgress?.(i, records.length);
    }
  }
  await flush();
  onProgress?.(records.length, records.length);
  return out;
}

// ---------------------------------------------------------------- the texts of the public Product page

export type ProductText = { title: string; body: string };
export type ProductTexts = { disclaimer: ProductText; invite: ProductText };

/** The starting texts, as set out in the brief. The owner can change them in the Product Manager. */
export const DEFAULT_TEXTS: ProductTexts = {
  disclaimer: {
    title: "About Our Product Reviews",
    body: `VierApparatus independently curates and reviews scientific equipment to help researchers and laboratory professionals make more informed decisions about the tools available to them. Our reviews examine product specifications, technical documentation, practical applications, and available scientific or professional feedback.

We aim to evaluate products using transparent criteria and information relevant to the scientific community. Product inclusion does not automatically constitute an endorsement, certification, or guarantee of performance. Readers should independently verify product specifications and suitability before making purchasing decisions.

Product listings may include manufacturer information and external references. Any commercial relationships or sponsored placements must be transparently disclosed.`,
  },
  invite: {
    title: "Want Your Scientific Equipment Reviewed?",
    body: `Are you a laboratory equipment manufacturer, supplier, distributor, or representative?

Submit your product for consideration by VierApparatus. Our editorial team will review the available technical documentation and evaluate whether it is suitable for inclusion on our platform.

Interested in listing your product?`,
  },
};

const TEXT_KEYS = { disclaimer: "product_disclaimer", invite: "product_invite" } as const;

export async function getProductTexts(): Promise<ProductTexts> {
  const db = await conn();
  const rows = (await db.execute({ sql: "SELECT key, value FROM settings WHERE key IN (?, ?)", args: [TEXT_KEYS.disclaimer, TEXT_KEYS.invite] })).rows;
  const read = (key: string, fallback: ProductText): ProductText => {
    const raw = rows.find((r) => s(r.key) === key);
    const v = raw ? json<Partial<ProductText>>(raw.value, {}) : {};
    return { title: typeof v.title === "string" && v.title.trim() ? v.title : fallback.title, body: typeof v.body === "string" && v.body.trim() ? v.body : fallback.body };
  };
  return { disclaimer: read(TEXT_KEYS.disclaimer, DEFAULT_TEXTS.disclaimer), invite: read(TEXT_KEYS.invite, DEFAULT_TEXTS.invite) };
}

export async function setProductTexts(actor: Viewer, texts: ProductTexts): Promise<void> {
  manage(actor);
  for (const k of ["disclaimer", "invite"] as const) {
    const t = texts[k];
    if (t.title.trim().length < 3 || t.body.trim().length < 20) throw new ProductError("invalid", "A title (3+ characters) and a text (20+ characters) are required for both boxes.");
    if (t.title.length > 160 || t.body.length > 5000) throw new ProductError("invalid", "The title is limited to 160 characters and the text to 5,000.");
  }
  const db = await conn();
  await db.batch(
    (["disclaimer", "invite"] as const).map((k) => ({
      sql: "INSERT INTO settings(key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value",
      args: [TEXT_KEYS[k], JSON.stringify({ title: texts[k].title.trim(), body: texts[k].body.replace(/\r\n?/g, "\n").trim() })],
    })),
    "write",
  );
  await audit(actor.id, "product.texts", "");
}

export { parseProductRef };

// ---------------------------------------------------------------- export

/** Full records for a CSV export of what the Product Manager is showing (at most 5,000), in the import template's columns. */
export async function exportProducts(q: ListQuery): Promise<ProductRecord[]> {
  const db = await conn();
  const { where, args } = await listWhere(q, false);
  const order = `${SORTS[q.sort ?? ""] ?? "p.num"} ${q.dir === "desc" ? "DESC" : "ASC"}, p.num ASC`;
  const rows = (await db.execute({ sql: `${FULL} ${where} ORDER BY ${order} LIMIT 5000`, args })).rows;
  return rows.map(toRecord);
}
