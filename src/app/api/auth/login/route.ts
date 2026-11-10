import { z } from "zod";
import { fail, json, readJson } from "@/lib/api";
import { HttpError, setSessionCookie } from "@/lib/auth/guard";
import { clientIp, ipHash, isJson, sameOrigin } from "@/lib/auth/request";
import { login } from "@/lib/auth/service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const body = z.object({ email: z.string().max(200), password: z.string().max(400) });

export async function POST(req: Request) {
  try {
    if (!sameOrigin(req)) throw new HttpError(403, "bad_origin");
    if (!isJson(req)) throw new HttpError(415, "unsupported_media_type");
    const { email, password } = await readJson(req, body, 2048);
    const result = await login({ email, password, ipHash: await ipHash(clientIp(req)), userAgent: req.headers.get("user-agent") ?? "" });
    if (!result.ok) {
      if (result.error === "rate_limited") return json({ ok: false, error: "rate_limited", retryAfter: result.retryAfter }, 429, { "Retry-After": String(result.retryAfter ?? 900) });
      return json({ ok: false, error: "invalid" }, 401);
    }
    await setSessionCookie(result.token, result.expiresAt);
    return json({ ok: true, mustChangePassword: result.mustChangePassword, role: result.user.role });
  } catch (e) {
    return fail(e);
  }
}
