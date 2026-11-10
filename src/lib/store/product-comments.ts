import { z } from "zod";
import { conn } from "../db/client";
import { newId } from "../crypto";
import { can } from "../auth/permissions";
import { oneLine, multiLine } from "../forms";
import { bodyHash, checkComment } from "../spam";
import { MIN_RATINGS_FOR_SCORE } from "../products/shared";
import type { Viewer } from "./planner";
import { ProductError } from "./products";
import { json, n, nowIso, s, sn, type Row } from "./util";

/**
 * Visitor comments and ratings on products. A comment is stored as PENDING and is public only after the owner approves it. The
 * visitor's text is never trusted: it is validated and stripped of control characters here, stored as plain text, and shown by
 * React (which escapes it). Names are never judged: an unusual or fictional-sounding name is accepted as typed. A comment that
 * looks like spam is filed with the reasons attached, never deleted or approved automatically. Every moderation step is logged.
 * Whether an affiliation was checked is recorded only when the owner checked it; what the visitor typed is shown as unverified.
 */

const manage = (v: Viewer) => {
  if (!can(v, "products.manage")) throw new ProductError("forbidden", "Only the owner can moderate comments.");
};

export const commentInput = z.object({
  displayName: oneLine(80).pipe(z.string().min(2, "Please enter your name (2+ characters)")),
  affiliation: oneLine(150).default(""),
  orgAddress: oneLine(200).default(""),
  role: oneLine(100).default(""),
  body: multiLine(3000).pipe(z.string().min(20, "Please write at least 20 characters")),
  rating: z
    .union([z.number(), z.string()])
    .transform((v) => (v === "" || v === 0 || v === "0" ? null : Number(v)))
    .pipe(z.number().int().min(1).max(5).nullable())
    .nullable()
    .default(null),
});
export type CommentInput = z.input<typeof commentInput>;

export type CommentStatus = "pending" | "approved" | "rejected" | "spam";

export type ProductComment = {
  id: string;
  productId: string;
  displayName: string;
  affiliation: string;
  orgAddress: string;
  role: string;
  body: string;
  rating: number | null;
  status: CommentStatus;
  flags: string[];
  affiliationVerified: boolean;
  verifiedAt: string | null;
  edited: boolean;
  createdAt: string;
  moderatedAt: string | null;
};

const toComment = (r: Row): ProductComment => ({
  id: s(r.id), productId: s(r.product_id), displayName: s(r.display_name), affiliation: s(r.affiliation), orgAddress: s(r.org_address), role: s(r.role), body: s(r.body),
  rating: r.rating == null ? null : n(r.rating), status: s(r.status) as CommentStatus, flags: json<string[]>(r.flags, []), affiliationVerified: n(r.affiliation_verified) === 1,
  verifiedAt: sn(r.verified_at), edited: n(r.edited) === 1, createdAt: s(r.created_at), moderatedAt: sn(r.moderated_at),
});

