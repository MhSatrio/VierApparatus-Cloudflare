import { fail, json } from "@/lib/api";
import { HttpError, requireApi } from "@/lib/auth/guard";
import { revokeConnectorToken } from "@/lib/connector/tokens";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Owner only: revoking a token stops the DCE app from working with it on its next request. */
export async function DELETE(req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    await requireApi(req, { mutation: true, action: "connector.manage" });
    if (!(await revokeConnectorToken((await ctx.params).id))) throw new HttpError(404, "not_found", "No active token with that id.");
    return json({ ok: true });
  } catch (e) {
    return fail(e);
  }
}
