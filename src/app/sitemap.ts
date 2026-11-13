import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { listForSitemap } from "@/lib/store/articles";
import { listCategories } from "@/lib/store/categories";
import { listModuleUrls } from "@/lib/store/modules";
import { listProductSitemap } from "@/lib/store/products";

/**
 * One sitemap (index at /sitemap.xml, see sitemap-index.xml/route.ts): pages, topics, published articles, the published learning
 * modules and the published products, all read from the database on request. Drafts, archived and deleted items are never listed.
 * The index is generated at build time and so must not need the database: there is a single shard. (A sitemap may hold 50,000
 * URLs; split it again when the site approaches that.)
 */
export const dynamic = "force-dynamic";

export async function generateSitemaps() {
  return [{ id: 0 }];
}

export default async function sitemap(props: { id: Promise<string> }): Promise<MetadataRoute.Sitemap> {
  const id = Number(await props.id);
  const u = (p: string) => `${site.url}${p}`;

  void id;
  const [articles, topics, modules, products] = await Promise.all([listForSitemap(), listCategories({ onlyWithArticles: true }), listModuleUrls(), listProductSitemap()]);
  const productPages: MetadataRoute.Sitemap = [
    { url: u("/products"), changeFrequency: "weekly", priority: 0.8 },
    ...products.map((p) => ({ url: u(`/products/${p.slug}`), lastModified: new Date(p.updatedAt), changeFrequency: "monthly" as const, priority: 0.5 })),
  ];
  const newest = articles[0]?.updatedAt ? new Date(articles[0].updatedAt) : undefined;
  return [
    { url: u("/"), lastModified: newest, changeFrequency: "daily", priority: 1 },
    { url: u("/articles"), lastModified: newest, changeFrequency: "daily", priority: 0.9 },
    { url: u("/topics"), changeFrequency: "weekly", priority: 0.6 },
    { url: u("/software"), changeFrequency: "monthly", priority: 0.6 },
    { url: u("/about"), changeFrequency: "yearly", priority: 0.7 },
    { url: u("/contribute"), changeFrequency: "yearly", priority: 0.5 },
    { url: u("/contact"), changeFrequency: "yearly", priority: 0.4 },
    { url: u("/privacy"), changeFrequency: "yearly", priority: 0.2 },
    { url: u("/terms"), changeFrequency: "yearly", priority: 0.2 },
    ...productPages,
    ...modules.map((m) => ({
      url: u(m.path),
      ...(m.updatedAt ? { lastModified: new Date(m.updatedAt) } : {}),
      changeFrequency: m.kind === "module" ? ("monthly" as const) : ("weekly" as const),
      priority: m.kind === "index" ? 0.8 : m.kind === "subject" ? 0.6 : m.kind === "specialization" ? 0.55 : m.kind === "level" ? 0.5 : 0.7,
    })),
    ...topics.map((t) => ({ url: u(`/topics/${t.slug}`), changeFrequency: "weekly" as const, priority: 0.5 })),
    ...articles.map((a) => ({ url: u(`/articles/${a.slug}`), lastModified: new Date(a.updatedAt), changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
