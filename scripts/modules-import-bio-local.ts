/* LOCAL ONLY. Loads every specialization Markdown folder (content/modules/bio/<specialization>/<level>/<topic>/module.md and its
 * chapters/NN-*.md) into the curriculum rows that already exist, so the lesson pages can be read on a local dev server.
 *
 *   LOCAL_DB=1 TURSO_DATABASE_URL=file:./.data/modules-local.db npx tsx --tsconfig scripts/tsconfig.json scripts/modules-import-bio-local.ts
 *
 * It refuses to run unless the database is a local file: (never Turso). Each module and chapter is converted with the same
 * importer the admin panel uses (importModuleMarkdown) and rendered with renderDoc. Chapters are created as child rows.
 * Modules are marked published in the LOCAL database only, so their pages are visible; content_status stays as the file says.
 * Safe to run again: it updates rows in place.
 */
import "./_local-client";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { importModuleMarkdown } from "../src/lib/content/module-import";
import { renderDoc } from "../src/lib/content/render";
import { docToText } from "../src/lib/content/text";
import { db, dbConfigured, ensureSchema } from "../src/lib/db/client";

let ROOT = "";
const specFolders = (): string[] => fs.readdirSync(path.resolve(__dirname, "../content/modules/bio"), { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name).sort();

/** Folders (content/modules/bio/<spec>/<level>/<topic>) whose validator status is drafted_needs_review in manifest.json. */
let passing: Set<string> | null = null;
function passingTopics(): Set<string> {
  if (passing) return passing;
  const manifest = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../content/modules/bio/manifest.json"), "utf8"));
  const set = new Set<string>();
  const add = (levels: { topics: { folder: string; status: string }[] }[]) => {
    for (const lv of levels) for (const t of lv.topics) if (t.status === "drafted_needs_review") set.add(t.folder.replace(/\\/g, "/"));
  };
  add(manifest.levels);
  for (const sp of manifest.specializationTopics) add(sp.levels);
  passing = set;
  return set;
}
const now = () => new Date().toISOString();
const newId = (prefix: string) => `${prefix}_${crypto.randomBytes(9).toString("base64url")}`;
const minutes = (text: string) => Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / 200));

type Row = Record<string, unknown>;
const first = async (sql: string, args: (string | number | null)[]): Promise<Row | undefined> =>
  (await db().execute({ sql, args })).rows[0] as Row | undefined;

/** The fields every module and chapter row gets from one Markdown file. */
function fields(raw: string) {
  const imp = importModuleMarkdown(raw);
  const rendered = renderDoc(imp.doc);
  const bodyText = docToText(imp.doc);
  return {
    imp,
    title: imp.meta.title ?? "",
    summary: (imp.meta.description ?? "").slice(0, 600),
    objectives: JSON.stringify(imp.objectives),
    prerequisites: JSON.stringify(imp.prerequisites),
    refs: JSON.stringify(imp.references),
    contentStatus: imp.meta.contentStatus ?? "drafting",
    doc: JSON.stringify(imp.doc),
    html: rendered.html,
    headings: JSON.stringify(rendered.headings),
    bodyText,
    hasMath: rendered.hasMath ? 1 : 0,
    minutes: minutes(bodyText),
    warnings: imp.warnings,
  };
}

async function main() {
  // Writes go to a local file database, or to the live Turso database only when BIO_IMPORT_CONFIRM=live is set and a backup
  // file (.data/backups/turso-live-full-*.json) exists. Command-line scripts always set LOCAL_DB=1 themselves, so the URL is the guard.
  const url = process.env.TURSO_DATABASE_URL ?? "";
  const isFile = url.startsWith("file:");
  const liveOk = process.env.BIO_IMPORT_CONFIRM === "live" && /^libsql:|^https:/.test(url) && fs.readdirSync(path.resolve(__dirname, "../.data/backups")).some((f) => f.startsWith("turso-live-full-"));
  if (!isFile && !liveOk) {
    console.error("Refused: set TURSO_DATABASE_URL to a file: database, or set BIO_IMPORT_CONFIRM=live (after a backup) for the live database.");
    process.exit(1);
  }
  console.log(`Target: ${isFile ? "local file database" : "LIVE Turso database"}`);
  if (!dbConfigured()) { console.error("No database configured."); process.exit(1); }
  await ensureSchema();
  for (const folder of specFolders()) await runSpec(folder);
}

