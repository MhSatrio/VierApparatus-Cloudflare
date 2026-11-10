import { z } from "zod";
import { fail, json, readJson } from "@/lib/api";
import { HttpError, requireApi } from "@/lib/auth/guard";
import { viewerOf } from "@/lib/planner-http";
import { logActivity } from "@/lib/store/activity";
import { deleteComment, editComment, getComment, setResolved } from "@/lib/store/comments";
import { getRecord } from "@/lib/store/planner";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

/** Re-checks that the caller can still see the comment's task (an unassigned contributor loses access immediately). */
async function loadAllowed(req: Request, ctx: Ctx, opts: { json: boolean }) {
  const session = await requireApi(req, { mutation: true, json: opts.json });
  const c = await getComment((await ctx.params).id);
  if (!c) throw new HttpError(404, "not_found");
  const owner = session.user.role === "owner";
  if (c.recordId && !(await getRecord(viewerOf(session.user), c.recordId))) throw new HttpError(404, "not_found");
  if (!c.recordId && !owner && c.authorId !== session.user.id) throw new HttpError(404, "not_found");
  return { session, c, owner };
}

const patch = z.object({ body: z.string().min(1).max(4000).optional(), resolved: z.boolean().optional() });

/** Edit your own comment; only the owner resolves or reopens a thread. */
export async function PATCH(req: Request, ctx: Ctx) {
  try {
    const { session, c, owner } = await loadAllowed(req, ctx, { json: true });
    const input = await readJson(req, patch, 12 * 1024);
    if (input.resolved !== undefined) {
      if (!owner) throw new HttpError(403, "forbidden");
      await setResolved(c.id, input.resolved, session.user.id);
      if (input.resolved) await logActivity({ id: session.user.id, name: session.user.name }, "comment.resolved", { recordId: c.recordId, articleId: c.articleId });
    }
    if (input.body !== undefined) {
      if (c.authorId !== session.user.id) throw new HttpError(403, "forbidden");
      if (!(await editComment(c.id, input.body))) throw new HttpError(400, "validation");
    }
    return json({ ok: true });
  } catch (e) {
    return fail(e);
  }
}

/** Delete your own comment (the owner can delete any). */
export async function DELETE(req: Request, ctx: Ctx) {
  try {
    const { session, c, owner } = await loadAllowed(req, ctx, { json: false });
    if (!owner && c.authorId !== session.user.id) throw new HttpError(403, "forbidden");
    await deleteComment(c.id);
    return json({ ok: true });
  } catch (e) {
    return fail(e);
  }
}
