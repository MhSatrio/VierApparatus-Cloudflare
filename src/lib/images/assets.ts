import { conn } from "../db/client";
import { newId, sha256Hex } from "../crypto";
import { audit, n, nowIso, s, sn, type Row } from "../store/util";
import { deleteMedia, imageInfo, MAX_IMAGE_BYTES, MAX_IMAGE_SIDE, saveImage } from "../store/media";
import { deleteObject, imageBackend, publicImageUrl, putObject } from "./storage";
import { isImageUsed } from "./usage";

/**
 * The one upload service for every kind of content image (articles today; modules, products and sponsors use the same code).
 *
 * The browser has already converted the picture to WebP and made a thumbnail (see components/admin/editor/imageResize.ts):
 * a Cloudflare Worker cannot run an image encoder, and doing it on the administrator's own device keeps the Worker light.
 * This service does not trust that: it reads the bytes itself, accepts only WebP, re-checks size and dimensions, then stores
 * the file under a safe generated key, and records the metadata.
 */

export const IMAGE_KINDS = ["articles", "modules", "products", "sponsors"] as const;
export type ImageKind = (typeof IMAGE_KINDS)[number];
export const isImageKind = (v: unknown): v is ImageKind => typeof v === "string" && (IMAGE_KINDS as readonly string[]).includes(v);

export const MAX_THUMB_BYTES = 250_000;
export const MAX_THUMB_SIDE = 800;

export type ImageAsset = {
  id: string;
  kind: ImageKind;
  url: string;
  thumbUrl: string | null;
  width: number;
  height: number;
  size: number;
  storage: "r2" | "database";
  originalName: string;
  alt: string;
  createdAt: string;
  /** true for images uploaded before the upload service existed (served from /media/...). */
  legacy: boolean;
};

export type StoreResult = { ok: true; image: ImageAsset; duplicate: boolean } | { ok: false; error: string };

const toAsset = (r: Row): ImageAsset => ({
  id: s(r.id),
  kind: s(r.kind) as ImageKind,
  url: s(r.url),
  thumbUrl: sn(r.thumb_url),
  width: n(r.width),
  height: n(r.height),
  size: n(r.size),
  storage: s(r.storage) as ImageAsset["storage"],
  originalName: s(r.original_name),
  alt: s(r.alt),
  createdAt: s(r.created_at),
  legacy: false,
});

function checkWebp(bytes: Uint8Array, maxBytes: number, maxSide: number, label: string): { ok: true; width: number; height: number } | { ok: false; error: string } {
  if (bytes.length === 0) return { ok: false, error: `The ${label} is empty.` };
  if (bytes.length > maxBytes) return { ok: false, error: `The ${label} must be smaller than ${(maxBytes / 1_000_000).toFixed(2)} MB.` };
  const info = imageInfo(bytes);
  if (!info || info.mime !== "image/webp") return { ok: false, error: `The ${label} must be a WebP image. The uploader converts pictures automatically; this file was not WebP.` };
  if (info.width < 1 || info.height < 1 || info.width > maxSide || info.height > maxSide) return { ok: false, error: `The ${label} dimensions must be between 1 and ${maxSide} pixels.` };
  return { ok: true, width: info.width, height: info.height };
}

const cleanName = (name: string | undefined) => (name ?? "").replace(/[\u0000-\u001F\u007F]/g, " ").trim().slice(0, 200);

