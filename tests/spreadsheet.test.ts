import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { tempDb } from "./helpers";
import { bootstrapOwner, createContributorAccount } from "@/lib/auth/service";
import { conn } from "@/lib/db/client";
import { viewerOf } from "@/lib/planner-http";
import { cellText, detectHeader, gridColumns, parseCell, parseDate, parseTsv, planPaste, toTsv, type Lookups } from "@/lib/planner-paste";
import type { PlannerField, PlannerRecord } from "@/lib/planner-shared";
import { bulkApply, createDraftForRecord, createField, createRecord, getRecord, listRecords, PlannerError } from "@/lib/store/planner";
import { getArticleById } from "@/lib/store/articles";
import { getUserByEmail, type User } from "@/lib/store/users";

const lookups: Lookups = { people: [{ id: "u_wendy", name: "Wendy Writer" }], topics: [{ id: "cat_micro", name: "Microbiology" }] };
const sourceField: PlannerField = { id: "pf_src", name: "Source type", type: "select", options: ["Journal", "Preprint"], sort: 1 };
const wordsField: PlannerField = { id: "pf_words", name: "Words", type: "number", options: [], sort: 2 };
const columns = gridColumns([sourceField, wordsField], lookups);
const rec = (over: Partial<PlannerRecord>): PlannerRecord => ({
  id: "p1", num: 1, ref: "T-0001", title: "First task", brief: "", topicId: null, topicName: null, status: "planned", priority: "normal", dueDate: null, assignedTo: null, assignedToName: null, sharedWith: [],
  articleId: null, articleTitle: null, articleStatus: null, articleVersion: null, articleLastEditor: null, articleUpdatedAt: null, reviewStatus: "none", researchNotes: "", notes: "", custom: {}, contentType: "article", module: null,
  createdBy: "o", createdByName: "Owner", updatedByName: "Owner", version: 3, createdAt: "2026-01-01T00:00:00Z", updatedAt: "2026-01-02T00:00:00Z", ...over,
});
const col = (key: string) => columns.find((c) => c.key === key)!;

describe("reading spreadsheet text", () => {
  it("parses tab-separated text with quoted cells, blank cells and Windows line endings", () => {
    expect(parseTsv("a\tb\r\nc\t\td\r\n")).toEqual([["a", "b"], ["c", "", "d"]]);
    expect(parseTsv('"two\nlines"\t"say ""hi"""\tx')).toEqual([["two\nlines", 'say "hi"', "x"]]);
    expect(parseTsv("\n\n")).toEqual([]);
    expect(parseTsv(toTsv([["a\tb", 'q"q', "plain"]]))).toEqual([["a\tb", 'q"q', "plain"]]);
  });
  it("reads dates the way people write them, and rejects impossible ones", () => {
    expect(parseDate("2026-12-31")).toBe("2026-12-31");
    expect(parseDate("31/12/2026")).toBe("2026-12-31");
    expect(parseDate("1.2.2026")).toBe("2026-02-01"); // day first
    expect(parseDate("5 Nov 2026")).toBe("2026-11-05");
    expect(parseDate("31/02/2026")).toBeNull();
    expect(parseDate("tomorrow")).toBeNull();
  });
  it("reads each kind of cell, with a clear message for bad values", () => {
    expect(parseCell(col("title"), "  A good title ", lookups)).toEqual({ ok: true, set: { title: "A good title" } });
    expect(parseCell(col("title"), "ab", lookups)).toMatchObject({ ok: false });
    expect(parseCell(col("assignee"), "wendy writer", lookups)).toEqual({ ok: true, set: { assignedTo: "u_wendy" } });
    expect(parseCell(col("assignee"), "Nobody Here", lookups)).toMatchObject({ ok: false });
    expect(parseCell(col("assignee"), "", lookups)).toEqual({ ok: true, set: { assignedTo: null } });
    expect(parseCell(col("status"), "In progress", lookups)).toEqual({ ok: true, set: { status: "in_progress" } });
    expect(parseCell(col("status"), "needs revision", lookups)).toEqual({ ok: true, set: { status: "revision" } });
    expect(parseCell(col("status"), "bogus", lookups)).toMatchObject({ ok: false });
    expect(parseCell(col("priority"), "URGENT", lookups)).toEqual({ ok: true, set: { priority: "urgent" } });
    expect(parseCell(col("due"), "31/12/2026", lookups)).toEqual({ ok: true, set: { dueDate: "2026-12-31" } });
    expect(parseCell(col("topic"), "microbiology", lookups)).toEqual({ ok: true, set: { topicId: "cat_micro" } });
    expect(parseCell(col("f:pf_src"), "preprint", lookups)).toEqual({ ok: true, set: { custom: { pf_src: "Preprint" } } });
    expect(parseCell(col("f:pf_src"), "Podcast", lookups)).toMatchObject({ ok: false });
    expect(parseCell(col("f:pf_words"), "1,200", lookups)).toEqual({ ok: true, set: { custom: { pf_words: 1200 } } });
    expect(parseCell(col("f:pf_words"), "lots", lookups)).toMatchObject({ ok: false });
    expect(parseCell(col("f:pf_words"), "", lookups)).toEqual({ ok: true, set: { custom: { pf_words: null } } }); // empty clears
    expect(parseCell(col("num"), "T-0009", lookups)).toMatchObject({ ok: false }); // read-only
  });
  it("shows cells as text for copying", () => {
    const r = rec({ assignedToName: "Wendy Writer", dueDate: "2026-12-31", custom: { pf_src: "Journal" }, notes: "owner note", researchNotes: "research" });
    expect(cellText(r, col("assignee"), true)).toBe("Wendy Writer");
    expect(cellText(r, col("status"), true)).toBe("Planned");
    expect(cellText(r, col("f:pf_src"), true)).toBe("Journal");
    expect(cellText(r, col("notes"), true)).toBe("owner note");
    expect(cellText(r, col("notes"), false)).toBe("research"); // a contributor never reads the owner's private notes
  });
});

