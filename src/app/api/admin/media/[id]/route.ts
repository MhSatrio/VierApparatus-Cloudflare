import { fail, json } from "@/lib/api";
import { requireApi } from "@/lib/auth/guard";
import { deleteMedia } from "@/lib/store/media";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Owner only. Refuses while any article still uses the image. */
export async function DELETE(req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireApi(req, { mutation: true, action: "articles.manage", json: false });
    const r = await deleteMedia((await ctx.params).id, session.user.id);
    return r.ok ? json({ ok: true }) : json({ ok: false, error: "in_use", message: r.error }, 409);
  } catch (e) {
    return fail(e);
  }
}