/** Imports one specialization folder (general-biology, biochemistry, ...) into its curriculum rows. */
async function runSpec(folder: string) {
  ROOT = path.resolve(__dirname, "../content/modules/bio", folder);
  const bio = await first("SELECT id FROM module_subjects WHERE parent_id IS NULL AND route_slug = ?", ["bio"]);
  const subject = bio ? await first("SELECT id FROM module_subjects WHERE parent_id = ? AND route_slug = ?", [String(bio.id), folder]) : undefined;
  if (!subject) { console.log(`Skipped ${folder}: not in the database. Run npm run modules:seed first.`); return; }
  console.log(`Importing ${folder}`);
  const subjectId = String(subject.id);

  const levels = fs.readdirSync(ROOT, { withFileTypes: true }).filter((d) => d.isDirectory());
  let modulesDone = 0, chaptersDone = 0, warnings = 0;
  const missing: string[] = [];

  for (const lv of levels) {
    const level = await first("SELECT id FROM module_levels WHERE subject_id = ? AND slug = ?", [subjectId, lv.name]);
    if (!level) { missing.push(`level ${lv.name}`); continue; }
    const levelId = String(level.id);
    const topicsDir = path.join(ROOT, lv.name);
    for (const tp of fs.readdirSync(topicsDir, { withFileTypes: true }).filter((d) => d.isDirectory())) {
      const modFile = path.join(topicsDir, tp.name, "module.md");
      if (!fs.existsSync(modFile)) { missing.push(`${lv.name}/${tp.name} has no module.md`); continue; }
      // Only topics that pass scripts/validate-bio-content.ts (status drafted_needs_review in manifest.json) go to the database.
      const key = `content/modules/bio/${folder}/${lv.name}/${tp.name}`;
      if (!passingTopics().has(key)) { missing.push(`${lv.name}/${tp.name} not imported: it fails the validator (see manifest.json)`); continue; }
      const mod = await first("SELECT id FROM modules WHERE subject_id = ? AND level_id = ? AND kind = 'module' AND slug = ?", [subjectId, levelId, tp.name]);
      if (!mod) { missing.push(`no curriculum row for ${lv.name}/${tp.name}`); continue; }
      const modId = String(mod.id);

      const f = fields(fs.readFileSync(modFile, "utf8"));
      warnings += f.warnings.length;
      const t = now();
      await db().execute({
        sql: `UPDATE modules SET title = ?, summary = ?, objectives = ?, prerequisites = ?, refs = ?, content_status = ?, doc = ?, html = ?, headings = ?,
              body_text = ?, has_math = ?, reading_minutes = ?, status = 'published', published_at = COALESCE(published_at, ?),
              version = version + 1, last_editor_name = 'local import', updated_at = ? WHERE id = ?`,
        args: [f.title, f.summary, f.objectives, f.prerequisites, f.refs, f.contentStatus, f.doc, f.html, f.headings, f.bodyText, f.hasMath, f.minutes, t, t, modId],
      });
      modulesDone++;

      const chDir = path.join(topicsDir, tp.name, "chapters");
      const files = fs.existsSync(chDir) ? fs.readdirSync(chDir).filter((x) => /^\d+-.+\.md$/.test(x)).sort() : [];
      for (const file of files) {
        const m = file.match(/^(\d+)-(.+)\.md$/)!;
        const sort = Number(m[1]);
        const slug = m[2];
        const c = fields(fs.readFileSync(path.join(chDir, file), "utf8"));
        warnings += c.warnings.length;
        const existing = await first("SELECT id FROM modules WHERE parent_id = ? AND kind = 'chapter' AND slug = ?", [modId, slug]);
        if (existing) {
          await db().execute({
            sql: `UPDATE modules SET title = ?, summary = ?, objectives = ?, prerequisites = ?, refs = ?, content_status = ?, doc = ?, html = ?, headings = ?,
                  body_text = ?, has_math = ?, reading_minutes = ?, sort = ?, status = 'published', published_at = COALESCE(published_at, ?),
                  version = version + 1, last_editor_name = 'local import', updated_at = ? WHERE id = ?`,
            args: [c.title, c.summary, c.objectives, c.prerequisites, c.refs, c.contentStatus, c.doc, c.html, c.headings, c.bodyText, c.hasMath, c.minutes, sort, t, t, String(existing.id)],
          });
        } else {
          await db().execute({
            sql: `INSERT INTO modules (id, subject_id, level_id, parent_id, kind, slug, title, summary, sort, objectives, prerequisites, refs, doc, html, headings,
                  body_text, has_math, reading_minutes, content_status, status, version, last_editor_name, created_at, updated_at, published_at)
                  VALUES (?, ?, ?, ?, 'chapter', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'published', 1, 'local import', ?, ?, ?)`,
            args: [newId("mo"), subjectId, levelId, modId, slug, c.title, c.summary, sort, c.objectives, c.prerequisites, c.refs, c.doc, c.html, c.headings, c.bodyText, c.hasMath, c.minutes, c.contentStatus, t, t, t],
          });
        }
        chaptersDone++;
      }
    }
  }
  console.log(`Imported ${modulesDone} modules and ${chaptersDone} chapters (${(process.env.TURSO_DATABASE_URL ?? "").startsWith("file:") ? "local file" : "live"} database).`);
  console.log(`Importer warnings to review: ${warnings}.`);
  if (missing.length) console.log(`Not imported (${missing.length}):\n  - ${missing.join("\n  - ")}`);
}

main().catch((e) => { console.error("Failed:", e instanceof Error ? e.message : e); process.exit(1); });
