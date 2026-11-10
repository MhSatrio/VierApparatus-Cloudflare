import { z } from "zod";
import { conn } from "../db/client";
import { newId } from "../crypto";
import { can } from "../auth/permissions";
import { slugify } from "../content/text";
import { genericLevels } from "../modules/curriculum";
import { logActivity } from "./activity";
import { ModuleError } from "./modules";
import type { Viewer } from "./planner";
import { n, nowIso, s, sn } from "./util";

/**
 * Administration of the shape of the learning platform: main subjects, their specializations, the academic levels of each
 * specialization, and the shared modules a level lists from another specialization. Everything a visitor sees in the Module menu
 * comes from these rows. Only the owner may change them, and every rule is enforced here, not in the screens.
 *
 * A specialization is a row of module_subjects whose parent_id is its subject (see migration 9), so one set of functions serves both.
 * When an address segment changes, the old address is written to module_redirects so that links and search results keep working.
 */

const owner = (v: Viewer) => {
  if (!can(v, "planner.manage")) throw new ModuleError("forbidden", "Only the owner can change the curriculum.");
};

// ---------------------------------------------------------------- reading (for the admin screen)

export type AdminLevel = { id: string; slug: string; num: number; name: string; description: string; sort: number; moduleCount: number; sharedCount: number };
export type AdminSpecialization = {
  id: string; slug: string; name: string; description: string; sort: number; published: boolean; archived: boolean; coverUrl: string; coverThumbUrl: string;
  levels: AdminLevel[]; moduleCount: number;
};
export type AdminSubject = {
  id: string; slug: string; name: string; tagline: string; description: string; sort: number; published: boolean; archived: boolean; coverUrl: string; coverThumbUrl: string;
  specializations: AdminSpecialization[];
};

export async function getAdminCurriculum(): Promise<AdminSubject[]> {
  const db = await conn();
  const [rows, lv, mods, links] = await db.batch(
    [
      { sql: "SELECT * FROM module_subjects ORDER BY sort, name", args: [] },
      { sql: "SELECT * FROM module_levels ORDER BY sort, num", args: [] },
      { sql: "SELECT level_id, COUNT(*) AS c FROM modules WHERE kind = 'module' GROUP BY level_id", args: [] },
      { sql: "SELECT level_id, COUNT(*) AS c FROM module_links GROUP BY level_id", args: [] },
    ],
    "read",
  );
  const modCount = new Map(mods.rows.map((r) => [s(r.level_id), n(r.c)]));
  const linkCount = new Map(links.rows.map((r) => [s(r.level_id), n(r.c)]));
  const base = (r: (typeof rows.rows)[number]) => ({
    id: s(r.id), slug: s(r.route_slug) || s(r.slug), name: s(r.name), description: s(r.description), sort: n(r.sort), published: n(r.published) === 1, archived: n(r.archived) === 1,
    coverUrl: s(r.cover_url), coverThumbUrl: s(r.cover_thumb_url),
  });
  return rows.rows
    .filter((r) => sn(r.parent_id) === null)
    .map((top) => ({
      ...base(top),
      tagline: s(top.tagline),
      specializations: rows.rows
        .filter((r) => s(r.parent_id) === s(top.id))
        .map((sp) => {
          const levels = lv.rows
            .filter((l) => s(l.subject_id) === s(sp.id))
            .map((l) => ({ id: s(l.id), slug: s(l.slug), num: n(l.num), name: s(l.name), description: s(l.description), sort: n(l.sort), moduleCount: modCount.get(s(l.id)) ?? 0, sharedCount: linkCount.get(s(l.id)) ?? 0 }));
          return { ...base(sp), levels, moduleCount: levels.reduce((a, l) => a + l.moduleCount, 0) };
        }),
    }));
}

// ---------------------------------------------------------------- shared helpers

const text = (max: number) => z.string().trim().max(max).default("");
const segment = z.string().trim().max(80).default("");
const imageUrl = z.string().trim().max(400).refine((v) => v === "" || v.startsWith("/") || v.startsWith("https://"), "Use an uploaded image").default("");

