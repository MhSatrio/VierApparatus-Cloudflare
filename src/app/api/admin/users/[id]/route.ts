import { z } from "zod";
import { fail, json, readJson } from "@/lib/api";
import { HttpError, requireApi } from "@/lib/auth/guard";
import { sanitizePermissions } from "@/lib/auth/permissions";
import { removeContributor, setDisabled, setPermissions, updateContributorProfile } from "@/lib/store/users";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

const patch = z.object({
  name: z.string().trim().min(2).max(80).optional(),
  email: z.string().trim().max(200).optional(),
  specialization: z.string().trim().max(120).optional(),
  bio: z.string().trim().max(600).optional(),
  disabled: z.boolean().optional(),
  permissions: z.array(z.string()).max(10).optional(),
});

/**
 * Owner only. Every function behind this touches only rows whose role is "contributor", so a crafted request with the
 * owner's own id changes nothing. There is deliberately no role field: nobody can be promoted through the API.
 */
export async function PATCH(req: Request, ctx: Ctx) {
  try {
    const session = await requireApi(req, { mutation: true, action: "users.manage" });
    const id = (await ctx.params).id;
    const body = await readJson(req, patch, 8 * 1024);
    let changed = false;
    if (body.name !== undefined || body.email !== undefined || body.specialization !== undefined || body.bio !== undefined) {
      const r = await updateContributorProfile(id, body, session.user.id);
      if (!r.ok) return json({ ok: false, error: "validation", message: r.error }, /exists/.test(r.error) ? 409 : 404);
      changed = true;
    }
    if (body.permissions) changed = (await setPermissions(id, sanitizePermissions(body.permissions), session.user.id)) || changed;
    if (body.disabled !== undefined) changed = (await setDisabled(id, body.disabled, session.user.id)) || changed;
    if (!changed) throw new HttpError(404, "not_found");
    return json({ ok: true });
  } catch (e) {
    return fail(e);
  }
}

/** Deletes a contributor account: sessions end immediately and assignments are cleared; their articles and comments stay, credited by name. */
export async function DELETE(req: Request, ctx: Ctx) {
  try {
    const session = await requireApi(req, { mutation: true, action: "users.manage", json: false });
    if (!(await removeContributor((await ctx.params).id, session.user.id))) throw new HttpError(404, "not_found");
    return json({ ok: true });
  } catch (e) {
    return fail(e);
  }
}
