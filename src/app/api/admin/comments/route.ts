import { z } from "zod";
import { fail, json, readJson } from "@/lib/api";
import { HttpError, requireApi } from "@/lib/auth/guard";
import { canViewArticle } from "@/lib/article-access";
import { viewerOf } from "@/lib/planner-http";
import { logActivity } from "@/lib/store/activity";
import { getArticleById } from "@/lib/store/articles";
import { addComment } from "@/lib/store/comments";
import { getRecord } from "@/lib/store/planner";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const body = z.object({
  recordId: z.string().max(60).optional(),
  articleId: z.string().max(60).optional(),
  parentId: z.string().max(60).nullish(),
  body: z.string().min(1).max(4000),
});

/**
 * Add a comment (or a reply) to a task or an article. The caller must be allowed to SEE the target; the author is always the
 * signed-in user, never a value from the request.
 */
export async function POST(req: Request) {
  try {
    const session = await requireApi(req, { mutation: true });
    const input = await readJson(req, body, 12 * 1024);
    if (!input.recordId && !input.articleId) throw new HttpError(400, "validation", "A comment needs a task or an article.");
    const viewer = viewerOf(session.user);
    let recordId: string | null = null;
    let articleId: string | null = null;
    if (input.recordId) {
      const rec = await getRecord(viewer, input.recordId);
      if (!rec) throw new HttpError(404, "not_found");
      recordId = rec.id;
      articleId = rec.articleId;
    } else if (input.articleId) {
      const art = await getArticleById(input.articleId);
      if (!art || !canViewArticle(session.user, art)) throw new HttpError(404, "not_found");
      articleId = art.id;
    }
    // Comments on a task's article belong to the task, so both sides see one conversation.
    const c = await addComment({ recordId, articleId: recordId ? null : articleId, parentId: input.parentId ?? null, author: { id: session.user.id, name: session.user.name }, body: input.body });
    if (!c) throw new HttpError(400, "validation", "That comment could not be saved.");
    await logActivity({ id: session.user.id, name: session.user.name }, "comment.added", { recordId, articleId }, input.body.slice(0, 120));
    return json({ ok: true, comment: c });
  } catch (e) {
    return fail(e);
  }
}
