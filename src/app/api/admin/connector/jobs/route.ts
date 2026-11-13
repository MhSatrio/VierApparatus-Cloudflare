import { z } from "zod";
import { fail, json, readJson } from "@/lib/api";
import { HttpError, requireApi } from "@/lib/auth/guard";
import { createJob, JOB_TYPES, listJobs } from "@/lib/connector/jobs";
import { getEvent } from "@/lib/connector/events";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Owner only: the jobs queued for the DCE app, and their results. */
export async function GET(req: Request) {
  try {
    await requireApi(req, { action: "connector.manage" });
    return json({ ok: true, jobs: await listJobs(60) });
  } catch (e) {
    return fail(e);
  }
}

/** Queue a job for one event on the connector outbox. The event's data is copied into the job. */
export async function POST(req: Request) {
  try {
    const session = await requireApi(req, { mutation: true, action: "connector.manage" });
    const b = await readJson(req, z.object({ type: z.enum(JOB_TYPES), eventId: z.number().int().min(1) }), 1024);
    const ev = await getEvent(b.eventId);
    if (!ev) throw new HttpError(404, "not_found", "That event no longer exists.");
    const id = await createJob(session.user.id, b.type, ev);
    return json({ ok: true, id });
  } catch (e) {
    return fail(e);
  }
}
