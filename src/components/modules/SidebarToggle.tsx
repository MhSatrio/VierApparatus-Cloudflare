"use client";

import { useState, type ReactNode } from "react";

/**
 * On a wide screen the contents are always visible beside the page. On a phone or tablet they sit behind one button, so they never
 * push the lesson down. The contents themselves are rendered on the server and passed in, so this adds no weight to the page.
 */
export function SidebarToggle({ label, children }: { label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button type="button" className="btn btn-secondary btn-sm w-full lg:hidden" aria-expanded={open} aria-controls="module-contents" onClick={() => setOpen((o) => !o)}>
        {open ? "Hide" : "Show"} {label}
      </button>
      <div id="module-contents" className={`${open ? "mt-3 block" : "hidden"} lg:block lg:max-h-[calc(100dvh-7rem)] lg:overflow-y-auto lg:pr-2`}>
        {children}
      </div>
    </div>
  );
}
