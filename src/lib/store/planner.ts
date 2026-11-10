import { z } from "zod";
import { CONTENT_TYPES, FIELD_TYPES, PRIORITIES, STATUSES, STATUS_LABEL, taskRef, type ContentType, type FieldType, type ModuleTaskInfo, type PlannerField, type PlannerRecord, type Priority, type RecordStatus, type SavedView } from "../planner-shared";
import type { ContentStatus, PublicationStatus } from "../modules/shared";
import { conn } from "../db/client";
import { newId } from "../crypto";
import { can, type Actor as Perm } from "../auth/permissions";
import { isSafeHref } from "../content/schema";
import { logActivity, type ActivityAction } from "./activity";
import { addComment } from "./comments";
import { createArticle, getArticleById, getArticleMeta, setAssignedTo, setReviewStatus } from "./articles";
import { recordRevision } from "./revisions";
import { isArticleId } from "../article-id";
import { notifyAssignee } from "./assignment-mail";
import { audit, json, n, nowIso, s, sn, type Row } from "./util";

/**
 * Article Planner + Collab. ONE table holds every planned article / collaborative task, so Planner, Collab and Article
 * Management share a single record (and at most one linked article) instead of unrelated copies:
 *   planner record  --article_id-->  article (draft/published)  <--assigned_to-- contributor
 * "Collab" is simply the planner records that are assigned or shared, seen through the viewer's permissions.
 */

export { STATUSES, PRIORITIES, STATUS_LABEL, taskRef, FIELD_TYPES } from "../planner-shared";
export type { RecordStatus, Priority, PlannerRecord, FieldType, PlannerField, SavedView } from "../planner-shared";

export type Viewer = Perm & { id: string; name: string };

const SELECT = `SELECT p.*, c.name AS topic_name, ua.name AS assigned_name, uc.name AS created_name, uu.name AS updated_name,
    a.title AS article_title, a.status AS article_status, a.version AS article_version, a.last_editor_name AS article_editor, a.updated_at AS article_updated, a.review_status AS article_review,
    md.kind AS m_kind, md.title AS m_title, md.status AS m_status, md.content_status AS m_content, (length(md.body_text) > 0) AS m_has_body,
    ml.slug AS ml_slug, ml.num AS ml_num, ml.name AS ml_name, ts.route_slug AS ms_slug, ts.name AS ms_name, ms.route_slug AS sp_slug, ms.name AS sp_name,
    p1.kind AS p1_kind, p1.title AS p1_title, p2.kind AS p2_kind, p2.title AS p2_title, p3.kind AS p3_kind, p3.title AS p3_title
  FROM planner_records p
  LEFT JOIN categories c ON c.id = p.topic_id
  LEFT JOIN users ua ON ua.id = p.assigned_to
  LEFT JOIN users uc ON uc.id = p.created_by
  LEFT JOIN users uu ON uu.id = p.updated_by
  LEFT JOIN articles a ON a.id = p.article_id
  LEFT JOIN modules md ON md.id = p.module_id
  LEFT JOIN module_levels ml ON ml.id = md.level_id
  LEFT JOIN module_subjects ms ON ms.id = md.subject_id
  LEFT JOIN module_subjects ts ON ts.id = ms.parent_id
  LEFT JOIN modules p1 ON p1.id = md.parent_id
  LEFT JOIN modules p2 ON p2.id = p1.parent_id
  LEFT JOIN modules p3 ON p3.id = p2.parent_id`;

/** What a module task says about its module: the module is the source, the task only reads it (and the joins above read it). */
function moduleInfo(r: Row): ModuleTaskInfo | null {
  if (!sn(r.module_id) || !sn(r.m_kind)) return null;
  const chain = [
    { kind: s(r.m_kind), title: s(r.m_title) },
    { kind: s(r.p1_kind), title: s(r.p1_title) },
    { kind: s(r.p2_kind), title: s(r.p2_title) },
    { kind: s(r.p3_kind), title: s(r.p3_title) },
  ];
  const kind = s(r.m_kind) === "chapter" ? "chapter" : "module";
  return {
    nodeId: s(r.module_id),
    kind,
    subjectSlug: s(r.ms_slug),
    subjectName: s(r.ms_name),
    specializationSlug: s(r.sp_slug),
    specializationName: s(r.sp_name),
    levelSlug: s(r.ml_slug),
    levelNum: n(r.ml_num),
    levelName: s(r.ml_name),
    discipline: chain.find((c) => c.kind === "discipline")?.title ?? "",
    moduleTitle: chain.find((c) => c.kind === "module")?.title ?? s(r.m_title),
    chapter: kind === "chapter" ? s(r.m_title) : "",
    contentStatus: s(r.m_content) as ContentStatus,
    publication: s(r.m_status) as PublicationStatus,
    hasBody: n(r.m_has_body) === 1,
  };
}

function derivedReview(status: RecordStatus, articleReview: string): PlannerRecord["reviewStatus"] {
  if (articleReview && articleReview !== "none") return articleReview as PlannerRecord["reviewStatus"];
  return status === "in_review" ? "requested" : status === "revision" ? "revision" : status === "approved" || status === "done" ? "approved" : "none";
}

function toRecord(r: Row, owner: boolean): PlannerRecord {
  const status = s(r.status) as RecordStatus;
  const num = n(r.num);
  return {
    id: s(r.id),
    num,
    ref: taskRef(num),
    title: s(r.title),
    brief: s(r.brief),
    topicId: sn(r.topic_id),
    topicName: sn(r.topic_name),
    status,
    priority: s(r.priority) as Priority,
    dueDate: sn(r.due_date),
    assignedTo: sn(r.assigned_to),
    assignedToName: sn(r.assigned_name),
    sharedWith: json<string[]>(r.shared_with, []).filter((x) => typeof x === "string"),
    articleId: sn(r.article_id),
    articleTitle: sn(r.article_title),
    articleStatus: sn(r.article_status),
    articleVersion: r.article_version == null ? null : n(r.article_version),
    articleLastEditor: sn(r.article_editor),
    articleUpdatedAt: sn(r.article_updated),
    reviewStatus: derivedReview(status, s(r.article_review)),
    researchNotes: s(r.research_notes),
    notes: owner ? s(r.notes) : "",
    custom: json<Record<string, unknown>>(r.custom, {}),
    contentType: (CONTENT_TYPES as readonly string[]).includes(s(r.content_type)) ? (s(r.content_type) as ContentType) : "article",
    module: moduleInfo(r),
    createdBy: s(r.created_by),
    createdByName: s(r.created_name),
    updatedByName: s(r.updated_name),
    version: n(r.version),
    createdAt: s(r.created_at),
    updatedAt: s(r.updated_at),
  };
}

