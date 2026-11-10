import { z } from "zod";
import { fail, json, readJson } from "@/lib/api";
import { HttpError, requireApi } from "@/lib/auth/guard";
import { convertToDraft, getSubmission, reviewSubmission } from "@/lib/store/submissions";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const body = z.object({
  action: z.enum(["accept", "reject", "revision", "convert"]),
  note: z.string().max(2000).default(""),
});

/**
 * Owner-only review of a contributor proposal. "accept"/"reject"/"revision" only record the decision and a private note.
 * "convert" opens a DRAFT article from the proposal for the owner to edit. Nothing here creates an account or publishes.
 */
export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireApi(req, { mutation: true, action: "submissions.review" });
    const id = (await ctx.params).id;
    const { action, note } = await readJson(req, body, 4096);
    if (!(await getSubmission(id))) throw new HttpError(404, "not_found");
    if (action === "convert") {
      const r = await convertToDraft(id, session.user.id);
      return r.ok ? json({ ok: true, articleId: r.articleId }) : json({ ok: false, error: "validation", message: r.error }, 400);
    }
    const status = action === "accept" ? "accepted" : action === "reject" ? "rejected" : "revision";
    await reviewSubmission(id, status, note, session.user.id);
    return json({ ok: true });
  } catch (e) {
    return fail(e);
  }
}
