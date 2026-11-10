"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { MathEnhancer } from "@/components/MathEnhancer";
import { renderDoc } from "@/lib/content/render";
import type { Block } from "@/lib/content/schema";
import { docToText, wordCount } from "@/lib/content/text";
import { CONTENT_STATUSES, CONTENT_STATUS_LABEL, doiUrl, MIN_PUBLISH_WORDS, normalizeDoi, PUBLICATION_LABEL, type ContentStatus, type PublicationStatus, type Reference } from "@/lib/modules/shared";
import type { ModuleMdInput } from "@/lib/content/module-export";
import type { ChapterRow } from "@/lib/store/module-structure";
import type { ModuleEdit, Outline } from "@/lib/store/modules";
import { apiMessage, useApi } from "../AdminProvider";
import { ModuleMarkdownPanel, type ImportedModule } from "./ModuleMarkdownPanel";
import { ModuleStructure } from "./ModuleStructure";
import { Field, inputCls } from "../Dialog";
import { BlockEditor } from "../editor/BlockEditor";
import { BLOCK_LABEL, BLOCK_ORDER, isPlaceholderImage, newBlock } from "../editor/inline";
import { MediaPicker, type PickedImage } from "../editor/MediaPicker";
import { Card } from "../ui";

type Item = { key: string; block: Block };
let counter = 0;
const keyOf = () => `mb${Date.now().toString(36)}${(counter++).toString(36)}`;
const toItems = (blocks: Block[]): Item[] => blocks.map((block) => ({ key: keyOf(), block }));
const lines = (t: string) => t.split("\n").map((x) => x.trim()).filter(Boolean);
// The reference list has its own panel (APA text and DOI), so the body does not offer a second "references" block.
const BODY_BLOCKS = BLOCK_ORDER.filter((t) => t !== "references");

const chip = "inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold";
const PUB_CHIP: Record<PublicationStatus, string> = { draft: "bg-ink/10", published: "bg-brand text-white", archived: "bg-ink text-white" };

type Props = { module: ModuleEdit; canWrite: boolean; locked: string | null; owner: boolean; taskHref: string | null; chapters: ChapterRow[]; outline: Outline };
type Tab = "write" | "preview" | "markdown" | "structure";
const TAB_LABEL: Record<Tab, string> = { write: "Write", preview: "Preview", markdown: "Import / export", structure: "Placement & chapters" };

/**
 * Writes one module or chapter: its title, objectives, prerequisites, body (the same block editor as articles), and references.
 * The owner publishes; a contributor writes. The server decides who may do what and re-checks every rule, so the buttons here only mirror it.
 */
