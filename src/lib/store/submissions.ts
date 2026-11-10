import { conn } from "../db/client";
import { newId } from "../crypto";
import { importMarkdown } from "../content/markdown";
import { text as t, type Doc } from "../content/schema";
import { truncate } from "../content/text";
import type { InquiryType, SubmissionInput } from "../forms";
import { createArticle } from "./articles";
import { getAttachment } from "./attachments";
import { audit, json, n, nowIso, s, sn, type Row } from "./util";

export type SubmissionStatus = "pending" | "accepted" | "rejected" | "revision";

export type Submission = {
  id: string;
  name: string;
  email: string;
  title: string;
  topic: string;
  proposal: string;
  background: string;
  links: string[];
  attachmentId: string | null;
  status: SubmissionStatus;
  ownerNote: string;
  articleId: string | null;
  createdAt: string;
  reviewedAt: string | null;
};

const toSubmission = (r: Row): Submission => ({
  id: s(r.id),
  name: s(r.name),
  email: s(r.email),
  title: s(r.title),
  topic: s(r.topic),
  proposal: s(r.proposal),
  background: s(r.background),
  links: s(r.links).split("\n").filter(Boolean),
  attachmentId: sn(r.attachment_id),
  status: s(r.status) as SubmissionStatus,
  ownerNote: s(r.owner_note),
  articleId: sn(r.article_id),
  createdAt: s(r.created_at),
  reviewedAt: sn(r.reviewed_at),
});

/** Stored as a PENDING proposal only. It never creates an account and never publishes anything. */
export async function createSubmission(input: Omit<SubmissionInput, "website" | "startedAt">, attachmentId: string | null): Promise<string> {
  const db = await conn();
  const id = newId("s_");
  await db.execute({
    sql: `INSERT INTO submissions(id, name, email, title, topic, proposal, background, links, attachment_id, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?)`,
    args: [id, input.name, input.email, input.title, input.topic, input.proposal, input.background, input.links, attachmentId, nowIso()],
  });
  return id;
}

export async function listSubmissions(opts: { status?: SubmissionStatus; page?: number; perPage?: number } = {}): Promise<{ items: Submission[]; total: number; pending: number }> {
  const db = await conn();
  const perPage = opts.perPage ?? 25;
  const where = opts.status ? "WHERE status = ?" : "";
  const args = opts.status ? [opts.status] : [];
  const total = n((await db.execute({ sql: `SELECT COUNT(*) AS c FROM submissions ${where}`, args })).rows[0].c);
  const r = await db.execute({ sql: `SELECT * FROM submissions ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`, args: [...args, perPage, ((opts.page ?? 1) - 1) * perPage] });
  const pending = n((await db.execute("SELECT COUNT(*) AS c FROM submissions WHERE status = 'pending'")).rows[0].c);
  return { items: r.rows.map(toSubmission), total, pending };
}

export async function getSubmission(id: string): Promise<Submission | null> {
  const db = await conn();
  const r = await db.execute({ sql: "SELECT * FROM submissions WHERE id = ?", args: [id] });
  return r.rows[0] ? toSubmission(r.rows[0]) : null;
}

export async function reviewSubmission(id: string, status: Exclude<SubmissionStatus, "pending">, note: string, actorId: string): Promise<boolean> {
  const db = await conn();
  const r = await db.execute({ sql: "UPDATE submissions SET status = ?, owner_note = ?, reviewed_at = ? WHERE id = ?", args: [status, note.trim().slice(0, 2000), nowIso(), id] });
  if (r.rowsAffected) await audit(actorId, `submission.${status}`, id);
  return r.rowsAffected > 0;
}

/**
 * Accepts a proposal and opens a DRAFT for the owner to write or edit. If the contributor attached a Markdown file it is
 * imported; otherwise the draft starts from the proposal text. The draft is attributed to the submitter by name only.
 */
export async function convertToDraft(id: string, actorId: string): Promise<{ ok: true; articleId: string } | { ok: false; error: string }> {
  const sub = await getSubmission(id);
  if (!sub) return { ok: false, error: "Submission not found." };
  if (sub.articleId) return { ok: true, articleId: sub.articleId };

  let doc: Doc = { version: 1, blocks: [{ type: "paragraph", content: [t(sub.proposal)] }] };
  let excerpt = truncate(sub.proposal, 280);
  let title = sub.title;
  let source: "submission" | "markdown" = "submission";
  if (sub.attachmentId) {
    const att = await getAttachment(sub.attachmentId);
    if (att?.kind === "text") {
      const imported = importMarkdown(new TextDecoder().decode(att.data));
      if (imported.doc.blocks.length) {
        doc = imported.doc;
        excerpt = imported.meta.excerpt ?? excerpt;
        title = imported.meta.title ?? title;
        source = "markdown";
      }
    }
  }
  const article = await createArticle({ title, excerpt, authorName: sub.name, doc, source: "submission", tags: [] }, { id: null });
  void source;
  const db = await conn();
  await db.execute({ sql: "UPDATE submissions SET status = 'accepted', article_id = ?, reviewed_at = ? WHERE id = ?", args: [article.id, nowIso(), id] });
  await audit(actorId, "submission.convert", `${id} -> ${article.id}`);
  return { ok: true, articleId: article.id };
}

// ---------------------------------------------------------------- inquiries (contact form)

export type InquiryStatus = "new" | "read" | "archived";
export type Inquiry = {
  id: string;
  type: InquiryType;
  name: string;
  email: string;
  message: string;
  extra: Record<string, string>;
  attachmentId: string | null;
  status: InquiryStatus;
  createdAt: string;
};

const toInquiry = (r: Row): Inquiry => ({
  id: s(r.id),
  type: s(r.type) as InquiryType,
  name: s(r.name),
  email: s(r.email),
  message: s(r.message),
  extra: json<Record<string, string>>(r.extra, {}),
  attachmentId: sn(r.attachment_id),
  status: s(r.status) as InquiryStatus,
  createdAt: s(r.created_at),
});

export async function createInquiry(input: { type: InquiryType; name: string; email: string; message: string; extra: Record<string, string>; attachmentId: string | null }): Promise<string> {
  const db = await conn();
  const id = newId("q_");
  await db.execute({
    sql: "INSERT INTO inquiries(id, type, name, email, message, extra, attachment_id, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, 'new', ?)",
    args: [id, input.type, input.name, input.email, input.message, JSON.stringify(input.extra), input.attachmentId, nowIso()],
  });
  return id;
}

export async function listInquiries(opts: { status?: InquiryStatus; page?: number; perPage?: number } = {}): Promise<{ items: Inquiry[]; total: number; unread: number }> {
  const db = await conn();
  const perPage = opts.perPage ?? 25;
  const where = opts.status ? "WHERE status = ?" : "";
  const args = opts.status ? [opts.status] : [];
  const total = n((await db.execute({ sql: `SELECT COUNT(*) AS c FROM inquiries ${where}`, args })).rows[0].c);
  const r = await db.execute({ sql: `SELECT * FROM inquiries ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`, args: [...args, perPage, ((opts.page ?? 1) - 1) * perPage] });
  const unread = n((await db.execute("SELECT COUNT(*) AS c FROM inquiries WHERE status = 'new'")).rows[0].c);
  return { items: r.rows.map(toInquiry), total, unread };
}

export async function setInquiryStatus(id: string, status: InquiryStatus): Promise<boolean> {
  const db = await conn();
  return (await db.execute({ sql: "UPDATE inquiries SET status = ? WHERE id = ?", args: [status, id] })).rowsAffected > 0;
}
