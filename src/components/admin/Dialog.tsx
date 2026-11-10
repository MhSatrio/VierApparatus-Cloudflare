"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * A modal built on the native <dialog>: focus is trapped and returned by the browser, Escape closes it, and the page behind
 * is inert. `open` is controlled by the parent.
 */
export function Dialog({ open, onClose, title, children, wide = false }: { open: boolean; onClose: () => void; title: string; children: ReactNode; wide?: boolean }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  return (
    <dialog
      ref={ref}
      aria-label={title}
      onClose={onClose}
      onCancel={onClose}
      className="m-auto max-h-[92vh] overflow-y-auto rounded-xl border border-ink/20 p-0 shadow-card backdrop:bg-ink/50"
      style={{ width: `min(${wide ? "44rem" : "32rem"}, 94vw)` }}
    >
      {open && (
        <div className="space-y-4 p-6">
          <h2 className="text-xl">{title}</h2>
          {children}
        </div>
      )}
    </dialog>
  );
}

export const inputCls = "field mt-1";
export function Field({ label, hint, children, error }: { label: string; hint?: string; children: ReactNode; error?: string }) {
  return (
    <label className="block text-sm font-medium">
      {label}
      {children}
      {hint && <span className="mt-1 block text-xs font-normal text-ink/60">{hint}</span>}
      {error && (
        <span role="alert" className="mt-1 block text-sm font-semibold">
          {error}
        </span>
      )}
    </label>
  );
}
