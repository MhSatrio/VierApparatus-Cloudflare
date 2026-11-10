"use client";

import Link from "next/link";
import { isArticleId } from "@/lib/article-id";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PRIORITIES, PRIORITY_LABEL, REVIEW_LABEL, type PlannerField, type PlannerRecord } from "@/lib/planner-shared";
import { apiMessage, useApi } from "./AdminProvider";
import { CommentThread, type CommentView } from "./CommentThread";
import { Field, inputCls } from "./Dialog";
import { StatusChip } from "./StatusChip";
import { ModuleTaskCard } from "./modules/ModuleTaskCard";
import { Card, dateOnly, dateTime } from "./ui";

type Person = { id: string; name: string };
type Props = {
  record: PlannerRecord;
  fields: PlannerField[];
  people: Person[];
  topics: { id: string; name: string }[];
  owner: boolean;
  meId: string;
  comments: CommentView[];
  linkable: { id: string; title: string; status: string }[];
  /** The linked article can be opened in the editor by this viewer. */
  canOpenEditor: boolean;
  back: string;
};

type T = "start" | "submit" | "withdraw" | "request_revision" | "approve" | "complete" | "reopen" | "archive";

/**
 * One task, seen by the owner (can change everything) or by the assigned contributor (research notes, progress, comments).
 * The buttons only mirror what the server will allow; the server re-checks every action.
 */
