import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleView } from "@/components/ArticleView";
import { requirePage } from "@/lib/auth/guard";
import { canViewArticle } from "@/lib/article-access";
import { renderDoc } from "@/lib/content/render";
import { getArticleById, publishProblems } from "@/lib/store/articles";

/** Renders the saved article with the exact component and renderer the public page uses. */
export default async function PreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { user } = await requirePage({ action: "articles.write" });
  const a = await getArticleById((await params).id);
  if (!a || !canViewArticle(user, a)) notFound();
  const r = renderDoc(a.doc);
  const problems = publishProblems(a);
  return (
    <>
      <div className="-mx-4 -mt-6 mb-0 flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 bg-ink px-4 py-3 text-white sm:-mx-8 sm:-mt-8 sm:px-8">
        <p className="text-sm">
          <strong>Preview</strong> · {a.status === "published" ? "this article is live" : `${a.status}, not visible to the public`}
          {problems.length > 0 && a.status !== "published" && <span className="ml-2 text-sky">Not ready to publish: {problems.join(" ")}</span>}
        </p>
        <Link href={`/admin/articles/${a.id}`} className="btn btn-secondary btn-sm">
          Back to editor
        </Link>
      </div>
      <div className="-mx-4 sm:-mx-8">
        <ArticleView
          preview
          a={{
            title: a.title,
            excerpt: a.excerpt,
            html: r.html,
            hasMath: r.hasMath,
            headings: r.headings,
            authorName: a.authorName,
            categoryName: a.categoryName,
            categorySlug: a.categorySlug,
            publishedAt: a.publishedAt,
            updatedAt: a.updatedAt,
            readingMinutes: a.readingMinutes,
            coverUrl: a.coverUrl,
            coverAlt: a.coverAlt,
            coverCredit: a.coverCredit,
            tags: a.tags,
            contributed: a.source === "submission",
          }}
        />
      </div>
    </>
  );
}
