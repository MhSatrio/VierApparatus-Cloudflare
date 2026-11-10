import { z } from "zod";
import { fail, json, readJson } from "@/lib/api";
import { requireApi } from "@/lib/auth/guard";
import { resetContributorPasswordAs } from "@/lib/auth/service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Owner only: set a NEW password for a contributor. The previous hash is replaced and the person is signed out everywhere.
 * There is no way to read an existing password, and contributors cannot change their own: this is the only route that
 * writes a contributor's password besides account creation.
 */
export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireApi(req, { mutation: true, action: "users.manage" });
    const { password } = await readJson(req, z.object({ password: z.string().max(200) }), 2 * 1024);
    const r = await resetContributorPasswordAs(session.user.id, (await ctx.params).id, password);
    return r.ok ? json({ ok: true }) : json({ ok: false, error: "validation", message: r.error }, 400);
  } catch (e) {
    return fail(e);
  }
}
