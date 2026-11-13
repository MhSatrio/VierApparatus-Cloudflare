import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { tempDb, TEST_REFERENCE } from "./helpers";
import { parseReferenceList, extractDoi, extractYear, extractFirstAuthor } from "@/lib/refcheck/parse";
import { judge, normalize, titleScore, type CrossrefWork } from "@/lib/refcheck/judge";
import { checkReferences, runCheck, type Lookup } from "@/lib/refcheck/check";
import { refsHash, refsHashOf } from "@/lib/refcheck/hash";
import { refcheckGate } from "@/lib/store/refcheck";

const CARROLL: CrossrefWork = {
  doi: "10.1016/j.cell.2008.06.030",
  title: "Evo-devo and an expanding evolutionary synthesis: a genetic theory of morphological evolution",
  year: 2008,
  authors: ["Carroll"],
  container: "Cell",
};
const CARROLL_REF = "Carroll, S. B. (2008). Evo-devo and an expanding evolutionary synthesis: A genetic theory of morphological evolution. Cell, 134(1), 25-36. https://doi.org/10.1016/j.cell.2008.06.030";

/** A stand-in for Crossref: DOIs and searches are answered from a fixed table. */
function fakeLookup(byDoi: Record<string, CrossrefWork | null>, search: CrossrefWork[] = [], fail = false): Lookup {
  return {
    async byDoi(doi) {
      if (fail) throw new Error("network down");
      return byDoi[doi] ?? null;
    },
    async search() {
      if (fail) throw new Error("network down");
      return search;
    },
  };
}

describe("reference list parsing", () => {
  it("reads one reference per blank-line block, and one per line when each line starts a reference", () => {
    const pasted = `${CARROLL_REF}\n\nMunafò, M. R., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021.\nPeng, R. D. (2011). Reproducible research in computational science. Science, 334(6060), 1226-1227.`;
    const refs = parseReferenceList(pasted);
    expect(refs).toHaveLength(3);
    expect(refs[0]).toBe(CARROLL_REF);
    expect(refs[2]).toMatch(/^Peng, R\. D\./);
  });

  it("joins a reference that is wrapped over several lines", () => {
    const refs = parseReferenceList("Page, M. J., McKenzie, J. E., & Moher, D. (2021). The PRISMA 2020 statement:\nan updated guideline. BMJ, 372, n71.");
    expect(refs).toHaveLength(1);
    expect(refs[0]).toContain("an updated guideline");
  });

  it("reads the DOI, year and first author, without trailing punctuation in the DOI", () => {
    expect(extractDoi("Ioannidis, J. P. A. (2005). Why most. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124.")).toBe("10.1371/journal.pmed.0020124");
    expect(extractYear("Cumming, G. (2014). The new statistics.")).toBe(2014);
    expect(extractYear("Ioannidis, J. P. A. (2005a). Why.")).toBe(2005);
    expect(extractFirstAuthor("Munafò, M. R., Nosek, B. A.")).toBe("Munafò");
    expect(extractDoi("No identifier here.")).toBe("");
  });
});

describe("matching one reference against Crossref", () => {
  it("passes a reference whose title, year and first author agree with the record", () => {
    const j = judge({ text: CARROLL_REF, year: 2008 }, CARROLL);
    expect(j.pass).toBe(true);
    expect(j.titleScore).toBeGreaterThanOrEqual(0.8);
  });

  it("fails when the title is about something else", () => {
    const j = judge({ text: "Carroll, S. B. (2008). Ecology of coral reefs in the Pacific. Cell, 1, 1-2.", year: 2008 }, CARROLL);
    expect(j.pass).toBe(false);
    expect(j.reason).toMatch(/title does not match/);
  });

  it("fails when the year is more than one year away, and accepts one year either side", () => {
    expect(judge({ text: CARROLL_REF.replace("2008", "2011"), year: 2011 }, CARROLL).reason).toMatch(/year differs/);
    expect(judge({ text: CARROLL_REF.replace("2008", "2009"), year: 2009 }, CARROLL).pass).toBe(true);
  });

  it("fails when the first author is someone else", () => {
    const j = judge({ text: CARROLL_REF.replace("Carroll, S. B.", "Smith, J. A."), year: 2008 }, CARROLL);
    expect(j.reason).toMatch(/first author differs/);
  });

  it("ignores accents and punctuation when comparing words", () => {
    expect(normalize("Munafò, M. R.")).toBe("munafo m r");
    expect(titleScore("Reproducible research", "Reproducible: Research!")).toBe(1);
  });
});

