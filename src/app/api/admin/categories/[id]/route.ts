import { z } from "zod";
import { fail, json, readJson } from "@/lib/api";
import { requireApi } from "@/lib/auth/guard";
import { deleteCategory, updateCategory } from "@/lib/store/categories";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(req: Request, ctx: Ctx) {
  try {
    await requireApi(req, { mutation: true, action: "categories.manage" });
    const patch = await readJson(
      req,
      z.object({ name: z.string().max(80).optional(), description: z.string().max(400).optional(), sort: z.number().int().min(0).max(1000).optional() }),
      2048,
    );
    const r = await updateCategory((await ctx.params).id, patch);
    return r.ok ? json({ ok: true, category: r.category }) : json({ ok: false, error: "validation", message: r.error }, 400);
  } catch (e) {
    return fail(e);
  }
}

export async function DELETE(req: Request, ctx: Ctx) {
  try {
    await requireApi(req, { mutation: true, action: "categories.manage", json: false });
    const r = await deleteCategory((await ctx.params).id);
    return r.ok ? json({ ok: true }) : json({ ok: false, error: "in_use", message: r.error }, 409);
  } catch (e) {
    return fail(e);
  }
}
