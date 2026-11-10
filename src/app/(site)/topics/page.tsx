import Link from "next/link";
import type { Metadata } from "next";
import { listCategories } from "@/lib/store/categories";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Topics",
  description: "Browse VierApparatus articles by subject: biotechnology, molecular biology, microbiology, biochemistry, research methods and more.",
  alternates: { canonical: "/topics" },
};

export default async function TopicsPage() {
  const topics = await listCategories();
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="container-page">
        <p className="eyebrow">Topics</p>
        <h1 className="mt-3 text-4xl sm:text-5xl">Browse by topic</h1>
        <p className="mt-4 max-w-2xl text-lg text-ink/85">Pick a subject to see everything we have published on it.</p>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((t) => (
            <li key={t.id}>
              <Link href={`/topics/${t.slug}`} className="block h-full rounded-xl border border-ink/10 bg-white p-6 shadow-card transition-colors hover:border-brand/50">
                <h2 className="text-xl">{t.name}</h2>
                {t.description && <p className="mt-2 text-[0.95rem] text-ink/80">{t.description}</p>}
                <p className="mt-4 text-sm font-semibold text-brand">{t.articleCount === 0 ? "No articles yet" : `${t.articleCount} article${t.articleCount === 1 ? "" : "s"}`}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
