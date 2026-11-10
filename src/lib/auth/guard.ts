import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { site } from "../site";
import { can, type Action } from "./permissions";
import { csrfTokenFor, isJson, sameOrigin } from "./request";
import { resolveSession, type ResolvedSession } from "./session";
import { safeEqual } from "../crypto";

const secure = site.url.startsWith("https://");
/** `__Host-` pins the cookie to this exact host over HTTPS (no Domain attribute, Path=/). Plain name for local http. */
export const SESSION_COOKIE = secure ? "__Host-va_session" : "va_session";

export class HttpError extends Error {
  constructor(
    public status: number,
    public code: string,
    message?: string,
  ) {
    super(message ?? code);
  }
}

export type Authed = ResolvedSession & { csrf: string };

export async function setSessionCookie(token: string, expires: Date) {
  (await cookies()).set(SESSION_COOKIE, token, { httpOnly: true, secure, sameSite: "lax", path: "/", expires });
}

export async function clearSessionCookie() {
  (await cookies()).set(SESSION_COOKIE, "", { httpOnly: true, secure, sameSite: "lax", path: "/", expires: new Date(0) });
}

export async function sessionToken(): Promise<string | undefined> {
  return (await cookies()).get(SESSION_COOKIE)?.value;
}

/** The signed-in user for server components and route handlers, or null. Does no redirect and no permission check. */
export async function currentSession(): Promise<Authed | null> {
  const s = await resolveSession(await sessionToken());
  if (!s) return null;
  return { ...s, csrf: await csrfTokenFor(s.sessionHash) };
}

/** For admin PAGES: sends signed-out users to the login page and users who must rotate their password to that form. */
export async function requirePage(opts: { action?: Action; allowMustChange?: boolean } = {}): Promise<Authed> {
  const s = await currentSession();
  if (!s) redirect("/admin/login");
  if (s.user.mustChangePassword && !opts.allowMustChange) redirect("/admin/change-password");
  if (opts.action && !can(s.user, opts.action)) redirect("/admin");
  return s;
}

/**
 * For admin API routes. Enforces, in order: valid session, password already rotated, permission, and for state-changing
 * requests a same-origin browser request carrying the per-session CSRF token. Always runs on the server.
 */
export async function requireApi(req: Request, opts: { action?: Action; mutation?: boolean; allowMustChange?: boolean; json?: boolean } = {}): Promise<Authed> {
  const s = await currentSession();
  if (!s) throw new HttpError(401, "unauthorized");
  if (s.user.mustChangePassword && !opts.allowMustChange) throw new HttpError(403, "password_change_required");
  if (opts.action && !can(s.user, opts.action)) throw new HttpError(403, "forbidden");
  if (opts.mutation) {
    if (!sameOrigin(req)) throw new HttpError(403, "bad_origin");
    const sent = req.headers.get("x-csrf-token") ?? "";
    if (!sent || !safeEqual(sent, s.csrf)) throw new HttpError(403, "bad_csrf");
    if (opts.json !== false && !isJson(req)) throw new HttpError(415, "unsupported_media_type");
  }
  return s;
}
