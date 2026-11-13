import { z } from "zod";
import { conn } from "../db/client";
import { newId } from "../crypto";
import { can } from "../auth/permissions";
import { emptyDoc, MAX_DOC_BYTES, parseDoc, type Doc } from "../content/schema";
import { renderDoc, type Heading } from "../content/render";
import { docToText, readingMinutes, slugify, wordCount } from "../content/text";
import {
  BIOLOGY_LEVELS, BIOLOGY_SPECIALIZATIONS, generalSpecialization, genericLevels, SUBJECTS,
} from "../modules/curriculum";
import { CURRICULUM_SPECIALIZATIONS, specializationLevels } from "../modules/curriculum-specializations";
import {
  CONTENT_STATUSES, MIN_PUBLISH_WORDS, moduleHref, normalizeDoi, readableSequence, specHref,
  type ContentStatus, type Crumb, type LevelInfo, type NodeKind, type PublicationStatus, type Reference, type SpecializationInfo, type SubjectInfo, type SubjectTree, type TreeLevel, type TreeNode,
} from "../modules/shared";
import type { PlannerRecord } from "../planner-shared";
import { createRecord, type Viewer } from "./planner";
import { readRefcheck, refcheckGate, type RefcheckStatus, type StoredItem } from "./refcheck";
import { refsHash } from "../refcheck/hash";
import { logActivity } from "./activity";
import { json, n, nowIso, s, sn, type Row } from "./util";

/**
 * The learning platform's data: subjects, levels, and the tree of disciplines, modules and chapters, with each module's
 * body and reference list. Everything a visitor sees is read here; everything an editor changes goes through here, and every
 * rule (who may edit, what must be true before a module can be published) is enforced here, not in the screens.
 */

export class ModuleError extends Error {
  constructor(
    public code: "not_found" | "forbidden" | "conflict" | "invalid",
    message: string,
  ) {
    super(message);
  }
}

// ---------------------------------------------------------------- the public tree

type NodeRow = { id: string; level_id: string; parent_id: string | null; kind: string; slug: string; title: string; summary: string; status: string; content_status: string; reading_minutes: number; has_body: boolean };

const toNodeRow = (r: Row): NodeRow => ({
  id: s(r.id), level_id: s(r.level_id), parent_id: sn(r.parent_id), kind: s(r.kind), slug: s(r.slug), title: s(r.title), summary: s(r.summary),
  status: s(r.status), content_status: s(r.content_status), reading_minutes: n(r.reading_minutes), has_body: n(r.has_body) === 1,
});

/** A module of another specialization that is listed in a level of this one. */
export type LinkRow = NodeRow & { link_id: string; href: string };

const toLinkRow = (r: Row): LinkRow => ({ ...toNodeRow(r), link_id: s(r.link_id), href: s(r.href) });

/** The route segment is the public slug; `slug` stays the table's internal unique key (for a specialization it is "<subject>.<segment>"). */
export const toSubject = (r: Row): SubjectInfo => ({
  id: s(r.id), slug: s(r.route_slug) || s(r.slug), name: s(r.name), tagline: s(r.tagline), description: s(r.description), accent: s(r.accent), sort: n(r.sort),
  coverUrl: s(r.cover_url), coverThumbUrl: s(r.cover_thumb_url),
});
const toSpec = (r: Row, subjectSlug: string): SpecializationInfo => ({ ...toSubject(r), subjectSlug });
const toLevel = (r: Row): LevelInfo => ({ id: s(r.id), slug: s(r.slug), num: n(r.num), name: s(r.name), description: s(r.description) });

export const SHARED_HEADING = "Shared foundations";

/** Pure: turns the flat rows of one specialization into the nested tree. A node is readable only when published and written. */
export function buildTree(subject: SubjectInfo, spec: SpecializationInfo, levels: LevelInfo[], rows: NodeRow[], links: LinkRow[] = []): SubjectTree {
  const byParent = new Map<string | null, NodeRow[]>();
  for (const r of rows) {
    const key = r.parent_id;
    if (!byParent.has(key)) byParent.set(key, []);
    byParent.get(key)!.push(r);
  }
  const make = (r: NodeRow, parentTrail: string[]): TreeNode => {
    const trail = r.kind === "discipline" ? [] : [...parentTrail, r.slug];
    return {
      id: r.id,
      kind: r.kind as NodeKind,
      slug: r.slug,
      title: r.title,
      summary: r.summary,
      status: r.status as PublicationStatus,
      contentStatus: r.content_status as ContentStatus,
      readable: r.kind !== "discipline" && r.status === "published" && r.has_body,
      readingMinutes: r.reading_minutes,
      trail,
      children: (byParent.get(r.id) ?? []).map((c) => make(c, trail)),
    };
  };
  const out: TreeLevel[] = levels.map((l) => {
    const nodes = rows.filter((r) => r.level_id === l.id && r.parent_id === null).map((r) => make(r, []));
    // Modules of other specializations that this level lists (shared foundations): shown under their own heading, linking to their real page.
    const shared = links.filter((k) => k.level_id === l.id);
    if (shared.length) {
      nodes.push({
        id: `shared-${l.id}`, kind: "discipline", slug: "shared-foundations", title: SHARED_HEADING, summary: "", status: "published", contentStatus: "final", readable: false, readingMinutes: 0, trail: [],
        children: shared.map((k) => ({
          id: k.id, kind: "module" as const, slug: k.slug, title: k.title, summary: k.summary, status: k.status as PublicationStatus, contentStatus: k.content_status as ContentStatus,
          readable: k.status === "published" && k.has_body, readingMinutes: k.reading_minutes, trail: [k.slug], children: [], linkHref: k.href, linkId: k.link_id,
        })),
      });
    }
    return { ...l, nodes };
  });
  return { subject, spec, levels: out };
}

/** The live (published, not archived) subject with this address segment, or null. */
async function findSubjectRow(slug: string): Promise<Row | null> {
  const db = await conn();
  return (await db.execute({ sql: "SELECT * FROM module_subjects WHERE parent_id IS NULL AND route_slug = ? AND published = 1 AND archived = 0", args: [slug] })).rows[0] ?? null;
}

