import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const DIR = path.join(process.cwd(), "content", "articles");

export const articleFrontmatter = z.object({
  title: z.string().min(5).max(160),
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be lowercase letters, numbers and hyphens")
    .optional(),
  excerpt: z.string().min(20).max(320),
  coverImage: z.string().optional(),
  coverImageAlt: z.string().optional(),
  coverImageSource: z.string().optional(),
  coverImageSourceUrl: z.string().url().optional(),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  author: z.string().min(2).max(80),
  category: z.string().min(2).max(60),
  tags: z.array(z.string()).default([]),
  seoTitle: z.string().max(70).optional(),
  seoDescription: z.string().max(170).optional(),
  status: z.enum(["draft", "published"]),
  /** Optional: slug of a catalogue product this article relates to. */
  productSlug: z.string().optional(),
});

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string | null;
  coverImageAlt: string;
  coverImageSource: string | null;
  coverImageSourceUrl: string | null;
  date: string; // ISO
  updated: string | null;
  author: string;
  category: string;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  status: "draft" | "published";
  productSlug: string | null;
  body: string;
  readingMinutes: number;
};

export const categorySlug = (c: string) =>
  c.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function load(): Article[] {
  if (!fs.existsSync(DIR)) return [];
  const showDrafts = process.env.NODE_ENV !== "production";
  const out: Article[] = [];
  for (const file of fs.readdirSync(DIR)) {
    if (!/\.(md|mdx)$/.test(file) || file.startsWith("_")) continue;
    const raw = fs.readFileSync(path.join(DIR, file), "utf8");
    const { data, content } = matter(raw);
    const parsed = articleFrontmatter.safeParse(data);
    if (!parsed.success) {
      // Fail the build loudly: a malformed article must never silently disappear or publish.
      throw new Error(
        `Invalid front matter in content/articles/${file}: ` +
          parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; "),
      );
    }
    const f = parsed.data;
    if (f.status !== "published" && !showDrafts) continue;
    const words = content.trim().split(/\s+/).length;
    out.push({
      slug: f.slug ?? file.replace(/\.(md|mdx)$/, ""),
      title: f.title,
      excerpt: f.excerpt,
      coverImage: f.coverImage ?? null,
      coverImageAlt: f.coverImageAlt ?? f.title,
      coverImageSource: f.coverImageSource ?? null,
      coverImageSourceUrl: f.coverImageSourceUrl ?? null,
      date: f.date.toISOString(),
      updated: f.updated ? f.updated.toISOString() : null,
      author: f.author,
      category: f.category,
      tags: f.tags,
      seoTitle: f.seoTitle ?? f.title,
      seoDescription: f.seoDescription ?? f.excerpt,
      status: f.status,
      productSlug: f.productSlug ?? null,
      body: content,
      readingMinutes: Math.max(1, Math.round(words / 220)),
    });
  }
  const slugs = new Set<string>();
  for (const a of out) {
    if (slugs.has(a.slug)) throw new Error(`Duplicate article slug: ${a.slug}`);
    slugs.add(a.slug);
  }
  return out.sort((a, b) => b.date.localeCompare(a.date));
}

export const getArticles = () => load();
export const getArticle = (slug: string) => load().find((a) => a.slug === slug);

export function getArticleCategories() {
  const counts = new Map<string, number>();
  for (const a of load()) counts.set(a.category, (counts.get(a.category) ?? 0) + 1);
  return [...counts.entries()].map(([name, count]) => ({ name, slug: categorySlug(name), count }));
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  return load()
    .filter((a) => a.slug !== article.slug)
    .map((a) => ({
      a,
      score: (a.category === article.category ? 2 : 0) + a.tags.filter((t) => article.tags.includes(t)).length,
    }))
    .sort((x, y) => y.score - x.score || y.a.date.localeCompare(x.a.date))
    .slice(0, limit)
    .map((x) => x.a);
}
