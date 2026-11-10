import { getAllSummaries } from "./products";
import type { ProductSummary } from "./product-types";

/** Links per HTML-sitemap page. Keeps each page well below the ~3,000-links "too many links" threshold. */
export const HTML_SITEMAP_PAGE_SIZE = 500;

/** Catalogue sorted by name (A-Z) so every directory page covers a readable range. */
const sorted = (): ProductSummary[] => [...getAllSummaries()].sort((a, b) => a.name.localeCompare(b.name) || a.id.localeCompare(b.id));

export function htmlSitemapPages(): { number: number; label: string }[] {
  const list = sorted();
  const count = Math.max(1, Math.ceil(list.length / HTML_SITEMAP_PAGE_SIZE));
  const short = (s: string) => s.slice(0, 14).trim();
  return Array.from({ length: count }, (_, i) => {
    const first = list[i * HTML_SITEMAP_PAGE_SIZE];
    const last = list[Math.min((i + 1) * HTML_SITEMAP_PAGE_SIZE, list.length) - 1];
    return { number: i + 1, label: `${short(first.name)}… – ${short(last.name)}…` };
  });
}

export function htmlSitemapSlice(page: number): ProductSummary[] {
  return sorted().slice((page - 1) * HTML_SITEMAP_PAGE_SIZE, page * HTML_SITEMAP_PAGE_SIZE);
}
