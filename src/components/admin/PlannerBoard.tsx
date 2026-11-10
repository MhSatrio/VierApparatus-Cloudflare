"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  applyView,
  DEFAULT_HIDDEN,
  emptyConfig,
  FIELD_TYPES,
  isOverdue,
  PRIORITIES,
  PRIORITY_LABEL,
  REVIEW_LABEL,
  STATUS_LABEL,
  STATUSES,
  TABLE_COLUMNS,
  type ContentType,
  type Preset,
  type PlannerField,
  type PlannerRecord,
  type RecordStatus,
  type SavedView,
  type ViewConfig,
  type ViewKind,
} from "@/lib/planner-shared";
import { apiMessage, useApi } from "./AdminProvider";
import { PlannerGrid } from "./PlannerGrid";
import { StatusChip } from "./StatusChip";
import { gridColumns, moduleColumns } from "@/lib/planner-paste";
import { Dialog, Field, inputCls } from "./Dialog";
import { NewTaskDialog } from "./NewTaskDialog";
import { CONTENT_STATUSES, CONTENT_STATUS_LABEL, PUBLICATION_LABEL, PUBLICATION_STATUSES } from "@/lib/modules/shared";
import type { Outline } from "@/lib/store/modules";
import { dateOnly, Empty } from "./ui";

type Person = { id: string; name: string };
type Props = {
  mode: "planner" | "collab";
  owner: boolean;
  meId: string;
  records: PlannerRecord[];
  total: number;
  people: Person[];
  topics: { id: string; name: string }[];
  fields: PlannerField[];
  views: SavedView[];
  info: string;
  initialTab?: Preset;
  initialAssignee?: string;
  /** Which kind of task this list shows. The two kinds are never mixed in one list. */
  contentType?: ContentType;
  /** Subjects, levels, disciplines and modules, for the "New task" form (owner only). */
  outline?: Outline;
};

const TABS: { key: Preset; label: string }[] = [
  { key: "mine", label: "My Tasks" },
  { key: "team", label: "Team Tasks" },
  { key: "review", label: "Awaiting Review" },
  { key: "recent", label: "Recently Updated" },
  { key: "completed", label: "Completed" },
];

const btn = "inline-flex min-h-9 items-center rounded-md border border-ink/25 px-2.5 text-sm font-medium hover:border-brand hover:text-brand disabled:opacity-50";
const tabCls = "rounded-full border border-ink/20 px-3 py-1.5 text-sm font-medium hover:border-brand aria-[current=page]:border-brand aria-[current=page]:bg-brand aria-[current=page]:text-white";

export { StatusChip };

/**
 * The shared task list for the Article Planner (owner) and Collab (everyone with access). The server sends the records the
 * viewer is allowed to see ONCE; tabs, filters, sorting, Kanban and saved views are pure functions over that list, so
 * using them makes no request at all. Only real changes (create, move, save a view) call the API.
 */
