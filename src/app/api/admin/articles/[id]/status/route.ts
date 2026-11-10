import { z } from "zod";
import { fail, json, readJson } from "@/lib/api";
import { HttpError, requireApi } from "@/lib/auth/guard";
import { articleErrorToHttp, loadEditable, loadViewable } from "@/lib/article-access";
import { pingIndexNow } from "@/lib/indexnow";
import { archiveArticle, publishArticle, unpublishArticle } from "@/lib/store/articles";
import { logActivity } from "@/lib/store/activity";
import { PlannerError } from "@/lib/store/planner";
import { onArticlePublished, onArticleUnpublished, reviewAction } from "@/lib/store/workflow";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const body = z.object({
  action: z.enum(["publish", "unpublish", "archive", "submit", "withdraw", "request_revision", "approve"]),
  note: z.string().max(2000).default(""),
  /** Owner only: publish although the article is below the minimum word count. */
  override: z.boolean().default(false),
});

const OWNER_ACTIONS = new Set(["publish", "unpublish", "archive", "request_revision", "approve"]);

/**
 * publish / unpublish / archive / request_revision / approve are the owner's alone. A contributor can only "submit" their own
 * draft for review (or withdraw it). Nothing a contributor does can make anything public.
 */
export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const { action, note, override } = await readJson(req, body, 4096);
    const ownerOnly = OWNER_ACTIONS.has(action);
    const session = await requireApi(req, { mutation: true, action: ownerOnly ? "articles.publish" : "articles.write" });
    const actor = { ...session.user, name: session.user.name };
    const id = (await ctx.params).id;
    const a = ownerOnly ? await loadViewable(session.user, id) : await loadEditableOrOwnReview(session.user, id, action);
    try {
      if (action === "publish") {
        // The override is honoured only for the owner (publishing itself is owner-only, checked above).
        const r = await publishArticle(a.id, session.user.id, { override: override && session.user.role === "owner" });
        if (!r.ok) return json({ ok: false, error: "not_ready", problems: r.problems, belowMinimum: Boolean(r.belowMinimum) }, 422);
        await onArticlePublished(a.id, { id: session.user.id, name: session.user.name });
        await pingIndexNow([r.article.slug]);
        return json({ ok: true, status: r.article.status, slug: r.article.slug });
      }
      if (action === "unpublish" || action === "archive") {
        const done = action === "unpublish" ? await unpublishArticle(a.id, session.user.id) : await archiveArticle(a.id, session.user.id);
        if (a.status === "published") {
          await onArticleUnpublished(a.id, { id: session.user.id, name: session.user.name });
          await pingIndexNow([a.slug]); // tell engines the page is gone
        }
        await logActivity({ id: session.user.id, name: session.user.name }, "article.unpublished", { articleId: a.id }, action);
        return json({ ok: true, status: done.status });
      }
      const updated = await reviewAction(actor, a, action, note);
      return json({ ok: true, reviewStatus: updated.reviewStatus });
    } catch (e) {
      if (e instanceof PlannerError) throw new HttpError(e.code === "forbidden" ? 403 : e.code === "not_found" ? 404 : e.code === "conflict" ? 409 : 400, e.code, e.message);
      articleErrorToHttp(e);
    }
  } catch (e) {
    return fail(e);
  }
}

/** Submitting or withdrawing needs edit rights, except that withdrawing is allowed while the draft is locked in review. */
async function loadEditableOrOwnReview(user: Parameters<typeof loadEditable>[0], id: string, action: string) {
  if (action === "withdraw") return loadViewable(user, id);
  return loadEditable(user, id);
}
