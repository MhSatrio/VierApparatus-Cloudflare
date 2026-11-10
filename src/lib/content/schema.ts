import { z } from "zod";

/**
 * Canonical article representation. The visual editor edits this structure directly and the Markdown importer
 * compiles into it, so both paths share one schema, one renderer (render.ts) and therefore one look.
 *
 * Nothing in here is raw HTML: text is plain text plus a fixed set of marks. That is what makes rendering safe by
 * construction (the renderer escapes everything and only ever emits a whitelist of tags).
 */

/** Links may be http(s), mailto, a site-relative path or an in-page anchor. Everything else (javascript:, data:...) is rejected. */
export function isSafeHref(href: string): boolean {
  const h = href.trim();
  if (!h || h.length > 2000) return false;
  if (h.startsWith("#")) return true;
  if (h.startsWith("/")) return !h.startsWith("//");
  try {
    const u = new URL(h);
    return u.protocol === "https:" || u.protocol === "http:" || u.protocol === "mailto:";
  } catch {
    return false;
  }
}

/** Image sources: our own media route, a static site path, or https. */
export function isSafeImageSrc(src: string): boolean {
  const s = src.trim();
  if (!s || s.length > 2000) return false;
  if (s.startsWith("/")) return !s.startsWith("//");
  try {
    return new URL(s).protocol === "https:";
  } catch {
    return false;
  }
}

const href = z.string().refine(isSafeHref, "Unsafe or malformed link");

export const inlineSchema = z.discriminatedUnion("t", [
  z.object({
    t: z.literal("text"),
    text: z.string().max(20_000),
    b: z.literal(true).optional(),
    i: z.literal(true).optional(),
    u: z.literal(true).optional(),
    sub: z.literal(true).optional(),
    sup: z.literal(true).optional(),
    code: z.literal(true).optional(),
    href: href.optional(),
  }),
  z.object({ t: z.literal("math"), latex: z.string().min(1).max(2_000) }),
  z.object({ t: z.literal("br") }),
]);
export type Inline = z.infer<typeof inlineSchema>;
export type TextInline = Extract<Inline, { t: "text" }>;

const inlines = z.array(inlineSchema).max(500);

export const CALLOUT_TONES = ["note", "caution", "commentary", "speculation"] as const;
export type CalloutTone = (typeof CALLOUT_TONES)[number];

const alt = z.string().max(500);

export const blockSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("heading"), level: z.union([z.literal(2), z.literal(3), z.literal(4)]), content: inlines }),
  z.object({ type: z.literal("paragraph"), content: inlines, align: z.enum(["left", "center", "right"]).optional() }),
  z.object({
    type: z.literal("image"),
    src: z.string().refine(isSafeImageSrc, "Unsafe or malformed image address"),
    alt,
    caption: inlines.optional(),
    credit: z.string().max(300).optional(),
    width: z.number().int().positive().max(20_000).optional(),
    height: z.number().int().positive().max(20_000).optional(),
  }),
  z.object({ type: z.literal("list"), ordered: z.boolean(), items: z.array(inlines).max(200) }),
  z.object({ type: z.literal("quote"), content: inlines, cite: z.string().max(300).optional() }),
  z.object({
    type: z.literal("table"),
    header: z.array(inlines).max(20),
    rows: z.array(z.array(inlines).max(20)).max(200),
    caption: inlines.optional(),
  }),
  z.object({ type: z.literal("code"), language: z.string().max(30).regex(/^[A-Za-z0-9_+#.-]*$/).optional(), code: z.string().max(60_000) }),
  z.object({ type: z.literal("equation"), latex: z.string().min(1).max(4_000) }),
  z.object({ type: z.literal("divider") }),
  z.object({
    type: z.literal("references"),
    items: z
      .array(z.object({ text: inlines, url: href.optional(), doi: z.string().max(200).regex(/^10\.\S+\/\S+$/).optional() }))
      .max(300),
  }),
  z.object({ type: z.literal("callout"), tone: z.enum(CALLOUT_TONES), title: z.string().max(120).optional(), content: inlines }),
  z.object({ type: z.literal("embed"), provider: z.literal("youtube"), videoId: z.string().regex(/^[A-Za-z0-9_-]{11}$/), title: z.string().max(200) }),
]);
export type Block = z.infer<typeof blockSchema>;
export type BlockType = Block["type"];

export const docSchema = z.object({ version: z.literal(1), blocks: z.array(blockSchema).max(600) });
export type Doc = z.infer<typeof docSchema>;

export const emptyDoc = (): Doc => ({ version: 1, blocks: [] });

/** Whole-document size guard (stored as JSON text in the database). */
export const MAX_DOC_BYTES = 600_000;

export function parseDoc(value: unknown): { ok: true; doc: Doc } | { ok: false; error: string } {
  const r = docSchema.safeParse(value);
  if (!r.success) {
    const i = r.error.issues[0];
    return { ok: false, error: `${i.path.join(".") || "document"}: ${i.message}` };
  }
  if (JSON.stringify(r.data).length > MAX_DOC_BYTES) return { ok: false, error: "Article is too large" };
  return { ok: true, doc: r.data };
}

export const text = (s: string, marks: Partial<Omit<TextInline, "t" | "text">> = {}): TextInline => ({ t: "text", text: s, ...marks });
