import { fail, json } from "@/lib/api";
import { clearSessionCookie, HttpError, sessionToken } from "@/lib/auth/guard";
import { sameOrigin } from "@/lib/auth/request";
import { destroySession } from "@/lib/auth/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Signing out only needs a same-origin request: the worst a forged logout can do is sign someone out. */
export async function POST(req: Request) {
  try {
    if (!sameOrigin(req)) throw new HttpError(403, "bad_origin");
    await destroySession(await sessionToken());
    await clearSessionCookie();
    return json({ ok: true });
  } catch (e) {
    return fail(e);
  }
}
