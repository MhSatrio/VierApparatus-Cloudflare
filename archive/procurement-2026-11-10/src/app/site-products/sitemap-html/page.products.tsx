import Link from "next/link";
import type { Metadata } from "next";
import { getCategoryInfos } from "@/lib/products";
import { HTML_SITEMAP_PAGE_SIZE, htmlSitemapPages } from "@/lib/html-sitemap";
import { fitDescription } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `Product Directory | ${site.name}` },
  description: fitDescription("Complete directory of the laboratory equipment and instruments listed by VierApparatus, organised by category and A-Z pages."),
  alternates: { canonical: "/sitemap-html" },
};

export default function HtmlSitemapIndex() {
  const pages = htmlSitemapPages();
  return (
    <div className="container-page py-12">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-ink/70">
        <Link href="/" className="hover:text-brand">
          Home
        </Link>{" "}
        / <span>Product Directory</span>
      </nav>
      <h1 className="mb-4 text-3xl font-bold sm:text-4xl">Product Directory</h1>
      <p className="mb-10 max-w-2xl text-ink/70">
        Every laboratory instrument and apparatus in our catalogue. Browse by category, or use the numbered directory pages
        below ({HTML_SITEMAP_PAGE_SIZE} listings each).
      </p>

      <h2 className="mb-4 text-2xl font-semibold text-brand">Categories</h2>
      <ul className="mb-12 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {getCategoryInfos().map((c) => (
          <li key={c.slug}>
            <Link href={`/products/category/${c.slug}`} className="block rounded-lg border border-ink/5 bg-sky/20 p-3 text-sm hover:border-brand/40 hover:text-brand">
              <span className="font-medium">{c.name}</span> <span className="text-ink/60">({c.count} items)</span>
            </Link>
          </li>
        ))}
      </ul>

      <h2 className="mb-4 text-2xl font-semibold text-brand">Directory pages</h2>
      <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {pages.map((pg) => (
          <li key={pg.number}>
            <Link href={`/sitemap-html/${pg.number}`} className="block rounded-lg border border-ink/5 bg-sky/20 p-3 text-sm hover:border-brand/40 hover:text-brand">
              <span className="font-medium">Page {pg.number}</span> <span className="text-ink/60">{pg.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
