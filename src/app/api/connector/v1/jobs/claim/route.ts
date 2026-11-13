import { z } from "zod";
import { fail, json, readJson } from "@/lib/api";
import { claimJobs } from "@/lib/connector/jobs";
import { authenticateConnector } from "@/lib/connector/tokens";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Takes up to `limit` pending jobs for this token. A job is handed out once. */
export async function POST(req: Request) {
  try {
    const t = await authenticateConnector(req, "jobs:run");
    const b = await readJson(req, z.object({ limit: z.number().int().min(1).max(10).default(5) }), 1024);
    return json({ ok: true, jobs: await claimJobs(t.id, b.limit) });
  } catch (e) {
    return fail(e);
  }
}
