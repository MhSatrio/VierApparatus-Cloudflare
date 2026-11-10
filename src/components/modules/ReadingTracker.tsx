"use client";

import { useEffect, useState } from "react";

const KEY = "vier.modules.read";

function readSet(): Set<string> {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return new Set(Array.isArray(v) ? v.filter((x): x is string => typeof x === "string").slice(0, 2000) : []);
  } catch {
    return new Set();
  }
}

/**
 * Learning progress, kept only in this browser (no account, nothing sent anywhere):
 *  - on every page of a subject, modules the reader has finished get a tick in the contents, and each level shows how many;
 *  - on a module page, a thin bar shows how far down the lesson the reader is, and reaching the end marks the module as read.
 */
export function ReadingTracker({ moduleId }: { moduleId?: string }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const mark = () => {
      const done = readSet();
      document.querySelectorAll<HTMLElement>("[data-module-id]").forEach((el) => {
        if (done.has(el.dataset.moduleId ?? "")) el.dataset.read = "true";
        else delete el.dataset.read;
      });
      document.querySelectorAll<HTMLElement>("[data-level]").forEach((lv) => {
        const total = Number(lv.dataset.total ?? 0);
        const have = lv.querySelectorAll("[data-module-id][data-read='true']").length;
        const out = lv.querySelector<HTMLElement>("[data-level-read]");
        if (out) out.textContent = total > 0 && have > 0 ? ` · ${have} read` : "";
      });
    };
    mark();
    if (!moduleId) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const total = doc.scrollHeight - window.innerHeight;
        const p = total > 0 ? Math.min(100, Math.max(0, (window.scrollY / total) * 100)) : 100;
        setPct(Math.round(p));
        if (p >= 92) {
          const done = readSet();
          if (!done.has(moduleId)) {
            done.add(moduleId);
            try {
              localStorage.setItem(KEY, JSON.stringify([...done]));
            } catch {
              /* storage blocked: progress is simply not remembered */
            }
            mark();
          }
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [moduleId]);

  if (!moduleId) return null;
  return (
    <div role="progressbar" aria-label="Reading progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} className="fixed inset-x-0 top-[4.5rem] z-30 h-1 bg-transparent">
      <div className="h-full bg-brand transition-[width] duration-150" style={{ width: `${pct}%` }} />
    </div>
  );
}
