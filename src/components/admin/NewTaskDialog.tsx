"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { CONTENT_STATUSES, CONTENT_STATUS_LABEL, parseReferenceLines } from "@/lib/modules/shared";
import { CONTENT_TYPE_LABEL, PRIORITIES, PRIORITY_LABEL, type ContentType } from "@/lib/planner-shared";
import type { Outline } from "@/lib/store/modules";
import { apiMessage, useApi } from "./AdminProvider";
import { Dialog, Field, inputCls } from "./Dialog";

type Props = {
  open: boolean;
  onClose: () => void;
  defaultType: ContentType;
  topics: { id: string; name: string }[];
  people: { id: string; name: string }[];
  outline: Outline;
  onDone: (message: string) => void;
};

const lines = (v: FormDataEntryValue | null) => String(v ?? "").split("\n").map((x) => x.trim()).filter(Boolean);

/**
 * "New task": first choose what the task is about (an Article or a learning Module), then fill in the fields that kind needs.
 * An article task is exactly what it always was. A module task names the subject, academic level, discipline, module and
 * (optionally) chapter, and carries the learning objectives, prerequisites and references. Missing parts of the curriculum
 * are created on the way, so a task can add something new to it.
 */
export function NewTaskDialog({ open, onClose, ...rest }: Props) {
  // The form is a child of the dialog, which only mounts it while open: every opening starts empty.
  return (
    <Dialog open={open} onClose={onClose} title="New task" wide>
      <NewTaskForm onClose={onClose} {...rest} />
    </Dialog>
  );
}

