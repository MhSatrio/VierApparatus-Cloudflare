import { conn } from "../db/client";
import { newId, sha256Hex } from "../crypto";
import { isImageUsed } from "../images/usage";
import { audit, n, nowIso, s, type Row } from "./util";

/**
 * Images are stored in the database and served from /media/<id> with a one-year immutable cache header, so each
 * image is read from the database about once per cache lifetime. The admin editor resizes images in the browser
 * first (see ImageUpload); the server re-checks type, size and dimensions itself and never trusts the client.
 * SVG is deliberately not accepted: it can carry scripts.
 */
export const MAX_IMAGE_BYTES = 1_500_000;
export const MAX_IMAGE_SIDE = 4000;
export const IMAGE_MIMES = ["image/jpeg", "image/png", "image/webp", "image/gif"] as const;
export type ImageMime = (typeof IMAGE_MIMES)[number];

export type ImageInfo = { mime: ImageMime; width: number; height: number };

const u16be = (b: Uint8Array, o: number) => (b[o] << 8) | b[o + 1];
const u32be = (b: Uint8Array, o: number) => ((b[o] << 24) | (b[o + 1] << 16) | (b[o + 2] << 8) | b[o + 3]) >>> 0;
const u16le = (b: Uint8Array, o: number) => b[o] | (b[o + 1] << 8);
const ascii = (b: Uint8Array, o: number, len: number) => String.fromCharCode(...b.slice(o, o + len));

/** Identifies an image from its bytes (never from the file name or the declared type) and reads its size. */
export function imageInfo(b: Uint8Array): ImageInfo | null {
  if (b.length < 24) return null;
  // PNG
  if (b[0] === 0x89 && ascii(b, 1, 3) === "PNG" && ascii(b, 12, 4) === "IHDR") return { mime: "image/png", width: u32be(b, 16), height: u32be(b, 20) };
  // GIF
  if (ascii(b, 0, 3) === "GIF") return { mime: "image/gif", width: u16le(b, 6), height: u16le(b, 8) };
  // JPEG: walk segments until a start-of-frame marker
  if (b[0] === 0xff && b[1] === 0xd8) {
    let o = 2;
    while (o + 9 < b.length) {
      if (b[o] !== 0xff) {
        o++;
        continue;
      }
      const marker = b[o + 1];
      if (marker === 0xff) {
        o++;
        continue;
      }
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) return { mime: "image/jpeg", height: u16be(b, o + 5), width: u16be(b, o + 7) };
      if (marker === 0xd8 || (marker >= 0xd0 && marker <= 0xd7) || marker === 0x01) {
        o += 2;
        continue;
      }
      o += 2 + u16be(b, o + 2);
    }
    return null;
  }
  // WebP
  if (ascii(b, 0, 4) === "RIFF" && ascii(b, 8, 4) === "WEBP") {
    const kind = ascii(b, 12, 4);
    if (kind === "VP8 " && b.length >= 30) return { mime: "image/webp", width: u16le(b, 26) & 0x3fff, height: u16le(b, 28) & 0x3fff };
    if (kind === "VP8L" && b.length >= 25) {
      const bits = b[21] | (b[22] << 8) | (b[23] << 16) | (b[24] << 24);
      return { mime: "image/webp", width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
    if (kind === "VP8X" && b.length >= 30) return { mime: "image/webp", width: (b[24] | (b[25] << 8) | (b[26] << 16)) + 1, height: (b[27] | (b[28] << 8) | (b[29] << 16)) + 1 };
  }
  return null;
}

export type SavedImage = { id: string; url: string; width: number; height: number; mime: string; size: number; duplicate: boolean };
export type SaveImageResult = { ok: true; image: SavedImage } | { ok: false; error: string };

export async function saveImage(bytes: Uint8Array, opts: { alt?: string; userId: string | null }): Promise<SaveImageResult> {
  if (bytes.length === 0) return { ok: false, error: "The file is empty." };
  if (bytes.length > MAX_IMAGE_BYTES) return { ok: false, error: `Images must be smaller than ${(MAX_IMAGE_BYTES / 1_000_000).toFixed(1)} MB.` };
  const info = imageInfo(bytes);
  if (!info) return { ok: false, error: "Only JPEG, PNG, WebP and GIF images are accepted." };
  if (info.width < 1 || info.height < 1 || info.width > MAX_IMAGE_SIDE || info.height > MAX_IMAGE_SIDE) {
    return { ok: false, error: `Image dimensions must be between 1 and ${MAX_IMAGE_SIDE} pixels.` };
  }
  const db = await conn();
  const sha = await sha256Hex(bytes);
  const existing = (await db.execute({ sql: "SELECT id, mime, size, width, height FROM media WHERE sha256 = ?", args: [sha] })).rows[0];
  if (existing) {
    const id = s(existing.id);
    return { ok: true, image: { id, url: `/media/${id}`, width: n(existing.width), height: n(existing.height), mime: s(existing.mime), size: n(existing.size), duplicate: true } };
  }
  const id = newId("m_");
  await db.execute({
    sql: "INSERT INTO media(id, mime, size, width, height, sha256, alt, data, created_by, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    args: [id, info.mime, bytes.length, info.width, info.height, sha, (opts.alt ?? "").slice(0, 300), bytes, opts.userId, nowIso()],
  });
  await audit(opts.userId, "media.upload", id);
  return { ok: true, image: { id, url: `/media/${id}`, width: info.width, height: info.height, mime: info.mime, size: bytes.length, duplicate: false } };
}

export async function getMedia(id: string): Promise<{ mime: string; data: Uint8Array; size: number } | null> {
  if (!/^m_[A-Za-z0-9_-]{8,40}$/.test(id)) return null;
  const db = await conn();
  const r = (await db.execute({ sql: "SELECT mime, size, data FROM media WHERE id = ?", args: [id] })).rows[0];
  if (!r) return null;
  const raw = r.data as unknown;
  const data = raw instanceof Uint8Array ? raw : new Uint8Array(raw as ArrayBuffer);
  return { mime: s(r.mime), size: n(r.size), data };
}

export type MediaItem = { id: string; url: string; mime: string; size: number; width: number; height: number; createdAt: string };

const toItem = (r: Row): MediaItem => ({ id: s(r.id), url: `/media/${s(r.id)}`, mime: s(r.mime), size: n(r.size), width: n(r.width), height: n(r.height), createdAt: s(r.created_at) });

/** Library listing; contributors only see what they uploaded themselves. */
export async function listMedia(opts: { userId?: string; limit?: number; offset?: number } = {}): Promise<MediaItem[]> {
  const db = await conn();
  const r = await db.execute({
    sql: `SELECT id, mime, size, width, height, created_at FROM media ${opts.userId ? "WHERE created_by = ?" : ""} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
    args: [...(opts.userId ? [opts.userId] : []), opts.limit ?? 60, opts.offset ?? 0],
  });
  return r.rows.map(toItem);
}

export async function deleteMedia(id: string, actorId: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const db = await conn();
  const url = `/media/${id}`;
  if (await isImageUsed([url])) return { ok: false, error: "This image is used by an article, module or sponsor. Remove it there first." };
  const r = await db.execute({ sql: "DELETE FROM media WHERE id = ?", args: [id] });
  if (r.rowsAffected) await audit(actorId, "media.delete", id);
  return r.rowsAffected > 0 ? { ok: true } : { ok: false, error: "Image not found." };
}
