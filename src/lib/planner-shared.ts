/**
 * Planner / Collab vocabulary and the pure view logic, shared by the server store and the browser components. It imports
 * nothing from the database layer, so a client component can use it without pulling server code into the bundle.
 */

import type { ContentStatus, PublicationStatus } from "./modules/shared";

export const STATUSES = ["idea", "planned", "in_progress", "in_review", "revision", "approved", "done", "archived"] as const;
export type RecordStatus = (typeof STATUSES)[number];
export const PRIORITIES = ["low", "normal", "high", "urgent"] as const;
export type Priority = (typeof PRIORITIES)[number];

export const STATUS_LABEL: Record<RecordStatus, string> = {
  idea: "Idea",
  planned: "Planned",
  in_progress: "In progress",
  in_review: "In review",
  revision: "Needs revision",
  approved: "Approved",
  done: "Done",
  archived: "Archived",
};
export const PRIORITY_LABEL: Record<Priority, string> = { low: "Low", normal: "Normal", high: "High", urgent: "Urgent" };
export const REVIEW_LABEL = { none: "Not in review", requested: "Awaiting review", revision: "Revision requested", approved: "Approved" } as const;

export const taskRef = (num: number) => `T-${String(num).padStart(4, "0")}`;

export type ReviewState = keyof typeof REVIEW_LABEL;

/** Every task is about an article (the original kind of task) or about a learning module. */
export const CONTENT_TYPES = ["article", "module"] as const;
export type ContentType = (typeof CONTENT_TYPES)[number];
export const CONTENT_TYPE_LABEL: Record<ContentType, string> = { article: "Article", module: "Module" };

/** What a module task knows about the module (or chapter) it plans. The module itself is the single source of these fields. */
export type ModuleTaskInfo = {
  nodeId: string;
  kind: "module" | "chapter";
  subjectSlug: string;
  subjectName: string;
  /** The specialization inside the subject (General Biology, Bioinformatics, ...). */
  specializationSlug: string;
  specializationName: string;
  levelSlug: string;
  levelNum: number;
  levelName: string;
  /** Discipline heading the module sits under ("" when it sits directly under the level). */
  discipline: string;
  moduleTitle: string;
  /** The chapter's title when the task plans a chapter, otherwise "". */
  chapter: string;
  contentStatus: ContentStatus;
  publication: PublicationStatus;
  hasBody: boolean;
};

export type PlannerRecord = {
  id: string;
  num: number;
  ref: string;
  title: string;
  brief: string;
  topicId: string | null;
  topicName: string | null;
  status: RecordStatus;
  priority: Priority;
  dueDate: string | null;
  assignedTo: string | null;
  assignedToName: string | null;
  sharedWith: string[];
  articleId: string | null;
  articleTitle: string | null;
  articleStatus: string | null;
  articleVersion: number | null;
  articleLastEditor: string | null;
  articleUpdatedAt: string | null;
  reviewStatus: ReviewState;
  researchNotes: string;
  /** Owner's private notes. Always empty for contributors. */
  notes: string;
  custom: Record<string, unknown>;
  contentType: ContentType;
  /** Set for module tasks only. */
  module: ModuleTaskInfo | null;
  createdBy: string;
  createdByName: string;
  updatedByName: string;
  version: number;
  createdAt: string;
  updatedAt: string;
};

export const FIELD_TYPES = ["text", "longtext", "number", "date", "select", "checkbox", "url"] as const;
export type FieldType = (typeof FIELD_TYPES)[number];
export type PlannerField = { id: string; name: string; type: FieldType; options: string[]; sort: number };

export type ViewFilters = { q?: string; status?: RecordStatus[]; assignee?: string; priority?: Priority; topic?: string; subject?: string; level?: string; contentStatus?: ContentStatus; publication?: PublicationStatus };
export type ViewConfig = { filters: ViewFilters; sort?: { key: string; dir: "asc" | "desc" }; hidden: string[] };
export type ViewKind = "table" | "kanban" | "ticket";
export type SavedView = { id: string; userId: string | null; name: string; kind: ViewKind; config: ViewConfig; scope: string };

/** Built-in tabs of the Collab page. They are filters over the same records; nothing is copied. */
export type Preset = "all" | "mine" | "team" | "review" | "recent" | "completed";

export const emptyConfig = (): ViewConfig => ({ filters: {}, hidden: [] });

const CONTENT_RANK: ContentStatus[] = ["not_started", "outlined", "drafting", "scientific_review", "final"];
const PUBLICATION_RANK: PublicationStatus[] = ["draft", "published", "archived"];
const PRIORITY_RANK: Record<Priority, number> = { urgent: 0, high: 1, normal: 2, low: 3 };

