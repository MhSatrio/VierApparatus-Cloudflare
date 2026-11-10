import { isSafeHref, type Block, type BlockType, type CalloutTone, type Inline, type TextInline } from "@/lib/content/schema";

type Marks = Partial<Omit<TextInline, "t" | "text">>;

/** Elements whose content is never article text. */
const SKIP = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEMPLATE", "IFRAME", "OBJECT", "EMBED", "SVG", "CANVAS"]);

const sameMarks = (a: TextInline, b: TextInline) => a.b === b.b && a.i === b.i && a.u === b.u && a.sub === b.sub && a.sup === b.sup && a.code === b.code && a.href === b.href;

/**
 * Reads the editable surface back into the canonical inline model. Only a fixed set of tags is understood (bold, italic,
 * underline, sub/superscript, code, safe links, inline math, line breaks); everything else is reduced to its text. That
 * is what keeps pasted or browser-generated markup out of the stored article.
 */
export function domToInline(root: Node): Inline[] {
  const out: Inline[] = [];
  const push = (text: string, marks: Marks) => {
    const clean = text.replace(/[ ​]/g, (c) => (c === " " ? " " : ""));
    if (!clean) return;
    const node: TextInline = { t: "text", text: clean, ...marks };
    const last = out[out.length - 1];
    if (last && last.t === "text" && sameMarks(last, node)) last.text += clean;
    else out.push(node);
  };
  const walk = (node: Node, marks: Marks) => {
    if (node.nodeType === 3) return push(node.textContent ?? "", marks);
    if (node.nodeType !== 1) return;
    const el = node as HTMLElement;
    const tag = el.tagName;
    if (SKIP.has(tag)) return;
    if (tag === "BR") {
      out.push({ t: "br" });
      return;
    }
    if (el.dataset.latex !== undefined) {
      const latex = el.dataset.latex.trim();
      if (latex) out.push({ t: "math", latex });
      return;
    }
    const m: Marks = { ...marks };
    if (tag === "B" || tag === "STRONG") m.b = true;
    else if (tag === "I" || tag === "EM") m.i = true;
    else if (tag === "U") m.u = true;
    else if (tag === "SUB") m.sub = true;
    else if (tag === "SUP") m.sup = true;
    else if (tag === "CODE") m.code = true;
    else if (tag === "A") {
      const href = el.getAttribute("href");
      if (href && isSafeHref(href)) m.href = href.trim();
    } else if ((tag === "DIV" || tag === "P") && out.length && out[out.length - 1].t !== "br") out.push({ t: "br" });
    // Inline styles written by some browsers for formatting commands.
    const st = el.style;
    if (st) {
      if (st.fontWeight === "bold" || Number(st.fontWeight) >= 600) m.b = true;
      if (st.fontStyle === "italic") m.i = true;
      if (st.textDecorationLine?.includes("underline")) m.u = true;
      if (st.verticalAlign === "super") m.sup = true;
      if (st.verticalAlign === "sub") m.sub = true;
    }
    el.childNodes.forEach((c) => walk(c, m));
  };
  root.childNodes.forEach((c) => walk(c, {}));
  while (out.length && out[out.length - 1].t === "br") out.pop();
  while (out.length && out[0].t === "br") out.shift();
  return out;
}

export const textOnly = (s: string): Inline[] => (s ? [{ t: "text", text: s }] : []);

/** A fresh, empty block of the given type. */
export function newBlock(type: BlockType): Block {
  switch (type) {
    case "heading":
      return { type, level: 2, content: [] };
    case "paragraph":
      return { type, content: [] };
    case "image":
      return { type, src: "/images/placeholder.png", alt: "" };
    case "list":
      return { type, ordered: false, items: [[]] };
    case "quote":
      return { type, content: [] };
    case "table":
      return { type, header: [[], []], rows: [[[], []]] };
    case "code":
      return { type, code: "" };
    case "equation":
      return { type, latex: "E = mc^2" };
    case "divider":
      return { type };
    case "references":
      return { type, items: [{ text: [] }] };
    case "callout":
      return { type, tone: "note" as CalloutTone, content: [] };
    case "embed":
      return { type, provider: "youtube", videoId: "dQw4w9WgXcQ", title: "" };
  }
}

export const BLOCK_LABEL: Record<BlockType, string> = {
  heading: "Heading",
  paragraph: "Paragraph",
  image: "Image",
  list: "List",
  quote: "Quote",
  table: "Table",
  code: "Code",
  equation: "Equation",
  divider: "Divider",
  references: "References",
  callout: "Callout",
  embed: "Video",
};

export const BLOCK_ORDER: BlockType[] = ["paragraph", "heading", "image", "list", "quote", "callout", "table", "equation", "code", "references", "divider", "embed"];

/** An image block is saved only once it has a real image; the placeholder never reaches the server. */
export const isPlaceholderImage = (b: Block) => b.type === "image" && b.src === "/images/placeholder.png";

export function youtubeId(input: string): string | null {
  const s = input.trim();
  if (/^[A-Za-z0-9_-]{11}$/.test(s)) return s;
  try {
    const u = new URL(s);
    if (u.hostname === "youtu.be") return u.pathname.slice(1, 12) || null;
    if (/(^|\.)youtube(-nocookie)?\.com$/.test(u.hostname)) {
      const v = u.searchParams.get("v") ?? u.pathname.split("/").filter(Boolean).at(-1);
      return v && /^[A-Za-z0-9_-]{11}$/.test(v) ? v : null;
    }
  } catch {
    /* not a URL */
  }
  return null;
}
