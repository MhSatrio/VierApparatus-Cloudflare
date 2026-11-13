import { z } from "zod";
import { fail, json, readJson } from "@/lib/api";
import { reportJob } from "@/lib/connector/jobs";
import { authenticateConnector } from "@/lib/connector/tokens";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const body = z.object({
  status: z.enum(["done", "failed"]),
  result: z.string().max(4000).default(""),
  error: z.string().max(2000).default(""),
});

/** The client reports how a claimed job went. */
export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const t = await authenticateConnector(req, "jobs:run");
    const b = await readJson(req, body, 8192);
    await reportJob(t.id, (await ctx.params).id, b.status, b.result, b.error);
    return json({ ok: true });
  } catch (e) {
    return fail(e);
  }
}
