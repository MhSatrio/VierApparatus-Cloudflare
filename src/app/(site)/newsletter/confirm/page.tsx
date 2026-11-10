import type { Metadata } from "next";

export const metadata: Metadata = { title: "Confirm your subscription", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

/** The link from the confirmation e-mail. It does not confirm on its own: the reader presses the button (so link scanners
 *  that open every link do not subscribe people). */
export default async function ConfirmPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="container-page max-w-2xl">
        <p className="eyebrow">Newsletter</p>
        <h1 className="mt-3 text-3xl sm:text-4xl">Confirm your subscription</h1>
        {token ? (
          <form method="post" action="/api/newsletter/confirm" className="mt-6 space-y-4">
            <input type="hidden" name="token" value={token} />
            <p className="text-lg text-ink/85">Press the button to start receiving the VierApparatus newsletter. You can unsubscribe at any time.</p>
            <button type="submit" className="btn btn-primary">
              Confirm my subscription
            </button>
          </form>
        ) : (
          <p className="mt-6 text-lg text-ink/85">This page needs the link from your confirmation e-mail.</p>
        )}
      </div>
    </section>
  );
}
