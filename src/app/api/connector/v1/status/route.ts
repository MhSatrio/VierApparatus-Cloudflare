import { z } from "zod";
import { fail, json, readJson } from "@/lib/api";
import { authenticateConnector, recordClientStatus } from "@/lib/connector/tokens";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const body = z.object({
  version: z.string().max(40).default(""),
  cursor: z.number().int().min(0).default(0),
  message: z.string().max(300).default(""),
});

/** The client reports its version, how far it has read, and a short message (shown to the owner on the connector page). */
export async function POST(req: Request) {
  try {
    const t = await authenticateConnector(req, "events:read");
    const b = await readJson(req, body, 4096);
    await recordClientStatus(t.id, { cursor: b.cursor, version: b.version, message: b.message });
    return json({ ok: true });
  } catch (e) {
    return fail(e);
  }
}
