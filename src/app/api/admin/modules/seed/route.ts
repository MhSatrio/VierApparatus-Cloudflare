import { fail, json } from "@/lib/api";
import { requireApi } from "@/lib/auth/guard";
import { ensureCurriculum } from "@/lib/store/modules";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Owner only: installs the subjects, levels, the Biology curriculum and a Planner task for each module. Safe to repeat, it adds
 * only what is missing. (From a computer, `npm run modules:seed` does the same without a web request.)
 */
export async function POST(req: Request) {
  try {
    const session = await requireApi(req, { mutation: true, action: "planner.manage", json: false });
    const made = await ensureCurriculum({ id: session.user.id, name: session.user.name });
    return json({ ok: true, ...made });
  } catch (e) {
    return fail(e);
  }
}
