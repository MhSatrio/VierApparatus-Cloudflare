"use client";

import { useCallback, useState } from "react";
import type { AdminLevel, AdminSpecialization, AdminSubject, ModuleChoice, SharedEntry } from "@/lib/store/curriculum";
import { apiMessage, useApi } from "../AdminProvider";
import { Dialog, Field, inputCls } from "../Dialog";
import { useImageUpload } from "../editor/MediaPicker";
import { Card } from "../ui";

type NodeDraft = { id?: string; subjectId?: string; name: string; slug: string; tagline: string; description: string; published: boolean; archived: boolean; coverUrl: string; coverThumbUrl: string };
type LevelDraft = { id?: string; specializationId: string; name: string; slug: string; description: string };

const chip = "inline-block rounded-full px-2 py-0.5 text-xs font-semibold";
const small = "rounded border border-ink/20 px-2 py-0.5 text-sm hover:border-brand disabled:opacity-40";

/**
 * The shape of the Module menu, edited here: main subjects, their specializations, the academic levels of each, their order, cover
 * images, publication, and the modules a level lists from another specialization. The public Module pages are built from exactly
 * these rows. Only the owner can open this screen, and the server re-checks every change.
 */
export function CurriculumManager({ initial }: { initial: AdminSubject[] }) {
  const api = useApi();
  const upload = useImageUpload("modules");
  const [subjects, setSubjects] = useState(initial);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [node, setNode] = useState<NodeDraft | null>(null);
  const [level, setLevel] = useState<LevelDraft | null>(null);
  const [sharing, setSharing] = useState<AdminLevel | null>(null);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);

  const reload = useCallback(async () => {
    const r = await api.get<{ subjects: AdminSubject[] }>("/api/admin/curriculum");
    if (r.ok) setSubjects(r.data.subjects);
  }, [api]);

  async function send(body: Record<string, unknown>, done: string): Promise<boolean> {
    setBusy(true);
    setError("");
    setMessage("");
    const r = await api.post("/api/admin/curriculum", body);
    setBusy(false);
    if (!r.ok) {
      setError(apiMessage(r));
      return false;
    }
    setMessage(done);
    await reload();
    return true;
  }

  const move = (ids: string[], from: number, d: -1 | 1, kind: "subjects" | "levels") => {
    const to = from + d;
    if (to < 0 || to >= ids.length) return;
    const next = [...ids];
    [next[from], next[to]] = [next[to], next[from]];
    void send({ op: "order", kind, ids: next }, "Order saved.");
  };

  const emptyNode = (subjectId?: string): NodeDraft => ({ subjectId, name: "", slug: "", tagline: "", description: "", published: true, archived: false, coverUrl: "", coverThumbUrl: "" });
  const editNode = (n: AdminSubject | AdminSpecialization, subjectId?: string): NodeDraft => ({
    id: n.id, subjectId, name: n.name, slug: n.slug, tagline: "tagline" in n ? n.tagline : "", description: n.description, published: n.published, archived: n.archived, coverUrl: n.coverUrl, coverThumbUrl: n.coverThumbUrl,
  });

  async function saveNode(ev: React.FormEvent) {
    ev.preventDefault();
    if (!node) return;
    if (await send({ op: "save", node }, `${node.subjectId ? "Specialization" : "Subject"} saved.`)) setNode(null);
  }
  async function saveLevel(ev: React.FormEvent) {
    ev.preventDefault();
    if (!level) return;
    if (await send({ op: "saveLevel", level }, "Level saved.")) setLevel(null);
  }
  async function pickCover(file: File | undefined) {
    if (!file || !node) return;
    setUploading(true);
    const r = await upload(file, node.name);
    setUploading(false);
    if (!r.ok) return setError(r.error);
    setNode({ ...node, coverUrl: r.image.url, coverThumbUrl: r.image.thumbUrl ?? r.image.url });
  }

  const publicHref = (s: AdminSubject, sp?: AdminSpecialization) => (sp ? `/module/${s.slug}/${sp.slug}` : `/module/${s.slug}`);

  return (
    <div className="space-y-6">
      <p className="max-w-3xl text-ink/80">
        Everything in the public Module menu comes from this page. Main subjects are independent disciplines (Biology, Chemistry, …); fields that grow out of one, such as Bioinformatics, are <strong>specializations</strong> of a subject. Each
        specialization has its own academic levels and modules. Changing an address leaves a permanent redirect from the old one.
      </p>
      {(error || message) && (
        <p role={error ? "alert" : "status"} className="rounded-lg border-2 border-ink p-3 font-medium">
          {error || message}
        </p>
      )}
      <p>
        <button type="button" className="btn btn-primary btn-sm" onClick={() => setNode(emptyNode())}>
          + Add a subject
        </button>
      </p>

      {subjects.map((s, si) => (
        <Card key={s.id}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-2xl">
                {s.name} <span className="text-base font-normal text-ink/60">/module/{s.slug}</span>
              </h2>
              <p className="mt-1 text-sm text-ink/75">{s.tagline}</p>
              <p className="mt-2 flex flex-wrap gap-2">
                <span className={`${chip} ${s.published && !s.archived ? "bg-brand text-white" : "bg-ink/10"}`}>{s.archived ? "Archived" : s.published ? "Published" : "Hidden"}</span>
                <span className={`${chip} bg-ink/10`}>{s.specializations.length} specializations</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button type="button" className={small} disabled={busy || si === 0} onClick={() => move(subjects.map((x) => x.id), si, -1, "subjects")} aria-label={`Move ${s.name} up`}>
                ↑
              </button>
              <button type="button" className={small} disabled={busy || si === subjects.length - 1} onClick={() => move(subjects.map((x) => x.id), si, 1, "subjects")} aria-label={`Move ${s.name} down`}>
                ↓
              </button>
              <button type="button" className={small} onClick={() => setNode(editNode(s))}>
                Edit
              </button>
              <button type="button" className={small} onClick={() => setNode(emptyNode(s.id))}>
                + Specialization
              </button>
              <a className={small} href={publicHref(s)} target="_blank" rel="noreferrer">
                View
              </a>
              <button
                type="button"
                className={small}
                disabled={busy}
                onClick={() => {
                  if (window.confirm(`Delete ${s.name}? This works only when nothing is planned or written under it; otherwise archive it.`)) void send({ op: "delete", id: s.id }, "Deleted.");
                }}
              >
                Delete
              </button>
            </div>
          </div>

          <ul className="mt-5 divide-y divide-ink/10 rounded-xl border border-ink/10">
            {s.specializations.length === 0 && <li className="p-4 text-sm text-ink/70">No specializations yet.</li>}
            {s.specializations.map((sp, pi) => (
              <li key={sp.id}>
                <details className="group">
                  <summary className="flex cursor-pointer flex-wrap items-center gap-x-3 gap-y-1 px-4 py-3 hover:bg-sky/30">
                    <span className="font-semibold">{sp.name}</span>
                    <span className="text-xs text-ink/60">/{sp.slug}</span>
                    {(sp.archived || !sp.published) && <span className={`${chip} bg-ink/10`}>{sp.archived ? "Archived" : "Hidden"}</span>}
                    <span className="ml-auto text-xs text-ink/65">
                      {sp.levels.length} levels · {sp.moduleCount} modules
                    </span>
                  </summary>
                  <div className="space-y-4 border-t border-ink/10 bg-white px-4 py-4">
                    <p className="text-sm text-ink/80">{sp.description || "No description."}</p>
                    <div className="flex flex-wrap gap-1.5">
                      <button type="button" className={small} disabled={busy || pi === 0} onClick={() => move(s.specializations.map((x) => x.id), pi, -1, "subjects")} aria-label={`Move ${sp.name} up`}>
                        ↑
                      </button>
                      <button type="button" className={small} disabled={busy || pi === s.specializations.length - 1} onClick={() => move(s.specializations.map((x) => x.id), pi, 1, "subjects")} aria-label={`Move ${sp.name} down`}>
                        ↓
                      </button>
                      <button type="button" className={small} onClick={() => setNode(editNode(sp, s.id))}>
                        Edit
                      </button>
                      <button type="button" className={small} onClick={() => setLevel({ specializationId: sp.id, name: "", slug: "", description: "" })}>
                        + Academic level
                      </button>
                      <a className={small} href={publicHref(s, sp)} target="_blank" rel="noreferrer">
                        View
                      </a>
                      <button
                        type="button"
                        className={small}
                        disabled={busy}
                        onClick={() => {
                          if (window.confirm(`Delete ${sp.name}? This works only when nothing is planned or written in it; otherwise archive it.`)) void send({ op: "delete", id: sp.id }, "Deleted.");
                        }}
                      >
                        Delete
                      </button>
                    </div>
                    <ol className="space-y-2">
                      {sp.levels.map((l, li) => (
                        <li key={l.id} className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border border-ink/10 px-3 py-2">
                          <span className="text-sm font-semibold">
                            {l.num}. {l.name}
                          </span>
                          <span className="text-xs text-ink/60">/{l.slug}</span>
                          <span className="text-xs text-ink/65">
                            {l.moduleCount} modules{l.sharedCount > 0 && ` · ${l.sharedCount} shared`}
                          </span>
                          <span className="ml-auto flex flex-wrap gap-1.5">
                            <button type="button" className={small} disabled={busy || li === 0} onClick={() => move(sp.levels.map((x) => x.id), li, -1, "levels")} aria-label={`Move ${l.name} up`}>
                              ↑
                            </button>
                            <button type="button" className={small} disabled={busy || li === sp.levels.length - 1} onClick={() => move(sp.levels.map((x) => x.id), li, 1, "levels")} aria-label={`Move ${l.name} down`}>
                              ↓
                            </button>
                            <button type="button" className={small} onClick={() => setLevel({ id: l.id, specializationId: sp.id, name: l.name, slug: l.slug, description: l.description })}>
                              Edit
                            </button>
                            <button type="button" className={small} onClick={() => setSharing(l)}>
                              Shared modules
                            </button>
                            <button
                              type="button"
                              className={small}
                              disabled={busy}
                              onClick={() => {
                                if (window.confirm(`Delete the level “${l.name}”? Only an empty level can be deleted.`)) void send({ op: "deleteLevel", id: l.id }, "Level deleted.");
                              }}
                            >
                              Delete
                            </button>
                          </span>
                        </li>
                      ))}
                      {sp.levels.length === 0 && <li className="text-sm text-ink/70">No academic levels yet.</li>}
                    </ol>
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </Card>
      ))}

      <Dialog open={node !== null} onClose={() => setNode(null)} title={node ? `${node.id ? "Edit" : "Add"} ${node.subjectId ? "specialization" : "subject"}` : ""} wide>
        {node && (
          <form onSubmit={saveNode} className="space-y-4">
            {node.subjectId && (
              <Field label="Main subject" hint="A specialization can be moved to another subject; its old address then redirects.">
                <select value={node.subjectId} onChange={(e) => setNode({ ...node, subjectId: e.target.value })} className={inputCls}>
                  {subjects.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </Field>
            )}
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name">
                <input value={node.name} onChange={(e) => setNode({ ...node, name: e.target.value })} required minLength={2} maxLength={120} className={inputCls} />
              </Field>
              <Field label="Address segment" hint={`Part of the web address. Empty: made from the name. Now: /${node.slug || "…"}`}>
                <input value={node.slug} onChange={(e) => setNode({ ...node, slug: e.target.value })} maxLength={60} className={inputCls} placeholder="general-biology" />
              </Field>
            </div>
            {!node.subjectId && (
              <Field label="Tagline" hint="One line shown on the subject card.">
                <input value={node.tagline} onChange={(e) => setNode({ ...node, tagline: e.target.value })} maxLength={160} className={inputCls} />
              </Field>
            )}
            <Field label="Description">
              <textarea value={node.description} onChange={(e) => setNode({ ...node, description: e.target.value })} rows={4} maxLength={1200} className={inputCls} />
            </Field>
            <div>
              <p className="font-medium">Cover image</p>
              <p className="text-sm text-ink/70">Optional. It is converted to WebP in your browser and stored with a small thumbnail. Without one, a line drawing is shown.</p>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                {node.coverThumbUrl && <img src={node.coverThumbUrl} alt="" className="h-16 w-16 rounded-xl border border-ink/15 object-cover" />}
                <label className="btn btn-secondary btn-sm cursor-pointer">
                  {uploading ? "Uploading…" : node.coverUrl ? "Replace image" : "Upload an image"}
                  <input type="file" accept="image/*" className="sr-only" disabled={uploading} onChange={(e) => void pickCover(e.target.files?.[0])} />
                </label>
                {node.coverUrl && (
                  <button type="button" className="text-sm font-semibold text-brand underline underline-offset-4" onClick={() => setNode({ ...node, coverUrl: "", coverThumbUrl: "" })}>
                    Remove
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={node.published} onChange={(e) => setNode({ ...node, published: e.target.checked })} /> Published (visible on the site)
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={node.archived} onChange={(e) => setNode({ ...node, archived: e.target.checked })} /> Archived (hidden, nothing lost)
              </label>
            </div>
            <p className="flex gap-3">
              <button type="submit" className="btn btn-primary btn-sm" disabled={busy || uploading}>
                {busy ? "Saving…" : "Save"}
              </button>
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => setNode(null)}>
                Cancel
              </button>
            </p>
          </form>
        )}
      </Dialog>

      <Dialog open={level !== null} onClose={() => setLevel(null)} title={level?.id ? "Edit academic level" : "Add academic level"}>
        {level && (
          <form onSubmit={saveLevel} className="space-y-4">
            <Field label="Name">
              <input value={level.name} onChange={(e) => setLevel({ ...level, name: e.target.value })} required minLength={2} maxLength={120} className={inputCls} />
            </Field>
            <Field label="Address segment" hint="Empty: made from the name.">
              <input value={level.slug} onChange={(e) => setLevel({ ...level, slug: e.target.value })} maxLength={60} className={inputCls} />
            </Field>
            <Field label="Description">
              <textarea value={level.description} onChange={(e) => setLevel({ ...level, description: e.target.value })} rows={3} maxLength={600} className={inputCls} />
            </Field>
            <p className="flex gap-3">
              <button type="submit" className="btn btn-primary btn-sm" disabled={busy}>
                {busy ? "Saving…" : "Save"}
              </button>
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => setLevel(null)}>
                Cancel
              </button>
            </p>
          </form>
        )}
      </Dialog>

      <SharedModules level={sharing} onClose={() => setSharing(null)} onChanged={reload} />
    </div>
  );
}

/** The modules a level lists from other specializations ("Shared foundations"): they stay where they are and are shown here as links. */
function SharedModules({ level, onClose, onChanged }: { level: AdminLevel | null; onClose: () => void; onChanged: () => Promise<void> }) {
  const api = useApi();
  const [q, setQ] = useState("");
  const [found, setFound] = useState<ModuleChoice[]>([]);
  const [entries, setEntries] = useState<SharedEntry[] | null>(null);
  const [error, setError] = useState("");
  const levelId = level?.id;

  const load = useCallback(async () => {
    if (!levelId) return;
    const r = await api.get<{ items: SharedEntry[] }>(`/api/admin/curriculum?shared=${encodeURIComponent(levelId)}`);
    if (r.ok) setEntries(r.data.items);
  }, [api, levelId]);

  const [loadedFor, setLoadedFor] = useState<string | null>(null);
  if (levelId && loadedFor !== levelId) {
    setLoadedFor(levelId);
    setEntries(null);
    setFound([]);
    setQ("");
    void load();
  }

  async function search(value: string) {
    setQ(value);
    if (value.trim().length < 2) return setFound([]);
    const r = await api.get<{ items: ModuleChoice[] }>(`/api/admin/curriculum?q=${encodeURIComponent(value)}&exclude=${encodeURIComponent(levelId ?? "")}`);
    if (r.ok) setFound(r.data.items);
  }
  async function act(body: Record<string, unknown>) {
    setError("");
    const r = await api.post("/api/admin/curriculum", body);
    if (!r.ok) return setError(apiMessage(r));
    await load();
    await onChanged();
  }

  return (
    <Dialog open={level !== null} onClose={() => { setLoadedFor(null); onClose(); }} title={level ? `Shared modules in “${level.name}”` : ""} wide>
      {level && (
        <div className="space-y-4">
          <p className="text-sm text-ink/75">List a module that belongs to another specialization (a common prerequisite, for example) in this level&apos;s contents. It is not copied: readers are sent to its own page.</p>
          {error && <p role="alert" className="rounded-lg border-2 border-ink p-3 text-sm font-medium">{error}</p>}
          <ul className="divide-y divide-ink/10 rounded-lg border border-ink/10">
            {(entries ?? []).map((e) => (
              <li key={e.id} className="flex items-center justify-between gap-3 px-3 py-2 text-sm">
                <span>
                  <strong>{e.title}</strong> <span className="text-ink/60">{e.path}</span>
                </span>
                <button type="button" className={small} onClick={() => void act({ op: "unshare", linkId: e.id })}>
                  Remove
                </button>
              </li>
            ))}
            {entries && entries.length === 0 && <li className="px-3 py-2 text-sm text-ink/70">Nothing shared into this level yet.</li>}
          </ul>
          <Field label="Find a module to add" hint="Type at least two letters of its title.">
            <input value={q} onChange={(e) => void search(e.target.value)} className={inputCls} type="search" />
          </Field>
          {found.length > 0 && (
            <ul className="divide-y divide-ink/10 rounded-lg border border-ink/10">
              {found.map((m) => (
                <li key={m.id} className="flex items-center justify-between gap-3 px-3 py-2 text-sm">
                  <span>
                    <strong>{m.title}</strong> <span className="text-ink/60">{m.path}</span>
                  </span>
                  <button type="button" className={small} onClick={() => void act({ op: "share", levelId: level.id, moduleId: m.id })}>
                    Add
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </Dialog>
  );
}
