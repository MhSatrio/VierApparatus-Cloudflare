import { z } from "zod";
import { fail, json, readJson } from "@/lib/api";
import { HttpError, requireApi } from "@/lib/auth/guard";
import { loadEditable } from "@/lib/article-access";
import { canEditModule, getModuleEdit } from "@/lib/store/modules";
import { viewerOf } from "@/lib/planner-http";
import { RefcheckError, saveRefcheck } from "@/lib/store/refcheck";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const body = z.object({
  entity: z.enum(["article", "module"]),
  id: z.string().min(1).max(100),
  /** The APA references, pasted: one per line, or separated by blank lines. */
  text: z.string().min(1).max(150_000),
});

/**
 * Checks pasted references against Crossref and records the result on an article or a module. Anyone who can edit the item may
 * run the check; the server records the result, so nothing can be marked as checked without it.
 */
export async function POST(req: Request) {
  try {
    const { entity, id, text } = await readJson(req, body, 200_000);
    const session = await requireApi(req, { mutation: true, action: entity === "article" ? "articles.write" : "modules.write" });
    if (entity === "article") {
      await loadEditable(session.user, id);
    } else {
      const v = viewerOf(session.user);
      if (!(await canEditModule(v, id))) throw new HttpError(403, "forbidden", "You cannot edit this module.");
      const cur = await getModuleEdit(v, id);
      if (!cur) throw new HttpError(404, "not_found", "Module not found.");
      if (!cur.canWrite) throw new HttpError(403, "forbidden", cur.locked ?? "This module is locked right now.");
    }
    try {
      const r = await saveRefcheck(entity, id, text, session.user.id);
      return json({ ok: true, status: r.status, passed: r.passed, items: r.items, refs: r.refs, checkedAt: r.checkedAt });
    } catch (e) {
      if (e instanceof RefcheckError) throw new HttpError(e.code === "not_found" ? 404 : 400, e.code, e.message);
      throw e;
    }
  } catch (e) {
    return fail(e);
  }
}
