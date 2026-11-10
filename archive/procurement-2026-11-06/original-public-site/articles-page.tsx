import Link from "next/link";
import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { InquiryCta } from "@/components/InquiryCta";
import { getArticleCategories, getArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Laboratory Procurement Articles & Guides",
  description:
    "Practical articles on laboratory equipment selection, supplier evaluation, procurement, import considerations and some science from VierApparatus.",
  alternates: { canonical: "/articles" },
};

export default function ArticlesPage() {
  const articles = getArticles();
  const categories = getArticleCategories();
  return (
    <>
      <section className="bg-sky/50 py-12 sm:py-16">
        <div className="container-page">
          <p className="eyebrow">Articles</p>
          <h1 className="mt-3 text-4xl sm:text-5xl">Insights for laboratory buyers</h1>
          <p className="mt-4 max-w-2xl text-lg text-ink/85">
            Guides on equipment selection, supplier evaluation, laboratory operations and import considerations.
          </p>
        </div>
      </section>
      <section className="bg-white py-10 sm:py-14">
        <div className="container-page">
          {categories.length > 1 && (
            <nav aria-label="Article categories" className="mb-8 flex flex-wrap gap-2">
              <Link href="/articles" aria-current="page" className="btn btn-primary btn-sm">
                All
              </Link>
              {categories.map((c) => (
                <Link key={c.slug} href={`/articles/category/${c.slug}`} className="btn btn-secondary btn-sm">
                  {c.name}
                </Link>
              ))}
            </nav>
          )}
          {articles.length === 0 ? (
            <p className="rounded-xl bg-sky/40 p-8 text-center">New articles are coming soon.</p>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => (
                <li key={a.slug}>
                  <ArticleCard article={a} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      <InquiryCta />
    </>
  );
}
