import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { Pagination, queryHref } from "@/components/Pagination";
import { ARTICLES_PER_PAGE } from "@/lib/site";
import { listPublished } from "@/lib/store/articles";
import { getCategoryBySlug } from "@/lib/store/categories";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ page?: string }> };

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const [{ slug }, { page }] = await Promise.all([params, searchParams]);
  const topic = await getCategoryBySlug(slug);
  if (!topic) return { title: "Topic not found", robots: { index: false } };
  return {
    title: topic.name,
    description: topic.description || `Articles about ${topic.name.toLowerCase()} from VierApparatus.`,
    alternates: { canonical: `/topics/${topic.slug}` },
    robots: page && page !== "1" ? { index: false, follow: true } : undefined,
  };
}

export default async function TopicPage({ params, searchParams }: Props) {
  const [{ slug }, { page }] = await Promise.all([params, searchParams]);
  const topic = await getCategoryBySlug(slug);
  if (!topic) notFound();
  const list = await listPublished({ categorySlug: topic.slug, page: Math.max(1, Number(page) || 1), perPage: ARTICLES_PER_PAGE });
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="container-page">
        <nav aria-label="Breadcrumb" className="text-sm text-ink/70">
          <Link href="/topics" className="hover:text-brand">
            Topics
          </Link>{" "}
          / {topic.name}
        </nav>
        <h1 className="mt-4 text-4xl sm:text-5xl">{topic.name}</h1>
        {topic.description && <p className="mt-4 max-w-2xl text-lg text-ink/85">{topic.description}</p>}
        {list.items.length === 0 ? (
          <p className="mt-10 text-lg text-ink/80">Nothing published on this topic yet.</p>
        ) : (
          <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.items.map((a) => (
              <li key={a.id}>
                <ArticleCard article={a} />
              </li>
            ))}
          </ul>
        )}
        <Pagination page={list.page} pageCount={list.pageCount} hrefFor={queryHref(`/topics/${topic.slug}`, {})} />
      </div>
    </section>
  );
}