/** One specialization of a subject, with its academic levels and the whole tree of modules under them. */
export async function getSubjectTree(subjectSlug: string, specSlug: string): Promise<SubjectTree | null> {
  const db = await conn();
  const sub = await findSubjectRow(subjectSlug);
  if (!sub) return null;
  const subject = toSubject(sub);
  const sp = (await db.execute({ sql: "SELECT * FROM module_subjects WHERE parent_id = ? AND route_slug = ? AND published = 1 AND archived = 0", args: [subject.id, specSlug] })).rows[0];
  if (!sp) return null;
  const spec = toSpec(sp, subject.slug);
  const [lv, nd, lk] = await db.batch(
    [
      { sql: "SELECT * FROM module_levels WHERE subject_id = ? ORDER BY sort, num", args: [spec.id] },
      {
        sql: `SELECT id, level_id, parent_id, kind, slug, title, summary, sort, status, content_status, reading_minutes, (length(body_text) > 0) AS has_body
              FROM modules WHERE subject_id = ? AND status <> 'archived' ORDER BY sort, title`,
        args: [spec.id],
      },
      {
        sql: `SELECT k.id AS link_id, k.level_id AS level_id, m.id, m.parent_id, m.kind, m.slug, m.title, m.summary, k.sort, m.status, m.content_status, m.reading_minutes, (length(m.body_text) > 0) AS has_body,
                     '/module/' || s.route_slug || '/' || sp.route_slug || '/' || l.slug || '/' || m.slug AS href
              FROM module_links k JOIN modules m ON m.id = k.module_id JOIN module_levels l ON l.id = m.level_id
              JOIN module_subjects sp ON sp.id = m.subject_id JOIN module_subjects s ON s.id = sp.parent_id
              WHERE k.level_id IN (SELECT id FROM module_levels WHERE subject_id = ?) AND m.status <> 'archived' ORDER BY k.sort, m.title`,
        args: [spec.id],
      },
    ],
    "read",
  );
  return buildTree(subject, spec, lv.rows.map(toLevel), nd.rows.map(toNodeRow), lk.rows.map(toLinkRow));
}

export type SubjectSummary = SubjectInfo & { specializationCount: number; levelCount: number; moduleCount: number; readableCount: number };
export type SpecializationSummary = SpecializationInfo & { levelCount: number; moduleCount: number; readableCount: number };

/** Module counts per specialization id. */
async function countsBySpec(): Promise<{ levels: Map<string, number>; mods: Map<string, { total: number; readable: number }> }> {
  const db = await conn();
  const [levels, mods] = await db.batch(
    [
      { sql: "SELECT subject_id, COUNT(*) AS c FROM module_levels GROUP BY subject_id", args: [] },
      {
        sql: `SELECT subject_id, COUNT(*) AS total, SUM(CASE WHEN status = 'published' AND length(body_text) > 0 THEN 1 ELSE 0 END) AS readable
              FROM modules WHERE kind = 'module' AND status <> 'archived' GROUP BY subject_id`,
        args: [],
      },
    ],
    "read",
  );
  return {
    levels: new Map(levels.rows.map((r) => [s(r.subject_id), n(r.c)])),
    mods: new Map(mods.rows.map((r) => [s(r.subject_id), { total: n(r.total), readable: n(r.readable) }])),
  };
}

/** The main subjects that are live, with totals over all of their specializations. */
export async function listSubjects(): Promise<SubjectSummary[]> {
  const db = await conn();
  const subs = (await db.execute("SELECT * FROM module_subjects WHERE parent_id IS NULL AND published = 1 AND archived = 0 ORDER BY sort, name")).rows;
  const specs = (await db.execute("SELECT id, parent_id FROM module_subjects WHERE parent_id IS NOT NULL AND published = 1 AND archived = 0")).rows;
  const { levels, mods } = await countsBySpec();
  return subs.map((r) => {
    const sub = toSubject(r);
    const mine = specs.filter((x) => s(x.parent_id) === sub.id).map((x) => s(x.id));
    const sum = (f: (id: string) => number) => mine.reduce((a, id) => a + f(id), 0);
    return {
      ...sub,
      specializationCount: mine.length,
      levelCount: sum((id) => levels.get(id) ?? 0),
      moduleCount: sum((id) => mods.get(id)?.total ?? 0),
      readableCount: sum((id) => mods.get(id)?.readable ?? 0),
    };
  });
}

/** A subject and the specializations a visitor can choose from. */
export async function getSubjectWithSpecializations(subjectSlug: string): Promise<{ subject: SubjectInfo; specializations: SpecializationSummary[] } | null> {
  const sub = await findSubjectRow(subjectSlug);
  if (!sub) return null;
  const subject = toSubject(sub);
  const db = await conn();
  const rows = (await db.execute({ sql: "SELECT * FROM module_subjects WHERE parent_id = ? AND published = 1 AND archived = 0 ORDER BY sort, name", args: [subject.id] })).rows;
  const { levels, mods } = await countsBySpec();
  return {
    subject,
    specializations: rows.map((r) => {
      const sp = toSpec(r, subject.slug);
      return { ...sp, levelCount: levels.get(sp.id) ?? 0, moduleCount: mods.get(sp.id)?.total ?? 0, readableCount: mods.get(sp.id)?.readable ?? 0 };
    }),
  };
}

/**
 * Where an old address now lives, or null. The longest matching entry wins, so /module/biomed/foundations/x follows the rule for
 * /module/biomed. Entries are written by the migration, and whenever an administrator changes an address segment.
 */
export async function findRedirect(path: string): Promise<string | null> {
  const clean = "/" + path.split("/").filter(Boolean).join("/");
  const parts = clean.split("/").filter(Boolean);
  const db = await conn();
  for (let i = parts.length; i >= 2; i--) {
    const prefix = "/" + parts.slice(0, i).join("/");
    const r = (await db.execute({ sql: "SELECT to_path FROM module_redirects WHERE from_path = ?", args: [prefix] })).rows[0];
    if (r) {
      const to = s(r.to_path) + (i < parts.length ? "/" + parts.slice(i).join("/") : "");
      return to === clean ? null : to;
    }
  }
  return null;
}

