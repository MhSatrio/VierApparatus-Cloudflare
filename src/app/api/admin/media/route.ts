import { fail, json } from "@/lib/api";
import { HttpError, requireApi } from "@/lib/auth/guard";
import { can } from "@/lib/auth/permissions";
import { listMedia, MAX_IMAGE_BYTES, saveImage } from "@/lib/store/media";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Library of uploaded images. A contributor only sees what they uploaded themselves. */
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
 * Older upload endpoint, kept so nothing that still calls it breaks. It stores in the database only. The admin screens now use
 * /api/admin/images, which converts to WebP and stores in R2 (src/lib/images/). New code should not use this one.
 */
export async function POST(req: Request) {
  try {
    const session = await requireApi(req, { mutation: true, action: "media.upload", json: false });
    if (Number(req.headers.get("content-length") ?? 0) > MAX_IMAGE_BYTES + 20_000) throw new HttpError(413, "payload_too_large");
    let form: FormData;
    try {
      form = await req.formData();
    } catch {
      throw new HttpError(400, "bad_form");
    }
    const file = form.get("file");
    if (!(file instanceof File)) throw new HttpError(400, "no_file");
    const r = await saveImage(new Uint8Array(await file.arrayBuffer()), { userId: session.user.id });
    if (!r.ok) return json({ ok: false, error: "validation", message: r.error }, 400);
    return json({ ok: true, image: r.image });
  } catch (e) {
    return fail(e);
  }
}
