import { generateSitemaps } from "../sitemap";
import { site } from "@/lib/site";

// Sitemap INDEX, served at /sitemap.xml through a rewrite in next.config.ts (Next reserves that exact path for sitemap.ts).
// Next.js generates the shards (/sitemap/0.xml, /sitemap/1.xml, ...) from sitemap.ts but not the index.
export const dynamic = "force-static";

export async function GET() {
  const shards = await generateSitemaps();
  const lastmod = new Date().toISOString();
  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    shards.map((s) => `  <sitemap><loc>${site.url}/sitemap/${s.id}.xml</loc><lastmod>${lastmod}</lastmod></sitemap>`).join("\n") +
    `\n</sitemapindex>\n`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=0, s-maxage=86400" } });
}
