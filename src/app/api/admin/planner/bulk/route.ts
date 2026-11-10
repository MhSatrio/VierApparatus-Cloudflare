import { fail, json, readJson } from "@/lib/api";
import { requireApi } from "@/lib/auth/guard";
import { plannerToHttp, viewerOf } from "@/lib/planner-http";
import { bulkApply, bulkInput } from "@/lib/store/planner";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Owner only. Inline cell edits and pasted spreadsheet blocks (up to 100 tasks) in one request and one database round trip.
 * Every value is validated again here; the browser's own parsing is only a preview.
 */
export async function POST(req: Request) {
  try {
    const session = await requireApi(req, { mutation: true, action: "planner.manage" });
    const input = await readJson(req, bulkInput, 256 * 1024);
    try {
      return json({ ok: true, ...(await bulkApply(viewerOf(session.user), input)) });
    } catch (e) {
      plannerToHttp(e);
    }
  } catch (e) {
    return fail(e);
  }
}
