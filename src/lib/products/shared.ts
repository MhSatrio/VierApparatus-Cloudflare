import { z } from "zod";

/**
 * Product vocabulary, types and validation, shared by the server store and the browser screens. It imports nothing from the
 * database layer.
 *
 * The product section is a review and curation platform, not a shop: there are no prices, no cart and no purchase links. A
 * product page keeps three kinds of statement apart: what the MANUFACTURER says (specifications, features, links), what the
 * VierApparatus EDITORS assess (advantages, limitations, review), and what READERS say (moderated comments).
 */

// ---------------------------------------------------------------- statuses

export const PRODUCT_STATUSES = ["draft", "under_review", "approved", "published", "archived", "rejected"] as const;
export type ProductStatus = (typeof PRODUCT_STATUSES)[number];
export const PRODUCT_STATUS_LABEL: Record<ProductStatus, string> = {
  draft: "Draft",
  under_review: "Under review",
  approved: "Approved",
  published: "Published",
  archived: "Archived",
  rejected: "Rejected",
};

/**
 * The publication workflow: Draft -> Under review -> Approved -> Published. A published product can be taken back to Approved
 * (unpublished) or archived; archived and rejected products return to Draft. Any product can be archived. The server enforces this.
 */
export const NEXT_STATUSES: Record<ProductStatus, ProductStatus[]> = {
  draft: ["under_review", "archived"],
  under_review: ["approved", "rejected", "draft", "archived"],
  approved: ["published", "under_review", "draft", "archived"],
  published: ["approved", "archived"],
  archived: ["draft"],
  rejected: ["draft", "archived"],
};
export const canMove = (from: ProductStatus, to: ProductStatus) => NEXT_STATUSES[from].includes(to);

/** What the page says about the editorial work on a product. It never implies more than has been done. */
export const REVIEW_STATUSES = ["listed", "in_review", "reviewed"] as const;
export type ReviewStatus = (typeof REVIEW_STATUSES)[number];
export const REVIEW_STATUS_LABEL: Record<ReviewStatus, string> = {
  listed: "Listed: manufacturer information, not yet reviewed",
  in_review: "Review in progress",
  reviewed: "Editorially reviewed",
};
export const REVIEW_STATUS_SHORT: Record<ReviewStatus, string> = { listed: "Listed, not reviewed", in_review: "Review in progress", reviewed: "Reviewed" };

/** Comments are averaged into a rating only when there are at least this many approved, rated ones. */
export const MIN_RATINGS_FOR_SCORE = 3;

export const productRef = (num: number) => `P-${String(num).padStart(5, "0")}`;
export const productHref = (slug: string) => `/products/${slug}`;

// ---------------------------------------------------------------- shapes

export type Spec = { label: string; value: string };
export type GalleryImage = { url: string; thumbUrl: string; alt: string; kind: "image" | "diagram" };
export type ProductDocument = { label: string; url: string };
export type ProductReference = { text: string; url: string };

export type ProductRecord = {
  id: string;
  num: number;
  ref: string;
  slug: string;
  name: string;
  manufacturer: string;
  modelNumber: string;
  sku: string;
  categoryId: string | null;
  category: string;
  categorySlug: string;
  shortDescription: string;
  description: string;
  specs: Spec[];
  features: string[];
  applications: string[];
  advantages: string[];
  limitations: string[];
  certifications: string[];
  imageUrl: string;
  thumbUrl: string;
  gallery: GalleryImage[];
  documents: ProductDocument[];
  productUrl: string;
  manufacturerUrl: string;
  datasheetUrl: string;
  references: ProductReference[];
  editorialReview: string;
  editorialNotes: string;
  reviewStatus: ReviewStatus;
  status: ProductStatus;
  seoTitle: string;
  seoDescription: string;
  origin: string;
  version: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  /** The account that added the product (a contributor's own products are the ones they can edit). Null for imported records. */
  createdBy: string | null;
};

/** What a table row or a card needs: no long texts. */
export type ProductListItem = Pick<
  ProductRecord,
  "id" | "num" | "ref" | "slug" | "name" | "manufacturer" | "modelNumber" | "category" | "categorySlug" | "shortDescription" | "imageUrl" | "thumbUrl" | "reviewStatus" | "status" | "origin" | "createdAt" | "updatedAt" | "productUrl" | "manufacturerUrl"
> & { specCount: number; keySpecs: Spec[]; applications: string[] };

export type ProductCategory = { id: string; slug: string; name: string; description: string; count: number };

// ---------------------------------------------------------------- validation

