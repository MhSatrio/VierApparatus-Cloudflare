/**
 * The reference check, as the server records it. Only this module writes a check result, so a "pass" can only come from a real
 * check of the current reference list. The publish gate reads what is recorded here.
 */
import { conn } from "../db/client";
import { runCheck, type CheckItem, type Lookup } from "../refcheck/check";
import { parseReference } from "../refcheck/parse";
import { refsHash, refsHashOf } from "../refcheck/hash";
import { audit, json, nowIso, s, sn } from "./util";

export type RefEntity = "article" | "module";
export type RefcheckStatus = "not_checked" | "pass" | "fail";
export const REFCHECK_LABEL: Record<RefcheckStatus, string> = { not_checked: "Not checked", pass: "Pass", fail: "Fail" };
export const REFCHECK_STATUSES = ["pass", "fail"] as const;

const TABLE: Record<RefEntity, string> = { article: "articles", module: "modules" };

export class RefcheckError extends Error {
  constructor(
    public code: "invalid" | "not_found" | "not_ready",
    message: string,
  ) {
    super(message);
  }
}

export type StoredRef = { text: string; doi: string };
export type StoredItem = Pick<CheckItem, "index" | "text" | "status" | "reason" | "doi" | "matched">;

/** What the editor needs to show about the last check. */
export type RefcheckState = { status: RefcheckStatus; current: boolean; checkedAt: string | null; items: StoredItem[] };

/** True when the recorded check passes the current list: every reference was checked and all passed, and the list has not changed since. */
export function recordedCheckPasses(refs: unknown[], hash: string, report: StoredItem[]): boolean {
  return refs.length > 0 && refsHashOf(refs) === hash && report.length === refs.length && report.every((i) => i.status === "pass");
}

/** The publish gate, as one list of reasons. Empty means the references allow publishing. */
export function refcheckGate(input: { count: number; status: string; current: boolean; report: StoredItem[] }): string[] {
  if (input.count === 0) return ["Add the references and run the reference check before publishing."];
  if (!input.current) return ["The reference list changed after the last check. Run the reference check again."];
  const failed = input.report.filter((i) => i.status !== "pass").length;
  if (input.status === "pass" && input.report.length === input.count && failed === 0) return [];
  if (failed) return [`${failed} reference${failed === 1 ? "" : "s"} did not pass the reference check. Fix ${failed === 1 ? "it" : "them"} and check again until every one is green.`];
  return ["The reference check has not passed yet. Run it before publishing."];
}

export function reportOf(raw: unknown): StoredItem[] {
  return json<StoredItem[]>(raw, []).filter((x) => x && typeof x === "object");
}

/** Runs the check on pasted text and records the result on the article or module. Refuses unless the list is valid. */
export async function saveRefcheck(entity: RefEntity, id: string, text: string, actorId: string | null, lookup?: Lookup) {
  let run;
  try {
    run = await runCheck(text, lookup);
  } catch (e) {
    throw new RefcheckError("invalid", e instanceof Error ? e.message : "The references could not be checked.");
  }
  const refs: StoredRef[] = run.refs.map((t) => {
    const r = parseReference(t);
    return { text: r.text, doi: r.doi };
  });
  const status: RefcheckStatus = run.passed ? "pass" : "fail";
  const report: StoredItem[] = run.items.map(({ index, text: t, status: st, reason, doi, matched }) => ({ index, text: t, status: st, reason, doi, matched }));
  const at = nowIso();
  const db = await conn();
  const res = await db.execute({
    sql: `UPDATE ${TABLE[entity]} SET refs = ?, refcheck_status = ?, refcheck_hash = ?, refcheck_report = ?, refcheck_at = ? WHERE id = ?`,
    args: [JSON.stringify(refs), status, refsHash(refs), JSON.stringify(report), at, id],
  });
  if (!res.rowsAffected) throw new RefcheckError("not_found", "Not found.");
  await audit(actorId, "refcheck.run", `${entity} ${id}: ${status} (${report.filter((i) => i.status === "pass").length}/${report.length} pass)`);
  return { status, items: report, passed: run.passed, refs, checkedAt: at };
}

/**
 * Lets someone set the status by hand: "fail" always, to block publishing; "pass" only when the recorded check already passes the
 * current list, so a pass can never be typed in without the check behind it.
 */
export async function setRefcheckStatus(entity: RefEntity, id: string, next: "pass" | "fail", actorId: string | null) {
  const db = await conn();
  const r = (await db.execute({ sql: `SELECT refs, refcheck_hash, refcheck_report, refcheck_status FROM ${TABLE[entity]} WHERE id = ?`, args: [id] })).rows[0];
  if (!r) throw new RefcheckError("not_found", "Not found.");
  if (next === "pass") {
    const refs = json<unknown[]>(r.refs, []);
    const report = reportOf(r.refcheck_report);
    if (!recordedCheckPasses(refs, s(r.refcheck_hash), report)) throw new RefcheckError("not_ready", "The stored reference check does not pass for the current references. Run the check first.");
  }
  await db.execute({ sql: `UPDATE ${TABLE[entity]} SET refcheck_status = ? WHERE id = ?`, args: [next, id] });
  await audit(actorId, "refcheck.status", `${entity} ${id}: ${next}`);
  return next;
}

/** The stored state of one row, as the editors read it. */
export function readRefcheck(row: Record<string, unknown>): RefcheckState {
  const refs = json<unknown[]>(row.refs, []);
  const raw = s(row.refcheck_status);
  const status: RefcheckStatus = raw === "pass" || raw === "fail" ? raw : "not_checked";
  return { status, current: refsHashOf(refs) === s(row.refcheck_hash), checkedAt: sn(row.refcheck_at), items: reportOf(row.refcheck_report) };
}

