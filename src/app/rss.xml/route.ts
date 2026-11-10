import { escapeHtml } from "@/lib/content/text";
import { site } from "@/lib/site";
import { listPublished } from "@/lib/store/articles";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** RSS 2.0 feed of the 30 newest published articles (summary only; the full article stays on the site). */
export async function GET() {
  const { items } = await listPublished({ perPage: 30 });
  const rfc822 = (iso: string | null) => new Date(iso ?? Date.now()).toUTCString();
  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>` +
    `<title>${escapeHtml(site.name)}</title><link>${site.url}</link><description>${escapeHtml(site.description)}</description><language>en</language>` +
    `<atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml"/>` +
    (items[0] ? `<lastBuildDate>${rfc822(items[0].updatedAt)}</lastBuildDate>` : "") +
    items
      .map(
        (a) =>
          `<item><title>${escapeHtml(a.title)}</title><link>${site.url}/articles/${a.slug}</link><guid isPermaLink="true">${site.url}/articles/${a.slug}</guid>` +
          `<pubDate>${rfc822(a.publishedAt)}</pubDate>${a.categoryName ? `<category>${escapeHtml(a.categoryName)}</category>` : ""}` +
          `<description>${escapeHtml(a.excerpt)}</description></item>`,
      )
      .join("") +
    `</channel></rss>\n`;
  return new Response(body, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=3600" } });
}
