"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cellText, isEditable, parseCell, parseTsv, planPaste, toTsv, type GridColumn, type Lookups, type PastePlan } from "@/lib/planner-paste";
import { isOverdue, type PlannerField, type PlannerRecord } from "@/lib/planner-shared";
import { apiMessage, useApi } from "./AdminProvider";
import { Dialog } from "./Dialog";
import { StatusChip } from "./StatusChip";
import { CopyText } from "./CopyText";
import type { BulkRow } from "@/lib/planner-paste";

type Props = {
  records: PlannerRecord[];
  columns: GridColumn[];
  owner: boolean;
  /** Cells can be edited, and a block can be pasted from a spreadsheet (Article Planner, owner). */
  editable: boolean;
  base: string;
  lookups: Lookups;
  onSort: (key: string) => void;
  sortMark: (key: string) => string;
  onOpenFields: () => void;
  onChanged: () => void;
  onDeleteField: (f: PlannerField) => void;
};

const cellBase = "border border-ink/10 px-2.5 py-1.5 align-top";

/**
 * The planner table as a small spreadsheet: click a cell, Enter or double-click to edit, arrow keys to move, Ctrl+C / Ctrl+V
 * to copy or paste (including a block copied from Excel or Google Sheets: it updates the tasks under the selected cell and
 * adds new tasks below the last row). A pasted block that starts with a header row is an import. Every change goes through
 * one server endpoint that validates it again, so what you see here is only a convenience.
 */
/** Column widths are a viewer preference, kept in this browser only (not in the shared database). */
const WIDTH_KEY = "vier.planner.columnWidths.v1";
const isLongText = (col: GridColumn) => col.key === "notes" || col.key === "brief" || col.kind === "longtext";

