import { z } from "zod";
import { fail, json, readJson } from "@/lib/api";
import { requireApi } from "@/lib/auth/guard";
import { docSchema } from "@/lib/content/schema";
import { importModuleMarkdown } from "@/lib/content/module-import";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Module Markdown -> the fields of the module editor (nothing is saved). The editor shows the result, the person reviews and
 * fixes it, and only then saves. Anyone who can write modules can use it; it touches no data.
 */
export async function POST(req: Request) {
  try {
    await requireApi(req, { mutation: true, action: "modules.write" });
    const { markdown } = await readJson(req, z.object({ markdown: z.string().min(1).max(400_000) }), 420_000);
    const result = importModuleMarkdown(markdown);
    const valid = docSchema.safeParse(result.doc);
    if (!valid.success) return json({ ok: false, error: "validation", message: `The Markdown could not be converted: ${valid.error.issues[0]?.message}` }, 422);
    return json({ ok: true, ...result });
  } catch (e) {
    return fail(e);
  }
}
