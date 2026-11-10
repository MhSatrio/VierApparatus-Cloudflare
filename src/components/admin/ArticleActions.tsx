"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { apiMessage, useApi } from "./AdminProvider";

type Props = { id: string; slug: string; title: string; status: "draft" | "published" | "archived"; owner: boolean; review: "none" | "requested" | "revision" | "approved" };

const btn = "inline-flex min-h-9 items-center rounded-md border border-ink/25 px-2.5 text-sm font-medium hover:border-brand hover:text-brand disabled:opacity-50";

/** Row actions. Publishing, unpublishing, archiving and deleting are owner-only (and re-checked on the server). */
export function ArticleActions({ id, slug, title, status, owner, review }: Props) {
  const submitted = review === "requested";
  const api = useApi();
  const router = useRouter();
  const dialog = useRef<HTMLDialogElement>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [confirm, setConfirm] = useState("");

  async function run(action: "publish" | "unpublish" | "archive" | "submit" | "withdraw" | "approve" | "request_revision") {
    let note = "";
    if (action === "request_revision") {
      const answer = window.prompt("What should the contributor change? (This becomes a comment they can read.)");
      if (answer === null) return;
      note = answer;
    }
    setBusy(true);
    setMessage("");
    const url = `/api/admin/articles/${id}/status`;
    let r = await api.post<{ problems?: string[]; belowMinimum?: boolean }>(url, { action, note });
    // Below the owner's minimum word count: publishing needs an explicit owner override, asked for here.
    if (!r.ok && action === "publish" && owner && r.data.belowMinimum && window.confirm(`${r.data.problems?.join(" ") ?? ""}\n\nPublish anyway as the owner? This override applies to this publication only and is recorded in the activity log.`)) {
      r = await api.post<{ problems?: string[]; belowMinimum?: boolean }>(url, { action, note, override: true });
    }
    if (r.ok) router.refresh();
    else setMessage(r.data.problems?.join(" ") ?? apiMessage(r));
    setBusy(false);
  }

  async function remove() {
    setBusy(true);
    const r = await api.del(`/api/admin/articles/${id}`, { confirmSlug: confirm });
    if (r.ok) {
      dialog.current?.close();
      router.refresh();
    } else setMessage(r.data.error === "confirmation_mismatch" ? "That does not match the address." : apiMessage(r));
    setBusy(false);
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      <Link href={`/admin/articles/${id}`} className={btn}>
        Edit
      </Link>
      <Link href={`/admin/articles/${id}/preview`} className={btn}>
        Preview
      </Link>
      {status === "published" && (
        <a href={`/articles/${slug}`} className={btn} target="_blank" rel="noopener noreferrer">
          View live
        </a>
      )}
      {owner && status === "draft" && review === "requested" && (
        <>
          <button type="button" className={btn} disabled={busy} onClick={() => run("approve")}>
            Approve
          </button>
          <button type="button" className={btn} disabled={busy} onClick={() => run("request_revision")}>
            Request revision
          </button>
        </>
      )}
      {owner && status !== "published" && (
        <button type="button" className={btn} disabled={busy} onClick={() => run("publish")}>
          Publish
        </button>
      )}
      {owner && status === "published" && (
        <button type="button" className={btn} disabled={busy} onClick={() => run("unpublish")}>
          Unpublish
        </button>
      )}
      {owner && status !== "archived" && (
        <button type="button" className={btn} disabled={busy} onClick={() => run("archive")}>
          Archive
        </button>
      )}
      {!owner && status === "draft" && (
        <button type="button" className={btn} disabled={busy} onClick={() => run(submitted ? "withdraw" : "submit")}>
          {submitted ? "Withdraw from review" : "Submit for review"}
        </button>
      )}
      {owner && (
        <button
          type="button"
          className={`${btn} hover:border-ink hover:text-ink`}
          onClick={() => {
            setConfirm("");
            setMessage("");
            dialog.current?.showModal();
          }}
        >
          Delete
        </button>
      )}
      {message && (
        <p role="alert" className="w-full text-sm font-medium">
          {message}
        </p>
      )}

      <dialog ref={dialog} aria-labelledby={`del-${id}`} className="m-auto w-[min(32rem,92vw)] rounded-xl border border-ink/20 p-0 shadow-card backdrop:bg-ink/50">
        <form
          method="dialog"
          className="space-y-4 p-6"
          onSubmit={(ev) => {
            ev.preventDefault();
            void remove();
          }}
        >
          <h2 id={`del-${id}`} className="text-xl">
            Delete this article permanently?
          </h2>
          <p>
            <strong>{title}</strong> will be removed from the site, search results and sitemap, and cannot be restored. If it was published, its address will stay retired. To keep it but hide it, use Unpublish or Archive instead.
          </p>
          <label className="block text-sm">
            Type the address <code className="rounded bg-sky/60 px-1">{slug}</code> to confirm
            <input value={confirm} onChange={(e) => setConfirm(e.target.value)} className="field mt-1" autoComplete="off" />
          </label>
          {message && (
            <p role="alert" className="text-sm font-medium">
              {message}
            </p>
          )}
          <div className="flex justify-end gap-2">
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => dialog.current?.close()}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm" disabled={busy || confirm !== slug}>
              Delete permanently
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
}
