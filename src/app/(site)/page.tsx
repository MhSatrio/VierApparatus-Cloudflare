import Link from "next/link";
import { ArticleCard, formatDate } from "@/components/ArticleCard";
import { SafeImage } from "@/components/SafeImage";
import { brand } from "@/lib/brand";
import { getFeatured, listPublished } from "@/lib/store/articles";
import { listCategories } from "@/lib/store/categories";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [featured, latest, topics] = await Promise.all([getFeatured(), listPublished({ perPage: 7 }), listCategories({ onlyWithArticles: true })]);
  const rest = latest.items.filter((a) => a.id !== featured?.id).slice(0, 6);

  return (
    <>
      <section className="bg-white py-16 sm:py-24">
        <div className="container-page max-w-4xl">
          <p className="eyebrow">Independent science publication</p>
          <h1 className="mt-4 text-4xl sm:text-6xl">Science should be accessible.</h1>
          <p className="mt-6 max-w-2xl text-xl text-ink/85">{brand.homeStatement}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/articles" className="btn btn-primary">
              Read the articles
            </Link>
            <Link href="/about" className="btn btn-secondary">
              About VierApparatus
            </Link>
          </div>
        </div>
      </section>

      {featured ? (
        <section aria-labelledby="featured-title" className="bg-sky/40 py-14 sm:py-20">
          <div className="container-page">
            <p className="eyebrow">Featured</p>
            <div className="mt-4 grid items-center gap-8 lg:grid-cols-2">
              <Link href={`/articles/${featured.slug}`} tabIndex={-1} aria-hidden="true" className="relative block aspect-[16/10] overflow-hidden rounded-xl border border-ink/10 bg-white">
                <SafeImage src={featured.coverUrl} alt="" sizes="(min-width:1024px) 560px, 95vw" priority fit="cover" />
              </Link>
              <div>
                <p className="text-sm text-ink/70">
                  {featured.categoryName && <span className="font-semibold text-brand">{featured.categoryName}</span>}
                  {featured.categoryName && " · "}
                  {featured.publishedAt && <time dateTime={featured.publishedAt}>{formatDate(featured.publishedAt)}</time>} · {featured.readingMinutes} min read
                </p>
                <h2 id="featured-title" className="mt-3 text-3xl sm:text-4xl">
                  <Link href={`/articles/${featured.slug}`} className="hover:text-brand">
                    {featured.title}
                  </Link>
                </h2>
                <p className="mt-4 text-lg text-ink/85">{featured.excerpt}</p>
                <p className="mt-6">
                  <Link href={`/articles/${featured.slug}`} className="btn btn-primary">
                    Read the article
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-sky/40 py-14 sm:py-20">
          <div className="container-page max-w-3xl">
            <p className="eyebrow">Coming soon</p>
            <h2 className="mt-3 text-3xl">The first articles are on their way.</h2>
            <p className="mt-4 text-lg text-ink/85">Nothing is published yet. Write to {`info@vierapparatus.com`} if you would like to be told when it is, or propose an article of your own.</p>
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section aria-labelledby="latest-title" className="bg-white py-14 sm:py-20">
          <div className="container-page">
            <div className="flex items-end justify-between gap-4">
              <h2 id="latest-title" className="text-3xl sm:text-4xl">
                Latest articles
              </h2>
              <Link href="/articles" className="font-semibold text-brand underline underline-offset-4">
                All articles
              </Link>
            </div>
            <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((a) => (
                <li key={a.id}>
                  <ArticleCard article={a} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {topics.length > 0 && (
        <section aria-labelledby="topics-title" className="bg-white pb-14 sm:pb-20">
          <div className="container-page">
            <h2 id="topics-title" className="text-3xl">
              Browse by topic
            </h2>
            <ul className="mt-6 flex flex-wrap gap-3">
              {topics.map((t) => (
                <li key={t.id}>
                  <Link href={`/topics/${t.slug}`} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/20 px-4 hover:border-brand hover:text-brand">
                    {t.name}
                    <span className="text-sm text-ink/60">{t.articleCount}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section aria-labelledby="standards-title" className="bg-white py-14 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Editorial approach</p>
            <h2 id="standards-title" className="mt-3 text-3xl sm:text-4xl">
              Fact, interpretation and opinion are labelled.
            </h2>
            <p className="mt-4 text-lg text-ink/85">
              Good science writing tells you how much to trust each sentence. Articles here mark what is well established, what is still emerging, and what is the author&apos;s own view.
            </p>
            <p className="mt-6">
              <Link href="/about#how-we-write" className="font-semibold text-brand underline underline-offset-4">
                How we label what we say
              </Link>
            </p>
          </div>
          <ul className="space-y-4">
            {brand.labels.map((l) => (
              <li key={l.name} className="border-l-4 border-sky pl-4">
                <p className="font-semibold">{l.name}</p>
                <p className="text-ink/85">{l.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-label="Sapere aude" className="bg-ink py-14 text-white sm:py-20">
        <div className="container-page max-w-3xl text-center">
          <p className="text-3xl italic sm:text-4xl">{brand.sapere.quote}</p>
          <p className="mt-2 text-xl text-sky">{brand.sapere.translation}</p>
          <p className="mx-auto mt-5 max-w-xl text-white/80">{brand.sapere.explanation}</p>
        </div>
      </section>

      <section aria-labelledby="contribute-title" className="bg-sky/40 py-14 sm:py-20">
        <div className="container-page max-w-3xl">
          <p className="eyebrow">Contribute</p>
          <h2 id="contribute-title" className="mt-3 text-3xl sm:text-4xl">
            Have something to explain?
          </h2>
          <p className="mt-4 text-lg text-ink/85">
            If you work in or around science and can explain something well, send us a proposal. Every submission is read and reviewed by the editor before anything is published, and a proposal is not a promise of publication.
          </p>
          <p className="mt-6">
            <Link href="/contribute" className="btn btn-primary">
              Join as contributor
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
