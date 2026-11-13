/**
 * Decides whether one reference matches one Crossref record. Pure: no network, so it can be tested with fixtures.
 *
 * A reference passes when all three hold:
 *   - the title: at least 80% of the significant words of the Crossref title appear in the reference;
 *   - the year: the reference's year is the Crossref year, or one year either side (online-first dates differ);
 *   - the first author: the first author's surname in Crossref appears in the reference.
 * When Crossref has no author for the record, the author test is skipped rather than failed.
 */

export type CrossrefWork = {
  doi: string;
  title: string;
  year: number | null;
  /** Family names in order; the first is the first author. */
  authors: string[];
  container: string;
};

export const TITLE_THRESHOLD = 0.8;

const STOP = new Set(["the", "and", "for", "of", "with", "from", "in", "on", "a", "an", "to", "by", "at", "as", "is", "are", "its", "their"]);

/** Lower case, accents removed, punctuation turned into spaces, single spaces. */
export function normalize(s: string): string {
  return s
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .replace(/\s+/g, " ");
}

export function significantWords(title: string): string[] {
  return normalize(title)
    .split(" ")
    .filter((w) => w.length >= 3 && !STOP.has(w));
}

/** The share of the Crossref title's significant words that occur in the reference, from 0 to 1. */
export function titleScore(crossrefTitle: string, reference: string): number {
  const words = significantWords(crossrefTitle);
  if (!words.length) return 0;
  const ref = ` ${normalize(reference)} `;
  const hit = words.filter((w) => ref.includes(` ${w} `) || ref.includes(` ${w}-`) || ref.includes(`-${w} `)).length;
  return hit / words.length;
}

export type Judgement = { pass: boolean; reason: string; titleScore: number };

export function judge(reference: { text: string; year: number | null }, work: CrossrefWork): Judgement {
  const score = titleScore(work.title, reference.text);
  const problems: string[] = [];
  if (score < TITLE_THRESHOLD) {
    problems.push(`The title does not match. Crossref has "${work.title}".`);
  }
  if (reference.year == null) {
    problems.push("The reference has no year in parentheses, for example (2008).");
  } else if (work.year == null) {
    // Crossref has no date for this record: the year cannot be checked, so it is not counted against the reference.
  } else if (Math.abs(reference.year - work.year) > 1) {
    problems.push(`The year differs. The reference says ${reference.year}; Crossref says ${work.year}.`);
  }
  if (work.authors.length) {
    const hay = ` ${normalize(reference.text)} `;
    const first = normalize(work.authors[0]);
    if (first && !hay.includes(` ${first} `) && !hay.includes(` ${first}-`) && !hay.includes(`-${first} `)) {
      problems.push(`The first author differs. Crossref lists ${work.authors[0]} first.`);
    }
  }
  return problems.length ? { pass: false, reason: problems.join(" "), titleScore: score } : { pass: true, reason: "Matches Crossref.", titleScore: score };
}
