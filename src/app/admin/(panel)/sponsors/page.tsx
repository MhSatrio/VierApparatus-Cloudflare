import { SponsorCampaigns } from "@/components/admin/sponsor/SponsorCampaigns";
import { PageTitle } from "@/components/admin/ui";
import { requirePage } from "@/lib/auth/guard";
import { listCampaigns } from "@/lib/store/sponsors";

/** Owner only. Site-wide sponsor campaigns; per-article sponsorship is set in each article's Details and SEO tab. */
export default async function SponsorsPage() {
  await requirePage({ action: "sponsors.manage" });
  const campaigns = await listCampaigns();
  return (
    <>
      <PageTitle title="Sponsor Management" sub="Sponsors are labelled “Sponsored” and link out with UTM tags added (utm_source=vierapparatus, utm_medium=sponsorship). An article's own sponsor replaces the active campaign on that article." />
      <SponsorCampaigns
        initial={campaigns.map((c) => ({ id: c.id, name: c.name, imageUrl: c.imageUrl, destinationUrl: c.destinationUrl, campaign: c.campaign, active: c.active }))}
      />
    </>
  );
}
