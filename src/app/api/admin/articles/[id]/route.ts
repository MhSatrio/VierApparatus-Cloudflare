import { z } from "zod";
import { fail, json, readJson } from "@/lib/api";
import { HttpError, requireApi } from "@/lib/auth/guard";
import { can } from "@/lib/auth/permissions";
import { articleErrorToHttp, canEditArticle, loadEditable, loadViewable } from "@/lib/article-access";
import { pingIndexNow } from "@/lib/indexnow";
import { articleInputSchema, deleteArticle, updateArticle } from "@/lib/store/articles";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

const putBody = articleInputSchema.extend({ expectedVersion: z.number().int().positive().optional() });

export async function GET(req: Request, ctx: Ctx) {
  try {
    const session = await requireApi(req, { action: "articles.write" });
    const article = await loadViewable(session.user, (await ctx.params).id);
    return json({ ok: true, article, canEdit: canEditArticle(session.user, article) });
  } catch (e) {
    return fail(e);
  }
}

/** Save (manual save and autosave). `expectedVersion` makes a stale tab fail with 409 instead of overwriting newer work. */
export async function PUT(req: Request, ctx: Ctx) {
  try {
    const session = await requireApi(req, { mutation: true, action: "articles.write" });
    const current = await loadEditable(session.user, (await ctx.params).id);
    const { expectedVersion, ...input } = await readJson(req, putBody, 700_000);
    const owner = can(session.user, "articles.manage");
    try {
      const a = await updateArticle(
        current.id,
        { ...input, featured: owner ? input.featured : false, authorName: owner ? input.authorName : current.authorName },
        { id: session.user.id, name: session.user.name },
        expectedVersion,
      );
      if (current.status === "published") await pingIndexNow([...new Set([a.slug, current.slug])]);
      return json({ ok: true, version: a.version, slug: a.slug, updatedAt: a.updatedAt });
    } catch (e) {
      articleErrorToHttp(e);
    }
  } catch (e) {
    return fail(e);
  }
}

/** Permanent delete: owner only, and the caller must repeat the article's address as a confirmation. */
export async function DELETE(req: Request, ctx: Ctx) {
  try {
    const session = await requireApi(req, { mutation: true, action: "articles.manage" });
    const { confirmSlug } = await readJson(req, z.object({ confirmSlug: z.string().max(120) }), 1024);
    const current = await loadEditable(session.user, (await ctx.params).id);
    if (confirmSlug !== current.slug) throw new HttpError(400, "confirmation_mismatch");
    await deleteArticle(current.id, session.user.id);
    if (current.status === "published") await pingIndexNow([current.slug]);
    return json({ ok: true });
  } catch (e) {
    return fail(e);
  }
}
