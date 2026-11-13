/**
 * Splits a pasted list of APA 7th edition references into one string per reference, and reads the three things the check needs
 * from each one: its DOI, its year and its first author. Pure: no network.
 *
 * A reference starts with a surname and initials ("Carroll, S. B. (2008)."). A blank line always separates two references. Inside
 * one block, a line that starts a new reference (surname and initials) begins a new reference; any other line continues the
 * previous one, so a reference wrapped over several lines is read as one.
 */

export const MAX_REFERENCES = 100;
export const MAX_REFERENCE_CHARS = 1500;

const START = /^\p{Lu}[\p{L}'’\-]+(?:\s\p{Lu}[\p{L}'’\-]+)*,\s+(?:\p{Lu}\.|\p{Lu}\s?\.)/u;
const DOI = /\b(10\.\d{4,9}\/[^\s"<>]+)/i;

export type ParsedReference = { text: string; doi: string; year: number | null; firstAuthor: string };

export function parseReferenceList(raw: string): string[] {
  const blocks = raw.replace(/\r\n?/g, "\n").split(/\n\s*\n/);
  const out: string[] = [];
  for (const block of blocks) {
    const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
    let current = "";
    for (const line of lines) {
      if (START.test(line) && current) {
        out.push(current);
        current = line;
      } else {
        current = current ? `${current} ${line}` : line;
      }
    }
    if (current) out.push(current);
  }
  return out.map((t) => t.replace(/\s+/g, " ").trim()).filter(Boolean);
}

/** The DOI in a reference, as a bare DOI (no https://doi.org/ prefix, no trailing punctuation), or "". */
export function extractDoi(text: string): string {
  const m = text.match(DOI);
  return m ? m[1].replace(/[.,;:)\]]+$/, "") : "";
}

/** The year in parentheses, as in "(2008)" or "(2017a)". Falls back to any four-digit year. */
export function extractYear(text: string): number | null {
  const paren = text.match(/\((\d{4})[a-z]?(?:,[^)]*)?\)/);
  if (paren) return Number(paren[1]);
  const any = text.match(/\b((?:19|20)\d{2})\b/);
  return any ? Number(any[1]) : null;
}

/** The first author's surname: the text before the first comma (or the first word when there is no comma). */
export function extractFirstAuthor(text: string): string {
  const head = text.split(",")[0] ?? "";
  return head.trim().split(/\s+/)[0] ?? "";
}

export function parseReference(text: string): ParsedReference {
  return { text, doi: extractDoi(text), year: extractYear(text), firstAuthor: extractFirstAuthor(text) };
}
