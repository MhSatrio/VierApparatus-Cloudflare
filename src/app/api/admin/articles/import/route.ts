import { z } from "zod";
import { fail, json, readJson } from "@/lib/api";
import { requireApi } from "@/lib/auth/guard";
import { importMarkdown } from "@/lib/content/markdown";
import { docSchema } from "@/lib/content/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Markdown -> canonical document (nothing is saved). The editor then shows the result, lets the owner complete any
 * missing details and previews it with the same renderer as the public page before anything is stored.
 */
export async function POST(req: Request) {
  try {
    await requireApi(req, { mutation: true, action: "articles.write" });
    const { markdown } = await readJson(req, z.object({ markdown: z.string().min(1).max(400_000) }), 420_000);
    const result = importMarkdown(markdown);
    const valid = docSchema.safeParse(result.doc);
    if (!valid.success) return json({ ok: false, error: "validation", message: `The Markdown could not be converted: ${valid.error.issues[0]?.message}` }, 422);
    return json({ ok: true, ...result });
  } catch (e) {
    return fail(e);
  }
}
