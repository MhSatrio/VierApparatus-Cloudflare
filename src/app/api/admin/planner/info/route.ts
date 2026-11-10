import { z } from "zod";
import { fail, json, readJson } from "@/lib/api";
import { requireApi } from "@/lib/auth/guard";
import { plannerToHttp, viewerOf } from "@/lib/planner-http";
import { setInfo } from "@/lib/store/planner";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** The information box at the top of the planner: owner only (contributors can read it, never change it). */
export async function PUT(req: Request) {
  try {
    const session = await requireApi(req, { mutation: true, action: "planner.manage" });
    const { text } = await readJson(req, z.object({ text: z.string().max(4000) }), 8 * 1024);
    try {
      await setInfo(viewerOf(session.user), text);
      return json({ ok: true });
    } catch (e) {
      plannerToHttp(e);
    }
  } catch (e) {
    return fail(e);
  }
}
