import { createHash } from "node:crypto";
import Papa from "papaparse";
import { z } from "zod";
import type { Product } from "../product-types";

export const mappingSchema = z.object({
  defaults: z.object({
    supplier: z.string().optional(),
    manufacturer: z.string().optional(),
    importSource: z.string().optional(),
  }),
  columns: z.record(z.string(), z.array(z.string())),
  ignoredColumns: z.array(z.string()).default([]),
  categoryRules: z.array(z.object({ category: z.string(), match: z.array(z.string()) })),
  defaultCategory: z.string(),
});
export type Mapping = z.infer<typeof mappingSchema>;

export type RowIssue = { row: number; level: "error" | "warning"; message: string };

export type ParsedCatalogue = {
  products: Product[];
  issues: RowIssue[];
  unmappedHeaders: string[];
  totalRows: number;
};

const FIELD_KEYS = [
  "sku", "name", "manufacturer", "supplier", "category", "subcategory", "shortDescription", "description",
  "specifications", "imageUrl", "datasheetUrl", "sourceUrl", "price", "availability", "originCountry", "keywords",
] as const;
type FieldKey = (typeof FIELD_KEYS)[number];

/** Strip BOM, control chars and HTML tags; unify newlines and full-width punctuation; collapse spaces. */
export function cleanText(input: unknown, { multiline = false } = {}): string {
  if (input === null || input === undefined) return "";
  let s = String(input).normalize("NFC");
  s = s.replace(/^﻿/, "").replace(/\r\n?/g, "\n").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
  s = s.replace(/<[^>]*>/g, " ").replace(/ /g, " ").replace(/：/g, ":");
  if (multiline) {
    s = s.split("\n").map((l) => l.replace(/[ \t]+/g, " ").trim()).join("\n").replace(/\n{3,}/g, "\n\n");
  } else {
    s = s.replace(/\s+/g, " ");
  }
  return s.trim();
}

export function slugify(input: string): string {
  return (
    input
      .normalize("NFKD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 120)
      .replace(/-+$/g, "") || "product"
  );
}

/** Best-effort model code taken from the supplier's own title, e.g. "BKC-TL4BII". Null when absent. */
export function extractModelCode(name: string): string | null {
  const tokens = name.match(/\b[A-Z][A-Za-z0-9]*(?:-[A-Za-z0-9.]+)+\b/g) ?? [];
  const hit = tokens.find((t) => /\d/.test(t) && /[A-Z]{2}/.test(t));
  return hit ?? null;
}

export function safeUrl(value: string): string | null {
  if (!value) return null;
  try {
    const u = new URL(value.trim());
    return u.protocol === "https:" || u.protocol === "http:" ? u.toString() : null;
  } catch {
    return null;
  }
}

/**
 * Identity of a product row. A SKU wins. Otherwise it is the name AND the company, so "Microplate Centrifuge" from
 * BIOBASE and from Greiner Bio-One are two products. Only a repeat of the same name from the same company is a duplicate.
 */
export function recordKey(sku: string | null, name: string, company?: string | null): string {
  if (sku) return `sku:${sku.toLowerCase()}`;
  const base = `name:${cleanText(name).toLowerCase()}`;
  const co = cleanText(company).toLowerCase();
  return co ? `${base}|company:${co}` : base;
}

export function productId(key: string): string {
  return "p_" + createHash("sha1").update(key).digest("hex").slice(0, 10);
}

/** Id used before the company became part of the key. Existing records keep it so their ids and URLs never change. */
export const legacyProductId = (name: string) => productId(recordKey(null, name));

const sameCompany = (a: string | null, b: string | null) => cleanText(a).toLowerCase() === cleanText(b).toLowerCase();

export function categorize(name: string, mapping: Mapping): string {
  const hay = name.toLowerCase();
  for (const rule of mapping.categoryRules) {
    if (rule.match.some((m) => hay.includes(m.toLowerCase()))) return rule.category;
  }
  return mapping.defaultCategory;
}

/** Pull "Label: value" lines out of a description into specification rows. Nothing is invented. */
export function extractSpecs(description: string): { label: string; value: string }[] {
  const specs: { label: string; value: string }[] = [];
  for (const line of description.split("\n")) {
    const m = line.match(/^\s*(?:\d+[.)]\s*)?([A-Za-z][A-Za-z0-9 /()%.-]{1,40}?)\s*:\s*(\S.{0,200})$/);
    if (m && !/^(introduction|features?|description|note)$/i.test(m[1].trim())) {
      specs.push({ label: m[1].trim(), value: m[2].trim() });
    }
  }
  return specs.slice(0, 40);
}

