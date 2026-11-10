import Link from "next/link";
import type { Metadata } from "next";
import { InquiryCta } from "@/components/InquiryCta";
import { ServiceGrid } from "@/components/ServiceGrid";

export const metadata: Metadata = {
title: "About Us: Laboratory Equipment Sourcing",
description:
"Source centrifuges, laboratory freezers, biosafety cabinets, autoclaves and microscopes. VierApparatus coordinates sourcing, quotations and procurement.",
alternates: { canonical: "/about" },
};


export default function AboutPage() {
  return (
    <>
      <section className="bg-white py-14 sm:py-20">
        <div className="container-page max-w-4xl">
          <p className="eyebrow">About</p>
          <h1 className="mt-3 text-4xl sm:text-5xl">About VierApparatus</h1>
          <div className="mt-8 space-y-5 text-lg text-ink/90">
            <p>
              VierApparatus is a laboratory equipment sourcing and procurement partner helping organizations identify,
              evaluate, and purchase equipment from suppliers around the world.
            </p>
            <p>
              Laboratory procurement can involve more than finding a product at an acceptable price. Buyers may need to
              verify specifications, compare supplier quotations, assess documentation, coordinate quality checks, navigate
              import requirements, and manage logistics across multiple parties. Our role is to simplify this process by
              bringing these activities together through one sourcing partner.
            </p>
            <p>
              Whether you need a specific instrument, a complete laboratory setup, or help finding a product that is
              difficult to source locally, we can help assess the requirement and explore suitable options.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="approach-title" className="bg-white py-14 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Our approach</p>
            <h2 id="approach-title" className="mt-3 text-3xl">
              Sourcing and procurement, step by step.
            </h2>
            <p className="mt-4 text-ink/90">
              Our approach is straightforward: understand the requirement, identify appropriate suppliers, compare available
              options, coordinate the necessary checks and documentation, and support the purchasing process through the agreed
              delivery arrangements.
            </p>
            <ul className="mt-5 list-disc space-y-2 pl-5 text-ink/90">
              <li>Clarify the application, specifications, quantity and delivery location.</li>
              <li>Approach suitable suppliers and obtain comparable quotations.</li>
              <li>Present options with the trade-offs explained in plain language.</li>
              <li>Coordinate documents, checks and shipping with the parties involved.</li>
            </ul>
          </div>
          <div>
            <p className="eyebrow">Technical requirements &amp; due diligence</p>
            <h2 className="mt-3 text-3xl">Clear specifications, verified information.</h2>
            <p className="mt-4 text-ink/90">
              We help turn a research need into a specification suppliers can quote against, and we review the information and
              documents suppliers provide, such as company details, product datasheets and test reports, before you commit to an
              order. Where an independent inspection is needed, we coordinate it with an appropriate third party.
            </p>
            <p className="mt-4 text-sm text-ink/75">
              VierApparatus delivers structured due diligence, documentation review, and cross-party coordination to support procurement, compliance, and risk assessment.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="intl-title" className="bg-sky/50 py-14 sm:py-20">
        <div className="container-page max-w-4xl">
          <p className="eyebrow">International sourcing</p>
          <h2 id="intl-title" className="mt-3 text-3xl sm:text-4xl">
            Working with suppliers and partners internationally.
          </h2>
          <p className="mt-4 text-lg text-ink/90">
            We work with suppliers and manufacturers in different countries, and support buyers in several regions. Import,
            export and customs requirements differ by country and product, so we coordinate with specialist logistics and
            customs partners rather than replacing them. Our current catalogue is drawn from a manufacturer&apos;s product range,
            and we can approach other suppliers for equipment that is not listed.
          </p>
        </div>
      </section>

      <section aria-labelledby="services-title" className="bg-white py-14 sm:py-20">
        <div className="container-page">
          <h2 id="services-title" className="text-3xl sm:text-4xl">
            What we do.
          </h2>
          <ServiceGrid />
          <p className="mt-8">
            <Link href="/products" className="btn btn-secondary">
              Explore products
            </Link>
          </p>
        </div>
      </section>

      <InquiryCta title="Discuss Your Procurement Requirements." text="Tell us about your laboratory, the equipment you need or the sourcing challenge you are facing, and we will explore suitable options with you." />
    </>
  );
}
