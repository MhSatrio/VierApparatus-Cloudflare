import { clientIp, ipHash } from "@/lib/auth/request";
import { rateLimit } from "@/lib/rate-limit";
import { feedIcs, resolveFeedToken } from "@/lib/store/calendar-feed";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const headers = {
  "Content-Type": "text/calendar; charset=utf-8",
  "Cache-Control": "private, no-store",
  "X-Robots-Tag": "noindex, nofollow",
  "Content-Disposition": 'inline; filename="vierapparatus-deadlines.ics"',
};

/**
 * The calendar feed. Calendar apps fetch it without signing in, so the random token in the address is the only key. An unknown
 * or disabled token gets the same plain 404, and the feed is rate limited per address.
 */
export async function GET(req: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  if (!file.endsWith(".ics")) return new Response("Not found", { status: 404 });
  const limit = await rateLimit(`calendar:ip:${await ipHash(clientIp(req))}`, 240, 3600);
  if (!limit.ok) return new Response("Too many requests", { status: 429, headers: { "Retry-After": String(limit.retryAfter) } });
  const user = await resolveFeedToken(file.slice(0, -4));
  if (!user) return new Response("Not found", { status: 404, headers: { "Cache-Control": "no-store" } });
  return new Response(await feedIcs(user), { status: 200, headers });
}
