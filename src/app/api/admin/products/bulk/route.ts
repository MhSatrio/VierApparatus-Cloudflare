import { z } from "zod";
import { json, readJson } from "@/lib/api";
import { requireApi } from "@/lib/auth/guard";
import { productFail, viewer } from "@/lib/products/http";
import { PRODUCT_STATUSES, REVIEW_STATUSES } from "@/lib/products/shared";
import { bulkUpdate } from "@/lib/store/products";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const body = z.object({
  ids: z.array(z.string().min(1).max(60)).min(1).max(500),
  action: z.discriminatedUnion("type", [
    z.object({ type: z.literal("status"), status: z.enum(PRODUCT_STATUSES) }),
    z.object({ type: z.literal("category"), category: z.string().trim().min(1).max(120) }),
    z.object({ type: z.literal("review"), review: z.enum(REVIEW_STATUSES) }),
    z.object({ type: z.literal("delete") }),
  ]),
});

/** Owner only: one change for the selected products. Products the change cannot be applied to are listed with the reason. */
export async function POST(req: Request) {
  try {
    const session = await requireApi(req, { mutation: true, action: "products.manage" });
    const b = await readJson(req, body, 64 * 1024);
    return json({ ok: true, ...(await bulkUpdate(viewer(session), b.ids, b.action)) });
  } catch (e) {
    return productFail(e);
  }
}
