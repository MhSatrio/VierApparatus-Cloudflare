import { z } from "zod";
import { conn } from "../db/client";
import { newId } from "../crypto";
import { campaignTag, isCampaignTag, withSponsorUtm } from "../sponsor-utm";
import { b, nowIso, s, type Row } from "./util";

/**
 * Sponsorship. Two kinds of sponsor:
 *  - a site-wide campaign (sponsor_campaigns): one active campaign is shown on every article that has no sponsor of its own;
 *  - an article sponsorship (article_sponsorships): shown on that article only, and it wins over the campaign.
 * Only the owner can change either. Images are uploaded through the normal media library (/media/<id>) or are HTTPS addresses.
 */

export type Campaign = { id: string; name: string; imageUrl: string; destinationUrl: string; campaign: string; active: boolean; createdAt: string; updatedAt: string };
export type ArticleSponsorship = { articleId: string; enabled: boolean; imageUrl: string; destinationUrl: string; campaign: string; updatedAt: string | null };
export type ResolvedSponsor = { href: string; imageUrl: string; campaign: string; source: "article" | "campaign" };

const imageField = z
  .string()
  .trim()
  .max(300)
  .refine((v) => /^\/media\/[A-Za-z0-9_-]+$/.test(v) || /^https:\/\/[^\s]+$/.test(v), "Upload the sponsor image, or give an HTTPS address for it");
const destinationField = z
  .string()
  .trim()
  .max(500)
  .refine((v) => withSponsorUtm(v, "check") !== null, "The destination must be a full HTTPS address, for example https://example.org/offer");
const tagField = z
  .string()
  .trim()
  .max(60)
  .refine((v) => v === "" || isCampaignTag(v), "The campaign tag may only use lower-case letters, digits, dashes and underscores");

export const campaignInput = z.object({
  name: z.string().trim().min(2, "Name the sponsor (2+ characters)").max(80),
  imageUrl: imageField,
  destinationUrl: destinationField,
  campaign: tagField.default(""),
  active: z.boolean().default(false),
});
export type CampaignInput = z.input<typeof campaignInput>;

export const articleSponsorInput = z
  .object({
    enabled: z.boolean(),
    imageUrl: z.union([imageField, z.literal("")]).default(""),
    destinationUrl: z.union([destinationField, z.literal("")]).default(""),
    campaign: tagField.default(""),
  })
  .superRefine((v, ctx) => {
    if (v.enabled && (!v.imageUrl || !v.destinationUrl)) ctx.addIssue({ code: "custom", message: "Add the sponsor image and its destination before turning the sponsorship on.", path: ["enabled"] });
  });
export type ArticleSponsorInput = z.input<typeof articleSponsorInput>;

const toCampaign = (r: Row): Campaign => ({
  id: s(r.id),
  name: s(r.name),
  imageUrl: s(r.image_url),
  destinationUrl: s(r.destination_url),
  campaign: s(r.campaign),
  active: b(r.active),
  createdAt: s(r.created_at),
  updatedAt: s(r.updated_at),
});

export async function listCampaigns(): Promise<Campaign[]> {
  const db = await conn();
  return (await db.execute("SELECT * FROM sponsor_campaigns ORDER BY created_at DESC LIMIT 200")).rows.map(toCampaign);
}

/** The campaign tag defaults to the name, so every sponsor link can be tracked without extra work. */
const tagFor = (name: string, tag: string) => tag || campaignTag(name) || "sponsor";

export async function createCampaign(input: CampaignInput): Promise<Campaign> {
  const d = campaignInput.parse(input);
  const tag = tagFor(d.name, d.campaign);
  if (!isCampaignTag(tag)) throw new Error("The campaign tag could not be made from this name. Enter one yourself.");
  const db = await conn();
  const id = newId("sp_");
  const t = nowIso();
  // One campaign active at a time keeps the site-wide placement simple and predictable.
  const stmts = [];
  if (d.active) stmts.push({ sql: "UPDATE sponsor_campaigns SET active = 0, updated_at = ?", args: [t] });
  stmts.push({
    sql: "INSERT INTO sponsor_campaigns(id, name, image_url, destination_url, campaign, active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    args: [id, d.name, d.imageUrl, d.destinationUrl, tag, d.active ? 1 : 0, t, t],
  });
  await db.batch(stmts, "write");
  return (await listCampaigns()).find((c) => c.id === id)!;
}

