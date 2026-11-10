"use client";

import { useState } from "react";

/** A monospace value with a copy button. Falls back to asking the person to copy by hand when the clipboard is blocked. */
export function CopyText({ value, label = "Copy", showValue = true }: { value: string; label?: string; showValue?: boolean }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      {showValue && <code className="break-all rounded bg-sky/50 px-1.5 py-0.5 font-mono text-xs">{value}</code>}
      <button
        type="button"
        aria-label={`${label} ${value}`}
        className="inline-flex min-h-7 items-center rounded-md border border-ink/25 px-2 text-xs font-semibold hover:border-brand hover:text-brand"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(value);
            setState("copied");
          } catch {
            setState("failed");
          }
          setTimeout(() => setState("idle"), 2000);
        }}
      >
        {state === "copied" ? "Copied" : state === "failed" ? "Copy failed" : label}
      </button>
      <span role="status" className="sr-only">
        {state === "failed" ? "Select the ID and copy it manually." : ""}
      </span>
    </span>
  );
}
