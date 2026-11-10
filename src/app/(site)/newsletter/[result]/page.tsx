import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = { robots: { index: false, follow: false } };

const RESULTS: Record<string, { title: string; text: string }> = {
  confirmed: { title: "You are subscribed", text: "Thank you. You will receive the VierApparatus newsletter from now on. You can unsubscribe from any issue." },
  unsubscribed: { title: "You are unsubscribed", text: "This address has been removed from the VierApparatus newsletter. You will not receive any more newsletters." },
  invalid: { title: "This link is no longer valid", text: "The link may be old, already used, or expired. You can subscribe again from the homepage." },
};

/** Result pages for the newsletter forms (confirmed, unsubscribed, invalid). */
export default async function NewsletterResult({ params }: { params: Promise<{ result: string }> }) {
  const r = RESULTS[(await params).result];
  if (!r) notFound();
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="container-page max-w-2xl">
        <p className="eyebrow">Newsletter</p>
        <h1 className="mt-3 text-3xl sm:text-4xl">{r.title}</h1>
        <p className="mt-6 text-lg text-ink/85">{r.text}</p>
      </div>
    </section>
  );
}