/** A web address a visitor may follow: http or https, nothing else (no javascript:, data:, mailto:). Empty is allowed. */
const webUrl = z
  .string()
  .trim()
  .max(1000)
  .refine((v) => {
    if (!v) return true;
    try {
      const u = new URL(v);
      return u.protocol === "https:" || u.protocol === "http:";
    } catch {
      return false;
    }
  }, "Use a full web address starting with https://")
  .default("");

/** An image address: our own /media path or https. Empty is allowed. */
const imageSrc = z
  .string()
  .trim()
  .max(1000)
  .refine((v) => !v || (v.startsWith("/") && !v.startsWith("//")) || /^https:\/\//i.test(v), "Use an uploaded image or an https:// address")
  .default("");

const list = (max: number, len = 300) => z.array(z.string().trim().min(1).max(len)).max(max).default([]);

export const productInput = z.object({
  name: z.string().trim().min(2, "Give the product a name (2+ characters)").max(250),
  /** Only used to change the address of an existing product on purpose. Empty: made from the name when created, kept when edited. */
  slug: z.string().trim().max(160).default(""),
  manufacturer: z.string().trim().min(1, "Name the manufacturer or brand").max(150),
  modelNumber: z.string().trim().max(120).default(""),
  sku: z.string().trim().max(100).default(""),
  /** The category by name. A name that does not exist yet creates the category. */
  category: z.string().trim().min(1, "Choose or type a category").max(120),
  shortDescription: z.string().trim().max(400).default(""),
  description: z.string().trim().max(8000).default(""),
  specs: z.array(z.object({ label: z.string().trim().min(1).max(120), value: z.string().trim().min(1).max(500) })).max(100).default([]),
  features: list(40),
  applications: list(40),
  advantages: list(30),
  limitations: list(30),
  certifications: list(30),
  imageUrl: imageSrc,
  thumbUrl: imageSrc,
  gallery: z.array(z.object({ url: imageSrc, thumbUrl: imageSrc, alt: z.string().trim().max(300).default(""), kind: z.enum(["image", "diagram"]).default("image") })).max(20).default([]),
  documents: z.array(z.object({ label: z.string().trim().min(1).max(160), url: webUrl })).max(20).default([]),
  productUrl: webUrl,
  manufacturerUrl: webUrl,
  datasheetUrl: webUrl,
  references: z.array(z.object({ text: z.string().trim().min(5).max(500), url: webUrl })).max(20).default([]),
  editorialReview: z.string().trim().max(20_000).default(""),
  editorialNotes: z.string().trim().max(5_000).default(""),
  reviewStatus: z.enum(REVIEW_STATUSES).default("listed"),
  seoTitle: z.string().trim().max(70).default(""),
  seoDescription: z.string().trim().max(200).default(""),
  expectedVersion: z.number().int().optional(),
});
export type ProductInput = z.input<typeof productInput>;
export type ProductData = z.output<typeof productInput>;

/** Why a product cannot be published yet. Empty means it can. The rules are minimal: a public entry must at least say what it is. */
export function publishProblems(p: Pick<ProductData, "name" | "manufacturer" | "category" | "shortDescription">): string[] {
  const out: string[] = [];
  if (!p.name.trim()) out.push("The product needs a name.");
  if (!p.manufacturer.trim()) out.push("Name the manufacturer or brand.");
  if (!p.category.trim()) out.push("Choose a category.");
  if (!p.shortDescription.trim()) out.push("Write a short description (one or two sentences about what the product is).");
  return out;
}

/** The text searched for a product: everything a person might type, in lower case. */
export const searchText = (p: { name: string; manufacturer: string; modelNumber: string; sku: string; category: string; shortDescription: string }) =>
  [p.name, p.manufacturer, p.modelNumber, p.sku, p.category, p.shortDescription].join(" ").toLowerCase().replace(/\s+/g, " ").trim().slice(0, 1200);

/** A readable address: the name, and the model when the name does not already contain it. */
export function productSlug(name: string, modelNumber = ""): string {
  const base = (modelNumber && !name.toLowerCase().includes(modelNumber.toLowerCase()) ? `${name} ${modelNumber}` : name)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120)
    .replace(/-+$/, "");
  return base || "product";
}

/** One line per item to a list, and back. Used by the editor's text areas. */
export const toLines = (items: string[]) => items.join("\n");
export const fromLines = (text: string) => text.split(/\r?\n/).map((x) => x.trim()).filter(Boolean);
export const specsToText = (specs: Spec[]) => specs.map((s) => `${s.label}: ${s.value}`).join("\n");
export function specsFromText(text: string): Spec[] {
  const out: Spec[] = [];
  for (const line of fromLines(text)) {
    const i = line.indexOf(":");
    if (i > 0 && i < line.length - 1) out.push({ label: line.slice(0, i).trim(), value: line.slice(i + 1).trim() });
  }
  return out;
}
