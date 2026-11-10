import Script from "next/script";
import { AdColumn, SponsorBox } from "@/components/ads/AdColumn";
import { AdSlot } from "@/components/ads/AdSlot";
import { ADSENSE, adsenseReady } from "@/components/ads/config";
import { resolveSponsor, type ResolvedSponsor } from "@/lib/store/sponsors";

/**
 * Advertising and sponsorship for the learning platform. It is used on the subject pages and the academic-level (contents) pages,
 * and NOWHERE else: no lesson, chapter or reading page imports this file (a test checks that).
 *
 * A page calls loadLandingAds() first, to know whether there is anything to show, and only then reserves a column for it. When there
 * is no advertisement and no sponsor, nothing is drawn at all, so no empty box is ever left behind.
 */
export type LandingAdsData = { adsense: boolean; sponsor: ResolvedSponsor | null };

export async function loadLandingAds(): Promise<LandingAdsData & { any: boolean }> {
  const sponsor = await resolveSponsor(null);
  return { adsense: adsenseReady, sponsor, any: adsenseReady || sponsor !== null };
}

export function LandingAds({ ads }: { ads: LandingAdsData }) {
  if (!ads.adsense && !ads.sponsor) return null;
  return (
    <>
      {ads.adsense && <Script src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE.client}`} crossOrigin="anonymous" strategy="afterInteractive" />}
      <AdColumn>
        <div className="space-y-6">
          {ads.adsense && ADSENSE.verticalSlot && <AdSlot slot={ADSENSE.verticalSlot} label="Advertisement, vertical" />}
          {ads.adsense && ADSENSE.squareSlot && <AdSlot slot={ADSENSE.squareSlot} label="Advertisement, square" />}
          {ads.sponsor && <SponsorBox href={ads.sponsor.href} imageUrl={ads.sponsor.imageUrl} name={ads.sponsor.campaign || "Sponsor"} />}
        </div>
      </AdColumn>
    </>
  );
}