async function writeRedirect(db: Awaited<ReturnType<typeof conn>>, from: string, to: string) {
  if (from === to) return;
  const t = nowIso();
  // anything pointing at the old address now points at the new one (no chains), and the new address can no longer redirect away
  await db.batch(
    [
      { sql: "UPDATE module_redirects SET to_path = ? WHERE to_path = ?", args: [to, from] },
      { sql: "DELETE FROM module_redirects WHERE from_path = ?", args: [to] },
      { sql: "INSERT INTO module_redirects(from_path, to_path, created_at) VALUES (?, ?, ?) ON CONFLICT(from_path) DO UPDATE SET to_path = excluded.to_path", args: [from, to, t] },
    ],
    "write",
  );
}

// ---------------------------------------------------------------- subjects and specializations

const nodeInput = z.object({
  id: z.string().min(1).max(80).optional(),
  /** Required for a specialization: the main subject it belongs to. Absent for a main subject. */
  subjectId: z.string().min(1).max(80).optional(),
  name: z.string().trim().min(2, "Give it a name (2+ characters)").max(120),
  slug: segment,
  tagline: text(160),
  description: text(1200),
  published: z.boolean().default(true),
  archived: z.boolean().default(false),
  coverUrl: imageUrl,
  coverThumbUrl: imageUrl,
});
export type NodeInput = z.input<typeof nodeInput>;

/**
 * Creates or updates a main subject (no subjectId) or a specialization (with subjectId). The address segment defaults to the name
 * and must be unique inside its parent; changing it leaves a redirect from the old address.
 */
export async function saveSubjectNode(actor: Viewer, input: NodeInput): Promise<{ id: string }> {
  owner(actor);
  const d = nodeInput.parse(input);
  const db = await conn();
  const route = slugify(d.slug || d.name, 60);
  if (!route) throw new ModuleError("invalid", "The address needs letters or digits.");
  const isSpec = Boolean(d.subjectId);
  let parentRoute = "";
  if (isSpec) {
    const parent = (await db.execute({ sql: "SELECT id, route_slug FROM module_subjects WHERE id = ? AND parent_id IS NULL", args: [d.subjectId!] })).rows[0];
    if (!parent) throw new ModuleError("invalid", "Choose the main subject this specialization belongs to.");
    parentRoute = s(parent.route_slug);
  }
  const internalSlug = isSpec ? `${parentRoute}.${route}` : route;
  const clash = (
    await db.execute({
      sql: "SELECT id FROM module_subjects WHERE COALESCE(parent_id, '') = ? AND route_slug = ? AND id <> ?",
      args: [isSpec ? d.subjectId! : "", route, d.id ?? ""],
    })
  ).rows[0];
  if (clash) throw new ModuleError("conflict", `The address "${route}" is already used${isSpec ? " in this subject" : ""}. Choose another.`);
  const t = nowIso();

  if (!d.id) {
    const id = newId("ms_");
    const sort = n((await db.execute({ sql: "SELECT COALESCE(MAX(sort), 0) + 10 AS x FROM module_subjects WHERE COALESCE(parent_id, '') = ?", args: [isSpec ? d.subjectId! : ""] })).rows[0].x);
    await db.execute({
      sql: `INSERT INTO module_subjects(id, slug, route_slug, parent_id, name, tagline, description, accent, sort, published, archived, cover_url, cover_thumb_url, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, 'brand', ?, ?, ?, ?, ?, ?)`,
      args: [id, internalSlug, route, isSpec ? d.subjectId! : null, d.name, d.tagline, d.description, sort, d.published ? 1 : 0, d.archived ? 1 : 0, d.coverUrl, d.coverThumbUrl, t],
    });
    // a new specialization starts with the standard ladder of academic levels, which can then be edited
    if (isSpec) {
      await db.execute({ sql: "DELETE FROM module_redirects WHERE from_path = ?", args: [`/module/${parentRoute}/${route}`] });
      await db.batch(
        genericLevels(d.name).map((lv, i) => ({
          sql: "INSERT INTO module_levels(id, subject_id, slug, num, name, description, sort) VALUES (?, ?, ?, ?, ?, ?, ?)",
          args: [newId("ml_"), id, lv.slug, i + 1, lv.name, lv.description, (i + 1) * 10],
        })),
        "write",
      );
    }
    await logActivity({ id: actor.id, name: actor.name }, "record.created", {}, `${isSpec ? "Specialization" : "Subject"} added: ${d.name}`);
    return { id };
  }

  const cur = (await db.execute({ sql: "SELECT * FROM module_subjects WHERE id = ?", args: [d.id] })).rows[0];
  if (!cur) throw new ModuleError("not_found", "Not found.");
  if ((sn(cur.parent_id) === null) === isSpec) throw new ModuleError("invalid", isSpec ? "A main subject cannot become a specialization." : "A specialization needs its main subject.");
  await db.execute({
    sql: `UPDATE module_subjects SET slug = ?, route_slug = ?, parent_id = ?, name = ?, tagline = ?, description = ?, published = ?, archived = ?, cover_url = ?, cover_thumb_url = ? WHERE id = ?`,
    args: [internalSlug, route, isSpec ? d.subjectId! : null, d.name, d.tagline, d.description, d.published ? 1 : 0, d.archived ? 1 : 0, d.coverUrl, d.coverThumbUrl, d.id],
  });
  if (!isSpec && s(cur.route_slug) !== route) {
    await writeRedirect(db, `/module/${s(cur.route_slug)}`, `/module/${route}`);
    // the internal keys of its specializations follow
    const specs = (await db.execute({ sql: "SELECT id, route_slug FROM module_subjects WHERE parent_id = ?", args: [d.id] })).rows;
    await db.batch(specs.map((r) => ({ sql: "UPDATE module_subjects SET slug = ? WHERE id = ?", args: [`${route}.${s(r.route_slug)}`, s(r.id)] })), "write");
  }
  if (isSpec && (s(cur.route_slug) !== route || s(cur.parent_id) !== d.subjectId)) {
    const oldParent = (await db.execute({ sql: "SELECT route_slug FROM module_subjects WHERE id = ?", args: [s(cur.parent_id)] })).rows[0];
    await writeRedirect(db, `/module/${s(oldParent?.route_slug)}/${s(cur.route_slug)}`, `/module/${parentRoute}/${route}`);
  }
  await logActivity({ id: actor.id, name: actor.name }, "record.updated", {}, `${isSpec ? "Specialization" : "Subject"} changed: ${d.name}`);
  return { id: d.id };
}

