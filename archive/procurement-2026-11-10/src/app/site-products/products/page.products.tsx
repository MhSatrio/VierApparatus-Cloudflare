import Link from "next/link";
import type { Metadata } from "next";
import { InquiryCta } from "@/components/InquiryCta";
import { Pagination, queryHref } from "@/components/Pagination";
import { ProductCard } from "@/components/ProductCard";
import { getCategoryInfos, queryProducts, SORTS } from "@/lib/products";
import { PRODUCTS_PER_PAGE } from "@/lib/site";

type SP = Promise<{ [k: string]: string | string[] | undefined }>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export async function generateMetadata({ searchParams }: { searchParams: SP }): Promise<Metadata> {
  const sp = await searchParams;
  const filtered = Boolean(one(sp.q) || one(sp.category) || one(sp.page) || one(sp.sort));
  return {
    title: "Laboratory Equipment Catalogue",
    description:
      "Browse laboratory equipment from supplier catalogues: centrifuges, incubators, analytical instruments and more. Request a quotation or ask us to source it.",
    alternates: { canonical: "/products" },
    // Filtered/paginated/search result URLs are for visitors, not the index.
    robots: filtered ? { index: false, follow: true } : undefined,
  };
}

export default async function ProductsPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const result = queryProducts({ q: one(sp.q), category: one(sp.category), sort: one(sp.sort), page: Number(one(sp.page)) || 1 });
  const categories = getCategoryInfos();
  const { q, category, sort } = result.query;
  const active = Boolean(q || category);

  return (
    <>
      <section className="bg-sky/50 py-12 sm:py-16">
        <div className="container-page">
          <p className="eyebrow">Products</p>
          <h1 className="mt-3 text-4xl sm:text-5xl">Laboratory equipment catalogue</h1>
          <p className="mt-4 max-w-2xl text-lg text-ink/85">
            Listings are drawn from supplier catalogue information. Prices are provided on request, as quotations depend on
            specification, quantity and destination. Can&apos;t find what you need? We can source equipment that is not listed.
          </p>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-14" aria-label="Product catalogue">
        <div className="container-page">
          <form method="get" action="/products" role="search" className="grid gap-4 rounded-xl border border-ink/10 p-4 sm:grid-cols-2 lg:grid-cols-[2fr_1.2fr_1fr_auto] lg:items-end">
            <div>
              <label htmlFor="q" className="mb-1.5 block text-sm font-medium">
                Search products
              </label>
              <input id="q" name="q" type="search" defaultValue={q} maxLength={100} placeholder="Name or model, e.g. centrifuge BKC" className="field" />
            </div>
            <div>
              <label htmlFor="category" className="mb-1.5 block text-sm font-medium">
                Category
              </label>
              <select id="category" name="category" defaultValue={category} className="field">
                <option value="">All categories</option>
                {categories.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name} ({c.count})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="sort" className="mb-1.5 block text-sm font-medium">
                Sort by
              </label>
              <select id="sort" name="sort" defaultValue={sort} className="field">
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <button type="submit" className="btn btn-primary btn-sm flex-1">
                Apply
              </button>
              {active && (
                <Link href="/products" className="btn btn-secondary btn-sm">
                  Clear
                </Link>
              )}
            </div>
          </form>

          <p className="mt-6 text-sm text-ink/75" role="status">
            {result.total === 0
              ? "No products found."
              : `Showing ${(result.page - 1) * PRODUCTS_PER_PAGE + 1}–${Math.min(result.page * PRODUCTS_PER_PAGE, result.total)} of ${result.total} products${category ? ` in ${category}` : ""}${q ? ` matching “${q}”` : ""}.`}
          </p>

          {result.items.length > 0 ? (
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {result.items.map((p, i) => (
                <li key={p.id}>
                  <ProductCard product={p} priority={result.page === 1 && i < 4} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-6 rounded-xl border border-ink/10 bg-sky/40 p-8 text-center">
              <h2 className="text-2xl">No matching products</h2>
              <p className="mx-auto mt-2 max-w-lg">
                Try a different search term or clear the filters. If you are looking for something specific, tell us and we
                will source it.
              </p>
              <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/products" className="btn btn-secondary">
                  Clear filters
                </Link>
                <Link href={`/contact${q ? `?product=${encodeURIComponent(q)}` : ""}`} className="btn btn-primary">
                  Ask us to source it
                </Link>
              </div>
            </div>
          )}

          <Pagination page={result.page} pageCount={result.pageCount} hrefFor={queryHref("/products", { q, category, sort: sort === "name-asc" ? "" : sort })} />

          <nav aria-labelledby="browse-categories" className="mt-14 border-t border-ink/10 pt-10">
            <h2 id="browse-categories" className="text-2xl">
              Browse by category
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((c) => (
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

      <InquiryCta title="Can't find the equipment you need?" text="Send us the specification. We can request quotations from suppliers for equipment that is not listed in the catalogue." defaultType="Product sourcing" />
    </>
  );
}