/** Finds a node by its address: the level, then the module's slug, then any chapter slugs. Pure. */
export function findNode(tree: SubjectTree, levelSlug: string, trail: string[]): { level: TreeLevel; node: TreeNode; crumbs: Crumb[] } | null {
  const level = tree.levels.find((l) => l.slug === levelSlug);
  if (!level || !trail.length) return null;
  const { slug: subjectSlug } = tree.subject;
  const specSlug = tree.spec.slug;
  const crumbs: Crumb[] = [{ title: level.name, href: moduleHref(subjectSlug, specSlug, level.slug) }];
  // modules sit under a discipline heading (or directly under the level); the heading is not part of the address.
  // A shared module (listed here, owned by another specialization) has its page at its own address, not under this level.
  const modules: TreeNode[] = level.nodes.flatMap((x) => (x.kind === "discipline" ? x.children : [x])).filter((m) => !m.linkHref);
  let node: TreeNode | undefined = modules.find((m) => m.slug === trail[0]);
  if (!node) return null;
  crumbs.push({ title: node.title, href: moduleHref(subjectSlug, specSlug, level.slug, [node.slug]) });
  for (const slug of trail.slice(1)) {
    node = node.children.find((c) => c.slug === slug);
    if (!node) return null;
    crumbs.push({ title: node.title, href: moduleHref(subjectSlug, specSlug, level.slug, node.trail) });
  }
  return { level, node, crumbs: crumbs.slice(0, -1) };
}

export type ModulePage = {
  tree: SubjectTree;
  subject: SubjectInfo;
  spec: SpecializationInfo;
  level: TreeLevel;
  node: TreeNode;
  /** Level, module and chapters above this node (the node itself excluded). */
  crumbs: Crumb[];
  html: string;
  hasMath: boolean;
  headings: Heading[];
  objectives: string[];
  prerequisites: string[];
  references: Reference[];
  summary: string;
  readingMinutes: number;
  publishedAt: string | null;
  updatedAt: string;
  lastEditorName: string;
  prev: { title: string; href: string } | null;
  next: { title: string; href: string } | null;
};

/** A module or chapter as a reader sees it, or null unless it is published (a draft has no public address). */
export async function getModulePage(subjectSlug: string, specSlug: string, levelSlug: string, trail: string[]): Promise<ModulePage | null> {
  const tree = await getSubjectTree(subjectSlug, specSlug);
  if (!tree) return null;
  const found = findNode(tree, levelSlug, trail);
  if (!found || !found.node.readable) return null;
  const db = await conn();
  const r = (await db.execute({
    sql: "SELECT html, headings, has_math, objectives, prerequisites, refs, summary, reading_minutes, published_at, updated_at, last_editor_name FROM modules WHERE id = ? AND status = 'published'",
    args: [found.node.id],
  })).rows[0];
  if (!r) return null;
  const seq = readableSequence(tree);
  const at = seq.findIndex((x) => x.id === found.node.id);
  return {
    tree,
    subject: tree.subject,
    spec: tree.spec,
    level: found.level,
    node: found.node,
    crumbs: found.crumbs,
    html: s(r.html),
    hasMath: n(r.has_math) === 1,
    headings: json<Heading[]>(r.headings, []),
    objectives: json<string[]>(r.objectives, []),
    prerequisites: json<string[]>(r.prerequisites, []),
    references: json<Reference[]>(r.refs, []),
    summary: s(r.summary),
    readingMinutes: n(r.reading_minutes),
    publishedAt: sn(r.published_at),
    updatedAt: s(r.updated_at),
    lastEditorName: s(r.last_editor_name),
    prev: at > 0 ? { title: seq[at - 1].title, href: seq[at - 1].href } : null,
    next: at >= 0 && at < seq.length - 1 ? { title: seq[at + 1].title, href: seq[at + 1].href } : null,
  };
}

export type ModuleUrl = { path: string; kind: "index" | "subject" | "specialization" | "level" | "module"; updatedAt: string | null };

/**
 * Every public address of the platform, for the sitemap. A lesson carries its own last-changed time; the index, subject and level
 * pages carry none (they change whenever any lesson does, and an invented date would make crawlers re-read everything daily).
 */
/**
 * Every public module address, for the sitemap. Everything is read in two round trips and the trees are built in memory. One query
 * per specialization would exceed the request limit of a Cloudflare Worker (50 subrequests on the free plan) at 40 specializations.
 */
export async function listModuleUrls(): Promise<ModuleUrl[]> {
  const db = await conn();
  const out: ModuleUrl[] = [{ path: "/module", kind: "index", updatedAt: null }];
  const subs = (await db.execute("SELECT * FROM module_subjects WHERE parent_id IS NULL AND published = 1 AND archived = 0 ORDER BY sort")).rows;
  const [specRows, levelRows, nodeRows, linkRows, updatedRows] = await db.batch(
    [
      { sql: "SELECT * FROM module_subjects WHERE parent_id IS NOT NULL AND published = 1 AND archived = 0 ORDER BY sort, name", args: [] },
      { sql: "SELECT * FROM module_levels ORDER BY sort, num", args: [] },
      {
        sql: `SELECT id, subject_id, level_id, parent_id, kind, slug, title, summary, sort, status, content_status, reading_minutes, (length(body_text) > 0) AS has_body
              FROM modules WHERE status <> 'archived' ORDER BY sort, title`,
        args: [],
      },
      {
        sql: `SELECT k.id AS link_id, k.level_id AS level_id, m.id, m.parent_id, m.kind, m.slug, m.title, m.summary, k.sort, m.status, m.content_status, m.reading_minutes, (length(m.body_text) > 0) AS has_body,
                     '/module/' || s.route_slug || '/' || sp.route_slug || '/' || l.slug || '/' || m.slug AS href
              FROM module_links k JOIN modules m ON m.id = k.module_id JOIN module_levels l ON l.id = m.level_id
              JOIN module_subjects sp ON sp.id = m.subject_id JOIN module_subjects s ON s.id = sp.parent_id
              WHERE m.status <> 'archived' ORDER BY k.sort, m.title`,
        args: [],
      },
      { sql: "SELECT id, updated_at FROM modules WHERE status = 'published' AND length(body_text) > 0", args: [] },
    ],
    "read",
  );
  const updated = new Map(updatedRows.rows.map((r) => [s(r.id), s(r.updated_at)]));
  for (const sub of subs) {
    const subject = toSubject(sub);
    out.push({ path: `/module/${subject.slug}`, kind: "subject", updatedAt: null });
    for (const sr of specRows.rows.filter((r) => s(r.parent_id) === subject.id)) {
      const spec = toSpec(sr, subject.slug);
      out.push({ path: specHref(subject.slug, spec.slug), kind: "specialization", updatedAt: null });
      const levels = levelRows.rows.filter((r) => s(r.subject_id) === spec.id).map(toLevel);
      const levelIds = new Set(levels.map((l) => l.id));
      const nodes = nodeRows.rows.filter((r) => s(r.subject_id) === spec.id).map(toNodeRow);
      const links = linkRows.rows.filter((r) => levelIds.has(s(r.level_id))).map(toLinkRow);
      const tree = buildTree(subject, spec, levels, nodes, links);
      for (const level of tree.levels) {
        out.push({ path: moduleHref(tree.subject.slug, tree.spec.slug, level.slug), kind: "level", updatedAt: null });
        const walk = (items: TreeNode[]) => {
          for (const nd of items) {
            if (nd.linkHref) continue; // a shared module is listed at its own address
            if (nd.readable) out.push({ path: moduleHref(tree.subject.slug, tree.spec.slug, level.slug, nd.trail), kind: "module", updatedAt: updated.get(nd.id) ?? null });
            walk(nd.children);
          }
        };
        walk(level.nodes);
      }
    }
  }
  return out;
}