/** Removes a subject or specialization that has no modules (levels without modules go with it). Otherwise: archive it instead. */
export async function deleteSubjectNode(actor: Viewer, id: string): Promise<void> {
  owner(actor);
  const db = await conn();
  const row = (await db.execute({ sql: "SELECT id, name, parent_id FROM module_subjects WHERE id = ?", args: [id] })).rows[0];
  if (!row) throw new ModuleError("not_found", "Not found.");
  const count = n(
    (
      await db.execute({
        sql: "SELECT COUNT(*) AS c FROM modules WHERE subject_id = ? OR subject_id IN (SELECT id FROM module_subjects WHERE parent_id = ?)",
        args: [id, id],
      })
    ).rows[0].c,
  );
  if (count > 0) throw new ModuleError("conflict", `"${s(row.name)}" has ${count} modules planned or written. Archive it instead: it disappears from the site and nothing is lost.`);
  await db.batch(
    [
      { sql: "DELETE FROM module_levels WHERE subject_id IN (SELECT id FROM module_subjects WHERE parent_id = ?)", args: [id] },
      { sql: "DELETE FROM module_subjects WHERE parent_id = ?", args: [id] },
      { sql: "DELETE FROM module_levels WHERE subject_id = ?", args: [id] },
      { sql: "DELETE FROM module_subjects WHERE id = ?", args: [id] },
    ],
    "write",
  );
  await logActivity({ id: actor.id, name: actor.name }, "record.archived", {}, `${sn(row.parent_id) ? "Specialization" : "Subject"} deleted: ${s(row.name)}`);
}

// ---------------------------------------------------------------- academic levels

