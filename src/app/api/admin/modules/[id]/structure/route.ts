import { z } from "zod";
import { fail, json, readJson } from "@/lib/api";
import { requireApi } from "@/lib/auth/guard";
import { moduleToHttp } from "@/lib/modules/http";
import { viewerOf } from "@/lib/planner-http";
import { addChapter, moveModule, reorderChapters } from "@/lib/store/module-structure";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const body = z.discriminatedUnion("op", [
  z.object({ op: z.literal("move"), subjectSlug: z.string().min(1).max(80), specializationSlug: z.string().min(1).max(80), levelSlug: z.string().min(1).max(80), discipline: z.string().max(120).optional() }),
  z.object({ op: z.literal("addChapter"), title: z.string().max(160) }),
  z.object({ op: z.literal("reorderChapters"), ids: z.array(z.string().min(1).max(80)).max(200) }),
]);

/** Owner only: move a module to another subject / specialization / level, add a chapter, or reorder its chapters. */
export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireApi(req, { mutation: true, action: "planner.manage" });
    const b = await readJson(req, body, 16 * 1024);
    const who = viewerOf(session.user);
    const { id } = await ctx.params;
    try {
      switch (b.op) {
        case "move":
          return json({ ok: true, ...(await moveModule(who, id, b)) });
        case "addChapter":
          return json({ ok: true, ...(await addChapter(who, id, b.title)) });
        case "reorderChapters":
          await reorderChapters(who, id, b.ids);
          return json({ ok: true });
      }
    } catch (e) {
      moduleToHttp(e);
    }
  } catch (e) {
    return fail(e);
  }
}