// ---------------------------------------------------------------- the seed

const sortOf = (i: number) => (i + 1) * 10;

type Stmt = { sql: string; args: (string | number | null)[] };

/**
 * Installs the six subjects, Biology's 35 specializations (General Biology holds the full 12-level curriculum, the others the
 * standard ladder of levels), one "General" specialization for every other subject, and one planner task per module so that the
 * whole curriculum can be assigned and tracked in the Planner. Safe to repeat: it adds only what is missing and never changes
 * anything that has been edited since. A database converted from the earlier structure already has most of these rows.
 */
export async function ensureCurriculum(owner: { id: string; name: string }): Promise<{ subjects: number; specializations: number; levels: number; modules: number; tasks: number }> {
  const db = await conn();
  const t = nowIso();
  const made = { subjects: 0, specializations: 0, levels: 0, modules: 0, tasks: 0 };
  const stmts: Stmt[] = [];
  const flush = async () => {
    for (let i = 0; i < stmts.length; i += 80) await db.batch(stmts.slice(i, i + 80), "write");
    stmts.length = 0;
  };

  // subjects (top level) by address segment
  const subjectId = new Map((await db.execute("SELECT id, route_slug FROM module_subjects WHERE parent_id IS NULL")).rows.map((r) => [s(r.route_slug), s(r.id)]));
  SUBJECTS.forEach((sub, i) => {
    if (subjectId.has(sub.slug)) return;
    const id = newId("ms_");
    subjectId.set(sub.slug, id);
    made.subjects++;
    stmts.push({
      sql: "INSERT INTO module_subjects(id, slug, route_slug, name, tagline, description, accent, sort, published, created_at) VALUES (?, ?, ?, ?, ?, ?, 'brand', ?, 1, ?)",
      args: [id, sub.slug, sub.slug, sub.name, sub.tagline, sub.description, sortOf(i), t],
    });
  });
  await flush();

  // specializations by "<subject>/<segment>"
  const specId = new Map((await db.execute("SELECT id, parent_id, route_slug FROM module_subjects WHERE parent_id IS NOT NULL")).rows.map((r) => [`${s(r.parent_id)}/${s(r.route_slug)}`, s(r.id)]));
  const plan: { subjectSlug: string; subjectName: string; specs: { slug: string; name: string; description: string }[] }[] = SUBJECTS.map((sub) => ({
    subjectSlug: sub.slug,
    subjectName: sub.name,
    specs: sub.slug === "bio" ? BIOLOGY_SPECIALIZATIONS : [generalSpecialization(sub.name)],
  }));
  for (const p of plan) {
    const parent = subjectId.get(p.subjectSlug)!;
    p.specs.forEach((sp, i) => {
      const key = `${parent}/${sp.slug}`;
      if (specId.has(key)) return;
      const id = newId("ms_");
      specId.set(key, id);
      made.specializations++;
      stmts.push({
        sql: "INSERT INTO module_subjects(id, slug, route_slug, parent_id, name, tagline, description, accent, sort, published, created_at) VALUES (?, ?, ?, ?, ?, '', ?, 'brand', ?, 1, ?)",
        args: [id, `${p.subjectSlug}.${sp.slug}`, sp.slug, parent, sp.name, sp.description, sortOf(i), t],
      });
    });
  }
  await flush();

  // academic levels of each specialization: General Biology has its own 12; every other one the standard ladder
  const levelId = new Map((await db.execute("SELECT id, subject_id, slug FROM module_levels")).rows.map((r) => [`${s(r.subject_id)}/${s(r.slug)}`, s(r.id)]));
  for (const p of plan) {
    const parent = subjectId.get(p.subjectSlug)!;
    for (const sp of p.specs) {
      const sid = specId.get(`${parent}/${sp.slug}`)!;
      const levels = p.subjectSlug === "bio" && sp.slug === "general-biology" ? BIOLOGY_LEVELS : genericLevels(sp.slug.startsWith("general-") ? p.subjectName : sp.name);
      levels.forEach((lv, i) => {
        const key = `${sid}/${lv.slug}`;
        if (levelId.has(key)) return;
        const id = newId("ml_");
        levelId.set(key, id);
        made.levels++;
        stmts.push({
          sql: "INSERT INTO module_levels(id, subject_id, slug, num, name, description, sort) VALUES (?, ?, ?, ?, ?, ?, ?)",
          args: [id, sid, lv.slug, i + 1, lv.name, lv.description, sortOf(i)],
        });
      });
    }
  }
  await flush();

  // Disciplines and modules: General Biology (232) and each specialization that has a curriculum (196 each)
  const bioParent = subjectId.get("bio")!;
  const nodeKey = (lvl: string, parent: string | null, kind: string, slug: string) => `${lvl}|${parent ?? ""}|${kind}|${slug}`;
  const curricula: { sid: string; levels: { slug: string; disciplines: { name: string; modules: string[] }[] }[] }[] = [
    { sid: specId.get(`${bioParent}/general-biology`)!, levels: BIOLOGY_LEVELS },
    ...CURRICULUM_SPECIALIZATIONS.map((slug) => {
      const name = BIOLOGY_SPECIALIZATIONS.find((b) => b.slug === slug)?.name ?? slug;
      return { sid: specId.get(`${bioParent}/${slug}`)!, levels: specializationLevels(slug, name) };
    }),
  ];
  for (const cur of curricula) {
    const subjectOfNodes = cur.sid;
    const existingNodes = new Map(
      (await db.execute({ sql: "SELECT id, level_id, parent_id, kind, slug FROM modules WHERE subject_id = ?", args: [subjectOfNodes] })).rows.map((r) => [nodeKey(s(r.level_id), sn(r.parent_id), s(r.kind), s(r.slug)), s(r.id)]),
    );
    const insertNode = (lvl: string, parentId: string | null, kind: NodeKind, title: string, sort: number): string => {
      const slug = slugify(title);
      const key = nodeKey(lvl, parentId, kind, slug);
      const have = existingNodes.get(key);
      if (have) return have;
      const id = newId("mo_");
      existingNodes.set(key, id);
      stmts.push({
        sql: "INSERT INTO modules(id, subject_id, level_id, parent_id, kind, slug, title, sort, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        args: [id, subjectOfNodes, lvl, parentId, kind, slug, title, sort, t, t],
      });
      if (kind === "module") made.modules++;
      return id;
    };
    cur.levels.forEach((lv) => {
      const lvl = levelId.get(`${cur.sid}/${lv.slug}`)!;
      lv.disciplines.forEach((d, di) => {
        const dId = insertNode(lvl, null, "discipline", d.name, sortOf(di));
        d.modules.forEach((m, mi) => insertNode(lvl, dId, "module", m, sortOf(mi)));
      });
    });
  }
  await flush();

  // One planner task per module that does not have one yet (including modules seeded earlier).
  const without = (await db.execute("SELECT m.id, m.title FROM modules m WHERE m.kind = 'module' AND NOT EXISTS (SELECT 1 FROM planner_records p WHERE p.module_id = m.id) ORDER BY m.level_id, m.sort")).rows;
  for (const r of without) {
    made.tasks++;
    stmts.push({
      sql: `INSERT INTO planner_records(id, num, title, brief, status, priority, created_by, updated_by, created_at, updated_at, content_type, module_id)
            VALUES (?, (SELECT COALESCE(MAX(num), 0) + 1 FROM planner_records), ?, '', 'idea', 'normal', ?, ?, ?, ?, 'module', ?)`,
      args: [newId("p_"), s(r.title), owner.id, owner.id, t, t, s(r.id)],
    });
  }
  await flush();
  // an address that is now a real specialization (for example the old level /module/bio/bioinformatics) must not redirect away
  await db.execute("DELETE FROM module_redirects WHERE from_path IN (SELECT '/module/' || t.route_slug || '/' || s.route_slug FROM module_subjects s JOIN module_subjects t ON t.id = s.parent_id)");
  if (made.modules || made.tasks || made.specializations) {
    await logActivity({ id: owner.id, name: owner.name }, "record.created", {}, `Learning modules installed: ${made.specializations} specializations, ${made.modules} modules, ${made.tasks} planner tasks`);
  }
  return made;
}

