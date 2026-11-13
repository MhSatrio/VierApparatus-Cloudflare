import { HttpError } from "../auth/guard";
import { newId } from "../crypto";
import { conn } from "../db/client";
import { json, nowIso, s, sn, type Row } from "../store/util";
import type { ConnectorEvent } from "./events";

/**
 * Jobs: what the owner sends to the DCE app from the admin page. The app claims pending jobs, does the work on its side, and
 * reports done or failed. A job can be claimed by one token only, and only the token that claimed it can report it.
 *   run_text_post  — write a social post for the page of this event (the app's text pipeline)
 *   replay_event   — process this event again with the app's workflows (e.g. "send this article to DCE now")
 */
export const JOB_TYPES = ["run_text_post", "replay_event"] as const;
export type JobType = (typeof JOB_TYPES)[number];
export const JOB_TYPE_TEXT: Record<JobType, string> = {
  run_text_post: "Write a social post for this page",
  replay_event: "Send to DCE now (run its workflows for this item)",
};

export type ConnectorJob = {
  id: string;
  createdAt: string;
  createdBy: string | null;
  type: JobType;
  targetId: string;
  targetTitle: string;
  status: "pending" | "claimed" | "done" | "failed";
  claimedBy: string | null;
  claimedAt: string | null;
  finishedAt: string | null;
  result: string;
  error: string;
  payload: Record<string, unknown>;
};

const toJob = (r: Row): ConnectorJob => ({
  id: s(r.id),
  createdAt: s(r.ts),
  createdBy: sn(r.created_by),
  type: s(r.type) as JobType,
  targetId: s(r.target_id),
  targetTitle: s(r.target_title),
  status: s(r.status) as ConnectorJob["status"],
  claimedBy: sn(r.claimed_by),
  claimedAt: sn(r.claimed_at),
  finishedAt: sn(r.finished_at),
  result: s(r.result),
  error: s(r.error),
  payload: json<Record<string, unknown>>(r.payload, {}),
});

/** Queues a job for one event. The event is copied into the job, so the job stays valid even if the event is later removed. */
export async function createJob(actorId: string, type: JobType, ev: ConnectorEvent): Promise<string> {
  const id = newId("job_");
  const title = s(ev.payload.title ?? ev.payload.name ?? ev.entityId).slice(0, 200);
  const payload = { event: { id: ev.id, type: ev.type, entityId: ev.entityId, createdAt: ev.createdAt, payload: ev.payload } };
  const db = await conn();
  await db.execute({
    sql: "INSERT INTO connector_jobs(id, ts, created_by, type, target_id, target_title, payload, status) VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')",
    args: [id, nowIso(), actorId, type, ev.entityId, title, JSON.stringify(payload)],
  });
  return id;
}

export async function getJob(id: string): Promise<ConnectorJob | null> {
  const db = await conn();
  const r = await db.execute({ sql: "SELECT * FROM connector_jobs WHERE id = ?", args: [id] });
  return r.rows[0] ? toJob(r.rows[0]) : null;
}

export async function listJobs(limit: number): Promise<ConnectorJob[]> {
  const db = await conn();
  const r = await db.execute({ sql: "SELECT * FROM connector_jobs ORDER BY ts DESC LIMIT ?", args: [limit] });
  return r.rows.map(toJob);
}

/** Claims up to `limit` pending jobs for this token. Each job is claimed with a conditional update, so two clients cannot take the same job. */
export async function claimJobs(tokenId: string, limit: number): Promise<ConnectorJob[]> {
  const db = await conn();
  const pending = await db.execute({ sql: "SELECT id FROM connector_jobs WHERE status = 'pending' ORDER BY ts LIMIT ?", args: [limit] });
  const out: ConnectorJob[] = [];
  for (const row of pending.rows) {
    const id = s(row.id);
    const up = await db.execute({
      sql: "UPDATE connector_jobs SET status = 'claimed', claimed_by = ?, claimed_at = ? WHERE id = ? AND status = 'pending'",
      args: [tokenId, nowIso(), id],
    });
    if (up.rowsAffected === 1) {
      const j = await getJob(id);
      if (j) out.push(j);
    }
  }
  return out;
}

/** Reports the result of a claimed job. Refused (409) when the token did not claim the job or it was already reported. */
export async function reportJob(tokenId: string, jobId: string, status: "done" | "failed", result: string, error: string): Promise<void> {
  const db = await conn();
  const r = await db.execute({
    sql: "UPDATE connector_jobs SET status = ?, finished_at = ?, result = ?, error = ? WHERE id = ? AND status = 'claimed' AND claimed_by = ?",
    args: [status, nowIso(), result.slice(0, 4000), error.slice(0, 2000), jobId, tokenId],
  });
  if (r.rowsAffected !== 1) throw new HttpError(409, "conflict", "This job is not claimed by this token, or it was already reported.");
}