export function ModuleEditor({ module: m, canWrite, locked, owner, taskHref, chapters, outline }: Props) {
  const api = useApi();
  const [title, setTitle] = useState(m.title);
  const [summary, setSummary] = useState(m.summary);
  const [objectives, setObjectives] = useState(m.objectives.join("\n"));
  const [prereq, setPrereq] = useState(m.prerequisites.join("\n"));
  const [refs, setRefs] = useState<Reference[]>(m.references.length ? m.references : []);
  const [contentStatus, setContentStatus] = useState<ContentStatus>(m.contentStatus);
  const [items, setItems] = useState<Item[]>(() => toItems(m.doc.blocks.length ? m.doc.blocks : [newBlock("paragraph")]));
  const [version, setVersion] = useState(m.version);
  const [status, setStatus] = useState<PublicationStatus>(m.status);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [problems, setProblems] = useState<string[]>([]);
  const [tab, setTab] = useState<Tab>("write");
  const [importNotes, setImportNotes] = useState<string[]>([]);
  const [libraryFor, setLibraryFor] = useState<((img: PickedImage) => void) | null>(null);
  const [focusKey, setFocusKey] = useState<string | null>(null);
  const editable = canWrite && status !== "archived";

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const edit = <T,>(set: (v: T) => void) => (v: T) => {
    set(v);
    setDirty(true);
  };

  // An image block that has no picture yet is not part of the lesson: it is left out of the preview, the word count and the save, as in articles.
  const blocks = useMemo(() => items.map((i) => i.block).filter((b) => !isPlaceholderImage(b)), [items]);
  const words = useMemo(() => wordCount(docToText({ version: 1, blocks })), [blocks]);
  const rendered = useMemo(() => renderDoc({ version: 1, blocks }), [blocks]);
  const objectiveLines = lines(objectives);
  const doiProblem = (r: Reference) => !!r.doi.trim() && !normalizeDoi(r.doi);
  const refProblem = refs.some(doiProblem);
  const checklist = [
    { ok: words >= MIN_PUBLISH_WORDS, text: `Body of at least ${MIN_PUBLISH_WORDS} words (now ${words})` },
    { ok: objectiveLines.length > 0, text: "At least one learning objective" },
    { ok: refs.filter((r) => r.text.trim()).length > 0 && !refProblem, text: "At least one reference, with valid DOIs" },
    { ok: contentStatus === "final", text: 'Content status is "Final" (after scientific review)' },
  ];

  // What goes into an exported .md file: what is on screen now, saved or not.
  const mdInput: ModuleMdInput = {
    title,
    slug: m.slug,
    subject: m.subjectName,
    specialization: m.specializationName,
    academicLevel: m.levelName,
    description: summary,
    author: m.lastEditorName || "VierApparatus",
    status,
    contentStatus,
    prerequisites: lines(prereq),
    objectives: objectiveLines,
    references: refs.filter((r) => r.text.trim()).map((r) => ({ text: r.text.trim(), doi: normalizeDoi(r.doi) ?? "" })),
    doc: { version: 1, blocks },
  };

  /** Fills the editor from an imported file. Nothing is saved: the person reviews it here and presses Save. */
  function applyImport(r: ImportedModule) {
    if (r.meta.title) setTitle(r.meta.title.slice(0, 160));
    if (r.meta.description !== undefined) setSummary(r.meta.description.slice(0, 600));
    setObjectives(r.objectives.join("\n"));
    setPrereq(r.prerequisites.join("\n"));
    setRefs(r.references);
    setItems(toItems(r.doc.blocks.length ? r.doc.blocks : [newBlock("paragraph")]));
    if (r.meta.contentStatus && (owner || ["not_started", "outlined", "drafting"].includes(r.meta.contentStatus))) setContentStatus(r.meta.contentStatus);
    setDirty(true);
    const notes = [...r.mismatches, ...r.warnings];
    if (r.emptySections.length) notes.push(`${r.emptySections.length} sections have no text yet: ${r.emptySections.slice(0, 6).join(", ")}${r.emptySections.length > 6 ? ", …" : ""}.`);
    setImportNotes(notes);
    setMessage("Imported. Review the Write tab, then press Save. Nothing has been saved or published yet.");
    setTab("write");
  }

  const move = (i: number, d: -1 | 1) => {
    const j = i + d;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    edit(setItems)(next);
  };
  const addAfter = (i: number, type: Block["type"] = "paragraph") => {
    const it: Item = { key: keyOf(), block: newBlock(type) };
    const next = [...items];
    next.splice(i + 1, 0, it);
    setFocusKey(it.key);
    edit(setItems)(next);
  };
  const remove = (i: number) => {
    const next = items.filter((_, k) => k !== i);
    edit(setItems)(next.length ? next : toItems([newBlock("paragraph")]));
  };

  async function save() {
    setSaving(true);
    setError("");
    setMessage("");
    const r = await api.put<{ version?: number }>(`/api/admin/modules/${m.id}`, {
      title,
      summary,
      objectives: objectiveLines,
      prerequisites: lines(prereq),
      references: refs.filter((x) => x.text.trim()).map((x) => ({ text: x.text.trim(), doi: x.doi.trim() })),
      contentStatus,
      doc: { version: 1, blocks },
      expectedVersion: version,
    });
    setSaving(false);
    if (!r.ok) return setError(r.status === 409 ? "Someone saved this module while you were writing. Copy what you need, then reload the page." : apiMessage(r));
    setVersion(r.data.version ?? version + 1);
    setDirty(false);
    setMessage(`Saved at ${new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}.`);
  }

  async function publication(next: PublicationStatus) {
    setBusy(true);
    setError("");
    setMessage("");
    setProblems([]);
    const r = await api.post<{ problems?: string[]; version?: number }>(`/api/admin/modules/${m.id}/publication`, { status: next });
    setBusy(false);
    if (r.status === 422) return setProblems(r.data.problems ?? []);
    if (!r.ok) return setError(apiMessage(r));
    setStatus(next);
    setVersion(r.data.version ?? version + 1);
    setMessage(next === "published" ? "Published. It is live on the site now." : next === "draft" ? "Taken back to draft. It is no longer public." : "Archived.");
  }

  return (
    <div className="space-y-6">
      <nav aria-label="Where this module sits" className="text-sm text-ink/70">
        {m.subjectName} › {m.specializationName} › {m.levelName}
        {m.discipline && <> › {m.discipline}</>}
        {m.kind === "chapter" && <> › chapter</>}
        {taskHref && m.recordRef && (
          <>
            {" · task "}
            <Link href={taskHref} className="text-brand underline underline-offset-4">
              {m.recordRef}
            </Link>
          </>
        )}
      </nav>

      <div className="flex flex-wrap items-center gap-3">
        <span className={`${chip} ${PUB_CHIP[status]}`}>{PUBLICATION_LABEL[status]}</span>
        <span className="text-sm text-ink/70">
          {words.toLocaleString("en-US")} words · version {version}
          {m.assignedToName && <> · assigned to {m.assignedToName}</>}
          {m.lastEditorName && <> · last saved by {m.lastEditorName}</>}
        </span>
        {status === "published" && (
          <Link href={m.href} className="ml-auto text-sm font-semibold text-brand underline underline-offset-4" target="_blank">
            View on the site
          </Link>
        )}
      </div>

      {locked && (
        <p role="status" className="rounded-lg border-2 border-ink p-3 font-medium">
          {locked}
        </p>
      )}
      {(error || message) && (
        <p role={error ? "alert" : "status"} className="rounded-lg border-2 border-ink p-3 font-medium">
          {error || message}
        </p>
      )}

      {importNotes.length > 0 && tab === "write" && (
        <div role="status" className="rounded-lg border border-ink/25 bg-sky/30 p-4 text-sm">
          <p className="font-semibold">Check these before saving:</p>
          <ul className="mt-1 list-disc space-y-1 pl-5">{importNotes.map((n) => <li key={n}>{n}</li>)}</ul>
          <button type="button" className="mt-2 font-semibold text-brand underline underline-offset-4" onClick={() => setImportNotes([])}>
            Dismiss
          </button>
        </div>
      )}

      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Editor view">
        {(["write", "preview", "markdown", ...(owner ? (["structure"] as const) : [])] as Tab[]).map((t) => (
          <button key={t} type="button" role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className="min-h-9 rounded-md border border-ink/25 px-3 text-sm font-medium hover:border-brand aria-selected:border-brand aria-selected:bg-brand aria-selected:text-white">
            {TAB_LABEL[t]}
          </button>
        ))}
        <button type="button" className="btn btn-primary btn-sm ml-auto" disabled={!editable || saving || !dirty} onClick={save}>
          {saving ? "Saving…" : dirty ? "Save changes" : "Saved"}
        </button>
      </div>

      {tab === "markdown" ? (
        <ModuleMarkdownPanel
          current={mdInput}
          where={{ subject: m.subjectName, specialization: m.specializationName, level: m.levelName }}
          hasContent={words > 0}
          editable={editable}
          onImported={applyImport}
          onError={setError}
        />
      ) : tab === "structure" ? (
        <ModuleStructure module={m} chapters={chapters} outline={outline} dirty={dirty} />
      ) : tab === "preview" ? (
        <article className="rounded-xl border border-ink/10 bg-white p-6 shadow-card">
          <p className="text-sm font-semibold text-brand">{m.levelName}</p>
          <h2 className="mt-1 text-3xl">{title || "Untitled"}</h2>
          {summary && <p className="mt-3 text-lg text-ink/85">{summary}</p>}
          {objectiveLines.length > 0 && (
            <section className="mt-6 rounded-lg border border-ink/10 bg-sky/30 p-4">
              <h3 className="text-base">Learning objectives</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5">{objectiveLines.map((o) => <li key={o}>{o}</li>)}</ul>
            </section>
          )}
          <div className="prose-article mt-6" dangerouslySetInnerHTML={{ __html: rendered.html }} />
          {rendered.hasMath && <MathEnhancer html={rendered.html} />}
          {refs.filter((r) => r.text.trim()).length > 0 && (
            <section className="mt-8">
              <h3 className="text-xl">References</h3>
              <ol className="mt-3 space-y-2 text-sm">
                {refs.filter((r) => r.text.trim()).map((r, i) => (
                  <li key={i}>
                    {r.text}
                    {normalizeDoi(r.doi) && (
                      <>
                        {" "}
                        <a href={doiUrl(normalizeDoi(r.doi)!)} className="text-brand underline underline-offset-4" target="_blank" rel="noopener noreferrer">
                          {doiUrl(normalizeDoi(r.doi)!)}
                        </a>
                      </>
                    )}
                  </li>
                ))}
              </ol>
            </section>
          )}
        </article>
      ) : (
        <>
          <Card title="Details">
            <div className="space-y-4">
              <Field label={m.kind === "chapter" ? "Chapter title" : "Module title"}>
                <input value={title} onChange={(e) => edit(setTitle)(e.target.value)} maxLength={160} disabled={!editable} className={inputCls} />
              </Field>
              <Field label="Summary" hint="One or two sentences. Shown in the table of contents and in search results.">
                <textarea value={summary} onChange={(e) => edit(setSummary)(e.target.value)} rows={2} maxLength={600} disabled={!editable} className={inputCls} />
              </Field>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Learning objectives" hint="One per line. What the learner will be able to do.">
                  <textarea value={objectives} onChange={(e) => edit(setObjectives)(e.target.value)} rows={5} disabled={!editable} className={inputCls} />
                </Field>
                <Field label="Prerequisites" hint="One per line. What the learner should already know.">
                  <textarea value={prereq} onChange={(e) => edit(setPrereq)(e.target.value)} rows={5} disabled={!editable} className={inputCls} />
                </Field>
              </div>
              <Field label="Content status" hint={owner ? "Review and Final are set by the owner." : "You can set Not started, Outlined or Drafting. The owner sets review and final."}>
                <select value={contentStatus} onChange={(e) => edit(setContentStatus)(e.target.value as ContentStatus)} disabled={!editable} className={inputCls}>
                  {CONTENT_STATUSES.map((c) => (
                    <option key={c} value={c} disabled={!owner && !["not_started", "outlined", "drafting"].includes(c) && c !== m.contentStatus}>
                      {CONTENT_STATUS_LABEL[c]}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          </Card>

          <Card title="Body">
            <p className="mb-4 text-sm text-ink/70">
              Write the lesson in blocks: headings (level 2 headings become the section list on the right of the page), text, images, lists, tables, equations and callouts. Use a callout to mark what is a hypothesis, a disputed finding or speculation, apart from established knowledge.
            </p>
            <ol className="space-y-4">
              {items.map((it, i) => (
                <li key={it.key} className="rounded-lg border border-ink/15 bg-white p-3">
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-ink/50">{BLOCK_LABEL[it.block.type]}</span>
                    {editable && (
                      <span className="flex gap-1">
                        <button type="button" className="rounded border border-ink/20 px-2 text-sm hover:border-brand disabled:opacity-40" disabled={i === 0} onClick={() => move(i, -1)} aria-label={`Move ${BLOCK_LABEL[it.block.type]} up`}>
                          ↑
                        </button>
                        <button type="button" className="rounded border border-ink/20 px-2 text-sm hover:border-brand disabled:opacity-40" disabled={i === items.length - 1} onClick={() => move(i, 1)} aria-label={`Move ${BLOCK_LABEL[it.block.type]} down`}>
                          ↓
                        </button>
                        <button type="button" className="rounded border border-ink/20 px-2 text-sm hover:border-brand" onClick={() => remove(i)} aria-label={`Remove ${BLOCK_LABEL[it.block.type]}`}>
                          Remove
                        </button>
                      </span>
                    )}
                  </div>
                  <fieldset disabled={!editable} className="min-w-0 border-0 p-0">
                    <BlockEditor
                      block={it.block}
                      onChange={(b) => edit(setItems)(items.map((x) => (x.key === it.key ? { ...x, block: b } : x)))}
                      onEnterNew={() => addAfter(i)}
                      onRemove={() => remove(i)}
                      autoFocus={focusKey === it.key}
                      openLibrary={(done) => setLibraryFor(() => done)}
                      imageKind="modules"
                    />
                  </fieldset>
                </li>
              ))}
            </ol>
            {editable && (
              <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Add a block">
                {BODY_BLOCKS.map((t) => (
                  <button key={t} type="button" className="min-h-9 rounded-md border border-ink/25 px-2.5 text-sm font-medium hover:border-brand hover:text-brand" onClick={() => addAfter(items.length - 1, t)}>
                    + {BLOCK_LABEL[t]}
                  </button>
                ))}
              </div>
            )}
          </Card>

          <Card title="References">
            <p className="mb-4 text-sm text-ink/70">
              Genuine, verifiable sources only, in APA 7th edition. Add the DOI whenever the source has one; it becomes a link. Never invent a citation, a DOI or a finding.
            </p>
            <ol className="space-y-4">
              {refs.map((r, i) => (
                <li key={i} className="grid gap-2 rounded-lg border border-ink/15 p-3 md:grid-cols-[1fr_16rem]">
                  <Field label={`Reference ${i + 1} (APA 7th edition)`}>
                    <textarea value={r.text} onChange={(e) => edit(setRefs)(refs.map((x, k) => (k === i ? { ...x, text: e.target.value } : x)))} rows={3} maxLength={800} disabled={!editable} className={inputCls} />
                  </Field>
                  <Field label="DOI" error={doiProblem(r) ? "This is not a DOI. It looks like 10.1234/abcd" : undefined}>
                    <input value={r.doi} onChange={(e) => edit(setRefs)(refs.map((x, k) => (k === i ? { ...x, doi: e.target.value } : x)))} disabled={!editable} className={inputCls} placeholder="10.1234/abcd" spellCheck={false} />
                  </Field>
                  {editable && (
                    <button type="button" className="text-left text-sm font-semibold text-brand underline underline-offset-4 md:col-span-2" onClick={() => edit(setRefs)(refs.filter((_, k) => k !== i))}>
                      Remove this reference
                    </button>
                  )}
                </li>
              ))}
            </ol>
            {editable && (
              <button type="button" className="btn btn-secondary btn-sm mt-4" onClick={() => edit(setRefs)([...refs, { text: "", doi: "" }])}>
                Add a reference
              </button>
            )}
          </Card>
        </>
      )}

      {owner && (
        <Card title="Publishing">
          <ul className="space-y-1 text-sm" aria-label="Before publishing">
            {checklist.map((c) => (
              <li key={c.text}>
                <span aria-hidden="true">{c.ok ? "✓" : "○"}</span> <span className={c.ok ? "" : "font-semibold"}>{c.text}</span>
                <span className="sr-only">{c.ok ? " (done)" : " (still needed)"}</span>
              </li>
            ))}
          </ul>
          {problems.length > 0 && (
            <div role="alert" className="mt-3 rounded-lg border-2 border-ink p-3 text-sm">
              <p className="font-semibold">Not ready to publish:</p>
              <ul className="mt-1 list-disc pl-5">{problems.map((p) => <li key={p}>{p}</li>)}</ul>
            </div>
          )}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {status !== "published" && (
              <button type="button" className="btn btn-primary btn-sm" disabled={busy || dirty} onClick={() => publication("published")}>
                Publish
              </button>
            )}
            {status === "published" && (
              <button type="button" className="btn btn-secondary btn-sm" disabled={busy} onClick={() => publication("draft")}>
                Take back to draft
              </button>
            )}
            {status !== "archived" && (
              <button type="button" className="btn btn-secondary btn-sm" disabled={busy} onClick={() => publication("archived")}>
                Archive
              </button>
            )}
            {dirty && <span className="text-sm text-ink/70">Save your changes before publishing.</span>}
          </div>
          <p className="mt-3 text-xs text-ink/60">A published module is visible to everyone. A draft or archived one has no public page.</p>
        </Card>
      )}

      <MediaPicker
        open={libraryFor !== null}
        kind="modules"
        onClose={() => setLibraryFor(null)}
        onPick={(img) => {
          libraryFor?.(img);
          setLibraryFor(null);
          setDirty(true);
        }}
      />
    </div>
  );
}