export function PlannerGrid({ records, columns, owner, editable, base, lookups, onSort, sortMark, onOpenFields, onChanged, onDeleteField }: Props) {
  const api = useApi();
  const [sel, setSel] = useState<{ r: number; c: number } | null>(null);
  const [edit, setEdit] = useState<{ r: number; c: number; value: string } | null>(null);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [plan, setPlan] = useState<PastePlan | null>(null);
  const [pasteOpen, setPasteOpen] = useState(false);
  const [pasteText, setPasteText] = useState("");
  const [dropping, setDropping] = useState<PlannerField | null>(null);
  const [expanded, setExpanded] = useState<{ r: number; c: number; value: string } | null>(null);
  const [widths, setWidths] = useState<Record<string, number>>({});
  const latestWidths = useRef<Record<string, number>>({});
  const drag = useRef<{ key: string; x: number; w: number } | null>(null);
  useEffect(() => {
    try {
      const v = JSON.parse(localStorage.getItem(WIDTH_KEY) ?? "{}");
      if (v && typeof v === "object") {
        latestWidths.current = v;
        // Saved widths can only be read in the browser, after the first render (reading them during server rendering would
        // cause a hydration mismatch), so this one state update is intentional.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setWidths(v);
      }
    } catch {
      /* private window or blocked storage: default widths */
    }
  }, []);
  const saveWidths = (next: Record<string, number>) => {
    latestWidths.current = next;
    setWidths(next);
    try {
      localStorage.setItem(WIDTH_KEY, JSON.stringify(next));
    } catch {
      /* not persisted: the widths still apply for this visit */
    }
  };
  const wrap = useRef<HTMLDivElement>(null);

  async function apply(rows: BulkRow[], done?: string): Promise<boolean> {
    if (!rows.length) return false;
    setBusy(true);
    const r = await api.post<{ created?: number; updated?: number; conflicts?: number[]; invalid?: { row: number; message: string }[] }>("/api/admin/planner/bulk", { rows });
    setBusy(false);
    if (!r.ok) {
      setMsg(apiMessage(r));
      return false;
    }
    const d = r.data;
    const bits = [done ?? `${d.created ?? 0} created, ${d.updated ?? 0} updated.`];
    if (d.conflicts?.length) bits.push(`${d.conflicts.length} not saved because someone else changed them first. Reload and try again.`);
    if (d.invalid?.length) bits.push(`${d.invalid.length} rejected: ${d.invalid[0].message}`);
    setMsg(bits.join(" "));
    onChanged();
    return true;
  }

  function startEdit(r: number, c: number) {
    const col = columns[c];
    if (!editable || !col || !isEditable(col)) return;
    setSel({ r, c });
    // Long text opens in the expanded editor (multi-line, readable); everything else is edited in the cell.
    if (isLongText(col)) {
      setExpanded({ r, c, value: valueOf(records[r], col) });
      return;
    }
    setEdit({ r, c, value: col.kind === "checkbox" || col.kind === "select" ? valueOf(records[r], col) : cellText(records[r], col, owner) });
  }

  /** The stored value (an id for selects) rather than the label. */
  function valueOf(rec: PlannerRecord, col: GridColumn): string {
    if (col.key === "assignee") return rec.assignedTo ?? "";
    if (col.key === "topic") return rec.topicId ?? "";
    if (col.key === "status") return rec.status;
    if (col.key === "priority") return rec.priority;
    if (col.field) {
      const v = rec.custom[col.field.id];
      return v === undefined || v === null ? "" : String(v);
    }
    return cellText(rec, col, owner);
  }

  const committing = useRef(false);
  async function commit(r: number, c: number, value: string) {
    if (committing.current) return; // Enter and the following blur both ask to save: save once
    committing.current = true;
    try {
      await commitOnce(r, c, value);
    } finally {
      committing.current = false;
    }
  }
  async function commitOnce(r: number, c: number, value: string) {
    setEdit(null);
    const col = columns[c];
    const rec = records[r];
    if (!col || !rec) return;
    // selects hold ids, so look the label back up and let one parser handle every source
    const raw = col.kind === "select" ? (col.options?.find((o) => o.value === value)?.label ?? value) : value;
    if (raw === cellText(rec, col, owner)) return;
    const p = parseCell(col, raw, lookups);
    if (!p.ok) return setMsg(`${col.label}: ${p.error}`);
    if (!Object.keys(p.set).length) return;
    await apply([{ id: rec.id, expectedVersion: rec.version, set: p.set }], `${rec.ref} saved.`);
    wrap.current?.focus();
  }

  function move(dr: number, dc: number) {
    setSel((s) => {
      const cur = s ?? { r: 0, c: 1 };
      return { r: Math.min(Math.max(cur.r + dr, 0), Math.max(records.length - 1, 0)), c: Math.min(Math.max(cur.c + dc, 0), columns.length - 1) };
    });
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (edit || (e.target as HTMLElement).closest("input,select,textarea,button,a")) return;
    const mod = e.ctrlKey || e.metaKey;
    if (mod) return; // copy and paste arrive as clipboard events
    if (e.key === "ArrowDown") { e.preventDefault(); move(1, 0); }
    else if (e.key === "ArrowUp") { e.preventDefault(); move(-1, 0); }
    else if (e.key === "ArrowRight") { e.preventDefault(); move(0, 1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); move(0, -1); }
    else if ((e.key === "Enter" || e.key === "F2") && sel) { e.preventDefault(); startEdit(sel.r, sel.c); }
    else if ((e.key === "Delete" || e.key === "Backspace") && sel && editable) {
      e.preventDefault();
      const col = columns[sel.c];
      if (col && isEditable(col) && col.key !== "title" && col.key !== "status" && col.key !== "priority") void commit(sel.r, sel.c, "");
    }
  }

  function onCopy(e: React.ClipboardEvent) {
    if (edit || !sel) return;
    const col = columns[sel.c];
    const rec = records[sel.r];
    if (!col || !rec) return;
    e.preventDefault();
    e.clipboardData.setData("text/plain", toTsv([[cellText(rec, col, owner)]]));
    setMsg("Copied the cell. Paste it into a spreadsheet, or into another cell here.");
  }

  function planFrom(text: string, start: { row: number; col: number } | null) {
    return planPaste({ grid: parseTsv(text), start, view: records, columns, lookups });
  }

  async function runPlan(p: PastePlan) {
    if (!p.rows.length) return setMsg(p.skipped[0] ? `Nothing was pasted. ${p.skipped[0].column}: ${p.skipped[0].message}.` : "Nothing to paste.");
    // a single cell goes straight in; anything bigger shows what will happen first
    if (p.rows.length === 1 && p.updated === 1 && p.cells === 1 && !p.skipped.length) {
      await apply(p.rows);
      return;
    }
    setPlan(p);
  }

  async function onPaste(e: React.ClipboardEvent) {
    if (!editable || edit || (e.target as HTMLElement).closest("input,select,textarea")) return;
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    if (!text.trim()) return;
    await runPlan(planFrom(text, sel ? { row: sel.r, col: sel.c } : null));
  }

  const display = (rec: PlannerRecord, col: GridColumn) => {
    const t = cellText(rec, col, owner);
    switch (col.key) {
      case "num":
        // The Task ID is copyable; the arrow opens the full task details (a separate control, so the ID stays a plain identifier).
        return (
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
            <span className="font-medium text-brand">{rec.ref}</span>
            <Link href={`${base}/${rec.id}`} aria-label={`Open the details of ${rec.ref}`} title="Open task details" className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-ink/30 bg-white text-sm font-semibold text-brand hover:border-brand hover:bg-sky/40">
              ↗
            </Link>
            <CopyText value={rec.ref} label="Copy ID" showValue={false} />
          </span>
        );
      case "status":
        return <StatusChip status={rec.status} />;
      case "assignee":
        return t || <span className="text-ink/40">—</span>;
      case "due":
        return t ? <span className={isOverdue(rec) ? "font-semibold underline decoration-2" : ""}>{t}{isOverdue(rec) ? " (overdue)" : ""}</span> : <span className="text-ink/40">—</span>;
      case "article":
        return rec.articleId ? (
          <Link href={`/admin/articles/${rec.articleId}`} className="text-brand underline underline-offset-4">
            {rec.articleTitle || "Open draft"}
          </Link>
        ) : (
          <span className="text-ink/40">—</span>
        );
      case "notes":
      case "brief":
        return <span className="line-clamp-2 max-w-[18rem] whitespace-pre-wrap">{t || <span className="text-ink/40">—</span>}</span>;
      default:
        return t || <span className="text-ink/40">—</span>;
    }
  };

  const editor = (col: GridColumn, r: number, c: number, value: string) => {
    const done = (v: string) => void commit(r, c, v);
    const common = { autoFocus: true, className: "field !min-h-8 !py-0.5 text-sm", "aria-label": `Edit ${col.label}` };
    if (col.kind === "select")
      return (
        <select {...common} value={value} onChange={(e) => done(e.target.value)} onBlur={() => setEdit(null)} onKeyDown={(e) => e.key === "Escape" && setEdit(null)}>
          {col.key !== "status" && col.key !== "priority" && <option value="">—</option>}
          {col.options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      );
    if (col.kind === "checkbox")
      return (
        <input
          type="checkbox"
          autoFocus
          aria-label={`Edit ${col.label}`}
          checked={value === "true"}
          onChange={(e) => done(e.target.checked ? "Yes" : "No")}
          onBlur={() => setEdit(null)}
          onKeyDown={(e) => e.key === "Escape" && setEdit(null)}
        />
      );
    const type = col.kind === "date" ? "date" : col.kind === "number" ? "number" : "text";
    return (
      <input
        {...common}
        type={type}
        value={edit?.value ?? ""}
        onChange={(e) => setEdit((cur) => (cur ? { ...cur, value: e.target.value } : cur))}
        onBlur={() => edit && done(edit.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            done((e.target as HTMLInputElement).value);
          } else if (e.key === "Escape") {
            e.preventDefault();
            setEdit(null);
            wrap.current?.focus();
          }
        }}
      />
    );
  };

  const quickAdd = async () => {
    if (await apply([{ id: null, set: { title: "Untitled task" } }], "Added a new task. Double-click its title to rename it.")) setSel({ r: records.length, c: 1 });
  };

  return (
    <div>
      {editable && (
        <div className="mb-2 flex flex-wrap items-center gap-3 text-sm text-ink/70">
          <span>Click a cell, then type with Enter or double-click. Copy a block in Excel or Google Sheets and press Ctrl+V on a cell to paste it here.</span>
          <button type="button" className="inline-flex min-h-9 items-center rounded-md border border-ink/25 px-2.5 text-sm font-medium text-ink hover:border-brand hover:text-brand" onClick={() => { setPasteText(""); setPasteOpen(true); }}>
            Paste from spreadsheet
          </button>
          <button type="button" className="inline-flex min-h-9 items-center rounded-md border border-ink/25 px-2.5 text-sm font-medium text-ink hover:border-brand hover:text-brand" onClick={() => saveWidths({})}>
            Reset column widths
          </button>
        </div>
      )}
      {msg && (
        <p role="status" className="mb-2 rounded-lg border-2 border-ink p-2 text-sm font-medium">
          {msg}
        </p>
      )}
      <div
        ref={wrap}
        tabIndex={0}
        role="grid"
        aria-label="Tasks table"
        aria-busy={busy}
        onKeyDown={onKeyDown}
        onCopy={onCopy}
        onPaste={onPaste}
        style={{ resize: "vertical", height: "min(70vh, 42rem)", minHeight: "12rem" }}
        className="overflow-auto rounded-xl border border-ink/10 bg-white shadow-card outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        <table className="w-full min-w-[56rem] border-collapse text-sm">
          <thead className="sticky top-0 z-10 bg-[#cfe7f8] text-left">
            <tr>
              {columns.map((col) => (
                <th key={col.key} scope="col" style={widths[col.key] ? { width: widths[col.key], minWidth: widths[col.key] } : undefined} className={`${cellBase} relative whitespace-nowrap font-semibold`}>
                  <span className="inline-flex items-center gap-1.5">
                    {col.sortKey ? (
                      <button type="button" onClick={() => onSort(col.sortKey!)} className="font-semibold hover:text-brand">
                        {col.label}
                        {sortMark(col.sortKey)}
                      </button>
                    ) : (
                      col.label
                    )}
                    {editable && col.field && (
                      <button type="button" aria-label={`Delete column ${col.label}`} title={`Delete column ${col.label}`} onClick={() => setDropping(col.field!)} className="rounded px-1 text-ink/50 hover:bg-white hover:text-ink">
                        ×
                      </button>
                    )}
                  </span>
                  {/* Drag this edge to resize the column; double-click it to reset the width. */}
                  <span
                    role="separator"
                    aria-orientation="vertical"
                    aria-label={`Resize the ${col.label} column`}
                    title="Drag to resize. Double-click to reset."
                    className="absolute right-0 top-0 h-full w-2 cursor-col-resize select-none hover:bg-brand/40"
                    onPointerDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      drag.current = { key: col.key, x: e.clientX, w: (e.currentTarget.parentElement as HTMLElement).offsetWidth };
                      e.currentTarget.setPointerCapture(e.pointerId);
                    }}
                    onPointerMove={(e) => {
                      const d = drag.current;
                      if (!d) return;
                      const w = Math.max(96, Math.min(640, d.w + e.clientX - d.x));
                      setWidths({ ...latestWidths.current, [d.key]: w });
                      latestWidths.current = { ...latestWidths.current, [d.key]: w };
                    }}
                    onPointerUp={() => {
                      if (!drag.current) return;
                      drag.current = null;
                      saveWidths(latestWidths.current);
                    }}
                    onDoubleClick={() => {
                      const next = { ...latestWidths.current };
                      delete next[col.key];
                      saveWidths(next);
                    }}
                  />
                </th>
              ))}
              {editable && (
                <th scope="col" className={`${cellBase} w-10 text-center`}>
                  <button type="button" aria-label="Add a column" title="Add a column" onClick={onOpenFields} className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-ink/30 bg-white text-lg leading-none hover:border-brand hover:text-brand">
                    +
                  </button>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {records.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className="px-3 py-8 text-center text-ink/70">
                  No tasks yet. Create one with “New task”, add a row below, or paste a block from a spreadsheet.
                </td>
              </tr>
            )}
            {records.map((rec, r) => (
              <tr key={rec.id} className="odd:bg-white even:bg-[#f9fbfd]">
                {columns.map((col, c) => {
                  const selected = sel?.r === r && sel.c === c;
                  const editing = edit?.r === r && edit.c === c;
                  return (
                    <td
                      key={col.key}
                      role="gridcell"
                      aria-selected={selected}
                      onClick={() => setSel({ r, c })}
                      onDoubleClick={() => startEdit(r, c)}
                      className={`${cellBase} ${col.key === "title" ? "min-w-[14rem] font-medium" : ""} ${isEditable(col) && editable ? "cursor-cell" : ""} ${selected ? "outline outline-2 -outline-offset-2 outline-brand" : ""}`}
                    >
                      {editing ? editor(col, r, c, edit.value) : display(rec, col)}
                    </td>
                  );
                })}
                {editable && <td className={cellBase} />}
              </tr>
            ))}
          </tbody>
        </table>
        {editable && (
          <button type="button" onClick={quickAdd} disabled={busy} className="block w-full border-t border-ink/10 px-3 py-2 text-left text-sm font-medium text-brand hover:bg-sky/40 disabled:opacity-50">
            + Add task
          </button>
        )}
      </div>

      <Dialog open={!!expanded} onClose={() => setExpanded(null)} title={expanded ? `${columns[expanded.c]?.label ?? "Text"}: ${records[expanded.r]?.ref ?? ""}` : "Edit text"} wide>
        {expanded && (
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              const x = expanded;
              setExpanded(null);
              void commit(x.r, x.c, x.value);
            }}
          >
            <label htmlFor="expanded-editor" className="block text-sm font-medium">
              {columns[expanded.c]?.label}
            </label>
            <textarea
              id="expanded-editor"
              autoFocus
              rows={14}
              maxLength={4000}
              value={expanded.value}
              onChange={(e) => setExpanded((cur) => (cur ? { ...cur, value: e.target.value } : cur))}
              onKeyDown={(e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === "Enter") e.currentTarget.form?.requestSubmit();
              }}
              className="field min-h-[18rem] text-base leading-7"
            />
            <p className="text-sm text-ink/70">Line breaks are kept. Ctrl+Enter saves; Escape cancels.</p>
            <div className="flex justify-end gap-2">
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => setExpanded(null)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary btn-sm">
                Save
              </button>
            </div>
          </form>
        )}
      </Dialog>

      <Dialog open={!!plan} onClose={() => setPlan(null)} title={plan?.header ? "Import tasks from a spreadsheet" : "Paste into the table"} wide>
        {plan && <PlanSummary plan={plan} busy={busy} onCancel={() => setPlan(null)} onApply={async () => (await apply(plan.rows), setPlan(null))} />}
      </Dialog>

      <Dialog open={pasteOpen} onClose={() => setPasteOpen(false)} title="Paste from a spreadsheet" wide>
        <p className="text-sm text-ink/70">
          In Excel or Google Sheets select the cells (include the header row to import new tasks by column name: Article Title, Assigned To, Status, Priority, Due Date, Topic, Notes, Brief, or the name of one of your custom fields), copy, then paste here.
        </p>
        <label htmlFor="paste-area" className="sr-only">
          Pasted spreadsheet cells
        </label>
        <textarea id="paste-area" value={pasteText} onChange={(e) => setPasteText(e.target.value)} rows={9} className="field font-mono text-xs" placeholder={"Article Title\tAssigned To\tPriority\tDue Date\nHow vaccines train the immune system\t\tHigh\t31/12/2026"} />
        <div className="flex justify-end gap-2">
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => setPasteOpen(false)}>
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            disabled={!pasteText.trim()}
            onClick={async () => {
              const p = planFrom(pasteText, null);
              setPasteOpen(false);
              await runPlan(p); // without a header the block is appended as new tasks (no cell is selected)
            }}
          >
            Preview
          </button>
        </div>
      </Dialog>

      <Dialog open={!!dropping} onClose={() => setDropping(null)} title="Delete this column?">
        {dropping && (
          <div className="space-y-4">
            <p>
              The column <strong>{dropping.name}</strong> and its values will be removed from every task. The tasks themselves stay.
            </p>
            <div className="flex justify-end gap-2">
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => setDropping(null)}>
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                disabled={busy}
                onClick={async () => {
                  setBusy(true);
                  const r = await api.del("/api/admin/planner/fields", { id: dropping.id });
                  setBusy(false);
                  setDropping(null);
                  if (!r.ok) return setMsg(apiMessage(r));
                  setMsg(`Column "${dropping.name}" deleted.`);
                  onDeleteField(dropping);
                }}
              >
                Delete column
              </button>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}

