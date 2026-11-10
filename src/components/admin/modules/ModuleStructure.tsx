"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { ChapterRow } from "@/lib/store/module-structure";
import type { ModuleEdit, Outline } from "@/lib/store/modules";
import { apiMessage, useApi } from "../AdminProvider";
import { Field, inputCls } from "../Dialog";
import { Card } from "../ui";

/**
 * Owner only: where this module sits (subject, specialization, academic level, discipline) and the chapters inside it. Moving a module
 * keeps its text, its task and its chapters, and the old address redirects to the new one.
 */
export function ModuleStructure({ module: m, chapters, outline, dirty }: { module: ModuleEdit; chapters: ChapterRow[]; outline: Outline; dirty: boolean }) {
  const api = useApi();
  const router = useRouter();
  const [subject, setSubject] = useState(m.subjectSlug);
  const [spec, setSpec] = useState(m.specializationSlug);
  const [level, setLevel] = useState(m.levelSlug);
  const [discipline, setDiscipline] = useState(m.discipline);
  const [chapterTitle, setChapterTitle] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const specs = useMemo(() => outline.find((s) => s.slug === subject)?.specializations ?? [], [outline, subject]);
  const levels = useMemo(() => specs.find((s) => s.slug === spec)?.levels ?? [], [specs, spec]);
  const disciplines = levels.find((l) => l.slug === level)?.disciplines ?? [];
  const moved = subject !== m.subjectSlug || spec !== m.specializationSlug || level !== m.levelSlug || discipline !== m.discipline;

  async function post(body: Record<string, unknown>, done: string, refresh = true) {
    setBusy(true);
    setError("");
    setMessage("");
    const r = await api.post(`/api/admin/modules/${m.id}/structure`, body);
    setBusy(false);
    if (!r.ok) {
      setError(apiMessage(r));
      return false;
    }
    setMessage(done);
    if (refresh) router.refresh();
    return true;
  }

  const moveChapter = (i: number, d: -1 | 1) => {
    const j = i + d;
    if (j < 0 || j >= chapters.length) return;
    const ids = chapters.map((c) => c.id);
    [ids[i], ids[j]] = [ids[j], ids[i]];
    void post({ op: "reorderChapters", ids }, "Chapter order saved.");
  };

  return (
    <div className="space-y-6">
      {(error || message) && (
        <p role={error ? "alert" : "status"} className="rounded-lg border-2 border-ink p-3 font-medium">
          {error || message}
        </p>
      )}
      {m.kind === "module" && (
        <Card title="Placement">
          <p className="mb-4 text-sm text-ink/70">Assign this module to a subject, a specialization and an academic level. Its chapters, its task and its text move with it, and its old address redirects.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Subject">
              <select
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                  setSpec("");
                  setLevel("");
                }}
                className={inputCls}
              >
                {outline.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Specialization">
              <select
                value={spec}
                onChange={(e) => {
                  setSpec(e.target.value);
                  setLevel("");
                }}
                className={inputCls}
              >
                <option value="">Choose…</option>
                {specs.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Academic level">
              <select value={level} onChange={(e) => setLevel(e.target.value)} disabled={!spec} className={inputCls}>
                <option value="">Choose…</option>
                {levels.map((l) => (
                  <option key={l.slug} value={l.slug}>
                    {l.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Discipline (heading)" hint="Choose one or type a new one. Empty: directly under the level.">
              <input value={discipline} onChange={(e) => setDiscipline(e.target.value)} list="ms-disciplines" maxLength={120} className={inputCls} autoComplete="off" />
              <datalist id="ms-disciplines">{disciplines.map((d) => <option key={d} value={d} />)}</datalist>
            </Field>
          </div>
          <p className="mt-4">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              disabled={busy || !moved || !spec || !level || dirty}
              onClick={async () => {
                if (await post({ op: "move", subjectSlug: subject, specializationSlug: spec, levelSlug: level, discipline }, "Moved. Reloading…", false)) router.refresh();
              }}
            >
              {busy ? "Moving…" : "Move this module"}
            </button>
            {dirty && <span className="ml-3 text-sm text-ink/70">Save your changes first.</span>}
          </p>
        </Card>
      )}

      {m.kind === "module" && (
        <Card title="Chapters">
          <p className="mb-4 text-sm text-ink/70">Large modules are split into chapters. Each chapter has its own page, its own planner task and its own editor.</p>
          {chapters.length === 0 ? (
            <p className="text-sm text-ink/70">This module has no chapters.</p>
          ) : (
            <ol className="divide-y divide-ink/10 rounded-lg border border-ink/10">
              {chapters.map((c, i) => (
                <li key={c.id} className="flex flex-wrap items-center gap-x-3 gap-y-1 px-3 py-2 text-sm">
                  <span className="w-6 text-ink/50">{i + 1}.</span>
                  <Link href={`/admin/modules/${c.id}`} className="font-semibold text-brand underline underline-offset-4">
                    {c.title}
                  </Link>
                  <span className="text-xs text-ink/60">
                    {c.publication === "published" ? "Published" : c.hasBody ? "Written, not published" : "Not written"}
                    {c.recordRef && ` · ${c.recordRef}`}
                  </span>
                  <span className="ml-auto flex gap-1.5">
                    <button type="button" className="rounded border border-ink/20 px-2 hover:border-brand disabled:opacity-40" disabled={busy || i === 0} onClick={() => moveChapter(i, -1)} aria-label={`Move ${c.title} up`}>
                      ↑
                    </button>
                    <button type="button" className="rounded border border-ink/20 px-2 hover:border-brand disabled:opacity-40" disabled={busy || i === chapters.length - 1} onClick={() => moveChapter(i, 1)} aria-label={`Move ${c.title} down`}>
                      ↓
                    </button>
                  </span>
                </li>
              ))}
            </ol>
          )}
          <form
            className="mt-4 flex flex-wrap items-end gap-3"
            onSubmit={async (ev) => {
              ev.preventDefault();
              if (await post({ op: "addChapter", title: chapterTitle }, "Chapter added.")) setChapterTitle("");
            }}
          >
            <Field label="New chapter title">
              <input value={chapterTitle} onChange={(e) => setChapterTitle(e.target.value)} minLength={3} maxLength={160} required className={inputCls} />
            </Field>
            <button type="submit" className="btn btn-secondary btn-sm mb-0.5" disabled={busy}>
              Add chapter
            </button>
          </form>
        </Card>
      )}
    </div>
  );
}
