import Link from "next/link";
import { notFound } from "next/navigation";
import { AdColumn, AdSizePreview, SponsorBox } from "@/components/ads/AdColumn";
import { ArticleView } from "@/components/ArticleView";
import { Empty, PageTitle } from "@/components/admin/ui";
import { requirePage } from "@/lib/auth/guard";
import { renderDoc } from "@/lib/content/render";
import { getPublishedBySlug, listPublished } from "@/lib/store/articles";
import { resolveSponsor } from "@/lib/store/sponsors";

/**
 * Layout prototype (owner only, never public). It shows one real published article with the three advertising containers
 * beside it, so the design can be checked before anything is applied to every article. The two Google AdSense containers are
 * drawn as labelled preview frames; nothing here loads an advertisement.
 */
export default async function AdLayoutPreview() {
  await requirePage({ action: "sponsors.manage" });
  const [first] = (await listPublished({ perPage: 1 })).items;
  if (!first) {
    return (
      <>
        <PageTitle title="Article layout preview" />
        <Empty>Publish an article first. The preview uses a real article so you can see the real spacing and text width.</Empty>
      </>
    );
  }
  const a = await getPublishedBySlug(first.slug);
  if (!a) notFound();
  const rendered = renderDoc(a.doc);
  const sponsor = await resolveSponsor(a.id);
  return (
    <>
      <PageTitle title="Article layout preview" sub="Preview only, not public. Vertical and square AdSense units are responsive and fill the column; 300 × 600 is preferred when space allows. Then the sponsor (square). Nothing is shown to readers until you approve the layout.">
        <Link href="/admin/sponsors" className="btn btn-secondary btn-sm">
          Back to Sponsor Management
        </Link>
      </PageTitle>
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
          <AdColumn>
            <div className="space-y-8">
              <AdSizePreview label="Vertical advertisement (Google AdSense)" size="300 × 600" minHeight="18rem" />
              <AdSizePreview label="Square advertisement (Google AdSense)" size="300 × 300" minHeight="12rem" />
              {sponsor ? (
                <SponsorBox href={sponsor.href} imageUrl={sponsor.imageUrl} name={sponsor.campaign || a.title} />
              ) : (
                <AdSizePreview label="Sponsorship (square)" size="300 × 300" minHeight="12rem" />
              )}
            </div>
          </AdColumn>
        }
      />
    </>
  );
}