// ---------------------------------------------------------------- the outline used by the Planner's "new module task" form

export type Outline = {
  slug: string;
  name: string;
  specializations: { slug: string; name: string; levels: { slug: string; name: string; disciplines: string[]; modules: { title: string; slug: string }[] }[] }[];
}[];

export async function getOutline(): Promise<Outline> {
  const db = await conn();
  const [subs, levels, nodes] = await db.batch(
    [
      { sql: "SELECT id, parent_id, route_slug AS slug, name FROM module_subjects WHERE published = 1 AND archived = 0 ORDER BY sort, name", args: [] },
      { sql: "SELECT id, subject_id, slug, name FROM module_levels ORDER BY sort, num", args: [] },
      { sql: "SELECT level_id, kind, title, slug FROM modules WHERE kind IN ('discipline', 'module') AND status <> 'archived' ORDER BY sort, title", args: [] },
    ],
    "read",
  );
  const tops = subs.rows.filter((r) => sn(r.parent_id) === null);
  return tops.map((top) => ({
    slug: s(top.slug),
    name: s(top.name),
    specializations: subs.rows
      .filter((r) => s(r.parent_id) === s(top.id))
      .map((sp) => ({
        slug: s(sp.slug),
        name: s(sp.name),
        levels: levels.rows
          .filter((l) => s(l.subject_id) === s(sp.id))
          .map((l) => ({
            slug: s(l.slug),
            name: s(l.name),
            disciplines: nodes.rows.filter((x) => s(x.level_id) === s(l.id) && s(x.kind) === "discipline").map((x) => s(x.title)),
            modules: nodes.rows.filter((x) => s(x.level_id) === s(l.id) && s(x.kind) === "module").map((x) => ({ title: s(x.title), slug: s(x.slug) })),
          })),
      })),
  }));
}

// ---------------------------------------------------------------- creating a module task from the Planner

export const referenceInput = z
  .object({ text: z.string().trim().min(10, "A reference needs at least 10 characters").max(800), doi: z.string().trim().max(200).default("") })
  .transform((r, ctx): Reference => {
    if (!r.doi) return { text: r.text, doi: "" };
    const doi = normalizeDoi(r.doi);
    if (!doi) ctx.addIssue({ code: "custom", message: `"${r.doi}" is not a valid DOI (it looks like 10.1234/abcd)`, path: ["doi"] });
    return { text: r.text, doi: doi ?? "" };
  });

const lines = (max: number) => z.array(z.string().trim().min(2).max(300)).max(max).default([]);

export const moduleTaskInput = z.object({
  subjectSlug: z.string().trim().min(1).max(40),
  specializationSlug: z.string().trim().min(1).max(80),
  levelSlug: z.string().trim().min(1).max(60),
  discipline: z.string().trim().max(120).default(""),
  moduleTitle: z.string().trim().min(3, "Give the module a title (3+ characters)").max(160),
  chapter: z.string().trim().max(160).default(""),
  objectives: lines(20),
  prerequisites: lines(20),
  references: z.array(referenceInput).max(100).default([]),
  contentStatus: z.enum(CONTENT_STATUSES).default("not_started"),
  brief: z.string().trim().max(4000).default(""),
  assignedTo: z.string().max(60).nullable().default(null),
  priority: z.enum(["low", "normal", "high", "urgent"]).default("normal"),
  dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use the format YYYY-MM-DD").nullable().default(null),
});
export type ModuleTaskInput = z.input<typeof moduleTaskInput>;

