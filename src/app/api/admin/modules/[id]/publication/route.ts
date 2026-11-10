import { z } from "zod";
import { fail, json, readJson } from "@/lib/api";
import { requireApi } from "@/lib/auth/guard";
import { moduleToHttp } from "@/lib/modules/http";
import { PUBLICATION_STATUSES } from "@/lib/modules/shared";
import { viewerOf } from "@/lib/planner-http";
import { setModulePublication } from "@/lib/store/modules";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Owner only: publish, take back to draft, or archive. Publishing is refused with the list of what is missing. */
export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireApi(req, { mutation: true, action: "planner.manage" });
    const { status } = await readJson(req, z.object({ status: z.enum(PUBLICATION_STATUSES) }), 1024);
    try {
      const r = await setModulePublication(viewerOf(session.user), (await ctx.params).id, status);
      if (!r.ok) return json({ ok: false, error: "not_ready", message: "This module is not ready to publish.", problems: r.problems }, 422);
      return json({ ok: true, status: r.module.status, version: r.module.version });
    } catch (e) {
      moduleToHttp(e);
    }
  } catch (e) {
    return fail(e);
  }
}
