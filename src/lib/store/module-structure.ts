import { conn } from "../db/client";
import { newId } from "../crypto";
import { can } from "../auth/permissions";
import { slugify } from "../content/text";
import { moduleHref } from "../modules/shared";
import { logActivity } from "./activity";
import { createModuleTask, getModuleEdit, ModuleError } from "./modules";
import type { Viewer } from "./planner";
import { n, nowIso, s, sn } from "./util";

/**
 * Where a module sits and how it is organised: moving a module to another subject, specialization or academic level, and the
 * chapters inside a module. Owner only, enforced here. Moving a module keeps its text, its task and its chapters, and leaves a
 * redirect from the old address.
 */

const owner = (v: Viewer) => {
  if (!can(v, "planner.manage")) throw new ModuleError("forbidden", "Only the owner can do that.");
};

export type ChapterRow = { id: string; title: string; slug: string; publication: string; contentStatus: string; hasBody: boolean; recordId: string | null; recordRef: string | null };

/** The chapters directly inside a module, in order. */
export async function listChapters(moduleId: string): Promise<ChapterRow[]> {
  const db = await conn();
  const rows = (
    await db.execute({
      sql: `SELECT m.id, m.title, m.slug, m.status, m.content_status, (length(m.body_text) > 0) AS has_body, p.id AS record_id, p.num AS record_num
            FROM modules m LEFT JOIN planner_records p ON p.module_id = m.id WHERE m.parent_id = ? AND m.kind = 'chapter' AND m.status <> 'archived' ORDER BY m.sort, m.title`,
      args: [moduleId],
    })
  ).rows;
  return rows.map((r) => ({
    id: s(r.id), title: s(r.title), slug: s(r.slug), publication: s(r.status), contentStatus: s(r.content_status), hasBody: n(r.has_body) === 1,
    recordId: sn(r.record_id), recordRef: r.record_num == null ? null : `T-${String(n(r.record_num)).padStart(4, "0")}`,
  }));
}

/** Adds a chapter to a module, together with its planner task. */
export async function addChapter(actor: Viewer, moduleId: string, title: string): Promise<{ id: string }> {
  owner(actor);
  const cur = await getModuleEdit(actor, moduleId);
  if (!cur) throw new ModuleError("not_found", "Module not found.");
  if (cur.module.kind !== "module") throw new ModuleError("invalid", "Chapters are added to a module.");
  const t = title.trim();
  if (t.length < 3) throw new ModuleError("invalid", "Give the chapter a title (3+ characters).");
  const rec = await createModuleTask(actor, {
    subjectSlug: cur.module.subjectSlug, specializationSlug: cur.module.specializationSlug, levelSlug: cur.module.levelSlug, discipline: cur.module.discipline, moduleTitle: cur.module.title, chapter: t,
  });
  return { id: rec.module!.nodeId };
}

/** Puts the chapters of a module in the given order (the list must be exactly its chapters). */
export async function reorderChapters(actor: Viewer, moduleId: string, ids: string[]): Promise<void> {
  owner(actor);
  const have = (await listChapters(moduleId)).map((c) => c.id).sort();
  if (JSON.stringify([...ids].sort()) !== JSON.stringify(have)) throw new ModuleError("invalid", "The list does not match the chapters of this module. Reload the page.");
  const db = await conn();
  await db.batch(ids.map((id, i) => ({ sql: "UPDATE modules SET sort = ? WHERE id = ?", args: [(i + 1) * 10, id] })), "write");
}

export type MoveTarget = { subjectSlug: string; specializationSlug: string; levelSlug: string; discipline?: string };

/**
 * Moves a module (with all its chapters) to another academic level, possibly of another specialization or subject, under a
 * discipline heading of the target level (found or created by name; empty means directly under the level).
 */
