import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { tempDb } from "./helpers";
import { campaignTag, isCampaignTag, withSponsorUtm } from "@/lib/sponsor-utm";
import { can } from "@/lib/auth/permissions";
import { createArticle } from "@/lib/store/articles";
import { createCampaign, listCampaigns, resolveSponsor, setArticleSponsorship, updateCampaign, articleSponsorInput, campaignInput } from "@/lib/store/sponsors";

describe("sponsor links (UTM)", () => {
  it("adds the VierApparatus tags and keeps the destination's own parameters", () => {
    expect(withSponsorUtm("https://example.org/offer?ref=abc", "spring_2026")).toBe("https://example.org/offer?ref=abc&utm_source=vierapparatus&utm_medium=sponsorship&utm_campaign=spring_2026");
  });
  it("replaces existing UTM tags instead of duplicating them", () => {
    const out = withSponsorUtm("https://example.org/?utm_source=old&utm_medium=email&utm_campaign=old&x=1", "new");
    expect(out).not.toBeNull();
    const u = new URL(out!);
    expect(u.searchParams.getAll("utm_source")).toEqual(["vierapparatus"]);
    expect(u.searchParams.getAll("utm_medium")).toEqual(["sponsorship"]);
    expect(u.searchParams.getAll("utm_campaign")).toEqual(["new"]);
    expect(u.searchParams.get("x")).toBe("1");
  });
  it("omits utm_campaign when there is no campaign tag", () => {
    const u = new URL(withSponsorUtm("https://example.org/", "")!);
    expect(u.searchParams.has("utm_campaign")).toBe(false);
    expect(u.searchParams.get("utm_medium")).toBe("sponsorship");
  });
  it("accepts HTTPS only and refuses credentials, odd schemes and garbage", () => {
    for (const bad of ["http://example.org", "javascript:alert(1)", "ftp://example.org", "https://user:pw@example.org", "not a url", ""]) {
      expect(withSponsorUtm(bad, "x")).toBeNull();
    }
  });
  it("makes safe campaign tags from names", () => {
    expect(campaignTag("Advertise with VierApparatus!")).toBe("advertise_with_vierapparatus");
    expect(campaignTag("Café Lab — Spring 2026")).toBe("cafe_lab_spring_2026");
    expect(isCampaignTag("spring_2026")).toBe(true);
    expect(isCampaignTag("Spring 2026")).toBe(false);
    expect(isCampaignTag("-leading")).toBe(false);
  });
});

describe("sponsor permissions", () => {
  it("is owner only: no contributor permission can grant it", () => {
    expect(can({ role: "owner", permissions: [] }, "sponsors.manage")).toBe(true);
    expect(can({ role: "contributor", permissions: ["collab.access", "articles.write", "media.upload"] }, "sponsors.manage")).toBe(false);
  });
});

describe("sponsor validation", () => {
  it("requires an HTTPS destination and an image", () => {
    expect(campaignInput.safeParse({ name: "Lab Co", imageUrl: "/media/abc123", destinationUrl: "http://lab.example" }).success).toBe(false);
    expect(campaignInput.safeParse({ name: "Lab Co", imageUrl: "javascript:x", destinationUrl: "https://lab.example" }).success).toBe(false);
    expect(campaignInput.safeParse({ name: "Lab Co", imageUrl: "/media/abc123", destinationUrl: "https://lab.example" }).success).toBe(true);
  });
  it("does not let an article sponsorship be switched on without an image and a destination", () => {
    expect(articleSponsorInput.safeParse({ enabled: true, imageUrl: "", destinationUrl: "" }).success).toBe(false);
    expect(articleSponsorInput.safeParse({ enabled: false, imageUrl: "", destinationUrl: "" }).success).toBe(true);
  });
});

describe("sponsor priority and campaigns (database)", () => {
  let cleanup: () => void;
  let articleA: string;
  let articleB: string;
  beforeAll(async () => {
    cleanup = tempDb();
    articleA = (await createArticle({ title: "First article", excerpt: "A summary that is long enough to publish.", authorName: "Muhammad Satrio", categoryId: "cat_microbiology", doc: { version: 1, blocks: [] }, tags: [], featured: false, source: "editor" } as never, { id: null, name: "Owner" })).id;
    articleB = (await createArticle({ title: "Second article", excerpt: "A summary that is long enough to publish.", authorName: "Muhammad Satrio", categoryId: "cat_microbiology", doc: { version: 1, blocks: [] }, tags: [], featured: false, source: "editor" } as never, { id: null, name: "Owner" })).id;
  });
  afterAll(() => cleanup());

  it("shows nothing when there is no sponsor at all (the column is not drawn)", async () => {
    expect(await resolveSponsor(articleA)).toBeNull();
  });

  it("shows the active campaign on every article, with the UTM tags", async () => {
    const c = await createCampaign({ name: "Lab Supplies", imageUrl: "/media/lab1", destinationUrl: "https://supplies.example/shop", active: true });
    expect(c.campaign).toBe("lab_supplies");
    const r = await resolveSponsor(articleB);
    expect(r).toMatchObject({ source: "campaign", imageUrl: "/media/lab1" });
    expect(r!.href).toContain("utm_campaign=lab_supplies");
  });

  it("makes only one campaign active at a time", async () => {
    const second = await createCampaign({ name: "Second Sponsor", imageUrl: "/media/lab2", destinationUrl: "https://second.example/", active: true });
    const all = await listCampaigns();
    expect(all.filter((x) => x.active).map((x) => x.id)).toEqual([second.id]);
    await updateCampaign(second.id, { name: "Second Sponsor", imageUrl: "/media/lab2", destinationUrl: "https://second.example/", campaign: "", active: false });
    expect(await resolveSponsor(articleB)).toBeNull();
  });

  it("an article's own sponsorship wins over the campaign, and a disabled one falls back to it", async () => {
    await updateCampaign((await listCampaigns())[0].id, { name: "Lab Supplies", imageUrl: "/media/lab1", destinationUrl: "https://supplies.example/shop", campaign: "", active: true });
    await setArticleSponsorship(articleA, { enabled: true, imageUrl: "/media/article9", destinationUrl: "https://article.example/offer", campaign: "spring" });
    const own = await resolveSponsor(articleA);
    expect(own).toMatchObject({ source: "article", imageUrl: "/media/article9" });
    expect(own!.href).toContain("utm_campaign=spring");
    await setArticleSponsorship(articleA, { enabled: false, imageUrl: "/media/article9", destinationUrl: "https://article.example/offer", campaign: "spring" });
    expect((await resolveSponsor(articleA))?.source).toBe("campaign");
  });

  it("refuses an invalid article sponsorship and keeps the previous one", async () => {
    await expect(setArticleSponsorship(articleB, { enabled: true, imageUrl: "", destinationUrl: "" })).rejects.toThrow();
    expect((await resolveSponsor(articleB))?.source).toBe("campaign");
  });
});
