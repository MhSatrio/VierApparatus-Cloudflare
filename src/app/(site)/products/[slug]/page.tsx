import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { CommentForm } from "@/components/products/CommentForm";
import { ProductCard, Stars } from "@/components/products/ProductCard";
import { SafeImage } from "@/components/SafeImage";
import { productDescription, productJsonLd, productTitle } from "@/lib/products/seo";
import { MIN_RATINGS_FOR_SCORE, productHref, REVIEW_STATUS_LABEL, type GalleryImage, type ProductRecord } from "@/lib/products/shared";
import { site } from "@/lib/site";
import { listApprovedComments, ratingFor } from "@/lib/store/product-comments";
import { findProductRedirect, getPublishedProduct, getRelatedProducts } from "@/lib/store/products";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Ctx): Promise<Metadata> {
  const p = await getPublishedProduct((await params).slug);
  if (!p) return { robots: { index: false } };
  return {
    title: { absolute: productTitle(p) },
    description: productDescription(p),
    alternates: { canonical: productHref(p.slug) },
    openGraph: { type: "website", title: p.name, description: productDescription(p), url: `${site.url}${productHref(p.slug)}`, ...(p.imageUrl && p.imageUrl.startsWith("https://") ? { images: [{ url: p.imageUrl }] } : {}) },
  };
}

const date = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const paragraphs = (body: string) => body.split(/\n{2,}/).map((x) => x.trim()).filter(Boolean);

