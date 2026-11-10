"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { productHref } from "@/lib/products/shared";
import type { CommentStatus, ModerationItem } from "@/lib/store/product-comments";
import { apiMessage, useApi } from "../AdminProvider";
import { dateTime } from "../ui";

type Counts = Record<CommentStatus | "all", number>;
const TABS: { key: CommentStatus | ""; label: string }[] = [
  { key: "pending", label: "To review" },
  { key: "approved", label: "Approved" },
  { key: "rejected", label: "Rejected" },
  { key: "spam", label: "Spam" },
  { key: "", label: "All" },
];
const STATUS_STYLE: Record<CommentStatus, string> = { pending: "bg-sky text-ink", approved: "bg-brand text-white", rejected: "bg-ink/70 text-white", spam: "bg-ink text-white" };
const small = "rounded border border-ink/20 px-2 py-1 text-sm hover:border-brand disabled:opacity-40";

/**
 * The moderation queue for product comments. Nothing is public until approved here. Each comment shows what the visitor typed (always
 * as unverified), the reasons it was flagged, and its history; an affiliation is marked verified only by a person who checked it.
 */
export function CommentModeration({ initial, counts: initialCounts, status: initialStatus, productId }: { initial: { items: ModerationItem[]; total: number }; counts: Counts; status: CommentStatus | ""; productId?: string }) {
  const api = useApi();
  const [status, setStatus] = useState<CommentStatus | "">(initialStatus);
  const [items, setItems] = useState(initial.items);
  const [total, setTotal] = useState(initial.total);
  const [counts, setCounts] = useState(initialCounts);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [editing, setEditing] = useState<{ id: string; body: string } | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});

  const reload = useCallback(
    async (s: CommentStatus | "") => {
      const r = await api.get<{ items: ModerationItem[]; total: number; counts: Counts }>(`/api/admin/products/comments?${new URLSearchParams({ ...(s ? { status: s } : {}), ...(productId ? { product: productId } : {}) })}`);
      if (!r.ok) return setError(apiMessage(r));
      setItems(r.data.items);
      setTotal(r.data.total);
      setCounts(r.data.counts);
    },
    [api, productId],
  );

  async function act(id: string, body: Record<string, unknown>, done: string) {
    setBusy(true);
    setError("");
    setMessage("");
    const r = await api.post(`/api/admin/products/comments/${id}`, { ...body, note: notes[id] ?? "" });
    setBusy(false);
    if (!r.ok) return setError(apiMessage(r));
    setMessage(done);
    setEditing(null);
    setNotes((n) => ({ ...n, [id]: "" }));
    await reload(status);
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this comment for good, with its history? Reject it instead unless it must not be kept at all.")) return;
    setBusy(true);
    const r = await api.del(`/api/admin/products/comments/${id}`);
    setBusy(false);
    if (!r.ok) return setError(apiMessage(r));
    setMessage("Deleted.");
    await reload(status);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter comments">
        {TABS.map((t) => (
          <button
            key={t.key || "all"}
            type="button"
            role="tab"
            aria-selected={status === t.key}
            onClick={() => {
              setStatus(t.key);
              void reload(t.key);
            }}
            className="min-h-9 rounded-md border border-ink/25 px-3 text-sm font-medium hover:border-brand aria-selected:border-brand aria-selected:bg-brand aria-selected:text-white"
          >
            {t.label} <span className="opacity-70">({t.key ? counts[t.key] : counts.all})</span>
          </button>
        ))}
        {productId && (
          <Link href="/admin/products/comments" className="ml-auto self-center text-sm font-semibold text-brand underline underline-offset-4">
            Show every product
          </Link>
        )}
      </div>
      {(error || message) && (
        <p role={error ? "alert" : "status"} className="rounded-lg border-2 border-ink p-3 font-medium">
          {error || message}
        </p>
      )}
      {items.length === 0 ? (
        <p className="rounded-xl border border-dashed border-ink/25 p-6 text-ink/70">{status === "pending" ? "Nothing is waiting for review." : "No comments here."}</p>
      ) : (
        <ul className="space-y-4">
          {items.map((c) => (
            <li key={c.id} className="rounded-xl border border-ink/10 bg-white p-5 shadow-card">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLE[c.status]}`}>{c.status === "pending" ? "To review" : c.status[0].toUpperCase() + c.status.slice(1)}</span>
                <strong>{c.displayName}</strong>
                {c.rating && <span aria-label={`${c.rating} out of 5`}>{"★".repeat(c.rating)}</span>}
                <span className="text-sm text-ink/65">{dateTime(c.createdAt)}</span>
                <span className="ml-auto text-sm">
                  on{" "}
                  <Link href={`/admin/products/${c.productId}`} className="font-semibold text-brand underline underline-offset-4">
                    {c.productRef} {c.productName}
                  </Link>{" "}
                  {c.status === "approved" && (
                    <Link href={productHref(c.productSlug)} target="_blank" className="text-brand underline underline-offset-4">
                      (view)
                    </Link>
                  )}
                </span>
              </div>
              <dl className="mt-2 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                <div>
                  <dt className="inline font-semibold">Role: </dt>
                  <dd className="inline">{c.role || "—"}</dd>
                </div>
                <div>
                  <dt className="inline font-semibold">Affiliation (as typed): </dt>
                  <dd className="inline">
                    {c.affiliation || "—"} {c.affiliation && (c.affiliationVerified ? <span className="rounded-full bg-brand px-2 py-0.5 text-xs font-semibold text-white">Verified {c.verifiedAt ? dateTime(c.verifiedAt) : ""}</span> : <span className="text-ink/55">(not verified)</span>)}
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="inline font-semibold">Organization address: </dt>
                  <dd className="inline">{c.orgAddress || "—"}</dd>
                </div>
              </dl>
              {c.flags.length > 0 && (
                <p className="mt-2 text-sm">
                  <span className="font-semibold">Flagged:</span> {c.flags.join("; ")}
                </p>
              )}
              {editing?.id === c.id ? (
                <div className="mt-3">
                  <label className="block text-sm font-semibold" htmlFor={`edit-${c.id}`}>
                    Edit the text (the original is kept in the history)
                  </label>
                  <textarea id={`edit-${c.id}`} value={editing.body} onChange={(e) => setEditing({ id: c.id, body: e.target.value })} rows={6} className="field mt-1" maxLength={3000} />
                  <p className="mt-2 flex gap-2">
                    <button type="button" className="btn btn-primary btn-sm" disabled={busy} onClick={() => void act(c.id, { type: "edit", body: editing.body }, "Text changed.")}>
                      Save the edit
                    </button>
                    <button type="button" className="btn btn-secondary btn-sm" onClick={() => setEditing(null)}>
                      Cancel
                    </button>
                  </p>
                </div>
              ) : (
                <p className="mt-3 whitespace-pre-wrap rounded-lg bg-sky/20 p-3">
                  {c.body}
                  {c.edited && <span className="ml-2 text-xs text-ink/60">(edited by an editor)</span>}
                </p>
              )}
              <div className="mt-3 flex flex-wrap items-end gap-2">
                <label className="block grow sm:max-w-xs">
                  <span className="mb-0.5 block text-xs font-semibold">Note for the history (optional)</span>
                  <input value={notes[c.id] ?? ""} onChange={(e) => setNotes((n) => ({ ...n, [c.id]: e.target.value }))} maxLength={400} className="field !min-h-9 !py-1 text-sm" />
                </label>
                {c.status !== "approved" && (
                  <button type="button" className="btn btn-primary btn-sm" disabled={busy} onClick={() => void act(c.id, { type: "approve" }, "Approved. It is public now.")}>
                    Approve
                  </button>
                )}
                {c.status !== "rejected" && (
                  <button type="button" className={small} disabled={busy} onClick={() => void act(c.id, { type: "reject" }, "Rejected.")}>
                    Reject
                  </button>
                )}
                {c.status !== "spam" && (
                  <button type="button" className={small} disabled={busy} onClick={() => void act(c.id, { type: "spam" }, "Marked as spam.")}>
                    Spam
                  </button>
                )}
                {c.status !== "pending" && (
                  <button type="button" className={small} disabled={busy} onClick={() => void act(c.id, { type: "pending" }, "Returned to review.")}>
                    Back to review
                  </button>
                )}
                <button type="button" className={small} disabled={busy} onClick={() => setEditing({ id: c.id, body: c.body })}>
                  Edit text
                </button>
                {c.affiliation && (
                  <button type="button" className={small} disabled={busy} onClick={() => void act(c.id, { type: c.affiliationVerified ? "unverify" : "verify" }, c.affiliationVerified ? "Verification removed." : "Affiliation marked as verified.")}>
                    {c.affiliationVerified ? "Remove verification" : "Mark affiliation verified"}
                  </button>
                )}
                <button type="button" className={`${small} ml-auto`} disabled={busy} onClick={() => void remove(c.id)}>
                  Delete…
                </button>
              </div>
              <details className="mt-3 text-sm">
                <summary className="cursor-pointer font-semibold">History ({c.history.length})</summary>
                <ol className="mt-2 space-y-1">
                  {c.history.map((h) => (
                    <li key={h.id}>
                      <span className="text-ink/65">{dateTime(h.at)}</span> · <strong>{h.actorName}</strong> · {h.action}
                      {h.note && <span className="text-ink/75"> · {h.note}</span>}
                    </li>
                  ))}
                </ol>
              </details>
            </li>
          ))}
        </ul>
      )}
      <p className="text-sm text-ink/60">{total} in this view.</p>
    </div>
  );
}
