/** Small WebCrypto helpers. WebCrypto exists in Node 20+, Vercel and Cloudflare Workers, so there is one code path. */
const enc = new TextEncoder();

export function bytesToBase64Url(bytes: Uint8Array): string {
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function base64UrlToBytes(s: string): Uint8Array {
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - (s.length % 4)) % 4);
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

export const toHex = (bytes: Uint8Array) => [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");

export function randomToken(bytes = 32): string {
  return bytesToBase64Url(crypto.getRandomValues(new Uint8Array(bytes)));
}

/** Short random id, URL safe. 16 random bytes is plenty to be unguessable. */
export const newId = (prefix = "") => `${prefix}${randomToken(12)}`;

export async function sha256Hex(input: string | Uint8Array): Promise<string> {
  const data = typeof input === "string" ? enc.encode(input) : input;
  return toHex(new Uint8Array(await crypto.subtle.digest("SHA-256", data as BufferSource)));
}

export async function hmacHex(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return toHex(new Uint8Array(await crypto.subtle.sign("HMAC", key, enc.encode(message))));
}

/** Constant-time string comparison (length is not secret here: both sides are fixed-length hex/base64url). */
export function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/**
 * The server secret. Required in production (a missing secret must never silently weaken sessions or CSRF tokens);
 * in development and tests a fixed, obviously-insecure value is used so nothing needs configuring.
 */
export function authSecret(): string {
  const s = process.env.AUTH_SECRET;
  if (s && s.length >= 32) return s;
  if (process.env.NODE_ENV === "production" && process.env.LOCAL_DB !== "1") {
    throw new Error("AUTH_SECRET must be set to a random string of at least 32 characters");
  }
  return "development-only-secret-do-not-use-in-production-0123456789";
}
