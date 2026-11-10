import { conn } from "../db/client";
import { n, nowIso, s, sn } from "./util";

/** Meaningful editorial events only (never keystrokes or page views). */
export type ActivityAction =
  | "record.created"
  | "record.updated"
  | "record.assigned"
  | "record.status"
  | "record.shared"
  | "record.archived"
  | "article.created"
  | "article.linked"
  | "article.updated"
  | "article.assigned"
  | "article.submitted"
  | "article.revision_requested"
  | "article.approved"
  | "article.published"
  | "article.unpublished"
  | "article.restored"
  | "comment.added"
  | "comment.resolved";

export type Actor = { id: string | null; name: string };

export async function logActivity(actor: Actor, action: ActivityAction, target: { recordId?: string | null; articleId?: string | null }, detail = ""): Promise<void> {
  const db = await conn();
  await db
    .execute({
      sql: "INSERT INTO activity(ts, actor_id, actor_name, record_id, article_id, action, detail) VALUES (?, ?, ?, ?, ?, ?, ?)",
      args: [nowIso(), actor.id, actor.name.slice(0, 80), target.recordId ?? null, target.articleId ?? null, action, detail.slice(0, 300)],
    })
    .catch(() => {});
}

export type ActivityItem = { id: number; ts: string; actorName: string; action: ActivityAction; detail: string; recordId: string | null; articleId: string | null };

const map = (x: Record<string, unknown>): ActivityItem => ({ id: n(x.id), ts: s(x.ts), actorName: s(x.actor_name), action: s(x.action) as ActivityAction, detail: s(x.detail), recordId: sn(x.record_id), articleId: sn(x.article_id) });

/** Activity for one record (and its linked article), newest first. Callers must have checked the viewer may see the record. */
export async function activityFor(target: { recordId?: string | null; articleId?: string | null }, limit = 40): Promise<ActivityItem[]> {
  const db = await conn();
  const r = await db.execute({ sql: "SELECT * FROM activity WHERE (record_id IS NOT NULL AND record_id = ?) OR (article_id IS NOT NULL AND article_id = ?) ORDER BY id DESC LIMIT ?", args: [target.recordId ?? "", target.articleId ?? "", limit] });
  return r.rows.map(map);
}

/** Team-wide recent activity. Owner only; contributors get `activityForRecords`. */
export async function recentActivity(limit = 30): Promise<ActivityItem[]> {
  const db = await conn();
  const r = await db.execute({ sql: "SELECT * FROM activity ORDER BY id DESC LIMIT ?", args: [limit] });
  return r.rows.map(map);
}

/** Activity restricted to the given records (what a contributor is allowed to see). */
export async function activityForRecords(recordIds: string[], limit = 30): Promise<ActivityItem[]> {
  if (!recordIds.length) return [];
  const db = await conn();
  const ids = recordIds.slice(0, 200);
  const r = await db.execute({ sql: `SELECT * FROM activity WHERE record_id IN (${ids.map(() => "?").join(",")}) ORDER BY id DESC LIMIT ?`, args: [...ids, limit] });
  return r.rows.map(map);
}

export const ACTION_LABEL: Record<ActivityAction, string> = {
  "record.created": "created the task",
  "record.updated": "updated the task",
  "record.assigned": "assigned the task",
  "record.status": "changed the status",
  "record.shared": "changed who the task is shared with",
  "record.archived": "archived the task",
  "article.created": "created a draft",
  "article.linked": "linked an article",
  "article.updated": "saved a draft",
  "article.assigned": "assigned the draft",
  "article.submitted": "submitted for review",
  "article.revision_requested": "requested a revision",
  "article.approved": "approved the article",
  "article.published": "published the article",
  "article.unpublished": "unpublished the article",
  "article.restored": "restored an earlier version",
  "comment.added": "commented",
  "comment.resolved": "resolved a comment",
};