function NewTaskForm({ onClose, defaultType, topics, people, outline, onDone }: Omit<Props, "open">) {
  const api = useApi();
  const router = useRouter();
  const [type, setType] = useState<ContentType>(defaultType);
  const [subject, setSubject] = useState("");
  const [spec, setSpec] = useState("");
  const [level, setLevel] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const specs = useMemo(() => outline.find((s) => s.slug === subject)?.specializations ?? [], [outline, subject]);
  const levels = useMemo(() => specs.find((s) => s.slug === spec)?.levels ?? [], [specs, spec]);
  const chosen = levels.find((l) => l.slug === level);

  async function submit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const f = new FormData(ev.currentTarget);
    const g = (k: string) => String(f.get(k) ?? "");
    setBusy(true);
    setError("");
    const common = { priority: g("priority") || "normal", dueDate: g("due") || null, assignedTo: g("assignee") || null };
    const r =
      type === "module"
        ? await api.post("/api/admin/planner/modules", {
            subjectSlug: subject,
            specializationSlug: spec,
            levelSlug: level,
            discipline: g("discipline"),
            moduleTitle: g("moduleTitle"),
            chapter: g("chapter"),
            objectives: lines(f.get("objectives")),
            prerequisites: lines(f.get("prerequisites")),
            references: parseReferenceLines(g("references")),
            contentStatus: g("contentStatus") || "not_started",
            brief: g("brief"),
            ...common,
          })
        : await api.post("/api/admin/planner", { title: g("title"), brief: g("brief"), topicId: g("topic") || null, ...common });
    setBusy(false);
    if (!r.ok) return setError(apiMessage(r));
    onDone(type === "module" ? "Module task created." : "Task created.");
    router.refresh();
    onClose();
  }

  const assignee = (
    <Field label="Assign to (optional)">
      <select name="assignee" className={inputCls} defaultValue="">
        <option value="">Not assigned yet</option>
        {people.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
    </Field>
  );
  const priority = (
    <Field label="Priority">
      <select name="priority" className={inputCls} defaultValue="normal">
        {PRIORITIES.map((p) => (
          <option key={p} value={p}>
            {PRIORITY_LABEL[p]}
          </option>
        ))}
      </select>
    </Field>
  );

  return (
      <form onSubmit={submit} className="space-y-4">
        <fieldset>
          <legend className="text-sm font-medium">What is this task about?</legend>
          <div className="mt-2 flex gap-3" role="radiogroup" aria-label="Content type">
            {(["article", "module"] as ContentType[]).map((t) => (
              <label key={t} className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border-2 px-4 text-sm font-semibold ${type === t ? "border-brand bg-sky/50" : "border-ink/15"}`}>
                <input type="radio" name="type" value={t} checked={type === t} onChange={() => setType(t)} className="accent-[var(--color-brand)]" />
                {CONTENT_TYPE_LABEL[t]}
              </label>
            ))}
          </div>
        </fieldset>

        {type === "article" ? (
          <>
            <Field label="Article title / working title">
              <input name="title" required minLength={3} maxLength={160} className={inputCls} />
            </Field>
            <Field label="Brief (what should the article cover?)">
              <textarea name="brief" rows={3} maxLength={4000} className={inputCls} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Topic">
                <select name="topic" className={inputCls} defaultValue="">
                  <option value="">None</option>
                  {topics.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </Field>
              {priority}
              <Field label="Due date (optional)">
                <input name="due" type="date" className={inputCls} />
              </Field>
              {assignee}
            </div>
          </>
        ) : (
          <>
            {outline.length === 0 && (
              <p role="status" className="rounded-lg border border-ink/20 bg-sky/30 p-3 text-sm">
                The learning platform is not set up yet. Close this window and use “Install the curriculum” on the Modules list first.
              </p>
            )}
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Subject">
                <select
                  name="subject"
                  required
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                    setSpec("");
                    setLevel("");
                  }}
                  className={inputCls}
                >
                  <option value="">Choose a subject…</option>
                  {outline.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Specialization">
                <select
                  name="specialization"
                  required
                  value={spec}
                  onChange={(e) => {
                    setSpec(e.target.value);
                    setLevel("");
                  }}
                  disabled={!subject}
                  className={inputCls}
                >
                  <option value="">{subject ? "Choose a specialization…" : "Choose a subject first"}</option>
                  {specs.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Academic level">
                <select name="level" required value={level} onChange={(e) => setLevel(e.target.value)} disabled={!spec} className={inputCls}>
                  <option value="">{spec ? "Choose a level…" : "Choose a specialization first"}</option>
                  {levels.map((l) => (
                    <option key={l.slug} value={l.slug}>
                      {l.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Discipline (heading)" hint="A heading inside the level. Choose one or type a new one.">
                <input name="discipline" list="nt-disciplines" maxLength={120} className={inputCls} autoComplete="off" />
                <datalist id="nt-disciplines">{chosen?.disciplines.map((d) => <option key={d} value={d} />)}</datalist>
              </Field>
              <Field label="Module title" hint="An existing module of this level, or a new one.">
                <input name="moduleTitle" required minLength={3} maxLength={160} list="nt-modules" className={inputCls} autoComplete="off" />
                <datalist id="nt-modules">{chosen?.modules.map((m) => <option key={m.slug} value={m.title} />)}</datalist>
              </Field>
              <Field label="Chapter (optional)" hint="Leave empty to plan the whole module.">
                <input name="chapter" maxLength={160} className={inputCls} />
              </Field>
              <Field label="Content status">
                <select name="contentStatus" defaultValue="not_started" className={inputCls}>
                  {CONTENT_STATUSES.map((c) => (
                    <option key={c} value={c}>
                      {CONTENT_STATUS_LABEL[c]}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Learning objectives" hint="One per line.">
                <textarea name="objectives" rows={4} className={inputCls} />
              </Field>
              <Field label="Prerequisites" hint="One per line.">
                <textarea name="prerequisites" rows={4} className={inputCls} />
              </Field>
            </div>
            <Field label="References and DOI" hint="One reference per line, APA 7th edition. Add the DOI at the end if there is one. Real, verifiable sources only.">
              <textarea name="references" rows={4} className={inputCls} placeholder="Author, A. A. (Year). Title of the work. Journal, volume(issue), pages. https://doi.org/10.xxxx/xxxxx" />
            </Field>
            <Field label="Brief (what should it cover?)">
              <textarea name="brief" rows={3} maxLength={4000} className={inputCls} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-3">
              {priority}
              <Field label="Due date (optional)">
                <input name="due" type="date" className={inputCls} />
              </Field>
              {assignee}
            </div>
            <p className="text-xs text-ink/60">A new module starts as a draft. The owner publishes it from the module editor once it meets the quality rules.</p>
          </>
        )}

        {error && (
          <p role="alert" className="font-semibold">
            {error}
          </p>
        )}
        <div className="flex justify-end gap-2">
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary btn-sm" disabled={busy || (type === "module" && outline.length === 0)}>
            {type === "module" ? "Create module task" : "Create task"}
          </button>
        </div>
      </form>
  );
}
