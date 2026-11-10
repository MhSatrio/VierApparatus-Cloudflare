import { z } from "zod";
import { fail, json, readJson } from "@/lib/api";
import { requireApi } from "@/lib/auth/guard";
import { listCategories } from "@/lib/store/categories";
import { IMPORT_MAX_ROWS, importSubscribers } from "@/lib/store/subscribers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const importInput = z.object({
  /** The owner confirms the people agreed to be contacted. Without this the import is refused. */
  consentConfirmed: z.literal(true, { message: "Confirm that these people agreed to receive your e-mails." }),
  rows: z
    .array(z.object({ email: z.string().max(320), name: z.string().max(200).optional(), interests: z.array(z.string().max(120)).max(20).optional() }))
    .min(1)
    .max(IMPORT_MAX_ROWS),
});

/** Owner only: import people from a CSV (checked in the browser, validated again here). Existing addresses are never changed. */
export async function POST(req: Request) {
  try {
    await requireApi(req, { mutation: true, action: "newsletter.manage" });
    const input = await readJson(req, importInput, 200 * 1024);
    // Row count is already capped by the schema above; database errors go through fail() and are not shown to the client.
    const allowed = (await listCategories()).map((c) => c.name);
    return json({ ok: true, ...(await importSubscribers(input.rows, allowed)) });
  } catch (e) {
    return fail(e);
  }
}
