/**
 * Spam signals for a comment. Pure. Nothing here decides that someone is fake: names are never judged (an unusual or
 * fictional-sounding name is a real name until shown otherwise). A signal only puts a comment in front of the moderator with the
 * reason attached; a comment that carries several hard signals is filed as "spam" (still visible to the moderator, never public).
 */

export type SpamVerdict = { flags: string[]; score: number; spam: boolean };

const KEYWORDS = /\b(casino|viagra|cialis|crypto(?:currency)?\s+(?:invest|trad)|forex|bitcoin|betting|payday loan|escort|porn|seo services?|backlinks?|buy followers|click here|work from home|weight loss|replica watches?)\b/i;
const LINK = /(?:https?:\/\/|www\.)\S+/gi;
const EMAIL = /[\w.+-]+@[\w-]+\.[\w.-]+/;
const PHONE = /(?:\+?\d[\s().-]?){9,}/;

export function checkComment(input: { name: string; affiliation?: string; role?: string; body: string }): SpamVerdict {
  const flags: string[] = [];
  let score = 0;
  const add = (flag: string, weight: number) => {
    flags.push(flag);
    score += weight;
  };
  const body = input.body;
  const links = body.match(LINK) ?? [];
  if (links.length >= 3) add("Three or more links in the text", 3);
  else if (links.length >= 1) add(`Contains ${links.length === 1 ? "a link" : "links"}`, 1);
  if (KEYWORDS.test(body) || KEYWORDS.test(input.name)) add("Contains words typical of spam", 3);
  if (EMAIL.test(body)) add("Contains an e-mail address", 1);
  if (PHONE.test(body)) add("Contains a phone number", 1);
  if (/https?:|www\./i.test(input.name)) add("The name contains a web address", 3);
  if (/(.)\1{9,}/.test(body)) add("A character is repeated many times", 2);
  const letters = body.replace(/[^A-Za-z]/g, "");
  if (letters.length > 30 && letters.replace(/[^A-Z]/g, "").length / letters.length > 0.7) add("Mostly capital letters", 1);
  if (body.trim().length < 20) add("Very short", 1);
  const words = body.toLowerCase().match(/[a-z']{3,}/g) ?? [];
  if (words.length >= 12 && new Set(words).size / words.length < 0.35) add("The same words are repeated over and over", 2);
  if (/[^\u0000-ɏͰ-ϿЀ-ӿ -⁯←-⋿\s]/.test(body.slice(0, 400)) && /[一-鿿぀-ヿ가-힯]/.test(body) && links.length) add("Non-Latin text together with a link", 1);
  if (input.name.trim().length < 2) add("No usable name", 2);
  return { flags, score, spam: score >= 5 };
}

/** A fingerprint of a comment's text, to notice the same text arriving twice (case, spacing and punctuation ignored). */
export async function bodyHash(text: string): Promise<string> {
  const norm = text.toLowerCase().replace(/[^a-z0-9À-￿]+/g, " ").trim();
  const bytes = new TextEncoder().encode(norm);
  const d = new Uint8Array(await crypto.subtle.digest("SHA-256", bytes));
  return [...d.slice(0, 12)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
