import { fail, json } from "@/lib/api";
import { HttpError, requireApi } from "@/lib/auth/guard";
import { loadViewable } from "@/lib/article-access";
import { getArticleMeta } from "@/lib/store/articles";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * "Is my copy still current?" One tiny row, no content. The editor calls it ONLY when the user presses
 * "Check for updates": nothing polls, so no collaboration traffic exists while nobody is looking.
 */
export async function GET(req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireApi(req, { action: "articles.write" });
    const a = await loadViewable(session.user, (await ctx.params).id);
    const meta = await getArticleMeta(a.id);
    if (!meta) throw new HttpError(404, "not_found");
    return json({ ok: true, ...meta });
  } catch (e) {
    return fail(e);
  }
}
