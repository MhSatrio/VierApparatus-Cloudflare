import { conn } from "../db/client";
import { authSecret, hmacHex } from "../crypto";
import { likePattern, n, s, type Row } from "./util";

/**
 * First-party, cookieless analytics. No IP address is stored: the visitor id is a keyed hash of IP + browser + the DAY, so
 * it cannot be linked across days or reversed, and needs no consent banner. The trade-off is that "unique visitors" counts a
 * returning visitor once per day. Country (and city when the host provides it) come from the platform's edge headers.
 */

export const EVENT_TYPES = ["pageview", "engage"] as const;
export type EventType = (typeof EVENT_TYPES)[number];

export type EventInput = {
  type: EventType;
  path: string;
  sessionId: string;
  referrer: string;
  utm: { source: string; medium: string; campaign: string; content: string; term: string };
  country: string;
  city: string;
  device: string;
  browser: string;
  landing: boolean;
  durationMs: number | null;
  scrollPct: number | null;
  ip: string;
  userAgent: string;
};

const clip = (v: string, max: number) => v.replace(/[\u0000-\u001F\u007F]/g, " ").trim().slice(0, max);

export function deviceOf(ua: string): string {
  if (/ipad|tablet|kindle|playbook|silk|(android(?!.*mobile))/i.test(ua)) return "Tablet";
  if (/mobi|iphone|ipod|android.*mobile|windows phone/i.test(ua)) return "Mobile";
  return "Desktop";
}

