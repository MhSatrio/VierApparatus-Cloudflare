import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { INQUIRY_TYPES, type InquiryType } from "@/lib/forms";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with VierApparatus about a partnership, writing for us, a bug, a correction or any other question.",
  alternates: { canonical: "/contact" },
};

type Props = { searchParams: Promise<{ type?: string; product?: string; productPath?: string }> };

export default async function ContactPage({ searchParams }: Props) {
  const { type, product, productPath } = await searchParams;
  const initialType = INQUIRY_TYPES.find((t) => t === type) as InquiryType | undefined;
  // The "Learn more" links on a product page name the product and its address; only our own product addresses are accepted.
  const initialProduct =
    productPath && /^\/products\/[a-z0-9][a-z0-9-]{0,160}$/.test(productPath) ? { name: (product ?? "").slice(0, 200), path: productPath } : undefined;
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="container-page max-w-3xl">
        <p className="eyebrow">Contact</p>
        <h1 className="mt-3 text-4xl sm:text-5xl">Get in touch</h1>
        <p className="mt-4 text-lg text-ink/85">
          Choose what your message is about and the form adapts. You can also write directly to{" "}
          <a className="text-brand underline underline-offset-4" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
        <div className="mt-10">
          <ContactForm initialType={initialProduct ? "Quotation request" : initialType} initialProduct={initialProduct} />
        </div>
      </div>
    </section>
  );
}
