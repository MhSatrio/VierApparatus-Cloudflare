import { NextResponse } from "next/server";
import { inquirySchema, MAX_BODY_BYTES } from "@/lib/inquiry";
import { sendInquiryEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const seenKeys = new Map<string, number>();
const KEY_TTL_MS = 10 * 60 * 1000;

function sameOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  try {
    const o = new URL(origin);
    const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
    return o.host === host || o.origin === new URL(site.url).origin;
  } catch {
    return false;
  }
}

const json = (body: unknown, status = 200, headers?: Record<string, string>) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });

export async function POST(req: Request) {
  // CSRF: require same-origin browser requests with a JSON content type (not sendable by a plain cross-site form).
  if (!sameOrigin(req)) return json({ ok: false, error: "forbidden" }, 403);
  if (!(req.headers.get("content-type") ?? "").toLowerCase().startsWith("application/json")) {
    return json({ ok: false, error: "unsupported_media_type" }, 415);
  }
  const declared = Number(req.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) return json({ ok: false, error: "payload_too_large" }, 413);

  const ip = (req.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim().slice(0, 64);
  const [perIp, global] = await Promise.all([rateLimit(`inq:ip:${ip}`, 5, 600), rateLimit("inq:global", 200, 3600)]);
  if (!perIp.ok || !global.ok) {
    return json({ ok: false, error: "rate_limited" }, 429, { "Retry-After": String(Math.max(perIp.retryAfter, 60)) });
  }

  let raw: string;
  try {
    raw = await req.text();
  } catch {
    return json({ ok: false, error: "bad_request" }, 400);
  }
  if (raw.length > MAX_BODY_BYTES) return json({ ok: false, error: "payload_too_large" }, 413);

  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  const parsed = inquirySchema.safeParse(data);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const k = String(issue.path[0] ?? "form");
      if (!fields[k]) fields[k] = issue.message;
    }
    return json({ ok: false, error: "validation", fields }, 400);
  }
  const input = parsed.data;

  // Bot defenses: honeypot and implausibly fast submissions get a silent "success" so bots learn nothing.
  if (input.website) return json({ ok: true });
  if (input.startedAt && Date.now() - input.startedAt < 2500) return json({ ok: true });

  // Duplicate-submission guard (double click / retry).
  const now = Date.now();
  for (const [k, t] of seenKeys) if (now - t > KEY_TTL_MS) seenKeys.delete(k);
  if (input.idempotencyKey) {
    if (seenKeys.has(input.idempotencyKey)) return json({ ok: true, duplicate: true });
    seenKeys.set(input.idempotencyKey, now);
  }

  const result = await sendInquiryEmail(input);
  if (!result.ok) {
    if (input.idempotencyKey) seenKeys.delete(input.idempotencyKey); // allow a genuine retry
    return json({ ok: false, error: result.reason }, result.reason === "not_configured" ? 503 : 502);
  }
  return json({ ok: true, mock: result.mock === true });
}

export function GET() {
  return json({ ok: false, error: "method_not_allowed" }, 405, { Allow: "POST" });
}
