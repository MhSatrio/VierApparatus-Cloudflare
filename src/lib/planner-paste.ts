/**
 * Spreadsheet behaviour of the planner table: which columns exist, how a cell reads as text (copy), and how pasted
 * spreadsheet text (tab separated, exactly as Excel / Google Sheets / LibreOffice put it on the clipboard) becomes changes.
 * Pure functions with no database or browser code, so the same rules run in the browser (preview) and in tests, and the
 * server re-validates everything anyway.
 */
import { PRIORITIES, PRIORITY_LABEL, REVIEW_LABEL, STATUSES, STATUS_LABEL, type PlannerField, type PlannerRecord } from "./planner-shared";
import { CONTENT_STATUS_LABEL, PUBLICATION_LABEL } from "./modules/shared";

export type Option = { value: string; label: string };
export type Person = { id: string; name: string };
export type Lookups = { people: Person[]; topics: { id: string; name: string }[] };

export type ColumnKind = "title" | "text" | "longtext" | "select" | "date" | "number" | "checkbox" | "url" | "readonly";
export type GridColumn = { key: string; label: string; kind: ColumnKind; options?: Option[]; field?: PlannerField; sortKey?: string };

/** Everything a paste or an inline edit may change on one task. Mirrors the server's validation. */
export type BulkSet = {
  title?: string;
  brief?: string;
  notes?: string;
  topicId?: string | null;
  assignedTo?: string | null;
  status?: (typeof STATUSES)[number];
  priority?: (typeof PRIORITIES)[number];
  dueDate?: string | null;
  /** field id -> value, or null to clear */
  custom?: Record<string, unknown>;
};
export type BulkRow = { id: string | null; expectedVersion?: number; set: BulkSet };

export const MAX_BULK_ROWS = 100;

export function gridColumns(fields: PlannerField[], lk: Lookups): GridColumn[] {
  const people: Option[] = lk.people.map((p) => ({ value: p.id, label: p.name }));
  const topics: Option[] = lk.topics.map((t) => ({ value: t.id, label: t.name }));
  const base: GridColumn[] = [
    { key: "num", label: "Task ID", kind: "readonly", sortKey: "num" },
    { key: "title", label: "Article Title", kind: "title", sortKey: "title" },
    { key: "assignee", label: "Assigned To", kind: "select", options: people, sortKey: "assignee" },
    { key: "createdBy", label: "Created By", kind: "readonly" },
    { key: "status", label: "Status", kind: "select", options: STATUSES.map((s) => ({ value: s, label: STATUS_LABEL[s] })), sortKey: "status" },
    { key: "priority", label: "Priority", kind: "select", options: PRIORITIES.map((p) => ({ value: p, label: PRIORITY_LABEL[p] })), sortKey: "priority" },
    { key: "due", label: "Due Date", kind: "date", sortKey: "due" },
    { key: "topic", label: "Topic", kind: "select", options: topics },
    { key: "updated", label: "Last Updated", kind: "readonly", sortKey: "updated" },
    { key: "review", label: "Review Status", kind: "readonly" },
    { key: "article", label: "Related Article", kind: "readonly" },
    { key: "notes", label: "Notes", kind: "longtext" },
    { key: "brief", label: "Brief", kind: "longtext" },
  ];
  const custom: GridColumn[] = fields.map((f) => ({
    key: `f:${f.id}`,
    label: f.name,
    kind: f.type === "select" ? "select" : f.type,
    options: f.type === "select" ? f.options.map((o) => ({ value: o, label: o })) : undefined,
    field: f,
  }));
  return [...base, ...custom];
}

/**
 * The columns of the module view of the Planner: the same table, with the module's own details in place of the article ones.
 * Subject, level, discipline, module, chapter, content status and publication are read from the module itself, so they are
 * read-only here (they are edited on the module). The title, assignee, status, priority and due date are edited as usual.
 */