const isOwner = (v: Perm) => can(v, "planner.manage");

/** The access policy, as SQL: the owner sees everything; a contributor with Collab access sees only what is assigned to, created by or shared with them. */
function visibility(v: Viewer): { sql: string; args: string[] } | null {
  if (isOwner(v)) return { sql: "1 = 1", args: [] };
  if (!can(v, "collab.access")) return null;
  return {
    sql: "(p.assigned_to = ? OR p.created_by = ? OR EXISTS (SELECT 1 FROM json_each(p.shared_with) WHERE json_each.value = ?))",
    args: [v.id, v.id, v.id],
  };
}

export function canSeeRecord(v: Viewer, r: Pick<PlannerRecord, "assignedTo" | "createdBy" | "sharedWith">): boolean {
  if (isOwner(v)) return true;
  if (!can(v, "collab.access")) return false;
  return r.assignedTo === v.id || r.createdBy === v.id || r.sharedWith.includes(v.id);
}

export async function getRecord(v: Viewer, id: string): Promise<PlannerRecord | null> {
  const vis = visibility(v);
  if (!vis) return null;
  const db = await conn();
  const r = await db.execute({ sql: `${SELECT} WHERE p.id = ? AND ${vis.sql}`, args: [id, ...vis.args] });
  return r.rows[0] ? toRecord(r.rows[0], isOwner(v)) : null;
}

export async function getRecordForArticle(articleId: string): Promise<{ id: string; num: number; assignedTo: string | null; status: RecordStatus } | null> {
  const db = await conn();
  const r = (await db.execute({ sql: "SELECT id, num, assigned_to, status FROM planner_records WHERE article_id = ?", args: [articleId] })).rows[0];
  return r ? { id: s(r.id), num: n(r.num), assignedTo: sn(r.assigned_to), status: s(r.status) as RecordStatus } : null;
}

// ---------------------------------------------------------------- listing

export const SORTABLE: Record<string, string> = {
  num: "p.num",
  title: "p.title COLLATE NOCASE",
  status: "p.status",
  priority: "CASE p.priority WHEN 'urgent' THEN 0 WHEN 'high' THEN 1 WHEN 'normal' THEN 2 ELSE 3 END",
  due: "CASE WHEN p.due_date IS NULL THEN 1 ELSE 0 END, p.due_date",
  assignee: "ua.name COLLATE NOCASE",
  updated: "p.updated_at",
};

export type ListQuery = {
  q?: string;
  status?: RecordStatus[];
  assignee?: string; // user id, or "none"
  priority?: Priority;
  topic?: string;
  /** Article tasks or module tasks. The Planner and Collab pages ask for one kind at a time, so the two never mix. */
  type?: ContentType;
  sort?: string;
  dir?: "asc" | "desc";
  limit?: number;
  offset?: number;
  /** Preset used by the Collab tabs. */
  preset?: "mine" | "team" | "review" | "recent" | "completed" | "open";
};

export async function listRecords(v: Viewer, q: ListQuery = {}): Promise<{ items: PlannerRecord[]; total: number }> {
  const vis = visibility(v);
  if (!vis) return { items: [], total: 0 };
  const where = [vis.sql];
  const args: (string | number)[] = [...vis.args];
  const status = q.status?.filter((x) => (STATUSES as readonly string[]).includes(x));
  if (status?.length) {
    where.push(`p.status IN (${status.map(() => "?").join(",")})`);
    args.push(...status);
  }
  if (q.assignee === "none") where.push("p.assigned_to IS NULL");
  else if (q.assignee) {
    where.push("p.assigned_to = ?");
    args.push(q.assignee);
  }
  if (q.priority && (PRIORITIES as readonly string[]).includes(q.priority)) {
    where.push("p.priority = ?");
    args.push(q.priority);
  }
  if (q.topic) {
    where.push("p.topic_id = ?");
    args.push(q.topic);
  }
  if (q.type && (CONTENT_TYPES as readonly string[]).includes(q.type)) {
    where.push("p.content_type = ?");
    args.push(q.type);
  }
  const text = q.q?.trim().slice(0, 80);
  if (text) {
    where.push("(p.title LIKE ? ESCAPE '\\' OR p.brief LIKE ? ESCAPE '\\' OR p.research_notes LIKE ? ESCAPE '\\')");
    const like = `%${text.replace(/[\\%_]/g, (c) => `\\${c}`)}%`;
    args.push(like, like, like);
  }
  switch (q.preset) {
    case "mine":
      where.push("p.assigned_to = ?", "p.status NOT IN ('done','archived')");
      args.push(v.id);
      break;
    case "team":
      where.push("p.status NOT IN ('done','archived')");
      break;
    case "review":
      where.push("p.status = 'in_review'");
      break;
    case "completed":
      where.push("p.status = 'done'");
      break;
    case "open":
      where.push("p.status NOT IN ('done','archived')");
      break;
    default:
      break;
  }
  const order = q.preset === "recent" ? "p.updated_at DESC" : `${SORTABLE[q.sort ?? ""] ?? "p.num"} ${q.dir === "desc" ? "DESC" : "ASC"}, p.num`;
  const cond = where.join(" AND ");
  const db = await conn();
  const limit = Math.min(Math.max(q.limit ?? 200, 1), 500);
  const [rows, total] = await db.batch(
    [
      { sql: `${SELECT} WHERE ${cond} ORDER BY ${order} LIMIT ? OFFSET ?`, args: [...args, limit, q.offset ?? 0] },
      { sql: `SELECT COUNT(*) AS c FROM (SELECT 1 FROM planner_records p WHERE ${cond} LIMIT 10001)`, args },
    ],
    "read",
  );
  return { items: rows.rows.map((r) => toRecord(r, isOwner(v))), total: n(total.rows[0].c) };
}

