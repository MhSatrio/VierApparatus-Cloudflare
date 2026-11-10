"use client";

import { useEffect, useState } from "react";

type Heading = { id: string; text: string; level: 2 | 3 | 4 };

/**
 * "On this page", the column beside a lesson: its sections. The section that is on screen is highlighted as you scroll, and
 * clicking one scrolls to it. (Small screens use SectionNavMobile, below, instead of a column on the side.)
 */
export function SectionNav({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string>(headings[0]?.id ?? "");

  useEffect(() => {
    const els = headings.map((h) => document.getElementById(h.id)).filter((e): e is HTMLElement => !!e);
    if (!els.length || typeof IntersectionObserver === "undefined") return;
    // A heading counts as "current" once it passes the top part of the screen and stays current until the next one does.
    const seen = new Map<string, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) seen.set(e.target.id, e.isIntersecting);
        const firstVisible = els.find((el) => seen.get(el.id));
        if (firstVisible) setActive(firstVisible.id);
        else {
          // nothing in the band: the current section is the last heading above the band
          const above = els.filter((el) => el.getBoundingClientRect().top < 140);
          if (above.length) setActive(above[above.length - 1].id);
        }
      },
      { rootMargin: "-110px 0px -65% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;
  return (
    <nav aria-label="On this page" className="hidden xl:sticky xl:top-24 xl:block xl:max-h-[calc(100dvh-7rem)] xl:self-start xl:overflow-y-auto">
      <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-ink/55">On this page</p>
      <ol className="space-y-1">
        {headings.map((h) => (
          <li key={h.id} className={h.level > 2 ? "ml-3" : ""}>
            <a href={`#${h.id}`} aria-current={active === h.id ? "true" : undefined} className={`block rounded-md border-l-2 px-3 py-1 text-sm leading-snug hover:text-brand ${active === h.id ? "border-brand bg-sky/50 font-semibold text-ink" : "border-transparent text-ink/75"}`}>
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** The same list for small screens: a collapsible block at the top of the lesson. */
export function SectionNavMobile({ headings }: { headings: Heading[] }) {
  if (headings.length === 0) return null;
  return (
    <details className="mb-6 rounded-lg border border-ink/10 bg-sky/30 px-4 py-3 xl:hidden">
      <summary className="cursor-pointer font-semibold">On this page</summary>
      <ol className="mt-3 space-y-1">
        {headings.map((h) => (
          <li key={h.id} className={h.level > 2 ? "ml-3" : ""}>
            <a href={`#${h.id}`} className="block rounded-md px-2 py-1 text-sm text-brand underline underline-offset-4">
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </details>
  );
}
