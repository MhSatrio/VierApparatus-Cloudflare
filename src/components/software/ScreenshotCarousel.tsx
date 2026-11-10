"use client";

import { useRef, useState } from "react";

export type Shot = { src: string; alt: string; caption: string };

/**
 * A horizontal, scroll-snapping strip of screenshots with Previous / Next buttons. Each picture opens full size in a native
 * dialog (Escape or the button closes it). No library: the browser does the scrolling and snapping.
 */
export function ScreenshotCarousel({ shots, label }: { shots: Shot[]; label: string }) {
  const track = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  const show = (i: number) => {
    setOpen(i);
    dialog.current?.showModal();
  };

  const current = open === null ? null : shots[open];

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-sm text-ink/70">Screenshots. Use the arrows or scroll sideways; click a picture to see it full size.</p>
        <div className="flex gap-2">
          <button type="button" onClick={() => step(-1)} aria-label="Previous screenshot" className="btn btn-secondary btn-sm">
            ←
          </button>
          <button type="button" onClick={() => step(1)} aria-label="Next screenshot" className="btn btn-secondary btn-sm">
            →
          </button>
        </div>
      </div>
      <ul
        ref={track}
        aria-label={label}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 [scrollbar-width:thin]"
      >
        {shots.map((s, i) => (
          <li key={s.src} className="w-[85%] shrink-0 snap-start sm:w-[70%] lg:w-[60%]">
            <figure className="m-0">
              <button
                type="button"
                onClick={() => show(i)}
                className="block w-full overflow-hidden rounded-xl border border-ink/10 bg-white shadow-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
                aria-label={`Enlarge: ${s.caption}`}
              >
                {/* Plain img: the pictures are fixed-size WebP files in /public, so no image optimiser is needed. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.src} alt={s.alt} width={1440} height={1000} loading="lazy" decoding="async" className="aspect-[1440/1000] h-auto w-full object-cover" />
              </button>
              <figcaption className="mt-2 text-sm text-ink/70">
                {i + 1} of {shots.length}. {s.caption}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-label={current ? current.caption : "Screenshot"}
        onClose={() => setOpen(null)}
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current?.close(); // a click on the dark backdrop closes it
        }}
        className="m-auto max-h-[94vh] w-[min(96vw,1200px)] rounded-xl border border-ink/20 bg-white p-0 shadow-card backdrop:bg-ink/70"
      >
        {current && (
          <div className="p-3 sm:p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={current.src} alt={current.alt} className="h-auto max-h-[78vh] w-full object-contain" />
            <div className="mt-3 flex items-center justify-between gap-3">
              <p className="text-sm text-ink/80">{current.caption}</p>
              <div className="flex gap-2">
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setOpen((i) => (i === null ? 0 : (i - 1 + shots.length) % shots.length))}>
                  Previous
                </button>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setOpen((i) => (i === null ? 0 : (i + 1) % shots.length))}>
                  Next
                </button>
                <button type="button" className="btn btn-primary btn-sm" onClick={() => dialog.current?.close()}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
