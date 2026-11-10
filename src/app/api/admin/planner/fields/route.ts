import { z } from "zod";
import { fail, json, readJson } from "@/lib/api";
import { HttpError, requireApi } from "@/lib/auth/guard";
import { createField, deleteField, fieldInput, updateField } from "@/lib/store/planner";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Custom planner fields are configuration: owner only. */
export async function POST(req: Request) {
  try {
    await requireApi(req, { mutation: true, action: "planner.manage" });
    const input = await readJson(req, fieldInput, 8 * 1024);
    const f = await createField(input);
    return json({ ok: true, field: f });
  } catch (e) {
    return fail(e);
  }
}

export async function PATCH(req: Request) {
  try {
    await requireApi(req, { mutation: true, action: "planner.manage" });
    const { id, ...input } = await readJson(req, fieldInput.extend({ id: z.string().max(60) }), 8 * 1024);
    if (!(await updateField(id, input))) throw new HttpError(404, "not_found");
    return json({ ok: true });
  } catch (e) {
    return fail(e);
  }
}

export async function DELETE(req: Request) {
  try {
    await requireApi(req, { mutation: true, action: "planner.manage" });
    const { id } = await readJson(req, z.object({ id: z.string().max(60) }), 1024);
    if (!(await deleteField(id))) throw new HttpError(404, "not_found");
    return json({ ok: true });
  } catch (e) {
    return fail(e);
  }
}
