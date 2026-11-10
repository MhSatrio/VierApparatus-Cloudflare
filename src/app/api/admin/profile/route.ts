import { z } from "zod";
import { fail, json, readJson } from "@/lib/api";
import { requireApi } from "@/lib/auth/guard";
import { updateProfile } from "@/lib/store/users";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** The owner edits their own display name and bio. Contributor profiles are edited by the owner (in Contributors). */
export async function PUT(req: Request) {
  try {
    const session = await requireApi(req, { mutation: true, action: "settings.manage" });
    const { name, bio } = await readJson(req, z.object({ name: z.string().trim().min(2).max(80), bio: z.string().max(600).default("") }), 4096);
    await updateProfile(session.user.id, { name, bio });
    return json({ ok: true });
  } catch (e) {
    return fail(e);
  }
}
