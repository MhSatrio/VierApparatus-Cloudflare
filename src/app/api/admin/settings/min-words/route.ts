import { z } from "zod";
import { fail, json, readJson } from "@/lib/api";
import { requireApi } from "@/lib/auth/guard";
import { getMinWords, MAX_MIN_WORDS, setMinWords } from "@/lib/store/site-settings";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Owner only: the minimum word count for publication (0 switches the rule off). */
export async function GET(req: Request) {
  try {
    await requireApi(req, { action: "settings.manage" });
    return json({ ok: true, minWords: await getMinWords() });
  } catch (e) {
    return fail(e);
  }
}

export async function PUT(req: Request) {
  try {
    await requireApi(req, { mutation: true, action: "settings.manage" });
    const { minWords } = await readJson(req, z.object({ minWords: z.number().int().min(0).max(MAX_MIN_WORDS) }), 1024);
    await setMinWords(minWords);
    return json({ ok: true, minWords });
  } catch (e) {
    return fail(e);
  }
}
