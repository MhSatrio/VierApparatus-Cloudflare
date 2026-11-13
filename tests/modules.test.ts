import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { tempDb, markReferencesChecked } from "./helpers";
import { bootstrapOwner, createContributorAccount } from "@/lib/auth/service";
import { conn } from "@/lib/db/client";
import { viewerOf } from "@/lib/planner-http";
import { BIOLOGY_LEVELS, BIOLOGY_SPECIALIZATIONS, generalSpecialization, genericLevels, SUBJECTS } from "@/lib/modules/curriculum";
import { CURRICULUM_SPECIALIZATIONS, specializationLevels } from "@/lib/modules/curriculum-specializations";
import { doiUrl, moduleHref, normalizeDoi, readableSequence } from "@/lib/modules/shared";
import {
  buildTree, canEditModule, createModuleTask, ensureCurriculum, findNode, getModuleEdit, getModulePage, getOutline, getSubjectTree, getSubjectWithSpecializations, listModuleUrls, listSubjects,
  ModuleError, publishProblems, saveModule, setModulePublication, MIN_PUBLISH_WORDS,
} from "@/lib/store/modules";
import { assignRecord, getRecord, listRecords, transition, updateRecord } from "@/lib/store/planner";
import { createArticle } from "@/lib/store/articles";
import { getUserByEmail, type User } from "@/lib/store/users";

const words = (count: number, seed = "cell") => Array.from({ length: count }, (_, i) => `${seed}${i % 7}`).join(" ");
const body = (count: number) => ({
  version: 1 as const,
  blocks: [
    { type: "heading" as const, level: 2 as const, content: [{ t: "text" as const, text: "What a cell is" }] },
    { type: "paragraph" as const, content: [{ t: "text" as const, text: words(count) }] },
    { type: "heading" as const, level: 2 as const, content: [{ t: "text" as const, text: "Why it matters" }] },
    { type: "paragraph" as const, content: [{ t: "text" as const, text: words(20, "matter") }] },
  ],
});
const REF = { text: "Placeholder Author. (2020). A reference written for this automated test only. Journal of Tests, 1(1), 1-2.", doi: "https://doi.org/10.1234/test.2020.1" };
const saveBody = (over: Record<string, unknown> = {}) => ({
  title: "Introduction to Biology",
  summary: "What biology is.",
  objectives: ["Explain what biology studies"],
  prerequisites: [],
  references: [REF],
  contentStatus: "final" as const,
  doc: body(MIN_PUBLISH_WORDS + 20),
  ...over,
});

describe("shared helpers", () => {
  it("reads a DOI from the forms people paste, and refuses anything else", () => {
    expect(normalizeDoi("10.1038/171737a0")).toBe("10.1038/171737a0");
    expect(normalizeDoi("https://doi.org/10.1038/171737a0")).toBe("10.1038/171737a0");
    expect(normalizeDoi("doi: 10.1038/171737a0")).toBe("10.1038/171737a0");
    expect(normalizeDoi("not a doi")).toBeNull();
    expect(normalizeDoi("10.12/short")).toBeNull();
    expect(doiUrl("10.1038/171737a0")).toBe("https://doi.org/10.1038/171737a0");
  });
  it("builds hierarchical addresses", () => {
    expect(moduleHref("bio", "general-biology", "foundations")).toBe("/module/bio/general-biology/foundations");
    expect(moduleHref("bio", "general-biology", "foundations", ["cell-biology", "membranes"])).toBe("/module/bio/general-biology/foundations/cell-biology/membranes");
  });
});

