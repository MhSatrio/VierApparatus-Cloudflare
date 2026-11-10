import { z } from "zod";
import { fail, json, readJson } from "@/lib/api";
import { HttpError, requireApi } from "@/lib/auth/guard";
import { changePassword } from "@/lib/auth/service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const body = z.object({ current: z.string().max(400), next: z.string().max(400) });

/** Allowed while the account is still flagged "must change password" (that is the whole point of this route). */
export async function POST(req: Request) {
  try {
    const session = await requireApi(req, { mutation: true, allowMustChange: true });
    // Only the owner changes a password for themselves. Contributors' passwords are set and reset by the owner alone.
    if (session.user.role !== "owner") throw new HttpError(403, "owner_only");
    const { current, next } = await readJson(req, body, 2048);
    const r = await changePassword({ userId: session.user.id, current, next, keepSessionHash: session.sessionHash });
    if (!r.ok) return json({ ok: false, error: "validation", message: r.error }, 400);
    return json({ ok: true });
  } catch (e) {
    return fail(e);
  }
}