export function moduleColumns(lk: Lookups): GridColumn[] {
  const people: Option[] = lk.people.map((p) => ({ value: p.id, label: p.name }));
  return [
    { key: "num", label: "Task ID", kind: "readonly", sortKey: "num" },
    { key: "title", label: "Module / Chapter", kind: "title", sortKey: "title" },
    { key: "subject", label: "Subject", kind: "readonly", sortKey: "subject" },
    { key: "level", label: "Level", kind: "readonly", sortKey: "level" },
    { key: "discipline", label: "Discipline", kind: "readonly", sortKey: "discipline" },
    { key: "module", label: "Module", kind: "readonly", sortKey: "module" },
    { key: "chapter", label: "Chapter", kind: "readonly" },
    { key: "contentStatus", label: "Content Status", kind: "readonly", sortKey: "contentStatus" },
    { key: "publication", label: "Publication", kind: "readonly", sortKey: "publication" },
    { key: "assignee", label: "Assigned To", kind: "select", options: people, sortKey: "assignee" },
    { key: "status", label: "Task Status", kind: "select", options: STATUSES.map((s) => ({ value: s, label: STATUS_LABEL[s] })), sortKey: "status" },
    { key: "priority", label: "Priority", kind: "select", options: PRIORITIES.map((p) => ({ value: p, label: PRIORITY_LABEL[p] })), sortKey: "priority" },
    { key: "due", label: "Due Date", kind: "date", sortKey: "due" },
    { key: "updated", label: "Last Updated", kind: "readonly", sortKey: "updated" },
    { key: "brief", label: "Brief", kind: "longtext" },
  ];
}

export const isEditable = (c: GridColumn) => c.kind !== "readonly";

/** A cell as plain text: what Ctrl+C puts on the clipboard and what the grid shows. `owner` decides which notes are shown. */
export function cellText(r: PlannerRecord, c: GridColumn, owner: boolean): string {
  switch (c.key) {
    case "num":
      return r.ref;
    case "title":
      return r.title;
    case "assignee":
      return r.assignedToName ?? "";
    case "createdBy":
      return r.createdByName;
    case "status":
      return STATUS_LABEL[r.status];
    case "priority":
      return PRIORITY_LABEL[r.priority];
    case "due":
      return r.dueDate ?? "";
    case "topic":
      return r.topicName ?? "";
    case "updated":
      return r.updatedAt.slice(0, 10);
    case "review":
      return r.reviewStatus === "none" ? "" : REVIEW_LABEL[r.reviewStatus];
    case "article":
      return r.articleTitle ?? "";
    case "notes":
      return owner ? r.notes || r.researchNotes : r.researchNotes;
    case "brief":
      return r.brief;
    case "subject":
      return r.module?.subjectName ?? "";
    case "level":
      return r.module ? `${r.module.levelNum}. ${r.module.levelName}` : "";
    case "discipline":
      return r.module?.discipline ?? "";
    case "module":
      return r.module?.moduleTitle ?? "";
    case "chapter":
      return r.module?.chapter ?? "";
    case "contentStatus":
      return r.module ? CONTENT_STATUS_LABEL[r.module.contentStatus] : "";
    case "publication":
      return r.module ? PUBLICATION_LABEL[r.module.publication] : "";
  }
  if (c.field) {
    const v = r.custom[c.field.id];
    if (v === undefined || v === null) return "";
    return c.field.type === "checkbox" ? (v ? "Yes" : "No") : String(v);
  }
  return "";
}

