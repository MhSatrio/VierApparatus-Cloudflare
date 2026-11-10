import { fail, json, readJson } from "@/lib/api";
import { HttpError, requireApi } from "@/lib/auth/guard";
import { campaignInput, deleteCampaign, updateCampaign } from "@/lib/store/sponsors";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(req: Request, ctx: Ctx) {
  try {
    await requireApi(req, { mutation: true, action: "sponsors.manage" });
    const input = await readJson(req, campaignInput, 8 * 1024);
    try {
      const c = await updateCampaign((await ctx.params).id, input);
      if (!c) throw new HttpError(404, "not_found");
      return json({ ok: true, campaign: c });
    } catch (e) {
      if (e instanceof HttpError) throw e;
      throw new HttpError(400, "validation", e instanceof Error ? e.message : "Invalid sponsor");
    }
  } catch (e) {
    return fail(e);
  }
}

export async function DELETE(req: Request, ctx: Ctx) {
  try {
    await requireApi(req, { mutation: true, action: "sponsors.manage", json: false });
    if (!(await deleteCampaign((await ctx.params).id))) throw new HttpError(404, "not_found");
    return json({ ok: true });
  } catch (e) {
    return fail(e);
  }
}
