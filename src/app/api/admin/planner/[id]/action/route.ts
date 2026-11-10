import { z } from "zod";
import { fail, json, readJson } from "@/lib/api";
import { requireApi } from "@/lib/auth/guard";
import { plannerToHttp, viewerOf } from "@/lib/planner-http";
import { assignRecord, createDraftForRecord, linkArticle, shareRecord, transition } from "@/lib/store/planner";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const body = z.discriminatedUnion("action", [
  z.object({ action: z.literal("assign"), userId: z.string().max(60).nullable() }),
  z.object({ action: z.literal("share"), userIds: z.array(z.string().max(60)).max(20) }),
  z.object({ action: z.literal("create_draft") }),
  z.object({ action: z.literal("link_article"), articleId: z.string().max(60).nullable() }),
  z.object({
    action: z.literal("transition"),
    transition: z.enum(["start", "submit", "withdraw", "request_revision", "approve", "complete", "reopen", "archive"]),
    note: z.string().max(2000).default(""),
  }),
]);

/**
 * One endpoint for everything that changes a task's relationships or workflow state. assign / share / create_draft /
 * link_article are owner-only; transitions are checked per kind inside the store (contributors: start, submit, withdraw on their own task).
 */
export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireApi(req, { mutation: true, action: "collab.access" });
    const input = await readJson(req, body, 8 * 1024);
    const viewer = viewerOf(session.user);
    const id = (await ctx.params).id;
    try {
      switch (input.action) {
        case "assign":
          return json({ ok: true, record: pick(await assignRecord(viewer, id, input.userId)) });
        case "share":
          return json({ ok: true, record: pick(await shareRecord(viewer, id, input.userIds)) });
        case "create_draft":
          return json({ ok: true, ...(await createDraftForRecord(viewer, id)) });
        case "link_article":
          return json({ ok: true, record: pick(await linkArticle(viewer, id, input.articleId)) });
        case "transition":
          return json({ ok: true, record: pick(await transition(viewer, id, input.transition, input.note)) });
      }
    } catch (e) {
      plannerToHttp(e);
    }
  } catch (e) {
    return fail(e);
  }
}

const pick = (r: { id: string; status: string; version: number; assignedTo: string | null; articleId: string | null; reviewStatus: string }) => ({
  id: r.id,
  status: r.status,
  version: r.version,
  assignedTo: r.assignedTo,
  articleId: r.articleId,
  reviewStatus: r.reviewStatus,
});
