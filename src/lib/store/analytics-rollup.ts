import { conn } from "../db/client";
import { n, nowIso, s } from "./util";
import { botHitsBetween, type Range } from "./analytics";

/**
 * Daily roll-ups. Turso bills "rows read" as rows SCANNED, so re-aggregating the raw `events` table for every dashboard view
 * would burn the free allowance (a few hundred views at 5,000 visitors/day). Instead a finished day is summarised ONCE, lazily,
 * the first time a dashboard needs it (no scheduled job, no background work), and later views read ~30 small rows. Only
 * "today" is aggregated live from the (small) slice of raw events since midnight UTC.
 * Unique visitors are counted per day and summed, matching the cookieless, day-scoped visitor id.
 */
export type Counts = Record<string, number>;
export type Campaign = { campaign: string; source: string; medium: string; visits: number };

export type DayData = {
  pv: number;
  visitors: number;
  sessions: number;
  articleViews: number;
  engageMs: number;
  engageN: number;
  paths: Counts;
  articles: Counts;
  referrers: Counts;
  countries: Counts;
  devices: Counts;
  sources: Counts;
  campaigns: Campaign[];
};

const PV = "type = 'pageview'";
const TOP = 40;

const toCounts = (rows: { label: unknown; c: unknown }[]): Counts => Object.fromEntries(rows.map((r) => [s(r.label), n(r.c)]));

/** Aggregates one UTC day of raw events: a single read-only batch (one subrequest) of small grouped queries. */
export async function computeDay(day: string): Promise<DayData> {
  const db = await conn();
  const from = `${day}T00:00:00.000Z`;
  const to = new Date(Date.parse(from) + 86_400_000).toISOString();
  const a = [from, to];
  const [tot, paths, arts, refs, ctry, dev, src, camp, eng] = await db.batch(
    [
      { sql: `SELECT COUNT(*) AS pv, COUNT(DISTINCT visitor_id) AS v, COUNT(DISTINCT session_id) AS sess, SUM(CASE WHEN path LIKE '/articles/_%' THEN 1 ELSE 0 END) AS av FROM events WHERE ${PV} AND ts >= ? AND ts < ?`, args: a },
      { sql: `SELECT path AS label, COUNT(*) AS c FROM events WHERE ${PV} AND ts >= ? AND ts < ? GROUP BY path ORDER BY c DESC LIMIT ${TOP}`, args: a },
      { sql: `SELECT path AS label, COUNT(*) AS c FROM events WHERE ${PV} AND path LIKE '/articles/_%' AND ts >= ? AND ts < ? GROUP BY path ORDER BY c DESC LIMIT ${TOP}`, args: a },
      { sql: `SELECT referrer_host AS label, COUNT(*) AS c FROM events WHERE ${PV} AND referrer_host <> '' AND ts >= ? AND ts < ? GROUP BY referrer_host ORDER BY c DESC LIMIT ${TOP}`, args: a },
      { sql: `SELECT CASE WHEN country = '' THEN 'Unknown' ELSE country END AS label, COUNT(DISTINCT visitor_id) AS c FROM events WHERE ${PV} AND ts >= ? AND ts < ? GROUP BY label ORDER BY c DESC LIMIT ${TOP}`, args: a },
      { sql: `SELECT device AS label, COUNT(DISTINCT visitor_id) AS c FROM events WHERE ${PV} AND device <> '' AND ts >= ? AND ts < ? GROUP BY device ORDER BY c DESC LIMIT 6`, args: a },
      { sql: `SELECT CASE WHEN utm_source <> '' THEN utm_source WHEN referrer_host <> '' THEN referrer_host ELSE 'direct' END AS label, COUNT(*) AS c FROM events WHERE ${PV} AND landing = 1 AND ts >= ? AND ts < ? GROUP BY label ORDER BY c DESC LIMIT ${TOP}`, args: a },
      { sql: `SELECT utm_campaign, utm_source, utm_medium, COUNT(*) AS c FROM events WHERE ${PV} AND landing = 1 AND utm_campaign <> '' AND ts >= ? AND ts < ? GROUP BY utm_campaign, utm_source, utm_medium ORDER BY c DESC LIMIT ${TOP}`, args: a },
      { sql: `SELECT COALESCE(SUM(duration_ms), 0) AS ms, COUNT(*) AS c FROM events WHERE type = 'engage' AND duration_ms IS NOT NULL AND ts >= ? AND ts < ?`, args: a },
    ],
    "read",
  );
  const t = tot.rows[0];
  return {
    pv: n(t.pv),
    visitors: n(t.v),
    sessions: n(t.sess),
    articleViews: n(t.av),
    engageMs: n(eng.rows[0].ms),
    engageN: n(eng.rows[0].c),
    paths: toCounts(paths.rows as never),
    articles: toCounts(arts.rows as never),
    referrers: toCounts(refs.rows as never),
    countries: toCounts(ctry.rows as never),
    devices: toCounts(dev.rows as never),
    sources: toCounts(src.rows as never),
    campaigns: camp.rows.map((x) => ({ campaign: s(x.utm_campaign), source: s(x.utm_source), medium: s(x.utm_medium), visits: n(x.c) })),
  };
}