function PlanSummary({ plan, busy, onApply, onCancel }: { plan: PastePlan; busy: boolean; onApply: () => void; onCancel: () => void }) {
  return (
    <div className="space-y-3 text-sm">
      <p className="text-base">
        {plan.created > 0 && <strong>{plan.created} new task{plan.created === 1 ? "" : "s"}</strong>}
        {plan.created > 0 && plan.updated > 0 && " and "}
        {plan.updated > 0 && <strong>{plan.updated} task{plan.updated === 1 ? "" : "s"} updated</strong>}
        {" "}({plan.cells} cell{plan.cells === 1 ? "" : "s"}).
      </p>
      {plan.header && <p className="text-ink/70">The first row was read as column names, so every row below it becomes a new task.</p>}
      {plan.truncated && <p className="font-medium">Only the first 100 rows are used. Paste the rest in a second step.</p>}
      {plan.ignoredColumns.length > 0 && <p className="text-ink/70">Ignored columns: {plan.ignoredColumns.join(", ")}.</p>}
      {plan.readOnlyCells > 0 && <p className="text-ink/70">{plan.readOnlyCells} cell{plan.readOnlyCells === 1 ? "" : "s"} in read-only columns (Task ID, Created By, …) were left alone.</p>}
      {plan.skipped.length > 0 && (
        <div className="rounded-lg border border-ink/20 p-3">
          <p className="font-semibold">{plan.skipped.length} value{plan.skipped.length === 1 ? "" : "s"} could not be read and will be skipped:</p>
          <ul className="mt-1 list-disc pl-5">
            {plan.skipped.slice(0, 8).map((s, i) => (
              <li key={i}>
                Row {s.row}, {s.column}: {s.message}
              </li>
            ))}
          </ul>
          {plan.skipped.length > 8 && <p className="mt-1 text-ink/70">…and {plan.skipped.length - 8} more.</p>}
        </div>
      )}
      <div className="flex justify-end gap-2">
        <button type="button" className="btn btn-secondary btn-sm" onClick={onCancel}>
          Cancel
        </button>
        <button type="button" className="btn btn-primary btn-sm" disabled={busy || !plan.rows.length} onClick={onApply}>
          {busy ? "Saving…" : plan.created > 0 && plan.updated === 0 ? "Create tasks" : "Apply"}
        </button>
      </div>
    </div>
  );
}