describe("checking a list, with a stand-in for Crossref", () => {
  it("passes a reference found by its DOI and a reference found by search", async () => {
    const items = await checkReferences([CARROLL_REF, "Carroll, S. B. (2008). Evo-devo and an expanding evolutionary synthesis: A genetic theory of morphological evolution. Cell, 134(1), 25-36."], fakeLookup({ [CARROLL.doi]: CARROLL }, [CARROLL]));
    expect(items.map((i) => i.status)).toEqual(["pass", "pass"]);
    expect(items[0].matched?.doi).toBe(CARROLL.doi);
  });

  it("fails a DOI that Crossref does not know, and says so", async () => {
    const [item] = await checkReferences([CARROLL_REF.replace(CARROLL.doi, "10.9999/not.real")], fakeLookup({}));
    expect(item.status).toBe("fail");
    expect(item.reason).toMatch(/not in Crossref/);
  });

  it("fails a DOI that points to a different paper", async () => {
    const other: CrossrefWork = { ...CARROLL, title: "Quantum tunnelling in ice crystals", authors: ["Watanabe"], year: 1999 };
    const [item] = await checkReferences([CARROLL_REF], fakeLookup({ [CARROLL.doi]: other }));
    expect(item.status).toBe("fail");
    expect(item.reason).toMatch(/different paper/);
    expect(item.matched?.title).toBe(other.title);
  });

  it("fails a reference with no DOI when search finds nothing that matches it all", async () => {
    const [item] = await checkReferences(["Nobody, A. (2030). A paper that was never written about nothing. Nowhere, 1, 1-2."], fakeLookup({}, []));
    expect(item.status).toBe("fail");
    expect(item.reason).toMatch(/No record found/);
  });

  it("never passes a reference it could not check, and says Crossref could not be reached", async () => {
    const items = await checkReferences([CARROLL_REF], fakeLookup({}, [], true));
    expect(items[0].status).toBe("fail");
    expect(items[0].reason).toMatch(/could not be reached/);
  });

  it("refuses an empty paste and a list over the limit, before any lookup", async () => {
    await expect(runCheck("   \n\n  ", fakeLookup({}))).rejects.toThrow(/at least one reference/);
    const many = Array.from({ length: 101 }, (_, i) => `Author${i}, A. (2020). Title number ${i} of many. Journal, 1, 1-2.`).join("\n\n");
    await expect(runCheck(many, fakeLookup({}))).rejects.toThrow(/at most 100/);
  });

  it("reports the whole list as passed only when every reference passed", async () => {
    const run = await runCheck(`${CARROLL_REF}\n\nNobody, A. (2030). A paper that was never written about nothing. Nowhere, 1, 1-2.`, fakeLookup({ [CARROLL.doi]: CARROLL }));
    expect(run.passed).toBe(false);
    expect(run.items.map((i) => i.status)).toEqual(["pass", "fail"]);
  });
});

describe("the publish gate and the fingerprint of a list", () => {
  const pass = [{ index: 0, text: "x", status: "pass" as const, reason: "", doi: "", matched: null }];
  it("needs references, a passing check, and a check of the current list", () => {
    expect(refcheckGate({ count: 0, status: "pass", current: true, report: pass })[0]).toMatch(/Add the references/);
    expect(refcheckGate({ count: 1, status: "pass", current: false, report: pass })[0]).toMatch(/changed after the last check/);
    expect(refcheckGate({ count: 1, status: "pass", current: true, report: pass })).toEqual([]);
    expect(refcheckGate({ count: 2, status: "fail", current: true, report: [...pass, { ...pass[0], status: "fail" as const }] })[0]).toMatch(/1 reference did not pass/);
    expect(refcheckGate({ count: 1, status: "not_checked", current: true, report: [] })[0]).toMatch(/has not passed yet/);
  });

  it("changes when a reference changes and not when only the order of other fields does", () => {
    const a = refsHash([{ text: CARROLL_REF, doi: CARROLL.doi }]);
    expect(refsHashOf([{ text: `  ${CARROLL_REF} `, doi: CARROLL.doi }])).toBe(a);
    expect(refsHashOf([{ text: CARROLL_REF + " ", doi: "" }])).not.toBe(a);
  });

  it("the test reference is itself a valid, checkable reference", () => {
    expect(parseReferenceList(TEST_REFERENCE)).toEqual([TEST_REFERENCE]);
  });
});

describe("recording a check and setting the status (database)", () => {
  let cleanup: () => void;
  beforeAll(() => {
    cleanup = tempDb();
  });
  afterAll(() => cleanup());

  it("records a pass only from a real check, refuses a typed pass, and resets when the list changes", async () => {
    const { createArticle } = await import("@/lib/store/articles");
    const { saveRefcheck, setRefcheckStatus, RefcheckError } = await import("@/lib/store/refcheck");
    const { getArticleById } = await import("@/lib/store/articles");
    const doc = { version: 1 as const, blocks: [{ type: "paragraph" as const, content: [{ t: "text" as const, text: "Body" }] }] };
    const a = await createArticle({ title: "Reference test", excerpt: "A summary that is long enough to publish.", categoryId: null, authorName: "Test Author", tags: [], doc }, { id: null });

    // a typed pass, with nothing checked, is refused
    await expect(setRefcheckStatus("article", a.id, "pass", null)).rejects.toBeInstanceOf(RefcheckError);

    // a real check that fails is recorded as a fail, and the list is saved with it
    const bad = await saveRefcheck("article", a.id, "Nobody, A. (2030). A paper that was never written about nothing. Nowhere, 1, 1-2.", null, fakeLookup({}, []));
    expect(bad.status).toBe("fail");
    expect((await getArticleById(a.id))!.refcheckStatus).toBe("fail");

    // a check that passes is recorded as a pass for the current list
    const good = await saveRefcheck("article", a.id, TEST_REFERENCE, null, fakeLookup({ "10.1234/test.2020.1": { doi: "10.1234/test.2020.1", title: "A reference written for this automated test only", year: 2020, authors: ["Placeholder"], container: "Journal of Tests" } }));
    expect(good.status).toBe("pass");
    const after = (await getArticleById(a.id))!;
    expect(after.refcheckStatus).toBe("pass");
    expect(after.refcheckCurrent).toBe(true);
    expect(after.refs).toEqual([{ text: TEST_REFERENCE, doi: "10.1234/test.2020.1" }]);

    // a fail can be set by hand to block publishing; a pass can be restored only from a passing check
    expect(await setRefcheckStatus("article", a.id, "fail", null)).toBe("fail");
    expect(await setRefcheckStatus("article", a.id, "pass", null)).toBe("pass");
  });
});
