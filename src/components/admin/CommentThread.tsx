"use client";

import { useState } from "react";
import { apiMessage, useAdmin, useApi } from "./AdminProvider";
import { dateTime } from "./ui";

export type CommentView = {
  id: string;
  parentId: string | null;
  authorId: string | null;
  authorName: string;
  body: string;
  resolved: boolean;
  createdAt: string;
  editedAt: string | null;
};

const small = "inline-flex min-h-8 items-center rounded-md px-2 text-xs font-semibold text-brand underline underline-offset-4 hover:text-ink disabled:opacity-50";

/**
 * Simple threaded comments: top-level notes with one level of replies. Everyone who can see the task can write; you edit or
 * delete only your own; only the owner resolves a thread (the API enforces all of it again). Plain text, never HTML.
 */
export function CommentThread({ target, initial }: { target: { recordId?: string; articleId?: string }; initial: CommentView[] }) {
  const api = useApi();
  const { user } = useAdmin();
  const owner = user.role === "owner";
  const [items, setItems] = useState(initial);
  const [draft, setDraft] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function add(parentId: string | null, body: string, reset: () => void) {
    if (!body.trim()) return;
    setBusy(true);
    setError("");
    const r = await api.post<{ comment?: CommentView }>("/api/admin/comments", { ...target, parentId, body });
    setBusy(false);
    if (!r.ok || !r.data.comment) return setError(apiMessage(r));
    setItems((cur) => [...cur, r.data.comment!]);
    reset();
  }

  async function save(id: string) {
    setBusy(true);
    const r = await api.patch(`/api/admin/comments/${id}`, { body: text });
    setBusy(false);
    if (!r.ok) return setError(apiMessage(r));
    setItems((cur) => cur.map((c) => (c.id === id ? { ...c, body: text.trim(), editedAt: new Date().toISOString() } : c)));
    setEditing(null);
  }

  async function resolve(id: string, resolved: boolean) {
    const r = await api.patch(`/api/admin/comments/${id}`, { resolved });
    if (!r.ok) return setError(apiMessage(r));
    setItems((cur) => cur.map((c) => (c.id === id ? { ...c, resolved } : c)));
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this comment (and its replies)?")) return;
    const r = await api.del(`/api/admin/comments/${id}`);
    if (!r.ok) return setError(apiMessage(r));
    setItems((cur) => cur.filter((c) => c.id !== id && c.parentId !== id));
  }

  const top = items.filter((c) => !c.parentId);
  const open = top.filter((c) => !c.resolved).length;

  const row = (c: CommentView, isReply: boolean) => (
    <div key={c.id} className={isReply ? "ml-6 border-l-2 border-ink/10 pl-4" : ""}>
      <div className={`rounded-lg p-3 ${c.resolved && !isReply ? "bg-ink/5" : "bg-sky/40"}`}>
        <p className="flex flex-wrap items-baseline justify-between gap-2 text-xs text-ink/70">
          <span>
            <strong className="text-ink">{c.authorName || "Former member"}</strong> · {dateTime(c.createdAt)}
            {c.editedAt && " · edited"}
            {c.resolved && !isReply && " · resolved"}
          </span>
        </p>
        {editing === c.id ? (
          <div className="mt-2 space-y-2">
            <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} maxLength={4000} className="field" aria-label="Edit comment" />
            <div className="flex gap-2">
              <button type="button" className="btn btn-primary btn-sm" disabled={busy || !text.trim()} onClick={() => save(c.id)}>
                Save
              </button>
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => setEditing(null)}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="mt-1 whitespace-pre-wrap break-words">{c.body}</p>
        )}
        {editing !== c.id && (
          <div className="mt-1 flex flex-wrap gap-1">
            {!isReply && (
              <button type="button" className={small} onClick={() => setReplyTo(replyTo === c.id ? null : c.id)}>
                Reply
              </button>
            )}
            {c.authorId === user.id && (
              <>
                <button
                  type="button"
                  className={small}
                  onClick={() => {
                    setEditing(c.id);
                    setText(c.body);
                  }}
                >
                  Edit
                </button>
                <button type="button" className={small} onClick={() => remove(c.id)}>
                  Delete
                </button>
              </>
            )}
            {owner && c.authorId !== user.id && (
              <button type="button" className={small} onClick={() => remove(c.id)}>
                Delete
              </button>
            )}
            {owner && !isReply && (
              <button type="button" className={small} onClick={() => resolve(c.id, !c.resolved)}>
                {c.resolved ? "Reopen" : "Mark resolved"}
              </button>
            )}
          </div>
        )}
      </div>
      {replyTo === c.id && (
        <ReplyBox
          busy={busy}
          onSend={(body) =>
            add(c.id, body, () => {
              setReplyTo(null);
            })
          }
        />
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      <p className="text-sm text-ink/70">
        {top.length === 0 ? "No comments yet." : `${top.length} comment${top.length === 1 ? "" : "s"}${owner ? `, ${open} to resolve` : ""}.`}
      </p>
      {top.length > 0 && (
        <ul className="space-y-3">
          {top.map((c) => (
            <li key={c.id} className="space-y-2">
              {row(c, false)}
              {items.filter((r) => r.parentId === c.id).map((r) => row(r, true))}
            </li>
          ))}
        </ul>
      )}
      {error && (
        <p role="alert" className="font-semibold">
          {error}
        </p>
      )}
      <div>
        <label htmlFor={`new-comment-${target.recordId ?? target.articleId}`} className="mb-1 block text-sm font-medium">
          Add a comment
        </label>
        <textarea id={`new-comment-${target.recordId ?? target.articleId}`} value={draft} onChange={(e) => setDraft(e.target.value)} rows={3} maxLength={4000} className="field" />
        <button type="button" className="btn btn-secondary btn-sm mt-2" disabled={busy || !draft.trim()} onClick={() => add(null, draft, () => setDraft(""))}>
          Post comment
        </button>
      </div>
    </div>
  );
}

function ReplyBox({ onSend, busy }: { onSend: (body: string) => void; busy: boolean }) {
  const [v, setV] = useState("");
  return (
    <div className="ml-6 mt-2 space-y-2">
      <textarea value={v} onChange={(e) => setV(e.target.value)} rows={2} maxLength={4000} className="field" aria-label="Reply" />
      <button
        type="button"
        className="btn btn-secondary btn-sm"
        disabled={busy || !v.trim()}
        onClick={() => {
          onSend(v);
          setV("");
        }}
      >
        Send reply
      </button>
    </div>
  );
}
