import type { Metadata, Viewport } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";
import { GoogleAnalytics } from "@next/third-parties/google";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";

// Futura Md BT is a commercial typeface and is not licensed for this project. Jost is an open-source
// (SIL OFL) geometric sans in the Futura tradition, self-hosted by next/font (no runtime request to Google).
const jost = Jost({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap", variable: "--font-jost" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "VierApparatus | Laboratory Equipment Sourcing & Procurement",
    template: "%s | VierApparatus",
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    title: "VierApparatus | Laboratory Equipment Sourcing & Procurement",
    description: site.tagline,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#4570B6", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jost.variable}>
      <body>
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
            telephone: site.phoneTel,
            description: site.description,
            founder: { "@type": "Person", name: site.founder },
            address: {
              "@type": "PostalAddress",
              streetAddress: "Jl. Padang Udayana Gg. X, Padangsambian, Denpasar Barat",
              addressLocality: "Denpasar",
              addressRegion: "Bali",
              postalCode: "80117",
              addressCountry: "ID",
            },
          }}
        />
        <AnalyticsTracker />
        <GoogleAnalytics gaId="G-3EYB2NLNTF" />
      </body>
    </html>
  );
}