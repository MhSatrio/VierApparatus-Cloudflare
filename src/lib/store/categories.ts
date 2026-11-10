import { conn } from "../db/client";
import { newId } from "../crypto";
import { slugify } from "../content/text";
import { n, s, type Row } from "./util";

export type Category = { id: string; slug: string; name: string; description: string; sort: number; articleCount: number };

const toCategory = (r: Row): Category => ({
  id: s(r.id),
  slug: s(r.slug),
  name: s(r.name),
  description: s(r.description),
  sort: n(r.sort),
  articleCount: n(r.article_count),
});

const BASE = `SELECT c.*, (SELECT COUNT(*) FROM articles a WHERE a.category_id = c.id AND a.status = 'published') AS article_count FROM categories c`;

export async function listCategories(opts: { onlyWithArticles?: boolean } = {}): Promise<Category[]> {
  const db = await conn();
  const all = (await db.execute(`${BASE} ORDER BY c.sort, c.name`)).rows.map(toCategory);
  return opts.onlyWithArticles ? all.filter((c) => c.articleCount > 0) : all;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const db = await conn();
  const r = await db.execute({ sql: `${BASE} WHERE c.slug = ?`, args: [slug] });
  return r.rows[0] ? toCategory(r.rows[0]) : null;
}

export async function getCategoryById(id: string): Promise<Category | null> {
  const db = await conn();
  const r = await db.execute({ sql: `${BASE} WHERE c.id = ?`, args: [id] });
  return r.rows[0] ? toCategory(r.rows[0]) : null;
}

export async function findCategoryByName(name: string): Promise<Category | null> {
  const db = await conn();
  const r = await db.execute({ sql: `${BASE} WHERE c.name = ? COLLATE NOCASE`, args: [name.trim()] });
  return r.rows[0] ? toCategory(r.rows[0]) : null;
}

export type CategoryResult = { ok: true; category: Category } | { ok: false; error: string };

export async function createCategory(name: string, description = ""): Promise<CategoryResult> {
  const clean = name.trim().replace(/\s+/g, " ");
  if (clean.length < 2 || clean.length > 60) return { ok: false, error: "Name must be 2 to 60 characters." };
  if (await findCategoryByName(clean)) return { ok: false, error: "A topic with this name already exists." };
  const db = await conn();
  let slug = slugify(clean, 60) || "topic";
  for (let i = 2; await getCategoryBySlug(slug); i++) slug = `${slugify(clean, 55)}-${i}`;
  const max = Number((await db.execute("SELECT COALESCE(MAX(sort), 0) AS m FROM categories")).rows[0].m);
  const id = newId("cat_");
  await db.execute({ sql: "INSERT INTO categories(id, slug, name, description, sort) VALUES (?, ?, ?, ?, ?)", args: [id, slug, clean, description.trim().slice(0, 400), max + 1] });
  return { ok: true, category: (await getCategoryById(id))! };
}

/** Renaming keeps the slug (and therefore every existing URL) unchanged. */
export async function updateCategory(id: string, patch: { name?: string; description?: string; sort?: number }): Promise<CategoryResult> {
  const cur = await getCategoryById(id);
  if (!cur) return { ok: false, error: "Topic not found." };
  const name = (patch.name ?? cur.name).trim().replace(/\s+/g, " ");
  if (name.length < 2 || name.length > 60) return { ok: false, error: "Name must be 2 to 60 characters." };
  const clash = await findCategoryByName(name);
  if (clash && clash.id !== id) return { ok: false, error: "A topic with this name already exists." };
  const db = await conn();
  await db.execute({
    sql: "UPDATE categories SET name = ?, description = ?, sort = ? WHERE id = ?",
    args: [name, (patch.description ?? cur.description).trim().slice(0, 400), patch.sort ?? cur.sort, id],
  });
  return { ok: true, category: (await getCategoryById(id))! };
}

/** A topic that still has articles cannot be deleted: move them to another topic first, so nothing silently disappears. */
export async function deleteCategory(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const db = await conn();
  const used = Number((await db.execute({ sql: "SELECT COUNT(*) AS c FROM articles WHERE category_id = ?", args: [id] })).rows[0].c);
  if (used > 0) return { ok: false, error: `${used} article${used === 1 ? " uses" : "s use"} this topic. Move ${used === 1 ? "it" : "them"} to another topic first.` };
  const r = await db.execute({ sql: "DELETE FROM categories WHERE id = ?", args: [id] });
  return r.rowsAffected > 0 ? { ok: true } : { ok: false, error: "Topic not found." };
}
