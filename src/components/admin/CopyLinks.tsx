"use client";

import { useState } from "react";

export function CopyLinks({ links }: { links: string[] }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const text = links.join("\n");
  return (
    <div className="mt-3 space-y-2">
      <textarea readOnly value={text} rows={Math.min(10, links.length + 1)} aria-label="Article links" onFocus={(e) => e.currentTarget.select()} className="field font-mono text-sm" />
      <button
        type="button"
        className="btn btn-secondary btn-sm"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(text);
            setState("copied");
          } catch {
            setState("failed");
          }
        }}
      >
        Copy all links
      </button>
      <span role="status" className="ml-3 text-sm">
        {state === "copied" ? "Copied." : state === "failed" ? "Copy failed. Select the text and copy it manually." : ""}
      </span>
    </div>
  );
}