export async function recordIdsFor(v: Viewer): Promise<string[]> {
  const vis = visibility(v);
  if (!vis) return [];
  const db = await conn();
  return (await db.execute({ sql: `SELECT p.id FROM planner_records p WHERE ${vis.sql} ORDER BY p.updated_at DESC LIMIT 200`, args: vis.args })).rows.map((x) => s(x.id));
}

// ---------------------------------------------------------------- custom fields


export async function listFields(): Promise<PlannerField[]> {
  const db = await conn();
  const r = await db.execute("SELECT * FROM planner_fields ORDER BY sort, name");
  return r.rows.map((x) => ({ id: s(x.id), name: s(x.name), type: s(x.type) as FieldType, options: json<string[]>(x.options, []), sort: n(x.sort) }));
}

export const fieldInput = z.object({
  name: z.string().trim().min(1, "Give the field a name").max(40),
  type: z.enum(FIELD_TYPES),
  options: z.array(z.string().trim().min(1).max(40)).max(20).default([]),
});

export async function createField(input: z.input<typeof fieldInput>): Promise<PlannerField> {
  const f = fieldInput.parse(input);
  const db = await conn();
  const id = newId("pf_");
  const max = n((await db.execute("SELECT COALESCE(MAX(sort), 0) AS m FROM planner_fields")).rows[0].m);
  await db.execute({ sql: "INSERT INTO planner_fields(id, name, type, options, sort) VALUES (?, ?, ?, ?, ?)", args: [id, f.name, f.type, JSON.stringify(f.type === "select" ? f.options : []), max + 1] });
  return (await listFields()).find((x) => x.id === id)!;
}

export async function updateField(id: string, input: z.input<typeof fieldInput>): Promise<boolean> {
  const f = fieldInput.parse(input);
  const db = await conn();
  return (await db.execute({ sql: "UPDATE planner_fields SET name = ?, type = ?, options = ? WHERE id = ?", args: [f.name, f.type, JSON.stringify(f.type === "select" ? f.options : []), id] })).rowsAffected > 0;
}

export async function deleteField(id: string): Promise<boolean> {
  const db = await conn();
  const r = await db.batch([{ sql: "UPDATE planner_records SET custom = json_remove(custom, ?)", args: [`$."${id.replace(/"/g, "")}"`] }, { sql: "DELETE FROM planner_fields WHERE id = ?", args: [id] }], "write");
  return r[1].rowsAffected > 0;
}

/** Keeps only values for fields that exist, coerced to the field's type (bad values are dropped, never stored). */
export function sanitizeCustom(values: Record<string, unknown> | undefined, fields: PlannerField[]): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const f of fields) {
    if (!values || !(f.id in values)) continue;
    const v = values[f.id];
    if (v === null || v === "") continue;
    switch (f.type) {
      case "text":
        if (typeof v === "string") out[f.id] = v.slice(0, 500);
        break;
      case "longtext":
        if (typeof v === "string") out[f.id] = v.slice(0, 4000);
        break;
      case "number":
        if (Number.isFinite(Number(v))) out[f.id] = Number(v);
        break;
      case "date":
        if (typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v)) out[f.id] = v;
        break;
      case "select":
        if (typeof v === "string" && f.options.includes(v)) out[f.id] = v;
        break;
      case "checkbox":
        out[f.id] = v === true || v === "true" || v === 1;
        break;
      case "url":
        if (typeof v === "string" && /^https?:\/\//i.test(v) && isSafeHref(v)) out[f.id] = v.slice(0, 500);
        break;
    }
  }
  return out;
}

// ---------------------------------------------------------------- create / update

const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use the format YYYY-MM-DD").nullable();

export const recordInput = z.object({
  title: z.string().trim().min(3, "Give the task a title (3+ characters)").max(160),
  brief: z.string().trim().max(4000).default(""),
  topicId: z.string().max(60).nullable().default(null),
  priority: z.enum(PRIORITIES).default("normal"),
  dueDate: date.default(null),
  assignedTo: z.string().max(60).nullable().default(null),
  notes: z.string().trim().max(4000).default(""),
  custom: z.record(z.string(), z.unknown()).default({}),
  status: z.enum(STATUSES).default("idea"),
});
export type RecordInput = z.input<typeof recordInput>;

export class PlannerError extends Error {
  constructor(
    public code: "not_found" | "forbidden" | "conflict" | "invalid",
    message: string,
  ) {
    super(message);
  }
}

async function userExists(id: string, role?: "contributor"): Promise<boolean> {
  const db = await conn();
  return (await db.execute({ sql: `SELECT 1 FROM users WHERE id = ? AND disabled = 0${role ? " AND role = 'contributor'" : ""}`, args: [id] })).rows.length > 0;
}

