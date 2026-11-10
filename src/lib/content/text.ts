import type { Block, Doc, Inline } from "./schema";

export const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

export function inlineText(content: Inline[] | undefined): string {
  if (!content) return "";
  return content
    .map((n) => (n.t === "text" ? n.text : n.t === "math" ? n.latex : " "))
    .join("")
    .replace(/\s+/g, " ")
    .trim();
}

function blockText(b: Block): string {
  switch (b.type) {
    case "heading":
    case "paragraph":
    case "quote":
    case "callout":
      return inlineText(b.content);
    case "list":
      return b.items.map(inlineText).join(" ");
    case "table":
      return [...b.header.map(inlineText), ...b.rows.flat().map(inlineText)].join(" ");
    case "image":
      return inlineText(b.caption);
    case "references":
      return b.items.map((i) => inlineText(i.text)).join(" ");
    default:
      return "";
  }
}

/** Plain text of the article body: used for search, reading time and fallbacks. */
export const docToText = (doc: Doc): string =>
  doc.blocks
    .map(blockText)
    .filter(Boolean)
    .join("\n")
    .trim();

export const wordCount = (s: string) => (s.trim() ? s.trim().split(/\s+/).length : 0);

export const readingMinutes = (s: string) => Math.max(1, Math.round(wordCount(s) / 220));

export const slugify = (s: string, max = 80) =>
  s
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, max)
    .replace(/-+$/g, "");

export function truncate(s: string, max: number): string {
  const t = s.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const sp = cut.lastIndexOf(" ");
  return `${(sp > max * 0.5 ? cut.slice(0, sp) : cut).replace(/[\s,;:.-]+$/, "")}…`;
}
