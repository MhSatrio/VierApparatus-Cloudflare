import { conn } from "../db/client";
import { sha256Hex } from "../crypto";
import { docSchema, type Doc } from "../content/schema";
import { json, n, nowIso, s, sn } from "./util";

/**
 * Lightweight version history. A revision is stored only when it is meaningful, never per keystroke:
 *  - lifecycle events (submit, request revision, approve, publish, restore, manual note) always;
 *  - ordinary saves only when the content really changed AND (a different person saved, or 15+ minutes passed since the last revision).
 * Identical content is never stored twice. Retention: the newest 30 automatic revisions plus lifecycle ones, at most 80 per article.
 */
export type RevisionKind = "auto" | "manual" | "submit" | "revision" | "approve" | "publish" | "restore";

export const AUTO_MERGE_MS = 15 * 60 * 1000;
export const KEEP_AUTO = 30;
export const KEEP_TOTAL = 80;

export type RevisionInput = {
  articleId: string;
  version: number;
  title: string;
  excerpt: string;
  doc: Doc;
  editor: { id: string | null; name: string };
  kind: RevisionKind;
  note?: string;
};

export async function recordRevision(r: RevisionInput): Promise<boolean> {
  const db = await conn();
  const body = JSON.stringify(r.doc);
  const hash = await sha256Hex(`${r.title}\n${r.excerpt}\n${body}`);
  const last = (await db.execute({ sql: "SELECT editor_id, created_at, doc_hash FROM article_revisions WHERE article_id = ? ORDER BY id DESC LIMIT 1", args: [r.articleId] })).rows[0];
  if (last && s(last.doc_hash) === hash && r.kind === "auto") return false; // nothing changed
  if (last && r.kind === "auto") {
    const sameEditor = sn(last.editor_id) === r.editor.id;
    const recent = Date.now() - new Date(s(last.created_at)).getTime() < AUTO_MERGE_MS;
    if (sameEditor && recent) return false; // same person, still the same working session
  }
  await db.execute({
    sql: `INSERT INTO article_revisions(article_id, version, kind, editor_id, editor_name, note, title, excerpt, doc, doc_hash, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [r.articleId, r.version, r.kind, r.editor.id, r.editor.name.slice(0, 80), (r.note ?? "").slice(0, 300), r.title, r.excerpt, body, hash, nowIso()],
  });
  await db.batch(
    [
      {
        sql: `DELETE FROM article_revisions WHERE article_id = ? AND kind = 'auto'
              AND id NOT IN (SELECT id FROM article_revisions WHERE article_id = ? AND kind = 'auto' ORDER BY id DESC LIMIT ?)`,
        args: [r.articleId, r.articleId, KEEP_AUTO],
      },
      {
        sql: `DELETE FROM article_revisions WHERE article_id = ?
              AND id NOT IN (SELECT id FROM article_revisions WHERE article_id = ? ORDER BY id DESC LIMIT ?)`,
        args: [r.articleId, r.articleId, KEEP_TOTAL],
      },
    ],
    "write",
  );
  return true;
}

export type RevisionSummary = { id: number; version: number; kind: RevisionKind; editorName: string; note: string; title: string; createdAt: string; size: number };

export async function listRevisions(articleId: string, limit = 60): Promise<RevisionSummary[]> {
  const db = await conn();
  const r = await db.execute({
    sql: "SELECT id, version, kind, editor_name, note, title, created_at, length(doc) AS size FROM article_revisions WHERE article_id = ? ORDER BY id DESC LIMIT ?",
    args: [articleId, limit],
  });
  return r.rows.map((x) => ({ id: n(x.id), version: n(x.version), kind: s(x.kind) as RevisionKind, editorName: s(x.editor_name), note: s(x.note), title: s(x.title), createdAt: s(x.created_at), size: n(x.size) }));
}

export type RevisionSnapshot = RevisionSummary & { excerpt: string; doc: Doc };

export async function getRevision(articleId: string, revisionId: number): Promise<RevisionSnapshot | null> {
  const db = await conn();
  const x = (await db.execute({ sql: "SELECT * FROM article_revisions WHERE article_id = ? AND id = ?", args: [articleId, revisionId] })).rows[0];
  if (!x) return null;
  const parsed = docSchema.safeParse(json<unknown>(x.doc, null));
  return {
    id: n(x.id), version: n(x.version), kind: s(x.kind) as RevisionKind, editorName: s(x.editor_name), note: s(x.note), title: s(x.title), createdAt: s(x.created_at),
    size: s(x.doc).length, excerpt: s(x.excerpt), doc: parsed.success ? parsed.data : { version: 1, blocks: [] },
  };
}

/** Adds an explicit, named version (for example "before restructuring"), regardless of the automatic rules. */
export async function addManualRevision(articleId: string, snapshot: Omit<RevisionInput, "articleId" | "kind">, note: string): Promise<void> {
  await recordRevision({ ...snapshot, articleId, kind: "manual", note });
}
