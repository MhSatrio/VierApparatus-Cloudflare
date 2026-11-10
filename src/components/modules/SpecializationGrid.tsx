"use client";

import Link from "next/link";
import { useState } from "react";
import { Cover } from "./Cover";

export type SpecCard = { id: string; slug: string; name: string; description: string; coverThumbUrl: string; href: string; art: string; levelCount: number; moduleCount: number; readableCount: number };

/** The specializations of a subject as cards, with a filter box: Biology alone has 35. The cards are real links, so the page works without script too. */
export function SpecializationGrid({ items, subjectName }: { items: SpecCard[]; subjectName: string }) {
  const [q, setQ] = useState("");
  const term = q.trim().toLowerCase();
  const shown = term ? items.filter((i) => `${i.name} ${i.description}`.toLowerCase().includes(term)) : items;
  return (
    <div>
      {items.length > 6 && (
        <label className="mt-5 block max-w-md">
          <span className="sr-only">Filter specializations</span>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Filter ${items.length} specializations…`} className="field" />
        </label>
      )}
      <p className="sr-only" role="status">
        {shown.length} of {items.length} specializations shown
      </p>
      {shown.length === 0 ? (
        <p className="mt-6 rounded-xl border border-dashed border-ink/25 p-6 text-ink/70">No specialization of {subjectName} matches “{q}”.</p>
      ) : (
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {shown.map((i) => (
            <li key={i.id}>
              <Link prefetch={false} href={i.href} className="group flex h-full gap-4 rounded-xl border border-ink/10 bg-white p-5 shadow-card transition-colors hover:border-brand/60">
                <Cover thumb={i.coverThumbUrl} art={i.art} className="h-14 w-14" />
                <span className="min-w-0">
                  <span className="block text-lg font-semibold leading-snug group-hover:text-brand">{i.name}</span>
                  <span className="mt-1 block text-sm text-ink/80">{i.description}</span>
                  <span className="mt-2 block text-xs font-semibold text-ink/65">
                    {i.moduleCount > 0 ? `${i.readableCount} of ${i.moduleCount} modules available` : `${i.levelCount} academic levels · in preparation`}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
