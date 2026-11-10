import Link from "next/link";
import { SafeImage } from "@/components/SafeImage";
import { productHref, REVIEW_STATUS_SHORT, type ProductListItem } from "@/lib/products/shared";
import type { RatingSummary } from "@/lib/store/product-comments";

const REVIEW_STYLE = { listed: "bg-ink/10 text-ink", in_review: "bg-sky text-ink", reviewed: "bg-brand text-white" } as const;

export function Stars({ value }: { value: number }) {
  const full = Math.round(value);
  return (
    <span aria-hidden="true" className="tracking-tight text-brand">
      {"★".repeat(full)}
      <span className="text-ink/25">{"★".repeat(5 - full)}</span>
    </span>
  );
}

/**
 * One product in the listing. It reads as an entry in a review index, not a shop window: what the product is, who makes it, the first
 * of its manufacturer-stated specifications, how far our review has gone, and the readers' score only when there are enough ratings.
 */
export function ProductCard({ product: p, rating, priority = false }: { product: ProductListItem; rating?: RatingSummary | null; priority?: boolean }) {
  const href = productHref(p.slug);
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-ink/10 bg-white shadow-card transition-colors hover:border-brand/50">
      <Link href={href} tabIndex={-1} aria-hidden="true" className="relative block aspect-[4/3] bg-sky/30">
        <SafeImage src={p.thumbUrl || p.imageUrl || null} alt="" sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 90vw" priority={priority} />
      </Link>
      <div className="flex flex-1 flex-col gap-3 border-t border-ink/10 p-5">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
          <span className="font-semibold text-brand">{p.category}</span>
          <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${REVIEW_STYLE[p.reviewStatus]}`}>{REVIEW_STATUS_SHORT[p.reviewStatus]}</span>
        </p>
        <h3 className="text-xl leading-snug">
          <Link href={href} className="hover:text-brand">
            {p.name}
          </Link>
        </h3>
        <p className="text-sm text-ink/75">
          {p.manufacturer}
          {p.modelNumber && <> · Model {p.modelNumber}</>}
        </p>
        {p.shortDescription && <p className="line-clamp-3 text-[0.95rem]">{p.shortDescription}</p>}
        {p.keySpecs.length > 0 && (
          <dl className="space-y-0.5 text-sm">
            {p.keySpecs.map((s) => (
              <div key={s.label} className="flex gap-2">
                <dt className="shrink-0 font-semibold">{s.label}:</dt>
                <dd className="min-w-0 truncate" title={s.value}>
                  {s.value}
                </dd>
              </div>
            ))}
            <p className="text-xs text-ink/60">Manufacturer-stated</p>
          </dl>
        )}
        {p.applications.length > 0 && (
          <p className="text-sm">
            <span className="font-semibold">Applications: </span>
            {p.applications.join(", ")}
          </p>
        )}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-2">
          <Link href={href} className="font-semibold text-brand underline underline-offset-4">
            Read the entry<span className="sr-only">: {p.name}</span>
          </Link>
          {rating && rating.average !== null ? (
            <span className="text-sm" title={`${rating.ratedCount} reader ratings`}>
              <Stars value={rating.average} /> <span className="font-semibold">{rating.average.toFixed(1)}</span> <span className="text-ink/65">({rating.ratedCount})</span>
              <span className="sr-only"> out of 5, from {rating.ratedCount} reader ratings</span>
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
