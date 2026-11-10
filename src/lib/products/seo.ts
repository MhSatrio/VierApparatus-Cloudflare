import { fitDescription, fitTitle } from "../seo";
import { site } from "../site";
import { productHref, type ProductRecord } from "./shared";
import type { RatingSummary } from "../store/product-comments";

/** The page title: the editor's own when given, else the name, keeping the model number when the name has to be shortened. */
export const productTitle = (p: Pick<ProductRecord, "name" | "seoTitle" | "modelNumber">) => fitTitle(p.seoTitle || p.name, { keep: p.modelNumber || null, qualifier: "Review" });

/** The meta description: the editor's own, else the short description with the manufacturer, padded or trimmed into the search-result window. */
export function productDescription(p: Pick<ProductRecord, "name" | "manufacturer" | "category" | "shortDescription" | "seoDescription">): string {
  if (p.seoDescription) return fitDescription(p.seoDescription);
  const lead = [p.name, p.manufacturer && `by ${p.manufacturer}`].filter(Boolean).join(" ");
  const first = p.shortDescription ? `${lead}: ${p.shortDescription}` : `${lead}${p.category ? ` (${p.category})` : ""}.`;
  return fitDescription(first);
}

/**
 * Structured data for a product page. It describes the product (name, brand, model, category, image) and nothing that is not on the
 * page: no price or offer (there is none), and a rating only when the page itself shows one, which needs enough approved ratings.
 */
export function productJsonLd(p: ProductRecord, rating?: RatingSummary | null) {
  const ld: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    url: `${site.url}${productHref(p.slug)}`,
    ...(p.manufacturer ? { brand: { "@type": "Brand", name: p.manufacturer } } : {}),
    ...(p.modelNumber ? { model: p.modelNumber } : {}),
    ...(p.sku ? { sku: p.sku } : {}),
    ...(p.category ? { category: p.category } : {}),
    ...(p.shortDescription ? { description: p.shortDescription } : {}),
    ...(p.imageUrl && /^https:\/\//.test(p.imageUrl) ? { image: [p.imageUrl] } : {}),
  };
  if (rating && rating.average !== null) ld.aggregateRating = { "@type": "AggregateRating", ratingValue: rating.average, ratingCount: rating.ratedCount, bestRating: 5, worstRating: 1 };
  return ld;
}