describe("the curriculum data", () => {
  it("has six main subjects: derivatives such as bioinformatics are specializations, never subjects", () => {
    expect(SUBJECTS.map((x) => x.slug)).toEqual(["bio", "chem", "phys", "math", "cs", "stats"]);
    const names = SUBJECTS.map((x) => x.name);
    for (const derived of ["Biomedical Sciences", "Bioinformatics", "Computational Biology", "Neuroscience"]) expect(names).not.toContain(derived);
    expect(generalSpecialization("Computer Science")).toMatchObject({ slug: "general-computer-science", name: "General Computer Science" });
  });
  it("lists Biology's 35 specializations, General Biology first and the three former subjects among them", () => {
    expect(BIOLOGY_SPECIALIZATIONS).toHaveLength(35);
    expect(BIOLOGY_SPECIALIZATIONS[0].slug).toBe("general-biology");
    expect(BIOLOGY_SPECIALIZATIONS[34].name).toBe("Other Emerging Biological Disciplines");
    const slugs = BIOLOGY_SPECIALIZATIONS.map((x) => x.slug);
    expect(new Set(slugs).size).toBe(35);
    for (const s of ["biomedical-sciences", "bioinformatics", "computational-biology", "molecular-biology", "biophysics", "biostatistics"]) expect(slugs).toContain(s);
    for (const sp of BIOLOGY_SPECIALIZATIONS) expect(sp.description.length).toBeGreaterThan(10);
  });
  it("has a level ladder for every specialization that has no curriculum of its own", () => {
    expect(genericLevels("Chemistry").map((l) => l.slug)).toEqual(["foundations", "basic", "intermediate", "advanced", "specialization", "research", "phd"]);
  });
  it("gives each of the six specializations with a curriculum 7 levels, 4 disciplines of 7 modules each (196 modules), with unique titles", () => {
    expect(CURRICULUM_SPECIALIZATIONS).toEqual(["molecular-biology", "cell-biology", "genetics-and-genomics", "biochemistry", "microbiology", "neuroscience"]);
    for (const slug of CURRICULUM_SPECIALIZATIONS) {
      const name = BIOLOGY_SPECIALIZATIONS.find((b) => b.slug === slug)!.name;
      const levels = specializationLevels(slug, name);
      expect(levels).toHaveLength(7);
      for (const l of levels) {
        expect(l.disciplines).toHaveLength(4);
        expect(l.disciplines.reduce((a, d) => a + d.modules.length, 0)).toBeGreaterThanOrEqual(7);
      }
      const all = levels.flatMap((l) => l.disciplines.flatMap((d) => d.modules));
      expect(all).toHaveLength(196);
      expect(new Set(all).size).toBe(all.length);
    }
  });

  it("has the 12 Biology levels with the module counts of the PRD, 232 modules in all, each unique within its level", () => {
    expect(BIOLOGY_LEVELS).toHaveLength(12);
    const counts = BIOLOGY_LEVELS.map((l) => l.disciplines.reduce((a, d) => a + d.modules.length, 0));
    expect(counts).toEqual([14, 15, 18, 18, 18, 17, 29, 20, 21, 23, 17, 22]);
    expect(counts.reduce((a, b) => a + b, 0)).toBe(232);
    for (const l of BIOLOGY_LEVELS) {
      const titles = l.disciplines.flatMap((d) => d.modules);
      expect(new Set(titles).size).toBe(titles.length);
    }
    const all = BIOLOGY_LEVELS.flatMap((l) => l.disciplines.flatMap((d) => d.modules));
    for (const t of ["Introduction to Biology", "Water, Acids, Bases and pH", "CRISPR and Genome Editing", "Single-Cell RNA-seq", "Flux Balance Analysis", "Foundation Models for Biological Sequences", "Original Scientific Contributions"]) expect(all).toContain(t);
  });
});

