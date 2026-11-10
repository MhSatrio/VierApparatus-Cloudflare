import { requireApi } from "@/lib/auth/guard";
import { toCsv } from "@/lib/csv";
import { productFail } from "@/lib/products/http";
import { PRODUCT_STATUSES, REVIEW_STATUSES } from "@/lib/products/shared";
import { IMPORT_COLUMNS } from "@/lib/products/table";
import { exportProducts } from "@/lib/store/products";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const join = (xs: string[]) => xs.join(" | ");

/** Owner only. The products the table is showing, as a CSV in the import template's columns (so an edited export can be imported back to update them). */
export async function GET(req: Request) {
  try {
    await requireApi(req, { action: "products.manage" });
    const u = new URL(req.url).searchParams;
    const pick = <T extends string>(v: string | null, allowed: readonly T[]) => (allowed.includes(v as T) ? (v as T) : "");
    const rows = await exportProducts({
      q: u.get("q") ?? "",
      status: pick(u.get("status"), PRODUCT_STATUSES),
      review: pick(u.get("review"), REVIEW_STATUSES),
      category: u.get("category") ?? "",
      manufacturer: u.get("manufacturer") ?? "",
      origin: u.get("origin") ?? "",
      sort: u.get("sort") ?? "",
      dir: u.get("dir") === "desc" ? "desc" : "asc",
    });
    const cell: Record<string, (p: (typeof rows)[number]) => string> = {
      product_id: (p) => p.ref, name: (p) => p.name, manufacturer: (p) => p.manufacturer, category: (p) => p.category, model_number: (p) => p.modelNumber, sku: (p) => p.sku,
      short_description: (p) => p.shortDescription, description: (p) => p.description, technical_specifications: (p) => join(p.specs.map((x) => `${x.label}: ${x.value}`)),
      key_features: (p) => join(p.features), applications: (p) => join(p.applications), advantages: (p) => join(p.advantages), limitations: (p) => join(p.limitations), certifications: (p) => join(p.certifications),
      image_url: (p) => p.imageUrl, product_url: (p) => p.productUrl, manufacturer_url: (p) => p.manufacturerUrl, datasheet_url: (p) => p.datasheetUrl, review_status: (p) => p.reviewStatus,
      publication_status: (p) => p.status, seo_title: (p) => p.seoTitle, seo_description: (p) => p.seoDescription, editorial_notes: (p) => p.editorialNotes,
    };
    const csv = "﻿" + toCsv(IMPORT_COLUMNS.map((c) => c.header), rows.map((p) => IMPORT_COLUMNS.map((c) => cell[c.key]?.(p) ?? "")));
    return new Response(csv, {
      headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="vierapparatus-products-${new Date().toISOString().slice(0, 10)}.csv"`, "Cache-Control": "no-store" },
    });
  } catch (e) {
    return productFail(e);
  }
}
