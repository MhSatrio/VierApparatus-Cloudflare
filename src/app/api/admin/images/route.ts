import { fail, json } from "@/lib/api";
import { HttpError, requireApi } from "@/lib/auth/guard";
import { can } from "@/lib/auth/permissions";
import { isImageKind, listImages, MAX_THUMB_BYTES, storeImage } from "@/lib/images/assets";
import { rateLimit } from "@/lib/rate-limit";
import { MAX_IMAGE_BYTES } from "@/lib/store/media";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** The image library. A contributor only sees what they uploaded themselves. */
export async function GET(req: Request) {
  try {
    const session = await requireApi(req, { action: "media.upload" });
    const kind = new URL(req.url).searchParams.get("kind");
    const items = await listImages({
      userId: can(session.user, "articles.manage") ? undefined : session.user.id,
      kind: isImageKind(kind) ? kind : undefined,
      limit: 60,
    });
    return json({ ok: true, items });
  } catch (e) {
    return fail(e);
  }
}

/**
 * Multipart upload: `file` (WebP, already converted by the uploader), optional `thumb` (WebP thumbnail), `kind`
 * (articles | modules | products | sponsors), `name` (the original file name, kept as metadata) and `alt`.
 */
export async function POST(req: Request) {
  try {
    const session = await requireApi(req, { mutation: true, action: "media.upload", json: false });
    if (Number(req.headers.get("content-length") ?? 0) > MAX_IMAGE_BYTES + MAX_THUMB_BYTES + 60_000) throw new HttpError(413, "payload_too_large");
    const limit = await rateLimit(`images:${session.user.id}`, 120, 3600);
    if (!limit.ok) return json({ ok: false, error: "rate_limited", message: "Too many uploads. Please wait a little and try again." }, 429);

    let form: FormData;
    try {
      form = await req.formData();
    } catch {
      throw new HttpError(400, "bad_form");
    }
    const file = form.get("file");
    if (!(file instanceof File)) throw new HttpError(400, "no_file");
    const thumb = form.get("thumb");
    const kind = String(form.get("kind") ?? "articles");
    if (!isImageKind(kind)) throw new HttpError(400, "validation", "kind: choose articles, modules, products or sponsors");

    const r = await storeImage({
      main: new Uint8Array(await file.arrayBuffer()),
      thumb: thumb instanceof File ? new Uint8Array(await thumb.arrayBuffer()) : null,
      kind,
      originalName: String(form.get("name") ?? file.name ?? ""),
      alt: String(form.get("alt") ?? ""),
      userId: session.user.id,
    });
    if (!r.ok) return json({ ok: false, error: "validation", message: r.error }, 400);
    return json({ ok: true, image: r.image, duplicate: r.duplicate });
  } catch (e) {
    return fail(e);
  }
}