const levelInput = z.object({
  id: z.string().min(1).max(80).optional(),
  specializationId: z.string().min(1).max(80),
  name: z.string().trim().min(2, "Give the level a name (2+ characters)").max(120),
  slug: segment,
  description: text(600),
});
export type LevelInput = z.input<typeof levelInput>;

export async function saveLevelNode(actor: Viewer, input: LevelInput): Promise<{ id: string }> {
  owner(actor);
  const d = levelInput.parse(input);
  const db = await conn();
  const route = slugify(d.slug || d.name, 60);
  if (!route) throw new ModuleError("invalid", "The address needs letters or digits.");
  const sp = (await db.execute({ sql: "SELECT m.route_slug AS spec, t.route_slug AS subject FROM module_subjects m JOIN module_subjects t ON t.id = m.parent_id WHERE m.id = ?", args: [d.specializationId] })).rows[0];
  if (!sp) throw new ModuleError("invalid", "Choose a specialization.");
  const clash = (await db.execute({ sql: "SELECT id FROM module_levels WHERE subject_id = ? AND slug = ? AND id <> ?", args: [d.specializationId, route, d.id ?? ""] })).rows[0];
  if (clash) throw new ModuleError("conflict", `The address "${route}" is already used by another level of this specialization.`);

  if (!d.id) {
    const id = newId("ml_");
    const next = (await db.execute({ sql: "SELECT COALESCE(MAX(num), 0) + 1 AS num, COALESCE(MAX(sort), 0) + 10 AS sort FROM module_levels WHERE subject_id = ?", args: [d.specializationId] })).rows[0];
    await db.execute({
      sql: "INSERT INTO module_levels(id, subject_id, slug, num, name, description, sort) VALUES (?, ?, ?, ?, ?, ?, ?)",
      args: [id, d.specializationId, route, n(next.num), d.name, d.description, n(next.sort)],
    });
    return { id };
  }
  const cur = (await db.execute({ sql: "SELECT slug FROM module_levels WHERE id = ? AND subject_id = ?", args: [d.id, d.specializationId] })).rows[0];
  if (!cur) throw new ModuleError("not_found", "Level not found.");
  await db.execute({ sql: "UPDATE module_levels SET slug = ?, name = ?, description = ? WHERE id = ?", args: [route, d.name, d.description, d.id] });
  if (s(cur.slug) !== route) await writeRedirect(db, `/module/${s(sp.subject)}/${s(sp.spec)}/${s(cur.slug)}`, `/module/${s(sp.subject)}/${s(sp.spec)}/${route}`);
  return { id: d.id };
}

/** A level can be removed only while nothing is planned or written in it. */
export async function deleteLevelNode(actor: Viewer, id: string): Promise<void> {
  owner(actor);
  const db = await conn();
  const row = (await db.execute({ sql: "SELECT name FROM module_levels WHERE id = ?", args: [id] })).rows[0];
  if (!row) throw new ModuleError("not_found", "Level not found.");
  const c = n((await db.execute({ sql: "SELECT COUNT(*) AS c FROM modules WHERE level_id = ?", args: [id] })).rows[0].c);
  if (c > 0) throw new ModuleError("conflict", `"${s(row.name)}" has ${c} items planned or written, so it cannot be deleted.`);
  await db.execute({ sql: "DELETE FROM module_levels WHERE id = ?", args: [id] });
}

// ---------------------------------------------------------------- order

/** Sets the display order of subjects, of the specializations of one subject, or of the levels of one specialization, from a list of ids. */
export async function reorder(actor: Viewer, kind: "subjects" | "levels", ids: string[]): Promise<void> {
  owner(actor);
  if (!ids.length || ids.length > 500) throw new ModuleError("invalid", "Nothing to order.");
  const db = await conn();
  const table = kind === "levels" ? "module_levels" : "module_subjects";
  await db.batch(
    ids.map((id, i) => ({
      sql: kind === "levels" ? `UPDATE ${table} SET sort = ?, num = ? WHERE id = ?` : `UPDATE ${table} SET sort = ? WHERE id = ?`,
      args: kind === "levels" ? [(i + 1) * 10, i + 1, id] : [(i + 1) * 10, id],
    })),
    "write",
  );
}

