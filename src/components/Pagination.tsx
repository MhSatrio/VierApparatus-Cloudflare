import Link from "next/link";

type Props = {
  page: number;
  pageCount: number;
  /** Builds the URL for a page number. Use path URLs for static, crawlable pages (e.g. /products/category/x/2). */
  hrefFor: (page: number) => string;
  /** Add links to every Nth page (10, 20, 30...) so deep pages stay within a few clicks of page 1. */
  skip?: number;
};

/** Query-string helper for the filtered /products listing. */
export function queryHref(basePath: string, params: Record<string, string>) {
  return (page: number) => {
    const sp = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) if (v) sp.set(k, v);
    if (page > 1) sp.set("page", String(page));
    const s = sp.toString();
    return s ? `${basePath}?${s}` : basePath;
  };
}

export function Pagination({ page, pageCount, hrefFor, skip = 10 }: Props) {
  if (pageCount <= 1) return null;
  const wanted = new Set<number>([1, pageCount, page - 2, page - 1, page, page + 1, page + 2]);
  if (skip > 1) for (let p = skip; p < pageCount; p += skip) wanted.add(p);
  const list = [...wanted].filter((p) => p >= 1 && p <= pageCount).sort((a, b) => a - b);
  const cls = "inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border px-3 font-medium";
  return (
    <nav aria-label="Pagination" className="mt-10">
      <ul className="flex flex-wrap items-center justify-center gap-2">
        {page > 1 && (
          <li>
            <Link rel="prev" href={hrefFor(page - 1)} className={`${cls} border-ink/20 hover:border-brand`}>
              Previous
            </Link>
          </li>
        )}
        {list.map((p, i) => (
          <li key={p} className="flex items-center gap-2">
            {i > 0 && p - list[i - 1] > 1 && <span aria-hidden="true">…</span>}
            <Link
              href={hrefFor(p)}
              aria-current={p === page ? "page" : undefined}
              aria-label={`Page ${p}`}
              className={`${cls} ${p === page ? "border-brand bg-brand text-white" : "border-ink/20 hover:border-brand"}`}
            >
              {p}
            </Link>
          </li>
        ))}
        {page < pageCount && (
          <li>
            <Link rel="next" href={hrefFor(page + 1)} className={`${cls} border-ink/20 hover:border-brand`}>
              Next
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
