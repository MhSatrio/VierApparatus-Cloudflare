"use client";

import { useCallback, useRef, useState } from "react";

type Pending = { label: string; value: string; multiline: boolean; resolve: (v: string | null) => void };

/** Accessible replacement for window.prompt (native <dialog>: focus is trapped and Esc cancels). */
export function usePrompt() {
  const ref = useRef<HTMLDialogElement>(null);
  const [pending, setPending] = useState<Pending | null>(null);

  const ask = useCallback(
    (label: string, value = "", multiline = false) =>
      new Promise<string | null>((resolve) => {
        setPending({ label, value, multiline, resolve });
        requestAnimationFrame(() => ref.current?.showModal());
      }),
    [],
  );

  const finish = (v: string | null) => {
    ref.current?.close();
    pending?.resolve(v);
    setPending(null);
  };

  const dialog = (
    <dialog ref={ref} aria-label={pending?.label} onCancel={() => finish(null)} className="m-auto w-[min(34rem,92vw)] rounded-xl border border-ink/20 p-0 shadow-card backdrop:bg-ink/50">
      {pending && (
        <form
          className="space-y-4 p-6"
          onSubmit={(e) => {
            e.preventDefault();
            finish(String(new FormData(e.currentTarget).get("v") ?? ""));
          }}
        >
          <label className="block font-medium">
            {pending.label}
            {pending.multiline ? (
              <textarea name="v" defaultValue={pending.value} rows={4} autoFocus className="field mt-2 font-mono text-sm font-normal" />
            ) : (
              <input name="v" defaultValue={pending.value} autoFocus className="field mt-2 font-normal" />
            )}
          </label>
          <div className="flex justify-end gap-2">
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => finish(null)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm">
              OK
            </button>
          </div>
        </form>
      )}
    </dialog>
  );
  return { ask, dialog };
}