// ---------------------------------------------------------------- reading values

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
const real = (y: number, m: number, d: number) => {
  const t = new Date(Date.UTC(y, m - 1, d));
  return t.getUTCFullYear() === y && t.getUTCMonth() === m - 1 && t.getUTCDate() === d;
};
const iso = (y: number, m: number, d: number) => `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

/** ISO (2026-12-01), day-first (1/12/2026, 01-12-2026, 1.12.2026) or "1 Dec 2026". Returns null when it is not a real date. */
export function parseDate(raw: string): string | null {
  const t = raw.trim();
  let m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(t);
  if (m && real(+m[1], +m[2], +m[3])) return iso(+m[1], +m[2], +m[3]);
  m = /^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/.exec(t);
  if (m && real(+m[3], +m[2], +m[1])) return iso(+m[3], +m[2], +m[1]);
  m = /^(\d{1,2})\s+([A-Za-z]{3,9})\.?,?\s+(\d{4})$/.exec(t);
  if (m) {
    const mi = MONTHS.indexOf(m[2].slice(0, 3).toLowerCase()) + 1;
    if (mi && real(+m[3], mi, +m[1])) return iso(+m[3], mi, +m[1]);
  }
  return null;
}

const norm = (s: string) => s.trim().toLowerCase().replace(/[_\s]+/g, " ");
const pick = (opts: Option[], raw: string) => {
  const n = norm(raw);
  return opts.find((o) => norm(o.value) === n || norm(o.label) === n);
};

export type CellResult = { ok: true; set: BulkSet } | { ok: false; error: string };

/** Turns one pasted or typed cell into a change. An empty cell clears the value where clearing makes sense. */
export function parseCell(c: GridColumn, raw: string, lk: Lookups): CellResult {
  const t = raw.replace(/\r/g, "").trim();
  const none: CellResult = { ok: true, set: {} };
  switch (c.key) {
    case "title":
      return t.length < 3 ? { ok: false, error: "a title needs at least 3 characters" } : { ok: true, set: { title: t.slice(0, 160) } };
    case "brief":
      return { ok: true, set: { brief: t.slice(0, 4000) } };
    case "notes":
      return { ok: true, set: { notes: t.slice(0, 4000) } };
    case "assignee": {
      if (!t) return { ok: true, set: { assignedTo: null } };
      const p = lk.people.find((x) => norm(x.name) === norm(t));
      return p ? { ok: true, set: { assignedTo: p.id } } : { ok: false, error: `no contributor named "${t}"` };
    }
    case "topic": {
      if (!t) return { ok: true, set: { topicId: null } };
      const p = lk.topics.find((x) => norm(x.name) === norm(t));
      return p ? { ok: true, set: { topicId: p.id } } : { ok: false, error: `no topic named "${t}"` };
    }
    case "status": {
      if (!t) return none;
      const o = pick(c.options ?? [], t);
      return o ? { ok: true, set: { status: o.value as BulkSet["status"] } } : { ok: false, error: `"${t}" is not a status` };
    }
    case "priority": {
      if (!t) return none;
      const o = pick(c.options ?? [], t);
      return o ? { ok: true, set: { priority: o.value as BulkSet["priority"] } } : { ok: false, error: `"${t}" is not a priority` };
    }
    case "due": {
      if (!t) return { ok: true, set: { dueDate: null } };
      const d = parseDate(t);
      return d ? { ok: true, set: { dueDate: d } } : { ok: false, error: `"${t}" is not a date (use 2026-12-31 or 31/12/2026)` };
    }
  }
  if (c.field) {
    const id = c.field.id;
    const set = (v: unknown): CellResult => ({ ok: true, set: { custom: { [id]: v } } });
    if (!t) return set(null);
    switch (c.field.type) {
      case "number": {
        const n = Number(t.replace(/,/g, ""));
        return Number.isFinite(n) ? set(n) : { ok: false, error: `"${t}" is not a number` };
      }
      case "date": {
        const d = parseDate(t);
        return d ? set(d) : { ok: false, error: `"${t}" is not a date` };
      }
      case "select": {
        const o = pick(c.options ?? [], t);
        return o ? set(o.value) : { ok: false, error: `"${t}" is not one of: ${(c.options ?? []).map((x) => x.label).join(", ")}` };
      }
      case "checkbox":
        return set(/^(yes|y|true|1|x|✓|checked)$/i.test(t));
      case "url":
        return /^https?:\/\//i.test(t) ? set(t.slice(0, 500)) : { ok: false, error: `"${t}" is not a web address (https://…)` };
      case "longtext":
        return set(t.slice(0, 4000));
      default:
        return set(t.slice(0, 500));
    }
  }
  return { ok: false, error: `${c.label} cannot be changed here` };
}

// ---------------------------------------------------------------- reading the clipboard

/** Tab-separated text with quoted cells (a cell holding a tab, a line break or a quote is wrapped in double quotes). */
export function parseTsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  const src = text.replace(/\r\n?/g, "\n");
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (quoted) {
      if (ch === '"') {
        if (src[i + 1] === '"') {
          cell += '"';
          i++;
        } else quoted = false;
      } else cell += ch;
    } else if (ch === '"' && cell === "") quoted = true;
    else if (ch === "\t") {
      row.push(cell);
      cell = "";
    } else if (ch === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else cell += ch;
  }
  if (cell !== "" || row.length) {
    row.push(cell);
    rows.push(row);
  }
  while (rows.length && rows[rows.length - 1].every((c) => c === "")) rows.pop(); // a trailing line break is not a row
  return rows;
}

