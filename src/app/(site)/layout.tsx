import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { Tracker } from "@/components/Tracker";
import { AdsenseScript } from "@/components/AdsenseScript";
import { NewsletterPopup } from "@/components/newsletter/NewsletterPopup";
import { site } from "@/lib/site";
import { listCategoriesCached } from "@/lib/store/categories";
import { getPopupSettingsCached } from "@/lib/store/newsletter-settings";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  // The popup is off unless the owner has switched it on; its topic list comes from the same topics as the articles. Both reads are
  // kept for a minute per server instance, and the topic list is only fetched when the popup is on, so a normal render makes no
  // database call here at all (it used to make two on every page).
  const popup = await getPopupSettingsCached();
  const topics = popup.enabled ? await listCategoriesCached() : [];
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
        }}
      />
      {popup.enabled && <NewsletterPopup title={popup.title} message={popup.message} topics={topics.map((t) => t.name)} />}
      <Tracker />
      <AdsenseScript />
    </>
  );
}
