import { fail } from "@/lib/api";
import { requireApi } from "@/lib/auth/guard";
import { plannerToHttp, viewerOf } from "@/lib/planner-http";
import { exportRecordsCsv } from "@/lib/store/planner";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** CSV of every planner record (owner only). Formula-looking text is neutralised so it is safe to open in a spreadsheet. */
export async function GET(req: Request) {
  try {
    const session = await requireApi(req, { action: "planner.manage" });
    try {
      const csv = await exportRecordsCsv(viewerOf(session.user));
      return new Response(csv, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="vierapparatus-planner-${new Date().toISOString().slice(0, 10)}.csv"`,
          "Cache-Control": "no-store",
          "X-Content-Type-Options": "nosniff",
        },
      });
    } catch (e) {
      plannerToHttp(e);
    }
  } catch (e) {
    return fail(e);
  }
}