export async function updateCampaign(id: string, input: CampaignInput): Promise<Campaign | null> {
  const d = campaignInput.parse(input);
  const tag = tagFor(d.name, d.campaign);
  if (!isCampaignTag(tag)) throw new Error("The campaign tag could not be made from this name. Enter one yourself.");
  const db = await conn();
  const t = nowIso();
  const stmts = [];
  if (d.active) stmts.push({ sql: "UPDATE sponsor_campaigns SET active = 0, updated_at = ? WHERE id <> ?", args: [t, id] });
  stmts.push({
    sql: "UPDATE sponsor_campaigns SET name = ?, image_url = ?, destination_url = ?, campaign = ?, active = ?, updated_at = ? WHERE id = ?",
    args: [d.name, d.imageUrl, d.destinationUrl, tag, d.active ? 1 : 0, t, id],
  });
  const res = await db.batch(stmts, "write");
  if (!res[res.length - 1].rowsAffected) return null;
  return (await listCampaigns()).find((c) => c.id === id) ?? null;
}

export async function deleteCampaign(id: string): Promise<boolean> {
  const db = await conn();
  return (await db.execute({ sql: "DELETE FROM sponsor_campaigns WHERE id = ?", args: [id] })).rowsAffected > 0;
}

export async function getArticleSponsorship(articleId: string): Promise<ArticleSponsorship> {
  const db = await conn();
  const r = (await db.execute({ sql: "SELECT * FROM article_sponsorships WHERE article_id = ?", args: [articleId] })).rows[0];
  if (!r) return { articleId, enabled: false, imageUrl: "", destinationUrl: "", campaign: "", updatedAt: null };
  return { articleId, enabled: b(r.enabled), imageUrl: s(r.image_url), destinationUrl: s(r.destination_url), campaign: s(r.campaign), updatedAt: s(r.updated_at) };
}

export async function setArticleSponsorship(articleId: string, input: ArticleSponsorInput): Promise<ArticleSponsorship> {
  const d = articleSponsorInput.parse(input);
  // An article sponsorship without its own tag is tracked with utm_source and utm_medium only.
  const tag = d.campaign;
  const db = await conn();
  await db.execute({
    sql: `INSERT INTO article_sponsorships(article_id, enabled, image_url, destination_url, campaign, updated_at) VALUES (?, ?, ?, ?, ?, ?)
          ON CONFLICT(article_id) DO UPDATE SET enabled = excluded.enabled, image_url = excluded.image_url, destination_url = excluded.destination_url, campaign = excluded.campaign, updated_at = excluded.updated_at`,
    args: [articleId, d.enabled ? 1 : 0, d.imageUrl, d.destinationUrl, tag, nowIso()],
  });
  return getArticleSponsorship(articleId);
}

/**
 * The sponsor an article shows, in priority order: the article's own sponsorship (when enabled and complete), else the active
 * site-wide campaign, else nothing (the side column is then not rendered at all).
 */
export async function resolveSponsor(articleId: string | null): Promise<ResolvedSponsor | null> {
  const db = await conn();
  if (articleId) {
    const r = (await db.execute({ sql: "SELECT enabled, image_url, destination_url, campaign FROM article_sponsorships WHERE article_id = ?", args: [articleId] })).rows[0];
    if (r && b(r.enabled) && s(r.image_url) && s(r.destination_url)) {
      const href = withSponsorUtm(s(r.destination_url), s(r.campaign) || "");
      if (href) return { href, imageUrl: s(r.image_url), campaign: s(r.campaign), source: "article" };
    }
  }
  const c = (await db.execute("SELECT image_url, destination_url, campaign FROM sponsor_campaigns WHERE active = 1 ORDER BY created_at DESC LIMIT 1")).rows[0];
  if (c) {
    const href = withSponsorUtm(s(c.destination_url), s(c.campaign));
    if (href) return { href, imageUrl: s(c.image_url), campaign: s(c.campaign), source: "campaign" };
  }
  return null;
}