const emptyDay = (): DayData => ({ pv: 0, visitors: 0, sessions: 0, articleViews: 0, engageMs: 0, engageN: 0, paths: {}, articles: {}, referrers: {}, countries: {}, devices: {}, sources: {}, campaigns: [] });

const daysBetween = (r: Range): string[] => {
  const out: string[] = [];
  for (let t = Date.parse(r.from); t < Date.parse(r.to) && out.length < 400; t += 86_400_000) out.push(new Date(t).toISOString().slice(0, 10));
  return out;
};

/** At most this many missing days are summarised per request, to keep one page view cheap (a Worker allows 50 subrequests). */
export const MAX_ROLLUPS_PER_REQUEST = 8;

export type Overview = {
  days: { day: string; pageViews: number; visitors: number }[];
  /** botHits: automated requests filtered out for the same days. They are not part of any other figure. */
  summary: { pageViews: number; visitors: number; sessions: number; articleViews: number; avgEngagedSeconds: number | null; hasData: boolean; botHits: number };
  topArticles: { label: string; count: number }[];
  topPages: { label: string; count: number }[];
  referrers: { label: string; count: number }[];
  countries: { label: string; count: number }[];
  devices: { label: string; count: number }[];
  sources: { label: string; count: number }[];
  campaigns: Campaign[];
  /** Days that still had to be summarised later (only right after this feature is first used). */
  pendingDays: number;
};

const top = (c: Counts, limit: number) => Object.entries(c).sort((x, y) => y[1] - x[1] || x[0].localeCompare(y[0])).slice(0, limit).map(([label, count]) => ({ label, count }));

function merge(days: DayData[]) {
  const sum = (k: "paths" | "articles" | "referrers" | "countries" | "devices" | "sources") => {
    const out: Counts = {};
    for (const d of days) for (const [key, v] of Object.entries(d[k])) out[key] = (out[key] ?? 0) + v;
    return out;
  };
  const camp = new Map<string, Campaign>();
  for (const d of days) for (const c of d.campaigns) {
    const key = `${c.campaign}|${c.source}|${c.medium}`;
    const cur = camp.get(key);
    if (cur) cur.visits += c.visits;
    else camp.set(key, { ...c });
  }
  return { sum, campaigns: [...camp.values()].sort((a, b) => b.visits - a.visits).slice(0, 10) };
}

/** Everything the dashboard and analytics pages need for a date range, from roll-ups plus a live slice for today. */
export async function overview(r: Range): Promise<Overview> {
  const db = await conn();
  const today = new Date().toISOString().slice(0, 10);
  const wanted = daysBetween(r);
  const past = wanted.filter((d) => d < today);
  const stored = new Map<string, DayData>();
  if (past.length) {
    const rows = await db.execute({ sql: `SELECT day, data FROM analytics_daily WHERE day IN (${past.map(() => "?").join(",")})`, args: past });
    for (const x of rows.rows) {
      try {
        stored.set(s(x.day), JSON.parse(s(x.data)) as DayData);
      } catch {
        /* recomputed below */
      }
    }
  }
  const missing = past.filter((d) => !stored.has(d));
  const todo = missing.slice(-MAX_ROLLUPS_PER_REQUEST); // newest first: they matter most
  for (const d of todo) {
    const data = await computeDay(d);
    stored.set(d, data);
    await db.execute({ sql: "INSERT INTO analytics_daily(day, data, computed_at) VALUES (?, ?, ?) ON CONFLICT(day) DO UPDATE SET data = excluded.data, computed_at = excluded.computed_at", args: [d, JSON.stringify(data), nowIso()] });
  }
  const live = wanted.includes(today) ? await computeDay(today) : null;

  const perDay = wanted.map((d) => (d === today ? live! : (stored.get(d) ?? emptyDay())));
  const m = merge(perDay);
  const pv = perDay.reduce((a, d) => a + d.pv, 0);
  const engMs = perDay.reduce((a, d) => a + d.engageMs, 0);
  const engN = perDay.reduce((a, d) => a + d.engageN, 0);
  const botHits = wanted.length ? await botHitsBetween(wanted[0], wanted[wanted.length - 1]) : 0;
  return {
    days: wanted.map((d, i) => ({ day: d, pageViews: perDay[i].pv, visitors: perDay[i].visitors })),
    summary: {
      pageViews: pv,
      visitors: perDay.reduce((a, d) => a + d.visitors, 0),
      sessions: perDay.reduce((a, d) => a + d.sessions, 0),
      articleViews: perDay.reduce((a, d) => a + d.articleViews, 0),
      avgEngagedSeconds: engN ? Math.round(engMs / engN / 1000) : null,
      hasData: pv > 0,
      botHits,
    },
    topArticles: top(m.sum("articles"), 8),
    topPages: top(m.sum("paths"), 10),
    referrers: top(m.sum("referrers"), 8),
    countries: top(m.sum("countries"), 10),
    devices: top(m.sum("devices"), 5),
    sources: top(m.sum("sources"), 8),
    campaigns: m.campaigns.slice(0, 8),
    pendingDays: missing.length - todo.length,
  };
}
