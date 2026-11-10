import { conn } from "../db/client";
import { n } from "./util";

/**
 * A cheap, read-only picture of how much of the free database allowance this site uses, for the owner's Settings page.
 * Every query here is O(1) or touches a small table: counting the raw `events` table would itself consume the "rows read"
 * allowance it is meant to protect, so its size is derived from the auto-increment id range instead.
 * These are ESTIMATES: the provider's own dashboard is the source of truth for billing and quotas.
 */
export const FREE_LIMITS = {
  storageBytes: 5 * 1024 * 1024 * 1024, // Turso Free: 5 GB
  rowsWrittenPerMonth: 10_000_000, // Turso Free: 10 million rows written / month
} as const;

export type UsageLevel = "ok" | "watch" | "high";
export const levelOf = (ratio: number): UsageLevel => (ratio >= 0.9 ? "high" : ratio >= 0.7 ? "watch" : "ok");

export type Usage = {
  dbBytes: number | null;
  storageRatio: number | null;
  eventsThisMonth: number;
  writesEstimate: number;
  writesRatio: number;
  tables: { name: string; rows: number }[];
  oldestEvent: string | null;
};

const SMALL_TABLES = ["articles", "article_revisions", "planner_records", "comments", "activity", "users", "media", "submissions", "inquiries"] as const;

export async function usage(now = new Date()): Promise<Usage> {
  const db = await conn();
  const monthStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString();

  let dbBytes: number | null = null;
  try {
    const [pc, ps] = await db.batch([{ sql: "PRAGMA page_count", args: [] }, { sql: "PRAGMA page_size", args: [] }], "read");
    const bytes = n(Object.values(pc.rows[0] ?? {})[0]) * n(Object.values(ps.rows[0] ?? {})[0]);
    dbBytes = bytes > 0 ? bytes : null;
  } catch {
    dbBytes = null; // some hosted plans do not expose PRAGMAs; the panel then just omits the size
  }

  const [range, counts] = await Promise.all([
    db.execute({ sql: "SELECT (SELECT MIN(id) FROM events WHERE ts >= ?) AS first_id, (SELECT MAX(id) FROM events) AS last_id, (SELECT MIN(ts) FROM events) AS oldest", args: [monthStart] }),
    Promise.all(SMALL_TABLES.map((t) => db.execute(`SELECT COUNT(*) AS c FROM ${t}`).then((r) => ({ name: t as string, rows: n(r.rows[0].c) })).catch(() => ({ name: t as string, rows: 0 })))),
  ]);
  const first = range.rows[0]?.first_id;
  const last = range.rows[0]?.last_id;
  const eventsThisMonth = first == null || last == null ? 0 : Math.max(0, n(last) - n(first) + 1);
  const others = counts.reduce((a, t) => a + t.rows, 0);
  const writesEstimate = eventsThisMonth + Math.min(others, 100_000); // pages views dominate; editorial writes are a rounding error

  return {
    dbBytes,
    storageRatio: dbBytes == null ? null : dbBytes / FREE_LIMITS.storageBytes,
    eventsThisMonth,
    writesEstimate,
    writesRatio: writesEstimate / FREE_LIMITS.rowsWrittenPerMonth,
    tables: counts.filter((t) => t.rows > 0),
    oldestEvent: range.rows[0]?.oldest ? String(range.rows[0].oldest) : null,
  };
}
