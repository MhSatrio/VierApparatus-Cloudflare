"use client";

import { useState } from "react";
import { apiMessage, useApi } from "../AdminProvider";
import { Field, inputCls } from "../Dialog";

type Popup = { enabled: boolean; title: string; message: string };

/** Owner setting: the newsletter popup on the public site. Off until the owner switches it on. */
export function NewsletterSettingsForm({ initial }: { initial: Popup }) {
  const api = useApi();
  const [enabled, setEnabled] = useState(initial.enabled);
  const [title, setTitle] = useState(initial.title);
  const [message, setMessage] = useState(initial.message);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  return (
    <form
      className="space-y-4"
      onSubmit={async (ev) => {
        ev.preventDefault();
        setBusy(true);
        setMsg("");
        const r = await api.put<{ popup?: Popup }>("/api/admin/settings/newsletter", { enabled, title, message });
        setBusy(false);
        setMsg(r.ok ? (enabled ? "Saved. The popup is on for visitors." : "Saved. The popup is off.") : apiMessage(r));
      }}
    >
      <label className="flex items-center justify-between gap-4 rounded-lg border border-ink/15 p-3">
        <span>
          <span className="block text-sm font-semibold">Show the newsletter popup on the site</span>
          <span className="block text-xs text-ink/70">Off by default. When on, visitors see the card after about 20 seconds and can close it.</span>
        </span>
        <input type="checkbox" role="switch" aria-checked={enabled} checked={enabled} onChange={(e) => setEnabled(e.target.checked)} className="h-5 w-9 shrink-0" />
      </label>
      <Field label="Title" hint="4 to 100 characters.">
        <input value={title} maxLength={100} onChange={(e) => setTitle(e.target.value)} className={inputCls} />
      </Field>
      <Field label="Message" hint="10 to 400 characters. Say what people get and that they can leave at any time.">
        <textarea value={message} maxLength={400} rows={3} onChange={(e) => setMessage(e.target.value)} className={inputCls} />
      </Field>
      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" className="btn btn-secondary btn-sm" disabled={busy}>
          Save popup
        </button>
        {msg && (
          <p role="status" className="text-sm font-medium">
            {msg}
          </p>
        )}
      </div>
    </form>
  );
}
