import type { Block, Doc, Inline, TextInline } from "./schema";

/**
 * Canonical document -> Markdown: the reverse of importMarkdown (markdown.ts). Pure text in, text out, with no server code, so the
 * editor can export what is on screen (saved or not) straight from the browser. What the importer reads is what this writes:
 * headings, emphasis, links, lists, tables, quotes, code, equations ($…$ and $$…$$), images, callouts ("> [!NOTE]"), and
 * references with their DOI. Two things cannot round-trip because the importer has no syntax for them: paragraph alignment and
 * the embedded video (it is exported as a plain link).
 */

const ESCAPE = /([\\`*_[\]<>$|])/g;
const escapeText = (s: string) => s.replace(ESCAPE, "\\$1");

function mark(t: TextInline): string {
  if (t.code) {
    const ticks = "`".repeat(Math.max(1, ...[...t.text.matchAll(/`+/g)].map((m) => m[0].length + 1)));
    const pad = t.text.startsWith("`") || t.text.endsWith("`") ? " " : "";
    return `${ticks}${pad}${t.text}${pad}${ticks}`;
  }
  // emphasis markers must hug the text: spaces at the edges go outside them
  const lead = /^\s*/.exec(t.text)![0];
  const trail = /\s*$/.exec(t.text.slice(lead.length))![0];
  const core = t.text.slice(lead.length, t.text.length - trail.length);
  if (!core) return t.text;
  let s = escapeText(core);
  if (t.sub) s = `<sub>${s}</sub>`;
  if (t.sup) s = `<sup>${s}</sup>`;
  if (t.u) s = `<u>${s}</u>`;
  if (t.i) s = `*${s}*`;
  if (t.b) s = `**${s}**`;
  if (t.href) s = `[${s}](${t.href.replace(/[()\s]/g, (c) => encodeURIComponent(c))})`;
  return lead + s + trail;
}

/** Inline content as one line of Markdown. `br` becomes a hard line break, or `<br>` where a line break would end the construct (table cells). */
export function inlinesToMarkdown(content: Inline[] | undefined, opts: { br?: string } = {}): string {
  const br = opts.br ?? "\\\n";
  return (content ?? [])
    .map((n) => (n.t === "text" ? mark(n) : n.t === "math" ? `$${n.latex.replace(/\$/g, "\\$")}$` : br))
    .join("");
}

const plain = (content: Inline[] | undefined) => inlinesToMarkdown(content);
const indentLines = (s: string, prefix: string) => s.split("\n").map((l, i) => (i === 0 ? l : prefix + l)).join("\n");
const quoted = (s: string) => s.split("\n").map((l) => (l ? `> ${l}` : ">")).join("\n");

function blockToMarkdown(b: Block): string {
  switch (b.type) {
    case "heading":
      return `${"#".repeat(b.level)} ${inlinesToMarkdown(b.content, { br: " " })}`;
    case "paragraph":
      return plain(b.content);
    case "image": {
      const cap = [b.caption ? inlinesToMarkdown(b.caption, { br: " " }).replace(/\\([\\`*_[\]<>$|])/g, "$1") : "", b.credit ? `Credit: ${b.credit}` : ""].filter(Boolean).join(" ");
      const alt = b.alt.replace(/[[\]]/g, "");
      return `![${alt}](${b.src}${cap ? ` "${cap.replace(/"/g, '\\"')}"` : ""})`;
    }
    case "list":
      return b.items.map((it, i) => `${b.ordered ? `${i + 1}. ` : "- "}${indentLines(plain(it), b.ordered ? "   " : "  ")}`).join("\n");
    case "quote":
      return quoted(plain(b.content));
    case "table": {
      const cell = (c: Inline[]) => inlinesToMarkdown(c, { br: "<br>" }).replace(/\|/g, "\\|").replace(/\\\\\|/g, "\\|") || " ";
      const head = `| ${b.header.map(cell).join(" | ")} |`;
      const sep = `| ${b.header.map(() => "---").join(" | ")} |`;
      const rows = b.rows.map((r) => `| ${b.header.map((_, i) => cell(r[i] ?? [])).join(" | ")} |`);
      return [head, sep, ...rows].join("\n");
    }
    case "code": {
      const fence = "`".repeat(Math.max(3, ...[...b.code.matchAll(/`+/g)].map((m) => m[0].length + 1)));
      return `${fence}${b.language ?? ""}\n${b.code}\n${fence}`;
    }
    case "equation":
      return `$$\n${b.latex}\n$$`;
    case "divider":
      return "---";
    case "references":
      return [
        "## References",
        "",
        ...b.items.map((r) => {
          const doi = r.doi ? ` <https://doi.org/${r.doi}>` : "";
          const url = r.url && !r.doi ? ` <${r.url}>` : "";
          return `- ${plain(r.text)}${doi}${url}`;
        }),
      ].join("\n");
    case "callout": {
      const tag = b.tone === "note" ? "NOTE" : b.tone === "caution" ? "CAUTION" : b.tone === "commentary" ? "COMMENTARY" : "SPECULATION";
      const body = plain(b.content);
      return quoted(`[!${tag}]\n${b.title ? `**${escapeText(b.title)}** ` : ""}${body}`);
    }
    case "embed":
      return `[${escapeText(b.title)}](https://www.youtube.com/watch?v=${b.videoId})`;
  }
}

export function docToMarkdown(doc: Doc): string {
  return doc.blocks.map(blockToMarkdown).join("\n\n");
}
