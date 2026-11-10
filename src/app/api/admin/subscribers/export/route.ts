import { fail } from "@/lib/api";
import { requireApi } from "@/lib/auth/guard";
import { exportSubscribersCsv } from "@/lib/store/subscribers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Owner only: the whole subscriber list as CSV. Formula-like cells are neutralised, so the file is safe to open in a spreadsheet. */
export async function GET(req: Request) {
  try {
    await requireApi(req, { action: "newsletter.manage" });
    const csv = await exportSubscribersCsv();
    return new Response("﻿" + csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="vierapparatus-subscribers-${new Date().toISOString().slice(0, 10)}.csv"`,
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (e) {
    return fail(e);
  }
}
