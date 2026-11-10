import { json, readJson } from "@/lib/api";
import { requireApi } from "@/lib/auth/guard";
import { can } from "@/lib/auth/permissions";
import { productFail, viewer } from "@/lib/products/http";
import { PRODUCT_STATUSES, REVIEW_STATUSES, productInput } from "@/lib/products/shared";
import { createProduct, listAllProducts, productStatusCounts } from "@/lib/store/products";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Owner only. The Product Manager's table: server-side search, filters, sort and pages (the catalogue can hold thousands). */
export async function GET(req: Request) {
  try {
    const session = await requireApi(req, { action: "products.write" });
    const owner = can(session.user, "products.manage");
    const u = new URL(req.url).searchParams;
    const pick = <T extends string>(v: string | null, allowed: readonly T[]) => (allowed.includes(v as T) ? (v as T) : "");
    const page = await listAllProducts({
      q: u.get("q") ?? "",
      status: pick(u.get("status"), PRODUCT_STATUSES),
      review: pick(u.get("review"), REVIEW_STATUSES),
      category: u.get("category") ?? "",
      manufacturer: u.get("manufacturer") ?? "",
      origin: u.get("origin") ?? "",
      sort: u.get("sort") ?? "",
      dir: u.get("dir") === "desc" ? "desc" : "asc",
      page: Number(u.get("page") ?? 1),
      perPage: Number(u.get("perPage") ?? 50),
      // a contributor sees only the products they added
      createdBy: owner ? undefined : session.user.id,
    });
    return json({ ok: true, ...page, counts: await productStatusCounts(owner ? undefined : session.user.id) });
  } catch (e) {
    return productFail(e);
  }
}

/** Owner only. Creates a draft product. */
export async function POST(req: Request) {
  try {
    const session = await requireApi(req, { mutation: true, action: "products.write" });
    const input = await readJson(req, productInput, 256 * 1024);
    const p = await createProduct(viewer(session), input);
    return json({ ok: true, id: p.id, ref: p.ref, slug: p.slug });
  } catch (e) {
    return productFail(e);
  }
}
