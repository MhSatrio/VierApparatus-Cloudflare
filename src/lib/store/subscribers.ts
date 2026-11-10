import { z } from "zod";
import { conn } from "../db/client";
import { newId, randomToken, sha256Hex } from "../crypto";
import { csvCell } from "../csv";
import { n, nowIso, s, sn, type Row } from "./util";

/**
 * Newsletter subscribers with double opt-in: a sign-up is pending until the person clicks the link in the confirmation e-mail.
 * Only active subscribers receive newsletters. Tokens (confirmation and unsubscribe) are random and stored as hashes.
 * Imported people are stored as pending until the owner sends them an invitation to confirm; the owner must confirm in the
 * import dialog that they agreed to be contacted.
 */

export const SUB_STATUS = ["pending", "active", "unsubscribed"] as const;
export type SubStatus = (typeof SUB_STATUS)[number];
export const CONFIRM_TTL_MS = 7 * 24 * 3600 * 1000;
export const IMPORT_MAX_ROWS = 500;

export type Subscriber = {
  id: string;
  email: string;
  name: string;
  interests: string[];
  status: SubStatus;
  source: string;
  consentAt: string | null;
  confirmedAt: string | null;
  unsubscribedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const normalizeEmail = (e: string) => e.trim().toLowerCase();
export const isValidEmail = (e: string) => e.length <= 254 && EMAIL.test(e);

const emailField = z
  .string()
  .trim()
  .max(254)
  .transform(normalizeEmail)
  .refine(isValidEmail, "Enter a valid e-mail address");
const interestsField = z.array(z.string().trim().min(1).max(60)).max(20).default([]);

/** Public sign-up. `consent` must be true: the checkbox is never pre-ticked. `website` is a hidden field that bots fill in. */
export const subscribeInput = z.object({
  email: emailField,
  name: z.string().trim().max(80).default(""),
  interests: interestsField,
  consent: z.literal(true, { message: "Please tick the box to agree before subscribing." }),
  website: z.string().max(200).optional(),
});

export const adminUpdateInput = z.object({
  name: z.string().trim().max(80),
  interests: interestsField,
  status: z.enum(SUB_STATUS),
});

const toSubscriber = (r: Row): Subscriber => ({
  id: s(r.id),
  email: s(r.email),
  name: s(r.name),
  interests: parseInterests(r.interests),
  status: s(r.status) as SubStatus,
  source: s(r.source),
  consentAt: sn(r.consent_at),
  confirmedAt: sn(r.confirmed_at),
  unsubscribedAt: sn(r.unsubscribed_at),
  createdAt: s(r.created_at),
  updatedAt: s(r.updated_at),
});

function parseInterests(v: unknown): string[] {
  try {
    const a = JSON.parse(s(v) || "[]");
    return Array.isArray(a) ? a.map(String).slice(0, 20) : [];
  } catch {
    return [];
  }
}

/**
 * Starts a sign-up. An address that is already active is left alone (the reply is the same either way, so the form can not be
 * used to find out who is subscribed). Otherwise a fresh confirmation link is issued and the caller e-mails it.
 * Interests are kept only if they are topics the site really has.
 */
export async function requestSubscription(
  input: z.infer<typeof subscribeInput>,
  opts: { source: string; allowedInterests: string[] },
): Promise<{ token: string; email: string; name: string } | null> {
  const allowed = new Set(opts.allowedInterests);
  const interests = [...new Set(input.interests.filter((i) => allowed.has(i)))].slice(0, 20);
  const db = await conn();
  const existing = (await db.execute({ sql: "SELECT id, status FROM subscribers WHERE email = ?", args: [input.email] })).rows[0];
  if (existing && s(existing.status) === "active") return null;
  const token = randomToken(32);
  const hash = await sha256Hex(token);
  const expires = new Date(Date.now() + CONFIRM_TTL_MS).toISOString();
  const t = nowIso();
  if (existing) {
    await db.execute({
      sql: "UPDATE subscribers SET name = ?, interests = ?, status = 'pending', source = ?, consent_at = ?, confirm_hash = ?, confirm_expires_at = ?, unsubscribed_at = NULL, updated_at = ? WHERE email = ?",
      args: [input.name, JSON.stringify(interests), opts.source, t, hash, expires, t, input.email],
    });
  } else {
    await db.execute({
      sql: `INSERT INTO subscribers(id, email, name, interests, status, source, consent_at, confirm_hash, confirm_expires_at, unsubscribe_hash, created_at, updated_at)
            VALUES (?, ?, ?, ?, 'pending', ?, ?, ?, ?, ?, ?, ?)`,
      args: [newId("sb_"), input.email, input.name, JSON.stringify(interests), opts.source, t, hash, expires, await sha256Hex(randomToken(32)), t, t],
    });
  }
  return { token, email: input.email, name: input.name };
}

/** Confirms a pending sign-up. Returns the subscriber, or null for an unknown, used or expired link. */
export async function confirmSubscription(token: string): Promise<Subscriber | null> {
  if (!token || token.length > 200) return null;
  const db = await conn();
  const hash = await sha256Hex(token);
  const r = (await db.execute({ sql: "SELECT * FROM subscribers WHERE confirm_hash = ? AND status = 'pending'", args: [hash] })).rows[0];
  if (!r) return null;
  if (!sn(r.confirm_expires_at) || new Date(s(r.confirm_expires_at)).getTime() < Date.now()) return null;
  const t = nowIso();
  await db.execute({
    sql: "UPDATE subscribers SET status = 'active', confirmed_at = ?, confirm_hash = NULL, confirm_expires_at = NULL, updated_at = ? WHERE id = ? AND confirm_hash = ?",
    args: [t, t, s(r.id), hash],
  });
  return getSubscriber(s(r.id));
}

/** The unsubscribe link in every newsletter. Works for any state; unsubscribed people are never mailed again. */
export async function unsubscribeByToken(token: string): Promise<Subscriber | null> {
  if (!token || token.length > 200) return null;
  const db = await conn();
  const hash = await sha256Hex(token);
  const r = (await db.execute({ sql: "SELECT id FROM subscribers WHERE unsubscribe_hash = ?", args: [hash] })).rows[0];
  if (!r) return null;
  const t = nowIso();
  await db.execute({ sql: "UPDATE subscribers SET status = 'unsubscribed', unsubscribed_at = ?, updated_at = ? WHERE id = ?", args: [t, t, s(r.id)] });
  return getSubscriber(s(r.id));
}

/** Gives an active or pending subscriber a fresh unsubscribe link (used in each newsletter). Returns the token once. */
export async function issueUnsubscribeToken(id: string): Promise<string> {
  const token = randomToken(32);
  const db = await conn();
  await db.execute({ sql: "UPDATE subscribers SET unsubscribe_hash = ? WHERE id = ?", args: [await sha256Hex(token), id] });
  return token;
}

export async function getSubscriber(id: string): Promise<Subscriber | null> {
  const db = await conn();
  const r = (await db.execute({ sql: "SELECT * FROM subscribers WHERE id = ?", args: [id] })).rows[0];
  return r ? toSubscriber(r) : null;
}

export type SubscriberQuery = { q?: string; status?: SubStatus; interest?: string; sort?: "email" | "name" | "status" | "created"; dir?: "asc" | "desc"; limit?: number; offset?: number };

/** One page of subscribers plus the counts for the header, in one round trip. Search is on e-mail and name. */
export async function listSubscribers(query: SubscriberQuery = {}): Promise<{ items: Subscriber[]; total: number; counts: Record<SubStatus, number> }> {
  const where: string[] = ["1 = 1"];
  const args: (string | number)[] = [];
  const q = query.q?.trim().slice(0, 80);
  if (q) {
    where.push("(email LIKE ? ESCAPE '\\' OR name LIKE ? ESCAPE '\\')");
    const like = `%${q.replace(/[\\%_]/g, (c) => `\\${c}`)}%`;
    args.push(like, like);
  }
  if (query.status && (SUB_STATUS as readonly string[]).includes(query.status)) {
    where.push("status = ?");
    args.push(query.status);
  }
  if (query.interest) {
    // The interests are stored as a JSON array of plain strings, so this matches the quoted name exactly.
    where.push("interests LIKE ? ESCAPE '\\'");
    args.push(`%${JSON.stringify(query.interest).slice(1, -1).replace(/[\\%_]/g, (c) => `\\${c}`)}%`);
  }
  const order = { email: "email", name: "name COLLATE NOCASE", status: "status", created: "created_at" }[query.sort ?? "created"];
  const cond = where.join(" AND ");
  const db = await conn();
  const limit = Math.min(Math.max(query.limit ?? 200, 1), 500);
  const [page, total, counts] = await db.batch(
    [
      { sql: `SELECT * FROM subscribers WHERE ${cond} ORDER BY ${order} ${query.dir === "asc" ? "ASC" : "DESC"}, id LIMIT ? OFFSET ?`, args: [...args, limit, query.offset ?? 0] },
      { sql: `SELECT COUNT(*) AS c FROM subscribers WHERE ${cond}`, args },
      { sql: "SELECT status, COUNT(*) AS c FROM subscribers GROUP BY status", args: [] },
    ],
    "read",
  );
  const byStatus: Record<SubStatus, number> = { pending: 0, active: 0, unsubscribed: 0 };
  for (const r of counts.rows) byStatus[s(r.status) as SubStatus] = n(r.c);
  return { items: page.rows.map(toSubscriber), total: n(total.rows[0].c), counts: byStatus };
}

/** Every interest that is used by at least one subscriber (for the filter list). */
export async function usedInterests(): Promise<string[]> {
  const db = await conn();
  const r = await db.execute("SELECT interests FROM subscribers");
  const set = new Set<string>();
  for (const row of r.rows) for (const i of parseInterests(row.interests)) set.add(i);
  return [...set].sort((a, b) => a.localeCompare(b));
}

/** Owner edit. The owner may keep any interest label that is already on the record, so no topic check is applied here. */
export async function updateSubscriber(id: string, input: z.input<typeof adminUpdateInput>): Promise<Subscriber | null> {
  const d = adminUpdateInput.parse(input);
  const interests = d.interests.slice(0, 20);
  const db = await conn();
  const t = nowIso();
  const res = await db.execute({
    sql: "UPDATE subscribers SET name = ?, interests = ?, status = ?, unsubscribed_at = CASE WHEN ? = 'unsubscribed' THEN COALESCE(unsubscribed_at, ?) ELSE NULL END, updated_at = ? WHERE id = ?",
    args: [d.name, JSON.stringify(interests), d.status, d.status, t, t, id],
  });
  if (!res.rowsAffected) return null;
  return getSubscriber(id);
}

export async function deleteSubscriber(id: string): Promise<boolean> {
  const db = await conn();
  return (await db.execute({ sql: "DELETE FROM subscribers WHERE id = ?", args: [id] })).rowsAffected > 0;
}

export type ImportRow = { email: string; name?: string; interests?: string[] };
export type ImportResult = { created: number; alreadyListed: number; invalid: { row: number; message: string }[]; duplicatesInFile: number };

/**
 * Imports people as pending subscribers. Existing addresses are never changed (they are reported as already listed).
 * Invalid rows are reported with their line number and skipped; nothing else is affected.
 */
export async function importSubscribers(rows: ImportRow[], allowedInterests: string[]): Promise<ImportResult> {
  if (rows.length > IMPORT_MAX_ROWS) throw new Error(`Import at most ${IMPORT_MAX_ROWS} rows at a time.`);
  const allowed = new Set(allowedInterests);
  const result: ImportResult = { created: 0, alreadyListed: 0, invalid: [], duplicatesInFile: 0 };
  const seen = new Set<string>();
  const db = await conn();
  const existing = new Set((await db.execute("SELECT email FROM subscribers")).rows.map((r) => s(r.email)));
  const stmts: { sql: string; args: (string | number | null)[] }[] = [];
  const t = nowIso();
  rows.forEach((row, i) => {
    const email = normalizeEmail(row.email ?? "");
    if (!isValidEmail(email)) return void result.invalid.push({ row: i + 1, message: `"${row.email ?? ""}" is not a valid e-mail address` });
    if (seen.has(email)) return void result.duplicatesInFile++;
    seen.add(email);
    if (existing.has(email)) return void result.alreadyListed++;
    const interests = (row.interests ?? []).filter((x) => allowed.has(x)).slice(0, 20);
    stmts.push({
      sql: `INSERT INTO subscribers(id, email, name, interests, status, source, consent_at, unsubscribe_hash, created_at, updated_at)
            VALUES (?, ?, ?, ?, 'pending', 'import', NULL, '', ?, ?)`,
      args: [newId("sb_"), email, (row.name ?? "").trim().slice(0, 80), JSON.stringify(interests), t, t],
    });
    result.created++;
  });
  if (stmts.length) await db.batch(stmts, "write");
  return result;
}

/** Export of the whole list (owner only). The file is CSV, which Excel and Google Sheets open directly. */
export async function exportSubscribersCsv(): Promise<string> {
  const db = await conn();
  const r = await db.execute("SELECT * FROM subscribers ORDER BY created_at");
  const header = ["E-mail", "Name", "Interests", "Status", "Source", "Subscribed", "Confirmed", "Unsubscribed"];
  const lines = [header.map(csvCell).join(",")];
  for (const row of r.rows.map(toSubscriber)) {
    lines.push([row.email, row.name, row.interests.join("; "), row.status, row.source, row.createdAt, row.confirmedAt ?? "", row.unsubscribedAt ?? ""].map(csvCell).join(","));
  }
  return lines.join("\r\n") + "\r\n";
}

