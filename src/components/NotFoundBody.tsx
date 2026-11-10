import Link from "next/link";

export function NotFoundBody() {
  return (
    <section className="bg-white py-24">
      <div className="container-page max-w-2xl text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-3 text-4xl">We couldn&apos;t find that page.</h1>
        <p className="mt-4 text-lg">The address may have changed, or the article may have been taken down. Try the article list or browse by topic.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/articles" className="btn btn-primary">
            Read articles
          </Link>
          <Link href="/topics" className="btn btn-secondary">
            Browse topics
          </Link>
        </div>
      </div>
    </section>
  );
}
