import type { Block, CalloutTone, Doc, Inline, TextInline } from "./schema";
import { escapeHtml, inlineText, slugify } from "./text";

/**
 * The one renderer. It turns the canonical document into an HTML string used by:
 *  - the public article page,
 *  - the admin preview (which renders the very same page component),
 *  - the visual editor's inline editing surface (inlineToHtml).
 * Output is built only from escaped text and a fixed tag whitelist, so stored content can never inject markup.
 */

export type Heading = { id: string; text: string; level: 2 | 3 | 4 };
export type Rendered = { html: string; hasMath: boolean; headings: Heading[] };

const isExternal = (href: string) => /^https?:\/\//i.test(href);

function textNodeHtml(n: TextInline): string {
  let out = escapeHtml(n.text);
  if (n.code) out = `<code>${out}</code>`;
  if (n.b) out = `<strong>${out}</strong>`;
  if (n.i) out = `<em>${out}</em>`;
  if (n.u) out = `<u>${out}</u>`;
  if (n.sub) out = `<sub>${out}</sub>`;
  if (n.sup) out = `<sup>${out}</sup>`;
  if (n.href) {
    const ext = isExternal(n.href);
    out = `<a href="${escapeHtml(n.href)}"${ext ? ' target="_blank" rel="noopener noreferrer"' : ""}>${out}</a>`;
  }
  return out;
}

export function inlineToHtml(content: Inline[] | undefined): string {
  if (!content) return "";
  return content
    .map((n) => {
      if (n.t === "text") return textNodeHtml(n);
      if (n.t === "br") return "<br>";
      return `<span class="math-inline" data-latex="${escapeHtml(n.latex)}">\\(${escapeHtml(n.latex)}\\)</span>`;
    })
    .join("");
}

const TONE_LABEL: Record<CalloutTone, string> = {
  note: "Note",
  caution: "Caution",
  commentary: "Commentary",
  speculation: "Speculation",
};

export const calloutLabel = (tone: CalloutTone) => TONE_LABEL[tone];

function hasMathInline(c: Inline[] | undefined) {
  return !!c?.some((n) => n.t === "math");
}

export function renderDoc(doc: Doc): Rendered {
  const headings: Heading[] = [];
  const used = new Set<string>();
  let hasMath = false;
  let refCount = 0;

  const uniqueId = (base: string) => {
    let id = base || "section";
    for (let i = 2; used.has(id); i++) id = `${base || "section"}-${i}`;
    used.add(id);
    return id;
  };

  const parts: string[] = [];
  for (const b of doc.blocks) parts.push(renderBlock(b));
  return { html: parts.join("\n"), hasMath, headings };

  function renderBlock(b: Block): string {
    switch (b.type) {
      case "heading": {
        const text = inlineText(b.content);
        const id = uniqueId(slugify(text, 60));
        headings.push({ id, text, level: b.level });
        hasMath ||= hasMathInline(b.content);
        return `<h${b.level} id="${id}">${inlineToHtml(b.content)}</h${b.level}>`;
      }
      case "paragraph": {
        hasMath ||= hasMathInline(b.content);
        const cls = b.align && b.align !== "left" ? ` class="ta-${b.align}"` : "";
        return `<p${cls}>${inlineToHtml(b.content)}</p>`;
      }
      case "image": {
        const dims = b.width && b.height ? ` width="${b.width}" height="${b.height}"` : "";
        const cap = b.caption?.length || b.credit;
        hasMath ||= hasMathInline(b.caption);
        return (
          `<figure class="article-figure">` +
          `<img src="${escapeHtml(b.src)}" alt="${escapeHtml(b.alt)}"${dims} loading="lazy" decoding="async" referrerpolicy="no-referrer">` +
          (cap
            ? `<figcaption>${inlineToHtml(b.caption)}${b.credit ? `${b.caption?.length ? " " : ""}<span class="credit">${escapeHtml(b.credit)}</span>` : ""}</figcaption>`
            : "") +
          `</figure>`
        );
      }
      case "list": {
        const tag = b.ordered ? "ol" : "ul";
        for (const it of b.items) hasMath ||= hasMathInline(it);
        return `<${tag}>${b.items.map((it) => `<li>${inlineToHtml(it)}</li>`).join("")}</${tag}>`;
      }
      case "quote": {
        hasMath ||= hasMathInline(b.content);
        return `<blockquote><p>${inlineToHtml(b.content)}</p>${b.cite ? `<footer>${escapeHtml(b.cite)}</footer>` : ""}</blockquote>`;
      }
      case "table": {
        const cells = [...b.header, ...b.rows.flat()];
        for (const c of cells) hasMath ||= hasMathInline(c);
        const head = b.header.length
          ? `<thead><tr>${b.header.map((c) => `<th scope="col">${inlineToHtml(c)}</th>`).join("")}</tr></thead>`
          : "";
        const body = `<tbody>${b.rows.map((r) => `<tr>${r.map((c) => `<td>${inlineToHtml(c)}</td>`).join("")}</tr>`).join("")}</tbody>`;
        const cap = b.caption?.length ? `<caption>${inlineToHtml(b.caption)}</caption>` : "";
        return `<div class="table-wrap" role="region" tabindex="0" aria-label="${escapeHtml(inlineText(b.caption) || "Table")}"><table>${cap}${head}${body}</table></div>`;
      }
      case "code": {
        const cls = b.language ? ` class="language-${escapeHtml(b.language)}"` : "";
        return `<pre tabindex="0"><code${cls}>${escapeHtml(b.code)}</code></pre>`;
      }
      case "equation":
        hasMath = true;
        return `<div class="math-display" data-latex="${escapeHtml(b.latex)}">\\[${escapeHtml(b.latex)}\\]</div>`;
      case "divider":
        return "<hr>";
      case "callout": {
        hasMath ||= hasMathInline(b.content);
        const title = b.title?.trim() || TONE_LABEL[b.tone];
        return `<aside class="callout callout-${b.tone}" role="note"><p class="callout-title">${escapeHtml(title)}</p><p>${inlineToHtml(b.content)}</p></aside>`;
      }
      case "references": {
        refCount++;
        const id = uniqueId("references");
        headings.push({ id, text: "References", level: 2 });
        const items = b.items
          .map((it, i) => {
            hasMath ||= hasMathInline(it.text);
            const doi = it.doi ? ` <a href="https://doi.org/${escapeHtml(it.doi)}" target="_blank" rel="noopener noreferrer">https://doi.org/${escapeHtml(it.doi)}</a>` : "";
            const url = it.url ? ` <a href="${escapeHtml(it.url)}"${isExternal(it.url) ? ' target="_blank" rel="noopener noreferrer"' : ""}>${escapeHtml(it.url)}</a>` : "";
            return `<li id="ref-${refCount}-${i + 1}">${inlineToHtml(it.text)}${doi}${url}</li>`;
          })
          .join("");
        return `<section class="references" aria-labelledby="${id}"><h2 id="${id}">References</h2><ol>${items}</ol></section>`;
      }
      case "embed":
        return (
          `<figure class="article-embed"><div class="embed-frame"><iframe src="https://www.youtube-nocookie.com/embed/${b.videoId}" ` +
          `title="${escapeHtml(b.title)}" loading="lazy" allow="encrypted-media; picture-in-picture" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div>` +
          `<figcaption>${escapeHtml(b.title)}</figcaption></figure>`
        );
    }
  }
}
