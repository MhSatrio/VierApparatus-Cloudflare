"use client";

import { useState } from "react";
import { MAX_MIN_WORDS } from "@/lib/store/site-settings";
import { apiMessage, useApi } from "./AdminProvider";

/** Owner setting: the minimum word count an article needs before it can be published (0 switches the rule off). */
export function MinWordsForm({ initial }: { initial: number }) {
  const api = useApi();
  const [value, setValue] = useState(String(initial));
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  return (
    <form
      className="space-y-3"
      onSubmit={async (ev) => {
        ev.preventDefault();
        const n = Number(value);
        if (!Number.isInteger(n) || n < 0 || n > MAX_MIN_WORDS) return setMsg(`Enter a whole number from 0 to ${MAX_MIN_WORDS}.`);
        setBusy(true);
        const r = await api.put("/api/admin/settings/min-words", { minWords: n });
        setBusy(false);
        setMsg(r.ok ? (n === 0 ? "Saved. Articles can be published at any length." : `Saved. Articles need at least ${n} words to be published.`) : apiMessage(r));
      }}
    >
      <label className="block text-sm font-medium">
        Minimum words to publish
        <input type="number" min={0} max={MAX_MIN_WORDS} step={1} value={value} onChange={(e) => setValue(e.target.value)} className="field mt-1 w-40" />
      </label>
      <p className="text-sm text-ink/70">
        Counts the article body, the same number the editor shows. Publishing below it is refused, unless you choose “Publish anyway” in the editor, which is recorded in the activity log. Set 0 to switch the rule off.
      </p>
      <button type="submit" className="btn btn-secondary btn-sm" disabled={busy}>
        Save
      </button>
      {msg && (
        <p role="status" className="text-sm font-medium">
          {msg}
        </p>
      )}
    </form>
  );
}
