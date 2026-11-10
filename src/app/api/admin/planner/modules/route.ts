import { fail, json, readJson } from "@/lib/api";
import { requireApi } from "@/lib/auth/guard";
import { moduleToHttp } from "@/lib/modules/http";
import { viewerOf } from "@/lib/planner-http";
import { createModuleTask, moduleTaskInput } from "@/lib/store/modules";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Owner only: plan a learning module (or one chapter of a module) as a Planner task. Missing disciplines, modules and chapters are created. */
export async function POST(req: Request) {
  try {
    const session = await requireApi(req, { mutation: true, action: "planner.manage" });
    const input = await readJson(req, moduleTaskInput, 64 * 1024);
    try {
      const r = await createModuleTask(viewerOf(session.user), input);
      return json({ ok: true, id: r.id, ref: r.ref, moduleId: r.module?.nodeId });
    } catch (e) {
      moduleToHttp(e);
    }
  } catch (e) {
    return fail(e);
  }
}
