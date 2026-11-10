import { z } from "zod";
import { json, readJson } from "@/lib/api";
import { requireApi } from "@/lib/auth/guard";
import { can } from "@/lib/auth/permissions";
import { productFail, viewer } from "@/lib/products/http";
import { productInput } from "@/lib/products/shared";
import { deleteProduct, getProduct, ProductError, updateCell, updateProduct } from "@/lib/store/products";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(req: Request, ctx: Ctx) {
  try {
    const session = await requireApi(req, { action: "products.write" });
    const p = await getProduct((await ctx.params).id);
    // a contributor reads only the products they added; anything else is reported as not found
    if (!p || (!can(session.user, "products.manage") && p.createdBy !== session.user.id)) throw new ProductError("not_found", "Product not found.");
    return json({ ok: true, product: p });
  } catch (e) {
    return productFail(e);
  }
}

/** Save the whole product (the editor's form). A stale version is refused. */
export async function PUT(req: Request, ctx: Ctx) {
  try {
    const session = await requireApi(req, { mutation: true, action: "products.write" });
    const input = await readJson(req, productInput, 256 * 1024);
    const p = await updateProduct(viewer(session), (await ctx.params).id, input);
    return json({ ok: true, version: p.version, slug: p.slug, updatedAt: p.updatedAt, product: p });
  } catch (e) {
    return productFail(e);
  }
}

const cell = z.object({
  field: z.enum(["name", "manufacturer", "modelNumber", "category", "shortDescription", "imageUrl", "reviewStatus", "productUrl", "manufacturerUrl"]),
  value: z.string().max(8000),
  expectedVersion: z.number().int(),
});

/** One table cell edited in place. */
export async function PATCH(req: Request, ctx: Ctx) {
  try {
    const session = await requireApi(req, { mutation: true, action: "products.write" });
    const b = await readJson(req, cell, 16 * 1024);
    const p = await updateCell(viewer(session), (await ctx.params).id, b.field, b.value, b.expectedVersion);
    return json({ ok: true, version: p.version, updatedAt: p.updatedAt, category: p.category, name: p.name });
  } catch (e) {
    return productFail(e);
  }
}

export async function DELETE(req: Request, ctx: Ctx) {
  try {
    const session = await requireApi(req, { mutation: true, action: "products.manage", json: false });
    await deleteProduct(viewer(session), (await ctx.params).id);
    return json({ ok: true });
  } catch (e) {
    return productFail(e);
  }
}
