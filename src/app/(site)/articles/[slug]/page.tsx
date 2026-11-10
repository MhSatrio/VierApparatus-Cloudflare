import { cache } from "react";
import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { ArticleView } from "@/components/ArticleView";
import { AdColumn, SponsorBox } from "@/components/ads/AdColumn";
import { AdSlot } from "@/components/ads/AdSlot";
import { ADSENSE, adsenseReady } from "@/components/ads/config";
import Script from "next/script";
import { JsonLd } from "@/components/JsonLd";
import Link from "next/link";
import { renderDoc } from "@/lib/content/render";
import { truncate } from "@/lib/content/text";
import { site } from "@/lib/site";
import { getPublishedBySlug, getRelated, resolveRedirect } from "@/lib/store/articles";
import { resolveSponsor } from "@/lib/store/sponsors";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

const load = cache((slug: string) => getPublishedBySlug(slug));

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const a = await load(slug);
  if (!a) return { title: "Article not found", robots: { index: false } };
  const title = truncate(a.seoTitle || a.title, 60);
  const description = truncate(a.seoDescription || a.excerpt, 160);
  const absolute = (u: string) => (u.startsWith("http") ? u : `${site.url}${u}`);
  return {
    title: { absolute: `${title} | VierApparatus` },
    description,
    alternates: { canonical: `/articles/${a.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/articles/${a.slug}`,
      publishedTime: a.publishedAt ?? undefined,
      modifiedTime: a.updatedAt,
      authors: [a.authorName],
      tags: a.tags,
      images: a.coverUrl ? [{ url: absolute(a.coverUrl), alt: a.coverAlt }] : undefined,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const a = await load(slug);
  if (!a) {
    const moved = await resolveRedirect(slug);
    if (moved?.kind === "redirect") permanentRedirect(`/articles/${moved.slug}`);
    notFound();
  }
  const related = await getRelated(a);
  // The side column appears only when there is a sponsor (article-specific first, then the site-wide campaign).
  const sponsor = await resolveSponsor(a.id);
  const rendered = renderDoc(a.doc);
  const absolute = (u: string) => (u.startsWith("http") ? u : `${site.url}${u}`);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.title,
          description: a.seoDescription || a.excerpt,
          datePublished: a.publishedAt,
          dateModified: a.updatedAt,
          author: { "@type": "Person", name: a.authorName },
          publisher: { "@type": "Organization", name: site.name, url: site.url, logo: { "@type": "ImageObject", url: `${site.url}/icon-512.png` } },
          mainEntityOfPage: `${site.url}/articles/${a.slug}`,
          ...(a.coverUrl ? { image: absolute(a.coverUrl) } : {}),
          ...(a.categoryName ? { articleSection: a.categoryName } : {}),
          keywords: a.tags.join(", "),
          wordCount: a.bodyText.split(/\s+/).length,
        }}
      />
      {adsenseReady && <Script src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE.client}`} crossOrigin="anonymous" strategy="afterInteractive" />}
      <ArticleView
        a={{
          title: a.title,
          excerpt: a.excerpt,
          html: rendered.html,
          hasMath: rendered.hasMath,
          headings: rendered.headings,
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
        aside={
          adsenseReady || sponsor ? (
            <AdColumn>
              {adsenseReady && ADSENSE.verticalSlot && <AdSlot slot={ADSENSE.verticalSlot} label="Advertisement, vertical" />}
              {adsenseReady && ADSENSE.squareSlot && <AdSlot slot={ADSENSE.squareSlot} label="Advertisement, square" />}
              {sponsor && <SponsorBox href={sponsor.href} imageUrl={sponsor.imageUrl} name={sponsor.campaign || a.title} />}
            </AdColumn>
          ) : undefined
        }
      />

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="bg-white pb-16">
          <div className="container-page">
            <h2 id="related-title" className="text-2xl sm:text-3xl">
              Related articles
            </h2>
            <ul className="mt-6 grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <li key={r.id}>
                  <ArticleCard article={r} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section aria-labelledby="join-title" className="bg-sky/40 py-12 sm:py-16">
        <div className="container-page max-w-3xl">
          <h2 id="join-title" className="text-2xl sm:text-3xl">
            Have something to add or correct?
          </h2>
          <p className="mt-3 text-lg text-ink/85">
            Spotted a mistake, or want to write for VierApparatus? Corrections are welcome and contributors are reviewed by the editor before anything is published.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/contribute" className="btn btn-primary">
              Join as contributor
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              Send a correction
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
