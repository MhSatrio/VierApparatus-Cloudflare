import type { Row } from "@libsql/client/web";
import { conn } from "../db/client";

export const nowIso = () => new Date().toISOString();

export const s = (v: unknown): string => (v == null ? "" : String(v));
export const sn = (v: unknown): string | null => (v == null ? null : String(v));
export const n = (v: unknown): number => (v == null ? 0 : Number(v));
export const nn = (v: unknown): number | null => (v == null ? null : Number(v));
export const b = (v: unknown): boolean => Number(v) === 1;

export function json<T>(v: unknown, fallback: T): T {
  try {
    return typeof v === "string" ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

export type { Row };

/** Escape %, _ and \ so user text can be used in a LIKE pattern with ESCAPE '\'. */
export const likePattern = (q: string) => `%${q.replace(/[\\%_]/g, (c) => `\\${c}`)}%`;

export async function audit(userId: string | null, action: string, detail = ""): Promise<void> {
  const db = await conn();
  await db
    .execute({ sql: "INSERT INTO audit_log(ts, user_id, action, detail) VALUES (?, ?, ?, ?)", args: [nowIso(), userId, action, detail.slice(0, 500)] })
    .catch(() => {});
}
