import { z } from "zod";
import { fail, json, readJson } from "@/lib/api";
import { HttpError, requireApi } from "@/lib/auth/guard";
import { loadEditable } from "@/lib/article-access";
import { canEditModule } from "@/lib/store/modules";
import { viewerOf } from "@/lib/planner-http";
import { RefcheckError, setRefcheckStatus } from "@/lib/store/refcheck";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const body = z.object({
  entity: z.enum(["article", "module"]),
  id: z.string().min(1).max(100),
  status: z.enum(["pass", "fail"]),
});

/**
 * The status dropdown in the tables. "fail" blocks publishing; "pass" is accepted only when the recorded check passes the current
 * list (the server checks this, so a pass cannot be typed in).
 */
export async function POST(req: Request) {
  try {
    const { entity, id, status } = await readJson(req, body, 4096);
    const session = await requireApi(req, { mutation: true, action: entity === "article" ? "articles.write" : "modules.write" });
    if (entity === "article") {
      await loadEditable(session.user, id);
    } else if (!(await canEditModule(viewerOf(session.user), id))) {
      throw new HttpError(403, "forbidden", "You cannot edit this module.");
    }
    try {
      const next = await setRefcheckStatus(entity, id, status, session.user.id);
      return json({ ok: true, status: next });
    } catch (e) {
      if (e instanceof RefcheckError) throw new HttpError(e.code === "not_found" ? 404 : 422, e.code, e.message);
      throw e;
    }
  } catch (e) {
    return fail(e);
  }
}