export function PlannerBoard({ mode, owner, meId, records, total, people, topics, fields, views, info, initialTab, initialAssignee, contentType = "article", outline = [] }: Props) {
  const api = useApi();
  const router = useRouter();
  const base = mode === "planner" ? "/admin/planner" : "/admin/collab";
  const collab = mode === "collab";
  const isModules = contentType === "module";

  const [kind, setKind] = useState<ViewKind>("table");
  const [tab, setTab] = useState<Preset>(initialTab ?? (collab ? (owner ? "team" : "mine") : "all"));
  const [config, setConfig] = useState<ViewConfig>({ ...emptyConfig(), hidden: [...DEFAULT_HIDDEN], filters: initialAssignee ? { assignee: initialAssignee } : {} });
  const [activeView, setActiveView] = useState("");
  const [dialog, setDialog] = useState<"create" | "fields" | "save" | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [flash, setFlash] = useState("");
  const [infoText, setInfoText] = useState(info);
  const [localViews, setLocalViews] = useState(views);

  const visible = useMemo(() => applyView(records, config, { userId: meId, preset: collab || tab !== "all" ? tab : undefined }), [records, config, meId, collab, tab]);
  const hidden = new Set(config.hidden);
  const setFilter = (patch: Partial<ViewConfig["filters"]>) => {
    setActiveView("");
    setConfig((c) => ({ ...c, filters: { ...c.filters, ...patch } }));
  };
  const sortBy = (key: string) =>
    setConfig((c) => ({ ...c, sort: { key, dir: c.sort?.key === key && c.sort.dir === "asc" ? "desc" : "asc" } }));
  const sortMark = (key: string) => (config.sort?.key === key ? (config.sort.dir === "asc" ? " ▲" : " ▼") : "");

  function chooseView(id: string) {
    setActiveView(id);
    const v = localViews.find((x) => x.id === id);
    if (!v) return setConfig({ ...emptyConfig(), hidden: [...DEFAULT_HIDDEN] });
    setConfig(v.config);
    setKind(v.kind);
  }

  async function call<T>(p: Promise<{ ok: boolean; data: T & { message?: string } } & { status: number }>, done?: string): Promise<boolean> {
    setBusy(true);
    setError("");
    const r = await p;
    setBusy(false);
    if (!r.ok) {
      setError(apiMessage(r as never));
      return false;
    }
    if (done) setFlash(done);
    router.refresh();
    return true;
  }

  async function move(r: PlannerRecord, status: RecordStatus) {
    await call(api.patch(`/api/admin/planner/${r.id}`, { status, expectedVersion: r.version }), `${r.ref} moved to ${STATUS_LABEL[status]}.`);
  }

  async function saveView(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const f = new FormData(ev.currentTarget);
    setBusy(true);
    const r = await api.post<{ view?: SavedView }>("/api/admin/planner/views", { name: String(f.get("name") ?? ""), kind, scope: mode, config, global: owner && f.get("global") === "on" });
    setBusy(false);
    if (!r.ok || !r.data.view) return setError(apiMessage(r));
    setLocalViews((v) => [...v, r.data.view!]);
    setActiveView(r.data.view.id);
    setDialog(null);
    setFlash("View saved.");
  }

  async function deleteView() {
    const v = localViews.find((x) => x.id === activeView);
    if (!v || !window.confirm(`Delete the view "${v.name}"?`)) return;
    const r = await api.del("/api/admin/planner/views", { id: v.id });
    if (!r.ok) return setError(apiMessage(r));
    setLocalViews((cur) => cur.filter((x) => x.id !== v.id));
    setActiveView("");
    setConfig({ ...emptyConfig(), hidden: [...DEFAULT_HIDDEN] });
  }

  const viewDeletable = (() => {
    const v = localViews.find((x) => x.id === activeView);
    return !!v && (v.userId ? v.userId === meId : owner);
  })();

  const cell = (r: PlannerRecord, key: string) => {
    switch (key) {
      case "assignee":
        return r.assignedToName ?? <span className="text-ink/50">Unassigned</span>;
      case "createdBy":
        return r.createdByName || "—";
      case "status":
        return <StatusChip status={r.status} />;
      case "priority":
        return PRIORITY_LABEL[r.priority];
      case "due":
        return r.dueDate ? <span className={isOverdue(r) ? "font-semibold underline decoration-2" : ""}>{dateOnly(r.dueDate)}{isOverdue(r) ? " (overdue)" : ""}</span> : "—";
      case "updated":
        return <span title={r.updatedByName ? `by ${r.updatedByName}` : undefined}>{dateOnly(r.updatedAt)}</span>;
      case "review":
        return r.reviewStatus === "none" ? "—" : REVIEW_LABEL[r.reviewStatus];
      case "article":
        return r.articleId ? (
          <Link href={`/admin/articles/${r.articleId}`} className="text-brand underline underline-offset-4">
            {r.articleTitle || "Open draft"}
          </Link>
        ) : (
          "—"
        );
      case "notes":
        return <span className="line-clamp-2 max-w-[18rem]">{(owner ? r.notes || r.researchNotes : r.researchNotes) || "—"}</span>;
      default:
        return "";
    }
  };

  const lookups = { people, topics };
  const columns = isModules ? moduleColumns(lookups) : gridColumns(fields, lookups).filter((c) => c.key === "num" || c.key === "title" || !hidden.has(c.key));
  // Filter choices come from the tasks on this page, so a contributor sees only what they already have access to.
  const subjectChoices = [...new Map(records.filter((r) => r.module).map((r) => [r.module!.subjectSlug, r.module!.subjectName])).entries()];
  const levelChoices = [
    ...new Map(
      records
        .filter((r) => r.module && (!config.filters.subject || r.module.subjectSlug === config.filters.subject))
        .map((r) => [r.module!.levelSlug, { name: r.module!.levelName, num: r.module!.levelNum }] as const),
    ).entries(),
  ].sort((a, b) => a[1].num - b[1].num);

  return (
    <>
      {(infoText || (owner && !collab)) && (
        <section aria-label="Information" className="mb-5 rounded-xl border border-ink/10 bg-sky/40 p-4">
          {owner && !collab ? (
            <details>
              <summary className="cursor-pointer font-semibold">Information for contributors{infoText ? "" : " (empty — click to add)"}</summary>
              <form
                className="mt-3 space-y-2"
                onSubmit={async (ev) => {
                  ev.preventDefault();
                  const r = await api.put("/api/admin/planner/info", { text: infoText });
                  setFlash(r.ok ? "Information saved." : apiMessage(r));
                }}
              >
                <label htmlFor="info" className="sr-only">
                  Information box
                </label>
                <textarea id="info" value={infoText} onChange={(e) => setInfoText(e.target.value)} rows={4} maxLength={4000} className="field" placeholder="Editorial guidelines, deadlines, house style… Contributors see this on their Collab page and cannot edit it." />
                <button type="submit" className="btn btn-secondary btn-sm">
                  Save information
                </button>
              </form>
              {infoText && <p className="mt-3 whitespace-pre-wrap text-sm">{infoText}</p>}
            </details>
          ) : (
            <>
              <h2 className="mb-1 text-base">Information</h2>
              <p className="whitespace-pre-wrap text-sm">{infoText}</p>
            </>
          )}
        </section>
      )}

      <nav aria-label="Task type" className="mb-4 flex flex-wrap items-center gap-2">
        {(["article", "module"] as ContentType[]).map((t) => (
          <Link key={t} href={`${base}?type=${t}`} aria-current={contentType === t ? "page" : undefined} className={tabCls}>
            {t === "article" ? "Articles" : "Modules"}
          </Link>
        ))}
        <span className="text-sm text-ink/60">{isModules ? "Learning modules and chapters" : "Articles"}</span>
      </nav>

      {collab && (
        <div className="mb-4 flex flex-wrap gap-2" role="tablist" aria-label="Task lists">
          {TABS.map((t) => (
            <button key={t.key} type="button" role="tab" aria-selected={tab === t.key} aria-current={tab === t.key ? "page" : undefined} className={tabCls} onClick={() => setTab(t.key)}>
              {t.label}
              {t.key === "review" && <span className="ml-1 opacity-70">{records.filter((r) => r.status === "in_review").length}</span>}
            </button>
          ))}
        </div>
      )}

      <div className="mb-4 flex flex-wrap items-end gap-3 rounded-xl border border-ink/10 bg-white p-3 shadow-card">
        <div className="flex gap-1" role="group" aria-label="Display">
          {(["table", "kanban", "ticket"] as ViewKind[]).map((k) => (
            <button key={k} type="button" aria-pressed={kind === k} onClick={() => setKind(k)} className="min-h-9 rounded-md border border-ink/25 px-3 text-sm font-medium capitalize hover:border-brand aria-pressed:border-brand aria-pressed:bg-brand aria-pressed:text-white">
              {k === "ticket" ? "Tickets" : k}
            </button>
          ))}
        </div>
        <label className="text-sm">
          <span className="sr-only">Search tasks</span>
          <input type="search" value={config.filters.q ?? ""} onChange={(e) => setFilter({ q: e.target.value })} placeholder="Search tasks" className="field !min-h-9 w-44" maxLength={80} />
        </label>
        <label className="text-sm">
          <span className="sr-only">Status</span>
          <select value={config.filters.status?.[0] ?? ""} onChange={(e) => setFilter({ status: e.target.value ? [e.target.value as RecordStatus] : undefined })} className="field !min-h-9">
            <option value="">Any status</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABEL[s]}
              </option>
            ))}
          </select>
        </label>
        {(owner || collab) && (
          <label className="text-sm">
            <span className="sr-only">Assigned to</span>
            <select value={config.filters.assignee ?? ""} onChange={(e) => setFilter({ assignee: e.target.value || undefined })} className="field !min-h-9">
              <option value="">Anyone</option>
              <option value="none">Unassigned</option>
              {people.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
        )}
        <label className="text-sm">
          <span className="sr-only">Priority</span>
          <select value={config.filters.priority ?? ""} onChange={(e) => setFilter({ priority: (e.target.value || undefined) as never })} className="field !min-h-9">
            <option value="">Any priority</option>
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {PRIORITY_LABEL[p]}
              </option>
            ))}
          </select>
        </label>
        {!isModules && (
          <label className="text-sm">
            <span className="sr-only">Topic</span>
            <select value={config.filters.topic ?? ""} onChange={(e) => setFilter({ topic: e.target.value || undefined })} className="field !min-h-9">
              <option value="">Any topic</option>
              {topics.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </label>
        )}
        {isModules && (
          <>
            <label className="text-sm">
              <span className="sr-only">Subject</span>
              <select value={config.filters.subject ?? ""} onChange={(e) => setFilter({ subject: e.target.value || undefined, level: undefined })} className="field !min-h-9">
                <option value="">Any subject</option>
                {subjectChoices.map(([slug, name]) => (
                  <option key={slug} value={slug}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              <span className="sr-only">Academic level</span>
              <select value={config.filters.level ?? ""} onChange={(e) => setFilter({ level: e.target.value || undefined })} className="field !min-h-9">
                <option value="">Any level</option>
                {levelChoices.map(([slug, l]) => (
                  <option key={slug} value={slug}>
                    {l.num}. {l.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              <span className="sr-only">Content status</span>
              <select value={config.filters.contentStatus ?? ""} onChange={(e) => setFilter({ contentStatus: (e.target.value || undefined) as never })} className="field !min-h-9">
                <option value="">Any content status</option>
                {CONTENT_STATUSES.map((c) => (
                  <option key={c} value={c}>
                    {CONTENT_STATUS_LABEL[c]}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              <span className="sr-only">Publication</span>
              <select value={config.filters.publication ?? ""} onChange={(e) => setFilter({ publication: (e.target.value || undefined) as never })} className="field !min-h-9">
                <option value="">Any publication status</option>
                {PUBLICATION_STATUSES.map((c) => (
                  <option key={c} value={c}>
                    {PUBLICATION_LABEL[c]}
                  </option>
                ))}
              </select>
            </label>
          </>
        )}
        <button type="button" className={btn} onClick={() => { setConfig({ ...emptyConfig(), hidden: [...DEFAULT_HIDDEN] }); setActiveView(""); }}>
          Clear
        </button>

        <div className="ml-auto flex flex-wrap items-end gap-2">
          <label className="text-sm">
            <span className="sr-only">Saved views</span>
            <select value={activeView} onChange={(e) => chooseView(e.target.value)} className="field !min-h-9">
              <option value="">Saved views…</option>
              {localViews.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                  {v.userId ? " (mine)" : " (shared)"}
                </option>
              ))}
            </select>
          </label>
          <button type="button" className={btn} onClick={() => { setError(""); setDialog("save"); }}>
            Save view
          </button>
          {viewDeletable && (
            <button type="button" className={btn} onClick={deleteView}>
              Delete view
            </button>
          )}
          {owner && !collab && (
            <>
              <button type="button" className={btn} onClick={() => setDialog("fields")}>
                Fields
              </button>
              {/* a file download, not a page navigation */}
              <a href="/api/admin/planner/export" className={btn} download>
                Export CSV
              </a>
              <button type="button" className="btn btn-primary btn-sm" onClick={() => { setError(""); setDialog("create"); }}>
                New task
              </button>
            </>
          )}
        </div>
      </div>

      {kind === "table" && !isModules && (
        <details className="mb-3">
          <summary className="inline-flex min-h-9 cursor-pointer items-center rounded-md border border-ink/20 px-3 text-sm font-medium">Columns</summary>
          <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {[...TABLE_COLUMNS.map((c) => ({ key: c.key as string, label: c.label })), ...fields.map((f) => ({ key: `f:${f.id}`, label: f.name }))].map((c) => (
              <label key={c.key} className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={!hidden.has(c.key)}
                  onChange={(e) => setConfig((cur) => ({ ...cur, hidden: e.target.checked ? cur.hidden.filter((x) => x !== c.key) : [...cur.hidden, c.key] }))}
                />
                {c.label}
              </label>
            ))}
          </div>
        </details>
      )}

      {flash && (
        <p role="status" className="mb-3 rounded-lg border-2 border-ink p-2.5 text-sm font-medium">
          {flash}
        </p>
      )}
      {error && !dialog && (
        <p role="alert" className="mb-3 font-semibold">
          {error}
        </p>
      )}
      {isModules && owner && !collab && total === 0 && <InstallCurriculum onDone={(m) => setFlash(m)} />}
      {total > records.length && <p className="mb-3 text-sm text-ink/70">Showing the {records.length} most recent of {total.toLocaleString("en-US")} tasks. Use search or filters to narrow down.</p>}

      {kind === "table" ? (
        <PlannerGrid
          records={visible}
          columns={columns}
          owner={owner}
          editable={owner && mode === "planner"}
          base={base}
          lookups={lookups}
          onSort={sortBy}
          sortMark={sortMark}
          onOpenFields={() => setDialog("fields")}
          onChanged={() => router.refresh()}
          onDeleteField={() => router.refresh()}
        />
      ) : visible.length === 0 ? (
        <Empty>{records.length === 0 ? (collab ? "No tasks are assigned or shared with you yet." : (isModules ? "No module tasks yet." : "No tasks yet. Create the first one with “New task”.")) : "No tasks match these filters."}</Empty>
      ) : kind === "kanban" ? (
        <div className="flex gap-3 overflow-x-auto pb-3" role="region" aria-label="Kanban board" tabIndex={0}>
          {STATUSES.filter((s) => s !== "archived" || config.filters.status?.includes("archived")).map((s) => {
            const col = visible.filter((r) => r.status === s);
            return (
              <section key={s} aria-label={`${STATUS_LABEL[s]}, ${col.length} tasks`} className="w-64 shrink-0 rounded-xl bg-sky/40 p-2">
                <h3 className="mb-2 flex items-center justify-between px-1 text-sm font-semibold">
                  {STATUS_LABEL[s]}
                  <span className="rounded-full bg-white px-2 text-xs">{col.length}</span>
                </h3>
                <ul className="space-y-2">
                  {col.map((r) => (
                    <li key={r.id} className="rounded-lg border border-ink/10 bg-white p-3 text-sm shadow-card">
                      <Link href={`${base}/${r.id}`} className="font-semibold hover:text-brand">
                        <span className="mr-1 text-xs text-ink/60">{r.ref}</span>
                        {r.title}
                      </Link>
                      {r.module && (
                        <p className="mt-1 text-xs text-ink/70">
                          {r.module.subjectName} · L{r.module.levelNum}
                          {r.module.chapter ? ` · ${r.module.moduleTitle}` : ""}
                        </p>
                      )}
                      <p className="mt-1 text-xs text-ink/70">
                        {r.assignedToName ?? "Unassigned"} · {PRIORITY_LABEL[r.priority]}
                        {r.dueDate ? ` · due ${dateOnly(r.dueDate)}` : ""}
                        {isOverdue(r) ? " (overdue)" : ""}
                      </p>
                      {owner && (
                        <label className="mt-2 block text-xs">
                          <span className="sr-only">Move {r.ref} to</span>
                          <select value={r.status} disabled={busy} onChange={(e) => move(r, e.target.value as RecordStatus)} className="field !min-h-8 !py-0 text-xs">
                            {STATUSES.map((x) => (
                              <option key={x} value={x}>
                                Move to: {STATUS_LABEL[x]}
                              </option>
                            ))}
                          </select>
                        </label>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      ) : (
        <ul className="space-y-3">
          {visible.map((r) => (
            <li key={r.id} className="rounded-xl border border-ink/10 bg-white p-4 shadow-card">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Link href={`${base}/${r.id}`} className="text-lg font-semibold hover:text-brand">
                  <span className="mr-2 text-sm font-medium text-ink/60">{r.ref}</span>
                  {r.title}
                </Link>
                <StatusChip status={r.status} />
              </div>
              {r.module && (
                <p className="mt-1 text-sm text-ink/70">
                  {r.module.subjectName} · {r.module.levelName}
                  {r.module.discipline ? ` · ${r.module.discipline}` : ""}
                  {r.module.chapter ? ` · ${r.module.moduleTitle}` : ""} · {CONTENT_STATUS_LABEL[r.module.contentStatus]} · {PUBLICATION_LABEL[r.module.publication]}
                </p>
              )}
              {r.brief && <p className="mt-2 line-clamp-3 whitespace-pre-wrap text-sm">{r.brief}</p>}
              <dl className="mt-3 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-3">
                <div>
                  <dt className="inline font-medium">Assigned to: </dt>
                  <dd className="inline">{r.assignedToName ?? "—"}</dd>
                </div>
                <div>
                  <dt className="inline font-medium">Priority: </dt>
                  <dd className="inline">{PRIORITY_LABEL[r.priority]}</dd>
                </div>
                <div>
                  <dt className="inline font-medium">Due: </dt>
                  <dd className="inline">{cell(r, "due")}</dd>
                </div>
                <div>
                  <dt className="inline font-medium">Topic: </dt>
                  <dd className="inline">{r.topicName ?? "—"}</dd>
                </div>
                <div>
                  <dt className="inline font-medium">Review: </dt>
                  <dd className="inline">{cell(r, "review")}</dd>
                </div>
                <div>
                  <dt className="inline font-medium">Updated: </dt>
                  <dd className="inline">
                    {dateOnly(r.updatedAt)} {r.updatedByName && `by ${r.updatedByName}`}
                  </dd>
                </div>
                {fields.map((f) => (
                  <div key={f.id}>
                    <dt className="inline font-medium">{f.name}: </dt>
                    <dd className="inline">{r.custom[f.id] === undefined ? "—" : f.type === "checkbox" ? (r.custom[f.id] ? "Yes" : "No") : String(r.custom[f.id])}</dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-3 text-xs text-ink/60">
        {visible.length} of {records.length} task{records.length === 1 ? "" : "s"} shown.
      </p>

      <NewTaskDialog open={dialog === "create"} onClose={() => setDialog(null)} defaultType={contentType} topics={topics} people={people} outline={outline} onDone={(m) => setFlash(m)} />

      <Dialog open={dialog === "save"} onClose={() => setDialog(null)} title="Save this view">
        <form onSubmit={saveView} className="space-y-4">
          <p className="text-sm text-ink/70">Saves the current display ({kind}), filters, sort order and visible columns.</p>
          <Field label="View name">
            <input name="name" required minLength={2} maxLength={40} className={inputCls} />
          </Field>
          {owner ? (
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="global" /> Share with everyone (contributors can use it but not change it)
            </label>
          ) : (
            <p className="text-sm text-ink/70">Only you will see this view.</p>
          )}
          {error && (
            <p role="alert" className="font-semibold">
              {error}
            </p>
          )}
          <div className="flex justify-end gap-2">
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => setDialog(null)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm" disabled={busy}>
              Save view
            </button>
          </div>
        </form>
      </Dialog>

      <FieldsDialog open={dialog === "fields"} onClose={() => setDialog(null)} fields={fields} />
    </>
  );
}

function FieldsDialog({ open, onClose, fields }: { open: boolean; onClose: () => void; fields: PlannerField[] }) {
  const api = useApi();
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function add(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const f = new FormData(form);
    setBusy(true);
    const r = await api.post("/api/admin/planner/fields", {
      name: String(f.get("name") ?? ""),
      type: String(f.get("type") ?? "text"),
      options: String(f.get("options") ?? "")
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean),
    });
    setBusy(false);
    if (!r.ok) return setError(apiMessage(r));
    setError("");
    form.reset();
    router.refresh();
  }

  // Two-step delete inside the dialog (a browser confirm() can be blocked, which made Delete look broken)
  const [asking, setAsking] = useState<string | null>(null);
  async function remove(f: PlannerField) {
    const r = await api.del("/api/admin/planner/fields", { id: f.id });
    setAsking(null);
    if (!r.ok) return setError(apiMessage(r));
    setError("");
    router.refresh();
  }

  return (
    <Dialog open={open} onClose={onClose} title="Custom fields" wide>
      <p className="text-sm text-ink/70">Extra columns for your tasks (for example “Source”, “Word count”, “Reviewer”). They appear in the table, ticket view, task page and CSV export.</p>
      {fields.length > 0 && (
        <ul className="divide-y divide-ink/10 rounded-lg border border-ink/10">
          {fields.map((f) => (
            <li key={f.id} className="flex items-center justify-between gap-3 px-3 py-2 text-sm">
              <span>
                <strong>{f.name}</strong> · {f.type}
                {f.type === "select" && f.options.length > 0 && <span className="text-ink/60"> ({f.options.join(", ")})</span>}
              </span>
              {asking === f.id ? (
                <span className="flex items-center gap-2 text-sm">
                  Delete its values too?
                  <button type="button" className="font-semibold text-brand underline underline-offset-4" onClick={() => remove(f)}>
                    Yes, delete
                  </button>
                  <button type="button" className="underline underline-offset-4" onClick={() => setAsking(null)}>
                    Keep
                  </button>
                </span>
              ) : (
                <button type="button" className="text-sm font-semibold text-brand underline underline-offset-4" onClick={() => setAsking(f.id)}>
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={add} className="grid gap-3 sm:grid-cols-[1fr_9rem]">
        <Field label="Field name">
          <input name="name" required maxLength={40} className={inputCls} />
        </Field>
        <Field label="Type">
          <select name="type" className={inputCls} defaultValue="text">
            {FIELD_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field label="Choices (for type “select”, separated by commas)">
            <input name="options" maxLength={400} className={inputCls} placeholder="Journal, Preprint, Interview" />
          </Field>
        </div>
        {error && (
          <p role="alert" className="font-semibold sm:col-span-2">
            {error}
          </p>
        )}
        <div className="flex justify-end gap-2 sm:col-span-2">
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
            Close
          </button>
          <button type="submit" className="btn btn-primary btn-sm" disabled={busy}>
            Add field
          </button>
        </div>
      </form>
    </Dialog>
  );
}

/** The learning platform starts empty. This installs the subjects, levels, the Biology curriculum and one task per module (safe to repeat). */
function InstallCurriculum({ onDone }: { onDone: (message: string) => void }) {
  const api = useApi();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  return (
    <section aria-label="Set up learning modules" className="mb-4 rounded-xl border-2 border-brand bg-sky/30 p-4">
      <h2 className="text-lg">Set up the learning modules</h2>
      <p className="mt-1 text-sm">
        This installs the nine subjects, their academic levels, the full Biology curriculum (12 levels, 232 modules) and one Planner task for each module, so the whole curriculum can be assigned and tracked here. It adds structure only: no lesson text and no references. It is safe to run again.
      </p>
      <button
        type="button"
        className="btn btn-primary btn-sm mt-3"
        disabled={busy}
        onClick={async () => {
          setBusy(true);
          setError("");
          const r = await api.post<{ modules?: number; tasks?: number }>("/api/admin/modules/seed");
          setBusy(false);
          if (!r.ok) return setError(apiMessage(r));
          onDone(`Installed ${r.data.modules ?? 0} modules and ${r.data.tasks ?? 0} tasks.`);
          router.refresh();
        }}
      >
        {busy ? "Installing…" : "Install the curriculum"}
      </button>
      {error && (
        <p role="alert" className="mt-2 font-semibold">
          {error}
        </p>
      )}
    </section>
  );
}
