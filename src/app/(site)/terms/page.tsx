import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "The rules for reading and using VierApparatus, what our content is and is not, how to submit material, and how to contact us.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="container-page">
        <h1 className="text-4xl">Terms of use</h1>
        <div className="prose-article mt-8">
          <p>
            These terms apply when you use {site.name}. By reading the site, you agree to them. If you do not agree, please stop using the site.
          </p>
          <h2>What the content is</h2>
          <p>
            Our articles, module lessons, product pages and reviews are written to inform and to explain research. They are not medical, legal, safety or purchasing advice. Product information comes from manufacturers and distributors unless we say otherwise, and it can change. Check the current specification with the supplier before you buy or rely on it for work.
          </p>
          <p>
            Scientific findings change. An article describes the evidence at the time it was written, and we update or correct it when we learn more. Where a claim depends on a single study, we say so.
          </p>
          <h2>Using the site</h2>
          <p>
            You may read, print and share our pages for personal, educational and non-commercial use, with a link back to the original page. Please do not copy whole articles or product pages to republish them elsewhere, and do not use our content to train models or build databases without written permission.
          </p>
          <p>
            Do not attempt to break into the site, overload it, or interfere with other readers. Automated access that goes beyond ordinary search indexing needs our prior agreement.
          </p>
          <h2>Contributions</h2>
          <p>
            If you send us a message, a comment, an article or an image, you give us permission to read it, store it and, where it is published, display it with your name if you wish. You confirm that you own the material or have the right to share it, and that it does not infringe anyone else’s rights. We may edit, decline or remove contributions, and we will not publish anything that is defamatory, unlawful or misleading.
          </p>
          <h2>Advertising and links</h2>
          <p>
            We may show advertising to help pay for the site. Advertising is served by third parties, and how it is personalised is explained in our privacy notice. We do not endorse advertised products. The site also links to other websites that we do not control, and we are not responsible for their content or practices.
          </p>
          <h2>Our content and trademarks</h2>
          <p>
            The text, design and images on the site are ours or are used under licence, and are protected by copyright. Third-party names, logos and product images belong to their owners and appear for identification only. Images credited to a third party remain under the licence stated with them.
          </p>
          <h2>Liability</h2>
          <p>
            We take care with our content, but we provide the site as it is. To the extent the law allows, we are not liable for loss arising from reliance on information on the site, or from interruptions to the site. Nothing in these terms limits liability that cannot be limited by law.
          </p>
          <h2>Changes and contact</h2>
          <p>
            We may update these terms. The date of the latest change is shown when a change is made. Questions about these terms can be sent to <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
