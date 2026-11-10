import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { InquiryCta } from "@/components/InquiryCta";
import { JsonLd } from "@/components/JsonLd";
import { Pagination } from "@/components/Pagination";
import { ProductCard } from "@/components/ProductCard";
import { breadcrumbJsonLd } from "@/lib/product-seo";
import { getCategoryBySlug, getCategoryInfos, getCategoryPage, PRODUCTS_PER_PAGE } from "@/lib/products";
import { fitDescription, fitTitle } from "@/lib/seo";

// Fully static: one page per (category, page number), built once. Unknown combinations 404.
export const dynamicParams = false;
export const revalidate = false;

type Params = { params: Promise<{ slug: string; page?: string[] }> };

export function generateStaticParams() {
  const out: { slug: string; page: string[] }[] = [];
  for (const c of getCategoryInfos()) {
    out.push({ slug: c.slug, page: [] });
    for (let n = 2; n <= c.pageCount; n++) out.push({ slug: c.slug, page: [String(n)] });
  }
  return out;
}

/** /products/category/<slug> is page 1; /products/category/<slug>/<n> is page n (n >= 2). Anything else is a 404. */
function pageNumber(segments: string[] | undefined): number | null {
  if (!segments || segments.length === 0) return 1;
  if (segments.length > 1 || !/^[2-9]\d*$|^1\d+$/.test(segments[0])) return null;
  return Number(segments[0]);
}

const hubPath = (slug: string, page: number) => `/products/category/${slug}${page > 1 ? `/${page}` : ""}`;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug, page: seg } = await params;
  const cat = getCategoryBySlug(slug);
  const page = pageNumber(seg);
  if (!cat || !page || page > cat.pageCount) return { title: "Category not found", robots: { index: false } };

  const title = fitTitle(page > 1 ? `${cat.name} (Page ${page})` : cat.name, { qualifier: "Laboratory Equipment Supplier" });
  const description = fitDescription(
    `Browse ${cat.count} ${cat.name.toLowerCase()} listings${page > 1 ? `, page ${page} of ${cat.pageCount}` : ""} from international suppliers. Request a quotation or ask us to source equipment that is not listed.`,
    ["Global sourcing and delivery support."],
  );
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: hubPath(slug, page) },
    openGraph: { title, description, type: "website", url: hubPath(slug, page) },
  };
}

export default async function CategoryHubPage({ params }: Params) {
  const { slug, page: seg } = await params;
  const cat = getCategoryBySlug(slug);
  const page = pageNumber(seg);
  if (!cat || !page || page > cat.pageCount) notFound();
  const { items, total, pageCount } = getCategoryPage(cat.name, page);
  const others = getCategoryInfos().filter((c) => c.slug !== slug);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Products", path: "/products" },
          { name: cat.name, path: hubPath(slug, page) },
        ])}
      />
      <section className="bg-sky/50 py-12 sm:py-16">
        <div className="container-page">
          <nav aria-label="Breadcrumb" className="text-sm text-ink/70">
            <Link href="/products" className="hover:text-brand">
              Products
            </Link>{" "}
            / <span>{cat.name}</span>
          </nav>
          <h1 className="mt-3 text-4xl sm:text-5xl">{cat.name}</h1>
          <p className="mt-4 max-w-2xl text-lg text-ink/85">
            {total} listings drawn from supplier catalogue information. Prices are provided on request. If the equipment you need
            is not listed, we can source it for you.
          </p>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-14" aria-label={`${cat.name} products`}>
        <div className="container-page">
          <p className="text-sm text-ink/75">
            Showing {(page - 1) * PRODUCTS_PER_PAGE + 1}–{Math.min(page * PRODUCTS_PER_PAGE, total)} of {total}
            {pageCount > 1 ? ` · page ${page} of ${pageCount}` : ""}
          </p>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((p, i) => (
              <li key={p.id}>
                <ProductCard product={p} priority={page === 1 && i < 4} />
              </li>
            ))}
          </ul>
          <Pagination page={page} pageCount={pageCount} hrefFor={(n) => hubPath(slug, n)} />

          <nav aria-labelledby="other-categories" className="mt-14 border-t border-ink/10 pt-10">
            <h2 id="other-categories" className="text-2xl">
              Other categories
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((c) => (
                <li key={c.slug}>
                  <Link href={`/products/category/${c.slug}`} className="flex items-center justify-between rounded-lg border border-ink/10 px-4 py-3 hover:border-brand">
                    <span className="font-medium">{c.name}</span>
                    <span className="text-sm text-ink/70">{c.count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <InquiryCta title={`Need ${cat.name.toLowerCase()} not listed here?`} text="Send us the specification and we will request quotations from suppliers." defaultType="Product sourcing" />
    </>
  );
}
