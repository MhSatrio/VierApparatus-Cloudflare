"use client";

import { useState } from "react";
import { apiMessage, useApi } from "../AdminProvider";
import { Dialog, Field, inputCls } from "../Dialog";

/** One reference after a check, as the server records it. */
export type RefItem = {
  index: number;
  text: string;
  status: "pass" | "fail";
  reason: string;
  doi: string;
  matched: { doi: string; title: string; year: number | null; firstAuthor: string; container: string } | null;
};

/** The last recorded check, and whether it still applies to the reference list the editor holds. */
export type RefcheckView = { status: "not_checked" | "pass" | "fail"; current: boolean; checkedAt: string | null; items: RefItem[] };

type Ref = { text: string; doi: string };
type CheckResponse = { status: "pass" | "fail"; passed: boolean; items: RefItem[]; refs: Ref[]; checkedAt: string };

/**
 * The reference check, for an article or a module. The editor pastes the APA list; the server looks each reference up in Crossref
 * and records the result. Every reference must be green before the item can be published.
 */
export function RefCheckPanel({
  entity,
  id,
  value,
  initialText,
  onChange,
  disabled = false,
}: {
  entity: "article" | "module";
  id: string | null;
  value: RefcheckView;
  /** The list as currently saved, offered in the paste box. */
  initialText: string;
  /** Called with the recorded result. `refs` is the list the server stored, when a check ran. */
  onChange: (next: RefcheckView, refs?: Ref[]) => void;
  disabled?: boolean;
}) {
  const api = useApi();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(initialText);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const tone =
    value.status === "not_checked" ? "bg-ink/10 text-ink" : !value.current ? "bg-amber-300 text-ink" : value.status === "pass" ? "bg-green-700 text-white" : "bg-red-700 text-white";
  const label = value.status === "not_checked" ? "References not checked" : !value.current ? "References changed: check again" : value.status === "pass" ? "References: pass" : "References: fail";
  const passCount = value.items.filter((i) => i.status === "pass").length;
  const allPass = value.current && value.status === "pass" && value.items.length > 0 && passCount === value.items.length;

  function openDialog() {
    if (!text.trim()) setText(initialText);
    setError("");
    setOpen(true);
  }

  async function run() {
    if (!id || !text.trim()) return;
    setBusy(true);
    setError("");
    const r = await api.post<CheckResponse>("/api/admin/refcheck", { entity, id, text });
    setBusy(false);
    if (!r.ok) {
      setError(apiMessage(r, "The check could not run. Try again."));
      return;
    }
    onChange({ status: r.data.passed ? "pass" : "fail", current: true, checkedAt: r.data.checkedAt, items: r.data.items }, r.data.refs);
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${tone}`}>{label}</span>
        <button type="button" className="btn btn-secondary btn-sm" onClick={openDialog} disabled={disabled || !id}>
          Check references
        </button>
        {!id && <span className="text-xs text-ink/60">Save first, then check the references.</span>}
      </div>

      <Dialog open={open} onClose={() => setOpen(false)} title="Reference check" wide>
        <p className="text-sm text-ink/70">
          Paste the whole list in APA 7th edition. Every reference is looked up in Crossref (free). A reference that does not match a real record is shown in red: correct it, paste the list again, and check again until every reference is green.
        </p>
        <Field label="References" hint="One reference per paragraph (a blank line between them), or one per line.">
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={8} disabled={disabled || busy} className={inputCls} />
        </Field>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <button type="button" className="btn btn-primary btn-sm" onClick={() => void run()} disabled={busy || disabled || !text.trim()}>
            {busy ? "Checking with Crossref…" : value.status === "not_checked" ? "Check references" : "Check again"}
          </button>
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => setOpen(false)}>
            Close
          </button>
        </div>
        {error && (
          <p role="alert" className="text-sm font-semibold text-red-700">
            {error}
          </p>
        )}

        {value.items.length > 0 && (
          <div className="space-y-3">
            {!value.current && <p className="rounded-lg bg-amber-100 p-2 text-sm font-medium">The reference list has changed since this check. Check again before publishing.</p>}
            <p className="text-sm font-semibold">
              {passCount} of {value.items.length} references pass.
            </p>
            {allPass && <p className="rounded-lg bg-green-700 p-2 text-sm font-semibold text-white">All references pass. This list can be published.</p>}
            <ol className="max-h-[50vh] space-y-2 overflow-y-auto">
              {value.items.map((i) => {
                const ok = i.status === "pass";
                return (
                  <li key={i.index} className={`rounded-lg border-l-4 p-3 text-sm ${ok ? "border-green-700 bg-green-50 text-green-900" : "border-red-700 bg-red-50 text-red-900"}`}>
                    <p className="font-semibold">
                      {ok ? "Pass" : "Fail"} · Reference {i.index + 1}
                    </p>
                    <p className="mt-1 break-words">{i.text}</p>
                    <p className="mt-1">{i.reason}</p>
                    {i.matched && (
                      <p className="mt-1 break-words text-xs">
                        Crossref: {i.matched.title}
                        {i.matched.year ? ` (${i.matched.year})` : ""}
                        {i.matched.doi ? ` · doi:${i.matched.doi}` : ""}
                      </p>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        )}
      </Dialog>
    </>
  );
}
