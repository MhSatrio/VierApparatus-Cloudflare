import { fail, json, readJson } from "@/lib/api";
import { HttpError, requireApi } from "@/lib/auth/guard";
import { MAX_DOC_BYTES } from "@/lib/content/schema";
import { moduleToHttp } from "@/lib/modules/http";
import { viewerOf } from "@/lib/planner-http";
import { getModuleEdit, moduleSaveInput, saveModule } from "@/lib/store/modules";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

/** A module's text and details for its editor. The owner, or a contributor assigned to it (or to the module above it), may read it. */
export async function GET(req: Request, ctx: Ctx) {
  try {
    const session = await requireApi(req, { action: "modules.write" });
    const r = await getModuleEdit(viewerOf(session.user), (await ctx.params).id);
    if (!r) throw new HttpError(404, "not_found");
    return json({ ok: true, ...r });
  } catch (e) {
    return fail(e);
  }
}

/** Save the text and details. The store decides who may write, whether a review has locked it, and rejects a stale version. */
export async function PUT(req: Request, ctx: Ctx) {
  try {
    const session = await requireApi(req, { mutation: true, action: "modules.write" });
    const input = await readJson(req, moduleSaveInput, MAX_DOC_BYTES + 100_000);
    try {
      const m = await saveModule(viewerOf(session.user), (await ctx.params).id, input);
      return json({ ok: true, version: m.version, updatedAt: m.updatedAt, wordCount: m.wordCount, title: m.title });
    } catch (e) {
      moduleToHttp(e);
    }
  } catch (e) {
    return fail(e);
  }
}
