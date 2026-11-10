import { describe, expect, it } from "vitest";
import { importMarkdown } from "@/lib/content/markdown";
import { renderDoc, inlineToHtml } from "@/lib/content/render";
import { docSchema, isSafeHref, isSafeImageSrc, parseDoc } from "@/lib/content/schema";
import { docToText, readingMinutes, slugify } from "@/lib/content/text";

const md = `---
title: "Understanding MIC"
slug: understanding-mic
description: "An introduction to MIC and its role in antimicrobial testing."
category: Microbiology
author: Test Author
tags: [mic, antibiotics]
published: false
---

# Understanding MIC

Intro with **bold**, *italic*, H<sub>2</sub>O, x<sup>2</sup>, \`code\` and [a link](https://example.com).

## Equation

The rate is $k = A e^{-E_a/RT}$.

$$
E = mc^2
$$

| Drug | MIC (mg/L) |
|---|---|
| A | 0.5 |

- one
- two
  - nested

> [!COMMENTARY]
> My own view.

![Plate](https://example.org/plate.png "Agar plate")

Claim.[^1]

[^1]: Rehman et al. (2023) https://doi.org/10.3389/fphar.2023.1213824
`;

describe("markdown import", () => {
  const r = importMarkdown(md);
  it("reads front matter and drops the duplicate H1", () => {
    expect(r.meta.title).toBe("Understanding MIC");
    expect(r.meta.excerpt).toMatch(/introduction to MIC/);
    expect(r.meta.published).toBe(false);
    expect(r.meta.tags).toEqual(["mic", "antibiotics"]);
    expect(r.missing).toEqual([]);
    expect(r.doc.blocks[0]).toMatchObject({ type: "paragraph" });
  });
  it("produces a valid canonical document", () => {
    expect(docSchema.safeParse(r.doc).success).toBe(true);
    const types = r.doc.blocks.map((b) => b.type);
    expect(types).toEqual(expect.arrayContaining(["heading", "paragraph", "equation", "table", "list", "callout", "image", "references"]));
  });
  it("keeps sub/sup html and marks, flattens nested lists with a warning", () => {
    const html = renderDoc(r.doc).html;
    expect(html).toContain("<sub>2</sub>");
    expect(html).toContain("<sup>2</sup>");
    expect(html).toContain("<strong>bold</strong>");
    expect(html).toContain('<a href="https://example.com" target="_blank" rel="noopener noreferrer">a link</a>');
    expect(r.warnings.join(" ")).toMatch(/nested list/);
  });
  it("turns footnotes into references with a doi", () => {
    const refs = r.doc.blocks.find((b) => b.type === "references");
    expect(refs && refs.type === "references" && refs.items[0].doi).toBe("10.3389/fphar.2023.1213824");
  });
  it("renders math placeholders and flags hasMath", () => {
    const out = renderDoc(r.doc);
    expect(out.hasMath).toBe(true);
    expect(out.html).toContain('class="math-display"');
    expect(out.html).toContain('class="math-inline"');
  });
  it("reports missing metadata and takes the title from the first H1", () => {
    const x = importMarkdown("# Only a title\n\nSome text here that is long enough to be an excerpt.\n");
    expect(x.meta.title).toBe("Only a title");
    expect(x.missing).toEqual(expect.arrayContaining(["excerpt", "category", "author"]));
    expect(x.meta.excerpt).toMatch(/Some text/);
  });
  it("removes raw HTML and unsafe links and never evaluates js front matter", () => {
    const x = importMarkdown('---js\n{ title: require("fs") }\n---\n\n<script>alert(1)</script>\n\nHello [x](javascript:alert(1)) <img src=x onerror=alert(1)> end.\n');
    const html = renderDoc(x.doc).html;
    expect(html).not.toMatch(/<script|onerror|javascript:/i);
    expect(x.warnings.join(" ")).toMatch(/Raw HTML|unsafe/i);
  });
});

describe("renderer", () => {
  it("escapes text and attributes", () => {
    const html = inlineToHtml([{ t: "text", text: '<b>"x"</b> & y' }]);
    expect(html).toBe("&lt;b&gt;&quot;x&quot;&lt;/b&gt; &amp; y");
  });
  it("gives headings unique ids and lists them", () => {
    const out = renderDoc({
      version: 1,
      blocks: [
        { type: "heading", level: 2, content: [{ t: "text", text: "Methods" }] },
        { type: "heading", level: 2, content: [{ t: "text", text: "Methods" }] },
        { type: "references", items: [{ text: [{ t: "text", text: "A paper" }], doi: "10.1000/xyz" }] },
      ],
    });
    expect(out.headings.map((h) => h.id)).toEqual(["methods", "methods-2", "references"]);
    expect(out.html).toContain('https://doi.org/10.1000/xyz');
  });
  it("renders the same HTML for the same canonical doc regardless of how it was made", () => {
    const a = importMarkdown("## Title\n\nHello **world**.\n").doc;
    const b = { version: 1 as const, blocks: [{ type: "heading" as const, level: 2 as const, content: [{ t: "text" as const, text: "Title" }] }, { type: "paragraph" as const, content: [{ t: "text" as const, text: "Hello " }, { t: "text" as const, text: "world", b: true as const }, { t: "text" as const, text: "." }] }] };
    expect(renderDoc(a).html).toBe(renderDoc(b).html);
  });
});

describe("schema guards", () => {
  it("rejects unsafe urls", () => {
    expect(isSafeHref("https://a.b")).toBe(true);
    expect(isSafeHref("/x")).toBe(true);
    expect(isSafeHref("//evil.com")).toBe(false);
    expect(isSafeHref("javascript:alert(1)")).toBe(false);
    expect(isSafeHref("data:text/html,x")).toBe(false);
    expect(isSafeImageSrc("/media/abc")).toBe(true);
    expect(isSafeImageSrc("http://insecure.example/x.png")).toBe(false);
  });
  it("rejects malformed documents", () => {
    expect(parseDoc({ version: 1, blocks: [{ type: "paragraph", content: [{ t: "text", text: "x", href: "javascript:1" }] }] }).ok).toBe(false);
    expect(parseDoc({ version: 2, blocks: [] }).ok).toBe(false);
  });
});

describe("text helpers", () => {
  it("slugifies, extracts text and estimates reading time", () => {
    expect(slugify("Écoles & Méthodes: Intro!")).toBe("ecoles-and-methodes-intro");
    const doc = importMarkdown("Hello world.\n\n- a\n- b\n").doc;
    expect(docToText(doc)).toContain("Hello world.");
    expect(readingMinutes("word ".repeat(440))).toBe(2);
  });
});
