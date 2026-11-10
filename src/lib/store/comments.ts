import { conn } from "../db/client";
import { newId } from "../crypto";
import { b, n, nowIso, s, sn, type Row } from "./util";

/**
 * Simple threaded comments (one level of replies) attached to a planner record and/or an article. Callers must have
 * verified that the viewer may see the target. Contributors can only edit or delete their own comments; the owner can resolve any.
 */
export type Comment = {
  id: string;
  recordId: string | null;
  articleId: string | null;
  parentId: string | null;
  authorId: string | null;
  authorName: string;
  body: string;
  resolved: boolean;
  resolvedAt: string | null;
  createdAt: string;
  editedAt: string | null;
};

const toComment = (r: Row): Comment => ({
  id: s(r.id),
  recordId: sn(r.record_id),
  articleId: sn(r.article_id),
  parentId: sn(r.parent_id),
  authorId: sn(r.author_id),
  authorName: s(r.author_name),
  body: s(r.body),
  resolved: b(r.resolved),
  resolvedAt: sn(r.resolved_at),
  createdAt: s(r.created_at),
  editedAt: sn(r.edited_at),
});

export const MAX_COMMENT = 4000;

export async function addComment(input: { recordId?: string | null; articleId?: string | null; parentId?: string | null; author: { id: string | null; name: string }; body: string }): Promise<Comment | null> {
  const body = input.body.replace(/\r\n?/g, "\n").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim();
  if (!body || body.length > MAX_COMMENT || (!input.recordId && !input.articleId)) return null;
  const db = await conn();
  if (input.parentId) {
    // Replies attach to a top-level comment of the same target (one level of nesting).
    const parent = (await db.execute({ sql: "SELECT record_id, article_id, parent_id FROM comments WHERE id = ?", args: [input.parentId] })).rows[0];
    if (!parent || sn(parent.parent_id) || sn(parent.record_id) !== (input.recordId ?? null) || sn(parent.article_id) !== (input.articleId ?? null)) return null;
  }
  const id = newId("c_");
  await db.execute({
    sql: "INSERT INTO comments(id, record_id, article_id, parent_id, author_id, author_name, body, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    args: [id, input.recordId ?? null, input.articleId ?? null, input.parentId ?? null, input.author.id, input.author.name.slice(0, 80), body, nowIso()],
  });
  return (await getComment(id))!;
}

export async function getComment(id: string): Promise<Comment | null> {
  const db = await conn();
  const r = await db.execute({ sql: "SELECT * FROM comments WHERE id = ?", args: [id] });
  return r.rows[0] ? toComment(r.rows[0]) : null;
}

export async function listComments(target: { recordId?: string | null; articleId?: string | null }): Promise<Comment[]> {
  const db = await conn();
  const r = await db.execute({
    sql: "SELECT * FROM comments WHERE (record_id IS NOT NULL AND record_id = ?) OR (article_id IS NOT NULL AND article_id = ?) ORDER BY created_at LIMIT 300",
    args: [target.recordId ?? "", target.articleId ?? ""],
  });
  return r.rows.map(toComment);
}

export async function editComment(id: string, body: string): Promise<boolean> {
  const text = body.trim();
  if (!text || text.length > MAX_COMMENT) return false;
  const db = await conn();
  return (await db.execute({ sql: "UPDATE comments SET body = ?, edited_at = ? WHERE id = ?", args: [text, nowIso(), id] })).rowsAffected > 0;
}

export async function setResolved(id: string, resolved: boolean, byUserId: string | null): Promise<boolean> {
  const db = await conn();
  return (
    (await db.execute({ sql: "UPDATE comments SET resolved = ?, resolved_by = ?, resolved_at = ? WHERE id = ?", args: [resolved ? 1 : 0, resolved ? byUserId : null, resolved ? nowIso() : null, id] })).rowsAffected > 0
  );
}

/** Deleting a comment also deletes its replies. */
export async function deleteComment(id: string): Promise<boolean> {
  const db = await conn();
  const r = await db.batch([{ sql: "DELETE FROM comments WHERE parent_id = ?", args: [id] }, { sql: "DELETE FROM comments WHERE id = ?", args: [id] }], "write");
  return r[1].rowsAffected > 0;
}

/** Owner dashboard: how many top-level comments still need attention. */
export async function unresolvedCount(): Promise<number> {
  const db = await conn();
  return n((await db.execute("SELECT COUNT(*) AS c FROM comments WHERE resolved = 0 AND parent_id IS NULL")).rows[0].c);
}
