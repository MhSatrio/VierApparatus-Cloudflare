import type { ReactNode } from "react";

/**
 * The advertising column beside an article (desktop). It renders only when it has something to show: the caller passes nothing
 * when there is no advertisement, so no empty box is ever drawn. Advertisements are labelled, never styled as article text.
 */
export function AdColumn({ children }: { children: ReactNode }) {
  return <aside aria-label="Advertisements">{children}</aside>;
}

/** A sponsor, clearly labelled "Sponsored", square, linking to the sponsor's address with UTM tags already added. */
export function SponsorBox({ href, imageUrl, name }: { href: string; imageUrl: string; name: string }) {
  return (
    <section aria-label="Sponsor" className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-ink/60">Sponsored</p>
      <a href={href} target="_blank" rel="sponsored noopener noreferrer" className="block overflow-hidden rounded-[10px] border border-ink/10 bg-white shadow-card hover:border-brand/60">
        {/* A fixed square frame: the image fills it, so the box never changes shape or pushes the article around. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageUrl} alt={`Sponsor: ${name}`} width={300} height={300} loading="lazy" decoding="async" className="aspect-square h-auto w-full object-cover" />
      </a>
    </section>
  );
}

/**
 * Preview only (owner's layout preview): where an advertisement can sit and its preferred size. The real unit is responsive
 * and fills the column width; the minimum height only keeps the preview readable. Never used on public pages.
 */
export function AdSizePreview({ label, size, minHeight }: { label: string; size: string; minHeight: string }) {
  return (
    <section aria-label={`${label} preview`} className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-ink/60">Advertisement</p>
      <div className="flex w-full items-center justify-center rounded-[10px] border-2 border-dashed border-brand/40 bg-sky/30 p-4 text-center text-sm text-ink/70" style={{ minHeight }}>
        <span>
          <strong className="block text-ink">{label}</strong>
          Responsive: fills the column. Preferred {size} when the space allows.
        </span>
      </div>
    </section>
  );
}
