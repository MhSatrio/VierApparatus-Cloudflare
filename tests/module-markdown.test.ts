import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { docToMarkdown, inlinesToMarkdown } from "@/lib/content/export";
import { buildModuleTemplate, moduleFileName, moduleToMarkdown, type ModuleMdInput } from "@/lib/content/module-export";
import { importModuleMarkdown } from "@/lib/content/module-import";
import { importMarkdown } from "@/lib/content/markdown";
import { inlineText } from "@/lib/content/text";
import type { Doc } from "@/lib/content/schema";

const t = (text: string, m: Record<string, unknown> = {}) => ({ t: "text" as const, text, ...m });

const doc: Doc = {
  version: 1,
  blocks: [
    { type: "heading", level: 2, content: [t("Cell theory")] },
    { type: "paragraph", content: [t("Cells are "), t("the unit", { b: true }), t(" of "), t("life", { i: true }), t(". See "), t("the source", { href: "https://example.org/a" }), t(".")] },
    { type: "heading", level: 3, content: [t("Water")] },
    { type: "paragraph", content: [t("H"), t("2", { sub: true }), t("O and x"), t("2", { sup: true }), t(" with "), { t: "math", latex: "E=mc^2" }, t(".")] },
    { type: "list", ordered: false, items: [[t("first")], [t("second "), t("item", { code: true })]] },
    { type: "list", ordered: true, items: [[t("one")], [t("two")]] },
    { type: "quote", content: [t("A quoted line.")] },
    { type: "table", header: [[t("Part")], [t("Role")]], rows: [[[t("Nucleus")], [t("DNA | storage")]], [[t("Membrane")], [t("Boundary")]]] },
    { type: "code", language: "python", code: "print('hi')\nx = `y`" },
    { type: "equation", latex: "\\frac{a}{b} = c" },
    { type: "image", src: "https://image.vierapparatus.com/modules/2026/11/abc.webp", alt: "A cell", caption: [t("A cell, drawn.")] },
    { type: "callout", tone: "speculation", content: [t("This is a hypothesis.")] },
    { type: "divider" },
  ],
};

describe("document -> Markdown", () => {
  it("writes the formatting the importer reads", () => {
    const md = docToMarkdown(doc);
    expect(md).toContain("## Cell theory");
    expect(md).toContain("**the unit**");
    expect(md).toContain("*life*");
    expect(md).toContain("[the source](https://example.org/a)");
    expect(md).toContain("<sub>2</sub>");
    expect(md).toContain("$E=mc^2$");
    expect(md).toContain("- first");
    expect(md).toContain("1. one");
    expect(md).toContain("> A quoted line.");
    expect(md).toContain("| Part | Role |");
    expect(md).toContain("```python");
    expect(md).toContain("$$\n\\frac{a}{b} = c\n$$");
    expect(md).toContain('![A cell](https://image.vierapparatus.com/modules/2026/11/abc.webp "A cell, drawn.")');
    expect(md).toContain("> [!SPECULATION]");
  });

  it("keeps spaces outside emphasis markers and escapes characters that would change the meaning", () => {
    expect(inlinesToMarkdown([t(" bold ", { b: true })])).toBe(" **bold** ");
    expect(inlinesToMarkdown([t("a * b _ c $5")])).toBe("a \\* b \\_ c \\$5");
  });

  it("round-trips through the importer: same structure, same text", () => {
    const back = importMarkdown(docToMarkdown(doc)).doc;
    const kinds = (d: Doc) => d.blocks.map((b) => b.type);
    expect(kinds(back)).toEqual(kinds(doc));
    const text = (d: Doc) => d.blocks.map((b) => ("content" in b && b.content ? inlineText(b.content) : "")).filter(Boolean);
    expect(text(back)).toEqual(text(doc));
    const table = back.blocks.find((b) => b.type === "table");
    expect(table && table.type === "table" ? inlineText(table.rows[0][1]) : "").toBe("DNA | storage");
    const code = back.blocks.find((b) => b.type === "code");
    expect(code && code.type === "code" ? code.code : "").toBe("print('hi')\nx = `y`");
    const eq = back.blocks.find((b) => b.type === "equation");
    expect(eq && eq.type === "equation" ? eq.latex.trim() : "").toBe("\\frac{a}{b} = c");
    const img = back.blocks.find((b) => b.type === "image");
    expect(img && img.type === "image" ? [img.src, img.alt] : []).toEqual(["https://image.vierapparatus.com/modules/2026/11/abc.webp", "A cell"]);
    const callout = back.blocks.find((b) => b.type === "callout");
    expect(callout && callout.type === "callout" ? callout.tone : "").toBe("speculation");
  });
});

const input: ModuleMdInput = {
  title: "Introduction to Cell Biology",
  slug: "introduction-to-cell-biology",
  subject: "Biology",
  specialization: "General Biology",
  academicLevel: "Basic General Biology",
  description: "Cells and what they do.",
  author: "Editorial",
  status: "draft",
  contentStatus: "drafting",
  prerequisites: ["Basic chemistry"],
  objectives: ["Explain cell theory", 'Name the "organelles"'],
  references: [
    { text: "Placeholder Author. (2020). A reference written for this automated test only. Journal of Tests, 1(1), 1-2.", doi: "10.1234/test.2020.1" },
    { text: "Another Placeholder. (2019). A second reference without any DOI at all. Test Press.", doi: "" },
  ],
  doc,
};

