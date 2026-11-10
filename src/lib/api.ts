import { NextResponse } from "next/server";
import { z } from "zod";
import { DbNotConfiguredError } from "./db/client";
import { HttpError } from "./auth/guard";

export const noStore = { "Cache-Control": "no-store" };

export function json(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return NextResponse.json(body, { status, headers: { ...noStore, ...headers } });
}

/** Maps any thrown error to a safe JSON response. Internals (stack traces, SQL, secrets) never reach the client. */
export function fail(e: unknown) {
  if (e instanceof HttpError) return json({ ok: false, error: e.code, ...([400, 403, 404, 409, 422].includes(e.status) && e.message !== e.code ? { message: e.message } : {}) }, e.status);
  if (e instanceof DbNotConfiguredError) {
    console.error("[db] TURSO_DATABASE_URL is not configured");
    return json({ ok: false, error: "not_configured" }, 503);
  }
  console.error("[api] unexpected error", e instanceof Error ? `${e.name}: ${e.message}` : "unknown");
  return json({ ok: false, error: "server_error" }, 500);
}

/** Reads a size-limited JSON body and validates it with zod. */
export async function readJson<T extends z.ZodType>(req: Request, schema: T, maxBytes = 64 * 1024): Promise<z.infer<T>> {
  const declared = Number(req.headers.get("content-length") ?? 0);
  if (declared > maxBytes) throw new HttpError(413, "payload_too_large");
  const raw = await req.text();
  if (raw.length > maxBytes) throw new HttpError(413, "payload_too_large");
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    throw new HttpError(400, "bad_json");
  }
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    throw new HttpError(400, "validation", `${issue.path.join(".") || "body"}: ${issue.message}`);
  }
  return parsed.data;
}
