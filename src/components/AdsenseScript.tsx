import { adsensePublisher } from "@/components/ads/config";

/**
 * The AdSense loader, on every public page. Google needs it on the site to verify the publisher account. It only loads when a
 * publisher ID is set at build time (NEXT_PUBLIC_ADSENSE_CLIENT). Showing ads is a separate switch (NEXT_PUBLIC_ADSENSE_ENABLED).
 */
export function AdsenseScript() {
  if (!adsensePublisher) return null;
  return <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsensePublisher}`} crossOrigin="anonymous" />;
}
