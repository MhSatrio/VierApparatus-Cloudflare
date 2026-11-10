import { json } from "@/lib/api";
import { requireApi } from "@/lib/auth/guard";
import { productFail } from "@/lib/products/http";
import { commentCounts, listComments, type CommentStatus } from "@/lib/store/product-comments";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STATUSES: CommentStatus[] = ["pending", "approved", "rejected", "spam"];

/** Owner only: the moderation queue, with each comment's flags and history. */
export async function GET(req: Request) {
  try {
    await requireApi(req, { action: "products.manage" });
    const u = new URL(req.url).searchParams;
    const status = STATUSES.find((s) => s === u.get("status"));
    const r = await listComments({ status, productId: u.get("product") ?? undefined, page: Number(u.get("page") ?? 1) });
    return json({ ok: true, ...r, counts: await commentCounts() });
  } catch (e) {
    return productFail(e);
  }
}