describe("planning a paste", () => {
  const view = [rec({ id: "p1", num: 1, title: "First task", version: 3 }), rec({ id: "p2", num: 2, ref: "T-0002", title: "Second task", version: 5 })];
  const titleCol = columns.findIndex((c) => c.key === "title");

  it("recognises a header row, matching columns by name, and turns every row into a new task", () => {
    const grid = parseTsv("Article Title\tAssignee\tPriority\tDue Date\tUnknown column\nVaccines explained\tWendy Writer\tHigh\t31/12/2026\tx\nAntibiotic resistance\t\tlow\t\ty");
    expect(detectHeader(grid[0], columns)).not.toBeNull();
    const plan = planPaste({ grid, start: { row: 0, col: 1 }, view, columns, lookups });
    expect(plan.header).toBe(true);
    expect(plan.created).toBe(2);
    expect(plan.updated).toBe(0);
    expect(plan.ignoredColumns).toEqual(["Unknown column"]);
    expect(plan.rows[0]).toEqual({ id: null, set: { title: "Vaccines explained", assignedTo: "u_wendy", priority: "high", dueDate: "2026-12-31" } });
    expect(plan.rows[1].set).toMatchObject({ title: "Antibiotic resistance", priority: "low", assignedTo: null, dueDate: null });
  });
  it("lays a headerless block over the tasks from the selected cell and adds tasks beyond the last row", () => {
    const grid = parseTsv("Renamed first\tWendy Writer\nRenamed second\t\nA brand new one\t");
    const plan = planPaste({ grid, start: { row: 0, col: titleCol }, view, columns, lookups });
    expect(plan.header).toBe(false);
    expect(plan.updated).toBe(2);
    expect(plan.created).toBe(1);
    expect(plan.rows[0]).toEqual({ id: "p1", expectedVersion: 3, set: { title: "Renamed first", assignedTo: "u_wendy" } });
    expect(plan.rows[1].expectedVersion).toBe(5);
    expect(plan.rows[2]).toEqual({ id: null, set: { title: "A brand new one", assignedTo: null } });
  });
  it("starts in the column you clicked and leaves read-only columns alone", () => {
    const from = columns.findIndex((c) => c.key === "priority");
    const plan = planPaste({ grid: parseTsv("Urgent\t31/12/2026"), start: { row: 1, col: from }, view, columns, lookups });
    expect(plan.rows).toEqual([{ id: "p2", expectedVersion: 5, set: { priority: "urgent", dueDate: "2026-12-31" } }]);
    const ro = planPaste({ grid: parseTsv("T-0099"), start: { row: 0, col: 0 }, view, columns, lookups });
    expect(ro.rows).toEqual([]);
    expect(ro.readOnlyCells).toBe(1);
  });
  it("skips bad values and titleless new rows with a reason instead of failing the whole paste", () => {
    const plan = planPaste({ grid: parseTsv("Fine title\tNobody Here\nx\tWendy Writer"), start: { row: 5, col: titleCol }, view, columns, lookups });
    expect(plan.created).toBe(1);
    expect(plan.skipped.map((s) => s.column)).toEqual(expect.arrayContaining(["Assigned To", "Article Title"]));
  });
  it("uses at most 100 rows", () => {
    const grid = Array.from({ length: 130 }, (_, i) => [`Task number ${i + 1}`]);
    const plan = planPaste({ grid, start: null, view: [], columns, lookups });
    expect(plan.rows).toHaveLength(100);
    expect(plan.truncated).toBe(true);
  });
});