export function firstSentence(text: string, max = 200): string | null {
  const body = text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !/^(introduction|features?|description):?$/i.test(l))[0];
  if (!body) return null;
  const clean = body.replace(/^\d+[.)]\s*/, "");
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  return cut.slice(0, Math.max(cut.lastIndexOf(" "), 60)).replace(/[,;:]$/, "") + "…";
}

export function parseSpecString(value: string): { label: string; value: string }[] {
  return value
    .split(/;|\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => {
      const i = p.indexOf(":");
      return i > 0 ? { label: p.slice(0, i).trim(), value: p.slice(i + 1).trim() } : { label: "Specification", value: p };
    })
    .filter((s) => s.value);
}

export function parseCsv(text: string) {
  return Papa.parse<Record<string, string>>(text.replace(/^﻿/, ""), {
    header: true,
    skipEmptyLines: "greedy",
    transformHeader: (h) => h.trim(),
  });
}

function resolveHeaders(headers: string[], mapping: Mapping) {
  const lower = new Map(headers.map((h) => [h.toLowerCase(), h]));
  const resolved: Partial<Record<FieldKey, string>> = {};
  for (const key of FIELD_KEYS) {
    for (const alias of mapping.columns[key] ?? []) {
      const h = lower.get(alias.toLowerCase());
      if (h) {
        resolved[key] = h;
        break;
      }
    }
  }
  const used = new Set(Object.values(resolved));
  const ignored = new Set(mapping.ignoredColumns.map((c) => c.toLowerCase()));
  const unmapped = headers.filter((h) => !used.has(h) && !ignored.has(h.toLowerCase()));
  return { resolved, unmapped };
}

export function parseCatalogue(csvText: string, mapping: Mapping, now: string): ParsedCatalogue {
  const parsed = parseCsv(csvText);
  const issues: RowIssue[] = [];
  const headers = parsed.meta.fields ?? [];
  const { resolved, unmapped } = resolveHeaders(headers, mapping);

  if (!resolved.name) {
    issues.push({ row: 0, level: "error", message: `No product name column found. Headers present: ${headers.join(", ") || "(none)"}` });
    return { products: [], issues, unmappedHeaders: unmapped, totalRows: parsed.data.length };
  }
  for (const e of parsed.errors) {
    // Papaparse flags rows with extra/missing fields; those rows are unreliable so they are reported as errors.
    issues.push({ row: (e.row ?? 0) + 2, level: "error", message: `CSV parse problem: ${e.message}` });
  }
  const badRows = new Set(parsed.errors.map((e) => e.row));

  const seen = new Map<string, number>();
  const products: Product[] = [];

  parsed.data.forEach((raw, idx) => {
    const row = idx + 2; // header is row 1
    if (badRows.has(idx)) return;
    const get = (k: FieldKey, opts?: { multiline?: boolean }) => (resolved[k] ? cleanText(raw[resolved[k]!], opts) : "");

    const name = get("name");
    if (name.length < 2) {
      issues.push({ row, level: "error", message: "Missing or too-short product name" });
      return;
    }
    if (name.length > 250) {
      issues.push({ row, level: "error", message: `Product name longer than 250 characters (${name.length})` });
      return;
    }

    const sku = get("sku") || null;
    // The company/brand column is the real source. Supplier shows it too unless the file has its own supplier column;
    // the mapping default is only a last resort for rows that name no company at all.
    const manufacturer = get("manufacturer") || mapping.defaults.manufacturer || null;
    const key = recordKey(sku, name, manufacturer);
    if (seen.has(key)) {
      issues.push({ row, level: "warning", message: `Duplicate of row ${seen.get(key)} ("${name}"${manufacturer ? `, ${manufacturer}` : ""}); first occurrence kept` });
      return;
    }
    seen.set(key, row);

    const rawImage = get("imageUrl");
    const imageUrl = safeUrl(rawImage);
    if (rawImage && !imageUrl) issues.push({ row, level: "warning", message: `Invalid image URL ignored: ${rawImage.slice(0, 80)}` });
    const rawData = get("datasheetUrl");
    const datasheetUrl = safeUrl(rawData);
    if (rawData && !datasheetUrl) issues.push({ row, level: "warning", message: "Invalid datasheet URL ignored" });
    const rawSrc = get("sourceUrl");
    const sourceUrl = safeUrl(rawSrc);
    if (rawSrc && !sourceUrl) issues.push({ row, level: "warning", message: "Invalid source URL ignored" });
    if (!imageUrl) issues.push({ row, level: "warning", message: "No image; fallback placeholder will be shown" });

    const description = get("description", { multiline: true }) || null;
    const explicitSpecs = get("specifications", { multiline: true });
    const specifications = explicitSpecs ? parseSpecString(explicitSpecs) : description ? extractSpecs(description) : [];
    const explicitShort = get("shortDescription");
    const shortDescription = explicitShort || (description ? firstSentence(description) : null);
    const category = get("category") || categorize(name, mapping);
    const keywordField = get("keywords");

    products.push({
      id: productId(key),
      sku,
      modelCode: extractModelCode(name),
      name,
      slug: "", // assigned during merge so existing slugs stay stable
      category,
      subcategory: get("subcategory") || null,
      manufacturer,
      supplier: get("supplier") || manufacturer || mapping.defaults.supplier || null,
      shortDescription,
      description,
      specifications,
      imageUrl,
      datasheetUrl,
      sourceUrl,
      price: get("price") || null,
      availability: get("availability") || null,
      originCountry: get("originCountry") || null,
      importSource: mapping.defaults.importSource ?? "csv",
      updatedAt: now,
      status: "published",
      keywords: keywordField ? keywordField.split(/[,;]/).map((k) => k.trim()).filter(Boolean) : [],
    });
  });

  return { products, issues, unmappedHeaders: unmapped, totalRows: parsed.data.length };
}