/**
 * Owner: plans a module (or one chapter of a module) as a Planner task. The subject and level must exist; the discipline,
 * module and chapter are found by name or created on the way, so a task can add something new to the curriculum.
 */
export async function createModuleTask(owner: Viewer, input: ModuleTaskInput): Promise<PlannerRecord> {
  if (!can(owner, "planner.manage")) throw new ModuleError("forbidden", "Only the owner can plan modules.");
  const d = moduleTaskInput.parse(input);
  const db = await conn();
  const top = (await db.execute({ sql: "SELECT id FROM module_subjects WHERE parent_id IS NULL AND route_slug = ? AND archived = 0", args: [d.subjectSlug] })).rows[0];
  if (!top) throw new ModuleError("invalid", "Choose a subject from the list.");
  const sub = (await db.execute({ sql: "SELECT id FROM module_subjects WHERE parent_id = ? AND route_slug = ? AND archived = 0", args: [s(top.id), d.specializationSlug] })).rows[0];
  if (!sub) throw new ModuleError("invalid", "Choose a specialization of that subject.");
  const lv = (await db.execute({ sql: "SELECT id FROM module_levels WHERE subject_id = ? AND slug = ?", args: [s(sub.id), d.levelSlug] })).rows[0];
  if (!lv) throw new ModuleError("invalid", "Choose an academic level of that specialization.");
  const subjectId = s(sub.id);
  const levelId = s(lv.id);
  const t = nowIso();

  const ensure = async (parentId: string | null, kind: NodeKind, title: string): Promise<{ id: string; created: boolean }> => {
    const slug = slugify(title);
    if (!slug) throw new ModuleError("invalid", `"${title}" cannot be used as a name.`);
    const found =
      kind === "chapter"
        ? (await db.execute({ sql: "SELECT id FROM modules WHERE parent_id = ? AND kind = 'chapter' AND slug = ?", args: [parentId, slug] })).rows[0]
        : (await db.execute({ sql: "SELECT id FROM modules WHERE level_id = ? AND kind = ? AND slug = ?", args: [levelId, kind, slug] })).rows[0];
    if (found) return { id: s(found.id), created: false };
    const id = newId("mo_");
    const next = n((await db.execute({ sql: "SELECT COALESCE(MAX(sort), 0) + 10 AS x FROM modules WHERE level_id = ? AND parent_id IS ?", args: [levelId, parentId] })).rows[0].x);
    await db.execute({
      sql: "INSERT INTO modules(id, subject_id, level_id, parent_id, kind, slug, title, sort, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      args: [id, subjectId, levelId, parentId, kind, slug, title, next, t, t],
    });
    return { id, created: true };
  };

  const discipline = d.discipline ? await ensure(null, "discipline", d.discipline) : null;
  // a module that already exists keeps its place, wherever it sits
  const existingModule = (await db.execute({ sql: "SELECT id FROM modules WHERE level_id = ? AND kind = 'module' AND slug = ?", args: [levelId, slugify(d.moduleTitle)] })).rows[0];
  const mod = existingModule ? { id: s(existingModule.id), created: false } : await ensure(discipline?.id ?? null, "module", d.moduleTitle);
  const target = d.chapter ? await ensure(mod.id, "chapter", d.chapter) : mod;

  const taken = (await db.execute({ sql: "SELECT num FROM planner_records WHERE module_id = ?", args: [target.id] })).rows[0];
  if (taken) throw new ModuleError("conflict", `That ${d.chapter ? "chapter" : "module"} already has a planner task (T-${String(n(taken.num)).padStart(4, "0")}).`);

  await db.execute({
    sql: "UPDATE modules SET objectives = ?, prerequisites = ?, refs = ?, content_status = ?, refcheck_status = CASE WHEN refcheck_hash = ? THEN refcheck_status ELSE 'not_checked' END, updated_at = ? WHERE id = ?",
    args: [JSON.stringify(d.objectives), JSON.stringify(d.prerequisites), JSON.stringify(d.references), d.contentStatus, refsHash(d.references), t, target.id],
  });
  return createRecord(owner, { title: d.chapter || d.moduleTitle, brief: d.brief, assignedTo: d.assignedTo, priority: d.priority, dueDate: d.dueDate }, { moduleId: target.id });
}

// ---------------------------------------------------------------- editing a module

export { MIN_PUBLISH_WORDS };

export type ModuleEdit = {
  id: string;
  kind: NodeKind;
  title: string;
  slug: string;
  summary: string;
  objectives: string[];
  prerequisites: string[];
  references: Reference[];
  /** The last reference check and whether it still applies to the current list. */
  refcheckStatus: RefcheckStatus;
  refcheckCurrent: boolean;
  refcheckAt: string | null;
  refcheckReport: StoredItem[];
  doc: Doc;
  contentStatus: ContentStatus;
  status: PublicationStatus;
  version: number;
  subjectName: string;
  subjectSlug: string;
  specializationName: string;
  specializationSlug: string;
  levelName: string;
  levelSlug: string;
  trail: string[];
  discipline: string;
  /** Public address once published. */
  href: string;
  recordId: string | null;
  recordRef: string | null;
  assignedToName: string | null;
  taskStatus: string | null;
  updatedAt: string;
  lastEditorName: string;
  wordCount: number;
};

/**
 * May this person write this module? The owner always. A contributor needs the "modules.write" permission and a task on this
 * module or on any module/chapter above it assigned to them: assigning a whole module covers its chapters.
 */
export async function canEditModule(v: Viewer, moduleId: string): Promise<boolean> {
  if (can(v, "planner.manage")) return true;
  if (!can(v, "modules.write")) return false;
  const db = await conn();
  const r = await db.execute({
    sql: `WITH RECURSIVE up(id, parent_id) AS (
            SELECT id, parent_id FROM modules WHERE id = ?
            UNION ALL SELECT m.id, m.parent_id FROM modules m JOIN up ON m.id = up.parent_id
          )
          SELECT p.status FROM planner_records p JOIN up ON p.module_id = up.id WHERE p.assigned_to = ? LIMIT 1`,
    args: [moduleId, v.id],
  });
  return r.rows.length > 0;
}

