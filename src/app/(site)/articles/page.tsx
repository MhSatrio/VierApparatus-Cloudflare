import Link from "next/link";
import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { Pagination, queryHref } from "@/components/Pagination";
import { ARTICLES_PER_PAGE } from "@/lib/site";
import { listPublished } from "@/lib/store/articles";
import { listCategories } from "@/lib/store/categories";

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ q?: string; page?: string }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q, page } = await searchParams;
  return {
    title: "Articles",
    description: "Evidence-based articles on biotechnology, microbiology, research methods and science in society, from VierApparatus.",
    alternates: { canonical: "/articles" },
    // Search results and deep pages are for readers, not for the index.
    robots: q || (page && page !== "1") ? { index: false, follow: true } : undefined,
  };
}

export default async function ArticlesPage({ searchParams }: Props) {
  const { q, page } = await searchParams;
  const query = typeof q === "string" ? q.trim().slice(0, 80) : "";
  const [list, topics] = await Promise.all([
    listPublished({ q: query || undefined, page: Math.max(1, Number(page) || 1), perPage: ARTICLES_PER_PAGE }),
    listCategories({ onlyWithArticles: true }),
  ]);

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="container-page">
        <p className="eyebrow">Articles</p>
        <h1 className="mt-3 text-4xl sm:text-5xl">Articles</h1>
        <p className="mt-4 max-w-2xl text-lg text-ink/85">Clear writing on how science works and what it has found, with the evidence shown.</p>

        <form role="search" action="/articles" method="get" className="mt-8 flex max-w-xl gap-2">
          <label htmlFor="q" className="sr-only">
            Search articles
          </label>
          <input id="q" name="q" type="search" defaultValue={query} maxLength={80} placeholder="Search articles" className="field" />
          <button type="submit" className="btn btn-primary btn-sm">
            Search
          </button>
        </form>

        {topics.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Topics">
            {topics.map((t) => (
              <li key={t.id}>
                <Link href={`/topics/${t.slug}`} className="inline-flex min-h-10 items-center rounded-full border border-ink/20 px-4 text-sm hover:border-brand hover:text-brand">
                  {t.name}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {query && (
          <p className="mt-8 text-ink/80" role="status">
            {list.total === 0 ? "No articles match" : `${list.total} article${list.total === 1 ? "" : "s"} for`} &ldquo;{query}&rdquo;.{" "}
            <Link href="/articles" className="text-brand underline underline-offset-4">
              Clear search
            </Link>
          </p>
        )}

        {list.items.length === 0 ? (
          <p className="mt-10 text-lg text-ink/80">{query ? "Try a different word." : "No articles have been published yet."}</p>
        ) : (
          <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.items.map((a) => (
              <li key={a.id}>
                <ArticleCard article={a} />
              </li>
            ))}
          </ul>
        )}
        <Pagination page={list.page} pageCount={list.pageCount} hrefFor={queryHref("/articles", { q: query })} />
      </div>
    </section>
  );
}
