import { NextResponse } from "next/server";
import { google } from "googleapis";
import { rateLimit } from "@/lib/rate-limit";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 4 * 1024;
const MAX_FIELD_CHARS = 300;

// Crawlers and headless clients are not logged: every logged row costs a serverless execution plus a Sheets write.
const BOT_PATTERN =
  /bot|crawl|spider|slurp|headless|lighthouse|pagespeed|ahrefs|semrush|mj12|dotbot|petalbot|bytespider|gptbot|claude|anthropic|openai|perplexity|ccbot|facebookexternalhit|bingpreview|python-requests|curl\/|wget|node-fetch|axios|go-http-client|okhttp|java\//i;

const json = (body: unknown, status = 200) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

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

/** Visitor-controlled text: single line, bounded length. Written with RAW so a value like "=IMPORTXML(...)" stays text. */
const clean = (v: unknown, max = MAX_FIELD_CHARS) =>
  String(v ?? "")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .slice(0, max);

let sheets: ReturnType<typeof google.sheets> | null = null;
function getSheets() {
  if (sheets) return sheets;
  const key = (process.env.GOOGLE_PRIVATE_KEY || "").replace(/^["']|["']$/g, "").replace(/\\n/g, "\n");
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  sheets = google.sheets({ version: "v4", auth });
  return sheets;
}

export async function POST(req: Request) {
  try {
    // 1. Cheap rejections first, before any parsing or external call.
    if (!sameOrigin(req)) return json({ ok: false }, 403);
    const ua = req.headers.get("user-agent") || "";
    if (!ua || BOT_PATTERN.test(ua)) return json({ ok: true, ignored: "bot" });
    if (Number(req.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) return json({ ok: false }, 413);

    const ip = (req.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim().slice(0, 64);
    // Per-IP cap, plus a global cap kept under the Sheets API per-user write quota (60/min).
    const [perIp, global] = await Promise.all([rateLimit(`track:ip:${ip}`, 30, 60), rateLimit("track:global", 50, 60)]);
    if (!perIp.ok || !global.ok) return json({ ok: true, ignored: "rate_limited" }, 429);

    const raw = await req.text();
    if (raw.length > MAX_BODY_BYTES) return json({ ok: false }, 413);
    const body = JSON.parse(raw) as Record<string, unknown>;

    const rawCity = req.headers.get("x-vercel-ip-city") || "";
    let city = "";
    try {
      city = rawCity ? decodeURIComponent(rawCity) : "";
    } catch {
      city = rawCity;
    }

    const duration = Number(body.duration);
    const rowValues = [
      clean(body.timestamp) || new Date().toISOString(),
      clean(body.visitorId, 64),
      clean(body.sessionId, 64),
      clean(body.eventType, 40) || "page_view",
      clean(body.page) || "/",
      clean(body.pageTitle),
      clean(req.headers.get("x-vercel-ip-country"), 8),
      clean(req.headers.get("x-vercel-ip-country-region"), 16),
      clean(city, 80),
      clean(body.browser, 40),
      clean(body.os, 40),
      clean(body.device, 40),
      clean(body.language, 20),
      clean(body.timezone, 60),
      clean(body.referrer) || "Direct",
      clean(body.utmSource, 100),
      clean(body.utmMedium, 100),
      clean(body.utmCampaign, 100),
      clean(body.button, 100),
      clean(body.download, 200),
      Number.isFinite(duration) ? duration : 0,
      clean(body.returningVisitor, 8) || "false",
      clean(body.visitCount, 8) || "1",
      "Human",
    ];

    await getSheets().spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Analytics!A:X",
      valueInputOption: "RAW",
      requestBody: { values: [rowValues] },
    });

    return json({ ok: true });
  } catch (error) {
    // Log a short reason server-side only; never return internals to the client.
    console.error("[track] failed:", error instanceof Error ? error.message.slice(0, 200) : "unknown");
    return json({ ok: false }, 500);
  }
}

export function GET() {
  return NextResponse.json({ ok: false }, { status: 405, headers: { Allow: "POST", "Cache-Control": "no-store" } });
}
