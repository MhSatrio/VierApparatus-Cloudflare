import type { Metadata, Viewport } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

// Jost is an open-source (SIL OFL) geometric sans in the Futura tradition, self-hosted by next/font at build time
// (no request to Google when a visitor loads the page).
const jost = Jost({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap", variable: "--font-jost" });

const title = "VierApparatus | Science should be accessible";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: "%s | VierApparatus" },
  description: site.description,
  applicationName: site.name,
  openGraph: { type: "website", siteName: site.name, locale: "en_US", title, description: site.description },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/", types: { "application/rss+xml": "/rss.xml" } },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#4570B6", width: "device-width", initialScale: 1 };

/** The root layout is deliberately bare: the public site (site)/layout and the admin area add their own chrome. */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jost.variable}>
      <body>{children}</body>
    </html>
  );
}
