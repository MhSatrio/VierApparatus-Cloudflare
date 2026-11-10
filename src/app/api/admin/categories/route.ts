import { z } from "zod";
import { fail, json, readJson } from "@/lib/api";
import { requireApi } from "@/lib/auth/guard";
import { createCategory, listCategories } from "@/lib/store/categories";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Any signed-in writer can read the topic list (to file an article); only the owner changes it. */
export async function GET(req: Request) {
  try {
    await requireApi(req, { action: "articles.write" });
    return json({ ok: true, items: await listCategories() });
  } catch (e) {
    return fail(e);
  }
}

export async function POST(req: Request) {
  try {
    await requireApi(req, { mutation: true, action: "categories.manage" });
    const { name, description } = await readJson(req, z.object({ name: z.string().max(80), description: z.string().max(400).optional() }), 2048);
    const r = await createCategory(name, description ?? "");
    return r.ok ? json({ ok: true, category: r.category }) : json({ ok: false, error: "validation", message: r.error }, 400);
  } catch (e) {
    return fail(e);
  }
}
