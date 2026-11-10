import { z } from "zod";
import { fail, json, readJson } from "@/lib/api";
import { HttpError, requireApi } from "@/lib/auth/guard";
import { plannerToHttp, viewerOf } from "@/lib/planner-http";
import { deleteView, saveView } from "@/lib/store/planner";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const create = z.object({
  name: z.string().max(60),
  kind: z.enum(["table", "kanban", "ticket"]),
  scope: z.enum(["planner", "collab"]),
  config: z.unknown(),
  global: z.boolean().default(false),
});

/**
 * Saved views. The owner can save a GLOBAL view (everyone sees it, only the owner changes it); everyone else saves a private
 * one. A contributor sending global=true simply gets a private view: the store ignores the flag for them.
 */
export async function POST(req: Request) {
  try {
    const session = await requireApi(req, { mutation: true, action: "collab.access" });
    const input = await readJson(req, create, 16 * 1024);
    try {
      return json({ ok: true, view: await saveView(viewerOf(session.user), input) });
    } catch (e) {
      if (e instanceof z.ZodError) throw new HttpError(400, "validation", e.issues[0]?.message ?? "Invalid view");
      plannerToHttp(e);
    }
  } catch (e) {
    return fail(e);
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await requireApi(req, { mutation: true, action: "collab.access" });
    const { id } = await readJson(req, z.object({ id: z.string().max(60) }), 1024);
    try {
      if (!(await deleteView(viewerOf(session.user), id))) throw new HttpError(404, "not_found");
      return json({ ok: true });
    } catch (e) {
      plannerToHttp(e);
    }
  } catch (e) {
    return fail(e);
  }
}
