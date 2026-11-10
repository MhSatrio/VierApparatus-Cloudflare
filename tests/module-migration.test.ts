import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createClient } from "@libsql/client";
import { afterAll, describe, expect, it } from "vitest";
import { MIGRATIONS, migrate } from "@/lib/db/migrations";

/**
 * A database that already has the earlier structure (subjects with levels and modules, Biomedical Sciences / Bioinformatics /
 * Computational Biology as subjects of their own) is converted in place by migration 9: nothing is lost, the three become Biology
 * specializations, the old curriculum moves under General <subject>, and every old address gets a permanent redirect.
 */
describe("migration 9: subjects become subject -> specialization", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "vier-mig-"));
  const db = createClient({ url: `file:${path.join(dir, "old.db").replace(/\\/g, "/")}` });
  afterAll(() => {
    db.close();
    try {
      fs.rmSync(dir, { recursive: true, force: true });
    } catch {
      /* the file may stay locked on Windows until the worker exits */
    }
  });

  it("converts the earlier structure without losing a module", async () => {
    // build the database exactly as it was at version 8
    await db.execute("CREATE TABLE IF NOT EXISTS meta (key TEXT PRIMARY KEY, value TEXT NOT NULL)");
    for (const m of MIGRATIONS.filter((x) => x.version <= 8)) {
      await db.batch([...m.statements.map((sql) => ({ sql, args: [] as never[] })), { sql: "INSERT INTO meta(key, value) VALUES ('schema_version', ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value", args: [String(m.version)] }], "write");
    }
    const t = "2026-11-01T00:00:00.000Z";
    const subj = (id: string, slug: string, name: string) =>
      db.execute({ sql: "INSERT INTO module_subjects(id, slug, name, tagline, description, accent, sort, published, created_at) VALUES (?, ?, ?, 'Tag', 'The description of ' || ?, 'brand', 10, 1, ?)", args: [id, slug, name, name, t] });
    await subj("s_bio", "bio", "Biology");
    await subj("s_chem", "chem", "Chemistry");
    await subj("s_biomed", "biomed", "Biomedical Sciences");
    await subj("s_bioinf", "bioinf", "Bioinformatics");
    const level = (id: string, subject: string, slug: string, num: number) =>
      db.execute({ sql: "INSERT INTO module_levels(id, subject_id, slug, num, name, description, sort) VALUES (?, ?, ?, ?, ?, '', ?)", args: [id, subject, slug, num, `Level ${slug}`, num * 10] });
    await level("l_bio1", "s_bio", "foundations", 1);
    await level("l_chem1", "s_chem", "foundations", 1);
    await level("l_biomed1", "s_biomed", "foundations", 1); // the same slug as Biology's: why a table rebuild would have been needed
    await level("l_bioinf1", "s_bioinf", "basic", 2);
    const mod = (id: string, subject: string, lv: string, slug: string) =>
      db.execute({
        sql: "INSERT INTO modules(id, subject_id, level_id, parent_id, kind, slug, title, sort, body_text, html, created_at, updated_at) VALUES (?, ?, ?, NULL, 'module', ?, ?, 10, 'written text', '<p>written text</p>', ?, ?)",
        args: [id, subject, lv, slug, slug, t, t],
      });
    await mod("m_bio", "s_bio", "l_bio1", "introduction-to-biology");
    await mod("m_biomed", "s_biomed", "l_biomed1", "medical-biochemistry");
    await mod("m_chem", "s_chem", "l_chem1", "atoms");

    await migrate(db);

    const subjects = (await db.execute("SELECT slug, route_slug, parent_id, name FROM module_subjects ORDER BY slug")).rows;
    const tops = subjects.filter((r) => r.parent_id === null).map((r) => r.route_slug);
    expect(tops.sort()).toEqual(["bio", "chem"]);
    const specOf = async (route: string, parent: string) => (await db.execute({ sql: "SELECT id, slug, name FROM module_subjects WHERE parent_id = ? AND route_slug = ?", args: [parent, route] })).rows[0];
    const gb = (await specOf("general-biology", "s_bio"))!;
    expect(gb.name).toBe("General Biology");
    expect(await specOf("biomedical-sciences", "s_bio")).toMatchObject({ name: "Biomedical Sciences", slug: "bio.biomedical-sciences" });
    expect(await specOf("bioinformatics", "s_bio")).toMatchObject({ name: "Bioinformatics" });
    expect(await specOf("general-chemistry", "s_chem")).toBeTruthy();

    // every module and level is still there, under its new parent
    const where = async (id: string) => String((await db.execute({ sql: "SELECT subject_id FROM modules WHERE id = ?", args: [id] })).rows[0].subject_id);
    expect(await where("m_bio")).toBe(String(gb.id));
    expect(await where("m_biomed")).toBe("s_biomed"); // the specialization keeps the old subject's id, so its modules did not move at all
    expect(await where("m_chem")).toBe("ms_gen_chem");
    const levels = (await db.execute("SELECT id, subject_id FROM module_levels")).rows.map((r) => `${r.id}>${r.subject_id}`).sort();
    expect(levels).toEqual(["l_bio1>ms_gen_bio", "l_bioinf1>s_bioinf", "l_biomed1>s_biomed", "l_chem1>ms_gen_chem"]);

    // the old addresses redirect
    const red = Object.fromEntries((await db.execute("SELECT from_path, to_path FROM module_redirects")).rows.map((r) => [String(r.from_path), String(r.to_path)]));
    expect(red["/module/biomed"]).toBe("/module/bio/biomedical-sciences");
    expect(red["/module/bioinf"]).toBe("/module/bio/bioinformatics");
    expect(red["/module/bio/foundations"]).toBe("/module/bio/general-biology/foundations");
    expect(red["/module/chem/foundations"]).toBe("/module/chem/general-chemistry/foundations");

    // and it is safe to open again (the migration does not run twice)
    await migrate(db);
    expect(Number((await db.execute("SELECT COUNT(*) AS c FROM module_subjects")).rows[0].c)).toBe(6);
  });

  it("creates the product tables", async () => {
    const names = (await db.execute("SELECT name FROM sqlite_master WHERE type = 'table'")).rows.map((r) => String(r.name));
    for (const t of ["products", "product_categories", "product_comments", "product_comment_log", "product_imports", "product_redirects", "module_redirects", "module_links"]) expect(names).toContain(t);
    expect(Number((await db.execute("SELECT value FROM meta WHERE key = 'schema_version'")).rows[0].value)).toBe(11);
  });
});
