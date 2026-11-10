import { z } from "zod";
import { fail, json, readJson } from "@/lib/api";
import { HttpError, requireApi } from "@/lib/auth/guard";
import { plannerToHttp, viewerOf } from "@/lib/planner-http";
import { deleteRecord, PRIORITIES, STATUSES, updateRecord } from "@/lib/store/planner";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

const patch = z.object({
  title: z.string().max(160).optional(),
  brief: z.string().max(4000).optional(),
  topicId: z.string().max(60).nullable().optional(),
  priority: z.enum(PRIORITIES).optional(),
  dueDate: z.string().nullable().optional(),
  notes: z.string().max(4000).optional(),
  status: z.enum(STATUSES).optional(),
  custom: z.record(z.string(), z.unknown()).optional(),
  researchNotes: z.string().max(8000).optional(),
  expectedVersion: z.number().int().positive().optional(),
});

/**
 * The owner edits anything; a contributor (with Collab access, on a task they can see) may only write research notes. The
 * store enforces both rules, so this holds even if the request is crafted by hand.
 */
export async function PATCH(req: Request, ctx: Ctx) {
  try {
    const session = await requireApi(req, { mutation: true, action: "collab.access" });
    const { expectedVersion, ...rest } = await readJson(req, patch, 24 * 1024);
    try {
      const r = await updateRecord(viewerOf(session.user), (await ctx.params).id, rest, expectedVersion);
      return json({ ok: true, version: r.version, updatedAt: r.updatedAt });
    } catch (e) {
      plannerToHttp(e);
    }
  } catch (e) {
    return fail(e);
  }
}

export async function DELETE(req: Request, ctx: Ctx) {
  try {
    const session = await requireApi(req, { mutation: true, action: "planner.manage", json: false });
    try {
      if (!(await deleteRecord(viewerOf(session.user), (await ctx.params).id))) throw new HttpError(404, "not_found");
      return json({ ok: true });
    } catch (e) {
      plannerToHttp(e);
    }
  } catch (e) {
    return fail(e);
  }
}