/** Owner only. */
export async function createRecord(owner: Viewer, input: RecordInput, link?: { moduleId: string }): Promise<PlannerRecord> {
  if (!isOwner(owner)) throw new PlannerError("forbidden", "Only the owner can create planner records.");
  const d = recordInput.parse(input);
  if (d.assignedTo && !(await userExists(d.assignedTo))) throw new PlannerError("invalid", "That contributor does not exist or is disabled.");
  const fields = await listFields();
  const db = await conn();
  const id = newId("p_");
  const t = nowIso();
  const status: RecordStatus = d.assignedTo && d.status === "idea" ? "planned" : d.status;
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      await db.execute({
        sql: `INSERT INTO planner_records(id, num, title, brief, topic_id, status, priority, due_date, assigned_to, notes, custom, created_by, updated_by, created_at, updated_at, content_type, module_id)
              VALUES (?, (SELECT COALESCE(MAX(num), 0) + 1 FROM planner_records), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [id, d.title, d.brief, d.topicId, status, d.priority, d.dueDate, d.assignedTo, d.notes, JSON.stringify(sanitizeCustom(d.custom, fields)), owner.id, owner.id, t, t, link ? "module" : "article", link?.moduleId ?? null],
      });
      break;
    } catch (e) {
      if (attempt === 4 || !/UNIQUE|constraint/i.test(String((e as Error).message))) throw e; // two creates raced for the same number: retry
    }
  }
  await logActivity({ id: owner.id, name: owner.name }, "record.created", { recordId: id }, d.title);
  if (d.assignedTo) await logActivity({ id: owner.id, name: owner.name }, "record.assigned", { recordId: id }, d.assignedTo);
  const created = (await getRecord(owner, id))!;
  if (d.assignedTo) await notifyAssignee(created, d.assignedTo, owner);
  return created;
}

export type RecordPatch = Partial<z.input<typeof recordInput>> & { researchNotes?: string };

/**
 * Update fields. The owner may change anything; a contributor may only write research notes on a record they can see
 * (progress changes go through transition()). `expectedVersion` makes a stale save fail instead of overwriting.
 */
export async function updateRecord(actor: Viewer, id: string, patch: RecordPatch, expectedVersion?: number): Promise<PlannerRecord> {
  const cur = await getRecord(actor, id);
  if (!cur) throw new PlannerError("not_found", "Task not found.");
  if (expectedVersion != null && expectedVersion !== cur.version) throw new PlannerError("conflict", `This task was changed by ${cur.updatedByName || "someone else"} in the meantime. Reload to continue.`);
  const owner = isOwner(actor);
  const sets: string[] = [];
  const args: (string | number | null)[] = [];
  const set = (col: string, val: string | number | null) => {
    sets.push(`${col} = ?`);
    args.push(val);
  };
  if (patch.researchNotes !== undefined) set("research_notes", patch.researchNotes.slice(0, 8000));
  if (owner) {
    const fields = await listFields();
    if (patch.title !== undefined) set("title", recordInput.shape.title.parse(patch.title));
    if (patch.brief !== undefined) set("brief", recordInput.shape.brief.parse(patch.brief));
    if (patch.topicId !== undefined) set("topic_id", patch.topicId);
    if (patch.priority !== undefined) set("priority", recordInput.shape.priority.parse(patch.priority));
    if (patch.dueDate !== undefined) set("due_date", date.parse(patch.dueDate));
    if (patch.notes !== undefined) set("notes", recordInput.shape.notes.parse(patch.notes));
    if (patch.custom !== undefined) set("custom", JSON.stringify({ ...cur.custom, ...sanitizeCustom(patch.custom, fields) }));
    if (patch.status !== undefined && patch.status !== cur.status) set("status", recordInput.shape.status.parse(patch.status));
  } else if (patch.title !== undefined || patch.brief !== undefined || patch.topicId !== undefined || patch.priority !== undefined || patch.dueDate !== undefined || patch.notes !== undefined || patch.custom !== undefined || patch.status !== undefined) {
    throw new PlannerError("forbidden", "Contributors can only edit research notes.");
  }
  if (!sets.length) return cur;
  const db = await conn();
  const r = await db.execute({
    sql: `UPDATE planner_records SET ${sets.join(", ")}, version = version + 1, updated_by = ?, updated_at = ? WHERE id = ? AND version = ?`,
    args: [...args, actor.id, nowIso(), id, cur.version],
  });
  if (!r.rowsAffected) throw new PlannerError("conflict", "This task was changed in the meantime. Reload to continue.");
  // A module task's title IS the title of its module or chapter: one name, kept in both places. The address (slug) never changes.
  if (owner && patch.title !== undefined && cur.module) {
    await db.execute({ sql: "UPDATE modules SET title = ?, version = version + 1, updated_at = ? WHERE id = ?", args: [recordInput.shape.title.parse(patch.title), nowIso(), cur.module.nodeId] });
  }
  if (patch.status !== undefined && patch.status !== cur.status && cur.articleId) {
    // A manual status change keeps the linked draft's review state in step (one source of truth, no drift).
    const meta = await getArticleMeta(cur.articleId);
    if (meta?.status === "draft") await setReviewStatus(cur.articleId, patch.status === "in_review" ? "requested" : patch.status === "revision" ? "revision" : patch.status === "approved" ? "approved" : "none");
  }
  if (patch.status !== undefined && patch.status !== cur.status) await logActivity({ id: actor.id, name: actor.name }, "record.status", { recordId: id, articleId: cur.articleId }, `${STATUS_LABEL[cur.status]} -> ${STATUS_LABEL[patch.status]}`);
  else await logActivity({ id: actor.id, name: actor.name }, "record.updated", { recordId: id, articleId: cur.articleId });
  return (await getRecord(actor, id))!;
}

export async function deleteRecord(owner: Viewer, id: string): Promise<boolean> {
  if (!isOwner(owner)) throw new PlannerError("forbidden", "Only the owner can delete tasks.");
  const db = await conn();
  const r = await db.batch(
    [
      { sql: "DELETE FROM comments WHERE record_id = ?", args: [id] },
      { sql: "DELETE FROM activity WHERE record_id = ?", args: [id] },
      { sql: "DELETE FROM planner_records WHERE id = ?", args: [id] },
    ],
    "write",
  );
  await audit(owner.id, "planner.delete", id);
  return r[2].rowsAffected > 0;
}

// ---------------------------------------------------------------- assignment and sharing (owner)

export async function assignRecord(owner: Viewer, id: string, userId: string | null): Promise<PlannerRecord> {
  if (!isOwner(owner)) throw new PlannerError("forbidden", "Only the owner can assign work.");
  const cur = await getRecord(owner, id);
  if (!cur) throw new PlannerError("not_found", "Task not found.");
  if (userId && !(await userExists(userId))) throw new PlannerError("invalid", "That contributor does not exist or is disabled.");
  const db = await conn();
  const status: RecordStatus = userId && cur.status === "idea" ? "planned" : cur.status;
  await db.execute({ sql: "UPDATE planner_records SET assigned_to = ?, status = ?, version = version + 1, updated_by = ?, updated_at = ? WHERE id = ?", args: [userId, status, owner.id, nowIso(), id] });
  if (cur.articleId) await setAssignedTo(cur.articleId, userId); // the draft follows the task: one assignment, no copies
  await logActivity({ id: owner.id, name: owner.name }, "record.assigned", { recordId: id, articleId: cur.articleId }, userId ?? "unassigned");
  const updated = (await getRecord(owner, id))!;
  if (userId && userId !== cur.assignedTo) await notifyAssignee(updated, userId, owner); // only on a change of assignee
  return updated;
}

export async function shareRecord(owner: Viewer, id: string, userIds: string[]): Promise<PlannerRecord> {
  if (!isOwner(owner)) throw new PlannerError("forbidden", "Only the owner can share work.");
  const cur = await getRecord(owner, id);
  if (!cur) throw new PlannerError("not_found", "Task not found.");
  const ids = [...new Set(userIds)].slice(0, 20);
  const db = await conn();
  await db.execute({ sql: "UPDATE planner_records SET shared_with = ?, version = version + 1, updated_by = ?, updated_at = ? WHERE id = ?", args: [JSON.stringify(ids), owner.id, nowIso(), id] });
  await logActivity({ id: owner.id, name: owner.name }, "record.shared", { recordId: id }, `${ids.length} people`);
  return (await getRecord(owner, id))!;
}

// ---------------------------------------------------------------- the linked article

/** Owner: creates a draft for this task (assigned to the same contributor) and links it. At most one article per task. */
export async function createDraftForRecord(owner: Viewer, id: string): Promise<{ articleId: string }> {
  if (!isOwner(owner)) throw new PlannerError("forbidden", "Only the owner can create drafts for tasks.");
  const cur = await getRecord(owner, id);
  if (!cur) throw new PlannerError("not_found", "Task not found.");
  if (cur.articleId) return { articleId: cur.articleId };
  const byline = cur.assignedToName ?? owner.name;
  const article = await createArticle(
    { title: cur.title, excerpt: "", categoryId: cur.topicId, authorName: byline, tags: [], doc: { version: 1, blocks: [] }, source: "editor" },
    { id: owner.id, name: owner.name },
    { assignedTo: cur.assignedTo },
  );
  const db = await conn();
  await db.execute({ sql: "UPDATE planner_records SET article_id = ?, version = version + 1, updated_by = ?, updated_at = ? WHERE id = ? AND article_id IS NULL", args: [article.id, owner.id, nowIso(), id] });
  await logActivity({ id: owner.id, name: owner.name }, "article.created", { recordId: id, articleId: article.id }, cur.title);
  return { articleId: article.id };
}

/** Owner: links an existing article. An article can belong to one task only; the draft is assigned to the task's contributor. */
export async function linkArticle(owner: Viewer, id: string, articleId: string | null): Promise<PlannerRecord> {
  if (!isOwner(owner)) throw new PlannerError("forbidden", "Only the owner can link articles.");
  const cur = await getRecord(owner, id);
  if (!cur) throw new PlannerError("not_found", "Task not found.");
  const db = await conn();
  if (articleId) {
    if (!isArticleId(articleId)) throw new PlannerError("invalid", "An Article ID starts with a_ and is shown in Article Management. Copy it from there.");
    const art = await getArticleById(articleId);
    if (!art) throw new PlannerError("invalid", `No article has the ID "${articleId}". Copy the ID from Article Management and try again.`);
    const clash = (await db.execute({ sql: "SELECT id FROM planner_records WHERE article_id = ? AND id <> ?", args: [articleId, id] })).rows[0];
    if (clash) throw new PlannerError("conflict", "That article is already linked to another task.");
    if (art.status === "draft") await setAssignedTo(articleId, cur.assignedTo);
  }
  await db.execute({ sql: "UPDATE planner_records SET article_id = ?, version = version + 1, updated_by = ?, updated_at = ? WHERE id = ?", args: [articleId, owner.id, nowIso(), id] });
  await logActivity({ id: owner.id, name: owner.name }, "article.linked", { recordId: id, articleId });
  return (await getRecord(owner, id))!;
}

// ---------------------------------------------------------------- the editorial workflow

export type Transition = "start" | "submit" | "withdraw" | "request_revision" | "approve" | "complete" | "reopen" | "archive";

/**
 * Who may do what (enforced here, not in the UI):
 *   start / submit / withdraw - the assigned contributor (with Collab access) or the owner
 *   request_revision / approve / complete / reopen / archive - the owner only
 * Nothing here publishes: publishing is a separate owner-only action on the article.
 */
export async function transition(actor: Viewer, id: string, action: Transition, note = ""): Promise<PlannerRecord> {
  const cur = await getRecord(actor, id);
  if (!cur) throw new PlannerError("not_found", "Task not found.");
  const owner = isOwner(actor);
  const mine = cur.assignedTo === actor.id;
  const ownerOnly = action === "request_revision" || action === "approve" || action === "complete" || action === "reopen" || action === "archive";
  if (ownerOnly && !owner) throw new PlannerError("forbidden", "Only the owner can do that.");
  if (!ownerOnly && !owner && !mine) throw new PlannerError("forbidden", "Only the person this task is assigned to can do that.");

  const from = cur.status;
  const rule: Record<Transition, { from: RecordStatus[]; to: RecordStatus }> = {
    start: { from: ["planned", "revision", "idea"], to: "in_progress" },
    submit: { from: ["planned", "in_progress", "revision"], to: "in_review" },
    withdraw: { from: ["in_review"], to: "in_progress" },
    request_revision: { from: ["in_review"], to: "revision" },
    approve: { from: ["in_review"], to: "approved" },
    complete: { from: ["approved", "in_progress", "in_review"], to: "done" },
    reopen: { from: ["done", "approved", "archived", "in_review"], to: "in_progress" },
    archive: { from: STATUSES.filter((x) => x !== "archived") as RecordStatus[], to: "archived" },
  };
  const r = rule[action];
  if (!r.from.includes(from)) throw new PlannerError("invalid", `A task that is "${STATUS_LABEL[from]}" cannot do "${action.replace("_", " ")}".`);
  if (action === "submit" && !cur.articleId && !cur.module?.hasBody && !cur.researchNotes.trim()) throw new PlannerError("invalid", cur.module ? "Write some of the module, or add research notes, before submitting for review." : "Add research notes or a draft before submitting for review.");

  const db = await conn();
  const res = await db.execute({
    sql: "UPDATE planner_records SET status = ?, version = version + 1, updated_by = ?, updated_at = ? WHERE id = ? AND version = ?",
    args: [r.to, actor.id, nowIso(), id, cur.version],
  });
  if (!res.rowsAffected) throw new PlannerError("conflict", "This task was changed in the meantime. Reload to continue.");

  // The linked draft mirrors the review state, and a snapshot of it is kept for the audit trail.
  const art = cur.articleId ? await getArticleById(cur.articleId) : null;
  const who = { id: actor.id, name: actor.name };
  if (art && art.status === "draft") {
    const review = action === "submit" ? "requested" : action === "request_revision" ? "revision" : action === "approve" ? "approved" : action === "start" || action === "reopen" || action === "withdraw" ? "none" : null;
    if (review) await setReviewStatus(art.id, review);
    const kind = action === "submit" ? "submit" : action === "request_revision" ? "revision" : action === "approve" ? "approve" : null;
    if (kind) await recordRevision({ articleId: art.id, version: art.version, title: art.title, excerpt: art.excerpt, doc: art.doc, editor: who, kind, note: note.slice(0, 300) });
  }
  if (cur.module) {
    // The module's content status follows the task: review means scientific review, approval means final.
    const next: ContentStatus | null = action === "submit" ? "scientific_review" : action === "approve" ? "final" : action === "request_revision" || action === "start" || action === "withdraw" ? "drafting" : null;
    if (next) await db.execute({ sql: "UPDATE modules SET content_status = ?, version = version + 1, updated_at = ? WHERE id = ?", args: [next, nowIso(), cur.module.nodeId] });
  }
  const label: Record<Transition, ActivityAction> = {
    start: "record.status",
    submit: "article.submitted",
    withdraw: "record.status",
    request_revision: "article.revision_requested",
    approve: "article.approved",
    complete: "record.status",
    reopen: "record.status",
    archive: "record.archived",
  };
  await logActivity(who, label[action], { recordId: id, articleId: cur.articleId }, `${STATUS_LABEL[from]} -> ${STATUS_LABEL[r.to]}`);
  if (note.trim() && (action === "request_revision" || action === "submit")) await addComment({ recordId: id, author: who, body: note.trim() });
  return (await getRecord(actor, id))!;
}

/** Called after the owner publishes an article: the linked task is done. */
export async function onArticlePublished(articleId: string, actor: { id: string; name: string }): Promise<void> {
  const rec = await getRecordForArticle(articleId);
  if (!rec || rec.status === "done") return;
  const db = await conn();
  await db.execute({ sql: "UPDATE planner_records SET status = 'done', version = version + 1, updated_by = ?, updated_at = ? WHERE id = ?", args: [actor.id, nowIso(), rec.id] });
  await logActivity(actor, "article.published", { recordId: rec.id, articleId });
}

export async function onArticleUnpublished(articleId: string, actor: { id: string; name: string }): Promise<void> {
  const rec = await getRecordForArticle(articleId);
  if (!rec || rec.status !== "done") return;
  const db = await conn();
  await db.execute({ sql: "UPDATE planner_records SET status = 'approved', version = version + 1, updated_by = ?, updated_at = ? WHERE id = ?", args: [actor.id, nowIso(), rec.id] });
  await logActivity(actor, "article.unpublished", { recordId: rec.id, articleId });
}

// ---------------------------------------------------------------- saved views

export const viewConfig = z.object({
  filters: z
    .object({
      q: z.string().max(80).optional(),
      status: z.array(z.enum(STATUSES)).max(8).optional(),
      assignee: z.string().max(60).optional(),
      priority: z.enum(PRIORITIES).optional(),
      topic: z.string().max(60).optional(),
    })
    .default({}),
  sort: z.object({ key: z.string().max(20), dir: z.enum(["asc", "desc"]) }).optional(),
  hidden: z.array(z.string().max(40)).max(40).default([]),
});
export type { ViewConfig } from "../planner-shared";

export async function listViews(v: Viewer, scope: "planner" | "collab"): Promise<SavedView[]> {
  const db = await conn();
  const r = await db.execute({ sql: "SELECT * FROM planner_views WHERE scope = ? AND (user_id IS NULL OR user_id = ?) ORDER BY user_id IS NOT NULL, created_at", args: [scope, v.id] });
  return r.rows.map((x) => ({ id: s(x.id), userId: sn(x.user_id), name: s(x.name), kind: s(x.kind) as SavedView["kind"], config: viewConfig.safeParse(json<unknown>(x.config, {})).data ?? viewConfig.parse({}), scope: s(x.scope) }));
}

/** The owner's views are global (everyone sees them, only the owner changes them); a contributor's views are private to them. */
export async function saveView(v: Viewer, input: { name: string; kind: SavedView["kind"]; config: unknown; scope: "planner" | "collab"; global?: boolean }): Promise<SavedView> {
  const name = input.name.trim().slice(0, 40);
  if (name.length < 2) throw new PlannerError("invalid", "Name the view (2+ characters).");
  const cfg = viewConfig.parse(input.config);
  const global = !!input.global && isOwner(v);
  const db = await conn();
  const id = newId("pv_");
  await db.execute({ sql: "INSERT INTO planner_views(id, user_id, name, kind, config, scope, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)", args: [id, global ? null : v.id, name, input.kind, JSON.stringify(cfg), input.scope, nowIso()] });
  return (await listViews(v, input.scope)).find((x) => x.id === id)!;
}

export async function deleteView(v: Viewer, id: string): Promise<boolean> {
  const db = await conn();
  const row = (await db.execute({ sql: "SELECT user_id FROM planner_views WHERE id = ?", args: [id] })).rows[0];
  if (!row) return false;
  const ownerOfView = sn(row.user_id);
  if (ownerOfView ? ownerOfView !== v.id : !isOwner(v)) throw new PlannerError("forbidden", "You can only delete your own views.");
  return (await db.execute({ sql: "DELETE FROM planner_views WHERE id = ?", args: [id] })).rowsAffected > 0;
}

// ---------------------------------------------------------------- info box, summary, export

export async function getInfo(): Promise<string> {
  const db = await conn();
  const r = (await db.execute({ sql: "SELECT value FROM settings WHERE key = 'planner_info'", args: [] })).rows[0];
  return r ? s(r.value) : "";
}

export async function setInfo(owner: Viewer, text: string): Promise<void> {
  if (!isOwner(owner)) throw new PlannerError("forbidden", "Only the owner can edit the information box.");
  const db = await conn();
  await db.execute({ sql: "INSERT INTO settings(key, value) VALUES ('planner_info', ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value", args: [text.trim().slice(0, 4000)] });
}

export type CollabSummary = { open: number; inReview: number; revision: number; overdue: number; mine: number; unassigned: number; unresolved: number };

/** A handful of counters for the dashboards, scoped to what the viewer may see. One round trip. */
export async function collabSummary(v: Viewer): Promise<CollabSummary> {
  const vis = visibility(v);
  const empty: CollabSummary = { open: 0, inReview: 0, revision: 0, overdue: 0, mine: 0, unassigned: 0, unresolved: 0 };
  if (!vis) return empty;
  const db = await conn();
  const today = new Date().toISOString().slice(0, 10);
  const r = (
    await db.execute({
      sql: `SELECT
          SUM(CASE WHEN p.status NOT IN ('done','archived') THEN 1 ELSE 0 END) AS open,
          SUM(CASE WHEN p.status = 'in_review' THEN 1 ELSE 0 END) AS in_review,
          SUM(CASE WHEN p.status = 'revision' THEN 1 ELSE 0 END) AS revision,
          SUM(CASE WHEN p.status NOT IN ('done','archived') AND p.due_date IS NOT NULL AND p.due_date < ? THEN 1 ELSE 0 END) AS overdue,
          SUM(CASE WHEN p.assigned_to = ? AND p.status NOT IN ('done','archived') THEN 1 ELSE 0 END) AS mine,
          SUM(CASE WHEN p.assigned_to IS NULL AND p.status NOT IN ('done','archived') THEN 1 ELSE 0 END) AS unassigned
        FROM planner_records p WHERE ${vis.sql}`,
      args: [today, v.id, ...vis.args],
    })
  ).rows[0];
  const unresolved = isOwner(v)
    ? n((await db.execute("SELECT COUNT(*) AS c FROM comments WHERE resolved = 0 AND parent_id IS NULL")).rows[0].c)
    : n(
        (
          await db.execute({
            sql: `SELECT COUNT(*) AS c FROM comments c WHERE c.resolved = 0 AND c.parent_id IS NULL AND c.record_id IN (SELECT p.id FROM planner_records p WHERE ${vis.sql})`,
            args: vis.args,
          })
        ).rows[0].c,
      );
  return { open: n(r.open), inReview: n(r.in_review), revision: n(r.revision), overdue: n(r.overdue), mine: n(r.mine), unassigned: n(r.unassigned), unresolved };
}

const csvCell = (v: unknown) => {
  let t = v == null ? "" : String(v);
  if (/^[=+\-@\t\r]/.test(t)) t = `'${t}`; // neutralise spreadsheet formulas
  return /[",\n\r]/.test(t) ? `"${t.replace(/"/g, '""')}"` : t;
};

/** Owner-only CSV of every record, with the custom fields as extra columns. A single query (a Worker allows few subrequests). */
export async function exportRecordsCsv(owner: Viewer): Promise<string> {
  if (!isOwner(owner)) throw new PlannerError("forbidden", "Only the owner can export.");
  const [{ items }, fields] = await Promise.all([listRecords(owner, { limit: 500 }), listFields()]);
  const head = ["Task ID", "Title", "Status", "Priority", "Due date", "Assigned to", "Topic", "Article", "Article status", "Review status", "Brief", "Research notes", "Notes", "Created by", "Last updated", ...fields.map((f) => f.name)];
  const lines = [head.join(",")];
  for (const r of items) {
    lines.push(
      [r.ref, r.title, STATUS_LABEL[r.status], r.priority, r.dueDate, r.assignedToName, r.topicName, r.articleTitle, r.articleStatus, r.reviewStatus, r.brief, r.researchNotes, r.notes, r.createdByName, r.updatedAt, ...fields.map((f) => r.custom[f.id])]
        .map(csvCell)
        .join(","),
    );
  }
  return lines.join("\n") + "\n";
}


/** Owner: drafts and published articles that are not linked to any task yet (for the "link an article" picker). */
export async function listLinkableArticles(owner: Viewer, limit = 100): Promise<{ id: string; title: string; status: string }[]> {
  if (!isOwner(owner)) return [];
  const db = await conn();
  const r = await db.execute({
    sql: "SELECT a.id, a.title, a.status FROM articles a WHERE a.status <> 'archived' AND NOT EXISTS (SELECT 1 FROM planner_records p WHERE p.article_id = a.id) ORDER BY a.updated_at DESC LIMIT ?",
    args: [limit],
  });
  return r.rows.map((x) => ({ id: s(x.id), title: s(x.title), status: s(x.status) }));
}

// ---------------------------------------------------------------- spreadsheet edits (inline edit and paste)

const dateOrNull = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable();
export const bulkSet = z
  .object({
    title: z.string().trim().min(3).max(160).optional(),
    brief: z.string().trim().max(4000).optional(),
    notes: z.string().trim().max(4000).optional(),
    topicId: z.string().max(60).nullable().optional(),
    assignedTo: z.string().max(60).nullable().optional(),
    status: z.enum(STATUSES).optional(),
    priority: z.enum(PRIORITIES).optional(),
    dueDate: dateOrNull.optional(),
    custom: z.record(z.string(), z.unknown()).optional(),
  })
  .strict();
export const bulkInput = z.object({
  rows: z.array(z.object({ id: z.string().max(60).nullable(), expectedVersion: z.number().int().positive().optional(), set: bulkSet })).min(1).max(100),
});
export type BulkResult = { created: number; updated: number; conflicts: number[]; invalid: { row: number; message: string }[] };

const REVIEW_OF: Record<string, string> = { in_review: "requested", revision: "revision", approved: "approved" };

/**
 * Owner only. Applies up to 100 task changes (inline cell edits, a pasted spreadsheet block) in ONE database round trip: a
 * Cloudflare Worker allows few subrequests, so row-by-row writes are not an option. An update is skipped (reported as a
 * conflict) when the task was changed by someone else since the page was loaded. The linked draft follows the task's status
 * and assignee, as in the other task functions.
 */
export async function bulkApply(owner: Viewer, input: z.input<typeof bulkInput>): Promise<BulkResult> {
  if (!isOwner(owner)) throw new PlannerError("forbidden", "Only the owner can edit the planner table.");
  const data = bulkInput.parse(input);
  const fields = await listFields();
  const byId = new Map(fields.map((f) => [f.id, f]));
  const db = await conn();

  const topicIds = [...new Set(data.rows.map((r) => r.set.topicId).filter((x): x is string => !!x))];
  const userIds = [...new Set(data.rows.map((r) => r.set.assignedTo).filter((x): x is string => !!x))];
  const [topics, users] = await Promise.all([
    topicIds.length ? db.execute({ sql: `SELECT id FROM categories WHERE id IN (${topicIds.map(() => "?").join(",")})`, args: topicIds }) : null,
    userIds.length ? db.execute({ sql: `SELECT id FROM users WHERE disabled = 0 AND id IN (${userIds.map(() => "?").join(",")})`, args: userIds }) : null,
  ]);
  const okTopics = new Set(topics?.rows.map((r) => s(r.id)));
  const okUsers = new Set(users?.rows.map((r) => s(r.id)));

  const t = nowIso();
  const stmts: { sql: string; args: (string | number | null)[] }[] = [];
  const updateAt: { stmt: number; row: number }[] = [];
  const result: BulkResult = { created: 0, updated: 0, conflicts: [], invalid: [] };

  data.rows.forEach((row, i) => {
    const set = row.set;
    if (set.topicId && !okTopics.has(set.topicId)) return void result.invalid.push({ row: i + 1, message: "That topic does not exist." });
    if (set.assignedTo && !okUsers.has(set.assignedTo)) return void result.invalid.push({ row: i + 1, message: "That contributor does not exist or is disabled." });
    // custom values: known fields only, coerced to the field's type; null clears the value
    const patch: Record<string, unknown> = {};
    for (const [fid, v] of Object.entries(set.custom ?? {})) {
      const f = byId.get(fid);
      if (!f) continue;
      if (v === null || v === "") patch[fid] = null;
      else {
        const clean = sanitizeCustom({ [fid]: v }, [f]);
        if (fid in clean) patch[fid] = clean[fid];
      }
    }

    if (row.id) {
      const sets: string[] = [];
      const args: (string | number | null)[] = [];
      const put = (col: string, v: string | number | null) => {
        sets.push(`${col} = ?`);
        args.push(v);
      };
      if (set.title !== undefined) put("title", set.title);
      if (set.brief !== undefined) put("brief", set.brief);
      if (set.notes !== undefined) put("notes", set.notes);
      if (set.topicId !== undefined) put("topic_id", set.topicId);
      if (set.priority !== undefined) put("priority", set.priority);
      if (set.dueDate !== undefined) put("due_date", set.dueDate);
      if (set.assignedTo !== undefined) {
        put("assigned_to", set.assignedTo);
        if (set.assignedTo && set.status === undefined) sets.push("status = CASE WHEN status = 'idea' THEN 'planned' ELSE status END");
      }
      if (set.status !== undefined) put("status", set.status);
      if (Object.keys(patch).length) {
        sets.push("custom = json_patch(custom, ?)");
        args.push(JSON.stringify(patch));
      }
      if (!sets.length) return;
      stmts.push({
        sql: `UPDATE planner_records SET ${sets.join(", ")}, version = version + 1, updated_by = ?, updated_at = ? WHERE id = ?${row.expectedVersion ? " AND version = ?" : ""}`,
        args: [...args, owner.id, t, row.id, ...(row.expectedVersion ? [row.expectedVersion] : [])],
      });
      updateAt.push({ stmt: stmts.length - 1, row: i });
      // the linked draft follows (each guarded so it only applies if the task update above really happened)
      if (set.status !== undefined) {
        stmts.push({
          sql: "UPDATE articles SET review_status = ?, submitted_for_review = ?, updated_at = ? WHERE status = 'draft' AND id = (SELECT article_id FROM planner_records WHERE id = ? AND status = ?)",
          args: [REVIEW_OF[set.status] ?? "none", set.status === "in_review" ? 1 : 0, t, row.id, set.status],
        });
      }
      if (set.assignedTo !== undefined) {
        stmts.push({
          sql: "UPDATE articles SET assigned_to = ?, updated_at = ? WHERE status = 'draft' AND id = (SELECT article_id FROM planner_records WHERE id = ? AND assigned_to IS ?)",
          args: [set.assignedTo, t, row.id, set.assignedTo],
        });
      }
    } else {
      if (!set.title) return void result.invalid.push({ row: i + 1, message: "A new task needs a title." });
      const status = set.status ?? (set.assignedTo ? "planned" : "idea");
      const live = Object.fromEntries(Object.entries(patch).filter(([, v]) => v !== null));
      stmts.push({
        sql: `INSERT INTO planner_records(id, num, title, brief, topic_id, status, priority, due_date, assigned_to, notes, custom, created_by, updated_by, created_at, updated_at)
              VALUES (?, (SELECT COALESCE(MAX(num), 0) + 1 FROM planner_records), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [newId("p_"), set.title, set.brief ?? "", set.topicId ?? null, status, set.priority ?? "normal", set.dueDate ?? null, set.assignedTo ?? null, set.notes ?? "", JSON.stringify(live), owner.id, owner.id, t, t],
      });
      result.created++;
    }
  });

  if (!stmts.length) return result;
  const res = await db.batch(stmts, "write");
  for (const u of updateAt) {
    if (res[u.stmt].rowsAffected > 0) result.updated++;
    else result.conflicts.push(u.row + 1);
  }
  const single = data.rows.length === 1 && data.rows[0].id ? data.rows[0].id : null;
  await logActivity({ id: owner.id, name: owner.name }, "record.updated", { recordId: single }, single ? "Edited in the table" : `Spreadsheet edit: ${result.created} new, ${result.updated} updated`);
  return result;
}
