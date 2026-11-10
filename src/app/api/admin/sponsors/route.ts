import { fail, json, readJson } from "@/lib/api";
import { HttpError, requireApi } from "@/lib/auth/guard";
import { campaignInput, createCampaign, listCampaigns } from "@/lib/store/sponsors";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Owner only: site-wide sponsor campaigns. */
export async function GET(req: Request) {
  try {
    await requireApi(req, { action: "sponsors.manage" });
    return json({ ok: true, campaigns: await listCampaigns() });
  } catch (e) {
    return fail(e);
  }
}

export async function POST(req: Request) {
  try {
    await requireApi(req, { mutation: true, action: "sponsors.manage" });
    const input = await readJson(req, campaignInput, 8 * 1024);
    try {
      return json({ ok: true, campaign: await createCampaign(input) });
    } catch (e) {
      throw new HttpError(400, "validation", e instanceof Error ? e.message : "Invalid sponsor");
    }
  } catch (e) {
    return fail(e);
  }
}
