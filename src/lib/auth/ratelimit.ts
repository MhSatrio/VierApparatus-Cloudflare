import { conn } from "../db/client";

export type Limit = { ok: boolean; remaining: number; retryAfter: number };

/**
 * Durable fixed-window limiter stored in the database, so limits hold across every serverless instance and across
 * both deployments. One atomic upsert per call.
 */
export async function hit(key: string, limit: number, windowSec: number): Promise<Limit> {
  const db = await conn();
  const now = Math.floor(Date.now() / 1000);
  const r = await db.execute({
    sql: `INSERT INTO rate_limits(key, count, reset_at) VALUES (?, 1, ?)
          ON CONFLICT(key) DO UPDATE SET
            count = CASE WHEN reset_at <= ? THEN 1 ELSE count + 1 END,
            reset_at = CASE WHEN reset_at <= ? THEN ? ELSE reset_at END
          RETURNING count, reset_at`,
    args: [key, now + windowSec, now, now, now + windowSec],
  });
  const count = Number(r.rows[0].count);
  const resetAt = Number(r.rows[0].reset_at);
  if (Math.random() < 0.02) await db.execute({ sql: "DELETE FROM rate_limits WHERE reset_at < ?", args: [now - 3600] }).catch(() => {});
  return { ok: count <= limit, remaining: Math.max(0, limit - count), retryAfter: Math.max(1, resetAt - now) };
}

export async function clear(key: string): Promise<void> {
  const db = await conn();
  await db.execute({ sql: "DELETE FROM rate_limits WHERE key = ?", args: [key] });
}
