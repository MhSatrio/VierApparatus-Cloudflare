import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "What the VierApparatus inquiry form collects, how the information is used, how long it is kept, and how to ask us to access or delete it.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="container-page">
        <h1 className="text-4xl">Privacy notice</h1>
        <div className="prose-article mt-8">
          <p>
            This notice explains what personal information VierApparatus collects through this website and how it is
            used. It is a plain-language summary and should be reviewed against the data-protection rules that apply to
            your business and customers.
          </p>
          <h2>What we collect</h2>
          <p>
            When you submit the inquiry or contact form we receive the details you enter: your name, company or
            organization, business email address, country, inquiry type, optional phone or WhatsApp number, optional
            product and quantity, your message, and the page you submitted the form from. Your IP address is used
            briefly for rate limiting and abuse prevention.
          </p>
          <h2>How we use it</h2>
          <p>
            We use this information only to respond to your inquiry, prepare quotations and follow up on your
            procurement requirement. We do not sell your information and we do not use advertising trackers on this
            website.
          </p>
          <h2>How it is sent</h2>
          <p>
            The form is submitted over HTTPS and processed on our server, which sends the inquiry by email to{" "}
            {site.email} through a transactional email provider. Ordinary email is not end-to-end encrypted, so please
            avoid sending passwords or highly sensitive information.
          </p>
          <h2>Storage and retention</h2>
          <p>
            The website does not store inquiries in a database. Inquiries are kept in our email inbox and deleted when
            they are no longer needed to handle your request or to meet business and legal obligations.
          </p>
          <h2>Your choices</h2>
          <p>
            You can ask us to access, correct or delete the information you sent by emailing{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
          <h2>Contact</h2>
          <p>
            {site.name}, {site.address}.
          </p>
        </div>
      </div>
    </section>
  );
}