export function toTsv(rows: string[][]): string {
  return rows.map((r) => r.map((v) => (/[\t\r\n"]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v)).join("\t")).join("\r\n");
}

const ALIASES: Record<string, string[]> = {
  title: ["title", "article title", "working title", "name", "article"],
  assignee: ["assigned to", "assignee", "owner", "writer", "author"],
  status: ["status", "stage"],
  priority: ["priority"],
  due: ["due date", "due", "deadline"],
  topic: ["topic", "category"],
  notes: ["notes", "note"],
  brief: ["brief", "description", "summary"],
};

/** Maps each pasted header cell to a column index (or -1). Null when the first row does not look like a header. */
export function detectHeader(first: string[], columns: GridColumn[]): number[] | null {
  const map = first.map((h) => {
    const n = norm(h);
    if (!n) return -1;
    return columns.findIndex((c) => isEditable(c) && (norm(c.label) === n || (ALIASES[c.key] ?? []).includes(n)));
  });
  const titleCol = columns.findIndex((c) => c.key === "title");
  const filled = first.filter((h) => h.trim()).length;
  const matched = map.filter((i) => i >= 0).length;
  return map.includes(titleCol) && matched >= 1 && matched * 2 >= filled ? map : null;
}

// ---------------------------------------------------------------- planning a paste

export type PastePlan = {
  rows: BulkRow[];
  created: number;
  updated: number;
  cells: number;
  skipped: { row: number; column: string; message: string }[];
  ignoredColumns: string[];
  readOnlyCells: number;
  header: boolean;
  truncated: boolean;
};

/**
 * Plans what pasting `grid` would do. With a selected cell (`start`) the block is laid over the grid from that cell, and rows
 * beyond the last task create new tasks (spreadsheet behaviour). If the first pasted row is a header (it names the columns,
 * including the title) the block is an import: columns are matched by name and every row becomes a new task.
 * Nothing is written here, so the caller can ask for confirmation first.
 */
export function planPaste(opts: { grid: string[][]; start: { row: number; col: number } | null; view: PlannerRecord[]; columns: GridColumn[]; lookups: Lookups }): PastePlan {
  const { view, columns, lookups } = opts;
  const plan: PastePlan = { rows: [], created: 0, updated: 0, cells: 0, skipped: [], ignoredColumns: [], readOnlyCells: 0, header: false, truncated: false };
  if (!opts.grid.length) return plan;

  const header = detectHeader(opts.grid[0], columns);
  let body = opts.grid;
  let colMap: number[];
  let startRow: number;
  if (header) {
    plan.header = true;
    body = opts.grid.slice(1);
    colMap = header;
    startRow = view.length; // an import always adds tasks
    opts.grid[0].forEach((h, j) => {
      if (h.trim() && header[j] < 0) plan.ignoredColumns.push(h.trim());
    });
  } else {
    const startCol = opts.start?.col ?? columns.findIndex((c) => c.key === "title");
    startRow = opts.start?.row ?? view.length;
    const width = Math.max(...opts.grid.map((r) => r.length));
    colMap = Array.from({ length: width }, (_, j) => (startCol + j < columns.length ? startCol + j : -1));
    const lost = colMap.filter((i) => i < 0).length;
    if (lost) plan.ignoredColumns.push(`${lost} column${lost === 1 ? "" : "s"} beyond the last one`);
  }

  if (body.length > MAX_BULK_ROWS) {
    body = body.slice(0, MAX_BULK_ROWS);
    plan.truncated = true;
  }
  const pending = new Map<number, { rec: PlannerRecord | null; set: BulkSet; cells: number }>();
  body.forEach((cells, i) => {
    const target = startRow + i;
    const rec = target < view.length ? view[target] : null;
    const entry = pending.get(target) ?? { rec, set: {} as BulkSet, cells: 0 };
    pending.set(target, entry);
    cells.forEach((raw, j) => {
      const ci = colMap[j] ?? -1;
      if (ci < 0) return;
      const col = columns[ci];
      if (!isEditable(col)) {
        plan.readOnlyCells++;
        return;
      }
      const r = parseCell(col, raw, lookups);
      if (!r.ok) {
        plan.skipped.push({ row: i + 1, column: col.label, message: r.error });
        return;
      }
      if (r.set.custom) entry.set.custom = { ...entry.set.custom, ...r.set.custom };
      entry.set = { ...entry.set, ...r.set, custom: entry.set.custom };
      if (!entry.set.custom) delete entry.set.custom;
      entry.cells++;
    });
  });

  let n = 0;
  for (const [, e] of pending) {
    n++;
    if (e.rec) {
      if (!Object.keys(e.set).length) continue;
      plan.rows.push({ id: e.rec.id, expectedVersion: e.rec.version, set: e.set });
      plan.updated++;
      plan.cells += e.cells;
    } else {
      if (!e.set.title) {
        if (e.cells || Object.keys(e.set).length) plan.skipped.push({ row: n, column: "Article Title", message: "a new task needs a title, so this row was skipped" });
        continue;
      }
      plan.rows.push({ id: null, set: e.set });
      plan.created++;
      plan.cells += e.cells;
    }
  }
  return plan;
}