const LOCKED_STATUSES = ["in_review", "approved", "done", "archived"];

export async function getModuleEdit(v: Viewer, id: string): Promise<{ module: ModuleEdit; canWrite: boolean; locked: string | null } | null> {
  if (!(await canEditModule(v, id))) return null;
  const db = await conn();
  const r = (await db.execute({
    sql: `SELECT m.*, ts.name AS subject_name, ts.route_slug AS subject_slug, ms.name AS spec_name, ms.route_slug AS spec_slug, ml.name AS level_name, ml.slug AS level_slug,
                 p1.kind AS p1_kind, p1.title AS p1_title, p1.slug AS p1_slug, p2.kind AS p2_kind, p2.title AS p2_title, p2.slug AS p2_slug, p3.kind AS p3_kind, p3.title AS p3_title, p3.slug AS p3_slug,
                 pr.id AS record_id, pr.num AS record_num, pr.status AS task_status, ua.name AS assigned_name
          FROM modules m
          JOIN module_subjects ms ON ms.id = m.subject_id JOIN module_subjects ts ON ts.id = ms.parent_id JOIN module_levels ml ON ml.id = m.level_id
          LEFT JOIN modules p1 ON p1.id = m.parent_id LEFT JOIN modules p2 ON p2.id = p1.parent_id LEFT JOIN modules p3 ON p3.id = p2.parent_id
          LEFT JOIN planner_records pr ON pr.module_id = m.id LEFT JOIN users ua ON ua.id = pr.assigned_to
          WHERE m.id = ?`,
    args: [id],
  })).rows[0];
  if (!r) return null;
  const chain = [
    { kind: s(r.kind), title: s(r.title), slug: s(r.slug) },
    { kind: s(r.p1_kind), title: s(r.p1_title), slug: s(r.p1_slug) },
    { kind: s(r.p2_kind), title: s(r.p2_title), slug: s(r.p2_slug) },
    { kind: s(r.p3_kind), title: s(r.p3_title), slug: s(r.p3_slug) },
  ].filter((c) => c.kind);
  const trail = chain.filter((c) => c.kind !== "discipline").map((c) => c.slug).reverse();
  const parsed = parseDoc(json(r.doc, emptyDoc()));
  const doc = parsed.ok ? parsed.doc : emptyDoc();
  const owner = can(v, "planner.manage");
  const taskStatus = sn(r.task_status);
  const mod: ModuleEdit = {
    id: s(r.id),
    kind: s(r.kind) as NodeKind,
    title: s(r.title),
    slug: s(r.slug),
    summary: s(r.summary),
    objectives: json<string[]>(r.objectives, []),
    prerequisites: json<string[]>(r.prerequisites, []),
    references: json<Reference[]>(r.refs, []),
    refcheckStatus: readRefcheck(r).status,
    refcheckCurrent: readRefcheck(r).current,
    refcheckAt: readRefcheck(r).checkedAt,
    refcheckReport: readRefcheck(r).items,
    doc,
    contentStatus: s(r.content_status) as ContentStatus,
    status: s(r.status) as PublicationStatus,
    version: n(r.version),
    subjectName: s(r.subject_name),
    subjectSlug: s(r.subject_slug),
    specializationName: s(r.spec_name),
    specializationSlug: s(r.spec_slug),
    levelName: s(r.level_name),
    levelSlug: s(r.level_slug),
    trail,
    discipline: chain.find((c) => c.kind === "discipline")?.title ?? "",
    href: moduleHref(s(r.subject_slug), s(r.spec_slug), s(r.level_slug), trail),
    recordId: sn(r.record_id),
    recordRef: r.record_num == null ? null : `T-${String(n(r.record_num)).padStart(4, "0")}`,
    assignedToName: sn(r.assigned_name),
    taskStatus,
    updatedAt: s(r.updated_at),
    lastEditorName: s(r.last_editor_name),
    wordCount: wordCount(s(r.body_text)),
  };
  const locked = !owner && taskStatus && LOCKED_STATUSES.includes(taskStatus) ? "This module is with the owner for review. You can edit it again if it is sent back for revision." : null;
  return { module: mod, canWrite: owner || !locked, locked };
}

export const moduleSaveInput = z.object({
  title: z.string().trim().min(3, "Give it a title (3+ characters)").max(160),
  summary: z.string().trim().max(600).default(""),
  objectives: lines(20),
  prerequisites: lines(20),
  references: z.array(referenceInput).max(100).default([]),
  contentStatus: z.enum(CONTENT_STATUSES),
  doc: z.unknown(),
  expectedVersion: z.number().int().optional(),
});
export type ModuleSaveInput = z.input<typeof moduleSaveInput>;

