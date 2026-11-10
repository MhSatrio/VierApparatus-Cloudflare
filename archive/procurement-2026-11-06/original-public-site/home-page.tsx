import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { InquiryCta } from "@/components/InquiryCta";
import { ProductCard } from "@/components/ProductCard";
import { ArticleCard } from "@/components/ArticleCard";
import { SafeImage } from "@/components/SafeImage";
import { ServiceGrid } from "@/components/ServiceGrid";
import { reasons, steps } from "@/lib/content";
import { getArticles } from "@/lib/articles";
import { getCategoryInfos, getFeaturedProducts, productCount } from "@/lib/products";

export const metadata: Metadata = {
  title: { absolute: "VierApparatus | Laboratory Equipment Sourcing & Procurement" },
  description:
    "Source laboratory equipment from global suppliers with one procurement partner: specifications, quotations, supplier checks and documentation support.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const featured = getFeaturedProducts(4);
  const hero = featured[0];
  const categories = getCategoryInfos().slice(0, 8);
  const articles = getArticles().slice(0, 3);
  const total = productCount();

  return (
    <>
      <section className="bg-white">
        <div className="container-page grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <p className="eyebrow">Laboratory equipment sourcing &amp; procurement</p>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-[3.5rem]">Laboratory Equipment Sourcing, Without the Complexity.</h1>
            <p className="mt-6 max-w-xl text-lg text-ink/85">
              Source laboratory equipment from global suppliers with one procurement partner. From technical specifications
              and competitive quotations to supplier coordination, quality checks, and import documentation, VierApparatus
              helps simplify your purchasing process.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="btn btn-primary">
                Request a Quotation
              </Link>
              <Link href="/products" className="btn btn-secondary">
                Explore Products
              </Link>
            </div>
            <p className="mt-6 text-sm text-ink/70">Equipment not listed? Send us the specification and we will source it for you.</p>
          </div>
          {hero && (
            <div className="rounded-2xl bg-sky p-5 sm:p-6">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-white">
                <SafeImage src={hero.imageUrl} alt={hero.name} sizes="(min-width:1024px) 40vw, 90vw" priority className="p-6" />
              </div>
              <div className="mt-4 flex items-end justify-between gap-4">
                <div>
                  <p className="eyebrow !text-[0.7rem]">From the catalogue</p>
                  <p className="font-semibold leading-snug">{hero.name}</p>
                </div>
                <p className="shrink-0 text-right text-sm text-ink/80">
                  <span className="block text-2xl font-semibold text-brand">{Math.floor(total / 100) * 100}+</span>
                  catalogue listings
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <section aria-labelledby="services-title" className="bg-white py-16 sm:py-20">
        <div className="container-page">
          <p className="eyebrow">Services</p>
          <h2 id="services-title" className="mt-3 max-w-2xl text-3xl sm:text-4xl">
            One partner for the whole purchasing process.
          </h2>
          <ServiceGrid />
        </div>
      </section>

      <section aria-labelledby="categories-title" className="bg-sky/50 py-16 sm:py-20">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Product categories</p>
              <h2 id="categories-title" className="mt-3 text-3xl sm:text-4xl">
                Browse the catalogue.
              </h2>
            </div>
            <Link href="/products" className="font-semibold text-brand underline underline-offset-4">
              View all products
            </Link>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => (
              <li key={c.name}>
                <Link
                  href={`/products/category/${c.slug}`}
                  className="flex h-full min-h-24 flex-col justify-between rounded-xl border border-ink/10 bg-white p-5 hover:border-brand"
                >
                  <span className="font-semibold leading-snug">{c.name}</span>
                  <span className="mt-3 text-sm text-ink/70">{c.count} listings</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="how-title" className="bg-white py-16 sm:py-20">
        <div className="container-page">
          <p className="eyebrow">How it works</p>
          <h2 id="how-title" className="mt-3 max-w-2xl text-3xl sm:text-4xl">
            A simple, transparent procurement workflow.
          </h2>
          <ol className="mt-10 grid gap-5 md:grid-cols-5">
            {steps.map((s, i) => (
              <li key={s.title} className="rounded-xl border border-ink/10 p-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand font-semibold text-white" aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-base leading-snug">
                  <span className="sr-only">Step {i + 1}: </span>
                  {s.title}
                </h3>
                <p className="mt-2 text-[0.92rem] text-ink/80">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="why-title" className="bg-sky py-16 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Why VierApparatus</p>
            <h2 id="why-title" className="mt-3 text-3xl sm:text-4xl">
              Less procurement workload. More informed decisions.
            </h2>
            <Link href="/about" className="btn btn-primary mt-8">
              About VierApparatus
            </Link>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {reasons.map((r) => (
              <li key={r.title} className="rounded-xl bg-white p-5">
                <Icon name="check" className="text-brand" />
                <h3 className="mt-3 text-lg">{r.title}</h3>
                <p className="mt-1 text-[0.95rem] text-ink/85">{r.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="featured-title" className="bg-white py-16 sm:py-20">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Featured products</p>
              <h2 id="featured-title" className="mt-3 text-3xl sm:text-4xl">
                From the supplier catalogue.
              </h2>
            </div>
            <Link href="/products" className="font-semibold text-brand underline underline-offset-4">
              View all products
            </Link>
          </div>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {articles.length > 0 && (
        <section aria-labelledby="articles-title" className="bg-white pb-16 sm:pb-20">
          <div className="container-page">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Latest articles</p>
                <h2 id="articles-title" className="mt-3 text-3xl sm:text-4xl">
                  Insights for laboratory buyers.
                </h2>
              </div>
              <Link href="/articles" className="font-semibold text-brand underline underline-offset-4">
                All articles
              </Link>
            </div>
            <ul className="mt-8 grid gap-5 md:grid-cols-3">
              {articles.map((a) => (
                <li key={a.slug}>
                  <ArticleCard article={a} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <InquiryCta />
    </>
  );
}
