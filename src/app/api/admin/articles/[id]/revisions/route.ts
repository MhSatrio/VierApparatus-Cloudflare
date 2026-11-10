import { z } from "zod";
import { fail, json, readJson } from "@/lib/api";
import { HttpError, requireApi } from "@/lib/auth/guard";
import { articleErrorToHttp, loadViewable } from "@/lib/article-access";
import { logActivity } from "@/lib/store/activity";
import { updateArticle } from "@/lib/store/articles";
import { addManualRevision, getRevision, listRevisions } from "@/lib/store/revisions";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

/** Version history of an article the caller may see (content is fetched one version at a time, never in bulk). */
export async function GET(req: Request, ctx: Ctx) {
  try {
    const session = await requireApi(req, { action: "articles.write" });
    const a = await loadViewable(session.user, (await ctx.params).id);
    return json({ ok: true, current: a.version, revisions: await listRevisions(a.id) });
  } catch (e) {
    return fail(e);
  }
}

const body = z.discriminatedUnion("action", [
  z.object({ action: z.literal("restore"), revisionId: z.number().int().positive() }),
  z.object({ action: z.literal("save_version"), note: z.string().trim().min(1).max(300) }),
]);

/**
 * restore  - OWNER ONLY. Writes the old content back as a NEW version (history is never rewritten) and logs it.
 * save_version - anyone who can edit the article may name a snapshot of the current saved content ("before restructuring").
 */
export async function POST(req: Request, ctx: Ctx) {
  try {
    const input = await readJson(req, body, 4096);
    const session = await requireApi(req, { mutation: true, action: input.action === "restore" ? "articles.manage" : "articles.write" });
    const a = await loadViewable(session.user, (await ctx.params).id);
    const who = { id: session.user.id, name: session.user.name };
    try {
      if (input.action === "save_version") {
        await addManualRevision(a.id, { version: a.version, title: a.title, excerpt: a.excerpt, doc: a.doc, editor: who }, input.note);
        return json({ ok: true });
      }
      const snap = await getRevision(a.id, input.revisionId);
      if (!snap) throw new HttpError(404, "not_found");
      const restored = await updateArticle(
        a.id,
        { title: snap.title, slug: a.slug, excerpt: snap.excerpt, categoryId: a.categoryId, authorName: a.authorName, tags: a.tags, coverUrl: a.coverUrl, coverAlt: a.coverAlt, coverCredit: a.coverCredit, coverWidth: a.coverWidth, coverHeight: a.coverHeight, seoTitle: a.seoTitle, seoDescription: a.seoDescription, featured: a.featured, doc: snap.doc, source: "editor" },
        who,
        a.version,
        { kind: "restore", note: `Restored version from ${snap.createdAt.slice(0, 16).replace("T", " ")} by ${snap.editorName || "unknown"}` },
      );
      await logActivity(who, "article.restored", { articleId: a.id }, snap.createdAt);
      return json({ ok: true, version: restored.version });
    } catch (e) {
      articleErrorToHttp(e);
    }
  } catch (e) {
    return fail(e);
  }
}