/** Save a module's text and details. A contributor may move the content status only as far as "drafting"; later stages belong to the owner. */
export async function saveModule(actor: Viewer, id: string, input: ModuleSaveInput): Promise<ModuleEdit> {
  const cur = await getModuleEdit(actor, id);
  if (!cur) throw new ModuleError("not_found", "Module not found.");
  if (!cur.canWrite) throw new ModuleError("forbidden", cur.locked ?? "You cannot edit this module right now.");
  const d = moduleSaveInput.parse(input);
  const parsed = parseDoc(d.doc);
  if (!parsed.ok) throw new ModuleError("invalid", parsed.error);
  const owner = can(actor, "planner.manage");
  if (!owner && !["not_started", "outlined", "drafting"].includes(d.contentStatus) && d.contentStatus !== cur.module.contentStatus) {
    throw new ModuleError("forbidden", "Only the owner can move a module to review or final.");
  }
  if (d.expectedVersion != null && d.expectedVersion !== cur.module.version) {
    throw new ModuleError("conflict", `This module was changed by ${cur.module.lastEditorName || "someone else"} in the meantime. Reload to continue.`);
  }
  if (JSON.stringify(parsed.doc).length > MAX_DOC_BYTES) throw new ModuleError("invalid", "This module is too large to save. Split it into chapters.");
  const rendered = renderDoc(parsed.doc);
  const bodyText = docToText(parsed.doc);
  const db = await conn();
  const t = nowIso();
  const res = await db.execute({
    sql: `UPDATE modules SET title = ?, summary = ?, objectives = ?, prerequisites = ?, refs = ?, content_status = ?, doc = ?, html = ?, headings = ?, body_text = ?, has_math = ?, refcheck_status = CASE WHEN refcheck_hash = ? THEN refcheck_status ELSE 'not_checked' END,
                 reading_minutes = ?, version = version + 1, last_editor_name = ?, updated_at = ? WHERE id = ? AND version = ?`,
    args: [
      d.title, d.summary, JSON.stringify(d.objectives), JSON.stringify(d.prerequisites), JSON.stringify(d.references), d.contentStatus, JSON.stringify(parsed.doc), rendered.html,
      JSON.stringify(rendered.headings), bodyText, rendered.hasMath ? 1 : 0, refsHash(d.references), readingMinutes(bodyText), actor.name, t, id, cur.module.version,
    ],
  });
  if (!res.rowsAffected) throw new ModuleError("conflict", "This module was changed in the meantime. Reload to continue.");
  // one name in both places: the task that plans this module carries its title
  if (d.title !== cur.module.title && cur.module.recordId) await db.execute({ sql: "UPDATE planner_records SET title = ?, version = version + 1, updated_at = ? WHERE id = ?", args: [d.title, t, cur.module.recordId] });
  await logActivity({ id: actor.id, name: actor.name }, "record.updated", { recordId: cur.module.recordId ?? undefined }, `Module saved: ${d.title}`);
  return (await getModuleEdit(actor, id))!.module;
}

/** Why a module cannot be published yet. Empty means it can. These are the platform's minimum quality rules, not suggestions. */
export function publishProblems(m: Pick<ModuleEdit, "kind" | "title" | "objectives" | "references" | "contentStatus" | "refcheckStatus" | "refcheckCurrent" | "refcheckReport"> & { wordCount: number }): string[] {
  const out: string[] = [];
  if (m.kind === "discipline") out.push("A discipline heading is not published; publish the modules under it.");
  if (m.wordCount < MIN_PUBLISH_WORDS) out.push(`The body has ${m.wordCount} words. A module needs at least ${MIN_PUBLISH_WORDS} before it can be published.`);
  if (!m.objectives.length) out.push("Add at least one learning objective.");
  if (!m.references.length) out.push("Add at least one reference. Every reference must be genuine and verifiable (APA 7th edition, with the DOI when there is one).");
  if (m.contentStatus !== "final") out.push('Set the content status to "Final" after scientific review.');
  // Every reference must pass the check against the current list. This cannot be overridden.
  out.push(...refcheckGate({ count: m.references.length, status: m.refcheckStatus, current: m.refcheckCurrent, report: m.refcheckReport }));
  return out;
}

/** Owner: publish, unpublish (back to draft) or archive. Publishing is refused until the quality rules are met. */
export async function setModulePublication(owner: Viewer, id: string, status: PublicationStatus): Promise<{ ok: true; module: ModuleEdit } | { ok: false; problems: string[] }> {
  if (!can(owner, "planner.manage")) throw new ModuleError("forbidden", "Only the owner can publish.");
  const cur = await getModuleEdit(owner, id);
  if (!cur) throw new ModuleError("not_found", "Module not found.");
  if (status === "published") {
    const problems = publishProblems(cur.module);
    if (problems.length) return { ok: false, problems };
  }
  const db = await conn();
  const t = nowIso();
  await db.execute({
    sql: "UPDATE modules SET status = ?, published_at = CASE WHEN ? = 'published' THEN COALESCE(published_at, ?) ELSE published_at END, version = version + 1, updated_at = ? WHERE id = ?",
    args: [status, status, t, t, id],
  });
  // The task follows the module: published means done; taken back means approved again.
  if (cur.module.recordId) {
    if (status === "published") await db.execute({ sql: "UPDATE planner_records SET status = 'done', version = version + 1, updated_by = ?, updated_at = ? WHERE id = ? AND status <> 'done'", args: [owner.id, t, cur.module.recordId] });
    else if (cur.module.status === "published" && cur.module.taskStatus === "done") await db.execute({ sql: "UPDATE planner_records SET status = 'approved', version = version + 1, updated_by = ?, updated_at = ? WHERE id = ?", args: [owner.id, t, cur.module.recordId] });
  }
  await logActivity({ id: owner.id, name: owner.name }, "record.status", { recordId: cur.module.recordId ?? undefined }, `Module ${status}: ${cur.module.title}`);
  return { ok: true, module: (await getModuleEdit(owner, id))!.module };
}


/**
 * The modules a contributor has been given: their own module and chapter tasks, newest assignment first. The owner does not use this
 * (the owner sees every module in the Planner). Each entry says where the module sits and opens the module editor.
 */
export async function listMyModuleTasks(v: Viewer): Promise<{ id: string; title: string; kind: NodeKind; href: string; where: string; contentStatus: ContentStatus; publication: PublicationStatus; recordRef: string }[]> {
  if (!can(v, "modules.write")) return [];
  const db = await conn();
  const rows = (
    await db.execute({
      sql: `SELECT m.id, m.kind, m.title, m.content_status, m.status, p.num, ts.name AS subject, sp.name AS spec, l.name AS level
            FROM planner_records p JOIN modules m ON m.id = p.module_id
            JOIN module_subjects sp ON sp.id = m.subject_id JOIN module_subjects ts ON ts.id = sp.parent_id JOIN module_levels l ON l.id = m.level_id
            WHERE p.assigned_to = ? AND p.content_type = 'module' AND p.status NOT IN ('done', 'archived')
            ORDER BY p.updated_at DESC LIMIT 200`,
      args: [v.id],
    })
  ).rows;
  return rows.map((r) => ({
    id: s(r.id),
    kind: s(r.kind) as NodeKind,
    title: s(r.title),
    href: `/admin/modules/${s(r.id)}`,
    where: `${s(r.subject)} › ${s(r.spec)} › ${s(r.level)}`,
    contentStatus: s(r.content_status) as ContentStatus,
    publication: s(r.status) as PublicationStatus,
    recordRef: `T-${String(n(r.num)).padStart(4, "0")}`,
  }));
}
