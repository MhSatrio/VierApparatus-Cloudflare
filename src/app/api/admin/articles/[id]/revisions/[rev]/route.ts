import { fail, json } from "@/lib/api";
import { HttpError, requireApi } from "@/lib/auth/guard";
import { loadViewable } from "@/lib/article-access";
import { renderDoc } from "@/lib/content/render";
import { getRevision } from "@/lib/store/revisions";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** One saved version, rendered with the public renderer so the viewer can read it exactly as it would appear. */
export async function GET(req: Request, ctx: { params: Promise<{ id: string; rev: string }> }) {
  try {
    const session = await requireApi(req, { action: "articles.write" });
    const { id, rev } = await ctx.params;
    const a = await loadViewable(session.user, id);
    const snap = await getRevision(a.id, Number(rev));
    if (!snap) throw new HttpError(404, "not_found");
    const r = renderDoc(snap.doc);
    return json({ ok: true, revision: { id: snap.id, version: snap.version, kind: snap.kind, editorName: snap.editorName, note: snap.note, title: snap.title, excerpt: snap.excerpt, createdAt: snap.createdAt, html: r.html, hasMath: r.hasMath } });
  } catch (e) {
    return fail(e);
  }
}
