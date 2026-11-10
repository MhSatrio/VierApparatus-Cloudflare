import type { Metadata } from "next";

export const metadata: Metadata = { title: "Unsubscribe", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

/** The unsubscribe link from a newsletter. One press removes the address from the list. */
export default async function UnsubscribePage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="container-page max-w-2xl">
        <p className="eyebrow">Newsletter</p>
        <h1 className="mt-3 text-3xl sm:text-4xl">Unsubscribe</h1>
        {token ? (
          <form method="post" action="/api/newsletter/unsubscribe" className="mt-6 space-y-4">
            <input type="hidden" name="token" value={token} />
            <p className="text-lg text-ink/85">Remove this e-mail address from the VierApparatus newsletter?</p>
            <button type="submit" className="btn btn-primary">
              Unsubscribe
            </button>
          </form>
        ) : (
          <p className="mt-6 text-lg text-ink/85">This page needs the link from a VierApparatus newsletter.</p>
        )}
      </div>
    </section>
  );
}
