/**
 * The reference check: parses a pasted list, looks each reference up in Crossref (free, no key), and judges each one.
 * A reference with a DOI is looked up by DOI; one without is searched by its text and the best candidate is judged.
 * A reference that Crossref cannot verify fails: the check never passes what it could not confirm.
 */
import { judge, type CrossrefWork } from "./judge";
import { parseReference, parseReferenceList, MAX_REFERENCES, MAX_REFERENCE_CHARS } from "./parse";

export type CheckItem = {
  index: number;
  text: string;
  status: "pass" | "fail";
  reason: string;
  doi: string;
  /** What Crossref says the paper is, when a record was found. */
  matched: { doi: string; title: string; year: number | null; firstAuthor: string; container: string } | null;
};

/** Looks a DOI up. Returns null when Crossref has no such DOI. Throws when Crossref cannot be reached. */
export type Lookup = {
  byDoi(doi: string): Promise<CrossrefWork | null>;
  search(text: string): Promise<CrossrefWork[]>;
};

export const crossrefLookup: Lookup = {
  async byDoi(doi) {
    const res = await fetchWithTimeout(`https://api.crossref.org/works/${encodeURIComponent(doi).replace(/%2F/g, "/")}`);
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`Crossref answered ${res.status}`);
    const data = (await res.json()) as { message?: unknown };
    return toWork(data.message);
  },
  async search(text) {
    const url = `https://api.crossref.org/works?rows=5&query.bibliographic=${encodeURIComponent(text.slice(0, 500))}`;
    const res = await fetchWithTimeout(url);
    if (!res.ok) throw new Error(`Crossref answered ${res.status}`);
    const data = (await res.json()) as { message?: { items?: unknown[] } };
    return (data.message?.items ?? []).map(toWork).filter((w): w is CrossrefWork => Boolean(w));
  },
};

async function fetchWithTimeout(url: string): Promise<Response> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 12_000);
  try {
    return await fetch(url, {
      headers: { "User-Agent": "VierApparatus-RefCheck/1.0 (https://vierapparatus.com)", Accept: "application/json" },
      signal: ctrl.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}

function toWork(raw: unknown): CrossrefWork | null {
  if (!raw || typeof raw !== "object") return null;
  const m = raw as Record<string, unknown>;
  const title = Array.isArray(m.title) && typeof m.title[0] === "string" ? m.title[0] : "";
  if (!title) return null;
  const parts = (m.issued as { "date-parts"?: unknown[][] } | undefined)?.["date-parts"]?.[0];
  const year = Array.isArray(parts) && typeof parts[0] === "number" ? parts[0] : null;
  const authors = Array.isArray(m.author)
    ? (m.author as { family?: unknown; name?: unknown }[]).map((a) => (typeof a.family === "string" ? a.family : typeof a.name === "string" ? a.name : "")).filter(Boolean)
    : [];
  const container = Array.isArray(m["container-title"]) && typeof m["container-title"][0] === "string" ? m["container-title"][0] : "";
  return { doi: typeof m.DOI === "string" ? m.DOI : "", title, year, authors, container };
}

const pause = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Checks each reference in order. Sequential, with a short pause, to stay well inside Crossref's polite limits. */
export async function checkReferences(texts: string[], lookup: Lookup = crossrefLookup): Promise<CheckItem[]> {
  const out: CheckItem[] = [];
  for (let i = 0; i < texts.length; i++) {
    out.push(await checkOne(i, texts[i], lookup));
    if (i < texts.length - 1) await pause(120);
  }
  return out;
}

export async function checkOne(index: number, text: string, lookup: Lookup): Promise<CheckItem> {
  const ref = parseReference(text);
  const base = { index, text, doi: ref.doi };
  try {
    if (ref.doi) {
      const work = await lookup.byDoi(ref.doi);
      if (!work) return { ...base, status: "fail", reason: `The DOI ${ref.doi} is not in Crossref. Check the DOI.`, matched: null };
      const j = judge(ref, work);
      return { ...base, status: j.pass ? "pass" : "fail", reason: j.pass ? j.reason : `${j.reason} (The DOI points to a different paper.)`, matched: describe(work) };
    }
    const candidates = await lookup.search(text);
    let best: { work: CrossrefWork; score: number } | null = null;
    for (const w of candidates) {
      const j = judge(ref, w);
      if (j.pass) return { ...base, status: "pass", reason: "Matches a Crossref record.", matched: describe(w) };
      if (!best || j.titleScore > best.score) best = { work: w, score: j.titleScore };
    }
    if (best) {
      const j = judge(ref, best.work);
      return { ...base, status: "fail", reason: `No Crossref record matches all of it. Closest: ${j.reason}`, matched: describe(best.work) };
    }
    return { ...base, status: "fail", reason: "No record found in Crossref. Check the title, the authors and the year, or add the DOI.", matched: null };
  } catch {
    return { ...base, status: "fail", reason: "Crossref could not be reached for this reference. Try the check again in a moment.", matched: null };
  }
}

function describe(w: CrossrefWork): NonNullable<CheckItem["matched"]> {
  return { doi: w.doi, title: w.title, year: w.year, firstAuthor: w.authors[0] ?? "", container: w.container };
}

export type CheckRun = { items: CheckItem[]; passed: boolean; refs: string[] };

/** Parses pasted text and checks it. Refuses empty input and lists longer than the limit. */
export async function runCheck(raw: string, lookup: Lookup = crossrefLookup): Promise<CheckRun> {
  const refs = parseReferenceList(raw);
  if (!refs.length) throw new Error("Paste at least one reference.");
  if (refs.length > MAX_REFERENCES) throw new Error(`Check at most ${MAX_REFERENCES} references at a time.`);
  const tooLong = refs.find((r) => r.length > MAX_REFERENCE_CHARS);
  if (tooLong) throw new Error(`A reference is longer than ${MAX_REFERENCE_CHARS} characters: "${tooLong.slice(0, 60)}…".`);
  const items = await checkReferences(refs, lookup);
  return { items, passed: items.every((i) => i.status === "pass"), refs };
}
