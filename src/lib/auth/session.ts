import { conn } from "../db/client";
import { randomToken, sha256Hex } from "../crypto";
import { getUserById, publicUser, touchActive, type User } from "../store/users";
import { s } from "../store/util";

/**
 * Server-side sessions. The browser holds only a random token in an HttpOnly cookie; the database holds its SHA-256,
 * so a database leak does not yield usable cookies. Logout, password change and "disable contributor" delete rows,
 * which revokes access immediately (unlike a stateless JWT).
 */
export const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // absolute lifetime
export const SESSION_IDLE_MS = 12 * 60 * 60 * 1000; // sliding inactivity limit
const TOUCH_EVERY_MS = 5 * 60 * 1000;

export type ResolvedSession = { user: User; sessionHash: string };

export async function createSession(userId: string, userAgent: string): Promise<{ token: string; expiresAt: Date }> {
  const db = await conn();
  const token = randomToken(32);
  const now = new Date();
  const expiresAt = new Date(now.getTime() + SESSION_TTL_MS);
  await db.execute({
    sql: "INSERT INTO sessions(id_hash, user_id, created_at, last_seen_at, expires_at, user_agent) VALUES (?, ?, ?, ?, ?, ?)",
    args: [await sha256Hex(token), userId, now.toISOString(), now.toISOString(), expiresAt.toISOString(), userAgent.slice(0, 200)],
  });
  if (Math.random() < 0.05) await db.execute({ sql: "DELETE FROM sessions WHERE expires_at < ?", args: [now.toISOString()] }).catch(() => {});
  return { token, expiresAt };
}

export async function resolveSession(token: string | undefined): Promise<ResolvedSession | null> {
  if (!token || token.length < 20 || token.length > 100) return null;
  const db = await conn();
  const hash = await sha256Hex(token);
  const r = await db.execute({ sql: "SELECT user_id, last_seen_at, expires_at FROM sessions WHERE id_hash = ?", args: [hash] });
  const row = r.rows[0];
  if (!row) return null;
  const now = Date.now();
  const expired = new Date(s(row.expires_at)).getTime() <= now;
  const idle = now - new Date(s(row.last_seen_at)).getTime() > SESSION_IDLE_MS;
  if (expired || idle) {
    await db.execute({ sql: "DELETE FROM sessions WHERE id_hash = ?", args: [hash] });
    return null;
  }
  const user = await getUserById(s(row.user_id));
  if (!user || user.disabled) return null;
  if (now - new Date(s(row.last_seen_at)).getTime() > TOUCH_EVERY_MS) {
    await db.execute({ sql: "UPDATE sessions SET last_seen_at = ? WHERE id_hash = ?", args: [new Date(now).toISOString(), hash] });
    await touchActive(user.id);
  }
  return { user: publicUser(user), sessionHash: hash };
}

export async function destroySession(token: string | undefined): Promise<void> {
  if (!token) return;
  const db = await conn();
  await db.execute({ sql: "DELETE FROM sessions WHERE id_hash = ?", args: [await sha256Hex(token)] });
}

/** After a password change every other device is signed out. */
export async function destroyOtherSessions(userId: string, keepHash: string | null): Promise<void> {
  const db = await conn();
  await db.execute({ sql: "DELETE FROM sessions WHERE user_id = ? AND id_hash <> ?", args: [userId, keepHash ?? ""] });
}