export function TaskDetail({ record: r, fields, people, topics, owner, meId, comments, linkable, canOpenEditor, back }: Props) {
  const api = useApi();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [flash, setFlash] = useState("");
  const [note, setNote] = useState("");
  const [research, setResearch] = useState(r.researchNotes);
  const [stale, setStale] = useState(false);
  const mine = r.assignedTo === meId;
  const canAct = owner || mine;

  async function run(p: Promise<{ ok: boolean; status: number; data: { message?: string; error?: string } }>, done: string, refresh = true) {
    setBusy(true);
    setError("");
    setFlash("");
    const res = await p;
    setBusy(false);
    if (!res.ok) {
      setStale(res.status === 409);
      setError(apiMessage(res as never));
      return false;
    }
    setFlash(done);
    setStale(false);
    if (refresh) router.refresh();
    return true;
  }

  const act = (t: T, done: string) =>
    run(api.post(`/api/admin/planner/${r.id}/action`, { action: "transition", transition: t, note }), done).then((ok) => {
      if (ok) setNote("");
    });

  async function saveDetails(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const f = new FormData(ev.currentTarget);
    const g = (k: string) => String(f.get(k) ?? "");
    const custom: Record<string, unknown> = {};
    for (const fl of fields) custom[fl.id] = fl.type === "checkbox" ? f.get(`cf-${fl.id}`) === "on" : g(`cf-${fl.id}`);
    await run(
      api.patch(`/api/admin/planner/${r.id}`, { title: g("title"), brief: g("brief"), topicId: g("topic") || null, priority: g("priority"), dueDate: g("due") || null, notes: g("notes"), custom, expectedVersion: r.version }),
      "Saved.",
    );
  }

  const actionUrl = `/api/admin/planner/${r.id}/action`;

  return (
    <div className="space-y-6">
      <p>
        <Link href={back} className="text-sm text-brand underline underline-offset-4">
          ← Back to the list
        </Link>
      </p>

      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-ink/60">{r.ref}</p>
          <h1 className="text-2xl sm:text-3xl">{r.title}</h1>
          <p className="mt-2 flex flex-wrap items-center gap-2 text-sm">
            <StatusChip status={r.status} />
            {r.reviewStatus !== "none" && <span className="font-medium">{REVIEW_LABEL[r.reviewStatus]}</span>}
            <span className="text-ink/70">
              · Assigned to <strong>{r.assignedToName ?? "nobody yet"}</strong>
              {r.dueDate && <> · due {dateOnly(r.dueDate)}</>} · {PRIORITY_LABEL[r.priority]} priority
            </span>
          </p>
        </div>
        <p className="text-xs text-ink/60">
          Created by {r.createdByName || "—"} · last updated {dateTime(r.updatedAt)}
          {r.updatedByName && ` by ${r.updatedByName}`}
        </p>
      </header>

      {(error || flash) && (
        <div role={error ? "alert" : "status"} className="rounded-lg border-2 border-ink p-3 font-medium">
          {error || flash}
          {stale && (
            <button type="button" className="btn btn-secondary btn-sm ml-3" onClick={() => router.refresh()}>
              Reload latest
            </button>
          )}
        </div>
      )}

      {canAct && (
        <Card title="Progress">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {["planned", "revision", "idea"].includes(r.status) && (
                <button type="button" className="btn btn-secondary btn-sm" disabled={busy} onClick={() => act("start", "Marked as in progress.")}>
                  Start work
                </button>
              )}
              {["planned", "in_progress", "revision"].includes(r.status) && (
                <button type="button" className="btn btn-primary btn-sm" disabled={busy} onClick={() => act("submit", "Submitted for review.")}>
                  Submit for review
                </button>
              )}
              {r.status === "in_review" && (
                <button type="button" className="btn btn-secondary btn-sm" disabled={busy} onClick={() => act("withdraw", "Taken back from review.")}>
                  Withdraw from review
                </button>
              )}
              {owner && r.status === "in_review" && (
                <>
                  <button type="button" className="btn btn-primary btn-sm" disabled={busy} onClick={() => act("approve", r.module ? "Approved. Publish it from the module editor when you are ready." : "Approved. Publish it from Article Management when you are ready.")}>
                    Approve
                  </button>
                  <button type="button" className="btn btn-secondary btn-sm" disabled={busy} onClick={() => act("request_revision", "Sent back for revision.")}>
                    Request revision
                  </button>
                </>
              )}
              {owner && ["approved", "in_progress", "in_review"].includes(r.status) && (
                <button type="button" className="btn btn-secondary btn-sm" disabled={busy} onClick={() => act("complete", "Marked as done.")}>
                  Mark done
                </button>
              )}
              {owner && ["done", "approved", "archived", "in_review"].includes(r.status) && (
                <button type="button" className="btn btn-secondary btn-sm" disabled={busy} onClick={() => act("reopen", "Reopened.")}>
                  Reopen
                </button>
              )}
              {owner && r.status !== "archived" && (
                <button type="button" className="btn btn-secondary btn-sm" disabled={busy} onClick={() => act("archive", "Archived.")}>
                  Archive
                </button>
              )}
            </div>
            {(["planned", "in_progress", "revision"].includes(r.status) || (owner && r.status === "in_review")) && (
              <Field label={owner && r.status === "in_review" ? "Note to the contributor (shown as a comment)" : "Note for the editor (optional)"}>
                <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} maxLength={2000} className={inputCls} />
              </Field>
            )}
            <p className="text-xs text-ink/60">Only the editor publishes. Approving a task never puts anything on the public site.</p>
          </div>
        </Card>
      )}

      <div className="grid gap-6 xl:grid-cols-2">
        <Card title="Brief and details">
          {owner ? (
            <form onSubmit={saveDetails} className="space-y-4">
              <Field label="Title">
                <input name="title" defaultValue={r.title} required minLength={3} maxLength={160} className={inputCls} />
              </Field>
              <Field label="Brief">
                <textarea name="brief" defaultValue={r.brief} rows={4} maxLength={4000} className={inputCls} />
              </Field>
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Topic">
                  <select name="topic" defaultValue={r.topicId ?? ""} className={inputCls}>
                    <option value="">None</option>
                    {topics.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Priority">
                  <select name="priority" defaultValue={r.priority} className={inputCls}>
                    {PRIORITIES.map((p) => (
                      <option key={p} value={p}>
                        {PRIORITY_LABEL[p]}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Due date">
                  <input name="due" type="date" defaultValue={r.dueDate ?? ""} className={inputCls} />
                </Field>
              </div>
              {fields.map((f) => (
                <Field key={f.id} label={f.name}>
                  {f.type === "checkbox" ? (
                    <input name={`cf-${f.id}`} type="checkbox" defaultChecked={r.custom[f.id] === true} className="ml-2 align-middle" />
                  ) : f.type === "select" ? (
                    <select name={`cf-${f.id}`} defaultValue={String(r.custom[f.id] ?? "")} className={inputCls}>
                      <option value="">—</option>
                      {f.options.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  ) : f.type === "longtext" ? (
                    <textarea name={`cf-${f.id}`} defaultValue={String(r.custom[f.id] ?? "")} rows={3} maxLength={4000} className={inputCls} />
                  ) : (
                    <input name={`cf-${f.id}`} type={f.type === "number" ? "number" : f.type === "date" ? "date" : f.type === "url" ? "url" : "text"} defaultValue={String(r.custom[f.id] ?? "")} className={inputCls} />
                  )}
                </Field>
              ))}
              <Field label="Private notes (only you can see these)">
                <textarea name="notes" defaultValue={r.notes} rows={3} maxLength={4000} className={inputCls} />
              </Field>
              <button type="submit" className="btn btn-primary btn-sm" disabled={busy}>
                Save details
              </button>
            </form>
          ) : (
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="font-semibold">Brief</dt>
                <dd className="mt-0.5 whitespace-pre-wrap">{r.brief || "No brief."}</dd>
              </div>
              <div>
                <dt className="font-semibold">Topic</dt>
                <dd>{r.topicName ?? "—"}</dd>
              </div>
              {fields.map((f) => (
                <div key={f.id}>
                  <dt className="font-semibold">{f.name}</dt>
                  <dd>{r.custom[f.id] === undefined ? "—" : f.type === "checkbox" ? (r.custom[f.id] ? "Yes" : "No") : String(r.custom[f.id])}</dd>
                </div>
              ))}
            </dl>
          )}
        </Card>

        <div className="space-y-6">
          <Card title="Research notes">
            <form
              onSubmit={(ev) => {
                ev.preventDefault();
                void run(api.patch(`/api/admin/planner/${r.id}`, { researchNotes: research, expectedVersion: r.version }), "Research notes saved.");
              }}
              className="space-y-3"
            >
              <label htmlFor="research" className="sr-only">
                Research notes
              </label>
              <textarea id="research" value={research} onChange={(e) => setResearch(e.target.value)} rows={7} maxLength={8000} className="field" placeholder="Sources, links, outline, open questions…" />
              <button type="submit" className="btn btn-secondary btn-sm" disabled={busy || research === r.researchNotes}>
                Save notes
              </button>
            </form>
          </Card>

          {r.module ? (
            <ModuleTaskCard record={r} canOpen={owner || mine} />
          ) : (
          <Card title="Article">
            {r.articleId ? (
              <div className="space-y-2 text-sm">
                <p>
                  <Link href={`/admin/articles/${r.articleId}`} className="font-semibold text-brand underline underline-offset-4">
                    {r.articleTitle}
                  </Link>{" "}
                  · {r.articleStatus} · version {r.articleVersion}
                </p>
                <p className="text-ink/70">
                  Last edited {r.articleLastEditor ? `by ${r.articleLastEditor}` : ""} {r.articleUpdatedAt ? `on ${dateTime(r.articleUpdatedAt)}` : ""}
                </p>
                <p className="flex flex-wrap gap-2">
                  {(canOpenEditor || owner) && (
                    <Link href={`/admin/articles/${r.articleId}`} className="btn btn-primary btn-sm">
                      {r.articleStatus === "published" ? "Open article" : "Open draft in the editor"}
                    </Link>
                  )}
                  {owner && (
                    <button type="button" className="btn btn-secondary btn-sm" disabled={busy} onClick={() => run(api.post(actionUrl, { action: "link_article", articleId: null }), "Article unlinked.")}>
                      Unlink
                    </button>
                  )}
                </p>
                {!canOpenEditor && !owner && <p className="text-ink/70">You cannot edit this article right now{r.reviewStatus === "requested" ? " because it is waiting for review. Withdraw it from review to edit." : "."}</p>}
              </div>
            ) : (
              <div className="space-y-3 text-sm">
                <p className="text-ink/70">No draft is linked yet.</p>
                {owner ? (
                  <>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      disabled={busy}
                      onClick={async () => {
                        setBusy(true);
                        const res = await api.post<{ articleId?: string }>(actionUrl, { action: "create_draft" });
                        setBusy(false);
                        if (!res.ok || !res.data.articleId) return setError(apiMessage(res));
                        router.push(`/admin/articles/${res.data.articleId}`);
                      }}
                    >
                      Create a draft for this task
                    </button>
                    {linkable.length > 0 && (
                      <form
                        className="flex flex-wrap items-end gap-2"
                        onSubmit={(ev) => {
                          ev.preventDefault();
                          const id = String(new FormData(ev.currentTarget).get("article") ?? "");
                          if (id) void run(api.post(actionUrl, { action: "link_article", articleId: id }), "Article linked.");
                        }}
                      >
                        <Field label="…or link an existing article">
                          <select name="article" className={inputCls} defaultValue="">
                            <option value="">Choose…</option>
                            {linkable.map((a) => (
                              <option key={a.id} value={a.id}>
                                {a.title} ({a.status})
                              </option>
                            ))}
                          </select>
                        </Field>
                        <button type="submit" className="btn btn-secondary btn-sm" disabled={busy}>
                          Link
                        </button>
                      </form>
                    )}
                    <form
                      className="flex flex-wrap items-end gap-2"
                      onSubmit={(ev) => {
                        ev.preventDefault();
                        const id = String(new FormData(ev.currentTarget).get("articleId") ?? "").trim();
                        if (!isArticleId(id)) return setError("That is not an Article ID. IDs start with a_ and are shown in Article Management (Copy ID).");
                        void run(api.post(actionUrl, { action: "link_article", articleId: id }), "Article linked.");
                      }}
                    >
                      <Field label="…or paste an Article ID">
                        <input name="articleId" className={inputCls} placeholder="a_…" spellCheck={false} autoComplete="off" />
                      </Field>
                      <button type="submit" className="btn btn-secondary btn-sm" disabled={busy}>
                        Link by ID
                      </button>
                    </form>
                  </>
                ) : (
                  <p className="text-ink/70">The editor will create one when the work starts.</p>
                )}
              </div>
            )}
          </Card>
          )}
          {owner && (
            <Card title="Assignment and sharing">
              <form
                className="space-y-3"
                onSubmit={(ev) => {
                  ev.preventDefault();
                  const f = new FormData(ev.currentTarget);
                  void run(api.post(actionUrl, { action: "assign", userId: String(f.get("assignee") ?? "") || null }), "Assignment saved.");
                }}
              >
                <Field label="Assigned to" hint="The linked draft is assigned to the same person, so the task and the article never disagree.">
                  <select name="assignee" defaultValue={r.assignedTo ?? ""} className={inputCls}>
                    <option value="">Nobody</option>
                    {people.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </Field>
                <button type="submit" className="btn btn-secondary btn-sm" disabled={busy}>
                  Save assignment
                </button>
              </form>
              {people.length > 0 && (
                <form
                  className="mt-5 space-y-3 border-t border-ink/10 pt-4"
                  onSubmit={(ev) => {
                    ev.preventDefault();
                    const f = new FormData(ev.currentTarget);
                    void run(api.post(actionUrl, { action: "share", userIds: people.filter((p) => f.get(`share-${p.id}`) === "on").map((p) => p.id) }), "Sharing saved.");
                  }}
                >
                  <fieldset>
                    <legend className="text-sm font-medium">Also visible to (read and comment only)</legend>
                    <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                      {people.map((p) => (
                        <label key={p.id} className="inline-flex items-center gap-2">
                          <input type="checkbox" name={`share-${p.id}`} defaultChecked={r.sharedWith.includes(p.id)} /> {p.name}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <button type="submit" className="btn btn-secondary btn-sm" disabled={busy}>
                    Save sharing
                  </button>
                </form>
              )}
              <p className="mt-5 border-t border-ink/10 pt-4">
                <button
                  type="button"
                  className="text-sm font-semibold text-brand underline underline-offset-4"
                  onClick={async () => {
                    if (!window.confirm(`Delete ${r.ref} and its comments? The linked article (if any) stays.`)) return;
                    const res = await api.del(`/api/admin/planner/${r.id}`);
                    if (res.ok) router.push(back);
                    else setError(apiMessage(res));
                  }}
                >
                  Delete this task
                </button>
              </p>
            </Card>
          )}
        </div>
      </div>

      <Card title="Comments">
        <CommentThread target={{ recordId: r.id }} initial={comments} />
      </Card>
    </div>
  );
}