describe("applying edits on the server (inline edit and paste)", () => {
  let cleanup: () => void;
  let owner: User;
  let wendy: User;
  let field: PlannerField;
  let topicId: string;
  beforeAll(async () => {
    cleanup = tempDb();
    await bootstrapOwner({ email: "info@vierapparatus.com", name: "Owner", password: "Owner-Sheet-Pass-2026!" });
    owner = (await getUserByEmail("info@vierapparatus.com"))!;
    const w = await createContributorAccount(owner.id, { name: "Wendy Writer", email: "wendy@example.org", password: "Contributor-Pass-2026!" });
    if (!w.ok) throw new Error(w.error);
    wendy = w.user;
    field = await createField({ name: "Source type", type: "select", options: ["Journal", "Preprint"] });
    topicId = String((await (await conn()).execute("SELECT id FROM categories LIMIT 1")).rows[0].id);
  });
  afterAll(() => cleanup());

  it("creates many tasks in one round trip, numbered one after another", async () => {
    const db = await conn();
    let calls = 0;
    const batch = db.batch.bind(db);
    const execute = db.execute.bind(db);
    (db as unknown as { batch: unknown }).batch = (...a: unknown[]) => (calls++, (batch as (...x: unknown[]) => unknown)(...a));
    (db as unknown as { execute: unknown }).execute = (...a: unknown[]) => (calls++, (execute as (...x: unknown[]) => unknown)(...a));
    const rows = Array.from({ length: 40 }, (_, i) => ({ id: null, set: { title: `Pasted task ${i + 1}`, priority: "high" as const, assignedTo: i % 2 ? wendy.id : null, custom: { [field.id]: "Journal" } } }));
    const r = await bulkApply(viewerOf(owner), { rows });
    (db as unknown as { batch: unknown }).batch = batch;
    (db as unknown as { execute: unknown }).execute = execute;
    expect(r).toMatchObject({ created: 40, updated: 0, conflicts: [] });
    expect(calls).toBeLessThanOrEqual(6); // 40 tasks cost a handful of round trips, never 40+ (a Worker allows 50 per request)
    const all = (await listRecords(viewerOf(owner), { limit: 500, sort: "num" })).items;
    expect(all.map((x) => x.num)).toEqual(Array.from({ length: 40 }, (_, i) => i + 1));
    expect(all[1].status).toBe("planned"); // assigned -> planned
    expect(all[0].status).toBe("idea");
    expect(all[0].custom[field.id]).toBe("Journal");
  });

  it("updates a task, clears values, and refuses a stale edit instead of overwriting", async () => {
    const t = await createRecord(viewerOf(owner), { title: "Edit me", dueDate: "2026-12-01" });
    const ok = await bulkApply(viewerOf(owner), { rows: [{ id: t.id, expectedVersion: t.version, set: { title: "Edited title", dueDate: null, topicId, custom: { [field.id]: "Preprint" } } }] });
    expect(ok).toMatchObject({ updated: 1, conflicts: [] });
    const after = (await getRecord(viewerOf(owner), t.id))!;
    expect(after).toMatchObject({ title: "Edited title", dueDate: null, topicId, version: t.version + 1 });
    expect(after.custom[field.id]).toBe("Preprint");
    const cleared = await bulkApply(viewerOf(owner), { rows: [{ id: t.id, expectedVersion: after.version, set: { custom: { [field.id]: null } } }] });
    expect(cleared.updated).toBe(1);
    expect((await getRecord(viewerOf(owner), t.id))!.custom[field.id]).toBeUndefined();
    const stale = await bulkApply(viewerOf(owner), { rows: [{ id: t.id, expectedVersion: t.version, set: { title: "From a stale page" } }] });
    expect(stale).toMatchObject({ updated: 0, conflicts: [1] });
    expect((await getRecord(viewerOf(owner), t.id))!.title).toBe("Edited title");
  });

  it("keeps the linked draft in step with the task's assignee and status", async () => {
    const t = await createRecord(viewerOf(owner), { title: "Linked task" });
    const { articleId } = await createDraftForRecord(viewerOf(owner), t.id);
    await bulkApply(viewerOf(owner), { rows: [{ id: t.id, set: { assignedTo: wendy.id, status: "in_review" } }] });
    const a = (await getArticleById(articleId))!;
    expect(a.assignedTo).toBe(wendy.id);
    expect(a.reviewStatus).toBe("requested");
    await bulkApply(viewerOf(owner), { rows: [{ id: t.id, set: { status: "approved" } }] });
    expect((await getArticleById(articleId))!.reviewStatus).toBe("approved");
  });

  it("rejects bad input: unknown people or topics, titleless new tasks, unknown keys, and contributors", async () => {
    const r = await bulkApply(viewerOf(owner), { rows: [{ id: null, set: { title: "Ghost assignee", assignedTo: "u_nobody" } }, { id: null, set: { title: "Ghost topic", topicId: "cat_nope" } }, { id: null, set: { priority: "high" } }, { id: null, set: { title: "Valid one" } }] });
    expect(r.created).toBe(1);
    expect(r.invalid.map((x) => x.row)).toEqual([1, 2, 3]);
    await expect(bulkApply(viewerOf(owner), { rows: [{ id: null, set: { title: "x".repeat(10), isAdmin: true } as never }] })).rejects.toThrow();
    await expect(bulkApply(viewerOf(owner), { rows: Array.from({ length: 101 }, (_, i) => ({ id: null, set: { title: `Row ${i}` } })) })).rejects.toThrow();
    await expect(bulkApply(viewerOf(wendy), { rows: [{ id: null, set: { title: "Contributor attempt" } }] })).rejects.toBeInstanceOf(PlannerError);
  });
});