export type MergeResult = {
  products: Product[];
  added: Product[];
  updated: Product[];
  unchanged: number;
  archived: Product[];
  restored: Product[];
};

const comparable = (p: Product) => JSON.stringify({ ...p, updatedAt: "", slug: "" });

/**
 * Deterministic merge. Existing ids/slugs are preserved, unchanged records keep their updatedAt (so a repeat
 * import produces an identical file), and products missing from the new file are only archived when asked.
 */
export function mergeCatalogues(
  existing: Product[],
  incoming: Product[],
  opts: { archiveMissing: boolean; now: string },
): MergeResult {
  const byId = new Map(existing.map((p) => [p.id, p]));
  const taken = new Set(existing.map((p) => p.slug));
  const added: Product[] = [];
  const updated: Product[] = [];
  const archived: Product[] = [];
  const restored: Product[] = [];
  let unchanged = 0;
  const out = new Map<string, Product>(existing.map((p) => [p.id, p]));
  const seenIds = new Set<string>();

  // Records saved before the company was part of the key still carry the name-only id. They are matched by that id plus
  // the same company, and keep their id and slug, so no existing URL changes.
  const findExisting = (inc: Product) => {
    const direct = byId.get(inc.id);
    if (direct || inc.sku) return direct;
    const legacy = byId.get(legacyProductId(inc.name));
    return legacy && !legacy.sku && sameCompany(legacy.manufacturer, inc.manufacturer) ? legacy : undefined;
  };

  // Sorted so slug collisions resolve identically on every run.
  const sorted = [...incoming].sort((a, b) => a.id.localeCompare(b.id));
  for (const inc of sorted) {
    const prev = findExisting(inc);
    seenIds.add(prev ? prev.id : inc.id);
    if (prev) {
      const next = { ...inc, id: prev.id, slug: prev.slug };
      if (prev.status === "archived") {
        restored.push(next);
        out.set(prev.id, { ...next, updatedAt: opts.now });
      } else if (comparable(prev) !== comparable(next)) {
        updated.push(next);
        out.set(prev.id, { ...next, updatedAt: opts.now });
      } else {
        unchanged++;
      }
      continue;
    }
    // Same name as an existing product from another company: put the company in the URL, e.g. microplate-centrifuge-greiner-bio-one-gmbh.
    let slug = slugify(inc.name);
    if (taken.has(slug) && inc.manufacturer) slug = `${slug.slice(0, 100).replace(/-+$/, "")}-${slugify(inc.manufacturer).slice(0, 40)}`;
    if (taken.has(slug) && inc.modelCode) slug = `${slug}-${slugify(inc.modelCode)}`.slice(0, 160);
    const base = slug;
    let n = 2;
    while (taken.has(slug)) slug = `${base}-${n++}`;
    taken.add(slug);
    const rec = { ...inc, slug };
    added.push(rec);
    out.set(inc.id, rec);
  }

  if (opts.archiveMissing) {
    for (const p of existing) {
      if (!seenIds.has(p.id) && p.status === "published") {
        const a = { ...p, status: "archived" as const, updatedAt: opts.now };
        archived.push(a);
        out.set(p.id, a);
      }
    }
  }

  const products = [...out.values()].sort((a, b) => a.name.localeCompare(b.name) || a.id.localeCompare(b.id));
  return { products, added, updated, unchanged, archived, restored };
}