describe("learning modules (database)", () => {
  let cleanup: () => void;
  let owner: User;
  let wendy: User;
  let sam: User;
  let ownerView: ReturnType<typeof viewerOf>;
  let wendyView: ReturnType<typeof viewerOf>;
  let samView: ReturnType<typeof viewerOf>;
  let seeded: Awaited<ReturnType<typeof ensureCurriculum>>;

  beforeAll(async () => {
    cleanup = tempDb();
    await bootstrapOwner({ email: "info@vierapparatus.com", name: "Editor In Chief", password: "Owner-Modules-Pass-2026!" });
    owner = (await getUserByEmail("info@vierapparatus.com"))!;
    const mk = async (name: string, email: string) => {
      const r = await createContributorAccount(owner.id, { name, email, password: "Contributor-Pass-2026!", permissions: ["collab.access", "articles.write", "modules.write"] });
      if (!r.ok) throw new Error(r.error);
      return r.user;
    };
    wendy = await mk("Wendy Writer", "wendy@example.org");
    sam = await mk("Sam Scientist", "sam@example.org");
    ownerView = viewerOf(owner);
    wendyView = viewerOf(wendy);
    samView = viewerOf(sam);
    seeded = await ensureCurriculum({ id: owner.id, name: owner.name });
  });
  afterAll(() => cleanup());

  it("installs the six subjects, 40 specializations, their levels, the 1408 modules (232 General Biology and 196 in each of six specializations) and a planner task for each", () => {
    // 35 Biology specializations + 5 General ones; General Biology has 12 levels, each of the other 39 has 7
    expect(seeded).toEqual({ subjects: 6, specializations: 40, levels: 12 + 39 * 7, modules: 1408, tasks: 1408 });
  });

  it("leaves no redirect on an address that is a real specialization", async () => {
    const db = await conn();
    const r = await db.execute("SELECT COUNT(*) AS c FROM module_redirects WHERE from_path IN (SELECT '/module/' || t.route_slug || '/' || s.route_slug FROM module_subjects s JOIN module_subjects t ON t.id = s.parent_id)");
    expect(Number(r.rows[0].c)).toBe(0);
  });

  it("is safe to run again: nothing is added twice and nothing edited is changed", async () => {
    const db = await conn();
    await db.execute({ sql: "UPDATE modules SET title = 'Intro (edited)' WHERE slug = 'introduction-to-biology' AND kind = 'module'" , args: [] });
    expect(await ensureCurriculum({ id: owner.id, name: owner.name })).toEqual({ subjects: 0, specializations: 0, levels: 0, modules: 0, tasks: 0 });
    const r = (await db.execute("SELECT title FROM modules WHERE slug = 'introduction-to-biology' AND kind = 'module'")).rows[0];
    expect(String(r.title)).toBe("Intro (edited)");
    await db.execute({ sql: "UPDATE modules SET title = 'Introduction to Biology' WHERE slug = 'introduction-to-biology' AND kind = 'module'", args: [] });
  });

  it("lists the six subjects, Biology with its 35 specializations", async () => {
    const subs = await listSubjects();
    expect(subs.map((x) => x.slug)).toEqual(["bio", "chem", "phys", "math", "cs", "stats"]);
    const bio = subs[0];
    expect(bio.specializationCount).toBe(35);
    expect(bio.levelCount).toBe(12 + 34 * 7);
    expect(bio.moduleCount).toBe(1408);
    expect(bio.readableCount).toBe(0);
    expect(subs[1].specializationCount).toBe(1);
    expect(subs[1].levelCount).toBe(7);
    expect(subs[1].moduleCount).toBe(0);
  });

  it("shows Biomedical Sciences, Bioinformatics and Computational Biology as Biology specializations, and General Biology as a real one", async () => {
    const bio = (await getSubjectWithSpecializations("bio"))!;
    expect(bio.specializations.map((x) => x.slug)).toEqual(BIOLOGY_SPECIALIZATIONS.map((x) => x.slug));
    const gb = bio.specializations[0];
    expect(gb).toMatchObject({ name: "General Biology", levelCount: 12, moduleCount: 232 });
    for (const slug of ["biomedical-sciences", "bioinformatics", "computational-biology"]) expect(bio.specializations.find((x) => x.slug === slug)?.levelCount).toBe(7);
    // no longer subjects of their own
    expect(await getSubjectWithSpecializations("biomed")).toBeNull();
    expect(await getSubjectWithSpecializations("bioinf")).toBeNull();
    expect(await getSubjectWithSpecializations("compbio")).toBeNull();
    expect((await getSubjectTree("bio", "bioinformatics"))?.levels).toHaveLength(7);
  });

  it("builds Biology as levels, then disciplines, then modules, none readable until written and published", async () => {
    const tree = (await getSubjectTree("bio", "general-biology"))!;
    expect(tree.spec.name).toBe("General Biology");
    expect(tree.subject.name).toBe("Biology");
    expect(tree.levels.map((l) => l.slug)).toEqual(BIOLOGY_LEVELS.map((l) => l.slug));
    const l1 = tree.levels[0];
    expect(l1.nodes.map((x) => x.kind)).toEqual(["discipline", "discipline", "discipline", "discipline"]);
    expect(l1.nodes[0].children[0].title).toBe("Introduction to Biology");
    expect(l1.nodes[0].children[0].trail).toEqual(["introduction-to-biology"]);
    expect(readableSequence(tree)).toEqual([]);
    expect(await getSubjectTree("nope", "general-biology")).toBeNull();
    expect(await getSubjectTree("bio", "nope")).toBeNull();
    const info = { id: "s", slug: "s", name: "S", tagline: "", description: "", accent: "brand", sort: 0, coverUrl: "", coverThumbUrl: "" };
    expect(buildTree(info, { ...info, subjectSlug: "s" }, [], [])).toEqual({ subject: expect.anything(), spec: expect.anything(), levels: [] });
  });

  it("gives a module that is not published no public page", async () => {
    expect(await getModulePage("bio", "general-biology", "foundations", ["introduction-to-biology"])).toBeNull();
    expect(await getModulePage("bio", "general-biology", "foundations", ["nope"])).toBeNull();
  });

  it("shows both kinds of task in the Planner, kept apart by type", async () => {
    await createArticle(
      { title: "An ordinary article task", excerpt: "A summary that is long enough to publish.", authorName: "Owner", categoryId: "cat_microbiology", doc: { version: 1, blocks: [] }, tags: [], featured: false, source: "editor" } as never,
      { id: null, name: "Owner" },
    );
    const mods = await listRecords(ownerView, { type: "module", limit: 500 });
    expect(mods.total).toBe(1408);
    expect(mods.items.every((r) => r.contentType === "module" && r.module)).toBe(true);
    const first = (await listRecords(ownerView, { type: "module", q: "Introduction to Biology", limit: 50 })).items.find((r) => r.title === "Introduction to Biology")!;
    expect(first.module).toMatchObject({ kind: "module", subjectSlug: "bio", subjectName: "Biology", specializationSlug: "general-biology", specializationName: "General Biology", levelSlug: "foundations", levelNum: 1, discipline: "The nature of biology", moduleTitle: "Introduction to Biology", chapter: "", contentStatus: "not_started", publication: "draft", hasBody: false });
    const arts = await listRecords(ownerView, { type: "article", limit: 500 });
    expect(arts.items.some((r) => r.contentType === "module")).toBe(false);
  });

  it("plans a new module and one of its chapters from a form, creating what is missing", async () => {
    const task = await createModuleTask(ownerView, {
      subjectSlug: "chem", specializationSlug: "general-chemistry", levelSlug: "basic", discipline: "Atoms and bonds", moduleTitle: "The periodic table", chapter: "Groups and periods",
      objectives: ["Read the periodic table"], prerequisites: ["Basic arithmetic"], assignedTo: wendy.id, brief: "Plan first.",
    });
    expect(task.contentType).toBe("module");
    expect(task.title).toBe("Groups and periods");
    expect(task.assignedTo).toBe(wendy.id);
    expect(task.module).toMatchObject({ kind: "chapter", subjectName: "Chemistry", levelName: "Basic Chemistry", discipline: "Atoms and bonds", moduleTitle: "The periodic table", chapter: "Groups and periods" });
    const outline = await getOutline();
    const basic = outline.find((x) => x.slug === "chem")!.specializations.find((sp) => sp.slug === "general-chemistry")!.levels.find((l) => l.slug === "basic")!;
    expect(basic.disciplines).toContain("Atoms and bonds");
    expect(basic.modules.map((m) => m.title)).toContain("The periodic table");
    // the module itself can have its own task too, and the same chapter cannot be planned twice
    expect((await createModuleTask(ownerView, { subjectSlug: "chem", specializationSlug: "general-chemistry", levelSlug: "basic", moduleTitle: "The periodic table" })).module?.kind).toBe("module");
    await expect(createModuleTask(ownerView, { subjectSlug: "chem", specializationSlug: "general-chemistry", levelSlug: "basic", moduleTitle: "The periodic table", chapter: "Groups and periods" })).rejects.toMatchObject({ code: "conflict" });
  });

  it("refuses a task for an unknown subject or level, and for anyone but the owner", async () => {
    await expect(createModuleTask(ownerView, { subjectSlug: "nope", specializationSlug: "general-chemistry", levelSlug: "basic", moduleTitle: "Anything" })).rejects.toMatchObject({ code: "invalid" });
    await expect(createModuleTask(ownerView, { subjectSlug: "chem", specializationSlug: "general-chemistry", levelSlug: "nope", moduleTitle: "Anything" })).rejects.toMatchObject({ code: "invalid" });
    await expect(createModuleTask(wendyView, { subjectSlug: "chem", specializationSlug: "general-chemistry", levelSlug: "basic", moduleTitle: "Anything else" })).rejects.toMatchObject({ code: "forbidden" });
    await expect(createModuleTask(ownerView, { subjectSlug: "chem", specializationSlug: "general-chemistry", levelSlug: "basic", moduleTitle: "ab" })).rejects.toThrow();
  });

  describe("writing, review and publishing", () => {
    let moduleId: string;
    let taskId: string;
    beforeAll(async () => {
      const t = (await listRecords(ownerView, { type: "module", q: "Introduction to Biology", limit: 50 })).items.find((r) => r.title === "Introduction to Biology")!;
      moduleId = t.module!.nodeId;
      taskId = t.id;
      await assignRecord(ownerView, taskId, wendy.id);
    });

    it("lets the assigned contributor edit, and nobody else", async () => {
      expect(await canEditModule(ownerView, moduleId)).toBe(true);
      expect(await canEditModule(wendyView, moduleId)).toBe(true);
      expect(await canEditModule(samView, moduleId)).toBe(false);
      expect(await getModuleEdit(samView, moduleId)).toBeNull();
    });

    it("covers the chapters of a module that is assigned", async () => {
      const chapter = await createModuleTask(ownerView, { subjectSlug: "bio", specializationSlug: "general-biology", levelSlug: "foundations", moduleTitle: "Introduction to Biology", chapter: "What biologists study" });
      expect(chapter.module?.kind).toBe("chapter");
      expect(await canEditModule(wendyView, chapter.module!.nodeId)).toBe(true);
      expect(await canEditModule(samView, chapter.module!.nodeId)).toBe(false);
    });

    it("saves the text, renders it with its headings, and counts the words", async () => {
      const saved = await saveModule(wendyView, moduleId, saveBody({ contentStatus: "drafting" }));
      expect(saved.wordCount).toBeGreaterThan(MIN_PUBLISH_WORDS);
      expect(saved.references[0].doi).toBe("10.1234/test.2020.1");
      expect(saved.version).toBeGreaterThan(1);
      const task = (await getRecord(ownerView, taskId))!;
      expect(task.module?.hasBody).toBe(true);
    });

    it("refuses a stale save and a contributor moving the content status past drafting", async () => {
      const cur = (await getModuleEdit(ownerView, moduleId))!.module;
      await expect(saveModule(wendyView, moduleId, saveBody({ contentStatus: "drafting", expectedVersion: cur.version - 1 }))).rejects.toMatchObject({ code: "conflict" });
      await expect(saveModule(wendyView, moduleId, saveBody({ contentStatus: "final" }))).rejects.toMatchObject({ code: "forbidden" });
      await expect(saveModule(wendyView, moduleId, { ...saveBody({ contentStatus: "drafting" }), doc: { version: 2, blocks: [] } })).rejects.toBeInstanceOf(ModuleError);
      await expect(saveModule(wendyView, moduleId, saveBody({ contentStatus: "drafting", references: [{ text: "A reference that is long enough.", doi: "not-a-doi" }] }))).rejects.toThrow();
    });

    it("keeps one name for a module and its task, in both directions", async () => {
      await saveModule(wendyView, moduleId, saveBody({ title: "Introduction to Biology (revised)", contentStatus: "drafting" }));
      expect((await getRecord(ownerView, taskId))!.title).toBe("Introduction to Biology (revised)");
      await updateRecord(ownerView, taskId, { title: "Introduction to Biology" });
      expect((await getModuleEdit(ownerView, moduleId))!.module.title).toBe("Introduction to Biology");
    });

    it("follows the review: submitting means scientific review and locks the contributor out; approval means final", async () => {
      await transition(wendyView, taskId, "start");
      await transition(wendyView, taskId, "submit", "Ready for review");
      expect((await getModuleEdit(ownerView, moduleId))!.module.contentStatus).toBe("scientific_review");
      const locked = await getModuleEdit(wendyView, moduleId);
      expect(locked?.canWrite).toBe(false);
      await expect(saveModule(wendyView, moduleId, saveBody({ contentStatus: "drafting" }))).rejects.toMatchObject({ code: "forbidden" });
      await transition(ownerView, taskId, "approve");
      expect((await getModuleEdit(ownerView, moduleId))!.module.contentStatus).toBe("final");
    });

    it("will not publish until the quality rules are met, and says what is missing", async () => {
      const db = await conn();
      await db.execute({ sql: "UPDATE modules SET content_status = 'drafting', objectives = '[]', refs = '[]' WHERE id = ?", args: [moduleId] });
      const blocked = await setModulePublication(ownerView, moduleId, "published");
      expect(blocked.ok).toBe(false);
      if (!blocked.ok) {
        const text = blocked.problems.join(" ");
        expect(text).toMatch(/learning objective/);
        expect(text).toMatch(/reference/);
        expect(text).toMatch(/Final/);
      }
      expect(publishProblems({ kind: "module", title: "x", objectives: ["a"], references: [REF], contentStatus: "final", wordCount: 5, refcheckStatus: "pass", refcheckCurrent: true, refcheckReport: [{ index: 0, text: REF.text, status: "pass", reason: "", doi: "", matched: null }] }).join(" ")).toMatch(/at least 100/);
      expect(await getModulePage("bio", "general-biology", "foundations", ["introduction-to-biology"])).toBeNull();
    });

    it("publishes by the owner only, then serves the module with Previous and Next", async () => {
      await saveModule(ownerView, moduleId, saveBody({ contentStatus: "final" }));
      await expect(setModulePublication(wendyView, moduleId, "published")).rejects.toMatchObject({ code: "forbidden" });
      await markReferencesChecked("module", moduleId);
      const done = await setModulePublication(ownerView, moduleId, "published");
      expect(done.ok).toBe(true);
      expect((await getRecord(ownerView, taskId))!.status).toBe("done");

      // a second module, so there is something to go to next
      const second = (await listRecords(ownerView, { type: "module", q: "Characteristics of Life", limit: 50 })).items.find((r) => r.title === "Characteristics of Life")!;
      await saveModule(ownerView, second.module!.nodeId, saveBody({ title: "Characteristics of Life" }));
      await markReferencesChecked("module", second.module!.nodeId);
      expect((await setModulePublication(ownerView, second.module!.nodeId, "published")).ok).toBe(true);

      const page = (await getModulePage("bio", "general-biology", "foundations", ["introduction-to-biology"]))!;
      expect(page.node.title).toBe("Introduction to Biology");
      expect(page.html).toContain("What a cell is");
      expect(page.headings.map((h) => h.text)).toEqual(["What a cell is", "Why it matters"]);
      expect(page.objectives).toEqual(["Explain what biology studies"]);
      expect(page.references[0].doi).toBe("10.1234/test.2020.1");
      expect(page.prev).toBeNull();
      expect(page.next).toEqual({ title: "Characteristics of Life", href: "/module/bio/general-biology/foundations/characteristics-of-life" });
      expect((await getModulePage("bio", "general-biology", "foundations", ["characteristics-of-life"]))!.prev?.title).toBe("Introduction to Biology");
      expect((await listSubjects())[0].readableCount).toBe(2);
    });

    it("lists the public addresses for the sitemap", async () => {
      const all = await listModuleUrls();
      const urls = all.map((u) => u.path);
      expect(all.find((u) => u.path === "/module/bio/general-biology/foundations/introduction-to-biology")?.updatedAt).toBeTruthy();
      expect(all.find((u) => u.path === "/module/bio")?.updatedAt).toBeNull();
      expect(urls).toContain("/module");
      expect(urls).toContain("/module/bio");
      expect(urls).toContain("/module/bio/general-biology");
      expect(urls).toContain("/module/bio/bioinformatics");
      expect(urls).toContain("/module/bio/general-biology/foundations");
      expect(urls).toContain("/module/bio/general-biology/foundations/introduction-to-biology");
      expect(urls).not.toContain("/module/bio/general-biology/foundations/microscopy");
      expect(urls).not.toContain("/module/biomed");
    });

    it("takes a module back to draft: no public page, and the task is approved again", async () => {
      expect((await setModulePublication(ownerView, moduleId, "draft")).ok).toBe(true);
      expect(await getModulePage("bio", "general-biology", "foundations", ["introduction-to-biology"])).toBeNull();
      expect((await getRecord(ownerView, taskId))!.status).toBe("approved");
    });

    it("finds a node by its address", async () => {
      const tree = (await getSubjectTree("bio", "general-biology"))!;
      const hit = findNode(tree, "foundations", ["introduction-to-biology"])!;
      expect(hit.node.title).toBe("Introduction to Biology");
      expect(hit.crumbs.map((c) => c.title)).toEqual(["Foundations of Biology"]);
      expect(findNode(tree, "foundations", ["introduction-to-biology", "what-biologists-study"])!.crumbs.map((c) => c.title)).toEqual(["Foundations of Biology", "Introduction to Biology"]);
      expect(findNode(tree, "nope", ["x"])).toBeNull();
    });
  });
});
