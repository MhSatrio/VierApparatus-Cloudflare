import { conn } from "../db/client";
import { s } from "./util";


/**
 * Owner-controlled publishing rules, kept in the existing `settings` key/value table (no migration needed).
 * Minimum words: an article below it cannot be published unless the owner explicitly overrides the rule. 0 switches it off.
 */
export const MIN_WORDS_KEY = "article_min_words";
export const DEFAULT_MIN_WORDS = 600;
export const MAX_MIN_WORDS = 5000;

export async function getMinWords(): Promise<number> {
  const db = await conn();
  const r = (await db.execute({ sql: "SELECT value FROM settings WHERE key = ?", args: [MIN_WORDS_KEY] })).rows[0];
  if (!r) return DEFAULT_MIN_WORDS;
  const v = Number(s(r.value));
  return Number.isInteger(v) && v >= 0 && v <= MAX_MIN_WORDS ? v : DEFAULT_MIN_WORDS;
}

/** Owner only (the caller checks). Rejects anything outside 0..MAX_MIN_WORDS rather than clamping it silently. */
export async function setMinWords(value: number): Promise<void> {
  if (!Number.isInteger(value) || value < 0 || value > MAX_MIN_WORDS) throw new Error(`The minimum must be a whole number from 0 to ${MAX_MIN_WORDS}.`);
  const db = await conn();
  await db.execute({
    sql: "INSERT INTO settings(key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value",
    args: [MIN_WORDS_KEY, String(value)],
  });
}

