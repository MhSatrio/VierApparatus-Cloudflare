"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navLinks } from "@/lib/site";

export function MobileNav() {
  // The menu is "open" only for the page it was opened on, so navigating closes it without an effect.
  const pathname = usePathname();
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenAt(null);
        btn.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={btn}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpenAt(open ? null : pathname)}
        className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-ink/20 text-ink"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>
      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="absolute inset-x-0 top-full border-b border-ink/10 bg-white shadow-card">
          <ul className="container-page flex flex-col py-3">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={pathname === l.href ? "page" : undefined}
                  className="flex min-h-12 items-center border-b border-ink/5 text-lg font-medium aria-[current=page]:text-brand"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="py-4">
              <Link href="/contribute" className="btn btn-secondary w-full">
                Join as contributor
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
