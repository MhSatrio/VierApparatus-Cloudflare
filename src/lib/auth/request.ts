import { authSecret, hmacHex } from "../crypto";
import { site } from "../site";

export function clientIp(req: Request): string {
  const h = req.headers;
  const raw = h.get("cf-connecting-ip") ?? h.get("x-real-ip") ?? (h.get("x-forwarded-for") ?? "").split(",")[0] ?? "";
  return raw.trim().slice(0, 64) || "unknown";
}

/** Raw IP addresses are never stored: rate limits and daily visitor ids use a keyed hash instead. */
export async function ipHash(ip: string): Promise<string> {
  return (await hmacHex(authSecret(), `ip:${ip}`)).slice(0, 24);
}

/** True when a browser request originates from this site (Origin, or Referer as a fallback). */
export function sameOrigin(req: Request): boolean {
  const source = req.headers.get("origin") ?? req.headers.get("referer");
  if (!source) return false;
  try {
    const o = new URL(source);
    const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
    return o.host === host || o.origin === new URL(site.url).origin;
  } catch {
    return false;
  }
}

export const isJson = (req: Request) => (req.headers.get("content-type") ?? "").toLowerCase().startsWith("application/json");

export async function csrfTokenFor(sessionHash: string): Promise<string> {
  return (await hmacHex(authSecret(), `csrf:${sessionHash}`)).slice(0, 40);
}
