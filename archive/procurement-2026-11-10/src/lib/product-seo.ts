import type { Product } from "./product-types";
import { collapse, fitDescription, fitTitle, truncateAtWord } from "./seo";
import { site } from "./site";
import { categorySlug } from "./category";
import { getAllSummaries } from "./products";

/** Keyword qualifier appended to a product title when it fits in 60 characters. */
export function supplierTerm(name: string): string {
  const n = name.toLowerCase();
  return /centrifuge/.test(n) ? "Centrifuge Supplier"
    : /freezer|refrigerator|refrigeration/.test(n) ? "Laboratory Freezer Supplier"
    : /biosafety cabinet|biological safety cabinet/.test(n) ? "Biosafety Cabinet Supplier"
    : /autoclave|sterilizer|steriliser/.test(n) ? "Laboratory Autoclave Supplier"
    : /microscope/.test(n) ? "Laboratory Microscope Supplier"
    : /spectrophotometer/.test(n) ? "Spectrophotometer Supplier"
    : /incubator/.test(n) ? "Laboratory Incubator Supplier"
    : /pipette/.test(n) ? "Laboratory Pipette Supplier"
    : "Laboratory Equipment Supplier";
}

export function productTitle(p: Pick<Product, "name" | "modelCode"> & { sku?: string | null }): string {
  return fitTitle(p.name, { qualifier: supplierTerm(p.name), keep: p.sku ?? p.modelCode });
}

/**
 * Catalogue "short descriptions" are sometimes raw data-sheet runs ("Formula: H3NM: 17.03 g/molCAS-No.: 1336-21-6...").
 * They read badly as a search snippet, so those fall back to a clean sentence built from name, brand and category.
 */
export const looksLikeDataSheet = (text: string) => (text.match(/:/g) ?? []).length >= 3 || /\S{40,}/.test(text);

let sharedCounts: Map<string, number> | null = null;
/** How many catalogue products carry exactly this short description (variants of one family often share it). */
function sharedDescriptionCount(text: string): number {
  if (!sharedCounts) {
    sharedCounts = new Map();
    for (const s of getAllSummaries()) if (s.shortDescription) sharedCounts.set(s.shortDescription, (sharedCounts.get(s.shortDescription) ?? 0) + 1);
  }
  return sharedCounts.get(text) ?? 0;
}

export function productDescription(p: Pick<Product, "name" | "manufacturer" | "category" | "shortDescription">): string {
  const generated = `${p.name}${p.manufacturer ? ` from ${p.manufacturer}` : ""}, listed under ${p.category.toLowerCase()}.`;
  const usable = p.shortDescription && !looksLikeDataSheet(p.shortDescription) ? p.shortDescription : null;
  // When several products share one description, lead with the product name so each page's snippet is distinct.
  const primary = !usable ? generated : sharedDescriptionCount(usable) > 1 ? `${p.name}: ${usable}` : usable;
  return fitDescription(primary);
}

/** Placeholder artwork must not be presented to search engines as the product photo. */
export const isPlaceholderImage = (url: string | null) => !url || /placeholder/i.test(url);
export const productImage = (p: Pick<Product, "imageUrl">): string | null => (isPlaceholderImage(p.imageUrl) ? null : p.imageUrl);

const SYMBOL_CODES: Record<string, string> = { "€": "EUR", "£": "GBP", "US$": "USD" };


/** "1,250.50" / "1.250,50" / "1,250" / "12,50" -> "1250.50" etc. Returns null when the separators are ambiguous ("1.250"). */
function normaliseAmount(s: string): string | null {
  const lastComma = s.lastIndexOf(",");
  const lastDot = s.lastIndexOf(".");
  if (lastComma > -1 && lastDot > -1) {
    const decimal = lastComma > lastDot ? "," : ".";
    const thousands = decimal === "," ? "." : ",";
    return s.split(thousands).join("").replace(decimal, ".");
  }
  if (lastComma > -1) {
    const parts = s.split(",");
    return parts.length > 2 || parts[1].length === 3 ? parts.join("") : s.replace(",", ".");
  }
  if (lastDot > -1) {
    const parts = s.split(".");
    if (parts.length > 2) return parts.join("");
    return parts[1].length === 3 ? null : s;
  }
  return s;
}

