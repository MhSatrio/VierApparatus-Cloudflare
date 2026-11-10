import Link from "next/link";
import type { ProductText } from "@/lib/store/products";

/** Paragraphs of a plain-text box. The text is the owner's, edited in the Product Manager, and is shown as text (never as HTML). */
const paragraphs = (body: string) => body.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);

/** The disclaimer at the very top of the Product page. */
export function ProductDisclaimer({ text }: { text: ProductText }) {
  return (
    <section aria-labelledby="disclaimer-title" className="rounded-2xl border-2 border-brand/40 bg-sky/40 p-6 sm:p-8">
      <h2 id="disclaimer-title" className="text-2xl">
        {text.title}
      </h2>
      <div className="mt-3 max-w-4xl space-y-3 text-[1.02rem]">
        {paragraphs(text.body).map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  );
}

/** The invitation to manufacturers and suppliers. Its button opens the existing contact form with "Product submission" already chosen. */
export function ProductInvite({ text }: { text: ProductText }) {
  const [first, ...rest] = paragraphs(text.body);
  return (
    <section aria-labelledby="invite-title" className="rounded-2xl border border-ink/15 bg-white p-6 shadow-card sm:p-8">
      <h2 id="invite-title" className="text-2xl">
        {text.title}
      </h2>
      <div className="mt-3 max-w-4xl space-y-3">
        {first && <p className="font-medium">{first}</p>}
        {rest.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <p className="mt-5">
        <Link href="/contact?type=Product%20submission" className="btn btn-primary">
          Contact us through our contact form
        </Link>
      </p>
    </section>
  );
}
