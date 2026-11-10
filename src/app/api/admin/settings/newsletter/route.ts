import { z } from "zod";
import { fail, json, readJson } from "@/lib/api";
import { requireApi } from "@/lib/auth/guard";
import { getPopupSettings, setPopupSettings } from "@/lib/store/newsletter-settings";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Owner only: the newsletter popup switch and its wording. */
export async function GET(req: Request) {
  try {
    await requireApi(req, { action: "newsletter.manage" });
    return json({ ok: true, popup: await getPopupSettings() });
  } catch (e) {
    return fail(e);
  }
}

export async function PUT(req: Request) {
  try {
    await requireApi(req, { mutation: true, action: "newsletter.manage" });
    // Same limits as the store, checked here so the owner gets a readable message instead of a generic server error.
    const input = await readJson(
      req,
      z.object({
        enabled: z.boolean(),
        title: z
          .string()
          .max(100, "at most 100 characters")
          .refine((t) => t.trim().length >= 4, "at least 4 characters"),
        message: z
          .string()
          .max(400, "at most 400 characters")
          .refine((m) => m.trim().length >= 10, "at least 10 characters"),
      }),
      4096,
    );
    await setPopupSettings(input);
    return json({ ok: true, popup: await getPopupSettings() });
  } catch (e) {
    return fail(e);
  }
}
