import { HttpError } from "./auth/guard";
import { clientIp, ipHash, sameOrigin } from "./auth/request";
import { hit } from "./auth/ratelimit";

/** Total request size accepted by the public forms (an optional attachment is at most 1 MB). */
export const MAX_FORM_BYTES = 1_300_000;

export type ParsedForm = { fields: Record<string, string>; file: File | null };

/**
 * Shared front door for the public forms: same-origin only, bounded size, per-visitor and global rate limits kept in
 * the database (so they hold across serverless instances). Throws HttpError, which api.ts turns into a safe response.
 */
export async function guardPublicForm(req: Request, name: string, perVisitor: { limit: number; windowSec: number }) {
  if (!sameOrigin(req)) throw new HttpError(403, "forbidden");
  const type = (req.headers.get("content-type") ?? "").toLowerCase();
  if (!type.startsWith("multipart/form-data") && !type.startsWith("application/json")) throw new HttpError(415, "unsupported_media_type");
  if (Number(req.headers.get("content-length") ?? 0) > MAX_FORM_BYTES) throw new HttpError(413, "payload_too_large");
  const who = await ipHash(clientIp(req));
  const [a, g] = await Promise.all([hit(`form:${name}:${who}`, perVisitor.limit, perVisitor.windowSec), hit(`form:${name}:all`, 300, 3600)]);
  if (!a.ok || !g.ok) throw new HttpError(429, "rate_limited");
}

export async function readForm(req: Request): Promise<ParsedForm> {
  const type = (req.headers.get("content-type") ?? "").toLowerCase();
  if (type.startsWith("application/json")) {
    const raw = await req.text();
    if (raw.length > 64 * 1024) throw new HttpError(413, "payload_too_large");
    try {
      const obj = JSON.parse(raw) as Record<string, unknown>;
      return { fields: Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, v == null ? "" : String(v)])), file: null };
    } catch {
      throw new HttpError(400, "bad_json");
    }
  }
  let data: FormData;
  try {
    data = await req.formData();
  } catch {
    throw new HttpError(400, "bad_form");
  }
  const fields: Record<string, string> = {};
  let file: File | null = null;
  for (const [k, v] of data.entries()) {
    if (typeof v === "string") fields[k] = v;
    else if (k === "file" && v.size > 0) file = v;
  }
  return { fields, file };
}

/** The start time is sent by the page when the form is shown; a submission a couple of seconds later is a script. */
export const looksAutomated = (fields: Record<string, string>) => {
  if (fields.website) return true; // honeypot
  const started = Number(fields.startedAt);
  return Number.isFinite(started) && started > 0 && Date.now() - started < 2500;
};
