import { fail, json } from "@/lib/api";
import { eventsAfter } from "@/lib/connector/events";
import { authenticateConnector, recordClientStatus } from "@/lib/connector/tokens";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * The events after `after` (the id of the last event the client has processed), oldest first. The client stores `next` and
 * sends it back as `after` next time, so nothing is read twice and nothing is skipped.
 */
export async function GET(req: Request) {
  try {
    const t = await authenticateConnector(req, "events:read");
    const u = new URL(req.url);
    const after = Math.max(0, Math.floor(Number(u.searchParams.get("after") ?? 0)) || 0);
    const limit = Math.min(100, Math.max(1, Math.floor(Number(u.searchParams.get("limit") ?? 50)) || 50));
    await recordClientStatus(t.id, { cursor: after });
    const events = await eventsAfter(after, limit);
    return json({ ok: true, events, next: events.length ? events[events.length - 1].id : after, serverTime: new Date().toISOString() });
  } catch (e) {
    return fail(e);
  }
}