describe("module Markdown: export and import", () => {
  it("exports front matter and the lesson, with the references and their DOI in the front matter", () => {
    const md = moduleToMarkdown(input);
    expect(md.startsWith("---\n")).toBe(true);
    expect(md).toContain('title: "Introduction to Cell Biology"');
    expect(md).toContain('specialization: "General Biology"');
    expect(md).toContain("status: draft");
    expect(md).toContain('  - "Explain cell theory"');
    expect(md).toContain("https://doi.org/10.1234/test.2020.1");
    expect(md).toContain("# Introduction to Cell Biology");
    expect(md).toContain("## Cell theory");
  });

  it("imports what it exported: details, objectives, references with their DOI, and the lesson", () => {
    const r = importModuleMarkdown(moduleToMarkdown(input));
    expect(r.meta).toMatchObject({ title: "Introduction to Cell Biology", slug: "introduction-to-cell-biology", subject: "Biology", specialization: "General Biology", academicLevel: "Basic General Biology", description: "Cells and what they do.", status: "draft", contentStatus: "drafting" });
    expect(r.objectives).toEqual(["Explain cell theory", 'Name the "organelles"']);
    expect(r.prerequisites).toEqual(["Basic chemistry"]);
    expect(r.references).toHaveLength(2);
    expect(r.references[0].doi).toBe("10.1234/test.2020.1");
    expect(r.references[0].text).toMatch(/^Placeholder Author\. \(2020\)\./);
    expect(r.references[0].text).not.toMatch(/doi\.org/);
    expect(r.references[1].doi).toBe("");
    expect(r.doc.blocks.map((b) => b.type)).toEqual(doc.blocks.map((b) => b.type));
    expect(r.doc.blocks.some((b) => b.type === "references")).toBe(false);
  });

  it("reads the template: nothing invented, empty sections reported, objectives and references taken from the body when given there", () => {
    const empty = importModuleMarkdown(buildModuleTemplate());
    expect(empty.meta.title).toBe("Introduction to Cell Biology");
    expect(empty.meta.description).toBeUndefined();
    expect(empty.objectives).toEqual([]);
    expect(empty.references).toEqual([]);
    expect(empty.emptySections).toContain("Introduction");
    expect(empty.emptySections).toContain("Case Studies");
    expect(empty.doc.blocks.some((b) => b.type === "heading" && inlineText(b.content) === "References")).toBe(false);

    const body = importModuleMarkdown(`---
title: A module
---

# A module

## Learning Objectives

- Explain one thing
- Explain another

## Prerequisites

- Arithmetic

## Introduction

Some text here.

## References

- Placeholder Author. (2020). A reference written for this automated test only. Journal of Tests, 1(1), 1-2. https://doi.org/10.1234/test.2020.1
`);
    expect(body.objectives).toEqual(["Explain one thing", "Explain another"]);
    expect(body.prerequisites).toEqual(["Arithmetic"]);
    expect(body.references).toHaveLength(1);
    expect(body.references[0].doi).toBe("10.1234/test.2020.1");
    expect(body.doc.blocks.map((b) => b.type)).toEqual(["heading", "paragraph"]);
  });

  it("never publishes, and says so; reports a reference too short to be one and a DOI that is not a DOI", () => {
    const r = importModuleMarkdown(`---
title: X module
status: published
references:
  - "short"
  - text: "Placeholder Author. (2020). A reference with a broken DOI for this test. Journal."
    doi: "not-a-doi"
---

# X module

Body.
`);
    expect(r.meta.status).toBe("published");
    expect(r.warnings.join(" ")).toMatch(/never publishes/);
    expect(r.warnings.join(" ")).toMatch(/too short/);
    expect(r.warnings.join(" ")).toMatch(/not a valid DOI/);
    expect(r.references).toHaveLength(1);
    expect(r.references[0].doi).toBe("");
  });

  it("does not run JavaScript front matter, and drops raw HTML", () => {
    const r = importModuleMarkdown('---js\n{ title: "pwn" }\n---\n\n# Safe\n\n<script>alert(1)</script>\n\nText.\n');
    expect(r.meta.title).toBe("Safe");
    expect(JSON.stringify(r.doc)).not.toContain("alert");
    expect(r.warnings.join(" ")).toMatch(/Raw HTML/);
  });

  it("ships the generic template as a static file that matches the generator", () => {
    const file = path.join(process.cwd(), "public/templates/module-template.md");
    expect(fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n")).toBe(buildModuleTemplate());
  });

  it("names a download after the title", () => {
    expect(moduleFileName("Introduction to Cell Biology!")).toBe("introduction-to-cell-biology.md");
    expect(moduleFileName("!!!")).toBe("module.md");
  });
});
