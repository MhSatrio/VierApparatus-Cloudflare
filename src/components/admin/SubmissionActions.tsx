"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiMessage, useApi } from "./AdminProvider";

export function SubmissionActions({ id, status, articleId }: { id: string; status: string; articleId: string | null }) {
  const api = useApi();
  const router = useRouter();
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  async function act(action: "accept" | "reject" | "revision" | "convert") {
    setBusy(true);
    setMsg("");
    const r = await api.post<{ articleId?: string }>(`/api/admin/submissions/${id}`, { action, note });
    if (!r.ok) setMsg(apiMessage(r));
    else if (action === "convert" && r.data.articleId) router.push(`/admin/articles/${r.data.articleId}`);
    else router.refresh();
    setBusy(false);
  }

  return (
    <div className="mt-4 space-y-3">
      <label className="block text-sm font-medium">
        Private note (not sent to the contributor)
        <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} maxLength={2000} className="field mt-1 font-normal" />
      </label>
      <div className="flex flex-wrap gap-2">
        {articleId ? (
          <Link href={`/admin/articles/${articleId}`} className="btn btn-primary btn-sm">
            Open the draft
          </Link>
        ) : (
          <button type="button" className="btn btn-primary btn-sm" disabled={busy} onClick={() => act("convert")}>
            Accept and create draft
          </button>
        )}
        {status !== "accepted" && (
          <button type="button" className="btn btn-secondary btn-sm" disabled={busy} onClick={() => act("accept")}>
            Mark accepted
          </button>
        )}
        <button type="button" className="btn btn-secondary btn-sm" disabled={busy} onClick={() => act("revision")}>
          Request revision
        </button>
        <button type="button" className="btn btn-secondary btn-sm" disabled={busy} onClick={() => act("reject")}>
          Reject
        </button>
      </div>
      <p className="text-xs text-ink/60">Accepting creates a draft only. It does not create an account and nothing is published until you publish it. Reply to the contributor by e-mail.</p>
      {msg && (
        <p role="alert" className="text-sm font-medium">
          {msg}
        </p>
      )}
    </div>
  );
}

export function InquiryActions({ id, status }: { id: string; status: string }) {
  const api = useApi();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const set = async (s: "new" | "read" | "archived") => {
    setBusy(true);
    await api.patch(`/api/admin/inquiries/${id}`, { status: s });
    router.refresh();
    setBusy(false);
  };
  return (
    <div className="flex gap-2">
      {status !== "read" && (
        <button type="button" className="btn btn-secondary btn-sm" disabled={busy} onClick={() => set("read")}>
          Mark as read
        </button>
      )}
      {status !== "archived" && (
        <button type="button" className="btn btn-secondary btn-sm" disabled={busy} onClick={() => set("archived")}>
          Archive
        </button>
      )}
      {status !== "new" && (
        <button type="button" className="btn btn-secondary btn-sm" disabled={busy} onClick={() => set("new")}>
          Mark as new
        </button>
      )}
    </div>
  );
}
