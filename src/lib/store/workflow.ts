import { can } from "../auth/permissions";
import { logActivity } from "./activity";
import { addComment } from "./comments";
import { getArticleById, setReviewStatus, type ArticleRecord } from "./articles";
import { getRecordForArticle, onArticlePublished, onArticleUnpublished, transition, PlannerError, type Viewer } from "./planner";
import { recordRevision } from "./revisions";

/**
 * The review workflow on an ARTICLE. When the article belongs to a planner task the task and the article move together
 * (transition() updates both); a loose article (no task) just carries the review flag. Either way:
 *   - contributors can only submit (or withdraw) their own work,
 *   - only the owner requests a revision, approves, or publishes,
 *   - nothing here makes anything public.
 */
export type ReviewAction = "submit" | "withdraw" | "request_revision" | "approve";

export async function reviewAction(actor: Viewer, article: ArticleRecord, action: ReviewAction, note = ""): Promise<ArticleRecord> {
  const owner = can(actor, "articles.manage");
  if ((action === "request_revision" || action === "approve") && !owner) throw new PlannerError("forbidden", "Only the owner can review.");
  if (article.status !== "draft") throw new PlannerError("invalid", "Only drafts can be reviewed.");
  const rec = await getRecordForArticle(article.id);
  const who = { id: actor.id, name: actor.name };

  if (rec) {
    if (action === "withdraw" && article.reviewStatus !== "requested") throw new PlannerError("invalid", "This draft is not waiting for review.");
    await transition(actor, rec.id, action, note);
    return (await getArticleById(article.id))!;
  }

  // loose article, no planner task
  const next = action === "submit" ? "requested" : action === "withdraw" ? "none" : action === "request_revision" ? "revision" : "approved";
  if (action === "submit" && !["none", "revision"].includes(article.reviewStatus)) throw new PlannerError("invalid", "This draft was already submitted.");
  if ((action === "request_revision" || action === "approve") && article.reviewStatus !== "requested") throw new PlannerError("invalid", "This draft is not waiting for review.");
  await setReviewStatus(article.id, next);
  const kind = action === "submit" ? "submit" : action === "request_revision" ? "revision" : action === "approve" ? "approve" : null;
  if (kind) await recordRevision({ articleId: article.id, version: article.version, title: article.title, excerpt: article.excerpt, doc: article.doc, editor: who, kind, note: note.slice(0, 300) });
  await logActivity(who, action === "submit" ? "article.submitted" : action === "request_revision" ? "article.revision_requested" : action === "approve" ? "article.approved" : "record.status", { articleId: article.id }, article.title);
  if (note.trim() && (action === "request_revision" || action === "submit")) await addComment({ articleId: article.id, author: who, body: note.trim() });
  return (await getArticleById(article.id))!;
}

export { onArticlePublished, onArticleUnpublished };
