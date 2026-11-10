"use client";

import { useEffect, useState } from "react";
import { apiMessage, useApi } from "./AdminProvider";
import { CopyText } from "./CopyText";

type Status = { exists: boolean; createdAt: string | null };

/** Settings: the person's private calendar link for task deadlines. The address is shown once, when it is created. */
export function CalendarFeedCard() {
  const api = useApi();
  const [status, setStatus] = useState<Status | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [asking, setAsking] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    void (async () => {
      const r = await api.get<Status>("/api/admin/calendar-feed");
      if (r.ok) setStatus({ exists: Boolean(r.data.exists), createdAt: (r.data.createdAt as string | null) ?? null });
      else setMsg(apiMessage(r));
    })();
    // api is stable for the life of the page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function create() {
    setBusy(true);
    setMsg("");
    const r = await api.post<Status & { url?: string }>("/api/admin/calendar-feed", {});
    setBusy(false);
    setAsking(false);
    if (!r.ok) return setMsg(apiMessage(r));
    setUrl(r.data.url ?? null);
    setStatus({ exists: true, createdAt: (r.data.createdAt as string | null) ?? new Date().toISOString() });
  }

  return (
    <div className="space-y-4 text-sm">
      <p className="text-ink/80">
        Add your task deadlines to Google Calendar, Outlook or Apple Calendar. The address is private: anyone who has it can read your deadlines, so do not share it. Only open tasks with a due date appear.
      </p>

      {url ? (
        <div className="space-y-2 rounded-lg border-2 border-ink p-3">
          <p className="font-semibold">Your calendar address (shown once, copy it now):</p>
          <CopyText value={url} label="Copy address" />
          <ul className="list-disc space-y-1 pl-5 text-ink/80">
            <li>Google Calendar: Other calendars, then From URL, and paste the address.</li>
            <li>Outlook: Add calendar, then Subscribe from web, and paste the address.</li>
            <li>Apple Calendar: File, then New Calendar Subscription, and paste the address.</li>
          </ul>
        </div>
      ) : status?.exists ? (
        <p className="text-ink/70">
          You have a calendar link (created {status.createdAt ? status.createdAt.slice(0, 10) : "earlier"}). For safety it is not shown again. If you lost it, make a new one.
        </p>
      ) : status ? (
        <p className="text-ink/70">You do not have a calendar link yet.</p>
      ) : null}

      {asking ? (
        <p className="flex flex-wrap items-center gap-3">
          <span>The current link will stop working. Make a new one?</span>
          <button type="button" className="btn btn-primary btn-sm" disabled={busy} onClick={create}>
            Yes, make a new link
          </button>
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => setAsking(false)}>
            Keep the current one
          </button>
        </p>
      ) : (
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          disabled={busy || !status}
          onClick={() => (status?.exists ? setAsking(true) : void create())}
        >
          {status?.exists ? "Make a new link" : "Create my calendar link"}
        </button>
      )}

      {msg && (
        <p role="status" className="font-medium">
          {msg}
        </p>
      )}
    </div>
  );
}
