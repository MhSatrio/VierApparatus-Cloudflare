import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { InquiryCta } from "@/components/InquiryCta";
import { categorySlug, getArticleCategories, getArticles } from "@/lib/articles";
import { fitDescription } from "@/lib/seo";

type Params = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return getArticleCategories().map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category } = await params;
  const c = getArticleCategories().find((x) => x.slug === category);
  if (!c) return { title: "Category not found", robots: { index: false } };
  return {
    title: `${c.name} Articles`,
    description: fitDescription(`VierApparatus articles on ${c.name.toLowerCase()}: practical guidance for laboratory buyers and researchers.`, ["Read more laboratory insights from VierApparatus."]),
    alternates: { canonical: `/articles/category/${c.slug}` },
  };
}

export default async function CategoryPage({ params }: Params) {
  const { category } = await params;
  const categories = getArticleCategories();
  const current = categories.find((c) => c.slug === category);
  if (!current) notFound();
  const articles = getArticles().filter((a) => categorySlug(a.category) === category);
  return (
    <>
      <section className="bg-sky/50 py-12 sm:py-16">
        <div className="container-page">
          <p className="eyebrow">Articles</p>
          <h1 className="mt-3 text-4xl sm:text-5xl">{current.name}</h1>
        </div>
      </section>
      <section className="bg-white py-10 sm:py-14">
        <div className="container-page">
          <nav aria-label="Article categories" className="mb-8 flex flex-wrap gap-2">
            <Link href="/articles" className="btn btn-secondary btn-sm">
              All
            </Link>
            {categories.map((c) => (
              <Link key={c.slug} href={`/articles/category/${c.slug}`} aria-current={c.slug === category ? "page" : undefined} className={`btn btn-sm ${c.slug === category ? "btn-primary" : "btn-secondary"}`}>
                {c.name}
              </Link>
            ))}
          </nav>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <li key={a.slug}>
                <ArticleCard article={a} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <InquiryCta />
    </>
  );
}
