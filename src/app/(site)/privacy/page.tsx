import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy notice",
  description: "What VierApparatus collects when you read the site or send a message, how it is used, how long it is kept, and how to ask for access or deletion.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="container-page">
        <h1 className="text-4xl">Privacy notice</h1>
        <div className="prose-article mt-8">
          <p>
            This is a plain-language summary of what {site.name} collects and why. It is written for readers, not lawyers, and it should be reviewed against the data-protection rules that apply to you and to us.
          </p>
          <h2>Reading the site</h2>
          <p>
            We count visits with our own, simple analytics. For each page view we record the page, the referring site, any campaign tags in the link (utm_*), your country (and city, when the hosting platform provides it), device type and browser family, and how long you stayed and how far you scrolled. We do <strong>not</strong> store your IP address, and we use no advertising or third-party tracking scripts.
          </p>
          <p>
            To count a returning visitor once a day without cookies, we compute a short code from your IP address, browser and the date, using a secret key. The code changes every day and cannot be turned back into your address or linked to earlier days. We send nothing at all if your browser sends a Do Not Track or Global Privacy Control signal. Raw analytics records are deleted after about 400 days.
          </p>
          <h2>Messages and proposals</h2>
          <p>
            When you use the contact or contributor form we receive what you type: your name, e-mail address, message, and any link or file you attach. A screenshot or article draft is stored privately and is only visible to the editor. We use this information only to reply to you and to review your proposal. We do not sell it or share it with advertisers. Your IP address is used briefly, in hashed form, to limit spam and abuse.
          </p>
          <p>
            Messages are stored in our database and forwarded by e-mail to {site.email} through a transactional e-mail provider. Ordinary e-mail is not end-to-end encrypted, so please avoid sending passwords or highly sensitive information.
          </p>
          <h2>Contributor accounts</h2>
          <p>
            Contributors who are invited to write for us have an account with their name, e-mail address and a salted, hashed password. Sessions use a secure cookie that is needed to keep you signed in. These are used only for the editorial area.
          </p>
          <h2>Retention and your choices</h2>
          <p>
            Messages and proposals are kept while they are needed to handle your request and for editorial records, then deleted. You can ask us to access, correct or delete what we hold about you at any time by writing to <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
          <h2>Advertising and cookies</h2>
          <p>
            We plan to show advertising to help fund the site. When advertising is enabled, it is served by Google AdSense. Google and its partners may then use cookies, and similar technologies, to show ads based on your earlier visits to this site and to other sites. Google’s own explanation of this is at policies.google.com/technologies/partner-sites, and you can control personalised ads in Google’s Ads Settings at adssettings.google.com.
          </p>
          <p>
            Visitors in the European Economic Area, the United Kingdom and Switzerland will be asked for consent before personalised advertising cookies are set, through a consent tool that is shown on their first visit. Our own visit counting, described above, does not use advertising cookies and is not shared with advertisers.
          </p>
          <p>
            Terms for the use of the site, including advertising and links to other sites, are in our <a href="/terms">terms of use</a>.
          </p>
          <h2>Contact</h2>
          <p>
            {site.name} · <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>
      </div>
    </section>
  );
}
