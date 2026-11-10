import { fail } from "@/lib/api";
import { requireApi } from "@/lib/auth/guard";
import { exportCsv, rangeFromDays, TABLE_COLUMNS, type TableColumn } from "@/lib/store/analytics";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** CSV of the filtered visit table (owner only). Contains no IP addresses; formula-looking text is neutralised. */
export async function GET(req: Request) {
  try {
    await requireApi(req, { action: "analytics.view" });
    const u = new URL(req.url);
    const range = rangeFromDays(u.searchParams.get("from"), u.searchParams.get("to"));
    const cols = (u.searchParams.get("cols") ?? "").split(",").filter((c): c is TableColumn => (TABLE_COLUMNS as readonly string[]).includes(c));
    const csv = await exportCsv(
      { ...range, q: u.searchParams.get("q") ?? undefined, country: u.searchParams.get("country") ?? undefined, device: u.searchParams.get("device") ?? undefined, source: u.searchParams.get("source") ?? undefined },
      cols.length ? cols : TABLE_COLUMNS,
    );
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="vierapparatus-visits-${range.fromDay}_${range.toDay}.csv"`,
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (e) {
    return fail(e);
  }
}