/** Stores a visitor's comment. Always pending (or spam); returns what the visitor may be told. */
export async function submitComment(productId: string, raw: unknown, ipHash: string): Promise<{ status: "pending" | "spam"; id: string }> {
  const d = commentInput.parse(raw);
  const db = await conn();
  const p = (await db.execute({ sql: "SELECT id FROM products WHERE id = ? AND status = 'published'", args: [productId] })).rows[0];
  if (!p) throw new ProductError("not_found", "Product not found.");
  const hash = await bodyHash(d.body);
  const dup = (await db.execute({ sql: "SELECT id FROM product_comments WHERE body_hash = ? AND created_at > ?", args: [hash, new Date(Date.now() - 30 * 86_400_000).toISOString()] })).rows[0];
  if (dup) throw new ProductError("conflict", "This comment has already been received.");
  const v = checkComment({ name: d.displayName, affiliation: d.affiliation, role: d.role, body: d.body });
  const flags = [...v.flags];
  if (!d.affiliation) flags.push("No affiliation given");
  const status = v.spam ? "spam" : "pending";
  const id = newId("pcm_");
  const t = nowIso();
  await db.batch(
    [
      {
        sql: `INSERT INTO product_comments(id, product_id, display_name, affiliation, org_address, role, body, rating, status, flags, body_hash, ip_hash, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [id, productId, d.displayName, d.affiliation, d.orgAddress, d.role, d.body, d.rating, status, JSON.stringify(flags), hash, ipHash, t],
      },
      { sql: "INSERT INTO product_comment_log(id, comment_id, actor_id, actor_name, action, note, at) VALUES (?, ?, NULL, 'visitor', 'submitted', ?, ?)", args: [newId("pl_"), id, v.flags.join("; ").slice(0, 400), t] },
    ],
    "write",
  );
  return { status, id };
}

/** Approved comments of a product, newest first: the only comments a visitor ever sees. */
export async function listApprovedComments(productId: string, limit = 50): Promise<ProductComment[]> {
  const db = await conn();
  return (await db.execute({ sql: "SELECT * FROM product_comments WHERE product_id = ? AND status = 'approved' ORDER BY created_at DESC LIMIT ?", args: [productId, limit] })).rows.map(toComment);
}

export type RatingSummary = { count: number; average: number | null; ratedCount: number };

/**
 * The score shown with a product, only when at least MIN_RATINGS_FOR_SCORE approved comments carry a rating. Fewer than that:
 * no number at all (a single opinion is not a rating).
 */
export async function ratingFor(productIds: string[]): Promise<Map<string, RatingSummary>> {
  const out = new Map<string, RatingSummary>();
  if (!productIds.length) return out;
  const db = await conn();
  const rows = (
    await db.execute({
      sql: `SELECT product_id, COUNT(*) AS c, COUNT(rating) AS rated, AVG(rating) AS avg FROM product_comments WHERE status = 'approved' AND product_id IN (${productIds.map(() => "?").join(",")}) GROUP BY product_id`,
      args: productIds,
    })
  ).rows;
  for (const r of rows) {
    const rated = n(r.rated);
    out.set(s(r.product_id), { count: n(r.c), ratedCount: rated, average: rated >= MIN_RATINGS_FOR_SCORE ? Math.round(n(r.avg) * 10) / 10 : null });
  }
  return out;
}

// ---------------------------------------------------------------- moderation

export type ModerationEntry = { id: string; actorName: string; action: string; note: string; at: string };

export type ModerationItem = ProductComment & { productName: string; productRef: string; productSlug: string; history: ModerationEntry[] };

export async function countPendingComments(): Promise<number> {
  const db = await conn();
  return n((await db.execute("SELECT COUNT(*) AS c FROM product_comments WHERE status = 'pending'")).rows[0].c);
}

export async function commentCounts(): Promise<Record<CommentStatus | "all", number>> {
  const db = await conn();
  const out = { all: 0, pending: 0, approved: 0, rejected: 0, spam: 0 } as Record<CommentStatus | "all", number>;
  for (const r of (await db.execute("SELECT status, COUNT(*) AS c FROM product_comments GROUP BY status")).rows) {
    out[s(r.status) as CommentStatus] = n(r.c);
    out.all += n(r.c);
  }
  return out;
}

export async function listComments(opts: { status?: CommentStatus; productId?: string; page?: number; perPage?: number } = {}): Promise<{ items: ModerationItem[]; total: number }> {
  const db = await conn();
  const perPage = opts.perPage ?? 25;
  const where: string[] = [];
  const args: (string | number)[] = [];
  if (opts.status) {
    where.push("c.status = ?");
    args.push(opts.status);
  }
  if (opts.productId) {
    where.push("c.product_id = ?");
    args.push(opts.productId);
  }
  const w = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const total = n((await db.execute({ sql: `SELECT COUNT(*) AS c FROM product_comments c ${w}`, args })).rows[0].c);
  const rows = (
    await db.execute({
      sql: `SELECT c.*, p.name AS product_name, p.num AS product_num, p.slug AS product_slug FROM product_comments c JOIN products p ON p.id = c.product_id ${w}
            ORDER BY c.created_at DESC LIMIT ? OFFSET ?`,
      args: [...args, perPage, ((opts.page ?? 1) - 1) * perPage],
    })
  ).rows;
  const ids = rows.map((r) => s(r.id));
  const logs = ids.length
    ? (await db.execute({ sql: `SELECT * FROM product_comment_log WHERE comment_id IN (${ids.map(() => "?").join(",")}) ORDER BY at`, args: ids })).rows
    : [];
  return {
    total,
    items: rows.map((r) => ({
      ...toComment(r),
      productName: s(r.product_name),
      productRef: `P-${String(n(r.product_num)).padStart(5, "0")}`,
      productSlug: s(r.product_slug),
      history: logs.filter((l) => s(l.comment_id) === s(r.id)).map((l) => ({ id: s(l.id), actorName: s(l.actor_name), action: s(l.action), note: s(l.note), at: s(l.at) })),
    })),
  };
}

export type ModerationAction =
  | { type: "approve" | "reject" | "spam" | "pending"; note?: string }
  | { type: "edit"; body: string; note?: string }
  | { type: "verify" | "unverify"; note?: string };

const STATUS_OF = { approve: "approved", reject: "rejected", spam: "spam", pending: "pending" } as const;

/** One moderation step on one comment, with its note, written to the comment's history. */
export async function moderateComment(actor: Viewer, id: string, action: ModerationAction): Promise<ProductComment> {
  manage(actor);
  const db = await conn();
  const cur = (await db.execute({ sql: "SELECT * FROM product_comments WHERE id = ?", args: [id] })).rows[0];
  if (!cur) throw new ProductError("not_found", "Comment not found.");
  const t = nowIso();
  const note = (action.note ?? "").trim().slice(0, 400);
  const log = (what: string, extra = "") => ({
    sql: "INSERT INTO product_comment_log(id, comment_id, actor_id, actor_name, action, note, at) VALUES (?, ?, ?, ?, ?, ?, ?)",
    args: [newId("pl_"), id, actor.id, actor.name.slice(0, 80), what, [note, extra].filter(Boolean).join(" · ").slice(0, 600), t],
  });
  if (action.type === "edit") {
    const body = multiLine(3000).pipe(z.string().min(5, "The comment cannot be empty")).safeParse(action.body);
    if (!body.success) throw new ProductError("invalid", body.error.issues[0]?.message ?? "Invalid text.");
    await db.batch(
      [
        { sql: "UPDATE product_comments SET body = ?, edited = 1, moderated_at = ?, moderated_by = ? WHERE id = ?", args: [body.data, t, actor.id, id] },
        log("edited", `before: ${s(cur.body).slice(0, 300)}`),
      ],
      "write",
    );
  } else if (action.type === "verify" || action.type === "unverify") {
    if (action.type === "verify" && !s(cur.affiliation)) throw new ProductError("invalid", "This comment gives no affiliation to verify.");
    await db.batch(
      [
        { sql: "UPDATE product_comments SET affiliation_verified = ?, verified_by = ?, verified_at = ? WHERE id = ?", args: [action.type === "verify" ? 1 : 0, action.type === "verify" ? actor.id : null, action.type === "verify" ? t : null, id] },
        log(action.type === "verify" ? "affiliation verified" : "affiliation verification removed"),
      ],
      "write",
    );
  } else {
    const status = STATUS_OF[action.type];
    await db.batch([{ sql: "UPDATE product_comments SET status = ?, moderated_at = ?, moderated_by = ? WHERE id = ?", args: [status, t, actor.id, id] }, log(status)], "write");
  }
  return toComment((await db.execute({ sql: "SELECT * FROM product_comments WHERE id = ?", args: [id] })).rows[0]);
}

/** Removes a comment for good (inappropriate content that must not stay even in the moderation history of the page). */
export async function deleteComment(actor: Viewer, id: string): Promise<void> {
  manage(actor);
  const db = await conn();
  const r = await db.execute({ sql: "DELETE FROM product_comments WHERE id = ?", args: [id] });
  if (!r.rowsAffected) throw new ProductError("not_found", "Comment not found.");
}
