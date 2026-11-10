import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { Tracker } from "@/components/Tracker";
import { NewsletterPopup } from "@/components/newsletter/NewsletterPopup";
import { site } from "@/lib/site";
import { listCategories } from "@/lib/store/categories";
import { getPopupSettings } from "@/lib/store/newsletter-settings";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  // The popup is off unless the owner has switched it on; its topic list comes from the same topics as the articles.
  const [popup, topics] = await Promise.all([getPopupSettings(), listCategories()]);
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-3 focus:text-white"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: site.name,
          url: site.url,
          logo: `${site.url}/icon-512.png`,
          email: site.email,
          description: site.description,
          founder: { "@type": "Person", name: site.founder },
        }}
      />
      {popup.enabled && <NewsletterPopup title={popup.title} message={popup.message} topics={topics.map((t) => t.name)} />}
      <Tracker />
    </>
  );
}
