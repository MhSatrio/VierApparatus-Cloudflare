import { fail, json, readJson } from "@/lib/api";
import { HttpError, requireApi } from "@/lib/auth/guard";
import { adminUpdateInput, deleteSubscriber, updateSubscriber } from "@/lib/store/subscribers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

/** Owner only: edit one subscriber's name, interests and status. */
export async function PUT(req: Request, ctx: Ctx) {
  try {
    await requireApi(req, { mutation: true, action: "newsletter.manage" });
    const input = await readJson(req, adminUpdateInput, 4096);
    const sub = await updateSubscriber((await ctx.params).id, input);
    if (!sub) throw new HttpError(404, "not_found");
    return json({ ok: true, subscriber: sub });
  } catch (e) {
    return fail(e);
  }
}

/** Owner only: remove a subscriber. Their address can sign up again later, which starts a new confirmation. */
export async function DELETE(req: Request, ctx: Ctx) {
  try {
    await requireApi(req, { mutation: true, action: "newsletter.manage", json: false });
    if (!(await deleteSubscriber((await ctx.params).id))) throw new HttpError(404, "not_found");
    return json({ ok: true });
  } catch (e) {
    return fail(e);
  }
}
