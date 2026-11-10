import type { Metadata } from "next";
import { InquiryForm } from "@/components/InquiryForm";
import { INQUIRY_TYPES } from "@/lib/inquiry";
import { site, whatsappLink } from "@/lib/site";

type SP = Promise<{ [k: string]: string | string[] | undefined }>;
const one = (v: string | string[] | undefined) => ((Array.isArray(v) ? v[0] : v) ?? "").slice(0, 300);

export const metadata: Metadata = {
  title: "Contact & Request a Quotation",
  description:
    "Request a quotation or discuss a laboratory equipment sourcing requirement with VierApparatus. Email, WhatsApp or use the inquiry form.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const product = one(sp.product).replace(/[\u0000-\u001F\u007F]/g, " ");
  return (
    <>
      <section className="bg-sky/50 py-12 sm:py-16">
        <div className="container-page">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-3 text-4xl sm:text-5xl">Tell us what your laboratory needs</h1>
          <p className="mt-4 max-w-2xl text-lg text-ink/85">
            Request a quotation, ask about a product, discuss technical specifications or explore a partnership. Equipment
            that is not in our catalogue can be requested too.
          </p>
        </div>
      </section>
      <section className="bg-white py-12 sm:py-16">
        <div className="container-page grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <h2 className="text-2xl">Inquiry form</h2>
            <div className="mt-6 rounded-2xl border border-ink/10 p-5 shadow-card sm:p-8">
              <InquiryForm
                variant="full"
                defaultProduct={product}
                defaultType={product ? INQUIRY_TYPES[0] : undefined}
              />
            </div>
          </div>
          <aside aria-labelledby="direct-title">
            <h2 id="direct-title" className="text-2xl">
              Contact directly
            </h2>
            <dl className="mt-6 space-y-6">
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wider text-brand">Email</dt>
                <dd className="mt-1">
                  <a className="underline" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wider text-brand">Phone / WhatsApp</dt>
                <dd className="mt-1">
                  <a className="underline" href={`tel:${site.phoneTel}`}>
                    {site.phoneDisplay}
                  </a>
                  <br />
                  <a className="btn btn-secondary btn-sm mt-3" href={whatsappLink("Hello VierApparatus, I would like to discuss a laboratory equipment requirement.")} target="_blank" rel="noopener noreferrer">
                    Chat on WhatsApp
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wider text-brand">Location</dt>
                <dd className="mt-1">{site.address}</dd>
              </div>
            </dl>
            <p className="mt-8 rounded-lg bg-sky p-4 text-sm">
              Form submissions are sent over HTTPS and processed server-side before being emailed to us. Ordinary email is
              not end-to-end encrypted, so please do not include passwords or highly sensitive information in your message.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
