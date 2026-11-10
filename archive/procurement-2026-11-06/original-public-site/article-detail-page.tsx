import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArticleCard, formatDate } from "@/components/ArticleCard";
import { InquiryCta } from "@/components/InquiryCta";
import { JsonLd } from "@/components/JsonLd";
import { ProductCard } from "@/components/ProductCard";
import { SafeImage } from "@/components/SafeImage";
import { categorySlug, getArticle, getArticles, getRelatedArticles } from "@/lib/articles";
import { getProductBySlug } from "@/lib/products";
import { fitDescription, fitTitle } from "@/lib/seo";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return { title: "Article not found", robots: { index: false } };

  // Title <= 60 and description 120-155 characters (lib/seo.ts), whatever length the front matter has.
  const seoTitle = fitTitle(a.seoTitle);
  const seoDescription = fitDescription(a.seoDescription, ["Read more laboratory insights from VierApparatus.", "Practical guidance for laboratory buyers."]);

  return {
    title: { absolute: seoTitle },
    description: seoDescription,
    alternates: { canonical: `/articles/${a.slug}` },
    robots: a.status === "draft" ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "article",
      title: seoTitle,
      description: seoDescription,
      url: `/articles/${a.slug}`,
      publishedTime: a.date,
      modifiedTime: a.updated ?? a.date,
      authors: [a.author],
      tags: a.tags,
      images: a.coverImage ? [{ url: a.coverImage, alt: a.coverImageAlt }] : undefined,
    },
    twitter: { card: "summary_large_image", title: seoTitle, description: seoDescription },
  };
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  const related = getRelatedArticles(a);
  const product = a.productSlug ? getProductBySlug(a.productSlug) : undefined;
  const absolute = (u: string) => (u.startsWith("http") ? u : `${site.url}${u}`);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.title,
          description: fitDescription(a.seoDescription, ["Read more laboratory insights from VierApparatus."]),
          datePublished: a.date,
          dateModified: a.updated ?? a.date,
          author: { "@type": "Organization", name: a.author },
          publisher: { "@type": "Organization", name: site.name, url: site.url },
          mainEntityOfPage: `${site.url}/articles/${a.slug}`,
          ...(a.coverImage ? { image: absolute(a.coverImage) } : {}),
          keywords: a.tags.join(", "),
        }}
      />
      <article className="bg-white py-12 sm:py-16">
        <div className="container-page">
          <header className="max-w-3xl">
            <nav aria-label="Breadcrumb" className="text-sm text-ink/70">
              <Link href="/articles" className="hover:text-brand">
                Articles
              </Link>{" "}
              /{" "}
              <Link href={`/articles/category/${categorySlug(a.category)}`} className="hover:text-brand">
                {a.category}
              </Link>
            </nav>
            <h1 className="mt-4 text-3xl sm:text-5xl">{a.title}</h1>
            <p className="mt-5 text-xl text-ink/85">{a.excerpt}</p>
            <p className="mt-5 text-sm text-ink/70">
              By {a.author} · <time dateTime={a.date}>{formatDate(a.date)}</time> · {a.readingMinutes} min read
              {a.status === "draft" && " · DRAFT (not published)"}
            </p>
          </header>

          {a.coverImage && (
            <div className="mt-8 max-w-3xl">
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-ink/10 bg-sky/40">
                <SafeImage src={a.coverImage} alt={a.coverImageAlt} sizes="(min-width:1024px) 768px, 95vw" priority className="p-6" />
              </div>
              {a.coverImageSource && (
                <p className="mt-2 text-xs sm:text-sm text-ink/70">
                  Source: {a.coverImageSource}
                  {a.coverImageSourceUrl && (
                    <>
                      {" · DOI: "}
                      <a
                        href={a.coverImageSourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-brand transition-colors"
                      >
                        {a.coverImageSourceUrl.replace(/^https?:\/\/(?:www\.)?doi\.org\//, "")}
                      </a>
                    </>
                  )}
                </p>
              )}
            </div>
          )}

          <div className="prose-article mt-10">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{a.body}</ReactMarkdown>
          </div>

          {a.tags.length > 0 && (
            <ul className="mt-10 flex max-w-3xl flex-wrap gap-2" aria-label="Tags">
              {a.tags.map((t) => (
                <li key={t} className="rounded-full bg-sky px-3 py-1 text-sm">
                  {t}
                </li>
              ))}
            </ul>
          )}

          {product && (
            <div className="mt-12 max-w-sm">
              <h2 className="mb-4 text-xl">Related product</h2>
              <ProductCard product={{ ...product, search: "" }} />
            </div>
          )}
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="bg-white pb-16">
          <div className="container-page">
            <h2 id="related-title" className="text-2xl sm:text-3xl">
              Related articles
            </h2>
            <ul className="mt-6 grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <ArticleCard article={r} />
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
