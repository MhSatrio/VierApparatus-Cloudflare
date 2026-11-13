import type { ArticleRecord } from "../store/articles";
import type { ProductRecord } from "../products/shared";
import { site } from "../site";

/**
 * What the DCE app receives. Only public content is sent: no e-mail addresses, no session or account data, no comments, no
 * draft or internal notes. Long texts are cut at TEXT_LIMIT characters and marked as truncated.
 * The payload is a contract: change it only by adding fields, never by renaming or removing one.
 */
export const TEXT_LIMIT = 20000;

/** A path from the site becomes an absolute https address; an address that is already absolute is kept. */
export const absolute = (u: string | null | undefined): string | null => {
  if (!u) return null;
  if (/^https?:\/\//i.test(u)) return u;
  return `${site.url}${u.startsWith("/") ? "" : "/"}${u}`;
};

/** Markdown to plain text: headings, emphasis, links, images, code and HTML tags are removed. */
export function plainText(md: string, max = TEXT_LIMIT): string {
  return (md || "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^\s{0,3}(#{1,6}\s+|>\s?|[-*+]\s+|\d+\.\s+)/gm, "")
    .replace(/(^|\s)#{1,6}\s+/g, "$1")
    .replace(/[*_`]{1,3}/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, max);
}

const wordsIn = (t: string) => (t ? t.split(/\s+/).filter(Boolean).length : 0);

export function articlePayload(a: ArticleRecord): Record<string, unknown> {
  const raw = a.bodyText || "";
  const body = plainText(raw);
  return {
    id: a.id,
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    url: absolute(`/articles/${a.slug}`),
    category: a.categoryName ?? "",
    tags: a.tags,
    author: a.authorName,
    publishedAt: a.publishedAt,
    updatedAt: a.updatedAt,
    version: a.version,
    readingMinutes: a.readingMinutes,
    wordCount: wordsIn(body),
    image: absolute(a.coverUrl),
    imageAlt: a.coverAlt,
    imageCredit: a.coverCredit,
    body,
    bodyTruncated: raw.length > TEXT_LIMIT,
  };
}

export function productPayload(p: ProductRecord): Record<string, unknown> {
  const description = plainText(p.description);
  const review = plainText(p.editorialReview);
  return {
    id: p.id,
    slug: p.slug,
    url: absolute(`/products/${p.slug}`),
    name: p.name,
    manufacturer: p.manufacturer,
    modelNumber: p.modelNumber,
    category: p.category,
    status: p.status,
    reviewStatus: p.reviewStatus,
    shortDescription: p.shortDescription,
    description,
    advantages: p.advantages,
    limitations: p.limitations,
    editorialReview: review,
    editorialReviewTruncated: p.editorialReview.length > TEXT_LIMIT,
    imageUrl: absolute(p.imageUrl),
    productUrl: p.productUrl,
    manufacturerUrl: p.manufacturerUrl,
    publishedAt: p.publishedAt,
    updatedAt: p.updatedAt,
    version: p.version,
  };
}