// ---------------------------------------------------------------- shared modules

export type ModuleChoice = { id: string; title: string; path: string; status: string };

/** Modules (not chapters) matching a search, labelled with where they live, for choosing a shared module. */
export async function searchModules(q: string, excludeLevelId?: string): Promise<ModuleChoice[]> {
  const term = q.trim();
  if (term.length < 2) return [];
  const db = await conn();
  const like = `%${term.replace(/[\\%_]/g, (c) => `\\${c}`)}%`;
  const rows = (
    await db.execute({
      sql: `SELECT m.id, m.title, m.status, t.name AS subject, sp.name AS spec, l.name AS level
            FROM modules m JOIN module_subjects sp ON sp.id = m.subject_id JOIN module_subjects t ON t.id = sp.parent_id JOIN module_levels l ON l.id = m.level_id
            WHERE m.kind = 'module' AND m.status <> 'archived' AND m.title LIKE ? ESCAPE '\\' AND m.level_id <> ?
            ORDER BY m.title LIMIT 20`,
      args: [like, excludeLevelId ?? ""],
    })
  ).rows;
  return rows.map((r) => ({ id: s(r.id), title: s(r.title), path: `${s(r.subject)} › ${s(r.spec)} › ${s(r.level)}`, status: s(r.status) }));
}

/** Lists an existing module in another level's contents ("Shared foundations"). The module stays where it is; nothing is copied. */
export async function addSharedModule(actor: Viewer, levelId: string, moduleId: string): Promise<{ id: string }> {
  owner(actor);
  const db = await conn();
  const m = (await db.execute({ sql: "SELECT id, kind, level_id FROM modules WHERE id = ?", args: [moduleId] })).rows[0];
  if (!m || s(m.kind) !== "module") throw new ModuleError("invalid", "Choose a module.");
  if (s(m.level_id) === levelId) throw new ModuleError("invalid", "That module already belongs to this level.");
  const lv = (await db.execute({ sql: "SELECT id FROM module_levels WHERE id = ?", args: [levelId] })).rows[0];
  if (!lv) throw new ModuleError("not_found", "Level not found.");
  const dup = (await db.execute({ sql: "SELECT id FROM module_links WHERE level_id = ? AND module_id = ?", args: [levelId, moduleId] })).rows[0];
  if (dup) throw new ModuleError("conflict", "That module is already listed in this level.");
  const id = newId("mk_");
  const sort = n((await db.execute({ sql: "SELECT COALESCE(MAX(sort), 0) + 10 AS x FROM module_links WHERE level_id = ?", args: [levelId] })).rows[0].x);
  await db.execute({ sql: "INSERT INTO module_links(id, level_id, module_id, sort, created_at) VALUES (?, ?, ?, ?, ?)", args: [id, levelId, moduleId, sort, nowIso()] });
  return { id };
}

export async function removeSharedModule(actor: Viewer, linkId: string): Promise<void> {
  owner(actor);
  const db = await conn();
  await db.execute({ sql: "DELETE FROM module_links WHERE id = ?", args: [linkId] });
}

export type SharedEntry = { id: string; moduleId: string; title: string; path: string };
export async function listSharedModules(levelId: string): Promise<SharedEntry[]> {
  const db = await conn();
  const rows = (
    await db.execute({
      sql: `SELECT k.id, m.id AS module_id, m.title, t.name AS subject, sp.name AS spec, l.name AS level
            FROM module_links k JOIN modules m ON m.id = k.module_id JOIN module_subjects sp ON sp.id = m.subject_id JOIN module_subjects t ON t.id = sp.parent_id JOIN module_levels l ON l.id = m.level_id
            WHERE k.level_id = ? ORDER BY k.sort, m.title`,
      args: [levelId],
    })
  ).rows;
  return rows.map((r) => ({ id: s(r.id), moduleId: s(r.module_id), title: s(r.title), path: `${s(r.subject)} › ${s(r.spec)} › ${s(r.level)}` }));
}
