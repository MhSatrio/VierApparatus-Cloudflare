import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import type { Content, PhrasingContent, Root, TableRow } from "mdast";
import { isSafeHref, isSafeImageSrc, type Block, type CalloutTone, type Doc, type Inline, type TextInline } from "./schema";
import { docToText, inlineText, truncate } from "./text";

/**
 * Markdown -> canonical document. The importer never keeps raw HTML: it understands a handful of inline tags that
 * scientific Markdown commonly uses (<sub>, <sup>, <u>, <br>) and drops everything else, reporting it as a warning.
 */

export type ImportMeta = {
  title?: string;
  slug?: string;
  excerpt?: string;
  category?: string;
  author?: string;
  tags?: string[];
  date?: string;
  updated?: string;
  coverImage?: string;
  coverAlt?: string;
  coverCredit?: string;
  seoTitle?: string;
  seoDescription?: string;
  published?: boolean;
  featured?: boolean;
};

export type ImportResult = {
  meta: ImportMeta;
  doc: Doc;
  /** Things the importer changed or could not keep. Shown to the owner before publishing. */
  warnings: string[];
  /** Metadata the owner still has to supply (title, excerpt, category, author). */
  missing: ("title" | "excerpt" | "category" | "author")[];
};

type Marks = Partial<Omit<TextInline, "t" | "text">>;

const CALLOUT_ALIASES: Record<string, CalloutTone> = {
  NOTE: "note",
  INFO: "note",
  TIP: "note",
  IMPORTANT: "note",
  WARNING: "caution",
  CAUTION: "caution",
  COMMENTARY: "commentary",
  OPINION: "commentary",
  SPECULATION: "speculation",
  HYPOTHESIS: "speculation",
};

const str = (v: unknown): string | undefined => {
  if (v instanceof Date) return v.toISOString();
  if (typeof v === "string" || typeof v === "number") {
    const s = String(v).trim();
    return s || undefined;
  }
  return undefined;
};

const bool = (v: unknown): boolean | undefined => (typeof v === "boolean" ? v : typeof v === "string" ? ["true", "yes"].includes(v.toLowerCase()) || undefined : undefined);

function frontMatterToMeta(data: Record<string, unknown>): ImportMeta {
  const tagsRaw = data.tags ?? data.keywords;
  const tags = Array.isArray(tagsRaw)
    ? tagsRaw.map((t) => String(t).trim()).filter(Boolean)
    : typeof tagsRaw === "string"
      ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean)
      : undefined;
  const status = str(data.status)?.toLowerCase();
  const published = bool(data.published) ?? (status ? status === "published" : undefined);
  return {
    title: str(data.title),
    slug: str(data.slug),
    excerpt: str(data.excerpt) ?? str(data.description) ?? str(data.summary) ?? str(data.subtitle),
    category: str(data.category),
    author: str(data.author),
    tags,
    date: str(data.date),
    updated: str(data.updated),
    coverImage: str(data.coverImage) ?? str(data.cover) ?? str(data.image),
    coverAlt: str(data.coverImageAlt) ?? str(data.coverAlt),
    coverCredit: str(data.coverImageSource) ?? str(data.coverCredit),
    seoTitle: str(data.seoTitle),
    seoDescription: str(data.seoDescription),
    published,
    featured: bool(data.featured),
  };
}

