import { fail, json } from "@/lib/api";
import { requireApi } from "@/lib/auth/guard";
import { can } from "@/lib/auth/permissions";
import { listMedia } from "@/lib/store/media";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Library of images stored before the R2 service (read-only, for older articles). A contributor only sees what they uploaded. */
export async function GET(req: Request) {
  try {
    const session = await requireApi(req, { action: "media.upload" });
    const items = await listMedia({ userId: can(session.user, "articles.manage") ? undefined : session.user.id, limit: 60 });
    return json({ ok: true, items });
  } catch (e) {
    return fail(e);
  }
}

/**
 * Retired. Images are stored in Cloudflare R2 only, through /api/admin/images, which converts them to WebP. Nothing is written to
 * the database any more.
 */
export async function POST(req: Request) {
  void req;
  return json({ ok: false, error: "gone", message: "This upload endpoint is retired. Images are stored in Cloudflare R2 through /api/admin/images." }, 410);
}
