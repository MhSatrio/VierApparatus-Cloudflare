/**
 * Title / meta-description fitting. Search engines (and Ahrefs) flag titles over ~60 characters and descriptions
 * outside ~120-155 characters. These helpers are deterministic and cut at word boundaries, never mid-word.
 */
export const BRAND = "VierApparatus";
export const TITLE_MAX = 60;
export const DESC_MIN = 120;
export const DESC_MAX = 155;

const BRAND_SUFFIX = ` | ${BRAND}`;

export const collapse = (s: string) => s.replace(/\s+/g, " ").trim();

/** Cut to at most `max` characters (ellipsis included) at a word boundary. */
export function truncateAtWord(text: string, max: number, ellipsis = "…", minKeep = 0): string {
  const t = collapse(text);
  if (t.length <= max) return t;
  const room = max - ellipsis.length;
  let cut = t.slice(0, room);
  const lastSpace = cut.lastIndexOf(" ");
  if (lastSpace > Math.max(room * 0.5, minKeep)) cut = cut.slice(0, lastSpace);
  // Don't leave a dangling connector or punctuation before the ellipsis.
  cut = cut.replace(/[\s,;:(\-–—/&]+$/, "").replace(/\s+(and|or|of|for|with|the|a|an|to|in|on)$/i, "");
  return cut + ellipsis;
}

/**
 * The part of a long name that tells variants apart: the model/SKU when given, else a trailing "(CODE)", else the
 * last few words. Product families usually differ at the END of the name ("... (A3367)", "... 10200g by 0.01g").
 */
export function distinguishingTail(name: string, keep?: string | null): string {
  if (keep && name.includes(keep)) return keep;
  const paren = name.match(/\s(\([^()]{2,18}\))$/);
  if (paren) return paren[1];
  const tail = name.slice(-22);
  const space = tail.indexOf(" ");
  return space > -1 && name.length > 22 ? tail.slice(space + 1) : tail;
}

/**
 * Build a title of at most `max` characters.
 *  1. `primary | qualifier` when it fits (qualifier carries the search keyword),
 *  2. else `primary | VierApparatus`,
 *  3. else `shortened start + distinguishing tail | VierApparatus` so long variant names stay unique.
 */
export function fitTitle(primary: string, opts: { qualifier?: string; keep?: string | null; max?: number } = {}): string {
  const max = opts.max ?? TITLE_MAX;
  const p = collapse(primary);
  if (opts.qualifier) {
    const q = `${p} | ${collapse(opts.qualifier)}`;
    if (q.length <= max) return q;
  }
  const branded = p + BRAND_SUFFIX;
  if (branded.length <= max) return branded;

  const budget = max - BRAND_SUFFIX.length;
  const tail = distinguishingTail(p, opts.keep);
  if (tail.length + 8 <= budget) {
    const at = p.lastIndexOf(tail);
    const head = collapse(p.slice(0, at) + p.slice(at + tail.length));
    return `${truncateAtWord(head, budget - tail.length - 1)} ${tail}${BRAND_SUFFIX}`;
  }
  return truncateAtWord(p, budget) + BRAND_SUFFIX;
}

/**
 * Build a description of DESC_MIN..DESC_MAX characters from a primary sentence plus optional tails
 * (calls to action etc.) that are appended only while they help and still fit.
 */
export function fitDescription(primary: string, tails: string[] = DEFAULT_TAILS, min = DESC_MIN, max = DESC_MAX): string {
  let out = collapse(primary);
  if (out.length > max) return truncateAtWord(out, max, "…", min - 1);
  if (out && !/[.!?…]$/.test(out)) out += ".";
  for (const tail of [...tails, ...SHORT_TAILS]) {
    if (out.length >= min) break;
    const next = `${out} ${collapse(tail)}`;
    if (next.length <= max) out = next;
  }
  return out;
}

const DEFAULT_TAILS = [
  "Independent science articles and equipment reviews from VierApparatus.",
  "Clear, evidence-based science from VierApparatus.",
  "Read more on VierApparatus.",
];
const SHORT_TAILS = ["Read more.", "From VierApparatus.", "Science, explained."];

/** Kept for existing callers (article pages). */
export const truncateTitle = (title: string, maxLength = TITLE_MAX) => fitTitle(title.replace(/\s*\|\s*VierApparatus\s*$/i, ""), { max: maxLength });
export const formatDescription = (desc: string, minLength = DESC_MIN, maxLength = DESC_MAX) => fitDescription(desc, DEFAULT_TAILS, minLength, maxLength);