export function importMarkdown(source: string): ImportResult {
  const warnings: string[] = [];
  const dropped = new Set<string>();

  let fm: matter.GrayMatterFile<string>;
  try {
    // gray-matter's default engine can evaluate JavaScript front matter ("---js"). Never allow that.
    fm = matter(source.replace(/^﻿/, ""), { engines: { js: () => ({}), javascript: () => ({}) } });
  } catch {
    warnings.push("The front matter (the block between --- lines) could not be read and was ignored.");
    fm = matter(source.replace(/^﻿/, "").replace(/^---[\s\S]*?\n---\s*\n?/, ""));
  }
  const meta = frontMatterToMeta(fm.data ?? {});

  const tree = unified().use(remarkParse).use(remarkGfm).use(remarkMath).parse(fm.content) as Root;

  // Footnotes become the References block, numbered in order of first citation.
  const footnoteOrder: string[] = [];
  const footnoteDefs = new Map<string, Content[]>();
  for (const n of tree.children) if (n.type === "footnoteDefinition") footnoteDefs.set(n.identifier, n.children as Content[]);
  const footnoteNumber = (id: string) => {
    let i = footnoteOrder.indexOf(id);
    if (i < 0) i = footnoteOrder.push(id) - 1;
    return i + 1;
  };

  function inline(nodes: PhrasingContent[], marks: Marks = {}): Inline[] {
    const out: Inline[] = [];
    const htmlMarks: Marks[] = [];
    const current = (): Marks => Object.assign({}, marks, ...htmlMarks);
    const push = (s: string, m: Marks) => {
      if (!s) return;
      const last = out[out.length - 1];
      const same = last && last.t === "text" && JSON.stringify({ ...last, text: "" }) === JSON.stringify({ t: "text", text: "", ...m });
      if (same && last.t === "text") last.text += s;
      else out.push({ t: "text", text: s, ...m });
    };
    for (const n of nodes) {
      switch (n.type) {
        case "text":
          push(n.value.replace(/\s*\n\s*/g, " "), current());
          break;
        case "strong":
          out.push(...inline(n.children, { ...current(), b: true }));
          break;
        case "emphasis":
          out.push(...inline(n.children, { ...current(), i: true }));
          break;
        case "delete":
          out.push(...inline(n.children, current()));
          break;
        case "inlineCode":
          push(n.value, { ...current(), code: true });
          break;
        case "break":
          out.push({ t: "br" });
          break;
        case "link": {
          if (isSafeHref(n.url)) out.push(...inline(n.children, { ...current(), href: n.url }));
          else {
            warnings.push(`Removed an unsafe or malformed link: ${truncate(n.url, 60)}`);
            out.push(...inline(n.children, current()));
          }
          break;
        }
        case "inlineMath":
          if (n.value.trim()) out.push({ t: "math", latex: n.value.trim() });
          break;
        case "footnoteReference":
          push(`[${footnoteNumber(n.identifier)}]`, { ...current(), sup: true });
          break;
        case "image":
          warnings.push("An image inside a line of text was skipped: put images on their own line.");
          break;
        case "html": {
          const tag = n.value.trim().toLowerCase();
          const open = /^<(sub|sup|u|b|strong|i|em)>$/.exec(tag);
          const close = /^<\/(sub|sup|u|b|strong|i|em)>$/.exec(tag);
          const key = (name: string): Marks => (name === "sub" ? { sub: true } : name === "sup" ? { sup: true } : name === "u" ? { u: true } : name === "b" || name === "strong" ? { b: true } : { i: true });
          if (open) htmlMarks.push(key(open[1]));
          else if (close) htmlMarks.pop();
          else if (/^<br\s*\/?>$/.test(tag)) out.push({ t: "br" });
          else dropped.add(tag.slice(0, 40));
          break;
        }
        default:
          break;
      }
    }
    // Trim leading/trailing whitespace of the run, keeping inner spacing.
    const first = out[0];
    if (first && first.t === "text") first.text = first.text.replace(/^\s+/, "");
    const last = out[out.length - 1];
    if (last && last.t === "text") last.text = last.text.replace(/\s+$/, "");
    return out.filter((n) => n.t !== "text" || n.text.length > 0);
  }

  const blocks: Block[] = [];

  function listItems(list: Extract<Content, { type: "list" }>, into: Inline[][]) {
    for (const item of list.children) {
      const runs: Inline[] = [];
      for (const child of item.children) {
        if (child.type === "paragraph") {
          if (runs.length) runs.push({ t: "br" });
          runs.push(...inline(child.children));
        } else if (child.type === "list") {
          if (runs.length) {
            into.push(runs.splice(0));
          }
          listItems(child, into);
          warnings.push("A nested list was flattened to a single level.");
        }
      }
      if (runs.length) into.push(runs);
    }
  }

  function row(r: TableRow): Inline[][] {
    return r.children.map((c) => inline(c.children as PhrasingContent[]));
  }

  function referenceFromInline(content: Inline[]): { text: Inline[]; url?: string; doi?: string } {
    let url: string | undefined;
    let doi: string | undefined;
    const text: Inline[] = [];
    for (const n of content) {
      if (n.t === "text" && n.href) {
        const m = /^https?:\/\/(?:dx\.)?doi\.org\/(10\.\S+)$/i.exec(n.href);
        if (m && !doi) {
          doi = m[1];
          continue;
        }
        if (!url && /^https?:\/\//i.test(n.href) && (n.text === n.href || !n.text.trim())) {
          url = n.href;
          continue;
        }
      }
      text.push(n);
    }
    return { text: text.length ? text : content, url, doi };
  }

  const nodes = tree.children as Content[];
  for (let idx = 0; idx < nodes.length; idx++) {
    const n = nodes[idx];
    switch (n.type) {
      case "heading": {
        const content = inline(n.children);
        const plain = inlineText(content);
        if (n.depth === 1) {
          const dupTitle = meta.title && plain.toLowerCase() === meta.title.toLowerCase();
          if (!meta.title && !blocks.length) {
            meta.title = plain;
            break;
          }
          if (dupTitle && !blocks.length) break;
          blocks.push({ type: "heading", level: 2, content });
          break;
        }
        // "References" heading followed by a list -> a proper references block.
        const next = nodes[idx + 1];
        if (/^(references?|bibliography|works cited|sources)$/i.test(plain) && next?.type === "list") {
          const items: Inline[][] = [];
          listItems(next, items);
          blocks.push({ type: "references", items: items.map((it) => referenceFromInline(it)) });
          idx++;
          break;
        }
        blocks.push({ type: "heading", level: n.depth >= 4 ? 4 : (n.depth as 2 | 3), content });
        break;
      }
      case "paragraph": {
        // A paragraph that is only an image becomes an image block.
        const only = n.children.length === 1 ? n.children[0] : null;
        if (only?.type === "image") {
          if (isSafeImageSrc(only.url)) {
            blocks.push({ type: "image", src: only.url, alt: only.alt ?? "", caption: only.title ? [{ t: "text", text: only.title }] : undefined });
          } else {
            warnings.push(`Image not imported (upload it in the editor and insert it there): ${truncate(only.url, 60)}`);
          }
          break;
        }
        const content = inline(n.children);
        if (content.length) blocks.push({ type: "paragraph", content });
        break;
      }
      case "list": {
        const items: Inline[][] = [];
        listItems(n, items);
        if (items.length) blocks.push({ type: "list", ordered: !!n.ordered, items });
        break;
      }
      case "blockquote": {
        const paras = n.children.filter((c): c is Extract<Content, { type: "paragraph" }> => c.type === "paragraph");
        const first = paras[0];
        const head = first?.children[0];
        const m = head?.type === "text" ? /^\[!([A-Za-z]+)\]\s*\n?/.exec(head.value) : null;
        if (first && head?.type === "text" && m && CALLOUT_ALIASES[m[1].toUpperCase()]) {
          const rest = [{ ...head, value: head.value.slice(m[0].length) }, ...first.children.slice(1)] as PhrasingContent[];
          const content: Inline[] = inline(rest);
          for (const p of paras.slice(1)) content.push({ t: "br" }, ...inline(p.children));
          blocks.push({ type: "callout", tone: CALLOUT_ALIASES[m[1].toUpperCase()], content });
          break;
        }
        const content: Inline[] = [];
        for (const p of paras) {
          if (content.length) content.push({ t: "br" });
          content.push(...inline(p.children));
        }
        if (content.length) blocks.push({ type: "quote", content });
        break;
      }
      case "table": {
        const [head, ...body] = n.children;
        if (head) blocks.push({ type: "table", header: row(head), rows: body.map(row) });
        break;
      }
      case "code":
        if (n.lang === "math" || n.lang === "latex" || n.lang === "tex") blocks.push({ type: "equation", latex: n.value });
        else blocks.push({ type: "code", language: n.lang && /^[A-Za-z0-9_+#.-]{1,30}$/.test(n.lang) ? n.lang : undefined, code: n.value });
        break;
      case "math":
        blocks.push({ type: "equation", latex: n.value });
        break;
      case "thematicBreak":
        blocks.push({ type: "divider" });
        break;
      case "html":
        dropped.add(n.value.trim().slice(0, 40));
        break;
      case "footnoteDefinition":
      case "definition":
      case "yaml":
        break;
      default:
        if ("children" in n) warnings.push(`A "${n.type}" element is not supported and was skipped.`);
    }
  }

  if (footnoteOrder.length || footnoteDefs.size) {
    const ordered = [...footnoteOrder, ...[...footnoteDefs.keys()].filter((k) => !footnoteOrder.includes(k))];
    const items = ordered
      .map((id) => {
        const kids = (footnoteDefs.get(id) ?? []) as Content[];
        const p = kids.find((k): k is Extract<Content, { type: "paragraph" }> => k.type === "paragraph");
        return p ? referenceFromInline(inline(p.children)) : null;
      })
      .filter((x): x is NonNullable<typeof x> => !!x);
    if (items.length) blocks.push({ type: "references", items });
  }

  if (dropped.size) warnings.push(`Raw HTML is not allowed and was removed (${[...dropped].slice(0, 3).join(", ")}${dropped.size > 3 ? ", …" : ""}).`);

  const doc: Doc = { version: 1, blocks };

  const missing: ImportResult["missing"] = [];
  if (!meta.title) missing.push("title");
  if (!meta.excerpt) {
    const firstPara = blocks.find((b) => b.type === "paragraph");
    if (firstPara && firstPara.type === "paragraph") meta.excerpt = truncate(inlineText(firstPara.content), 280);
    missing.push("excerpt");
  }
  if (!meta.category) missing.push("category");
  if (!meta.author) missing.push("author");
  if (!blocks.length && !docToText(doc)) warnings.push("The file has no readable content.");

  return { meta, doc, warnings: [...new Set(warnings)], missing };
}