/**
 * Parse a price such as "USD 1,250.50", "1250 EUR", "€1.250,50". Returns null unless BOTH an unambiguous
 * currency (ISO 4217 code, €, £, US$) and an amount are present. A bare "$" is ambiguous, so it is rejected.
 */
export function parsePrice(raw: string | null): { price: string; currency: string } | null {
  if (!raw) return null;
  const s = collapse(raw);
  const m =
    s.match(/^(?:(US\$|€|£|[A-Z]{3})\s*)?(\d[\d.,\s]*)(?:\s*([A-Z]{3}|€|£))?$/);
  if (!m) return null;
  const currency = SYMBOL_CODES[m[1] ?? ""] ?? (m[1] && /^[A-Z]{3}$/.test(m[1]) ? m[1] : null) ?? SYMBOL_CODES[m[3] ?? ""] ?? (m[3] && /^[A-Z]{3}$/.test(m[3]) ? m[3] : null);
  if (!currency) return null;
  const num = normaliseAmount(m[2].replace(/\s/g, ""));
  if (num === null) return null;
  const value = Number(num);
  if (!Number.isFinite(value) || value <= 0) return null;
  return { price: value.toFixed(2), currency };
}

const AVAILABILITY: [RegExp, string][] = [
  [/out of stock|sold out|unavailable/i, "https://schema.org/OutOfStock"],
  [/pre-?order/i, "https://schema.org/PreOrder"],
  [/limited/i, "https://schema.org/LimitedAvailability"],
  [/discontinued/i, "https://schema.org/Discontinued"],
  [/in stock|available/i, "https://schema.org/InStock"],
];
export const schemaAvailability = (raw: string | null) => (raw ? AVAILABILITY.find(([re]) => re.test(raw))?.[1] ?? null : null);

export const productUrl = (slug: string) => `${site.url}/products/${slug}`;

/**
 * Product JSON-LD. Every value mirrors what the page shows. `offers` is emitted ONLY when the catalogue holds a real,
 * parseable price: Google requires markup to match visible content, and the pages say "Price on request" otherwise.
 */
export function productJsonLd(p: Product): Record<string, unknown> {
  const image = productImage(p);
  const price = parsePrice(p.price);
  const availability = schemaAvailability(p.availability);
  const description = p.description ? truncateAtWord(p.description.replace(/^Introduction:?\s*/i, ""), 1000, "") : null;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${productUrl(p.slug)}#product`,
    name: collapse(p.name),
    url: productUrl(p.slug),
    ...(image ? { image: [image] } : {}),
    ...(description ? { description } : {}),
    sku: p.sku ?? p.modelCode ?? p.id,
    ...(p.modelCode ? { mpn: p.modelCode } : {}),
    ...(p.manufacturer ? { brand: { "@type": "Brand", name: p.manufacturer } } : {}),
    category: p.category,
    ...(p.originCountry ? { countryOfOrigin: p.originCountry } : {}),
    ...(p.specifications.length
      ? { additionalProperty: p.specifications.slice(0, 20).map((s) => ({ "@type": "PropertyValue", name: s.label, value: s.value })) }
      : {}),
    ...(price
      ? {
          offers: {
            "@type": "Offer",
            url: productUrl(p.slug),
            price: price.price,
            priceCurrency: price.currency,
            ...(availability ? { availability } : {}),
            seller: { "@type": "Organization", name: site.name },
          },
        }
      : {}),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${site.url}${it.path}` })),
  };
}

export const categoryPath = (category: string) => `/products/category/${categorySlug(category)}`;
