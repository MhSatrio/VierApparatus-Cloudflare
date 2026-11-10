import { InquiryForm } from "./InquiryForm";
import { productContact, whatsappLink } from "@/lib/product-contact";
import { site } from "@/lib/site";
import type { INQUIRY_TYPES } from "@/lib/inquiry";

type Props = {
  title?: string;
  text?: string;
  defaultProduct?: string;
  defaultType?: (typeof INQUIRY_TYPES)[number];
  id?: string;
};

/** Compact inquiry section placed near the bottom of every page, before the footer. */
export function InquiryCta({
  title = "Tell Us What Your Laboratory Needs.",
  text = "Share the equipment, specifications or quantities you are looking for. If it is not in our catalogue, we can still source it for you.",
  defaultProduct,
  defaultType,
  id = "inquiry",
}: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="bg-sky py-16 sm:py-20">
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-14">
        <div>
          <p className="eyebrow">Request a quotation</p>
          <h2 id={`${id}-title`} className="mt-3 text-3xl sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-md">{text}</p>
          <ul className="mt-6 space-y-2 text-[0.95rem]">
            <li>
              Email:{" "}
              <a className="font-medium text-brand underline" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
            <li>
              WhatsApp:{" "}
              <a className="font-medium text-brand underline" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                {productContact.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-card sm:p-8">
          <InquiryForm variant="compact" defaultProduct={defaultProduct} defaultType={defaultType} />
        </div>
      </div>
    </section>
  );
}
