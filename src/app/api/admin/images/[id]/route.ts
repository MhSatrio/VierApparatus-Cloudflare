import { fail, json } from "@/lib/api";
import { requireApi } from "@/lib/auth/guard";
import { deleteImage } from "@/lib/images/assets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Owner only. Refuses while an article, module or sponsor still uses the image; removes the files from storage otherwise. */
export async function DELETE(req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireApi(req, { mutation: true, action: "articles.manage", json: false });
    const r = await deleteImage((await ctx.params).id, session.user.id);
    return r.ok ? json({ ok: true }) : json({ ok: false, error: "in_use", message: r.error }, r.error === "Image not found." ? 404 : 409);
  } catch (e) {
    return fail(e);
  }
}
