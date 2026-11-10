import { z } from "zod";
import { json, readJson } from "@/lib/api";
import { requireApi } from "@/lib/auth/guard";
import { productFail, viewer } from "@/lib/products/http";
import { PRODUCT_STATUSES } from "@/lib/products/shared";
import { setProductStatus } from "@/lib/store/products";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Owner only: one step of the publication workflow. A move the workflow does not allow, or a publish without the minimum content, is refused with the reasons. */
export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireApi(req, { mutation: true, action: "products.write" });
    const { status } = await readJson(req, z.object({ status: z.enum(PRODUCT_STATUSES) }), 2048);
    const p = await setProductStatus(viewer(session), (await ctx.params).id, status);
    return json({ ok: true, status: p.status, version: p.version, slug: p.slug });
  } catch (e) {
    return productFail(e);
  }
}
