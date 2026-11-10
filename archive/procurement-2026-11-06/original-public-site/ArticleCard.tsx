import Link from "next/link";
import { SafeImage } from "./SafeImage";
import type { Article } from "@/lib/articles";

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-ink/10 bg-white shadow-card transition-colors hover:border-brand/50">
      <Link href={`/articles/${article.slug}`} tabIndex={-1} aria-hidden="true" className="relative block aspect-[16/9] bg-sky/40">
        <SafeImage src={article.coverImage} alt="" sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw" fit="contain" className="p-4" />
      </Link>
      <div className="flex flex-1 flex-col gap-3 border-t border-ink/10 p-5">
        <p className="text-sm text-ink/70">
          <span className="font-semibold text-brand">{article.category}</span> · {formatDate(article.date)}
        </p>
        <h3 className="text-xl leading-snug">
          <Link href={`/articles/${article.slug}`} className="hover:text-brand">
            {article.title}
          </Link>
        </h3>
        <p className="line-clamp-3 text-[0.95rem]">{article.excerpt}</p>
        <Link href={`/articles/${article.slug}`} className="mt-auto pt-2 font-semibold text-brand underline underline-offset-4">
          Read article<span className="sr-only">: {article.title}</span>
        </Link>
      </div>
    </article>
  );
}
