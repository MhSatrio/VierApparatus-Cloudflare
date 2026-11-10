import { z } from "zod";
import { fail, json, readJson } from "@/lib/api";
import { requireApi } from "@/lib/auth/guard";
import { can } from "@/lib/auth/permissions";
import { articleErrorToHttp } from "@/lib/article-access";
import { articleInputSchema, createArticle } from "@/lib/store/articles";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 700_000;

/** Create a draft. Contributors need "articles.write"; whatever they send, the article is theirs, a draft, and never featured. */
export async function POST(req: Request) {
  try {
    const session = await requireApi(req, { mutation: true, action: "articles.write" });
    const input = await readJson(req, articleInputSchema, MAX_BYTES);
    const owner = can(session.user, "articles.manage");
    try {
      const a = await createArticle(
        { ...input, featured: owner ? input.featured : false, authorName: owner ? input.authorName : session.user.name },
        { id: session.user.id, name: session.user.name },
      );
      return json({ ok: true, id: a.id, slug: a.slug, version: a.version });
    } catch (e) {
      if (e instanceof z.ZodError) return json({ ok: false, error: "validation", message: e.issues[0]?.message }, 400);
      articleErrorToHttp(e);
    }
  } catch (e) {
    return fail(e);
  }
}
