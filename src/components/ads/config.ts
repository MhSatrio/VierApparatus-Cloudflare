/**
 * Google AdSense settings, read at build time. Nothing is shown and nothing is loaded unless ALL of these are set:
 *
 *   NEXT_PUBLIC_ADSENSE_ENABLED=true          the switch (keep it off until a consent platform is in place, see docs)
 *   NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-…       your publisher ID from the AdSense account
 *   NEXT_PUBLIC_ADSENSE_SLOT_VERTICAL=…       ad unit ID for the vertical container (optional)
 *   NEXT_PUBLIC_ADSENSE_SLOT_SQUARE=…         ad unit ID for the square container (optional)
 *
 * Responsive units: the units use Google's "auto" format inside a container that takes the column width, so they resize with the
 * screen. The 300 × 600 format is the preferred size for the vertical container when there is room for it.
 */
export const ADSENSE = {
  enabled: process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true",
  client: process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "",
  verticalSlot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_VERTICAL ?? "",
  squareSlot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SQUARE ?? "",
};

/** True only when the switch, the publisher ID and at least one ad unit are configured. */
export const adsenseReady = ADSENSE.enabled && /^ca-pub-\d{10,20}$/.test(ADSENSE.client) && (ADSENSE.verticalSlot !== "" || ADSENSE.squareSlot !== "");

/**
 * The publisher ID when it is well formed, otherwise null. Used by the Google verification script (every page), the
 * google-adsense-account meta tag and /ads.txt. Unlike adsenseReady it does not need the switch or any ad unit: verifying the
 * site with Google does not show ads.
 */
export const adsensePublisher: string | null = /^ca-pub-\d{10,20}$/.test(ADSENSE.client) ? ADSENSE.client : null;
