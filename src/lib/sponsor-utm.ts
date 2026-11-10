/**
 * Sponsor links. Every sponsor link gets the same UTM tags so the campaign shows up in the analytics as "sponsorship".
 * Other query parameters the destination already has are kept; any UTM tags it already carries are replaced, never doubled.
 * Pure: no database, usable in the browser and on the server.
 */
export const SPONSOR_UTM_SOURCE = "vierapparatus";
export const SPONSOR_UTM_MEDIUM = "sponsorship";

const CAMPAIGN = /^[a-z0-9][a-z0-9_-]{0,59}$/;

/** A campaign tag made from a name: lower case, letters, digits, dashes. Empty when the name has nothing usable in it. */
export function campaignTag(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 60);
}

export const isCampaignTag = (s: string) => CAMPAIGN.test(s);

/** Accepts an HTTPS address only. Returns the address with the sponsor UTM tags, or null when it is not a usable HTTPS address. */
export function withSponsorUtm(destination: string, campaign: string): string | null {
  let u: URL;
  try {
    u = new URL(destination.trim());
  } catch {
    return null;
  }
  if (u.protocol !== "https:" || !u.hostname || u.username || u.password) return null;
  for (const key of ["utm_source", "utm_medium", "utm_campaign"]) u.searchParams.delete(key);
  u.searchParams.set("utm_source", SPONSOR_UTM_SOURCE);
  u.searchParams.set("utm_medium", SPONSOR_UTM_MEDIUM);
  if (campaign) u.searchParams.set("utm_campaign", campaign);
  return u.toString();
}
