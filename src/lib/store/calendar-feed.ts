import { conn } from "../db/client";
import { randomToken, sha256Hex } from "../crypto";
import { buildIcs, type IcsEvent } from "../ics";
import { PRIORITY_LABEL, STATUS_LABEL, taskRef, type Priority, type RecordStatus } from "../planner-shared";
import { site } from "../site";
import { b, n, nowIso, s, sn, type Row } from "./util";

/**
 * Calendar feeds: each person gets one private link (an .ics address with a random token). Calendar apps subscribe to it and
 * show task deadlines. Only the SHA-256 hash of the token is stored, so the link is shown once, when it is created.
 *
 * Who sees what:
 *  - the owner: every open task that has a due date;
 *  - a contributor with Collab access: the open tasks assigned to them;
 *  - a disabled account, or one without Collab access: nothing (the link then returns an empty calendar).
 * Descriptions carry status, priority and assignee only. Owner notes and research notes are never included.
 */

export type FeedUser = { id: string; name: string; role: "owner" | "contributor"; permissions: string[] };

export async function createFeedLink(userId: string): Promise<{ token: string }> {
  const token = randomToken(32);
  const hash = await sha256Hex(token);
  const t = nowIso();
  const db = await conn();
  await db.execute({
    sql: `INSERT INTO calendar_feeds(user_id, token_hash, created_at, rotated_at) VALUES (?, ?, ?, ?)
          ON CONFLICT(user_id) DO UPDATE SET token_hash = excluded.token_hash, rotated_at = excluded.rotated_at`,
    args: [userId, hash, t, t],
  });
  return { token };
}

/** Whether this person has a link, and when it was created. The link itself is never shown again. */
export async function feedStatus(userId: string): Promise<{ exists: boolean; createdAt: string | null }> {
  const db = await conn();
  const r = (await db.execute({ sql: "SELECT created_at FROM calendar_feeds WHERE user_id = ?", args: [userId] })).rows[0];
  return r ? { exists: true, createdAt: sn(r.created_at) } : { exists: false, createdAt: null };
}

/** The person a token belongs to, or null for an unknown token or a disabled account. */
export async function resolveFeedToken(token: string): Promise<FeedUser | null> {
  if (!token || token.length > 200) return null;
  const db = await conn();
  const r = (await db.execute({
    sql: `SELECT u.id, u.name, u.role, u.permissions, u.disabled FROM calendar_feeds cf JOIN users u ON u.id = cf.user_id WHERE cf.token_hash = ?`,
    args: [await sha256Hex(token)],
  })).rows[0];
  if (!r || b(r.disabled)) return null;
  return { id: s(r.id), name: s(r.name), role: s(r.role) as FeedUser["role"], permissions: parsePerms(r.permissions) };
}

function parsePerms(v: unknown): string[] {
  try {
    const a = JSON.parse(s(v) || "[]");
    return Array.isArray(a) ? a.map(String) : [];
  } catch {
    return [];
  }
}

/** Open tasks with a due date that this person may see in their calendar. */
export async function feedRows(user: FeedUser): Promise<Row[]> {
  if (user.role !== "owner" && !user.permissions.includes("collab.access")) return [];
  const db = await conn();
  const owner = user.role === "owner";
  const r = await db.execute({
    sql: `SELECT p.num, p.title, p.status, p.priority, p.due_date, ua.name AS assignee
          FROM planner_records p LEFT JOIN users ua ON ua.id = p.assigned_to
          WHERE p.due_date IS NOT NULL AND p.status NOT IN ('done','archived') AND (? = 1 OR p.assigned_to = ?)
          ORDER BY p.due_date, p.num LIMIT 1000`,
    args: [owner ? 1 : 0, user.id],
  });
  return r.rows;
}

/** The .ics text for one person. */
export async function feedIcs(user: FeedUser, now: Date = new Date()): Promise<string> {
  const host = new URL(site.url).hostname;
  const events: IcsEvent[] = (await feedRows(user)).map((x) => {
    const ref = taskRef(n(x.num));
    const status = STATUS_LABEL[s(x.status) as RecordStatus] ?? s(x.status);
    const priority = PRIORITY_LABEL[s(x.priority) as Priority] ?? s(x.priority);
    return {
      uid: `${ref}@${host}`,
      date: s(x.due_date),
      summary: `${ref} ${s(x.title)}`,
      description: `Status: ${status}\nPriority: ${priority}\nAssigned to: ${s(x.assignee) || "nobody yet"}\nDetails are in the VierApparatus admin, Planner.`,
    };
  });
  return buildIcs({ calendarName: "VierApparatus task deadlines", now, events });
}
