import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { Pagination, queryHref } from "@/components/Pagination";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductDisclaimer, ProductInvite } from "@/components/products/ProductNotices";
import { productHref } from "@/lib/products/shared";
import { site } from "@/lib/site";
import { ratingFor } from "@/lib/store/product-comments";
import { getProductTexts, listManufacturers, listProductCategories, listPublishedProducts } from "@/lib/store/products";

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ q?: string; category?: string; manufacturer?: string; sort?: string; page?: string }> };

const SORTS = [
  { value: "name", label: "Name A to Z" },
  { value: "manufacturer", label: "Manufacturer" },
  { value: "category", label: "Category" },
  { value: "updated", label: "Recently updated" },
];

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const sp = await searchParams;
  const filtered = Boolean(sp.q || sp.category || sp.manufacturer || sp.sort || (sp.page && sp.page !== "1"));
  return {
    title: "Scientific equipment reviews",
    description: "Independent reviews of laboratory and scientific equipment: specifications from the manufacturer, editorial assessment and feedback from researchers, kept apart and clearly labelled.",
    alternates: { canonical: "/products" },
    // filtered and numbered pages are for people, not for the index
    ...(filtered ? { robots: { index: false, follow: true } } : {}),
  };
}

/**
 * The Product page: first the disclaimer, then the invitation to manufacturers, then the entries. It is a review index, not a shop:
 * no prices, no cart, no purchase buttons.
 */
export default async function ProductsPage({ searchParams }: Props) {
  const sp = await searchParams;
  const [texts, categories, manufacturers] = await Promise.all([getProductTexts(), listProductCategories({ publishedOnly: true }), listManufacturers({ publishedOnly: true })]);
  const result = await listPublishedProducts({
    q: (sp.q ?? "").slice(0, 100),
    category: sp.category ?? "",
    manufacturer: sp.manufacturer ?? "",
    sort: SORTS.some((s) => s.value === sp.sort) ? sp.sort : "name",
    dir: sp.sort === "updated" ? "desc" : "asc",
    page: Number(sp.page ?? 1),
    perPage: 24,
  });
  const ratings = await ratingFor(result.items.map((p) => p.id));
  const params = { q: sp.q ?? "", category: sp.category ?? "", manufacturer: sp.manufacturer ?? "", sort: sp.sort ?? "" };
  const anyFilter = Boolean(params.q || params.category || params.manufacturer);
  const field = "field !min-h-11";
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "VierApparatus scientific equipment reviews",
          url: `${site.url}/products`,
          mainEntity: { "@type": "ItemList", itemListElement: result.items.slice(0, 24).map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${site.url}${productHref(p.slug)}` })) },
        }}
      />
      <section className="bg-white py-10 sm:py-14">
        <div className="container-page space-y-8">
          <header>
            <p className="eyebrow">Product reviews</p>
            <h1 className="mt-3 text-4xl sm:text-5xl">Scientific equipment, reviewed</h1>
          </header>

          <ProductDisclaimer text={texts.disclaimer} />
          <ProductInvite text={texts.invite} />

          <div>
            <h2 className="text-3xl" id="entries">
              Product entries
            </h2>
            <form method="get" action="/products" className="mt-5 grid gap-3 rounded-xl border border-ink/10 bg-sky/20 p-4 sm:grid-cols-2 lg:grid-cols-[2fr_1.2fr_1.2fr_1fr_auto]" role="search" aria-label="Filter the product entries">
              <label className="block">
                <span className="mb-1 block text-sm font-medium">Search</span>
                <input name="q" type="search" defaultValue={params.q} placeholder="Name, model or manufacturer" className={field} maxLength={100} />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium">Category</span>
                <select name="category" defaultValue={params.category} className={field}>
                  <option value="">All categories</option>
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name} ({c.count})
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium">Manufacturer</span>
                <select name="manufacturer" defaultValue={params.manufacturer} className={field}>
                  <option value="">All manufacturers</option>
                  {manufacturers.map((m) => (
                    <option key={m.name} value={m.name}>
                      {m.name} ({m.count})
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium">Sort by</span>
                <select name="sort" defaultValue={params.sort || "name"} className={field}>
                  {SORTS.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </label>
              <div className="flex items-end gap-2">
                <button type="submit" className="btn btn-primary !min-h-11">
                  Apply
                </button>
                {anyFilter && (
                  <Link href="/products" className="inline-flex min-h-11 items-center px-2 font-semibold text-brand underline underline-offset-4">
                    Clear
                  </Link>
                )}
              </div>
            </form>

            <p className="mt-5 text-sm text-ink/70" role="status">
              {result.total === 0 ? "No entries match." : `${result.total.toLocaleString("en-US")} ${result.total === 1 ? "entry" : "entries"}${anyFilter ? " match" : ""}. Page ${result.page} of ${result.pageCount}.`}
            </p>
            {result.total === 0 ? (
              <p className="mt-4 rounded-xl border border-dashed border-ink/25 p-6 text-ink/75">
                {anyFilter ? "Nothing matches those filters. Try fewer words or clear the filters." : "There are no published product entries yet."}
              </p>
            ) : (
              <ul className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {result.items.map((p, i) => (
                  <li key={p.id}>
                    <ProductCard product={p} rating={ratings.get(p.id)} priority={i < 4} />
                  </li>
                ))}
              </ul>
            )}
            <Pagination page={result.page} pageCount={result.pageCount} hrefFor={queryHref("/products", params)} />
          </div>
        </div>
      </section>
    </>
  );
}
