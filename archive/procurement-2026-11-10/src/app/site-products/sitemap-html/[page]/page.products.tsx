import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { HTML_SITEMAP_PAGE_SIZE, htmlSitemapPages, htmlSitemapSlice } from "@/lib/html-sitemap";
import { fitDescription } from "@/lib/seo";
import { site } from "@/lib/site";

export const dynamicParams = false;
export const revalidate = false;

type Params = { params: Promise<{ page: string }> };

export function generateStaticParams() {
  return htmlSitemapPages().map((p) => ({ page: String(p.number) }));
}

const valid = (raw: string) => (/^[1-9]\d*$/.test(raw) && Number(raw) <= htmlSitemapPages().length ? Number(raw) : null);

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const n = valid((await params).page);
  if (!n) return { title: "Not found", robots: { index: false } };
  return {
    title: { absolute: `Product Directory, Page ${n} | ${site.name}` },
    description: fitDescription(`Laboratory equipment listings ${(n - 1) * HTML_SITEMAP_PAGE_SIZE + 1} onwards from the VierApparatus catalogue, sorted A-Z.`),
    alternates: { canonical: `/sitemap-html/${n}` },
  };
}

export default async function HtmlSitemapPage({ params }: Params) {
  const n = valid((await params).page);
  if (!n) notFound();
  const total = htmlSitemapPages().length;
  const items = htmlSitemapSlice(n);
  return (
    <div className="container-page py-12">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-ink/70">
        <Link href="/" className="hover:text-brand">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/sitemap-html" className="hover:text-brand">
          Product Directory
        </Link>{" "}
        / <span>Page {n}</span>
      </nav>
      <h1 className="mb-6 text-3xl font-bold sm:text-4xl">Product Directory, Page {n}</h1>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {items.map((p) => (
          <li key={p.id}>
            <Link href={`/products/${p.slug}`} className="block rounded-lg border border-ink/5 bg-sky/20 p-3 text-sm text-ink transition-colors hover:border-brand/40 hover:text-brand">
              <span className="font-medium">{p.name}</span>
              {p.modelCode && <span className="mt-0.5 block text-xs text-ink/70">Model: {p.modelCode}</span>}
            </Link>
          </li>
        ))}
      </ul>
      <nav aria-label="Directory pages" className="mt-10 flex flex-wrap gap-2">
        {Array.from({ length: total }, (_, i) => i + 1).map((i) => (
          <Link key={i} href={`/sitemap-html/${i}`} aria-current={i === n ? "page" : undefined} className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border px-3 ${i === n ? "border-brand bg-brand text-white" : "border-ink/20 hover:border-brand"}`}>
            {i}
          </Link>
        ))}
      </nav>
    </div>
  );
}
