import { conn } from "../db/client";
import { newId } from "../crypto";
import { imageInfo } from "./media";
import { nowIso, n, s } from "./util";

/**
 * Files sent through the public forms (a screenshot with a bug report, an article draft with a proposal). They are stored
 * privately in the database, are never served from a public URL, and can only be opened by the signed-in owner.
 * Accepted: PNG/JPEG/WebP/GIF screenshots (checked by content, 1 MB) and plain-text/Markdown drafts (300 KB, valid UTF-8).
 */
export const MAX_ATTACH_IMAGE = 1_000_000;
export const MAX_ATTACH_TEXT = 300_000;

export type AttachmentKind = "image" | "text";
export type AttachResult = { ok: true; id: string; kind: AttachmentKind; filename: string; mime: string } | { ok: false; error: string };

const safeName = (name: string) => name.replace(/[^\w.\- ]+/g, "_").replace(/\.{2,}/g, ".").slice(-80) || "file";

export async function saveAttachment(file: { name: string; bytes: Uint8Array }, allow: AttachmentKind[]): Promise<AttachResult> {
  const filename = safeName(file.name);
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  if (file.bytes.length === 0) return { ok: false, error: "The attached file is empty." };

  const img = allow.includes("image") ? imageInfo(file.bytes) : null;
  if (img) {
    if (file.bytes.length > MAX_ATTACH_IMAGE) return { ok: false, error: "Images must be smaller than 1 MB." };
    return store(filename, img.mime, "image", file.bytes);
  }
  if (allow.includes("text") && ["md", "markdown", "txt"].includes(ext)) {
    if (file.bytes.length > MAX_ATTACH_TEXT) return { ok: false, error: "Text files must be smaller than 300 KB." };
    try {
      const text = new TextDecoder("utf-8", { fatal: true }).decode(file.bytes);
      if (text.includes("\u0000")) throw new Error("binary");
    } catch {
      return { ok: false, error: "That file is not plain UTF-8 text. Save it as Markdown (.md) or text (.txt)." };
    }
    return store(filename, ext === "txt" ? "text/plain" : "text/markdown", "text", file.bytes);
  }
  return { ok: false, error: allow.includes("text") ? "Attach a Markdown (.md) or text (.txt) file, or share a link instead." : "Attach a PNG, JPEG, WebP or GIF image." };
}

async function store(filename: string, mime: string, kind: AttachmentKind, bytes: Uint8Array): Promise<AttachResult> {
  const db = await conn();
  const id = newId("f_");
  await db.execute({ sql: "INSERT INTO attachments(id, kind, filename, mime, size, data, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)", args: [id, kind, filename, mime, bytes.length, bytes, nowIso()] });
  return { ok: true, id, kind, filename, mime };
}

export async function getAttachment(id: string): Promise<{ filename: string; mime: string; kind: string; size: number; data: Uint8Array } | null> {
  const db = await conn();
  const r = (await db.execute({ sql: "SELECT filename, mime, kind, size, data FROM attachments WHERE id = ?", args: [id] })).rows[0];
  if (!r) return null;
  const raw = r.data as unknown;
  return { filename: s(r.filename), mime: s(r.mime), kind: s(r.kind), size: n(r.size), data: raw instanceof Uint8Array ? raw : new Uint8Array(raw as ArrayBuffer) };
}

export async function getAttachmentMeta(id: string | null): Promise<{ id: string; filename: string; mime: string; kind: string; size: number } | null> {
  if (!id) return null;
  const db = await conn();
  const r = (await db.execute({ sql: "SELECT id, filename, mime, kind, size FROM attachments WHERE id = ?", args: [id] })).rows[0];
  return r ? { id: s(r.id), filename: s(r.filename), mime: s(r.mime), kind: s(r.kind), size: n(r.size) } : null;
}

export type AttachmentMeta = { id: string; filename: string; mime: string; kind: string; size: number };

/** Metadata for many attachments in ONE query (a list page must not run one query per row: a Worker allows only 50 subrequests). */
export async function getAttachmentMetas(ids: (string | null)[]): Promise<Map<string, AttachmentMeta>> {
  const wanted = [...new Set(ids.filter((x): x is string => !!x))].slice(0, 200);
  const out = new Map<string, AttachmentMeta>();
  if (!wanted.length) return out;
  const db = await conn();
  const r = await db.execute({ sql: `SELECT id, filename, mime, kind, size FROM attachments WHERE id IN (${wanted.map(() => "?").join(",")})`, args: wanted });
  for (const x of r.rows) out.set(s(x.id), { id: s(x.id), filename: s(x.filename), mime: s(x.mime), kind: s(x.kind), size: n(x.size) });
  return out;
}
