import { authSecret, base64UrlToBytes, bytesToBase64Url, safeEqual } from "../crypto";

/**
 * Password hashing with PBKDF2-HMAC-SHA256 from WebCrypto (identical on Node, Vercel and Cloudflare Workers).
 * The password is first run through an HMAC keyed with the server secret ("pepper"), so a stolen database alone
 * cannot be brute-forced offline. 100,000 iterations is the maximum Cloudflare Workers accepts for PBKDF2; the stored
 * format carries the iteration count so it can be raised later and old hashes are upgraded at the next login.
 */
export const PBKDF2_ITERATIONS = 100_000;
const SCHEME = "pbkdf2-sha256";
const enc = new TextEncoder();

async function derive(password: string, salt: Uint8Array, iterations: number): Promise<Uint8Array> {
  const hmacKey = await crypto.subtle.importKey("raw", enc.encode(authSecret()), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const peppered = new Uint8Array(await crypto.subtle.sign("HMAC", hmacKey, enc.encode(password)));
  const pbkdf = await crypto.subtle.importKey("raw", peppered as BufferSource, "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: salt as BufferSource, iterations }, pbkdf, 256);
  return new Uint8Array(bits);
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await derive(password, salt, PBKDF2_ITERATIONS);
  return `${SCHEME}$${PBKDF2_ITERATIONS}$${bytesToBase64Url(salt)}$${bytesToBase64Url(hash)}`;
}

export async function verifyPassword(password: string, stored: string): Promise<{ ok: boolean; needsRehash: boolean }> {
  const [scheme, iterStr, saltB64, hashB64] = stored.split("$");
  const iterations = Number(iterStr);
  if (scheme !== SCHEME || !Number.isInteger(iterations) || iterations < 1 || iterations > 1_000_000 || !saltB64 || !hashB64) {
    return { ok: false, needsRehash: false };
  }
  const hash = await derive(password, base64UrlToBytes(saltB64), iterations);
  return { ok: safeEqual(bytesToBase64Url(hash), hashB64), needsRehash: iterations < PBKDF2_ITERATIONS };
}

let dummy: Promise<string> | null = null;
/** Verifies against a throw-away hash so a login for an unknown e-mail costs the same time as a real one. */
export async function burnPasswordCheck(password: string): Promise<void> {
  dummy ??= hashPassword("not-a-real-password");
  await verifyPassword(password, await dummy);
}

export type PasswordContext = { email?: string; name?: string };

/** Returns an error message, or null when the password is acceptable. */
export function passwordProblem(password: string, ctx: PasswordContext = {}): string | null {
  if (password.length < 12) return "Use at least 12 characters.";
  if (password.length > 200) return "Use at most 200 characters.";
  if (/^(.)\1+$/.test(password)) return "That password is too simple.";
  const lower = password.toLowerCase();
  const local = ctx.email?.split("@")[0]?.toLowerCase();
  if (local && local.length >= 4 && lower.includes(local)) return "The password must not contain your e-mail name.";
  if (/^(password|qwerty|123456|letmein|admin)/i.test(password)) return "That password is too common.";
  const classes = [/[a-z]/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter((r) => r.test(password)).length;
  if (classes < 3 && password.length < 16) return "Mix upper-case, lower-case, numbers and symbols, or use 16+ characters.";
  return null;
}
