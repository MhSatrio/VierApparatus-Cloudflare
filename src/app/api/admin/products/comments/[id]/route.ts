import { z } from "zod";
import { json, readJson } from "@/lib/api";
import { requireApi } from "@/lib/auth/guard";
import { productFail, viewer } from "@/lib/products/http";
import { deleteComment, moderateComment } from "@/lib/store/product-comments";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const body = z.discriminatedUnion("type", [
  z.object({ type: z.enum(["approve", "reject", "spam", "pending", "verify", "unverify"]), note: z.string().max(400).optional() }),
  z.object({ type: z.literal("edit"), body: z.string().max(3000), note: z.string().max(400).optional() }),
]);

/** Owner only: approve, reject, mark as spam, return to pending, edit the text, or mark an affiliation as verified. Each step is logged. */
export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireApi(req, { mutation: true, action: "products.manage" });
    const b = await readJson(req, body, 8 * 1024);
    const c = await moderateComment(viewer(session), (await ctx.params).id, b);
    return json({ ok: true, status: c.status, verified: c.affiliationVerified });
  } catch (e) {
    return productFail(e);
  }
}

export async function DELETE(req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireApi(req, { mutation: true, action: "products.manage", json: false });
    await deleteComment(viewer(session), (await ctx.params).id);
    return json({ ok: true });
  } catch (e) {
    return productFail(e);
  }
}
