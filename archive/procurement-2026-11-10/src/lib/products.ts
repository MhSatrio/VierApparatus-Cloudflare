import index from "../../data/products-index.json";
import full from "../../data/products.json";
import type { Product, ProductSummary } from "./product-types";
import { categorySlug } from "./category";

export const PRODUCTS_PER_PAGE = 24;

const summaries = index as ProductSummary[];
const allProducts = full as Product[];

// Built once per process: O(1) slug lookup (10k pages x a linear scan was 100M comparisons per build).
const bySlug = new Map<string, Product>(allProducts.map((p) => [p.slug, p]));

// Products grouped by category in catalogue (name) order, and each product's position inside its group.
const byCategory = new Map<string, ProductSummary[]>();
const positionInCategory = new Map<string, number>();
for (const p of summaries) {
  const list = byCategory.get(p.category) ?? [];
  positionInCategory.set(p.id, list.length);
  list.push(p);
  byCategory.set(p.category, list);
}

export type ProductQuery = { q?: string; category?: string; sort?: string; page?: number };
export type ProductPage = {
  items: ProductSummary[];
  total: number;
  page: number;
  pageCount: number;
  query: Required<Pick<ProductQuery, "q" | "category" | "sort">>;
};

export const SORTS = [
  { value: "name-asc", label: "Name A–Z" },
  { value: "name-desc", label: "Name Z–A" },
  { value: "category", label: "Category" },
] as const;

export function getCategories(): { name: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const p of summaries) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
  return [...counts.entries()].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
}

export function queryProducts(input: ProductQuery): ProductPage {
  const q = (input.q ?? "").trim().slice(0, 100).toLowerCase();
  const category = (input.category ?? "").slice(0, 100);
  const sort = SORTS.some((s) => s.value === input.sort) ? (input.sort as string) : "name-asc";
  const terms = q.split(/\s+/).filter(Boolean);

  let list = summaries.filter(
    (p) => (!category || p.category === category) && terms.every((t) => p.search.includes(t)),
  );
  if (sort === "name-desc") list = [...list].sort((a, b) => b.name.localeCompare(a.name));
  else if (sort === "category") list = [...list].sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
  // name-asc is the stored order

  const total = list.length;
  const pageCount = Math.max(1, Math.ceil(total / PRODUCTS_PER_PAGE));
  const page = Math.min(Math.max(1, Math.floor(input.page ?? 1) || 1), pageCount);
  const items = list.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE);
  return { items, total, page, pageCount, query: { q, category, sort } };
}

export function getProductBySlug(slug: string): Product | undefined {
  const p = bySlug.get(slug);
  return p && p.status === "published" ? p : undefined;
}

export type CategoryInfo = { name: string; slug: string; count: number; pageCount: number };

export function getCategoryInfos(): CategoryInfo[] {
  return getCategories().map((c) => ({
    ...c,
    slug: categorySlug(c.name),
    pageCount: Math.max(1, Math.ceil(c.count / PRODUCTS_PER_PAGE)),
  }));
}

export const getCategoryBySlug = (slug: string) => getCategoryInfos().find((c) => c.slug === slug);

/** One page of a category's products (static category hub pages: /products/category/<slug>[/<page>]). */
export function getCategoryPage(name: string, page: number): { items: ProductSummary[]; total: number; pageCount: number } {
  const list = byCategory.get(name) ?? [];
  const pageCount = Math.max(1, Math.ceil(list.length / PRODUCTS_PER_PAGE));
  return { items: list.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE), total: list.length, pageCount };
}

export function getAllProductSlugs(): { slug: string; updatedAt: string }[] {
  return allProducts.filter((p) => p.status === "published").map((p) => ({ slug: p.slug, updatedAt: p.updatedAt }));
}

/**
 * Related products = the neighbours of this product in its category list (half before, half after, wrapping around).
 * Every product therefore receives a real <a href> from `limit` other product pages and no product can be an orphan,
 * unlike "first N of the category" which linked only the same few products from every page.
 */
export function getRelatedProducts(product: Pick<Product, "id" | "category">, limit = 6): ProductSummary[] {
  const list = byCategory.get(product.category) ?? [];
  const pos = positionInCategory.get(product.id);
  if (pos === undefined || list.length < 2) return [];
  if (list.length - 1 <= limit) return list.filter((p) => p.id !== product.id);
  const before = Math.floor(limit / 2);
  const after = limit - before;
  const at = (offset: number) => list[(pos + offset + list.length) % list.length];
  const out: ProductSummary[] = [];
  for (let i = before; i >= 1; i--) out.push(at(-i));
  for (let i = 1; i <= after; i++) out.push(at(i));
  return out;
}

/** Deterministic featured selection: first N published products with an image, spread over categories. */
export function getFeaturedProducts(limit = 4): ProductSummary[] {
  const seen = new Set<string>();
  const out: ProductSummary[] = [];
  const preferred = ["Centrifuges", "Biosafety & Clean Air", "Incubators, Ovens & Baths", "Analytical Instruments"];
  for (const cat of preferred) {
    const hit = summaries.find((p) => p.category === cat && p.imageUrl && !seen.has(p.id));
    if (hit) { out.push(hit); seen.add(hit.id); }
  }
  for (const p of summaries) {
    if (out.length >= limit) break;
    if (p.imageUrl && !seen.has(p.id)) { out.push(p); seen.add(p.id); }
  }
  return out.slice(0, limit);
}

export const productCount = () => summaries.length;

/** All published product summaries (catalogue order). Used by the HTML sitemap. */
export const getAllSummaries = (): ProductSummary[] => summaries;
