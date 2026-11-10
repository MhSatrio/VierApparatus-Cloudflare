import type { MetadataRoute } from "next";
import { getArticleCategories, getArticles } from "@/lib/articles";
import { getAllProductSlugs, getCategoryInfos } from "@/lib/products";
import { site } from "@/lib/site";

/**
 * Sitemap shards. Google allows 50,000 URLs per sitemap; shards of SITEMAP_CHUNK keep every file small and mean the
 * catalogue can grow past 50k products without changing this file. /sitemap.xml is the index (see sitemap.xml/route.ts).
 *   id 0      -> static pages, articles, category hub pages
 *   id 1..n   -> product pages, SITEMAP_CHUNK per file
 */
export const SITEMAP_CHUNK = 5000;

export async function generateSitemaps() {
  const productShards = Math.ceil(getAllProductSlugs().length / SITEMAP_CHUNK);
  return Array.from({ length: 1 + productShards }, (_, id) => ({ id }));
}

export default async function sitemap(props: { id: Promise<string> }): Promise<MetadataRoute.Sitemap> {
  const id = Number(await props.id);
  const u = (p: string) => `${site.url}${p}`;

  if (id > 0) {
    return getAllProductSlugs()
      .slice((id - 1) * SITEMAP_CHUNK, id * SITEMAP_CHUNK)
      .map((p) => ({ url: u(`/products/${p.slug}`), lastModified: new Date(p.updatedAt), changeFrequency: "monthly" as const, priority: 0.5 }));
  }

  const built = new Date();
  const hubs = getCategoryInfos().flatMap((c) =>
    Array.from({ length: c.pageCount }, (_, i) => ({
      url: u(`/products/category/${c.slug}${i === 0 ? "" : `/${i + 1}`}`),
      lastModified: built,
      changeFrequency: "weekly" as const,
      priority: i === 0 ? 0.8 : 0.4,
    })),
  );
  return [
    { url: u("/"), lastModified: built, changeFrequency: "weekly", priority: 1 },
    { url: u("/about"), changeFrequency: "yearly", priority: 0.7 },
    { url: u("/products"), lastModified: built, changeFrequency: "weekly", priority: 0.9 },
    { url: u("/articles"), lastModified: built, changeFrequency: "weekly", priority: 0.7 },
    { url: u("/contact"), changeFrequency: "yearly", priority: 0.8 },
    { url: u("/privacy"), changeFrequency: "yearly", priority: 0.2 },
    ...hubs,
    ...getArticleCategories().map((c) => ({ url: u(`/articles/category/${c.slug}`), changeFrequency: "weekly" as const, priority: 0.4 })),
    ...getArticles().map((a) => ({ url: u(`/articles/${a.slug}`), lastModified: new Date(a.updated ?? a.date), priority: 0.6 })),
  ];
}
