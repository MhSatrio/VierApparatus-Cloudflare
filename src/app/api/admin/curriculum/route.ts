import { z } from "zod";
import { fail, json, readJson } from "@/lib/api";
import { requireApi } from "@/lib/auth/guard";
import { moduleToHttp } from "@/lib/modules/http";
import { viewerOf } from "@/lib/planner-http";
import { addSharedModule, deleteLevelNode, deleteSubjectNode, getAdminCurriculum, listSharedModules, removeSharedModule, reorder, saveLevelNode, saveSubjectNode, searchModules } from "@/lib/store/curriculum";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Owner only. The whole shape of the learning platform (subjects, specializations, levels), or with ?q= a module search, or ?shared=<levelId> the shared modules of a level. */
export async function GET(req: Request) {
  try {
    await requireApi(req, { action: "planner.manage" });
    const url = new URL(req.url);
    const q = url.searchParams.get("q");
    if (q !== null) return json({ ok: true, items: await searchModules(q, url.searchParams.get("exclude") ?? undefined) });
    const shared = url.searchParams.get("shared");
    if (shared) return json({ ok: true, items: await listSharedModules(shared) });
    return json({ ok: true, subjects: await getAdminCurriculum() });
  } catch (e) {
    return fail(e);
  }
}

const id = z.string().min(1).max(80);
const nodeBody = z.object({
  id: id.optional(),
  subjectId: id.optional(),
  name: z.string(),
  slug: z.string().optional(),
  tagline: z.string().optional(),
  description: z.string().optional(),
  published: z.boolean().optional(),
  archived: z.boolean().optional(),
  coverUrl: z.string().optional(),
  coverThumbUrl: z.string().optional(),
});
const body = z.discriminatedUnion("op", [
  z.object({ op: z.literal("save"), node: nodeBody }),
  z.object({ op: z.literal("delete"), id }),
  z.object({ op: z.literal("saveLevel"), level: z.object({ id: id.optional(), specializationId: id, name: z.string(), slug: z.string().optional(), description: z.string().optional() }) }),
  z.object({ op: z.literal("deleteLevel"), id }),
  z.object({ op: z.literal("order"), kind: z.enum(["subjects", "levels"]), ids: z.array(id).max(500) }),
  z.object({ op: z.literal("share"), levelId: id, moduleId: id }),
  z.object({ op: z.literal("unshare"), linkId: id }),
]);

/** Owner only. Every change to the curriculum's shape goes through here; the store enforces the rules and writes the redirects. */
export async function POST(req: Request) {
  try {
    const session = await requireApi(req, { mutation: true, action: "planner.manage" });
    const b = await readJson(req, body, 64 * 1024);
    const who = viewerOf(session.user);
    try {
      switch (b.op) {
        case "save":
          return json({ ok: true, ...(await saveSubjectNode(who, b.node)) });
        case "delete":
          await deleteSubjectNode(who, b.id);
          return json({ ok: true });
        case "saveLevel":
          return json({ ok: true, ...(await saveLevelNode(who, b.level)) });
        case "deleteLevel":
          await deleteLevelNode(who, b.id);
          return json({ ok: true });
        case "order":
          await reorder(who, b.kind, b.ids);
          return json({ ok: true });
        case "share":
          return json({ ok: true, ...(await addSharedModule(who, b.levelId, b.moduleId)) });
        case "unshare":
          await removeSharedModule(who, b.linkId);
          return json({ ok: true });
      }
    } catch (e) {
      moduleToHttp(e);
    }
  } catch (e) {
    return fail(e);
  }
}
