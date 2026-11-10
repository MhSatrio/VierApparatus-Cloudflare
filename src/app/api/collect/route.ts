import { z } from "zod";
import { clientIp, sameOrigin } from "@/lib/auth/request";
import { rateLimit } from "@/lib/rate-limit";
import { site } from "@/lib/site";
import { browserOf, deviceOf, recordBotHit, recordEvent } from "@/lib/store/analytics";
import { visitorKind } from "@/lib/bot";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 2 * 1024;
// Bot requests are only counted per day (never stored as visits). The cap keeps a flood of bot requests from using up the
// database's monthly write allowance, so the bot count is a floor on heavy days, not an exact figure.
const BOT_COUNT_PER_MINUTE = 60;

const text = (max: number) => z.string().max(max).optional().default("");

const schema = z.object({
  type: z.enum(["pageview", "engage"]),
  path: z.string().max(300).regex(/^\/(?!\/)[^\s?#]*$/),
  sessionId: z.string().regex(/^[a-z0-9]{8,32}$/i),
  landing: z.boolean().optional().default(false),
  referrer: text(300),
  utm: z.object({ source: text(80), medium: text(80), campaign: text(120), content: text(120), term: text(120) }).optional(),
  durationMs: z.number().min(0).max(6 * 3600_000).optional(),
  scrollPct: z.number().min(0).max(100).optional(),
});

const empty = { status: 204, headers: { "Cache-Control": "no-store" } } as const;

/** Analytics must never break or slow a page: every failure path answers 204 and the error is only logged. */
export async function POST(req: Request) {
  try {
    if (!sameOrigin(req)) return new Response(null, { status: 403 });
    const ua = req.headers.get("user-agent") ?? "";
    // People who ask not to be tracked are not counted at all, not even as bots.
    if (req.headers.get("dnt") === "1" || req.headers.get("sec-gpc") === "1") return new Response(null, empty);
    if (visitorKind(ua) === "bot") {
      if ((await rateLimit("collect:bots", BOT_COUNT_PER_MINUTE, 60)).ok) await recordBotHit().catch(() => {});
      return new Response(null, empty);
    }
    if (Number(req.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) return new Response(null, { status: 413 });

    const ip = clientIp(req);
    const [perIp, global] = await Promise.all([rateLimit(`collect:ip:${ip}`, 120, 60), rateLimit("collect:global", 3000, 60)]);
    if (!perIp.ok || !global.ok) return new Response(null, { status: 429 });

    const raw = await req.text();
    if (raw.length > MAX_BODY_BYTES) return new Response(null, { status: 413 });
    const body = schema.safeParse(JSON.parse(raw));
    if (!body.success || body.data.path.startsWith("/admin") || body.data.path.startsWith("/api")) return new Response(null, empty);
    const e = body.data;

    let city = req.headers.get("x-vercel-ip-city") ?? req.headers.get("cf-ipcity") ?? "";
    try {
      city = decodeURIComponent(city);
    } catch {
      /* keep the raw value */
    }
    await recordEvent(
      {
        type: e.type,
        path: e.path,
        sessionId: e.sessionId,
        referrer: e.referrer,
        utm: e.utm ?? { source: "", medium: "", campaign: "", content: "", term: "" },
        country: req.headers.get("x-vercel-ip-country") ?? req.headers.get("cf-ipcountry") ?? "",
        city,
        device: deviceOf(ua),
        browser: browserOf(ua),
        landing: e.landing,
        durationMs: e.durationMs ?? null,
        scrollPct: e.scrollPct ?? null,
        ip,
        userAgent: ua,
      },
      new URL(site.url).hostname,
    );
  } catch (err) {
    console.error("[collect]", err instanceof Error ? err.name : "error");
  }
  return new Response(null, empty);
}

export function GET() {
  return new Response(null, { status: 405, headers: { Allow: "POST" } });
}
