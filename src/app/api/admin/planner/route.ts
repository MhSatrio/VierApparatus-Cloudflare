import { fail, json, readJson } from "@/lib/api";
import { requireApi } from "@/lib/auth/guard";
import { plannerToHttp, viewerOf } from "@/lib/planner-http";
import { createRecord, recordInput } from "@/lib/store/planner";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Owner only: create a planner record (a planned article / collaborative task). */
export async function POST(req: Request) {
  try {
    const session = await requireApi(req, { mutation: true, action: "planner.manage" });
    const input = await readJson(req, recordInput, 16 * 1024);
    try {
      const r = await createRecord(viewerOf(session.user), input);
      return json({ ok: true, id: r.id, ref: r.ref });
    } catch (e) {
      plannerToHttp(e);
    }
  } catch (e) {
    return fail(e);
  }
}
