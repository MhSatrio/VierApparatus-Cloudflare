"use client";

import { useState } from "react";
import { apiMessage, useApi } from "../AdminProvider";
import { CommentThread, type CommentView } from "../CommentThread";
import { dateTime } from "../ui";

type Rev = { id: number; version: number; kind: string; editorName: string; note: string; createdAt: string; title: string };
type Snapshot = { id: number; version: number; title: string; html: string; editorName: string; createdAt: string };

const KIND: Record<string, string> = { auto: "Saved", manual: "Named version", submit: "Submitted for review", revision: "Revision requested", approve: "Approved", publish: "Published", restore: "Restored" };
const small = "inline-flex min-h-8 items-center rounded-md border border-ink/25 px-2.5 text-xs font-semibold hover:border-brand hover:text-brand disabled:opacity-50";

/**
 * Version history, "has someone else changed this?" and editorial comments for one article. NOTHING here talks to the server
 * until the person asks (open the tab, press a button): no polling, no background requests, no cost while idle.
 */
export function ArticleHistory({
  articleId,
  version,
  owner,
  canEdit,
  recordId,
  comments,
  dirty,
  onRestored,
}: {
  articleId: string;
  version: number;
  owner: boolean;
  canEdit: boolean;
  recordId: string | null;
  comments: CommentView[];
  dirty: boolean;
  onRestored: () => void;
}) {
  const api = useApi();
  const [revs, setRevs] = useState<Rev[] | null>(null);
  const [snap, setSnap] = useState<Snapshot | null>(null);
  const [check, setCheck] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [name, setName] = useState("");

  async function loadList() {
    setBusy(true);
    const r = await api.get<{ revisions?: Rev[] }>(`/api/admin/articles/${articleId}/revisions`);
    setBusy(false);
    if (!r.ok) return setMsg(apiMessage(r));
    setRevs(r.data.revisions ?? []);
    setMsg("");
  }

  async function checkUpdates() {
    setBusy(true);
    const r = await api.get<{ version?: number; lastEditorName?: string; updatedAt?: string; reviewStatus?: string }>(`/api/admin/articles/${articleId}/meta`);
    setBusy(false);
    if (!r.ok) return setCheck(apiMessage(r));
    const d = r.data;
    if (d.version === version) setCheck("You have the latest saved version.");
    else setCheck(`A newer version (${d.version}) was saved by ${d.lastEditorName || "someone"} on ${dateTime(d.updatedAt ?? null)}. Reload the page to get it${dirty ? " (copy anything you want to keep from the Markdown tab first)" : ""}.`);
  }

  async function view(id: number) {
    setBusy(true);
    const r = await api.get<{ revision?: Snapshot }>(`/api/admin/articles/${articleId}/revisions/${id}`);
    setBusy(false);
    if (!r.ok || !r.data.revision) return setMsg(apiMessage(r));
    setSnap(r.data.revision);
  }

  async function restore(id: number) {
    if (dirty) return setMsg("Save or discard your unsaved changes first.");
    if (!window.confirm("Restore this version? It becomes a new version; nothing is deleted from the history.")) return;
    setBusy(true);
    const r = await api.post(`/api/admin/articles/${articleId}/revisions`, { action: "restore", revisionId: id });
    setBusy(false);
    if (!r.ok) return setMsg(apiMessage(r));
    onRestored();
  }

  async function saveNamed(ev: React.FormEvent) {
    ev.preventDefault();
    if (dirty) return setMsg("Wait until your changes are saved, then name this version.");
    setBusy(true);
    const r = await api.post(`/api/admin/articles/${articleId}/revisions`, { action: "save_version", note: name });
    setBusy(false);
    if (!r.ok) return setMsg(apiMessage(r));
    setName("");
    setMsg("Version saved.");
    await loadList();
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <section className="space-y-3 rounded-xl border border-ink/10 bg-white p-5 shadow-card">
        <h2 className="text-lg">Is this the latest version?</h2>
        <p className="text-sm text-ink/70">You are editing version {version}. Saving checks for newer changes automatically and never overwrites someone else&apos;s work. You can also check by hand:</p>
        <button type="button" className="btn btn-secondary btn-sm" onClick={checkUpdates} disabled={busy}>
          Check for updates
        </button>
        {check && (
          <p role="status" className="font-medium">
            {check}
          </p>
        )}
      </section>

      <section className="space-y-3 rounded-xl border border-ink/10 bg-white p-5 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg">Version history</h2>
          <button type="button" className="btn btn-secondary btn-sm" onClick={loadList} disabled={busy}>
            {revs ? "Refresh" : "Load history"}
          </button>
        </div>
        {canEdit && (
          <form onSubmit={saveNamed} className="flex flex-wrap items-end gap-2">
            <label className="min-w-0 flex-1 text-sm font-medium">
              Save the current version with a name
              <input value={name} onChange={(e) => setName(e.target.value)} maxLength={300} required placeholder="e.g. Before restructuring" className="field mt-1" />
            </label>
            <button type="submit" className="btn btn-secondary btn-sm" disabled={busy || !name.trim()}>
              Save version
            </button>
          </form>
        )}
        {msg && (
          <p role="status" className="font-medium">
            {msg}
          </p>
        )}
        {revs &&
          (revs.length === 0 ? (
            <p className="text-sm text-ink/70">No earlier versions have been kept yet. A version is kept when someone else edits, after 15 minutes of work, and at every review step.</p>
          ) : (
            <ul className="divide-y divide-ink/10 text-sm">
              {revs.map((r) => (
                <li key={r.id} className="flex flex-wrap items-center justify-between gap-2 py-2">
                  <span>
                    <strong>{KIND[r.kind] ?? r.kind}</strong> · version {r.version} · {r.editorName || "unknown"}
                    <span className="block text-xs text-ink/60">
                      {dateTime(r.createdAt)}
                      {r.note && ` · ${r.note}`}
                    </span>
                  </span>
                  <span className="flex gap-2">
                    <button type="button" className={small} onClick={() => view(r.id)} disabled={busy}>
                      View
                    </button>
                    {owner && (
                      <button type="button" className={small} onClick={() => restore(r.id)} disabled={busy}>
                        Restore
                      </button>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          ))}
        {snap && (
          <div className="rounded-lg border border-ink/15 p-4">
            <div className="mb-3 flex items-start justify-between gap-3">
              <p className="text-sm">
                <strong>{snap.title}</strong>
                <span className="block text-ink/60">
                  Version {snap.version} · {snap.editorName || "unknown"} · {dateTime(snap.createdAt)}
                </span>
              </p>
              <button type="button" className={small} onClick={() => setSnap(null)}>
                Close
              </button>
            </div>
            {/* The HTML comes from the same sanitising renderer as the public site, never from the stored text directly. */}
            <div className="prose-article max-h-[28rem] overflow-y-auto" dangerouslySetInnerHTML={{ __html: snap.html }} />
          </div>
        )}
      </section>

      <section className="space-y-3 rounded-xl border border-ink/10 bg-white p-5 shadow-card">
        <h2 className="text-lg">Editorial comments</h2>
        <CommentThread target={recordId ? { recordId } : { articleId }} initial={comments} />
      </section>
    </div>
  );
}
