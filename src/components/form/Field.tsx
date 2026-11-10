import type { ReactNode } from "react";

/** Labelled form field with an inline, screen-reader-linked error message. */
export function Field({ id, label, error, hint, required, children }: { id: string; label: string; error?: string; hint?: string; required?: boolean; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-medium">
        {label}
        {required && <span aria-hidden="true"> *</span>}
        {!required && <span className="font-normal text-ink/60"> (optional)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1 text-sm text-ink/70">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-sm font-medium text-ink">
          {error}
        </p>
      )}
    </div>
  );
}

export const describedBy = (id: string, error?: string, hint?: string) => (error ? `${id}-error` : hint ? `${id}-hint` : undefined);