export async function moveModule(actor: Viewer, moduleId: string, target: MoveTarget): Promise<{ href: string }> {
  owner(actor);
  const db = await conn();
  const cur = (
    await db.execute({
      sql: `SELECT m.id, m.kind, m.slug, m.title, m.level_id, ts.route_slug AS subject, sp.route_slug AS spec, l.slug AS level
            FROM modules m JOIN module_subjects sp ON sp.id = m.subject_id JOIN module_subjects ts ON ts.id = sp.parent_id JOIN module_levels l ON l.id = m.level_id WHERE m.id = ?`,
      args: [moduleId],
    })
  ).rows[0];
  if (!cur) throw new ModuleError("not_found", "Module not found.");
  if (s(cur.kind) !== "module") throw new ModuleError("invalid", "Only a module can be moved. Its chapters move with it.");

  const dest = (
    await db.execute({
      sql: `SELECT l.id AS level_id, sp.id AS spec_id FROM module_levels l JOIN module_subjects sp ON sp.id = l.subject_id JOIN module_subjects ts ON ts.id = sp.parent_id
            WHERE ts.route_slug = ? AND ts.parent_id IS NULL AND sp.route_slug = ? AND l.slug = ?`,
      args: [target.subjectSlug, target.specializationSlug, target.levelSlug],
    })
  ).rows[0];
  if (!dest) throw new ModuleError("invalid", "Choose a subject, a specialization and one of its academic levels.");
  const levelId = s(dest.level_id);
  const specId = s(dest.spec_id);

  const clash = (await db.execute({ sql: "SELECT id FROM modules WHERE level_id = ? AND kind = 'module' AND slug = ? AND id <> ?", args: [levelId, s(cur.slug), moduleId] })).rows[0];
  if (clash) throw new ModuleError("conflict", "That level already has a module with the same address. Rename one of them first.");

  const t = nowIso();
  let parentId: string | null = null;
  const disc = (target.discipline ?? "").trim();
  if (disc) {
    const slug = slugify(disc);
    if (!slug) throw new ModuleError("invalid", "That discipline name cannot be used.");
    const found = (await db.execute({ sql: "SELECT id FROM modules WHERE level_id = ? AND kind = 'discipline' AND slug = ?", args: [levelId, slug] })).rows[0];
    if (found) parentId = s(found.id);
    else {
      parentId = newId("mo_");
      const next = n((await db.execute({ sql: "SELECT COALESCE(MAX(sort), 0) + 10 AS x FROM modules WHERE level_id = ? AND parent_id IS NULL", args: [levelId] })).rows[0].x);
      await db.execute({
        sql: "INSERT INTO modules(id, subject_id, level_id, parent_id, kind, slug, title, sort, created_at, updated_at) VALUES (?, ?, ?, NULL, 'discipline', ?, ?, ?, ?, ?)",
        args: [parentId, specId, levelId, slug, disc, next, t, t],
      });
    }
  }
  const sort = n((await db.execute({ sql: "SELECT COALESCE(MAX(sort), 0) + 10 AS x FROM modules WHERE level_id = ? AND parent_id IS ?", args: [levelId, parentId] })).rows[0].x);
  await db.batch(
    [
      {
        sql: `WITH RECURSIVE sub(id) AS (SELECT id FROM modules WHERE id = ? UNION ALL SELECT m.id FROM modules m JOIN sub ON m.parent_id = sub.id)
              UPDATE modules SET subject_id = ?, level_id = ?, updated_at = ? WHERE id IN (SELECT id FROM sub)`,
        args: [moduleId, specId, levelId, t],
      },
      { sql: "UPDATE modules SET parent_id = ?, sort = ? WHERE id = ?", args: [parentId, sort, moduleId] },
      { sql: "DELETE FROM module_links WHERE level_id = ? AND module_id = ?", args: [levelId, moduleId] },
    ],
    "write",
  );
  const from = moduleHref(s(cur.subject), s(cur.spec), s(cur.level), [s(cur.slug)]);
  const href = moduleHref(target.subjectSlug, target.specializationSlug, target.levelSlug, [s(cur.slug)]);
  if (from !== href) {
    await db.batch(
      [
        { sql: "UPDATE module_redirects SET to_path = ? WHERE to_path = ?", args: [href, from] },
        { sql: "DELETE FROM module_redirects WHERE from_path = ?", args: [href] },
        { sql: "INSERT INTO module_redirects(from_path, to_path, created_at) VALUES (?, ?, ?) ON CONFLICT(from_path) DO UPDATE SET to_path = excluded.to_path", args: [from, href, t] },
      ],
      "write",
    );
  }
  await logActivity({ id: actor.id, name: actor.name }, "record.updated", {}, `Module moved: ${s(cur.title)} → ${target.specializationSlug}/${target.levelSlug}`);
  return { href };
}
