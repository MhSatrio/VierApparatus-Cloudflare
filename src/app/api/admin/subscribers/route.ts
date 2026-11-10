import { fail, json } from "@/lib/api";
import { requireApi } from "@/lib/auth/guard";
import { listSubscribers, SUB_STATUS, type SubStatus } from "@/lib/store/subscribers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Owner only: the subscriber table (search, status, interest, sort, paging). */
export async function GET(req: Request) {
  try {
    await requireApi(req, { action: "newsletter.manage" });
    const sp = new URL(req.url).searchParams;
    const status = SUB_STATUS.find((x) => x === sp.get("status")) as SubStatus | undefined;
    const sort = (["email", "name", "status", "created"] as const).find((x) => x === sp.get("sort")) ?? "created";
    const page = Math.max(1, Number(sp.get("page")) || 1);
    const limit = 100;
    const r = await listSubscribers({
      q: sp.get("q") ?? undefined,
      status,
      interest: (sp.get("interest") ?? "").slice(0, 60) || undefined,
      sort,
      dir: sp.get("dir") === "asc" ? "asc" : "desc",
      limit,
      offset: (page - 1) * limit,
    });
    return json({ ok: true, items: r.items, total: r.total, counts: r.counts, page, pageCount: Math.max(1, Math.ceil(r.total / limit)) });
  } catch (e) {
    return fail(e);
  }
}