export function browserOf(ua: string): string {
  if (/edg\//i.test(ua)) return "Edge";
  if (/opr\/|opera/i.test(ua)) return "Opera";
  if (/firefox|fxios/i.test(ua)) return "Firefox";
  if (/chrome|crios/i.test(ua)) return "Chrome";
  if (/safari/i.test(ua)) return "Safari";
  return "Other";
}

export function referrerHost(referrer: string, ownHost: string): string {
  try {
    const h = new URL(referrer).hostname.replace(/^www\./, "");
    return h === ownHost.replace(/^www\./, "") ? "" : h;
  } catch {
    return "";
  }
}

export async function dailyVisitorId(ip: string, userAgent: string, day = new Date().toISOString().slice(0, 10)): Promise<string> {
  return (await hmacHex(authSecret(), `visitor:${day}:${ip}:${userAgent}`)).slice(0, 16);
}

export async function recordEvent(e: EventInput, ownHost: string): Promise<void> {
  const db = await conn();
  const visitor = await dailyVisitorId(e.ip, e.userAgent);
  await db.execute({
    sql: `INSERT INTO events(ts, visitor_id, session_id, type, path, landing, referrer, referrer_host, utm_source, utm_medium, utm_campaign, utm_content, utm_term,
            country, city, device, browser, duration_ms, scroll_pct) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      new Date().toISOString(), visitor, clip(e.sessionId, 32), e.type, clip(e.path, 300), e.landing ? 1 : 0, clip(e.referrer, 300), referrerHost(e.referrer, ownHost),
      clip(e.utm.source, 80), clip(e.utm.medium, 80), clip(e.utm.campaign, 120), clip(e.utm.content, 120), clip(e.utm.term, 120),
      clip(e.country, 2).toUpperCase(), clip(e.city, 80), clip(e.device, 20), clip(e.browser, 20),
      e.durationMs == null ? null : Math.min(Math.max(Math.round(e.durationMs), 0), 6 * 3600_000),
      e.scrollPct == null ? null : Math.min(Math.max(Math.round(e.scrollPct), 0), 100),
    ],
  });
  // Housekeeping (about once per 500 writes): raw events older than 90 days are deleted, but only for days that were already
  // summarised into analytics_daily, so history is never lost before it has been rolled up.
  if (Math.random() < 0.002) {
    const cut = new Date(Date.now() - 90 * 86400_000).toISOString();
    await db.execute({ sql: "DELETE FROM events WHERE ts < ? AND substr(ts, 1, 10) IN (SELECT day FROM analytics_daily)", args: [cut] }).catch(() => {});
  }
}

/** Counts one bot request for today. Only a daily number is kept: no path, address or user agent is written. */
export async function recordBotHit(day = new Date().toISOString().slice(0, 10)): Promise<void> {
  const db = await conn();
  await db.execute({ sql: "INSERT INTO bot_daily(day, hits) VALUES (?, 1) ON CONFLICT(day) DO UPDATE SET hits = hits + 1", args: [day] });
}

/** Bot requests for the UTC days from fromDay (inclusive) to toDay (inclusive). */
export async function botHitsBetween(fromDay: string, toDay: string): Promise<number> {
  const db = await conn();
  const r = await db.execute({ sql: "SELECT COALESCE(SUM(hits), 0) AS c FROM bot_daily WHERE day >= ? AND day <= ?", args: [fromDay, toDay] });
  return n(r.rows[0].c);
}

// ---------------------------------------------------------------- queries

export type Range = { from: string; to: string }; // ISO timestamps, from inclusive, to exclusive

/** "2026-11-01".."2026-11-07" (inclusive days, UTC) -> timestamps. Falls back to the last 30 days. */
export function rangeFromDays(fromDay?: string | null, toDay?: string | null, now = new Date()): Range & { fromDay: string; toDay: string } {
  const valid = (d?: string | null) => (d && /^\d{4}-\d{2}-\d{2}$/.test(d) && !Number.isNaN(Date.parse(d)) ? d : null);
  const to = valid(toDay) ?? now.toISOString().slice(0, 10);
  const from = valid(fromDay) ?? new Date(Date.parse(to) - 29 * 86400_000).toISOString().slice(0, 10);
  const [a, b] = from <= to ? [from, to] : [to, from];
  return { fromDay: a, toDay: b, from: `${a}T00:00:00.000Z`, to: new Date(Date.parse(b) + 86400_000).toISOString() };
}

const PV = "type = 'pageview'";

export type RecentVisit = { ts: string; path: string; country: string; device: string; source: string };

export async function recent(limit = 12): Promise<RecentVisit[]> {
  const db = await conn();
  const res = await db.execute({
    sql: `SELECT ts, path, country, device, CASE WHEN utm_source <> '' THEN utm_source WHEN referrer_host <> '' THEN referrer_host ELSE 'direct' END AS source
          FROM events WHERE ${PV} ORDER BY id DESC LIMIT ?`,
    args: [limit],
  });
  return res.rows.map((x) => ({ ts: s(x.ts), path: s(x.path), country: s(x.country), device: s(x.device), source: s(x.source) }));
}

// ---------------------------------------------------------------- the Airtable-style table

export const TABLE_COLUMNS = [
  "visitor", "date", "time", "country", "city", "page", "referrer", "source", "medium", "campaign", "content", "term", "device", "browser", "landing", "duration", "events",
] as const;
export type TableColumn = (typeof TABLE_COLUMNS)[number];

const SORTABLE: Record<string, string> = {
  date: "e.ts", time: "e.ts", country: "e.country", city: "e.city", page: "e.path", referrer: "e.referrer_host", source: "e.utm_source",
  medium: "e.utm_medium", campaign: "e.utm_campaign", device: "e.device", browser: "e.browser", visitor: "e.visitor_id",
};

/** Counting stops here: an exact total over a huge range would cost a full scan on every page of the table. */
export const COUNT_CAP = 10_000;

export type TableQuery = Range & { q?: string; country?: string; device?: string; source?: string; sort?: string; dir?: "asc" | "desc"; page?: number; perPage?: number };

export type TableRow = {
  visitor: string; date: string; time: string; country: string; city: string; page: string; referrer: string; source: string; medium: string;
  campaign: string; content: string; term: string; device: string; browser: string; landing: string; duration: number | null; events: number;
};

function tableWhere(q: TableQuery) {
  const where = ["e.type = 'pageview'", "e.ts >= ?", "e.ts < ?"];
  const args: (string | number)[] = [q.from, q.to];
  if (q.country) { where.push("e.country = ?"); args.push(q.country.toUpperCase().slice(0, 2)); }
  if (q.device) { where.push("e.device = ?"); args.push(q.device); }
  if (q.source) { where.push("(e.utm_source = ? OR e.referrer_host = ?)"); args.push(q.source, q.source); }
  const text = q.q?.trim().slice(0, 80);
  if (text) {
    where.push("(e.path LIKE ? ESCAPE '\\' OR e.referrer LIKE ? ESCAPE '\\' OR e.utm_campaign LIKE ? ESCAPE '\\' OR e.utm_source LIKE ? ESCAPE '\\' OR e.visitor_id LIKE ? ESCAPE '\\')");
    const p = likePattern(text);
    args.push(p, p, p, p, p);
  }
  return { cond: where.join(" AND "), args };
}

export async function visitTable(q: TableQuery, maxPerPage = 200): Promise<{ rows: TableRow[]; total: number; page: number; pageCount: number; capped: boolean }> {
  const db = await conn();
  const perPage = Math.min(Math.max(q.perPage ?? 25, 1), maxPerPage);
  const { cond, args } = tableWhere(q);
  const total = n((await db.execute({ sql: `SELECT COUNT(*) AS c FROM (SELECT 1 FROM events e WHERE ${cond} LIMIT ${COUNT_CAP + 1})`, args })).rows[0].c);
  const pageCount = Math.max(1, Math.ceil(total / perPage));
  const page = Math.min(Math.max(q.page ?? 1, 1), pageCount);
  const col = SORTABLE[q.sort ?? ""] ?? "e.ts";
  const dir = q.dir === "asc" ? "ASC" : "DESC";
  const res = await db.execute({ sql: `SELECT e.* FROM events e WHERE ${cond} ORDER BY ${col} ${dir}, e.id ${dir} LIMIT ? OFFSET ?`, args: [...args, perPage, (page - 1) * perPage] });

  // Session details for just this page of rows: how long the visit lasted and how many interactions it recorded.
  const sessions = [...new Set(res.rows.map((x) => s(x.session_id)))];
  const info = new Map<string, { first: string; last: string; engaged: number; events: number }>();
  if (sessions.length) {
    const marks = sessions.map(() => "?").join(",");
    const agg = await db.execute({
      sql: `SELECT session_id, MIN(ts) AS first, MAX(ts) AS last, COUNT(*) AS events, SUM(CASE WHEN type = 'engage' THEN COALESCE(duration_ms, 0) ELSE 0 END) AS engaged
            FROM events WHERE session_id IN (${marks}) GROUP BY session_id`,
      args: sessions,
    });
    for (const a of agg.rows) info.set(s(a.session_id), { first: s(a.first), last: s(a.last), engaged: n(a.engaged), events: n(a.events) });
  }
  const rows: TableRow[] = res.rows.map((x: Row) => {
    const sess = info.get(s(x.session_id));
    const span = sess ? Date.parse(sess.last) - Date.parse(sess.first) : 0;
    const ts = s(x.ts);
    return {
      visitor: s(x.visitor_id), date: ts.slice(0, 10), time: ts.slice(11, 19), country: s(x.country), city: s(x.city), page: s(x.path),
      referrer: s(x.referrer_host) || s(x.referrer), source: s(x.utm_source), medium: s(x.utm_medium), campaign: s(x.utm_campaign),
      content: s(x.utm_content), term: s(x.utm_term), device: s(x.device), browser: s(x.browser), landing: n(x.landing) ? "yes" : "",
      duration: sess ? Math.round(Math.max(span, sess.engaged) / 1000) : null, events: sess?.events ?? 1,
    };
  });
  return { rows, total: Math.min(total, COUNT_CAP), page, pageCount, capped: total > COUNT_CAP };
}

const csvCell = (v: unknown) => {
  let t = v == null ? "" : String(v);
  // Neutralise spreadsheet formulas ("=", "+", "-", "@") coming from visitor-controlled text.
  if (/^[=+\-@\t\r]/.test(t)) t = `'${t}`;
  return /[",\n\r]/.test(t) ? `"${t.replace(/"/g, '""')}"` : t;
};

/** CSV of the same filtered rows (newest 2,000). One query: no IP addresses exist in the data. */
export async function exportCsv(q: TableQuery, columns: readonly TableColumn[] = TABLE_COLUMNS): Promise<string> {
  const r = await visitTable({ ...q, page: 1, perPage: 2000 }, 2000);
  const lines: string[] = [columns.join(",")];
  for (const row of r.rows) lines.push(columns.map((c) => csvCell(row[c])).join(","));
  return lines.join("\n") + "\n";
}
