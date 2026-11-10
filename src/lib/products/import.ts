import { z } from "zod";
import { productInput, PRODUCT_STATUSES, REVIEW_STATUSES, type ProductData, type ProductStatus, type Spec } from "./shared";

/**
 * One imported row -> a validated product. Pure: the same code runs for the preview and for the commit, so what the preview
 * promises is what the import does. Nothing is skipped silently: a row that cannot be used comes back with its reasons.
 */

export type ImportRecord = Record<string, string>;

const items = (v: string | undefined): string[] =>
  (v ?? "")
    .split(/\r?\n|\|/)
    .map((x) => x.trim())
    .filter(Boolean);

/** "Label: Value | Label: Value" (or one per line) -> specifications. An item without a colon is reported by the caller. */
function parseSpecs(v: string | undefined): { specs: Spec[]; bad: string[] } {
  const specs: Spec[] = [];
  const bad: string[] = [];
  for (const line of items(v)) {
    const i = line.indexOf(":");
    if (i > 0 && i < line.length - 1) specs.push({ label: line.slice(0, i).trim(), value: line.slice(i + 1).trim() });
    else bad.push(line);
  }
  return { specs, bad };
}

const norm = (s: string) => s.toLowerCase().replace(/[\s-]+/g, "_");

/** The first Product ID in "P-00012" form (or its number), as a number; otherwise null. */
export const parseProductRef = (v: string | undefined): number | null => {
  const m = /^\s*(?:P[-\s]?)?0*(\d{1,9})\s*$/i.exec(v ?? "");
  return m ? Number(m[1]) : null;
};

export type ParsedRow =
  | { ok: true; productNum: number | null; data: ProductData; status: ProductStatus; warnings: string[] }
  | { ok: false; errors: string[] };

export function parseImportRecord(rec: ImportRecord): ParsedRow {
  const errors: string[] = [];
  const warnings: string[] = [];

  const idText = (rec.product_id ?? "").trim();
  const productNum = idText ? parseProductRef(idText) : null;
  if (idText && productNum === null) errors.push(`product_id "${idText.slice(0, 30)}" is not a Product ID (it looks like P-00012).`);

  const review = norm(rec.review_status ?? "") || "listed";
  if (!(REVIEW_STATUSES as readonly string[]).includes(review)) errors.push(`review_status "${(rec.review_status ?? "").slice(0, 30)}" is not one of: ${REVIEW_STATUSES.join(", ")}.`);
  const statusText = norm(rec.publication_status ?? "") || "draft";
  if (!(PRODUCT_STATUSES as readonly string[]).includes(statusText)) errors.push(`publication_status "${(rec.publication_status ?? "").slice(0, 30)}" is not one of: ${PRODUCT_STATUSES.join(", ")}.`);

  const { specs, bad } = parseSpecs(rec.technical_specifications);
  if (bad.length) errors.push(`technical_specifications: "${bad[0].slice(0, 40)}" is not written as Label: Value.`);

  const parsed = productInput.safeParse({
    name: rec.name ?? "",
    manufacturer: rec.manufacturer ?? "",
    category: rec.category ?? "",
    modelNumber: rec.model_number ?? "",
    sku: rec.sku ?? "",
    shortDescription: rec.short_description ?? "",
    description: rec.description ?? "",
    specs,
    features: items(rec.key_features),
    applications: items(rec.applications),
    advantages: items(rec.advantages),
    limitations: items(rec.limitations),
    certifications: items(rec.certifications),
    imageUrl: rec.image_url ?? "",
    productUrl: rec.product_url ?? "",
    manufacturerUrl: rec.manufacturer_url ?? "",
    datasheetUrl: rec.datasheet_url ?? "",
    reviewStatus: (REVIEW_STATUSES as readonly string[]).includes(review) ? review : "listed",
    seoTitle: rec.seo_title ?? "",
    seoDescription: rec.seo_description ?? "",
    editorialNotes: rec.editorial_notes ?? "",
  });
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      const field = String(issue.path[0] ?? "row");
      errors.push(`${field}: ${issue.message}`);
    }
  }
  if (errors.length || !parsed.success) return { ok: false, errors };
  if (!rec.short_description?.trim()) warnings.push("No short description: the product cannot be published until it has one.");
  return { ok: true, productNum, data: parsed.data, status: statusText as ProductStatus, warnings };
}

/** The keys of a row that mean "the same product", for finding duplicates inside a file and against the catalogue. */
export const duplicateKey = (d: Pick<ProductData, "name" | "manufacturer" | "modelNumber">) => [d.manufacturer, d.modelNumber || d.name].map((x) => x.toLowerCase().replace(/[^a-z0-9]+/g, "")).join("|");

export type RowReport = {
  row: number;
  /** "add": a new product. "update": changes an existing one. "duplicate": the same product as an earlier row or an existing product, left out by the chosen rule. "error": cannot be imported. */
  action: "add" | "update" | "duplicate" | "error";
  name: string;
  errors: string[];
  warnings: string[];
  note?: string;
};

export const importRequest = z.object({
  mode: z.enum(["preview", "commit"]),
  /** What to do with a row that matches an existing product that it does not name by Product ID: leave it, or update it. */
  onDuplicate: z.enum(["skip", "update"]).default("skip"),
  filename: z.string().max(200).default(""),
  source: z.enum(["csv", "paste"]).default("csv"),
  records: z.array(z.record(z.string(), z.string().max(20_000))).min(1, "There are no rows to import.").max(2000, "Import at most 2,000 rows at a time."),
});
export type ImportRequest = z.infer<typeof importRequest>;
export type ImportSummary = { total: number; added: number; updated: number; skipped: number; failed: number; newCategories: string[]; rows: RowReport[] };
export type { ProductData };
