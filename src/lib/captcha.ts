import { authSecret, hmacHex, randomToken, safeEqual } from "./crypto";
import { hit } from "./auth/ratelimit";

/**
 * A self-contained human check for public forms: no third-party script, no cookie, no account. The server asks a small question
 * and signs the answer into the token it hands out; nothing about the answer is stored. A token
 *   - expires after 20 minutes,
 *   - cannot be answered within 3 seconds of being issued (a script does not wait),
 *   - works once (its nonce is burned in the shared rate-limit table), so one solved question cannot be replayed.
 * It is one layer among several (honeypot, timing, rate limits, spam checks, moderation). It stops scripts that do not read the
 * question; it does not claim to stop a determined human or a language model, which is why every comment is also moderated.
 */

const WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen"];
const LETTERS = ["laboratory", "microscope", "centrifuge", "pipette", "incubator", "spectrum", "reagent", "enzyme", "sample", "protocol"];
const TTL_MS = 20 * 60 * 1000;
const MIN_MS = 3000;

const pick = (n: number) => crypto.getRandomValues(new Uint32Array(1))[0] % n;

export type Challenge = { token: string; question: string };

async function mac(payload: string, answer: string): Promise<string> {
  return (await hmacHex(authSecret(), `captcha|${payload}|${answer}`)).slice(0, 32);
}

/** A fresh question. The answer is a whole number. */
export async function issueChallenge(now = Date.now()): Promise<Challenge> {
  let question: string;
  let answer: number;
  const kind = pick(3);
  if (kind === 0) {
    const a = 2 + pick(9);
    const b = 2 + pick(9);
    question = `What is ${WORDS[a]} plus ${WORDS[b]}? Answer with digits.`;
    answer = a + b;
  } else if (kind === 1) {
    const a = 6 + pick(10);
    const b = 1 + pick(5);
    question = `What is ${WORDS[a]} minus ${WORDS[b]}? Answer with digits.`;
    answer = a - b;
  } else {
    const w = LETTERS[pick(LETTERS.length)];
    question = `How many letters are in the word "${w}"? Answer with digits.`;
    answer = w.length;
  }
  const payload = `${now}.${randomToken(9)}`;
  return { token: `${payload}.${await mac(payload, String(answer))}`, question };
}

export type CaptchaResult = { ok: true } | { ok: false; reason: "missing" | "expired" | "too_fast" | "wrong" | "used" };

export async function verifyChallenge(token: string, answer: string, now = Date.now()): Promise<CaptchaResult> {
  const parts = token.split(".");
  if (parts.length !== 3 || !/^\d{10,15}$/.test(parts[0]) || !answer.trim()) return { ok: false, reason: "missing" };
  const [issued, nonce, given] = parts;
  const age = now - Number(issued);
  if (age > TTL_MS || age < 0) return { ok: false, reason: "expired" };
  const digits = answer.trim().replace(/[^\d]/g, "");
  const expected = await mac(`${issued}.${nonce}`, digits);
  if (!digits || !safeEqual(expected, given)) return { ok: false, reason: "wrong" };
  if (age < MIN_MS) return { ok: false, reason: "too_fast" };
  // burn the nonce: the second use of the same solved question is refused
  const used = await hit(`captcha:${nonce}`, 1, Math.ceil(TTL_MS / 1000));
  return used.ok ? { ok: true } : { ok: false, reason: "used" };
}
