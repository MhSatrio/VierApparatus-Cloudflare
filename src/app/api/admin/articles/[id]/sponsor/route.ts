import { fail, json, readJson } from "@/lib/api";
import { HttpError, requireApi } from "@/lib/auth/guard";
import { articleSponsorInput, getArticleSponsorship, setArticleSponsorship } from "@/lib/store/sponsors";
import { getArticleById } from "@/lib/store/articles";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

/** Owner only: the sponsorship of one article (it overrides the site-wide campaign while enabled). */
export async function GET(req: Request, ctx: Ctx) {
  try {
    await requireApi(req, { action: "sponsors.manage" });
    const id = (await ctx.params).id;
    if (!(await getArticleById(id))) throw new HttpError(404, "not_found");
    return json({ ok: true, sponsorship: await getArticleSponsorship(id) });
  } catch (e) {
    return fail(e);
  }
}

export async function PUT(req: Request, ctx: Ctx) {
  try {
    await requireApi(req, { mutation: true, action: "sponsors.manage" });
    const input = await readJson(req, articleSponsorInput, 8 * 1024);
    const id = (await ctx.params).id;
    if (!(await getArticleById(id))) throw new HttpError(404, "not_found");
    return json({ ok: true, sponsorship: await setArticleSponsorship(id, input) });
  } catch (e) {
    return fail(e);
  }
}
