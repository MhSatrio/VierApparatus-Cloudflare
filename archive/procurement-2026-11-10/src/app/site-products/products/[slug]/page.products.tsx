import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { InquiryCta } from "@/components/InquiryCta";
import { JsonLd } from "@/components/JsonLd";
import { ProductCard } from "@/components/ProductCard";
import { SafeImage } from "@/components/SafeImage";
import { getAllProductSlugs, getProductBySlug, getRelatedProducts } from "@/lib/products";
import { productInquiryLabel } from "@/lib/product-label";
import { breadcrumbJsonLd, categoryPath, productDescription, productImage, productJsonLd, productTitle } from "@/lib/product-seo";

// Pre-render the whole catalogue at build time. Catalogue data only changes when the CSV is re-imported and the
// site is redeployed, so there is no background revalidation (it would re-render ~10k pages daily for no gain).
// A slug missing at build time renders once on first request, then stays cached until the next deploy.
export const dynamicParams = true;
export const revalidate = false;

export function generateStaticParams() {
  return getAllProductSlugs().map((p) => ({ slug: p.slug }));
}

type Params = { params: Promise<{ slug: string }> };


export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) return { title: "Product not found", robots: { index: false } };

  // Title <= 60 and description 120-155 characters, built from name, model code, brand and category (see lib/seo.ts).
  const title = productTitle(p);
  const description = productDescription(p);
  const image = productImage(p);

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: {
      title,
      description,
      type: "website",
      url: `/products/${p.slug}`,
      images: image ? [{ url: image, alt: p.name }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) notFound();
  const related = getRelatedProducts(p);
  const label = productInquiryLabel(p);

  const ids: [string, string | null][] = [
    ["Model (from supplier title)", p.modelCode],
    ["Supplier SKU", p.sku],
    ["Brand", p.manufacturer],
    ["Supplier", p.supplier],
    ["Category", p.category],
    ["Subcategory", p.subcategory],
    ["Country of origin", p.originCountry],
    ["Availability", p.availability],
    ["Internal ID", p.id],
  ];

  return (
    <>
      <JsonLd data={productJsonLd(p)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Products", path: "/products" },
          { name: p.category, path: categoryPath(p.category) },
          { name: p.name, path: `/products/${p.slug}` },
        ])}
      />
      <section className="bg-white py-10 sm:py-14">
        <div className="container-page">
          <nav aria-label="Breadcrumb" className="text-sm text-ink/70">
            <Link href="/products" className="hover:text-brand">
              Products
            </Link>{" "}
            /{" "}
            <Link href={categoryPath(p.category)} className="hover:text-brand">
              {p.category}
            </Link>
          </nav>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-ink/10 bg-white">
              <SafeImage src={p.imageUrl} alt={p.name} sizes="(min-width:1024px) 45vw, 95vw" priority className="p-6" />
            </div>
            <div>
              <p className="eyebrow">{p.category}</p>
              <h1 className="mt-3 text-3xl sm:text-4xl">{p.name}</h1>
              {p.manufacturer && <p className="mt-2 text-ink/75">Brand: {p.manufacturer}</p>}
              <p className="mt-5 rounded-lg bg-sky px-4 py-3 font-semibold">
                {p.price ? `Price: ${p.price}` : "Price on request. Request a quotation."}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href="#inquiry" className="btn btn-primary">
                  Request a Quotation
                </Link>
                {p.datasheetUrl && (
                  <a href={p.datasheetUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                    Datasheet
                  </a>
                )}
              </div>
              <p className="mt-4 text-sm text-ink/70">
                Catalogue information is supplied by the manufacturer and may change. Final specifications, availability and
                pricing are confirmed in the quotation.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="text-2xl">Description</h2>
              {p.description ? (
                <div className="mt-4 space-y-3 whitespace-pre-line text-ink/90">{p.description}</div>
              ) : (
                <p className="mt-4 text-ink/80">
                  A detailed description is not available in the supplier catalogue. Contact us for full specifications.
                </p>
              )}

              {p.specifications.length > 0 && (
                <>
                  <h2 className="mt-10 text-2xl">Specifications</h2>
                  <dl className="mt-4 divide-y divide-ink/10 rounded-xl border border-ink/10">
                    {p.specifications.map((s, i) => (
                      <div key={`${s.label}-${i}`} className="grid gap-1 px-4 py-3 sm:grid-cols-[12rem_1fr]">
                        <dt className="font-semibold">{s.label}</dt>
                        <dd>{s.value}</dd>
                      </div>
                    ))}
                  </dl>
                </>
              )}
            </div>
            <aside aria-labelledby="ids-title">
              <h2 id="ids-title" className="text-2xl">
                Product details
              </h2>
              <dl className="mt-4 divide-y divide-ink/10 rounded-xl border border-ink/10">
                {ids
                  .filter(([, v]) => v)
                  .map(([k, v]) => (
                    <div key={k} className="px-4 py-3">
                      <dt className="text-sm text-ink/70">{k}</dt>
                      <dd className="font-medium break-words">{v}</dd>
                    </div>
                  ))}
              </dl>
              {p.sourceUrl && (
                <p className="mt-4">
                  <a href={p.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-brand underline">
                    Supplier page
                  </a>
                </p>
              )}
            </aside>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="bg-white pb-16">
          <div className="container-page">
            <h2 id="related-title" className="text-2xl sm:text-3xl">
              Related {p.category.toLowerCase()}
            </h2>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <li key={r.id}>
                  <ProductCard product={r} />
                </li>
              ))}
            </ul>
            <p className="mt-6">
              <Link href={categoryPath(p.category)} className="font-semibold text-brand underline underline-offset-4">
                Browse all {p.category.toLowerCase()}
              </Link>
            </p>
          </div>
        </section>
      )}

      <InquiryCta
        title={`Request a quotation for ${p.name}`}
        text="Tell us the quantity, delivery country and any requirements. Your inquiry will include this product's name and model or SKU automatically."
        defaultProduct={label}
        defaultType="Request a quotation"
      />
    </>
  );
}