export async function storeImage(input: { main: Uint8Array; thumb?: Uint8Array | null; kind: ImageKind; originalName?: string; alt?: string; userId: string | null }): Promise<StoreResult> {
  const main = checkWebp(input.main, MAX_IMAGE_BYTES, MAX_IMAGE_SIDE, "image");
  if (!main.ok) return main;
  let thumbSize: { width: number; height: number } | null = null;
  if (input.thumb && input.thumb.length) {
    const t = checkWebp(input.thumb, MAX_THUMB_BYTES, MAX_THUMB_SIDE, "thumbnail");
    if (!t.ok) return t;
    thumbSize = t;
  }

  const db = await conn();
  const sha = await sha256Hex(input.main);
  const existing = (await db.execute({ sql: "SELECT * FROM image_assets WHERE sha256 = ?", args: [sha] })).rows[0];
  if (existing) return { ok: true, image: toAsset(existing), duplicate: true };

  const id = newId("i_");
  const created = nowIso();
  const backend = imageBackend();
  const written: string[] = [];
  let row: { storage: "r2" | "database"; key: string; url: string; thumbKey: string | null; thumbUrl: string | null };

  try {
    if (backend === "database") {
      // Nothing configured (local development): the older database store, so uploads keep working end to end.
      const saved = await saveImage(input.main, { alt: input.alt, userId: input.userId });
      if (!saved.ok) return saved;
      row = { storage: "database", key: saved.image.id, url: saved.image.url, thumbKey: null, thumbUrl: null };
    } else {
      const ym = created.slice(0, 7).replace("-", "/");
      const key = `${input.kind}/${ym}/${id}.webp`;
      const thumbKey = thumbSize ? `thumbnails/${input.kind}/${ym}/${id}.webp` : null;
      await putObject(key, input.main);
      written.push(key);
      if (thumbKey && input.thumb) {
        await putObject(thumbKey, input.thumb);
        written.push(thumbKey);
      }
      row = { storage: "r2", key, url: publicImageUrl(key), thumbKey, thumbUrl: thumbKey ? publicImageUrl(thumbKey) : null };
    }
    await db.execute({
      sql: `INSERT INTO image_assets(id, kind, storage, object_key, url, thumb_key, thumb_url, mime, size, width, height, thumb_width, thumb_height, thumb_size, sha256, original_name, alt, created_by, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, 'image/webp', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        id, input.kind, row.storage, row.key, row.url, row.thumbKey, row.thumbUrl, input.main.length, main.width, main.height,
        thumbSize?.width ?? null, thumbSize?.height ?? null, thumbSize && input.thumb ? input.thumb.length : null,
        sha, cleanName(input.originalName), (input.alt ?? "").slice(0, 300), input.userId, created,
      ],
    });
  } catch (e) {
    // Do not leave orphaned files behind when a later step fails.
    await Promise.all(written.map((k) => deleteObject(k).catch(() => undefined)));
    console.error("[images] upload failed:", e instanceof Error ? e.message : "error");
    return { ok: false, error: "The image could not be stored. Please try again." };
  }
  await audit(input.userId, "image.upload", id);
  const saved = (await db.execute({ sql: "SELECT * FROM image_assets WHERE id = ?", args: [id] })).rows[0];
  return { ok: true, image: toAsset(saved), duplicate: false };
}

/** The library: new uploads plus older ones (stored in the database before this service existed). A contributor sees only their own. */
export async function listImages(opts: { userId?: string; kind?: ImageKind; limit?: number } = {}): Promise<ImageAsset[]> {
  const limit = Math.min(Math.max(opts.limit ?? 60, 1), 200);
  const db = await conn();
  const where: string[] = [];
  const args: (string | number)[] = [];
  if (opts.userId) {
    where.push("created_by = ?");
    args.push(opts.userId);
  }
  if (opts.kind) {
    where.push("kind = ?");
    args.push(opts.kind);
  }
  const fresh = (await db.execute({ sql: `SELECT * FROM image_assets ${where.length ? "WHERE " + where.join(" AND ") : ""} ORDER BY created_at DESC LIMIT ?`, args: [...args, limit] })).rows.map(toAsset);
  // Older images are article images; they are listed only when no other kind is asked for. A database-stored upload of the new
  // service also has a row in `media`, so those are left out here: they are already listed above, once.
  const old =
    opts.kind && opts.kind !== "articles"
      ? []
      : (
          await db.execute({
            sql: `SELECT id, mime, size, width, height, created_at FROM media
                  WHERE id NOT IN (SELECT object_key FROM image_assets WHERE storage = 'database') ${opts.userId ? "AND created_by = ?" : ""}
                  ORDER BY created_at DESC LIMIT ?`,
            args: [...(opts.userId ? [opts.userId] : []), limit],
          })
        ).rows.map<ImageAsset>((m) => ({
          id: s(m.id), kind: "articles", url: `/media/${s(m.id)}`, thumbUrl: null, width: n(m.width), height: n(m.height), size: n(m.size), storage: "database", originalName: "", alt: "", createdAt: s(m.created_at), legacy: true,
        }));
  return [...fresh, ...old].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, limit);
}

export async function deleteImage(id: string, actorId: string): Promise<{ ok: true } | { ok: false; error: string }> {
  if (/^m_/.test(id)) return deleteMedia(id, actorId); // older image: the original rules apply unchanged
  const db = await conn();
  const row = (await db.execute({ sql: "SELECT * FROM image_assets WHERE id = ?", args: [id] })).rows[0];
  if (!row) return { ok: false, error: "Image not found." };
  const a = toAsset(row);
  if (await isImageUsed([a.url, ...(a.thumbUrl ? [a.thumbUrl] : [])])) return { ok: false, error: "This image is used by an article, module or sponsor. Remove it there first." };
  if (a.storage === "r2") {
    await deleteObject(s(row.object_key));
    if (row.thumb_key) await deleteObject(s(row.thumb_key));
  } else {
    await db.execute({ sql: "DELETE FROM media WHERE id = ?", args: [s(row.object_key)] });
  }
  await db.execute({ sql: "DELETE FROM image_assets WHERE id = ?", args: [id] });
  await audit(actorId, "image.delete", id);
  return { ok: true };
}