const SORTERS: Record<string, (a: PlannerRecord, b: PlannerRecord) => number> = {
  num: (a, b) => a.num - b.num,
  title: (a, b) => a.title.localeCompare(b.title, "en", { sensitivity: "base" }),
  status: (a, b) => STATUSES.indexOf(a.status) - STATUSES.indexOf(b.status),
  priority: (a, b) => PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority],
  due: (a, b) => (a.dueDate ?? "9999-99-99").localeCompare(b.dueDate ?? "9999-99-99"),
  assignee: (a, b) => (a.assignedToName ?? "~").localeCompare(b.assignedToName ?? "~", "en", { sensitivity: "base" }),
  updated: (a, b) => a.updatedAt.localeCompare(b.updatedAt),
  // module tasks (a task that is not about a module sorts last)
  subject: (a, b) => (a.module?.subjectName ?? "~").localeCompare(b.module?.subjectName ?? "~", "en", { sensitivity: "base" }),
  level: (a, b) => (a.module?.levelNum ?? 999) - (b.module?.levelNum ?? 999),
  discipline: (a, b) => (a.module?.discipline ?? "~").localeCompare(b.module?.discipline ?? "~", "en", { sensitivity: "base" }),
  module: (a, b) => (a.module?.moduleTitle ?? "~").localeCompare(b.module?.moduleTitle ?? "~", "en", { sensitivity: "base" }),
  contentStatus: (a, b) => CONTENT_RANK.indexOf(a.module?.contentStatus ?? "not_started") - CONTENT_RANK.indexOf(b.module?.contentStatus ?? "not_started"),
  publication: (a, b) => PUBLICATION_RANK.indexOf(a.module?.publication ?? "draft") - PUBLICATION_RANK.indexOf(b.module?.publication ?? "draft"),
};
export const SORT_KEYS = Object.keys(SORTERS);

/** Pure filter + sort over records already loaded (a handful of KB), so switching views costs no request at all. */
export function applyView(records: readonly PlannerRecord[], config: ViewConfig, opts: { userId: string; preset?: Preset } = { userId: "" }): PlannerRecord[] {
  const f = config.filters;
  const q = f.q?.trim().toLowerCase();
  const closed = (r: PlannerRecord) => r.status === "done" || r.status === "archived";
  let out = records.filter((r) => {
    if (f.status?.length && !f.status.includes(r.status)) return false;
    if (f.assignee === "none" ? r.assignedTo !== null : f.assignee ? r.assignedTo !== f.assignee : false) return false;
    if (f.priority && r.priority !== f.priority) return false;
    if (f.topic && r.topicId !== f.topic) return false;
    if (f.subject && r.module?.subjectSlug !== f.subject) return false;
    if (f.level && r.module?.levelSlug !== f.level) return false;
    if (f.contentStatus && r.module?.contentStatus !== f.contentStatus) return false;
    if (f.publication && r.module?.publication !== f.publication) return false;
    if (q) {
      const m = r.module ? ` ${r.module.moduleTitle} ${r.module.chapter} ${r.module.discipline} ${r.module.subjectName} ${r.module.levelName}` : "";
      if (!`${r.title}\n${r.brief}\n${r.researchNotes}\n${r.ref}${m}`.toLowerCase().includes(q)) return false;
    }
    switch (opts.preset) {
      case "mine":
        return r.assignedTo === opts.userId && !closed(r);
      case "team":
        return !closed(r);
      case "review":
        return r.status === "in_review";
      case "completed":
        return r.status === "done";
      default:
        return true;
    }
  });
  const key = opts.preset === "recent" ? "updated" : (config.sort?.key ?? "num");
  const dir = opts.preset === "recent" ? "desc" : (config.sort?.dir ?? "asc");
  const cmp = SORTERS[key] ?? SORTERS.num;
  out = [...out].sort((a, b) => (dir === "desc" ? -1 : 1) * cmp(a, b) || a.num - b.num);
  return out;
}

export const isOverdue = (r: Pick<PlannerRecord, "dueDate" | "status">, today = new Date().toISOString().slice(0, 10)) =>
  !!r.dueDate && r.dueDate < today && r.status !== "done" && r.status !== "archived";

/** Columns of the table view that can be hidden (Task ID and Title always stay). */
export const TABLE_COLUMNS = [
  { key: "assignee", label: "Assigned To" },
  { key: "createdBy", label: "Created By" },
  { key: "status", label: "Status" },
  { key: "priority", label: "Priority" },
  { key: "due", label: "Due Date" },
  { key: "topic", label: "Topic" },
  { key: "updated", label: "Last Updated" },
  { key: "review", label: "Review Status" },
  { key: "article", label: "Related Article" },
  { key: "notes", label: "Notes" },
  { key: "brief", label: "Brief" },
] as const;

/** Brief is long, so it starts hidden; "Columns" brings it back. */
export const DEFAULT_HIDDEN: string[] = ["brief"];
