import { HttpError } from "./auth/guard";
import { can } from "./auth/permissions";
import type { User } from "./store/users";
import { ArticleError, getArticleById, type ArticleRecord, type ArticleSummary } from "./store/articles";

/**
 * Who may touch which article. The owner can do anything. A contributor needs the "articles.write" permission and may only work
 * on an article that is THEIRS (they started it) or ASSIGNED to them, while it is still a draft and not waiting in review.
 * Seeing is wider than editing: a contributor can still read their own work after submitting it.
 */
type Subject = Pick<ArticleSummary, "authorId" | "assignedTo" | "status" | "reviewStatus">;
type Actor = Pick<User, "id" | "role" | "permissions">;

const involved = (user: Actor, a: Pick<ArticleSummary, "authorId" | "assignedTo">) => a.authorId === user.id || a.assignedTo === user.id;

export function canViewArticle(user: Actor, a: Subject): boolean {
  if (can(user, "articles.manage")) return true;
  return (can(user, "articles.write") || can(user, "collab.access")) && involved(user, a);
}

export function canEditArticle(user: Actor, a: Subject): boolean {
  if (can(user, "articles.manage")) return true;
  return can(user, "articles.write") && involved(user, a) && a.status === "draft" && a.reviewStatus !== "requested";
}

/** Load for reading. A contributor asking for someone else's article gets "not found", not "forbidden": it does not confirm that it exists. */
export async function loadViewable(user: User, id: string): Promise<ArticleRecord> {
  const a = await getArticleById(id);
  if (!a || !canViewArticle(user, a)) throw new HttpError(404, "not_found");
  return a;
}

/** Load for changing. Distinguishes "this is in review, wait for the owner" from a plain refusal. */
export async function loadEditable(user: User, id: string): Promise<ArticleRecord> {
  const a = await loadViewable(user, id);
  if (!canEditArticle(user, a)) throw new HttpError(403, a.status === "draft" && a.reviewStatus === "requested" ? "locked_in_review" : "forbidden");
  return a;
}

export function articleErrorToHttp(e: unknown): never {
  if (e instanceof ArticleError) {
    const status = e.code === "not_found" ? 404 : e.code === "conflict" || e.code === "slug_taken" ? 409 : 400;
    throw new HttpError(status, e.code, e.message);
  }
  throw e;
}
