import type { ReactNode } from "react";
import Link from "next/link";
import { formatDate } from "./ArticleCard";
import { MathEnhancer } from "./MathEnhancer";
import { SafeImage } from "./SafeImage";
import type { Heading } from "@/lib/content/render";

export type ArticleViewData = {
  title: string;
  excerpt: string;
  html: string;
  hasMath: boolean;
  headings: Heading[];
  authorName: string;
  categoryName: string | null;
  categorySlug: string | null;
  publishedAt: string | null;
  updatedAt: string | null;
  readingMinutes: number;
  coverUrl: string | null;
  coverAlt: string;
  coverCredit: string;
  tags: string[];
  contributed?: boolean;
};

/**
 * THE article template. The public page, the admin preview and the editor's live preview all render this component with
 * the output of the same renderer, so an article looks identical however it was created.
 */
export function ArticleView({ a, preview = false, aside }: { a: ArticleViewData; preview?: boolean; aside?: ReactNode }) {
  const toc = a.headings.filter((h) => h.level === 2);
  const date = a.publishedAt;
  const edited = a.updatedAt && date && a.updatedAt.slice(0, 10) > date.slice(0, 10) ? a.updatedAt : null;
  return (
    <article className="bg-white py-12 sm:py-16">
      <div className="container-page">
        <header className="article-column">
          <nav aria-label="Breadcrumb" className="text-sm text-ink/70">
            {preview ? (
              <span>Articles</span>
            ) : (
              <Link href="/articles" className="hover:text-brand">
                Articles
              </Link>
            )}
            {a.categoryName && (
              <>
                {" / "}
                {preview || !a.categorySlug ? (
                  <span>{a.categoryName}</span>
                ) : (
                  <Link href={`/topics/${a.categorySlug}`} className="hover:text-brand">
                    {a.categoryName}
                  </Link>
                )}
              </>
            )}
          </nav>
          <h1 className="mt-4 text-3xl sm:text-5xl">{a.title || "Untitled article"}</h1>
          {a.excerpt && <p className="mt-5 text-xl text-ink/85">{a.excerpt}</p>}
          <p className="mt-5 text-sm text-ink/70">
            {a.contributed ? "Contributed by " : "By "}
            <span className="font-medium text-ink">{a.authorName}</span>
            {date ? (
              <>
                {" · "}
                <time dateTime={date}>{formatDate(date)}</time>
              </>
            ) : (
              preview && " · Not published yet"
            )}
            {edited && (
              <>
                {" · Updated "}
                <time dateTime={edited}>{formatDate(edited)}</time>
              </>
            )}
            {" · "}
            {a.readingMinutes} min read
          </p>
          {a.contributed && <p className="mt-2 text-sm text-ink/70">Edited and published by the VierApparatus editor.</p>}
        </header>

        {a.coverUrl && (
          <figure className="article-column mt-8">
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-ink/10 bg-sky/40">
              <SafeImage src={a.coverUrl} alt={a.coverAlt} sizes="(min-width:1024px) 760px, 95vw" priority fit="cover" />
            </div>
            {a.coverCredit && <figcaption className="mt-2 text-xs text-ink/70 sm:text-sm">{a.coverCredit}</figcaption>}
          </figure>
        )}

        {toc.length >= 3 && (
          <details className="article-column mt-8 rounded-lg border border-ink/10 bg-sky/30 px-4 py-3">
            <summary className="cursor-pointer font-semibold">In this article</summary>
            <ol className="mt-3 list-decimal space-y-1 pl-5">
              {toc.map((h) => (
                <li key={h.id}>
                  <a href={`#${h.id}`} className="text-brand underline underline-offset-4">
                    {h.text}
                  </a>
                </li>
              ))}
            </ol>
          </details>
        )}

        {aside ? (
          <div className="mt-10 lg:grid lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-start lg:gap-10">
            <div className="prose-article min-w-0" dangerouslySetInnerHTML={{ __html: a.html }} />
            <div className="mt-10 lg:sticky lg:top-28 lg:mt-0">{aside}</div>
          </div>
        ) : (
          <div className="prose-article mt-10" dangerouslySetInnerHTML={{ __html: a.html }} />
        )}
        {a.hasMath && <MathEnhancer html={a.html} />}

        {a.tags.length > 0 && (
          <ul className="article-column mt-10 flex flex-wrap gap-2" aria-label="Tags">
            {a.tags.map((t) => (
              <li key={t} className="rounded-full bg-sky px-3 py-1 text-sm">
                {t}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