/** A heading that says WHO is speaking: the manufacturer, the VierApparatus editors, or readers. The three are never mixed. */
function Source({ kind }: { kind: "manufacturer" | "editorial" | "readers" }) {
  const map = {
    manufacturer: ["Manufacturer information", "bg-ink/10 text-ink"],
    editorial: ["VierApparatus editorial assessment", "bg-brand text-white"],
    readers: ["Reader experience, user-submitted", "bg-sky text-ink"],
  } as const;
  return <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${map[kind][1]}`}>{map[kind][0]}</span>;
}

function Section({ id, title, source, children }: { id: string; title: string; source: "manufacturer" | "editorial" | "readers"; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="scroll-mt-24 border-t border-ink/10 pt-8">
      <div className="flex flex-wrap items-center gap-3">
        <h2 id={id} className="text-2xl sm:text-3xl">
          {title}
        </h2>
        <Source kind={source} />
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

const List = ({ items }: { items: string[] }) => (
  <ul className="list-disc space-y-1.5 pl-5">
    {items.map((x, i) => (
      <li key={i}>{x}</li>
    ))}
  </ul>
);

export default async function ProductPage({ params }: Ctx) {
  const { slug } = await params;
  const p: ProductRecord | null = await getPublishedProduct(slug);
  if (!p) {
    const now = await findProductRedirect(slug);
    if (now) permanentRedirect(productHref(now));
    notFound();
  }
  const [comments, related, ratings] = await Promise.all([listApprovedComments(p.id), getRelatedProducts(p), ratingFor([p.id])]);
  const rating = ratings.get(p.id) ?? null;
  const relatedRatings = await ratingFor(related.map((r) => r.id));
  const main: GalleryImage[] = p.imageUrl ? [{ url: p.imageUrl, thumbUrl: p.thumbUrl || p.imageUrl, alt: p.name, kind: "image" }] : [];
  const images: GalleryImage[] = [...main, ...p.gallery];
  const hasAssessment = p.advantages.length > 0 || p.limitations.length > 0;
  const links: { label: string; url: string }[] = [
    ...(p.datasheetUrl ? [{ label: "Technical datasheet", url: p.datasheetUrl }] : []),
    ...(p.productUrl ? [{ label: "Product page at the manufacturer or supplier", url: p.productUrl }] : []),
    ...(p.manufacturerUrl ? [{ label: `${p.manufacturer} website`, url: p.manufacturerUrl }] : []),
    ...p.documents,
  ];
  return (
    <>
      <JsonLd data={productJsonLd(p, rating)} />
      <article className="bg-white py-8 sm:py-12">
        <div className="container-page max-w-6xl">
          <nav aria-label="Breadcrumb" className="text-sm text-ink/70">
            <Link href="/products" className="hover:text-brand">
              Product reviews
            </Link>{" "}
            /{" "}
            {p.categorySlug ? (
              <Link href={`/products?category=${encodeURIComponent(p.categorySlug)}`} className="hover:text-brand">
                {p.category}
              </Link>
            ) : (
              p.category
            )}
          </nav>

          <header className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-ink/10 bg-sky/20">
              <SafeImage src={images[0]?.url ?? null} alt={images[0] ? p.name : ""} sizes="(min-width: 1024px) 45vw, 95vw" priority />
            </div>
            <div className="min-w-0">
              <p className="flex flex-wrap items-center gap-2 text-sm">
                <span className="font-semibold text-brand">{p.category}</span>
                <span className="rounded-full bg-ink/10 px-2 py-0.5 text-xs font-semibold">{REVIEW_STATUS_LABEL[p.reviewStatus]}</span>
              </p>
              <h1 className="mt-2 text-3xl sm:text-5xl">{p.name}</h1>
              <p className="mt-3 text-lg text-ink/80">
                {p.manufacturer}
                {p.modelNumber && <> · Model {p.modelNumber}</>}
              </p>
              {p.shortDescription && <p className="mt-4 text-lg">{p.shortDescription}</p>}
              <p className="mt-4 text-sm text-ink/70">
                {rating && rating.average !== null ? (
                  <>
                    <Stars value={rating.average} /> <strong>{rating.average.toFixed(1)}</strong> out of 5 from {rating.ratedCount} reader ratings.{" "}
                  </>
                ) : (
                  <>Not enough reader ratings yet to show a score (at least {MIN_RATINGS_FOR_SCORE} are needed). </>
                )}
                <a href="#feedback" className="font-semibold text-brand underline underline-offset-4">
                  Reader comments
                </a>
              </p>
              <p className="mt-5">
                <Link href={`/contact?type=${encodeURIComponent("Quotation request")}&product=${encodeURIComponent(p.name)}&productPath=${encodeURIComponent(productHref(p.slug))}`} className="btn btn-primary">
                  Learn more
                </Link>
              </p>
              <nav aria-label="On this page"className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold text-brand">
                <a href="#overview" className="underline underline-offset-4">Overview</a>
                {p.specs.length > 0 && <a href="#specifications" className="underline underline-offset-4">Specifications</a>}
                <a href="#assessment" className="underline underline-offset-4">Assessment</a>
                <a href="#documentation" className="underline underline-offset-4">Documentation</a>
                <a href="#review" className="underline underline-offset-4">Editorial review</a>
                <a href="#feedback" className="underline underline-offset-4">Feedback</a>
              </nav>
              <p className="mt-6 rounded-lg border border-ink/15 bg-sky/20 p-3 text-sm">
                This page keeps three kinds of statement apart: what the <strong>manufacturer</strong> says, what the <strong>VierApparatus editors</strong> assess, and what <strong>readers</strong> report. Manufacturer claims have not been independently verified unless the editorial review says so.
              </p>
            </div>
          </header>

          <div className="mt-10 space-y-10">
            <Section id="overview" title="Product overview" source="manufacturer">
              {p.description ? (
                <div className="max-w-3xl space-y-3">
                  {paragraphs(p.description).map((t, i) => (
                    <p key={i}>{t}</p>
                  ))}
                </div>
              ) : (
                <p className="max-w-3xl text-ink/75">{p.shortDescription || "The manufacturer's overview has not been added to this entry yet."}</p>
              )}
              {p.features.length > 0 && (
                <div className="mt-5">
                  <h3 className="text-lg">Features stated by the manufacturer</h3>
                  <div className="mt-2">
                    <List items={p.features} />
                  </div>
                </div>
              )}
              {images.length > 1 && (
                <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Product images">
                  {images.slice(1).map((g, i) => (
                    <li key={i}>
                      <figure className="overflow-hidden rounded-xl border border-ink/10">
                        <div className="relative aspect-[4/3] bg-sky/20">
                          <SafeImage src={g.thumbUrl || g.url} alt={g.alt || `${p.name}, image ${i + 2}`} sizes="(min-width: 1024px) 30vw, 90vw" />
                        </div>
                        {(g.kind === "diagram" || g.alt) && <figcaption className="p-2 text-sm text-ink/75">{g.kind === "diagram" ? "Technical diagram. " : ""}{g.alt}</figcaption>}
                      </figure>
                    </li>
                  ))}
                </ul>
              )}
            </Section>

            <Section id="manufacturer" title="Manufacturer information" source="manufacturer">
              <dl className="grid max-w-3xl gap-x-8 gap-y-2 sm:grid-cols-2">
                <div>
                  <dt className="font-semibold">Manufacturer or brand</dt>
                  <dd>{p.manufacturer}</dd>
                </div>
                {p.modelNumber && (
                  <div>
                    <dt className="font-semibold">Model number</dt>
                    <dd>{p.modelNumber}</dd>
                  </div>
                )}
                {p.sku && (
                  <div>
                    <dt className="font-semibold">Catalogue code</dt>
                    <dd>{p.sku}</dd>
                  </div>
                )}
                <div>
                  <dt className="font-semibold">Category</dt>
                  <dd>{p.category}</dd>
                </div>
                {p.certifications.length > 0 && (
                  <div className="sm:col-span-2">
                    <dt className="font-semibold">Certifications documented</dt>
                    <dd>{p.certifications.join(", ")}</dd>
                  </div>
                )}
              </dl>
            </Section>

            {p.specs.length > 0 && (
              <Section id="specifications" title="Technical specifications" source="manufacturer">
                <p className="mb-3 text-sm text-ink/70">Provided by the manufacturer. Verify them against the manufacturer&apos;s documentation before relying on them.</p>
                <div className="overflow-x-auto rounded-xl border border-ink/10">
                  <table className="w-full min-w-[20rem] text-left">
                    <caption className="sr-only">Technical specifications of {p.name}, as stated by the manufacturer</caption>
                    <tbody className="divide-y divide-ink/10">
                      {p.specs.map((s, i) => (
                        <tr key={i}>
                          <th scope="row" className="w-1/3 bg-sky/20 px-4 py-2 align-top font-semibold">
                            {s.label}
                          </th>
                          <td className="px-4 py-2">{s.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Section>
            )}

            <Section id="applications" title="Intended laboratory applications" source="manufacturer">
              {p.applications.length > 0 ? <List items={p.applications} /> : <p className="text-ink/75">No applications have been listed for this product yet.</p>}
            </Section>

            <Section id="assessment" title="Advantages and limitations" source="editorial">
              {hasAssessment ? (
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="text-lg">Advantages</h3>
                    <div className="mt-2">{p.advantages.length ? <List items={p.advantages} /> : <p className="text-ink/70">None listed.</p>}</div>
                  </div>
                  <div>
                    <h3 className="text-lg">Limitations</h3>
                    <div className="mt-2">{p.limitations.length ? <List items={p.limitations} /> : <p className="text-ink/70">None listed.</p>}</div>
                  </div>
                </div>
              ) : (
                <p className="text-ink/75">The VierApparatus editors have not yet assessed this product&apos;s advantages and limitations.</p>
              )}
            </Section>

            <Section id="documentation" title="Technical documentation and manufacturer links" source="manufacturer">
              {links.length > 0 ? (
                <ul className="space-y-1.5">
                  {links.map((l, i) => (
                    <li key={i}>
                      <a href={l.url} target="_blank" rel="noopener noreferrer nofollow" className="font-semibold text-brand underline underline-offset-4">
                        {l.label}
                      </a>{" "}
                      <span className="text-sm text-ink/60">(external site)</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-ink/75">No documentation links have been added to this entry yet.</p>
              )}
              {p.references.length > 0 && (
                <div className="mt-5">
                  <h3 className="text-lg">References</h3>
                  <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-[0.95rem]">
                    {p.references.map((r, i) => (
                      <li key={i}>
                        {r.text}
                        {r.url && (
                          <>
                            {" "}
                            <a href={r.url} target="_blank" rel="noopener noreferrer nofollow" className="break-all text-brand underline underline-offset-4">
                              {r.url}
                            </a>
                          </>
                        )}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </Section>

            <Section id="review" title="Editorial review" source="editorial">
              {p.editorialReview ? (
                <div className="max-w-3xl space-y-3">
                  {paragraphs(p.editorialReview).map((t, i) => (
                    <p key={i}>{t}</p>
                  ))}
                  <p className="text-sm text-ink/60">Last updated {date(p.updatedAt)}.</p>
                </div>
              ) : (
                <p className="max-w-3xl text-ink/75">
                  This product has not been editorially reviewed yet. Its entry shows the information the manufacturer provides; inclusion is not an endorsement.
                </p>
              )}
            </Section>

            <Section id="feedback" title="Community feedback" source="readers">
              <p className="max-w-3xl text-sm text-ink/70">
                Comments come from readers and are published after review. They are individual experiences, not tests by VierApparatus. A <span className="font-semibold">verified affiliation</span> means an editor checked it; anything else is what the commenter wrote about themselves.
              </p>
              {comments.length === 0 ? (
                <p className="mt-4 rounded-xl border border-dashed border-ink/25 p-5 text-ink/75">There are no comments on this product yet.</p>
              ) : (
                <ul className="mt-5 space-y-5">
                  {comments.map((c) => (
                    <li key={c.id} className="rounded-xl border border-ink/10 p-5">
                      <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                        <strong>{c.displayName}</strong>
                        {(c.role || c.affiliation) && (
                          <span className="text-sm text-ink/75">
                            {[c.role, c.affiliation].filter(Boolean).join(", ")}
                            {c.affiliationVerified ? <span className="ml-1.5 rounded-full bg-brand px-2 py-0.5 text-xs font-semibold text-white">Verified affiliation</span> : <span className="ml-1.5 text-xs text-ink/55">(not verified)</span>}
                          </span>
                        )}
                      </p>
                      <p className="mt-1 text-sm text-ink/65">
                        {c.rating ? (
                          <>
                            <Stars value={c.rating} /> <span className="sr-only">{c.rating} out of 5. </span>
                          </>
                        ) : null}
                        <time dateTime={c.createdAt}>{date(c.createdAt)}</time>
                      </p>
                      <div className="mt-3 space-y-2">
                        {paragraphs(c.body).map((t, i) => (
                          <p key={i}>{t}</p>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-8 max-w-3xl">
                <h3 className="text-xl">Add your comment</h3>
                <div className="mt-4">
                  <CommentForm slug={p.slug} />
                </div>
              </div>
            </Section>

            {related.length > 0 && (
              <section aria-labelledby="related" className="border-t border-ink/10 pt-8">
                <h2 id="related" className="text-2xl sm:text-3xl">
                  Related products
                </h2>
                <ul className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {related.map((r) => (
                    <li key={r.id}>
                      <ProductCard product={r} rating={relatedRatings.get(r.id)} />
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </article>
    </>
  );
}
