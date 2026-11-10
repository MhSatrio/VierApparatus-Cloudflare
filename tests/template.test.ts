import { describe, expect, it } from "vitest";
import { buildMarkdownTemplate, type TemplateInput } from "@/lib/content/template";
import { importMarkdown } from "@/lib/content/markdown";

const base: TemplateInput = {
  title: "Why \"fast\" antibiotics fail: a short review",
  slug: "why-fast-antibiotics-fail",
  excerpt: "A short review of the reasons rapid antibiotic tests miss resistance.",
  categoryName: "Microbiology",
  authorName: "Muhammad Satrio",
  tags: ["antibiotics", "resistance", "methods"],
  coverUrl: "https://example.org/cover.jpg",
  coverAlt: "A petri dish with a clear zone around a disc",
  coverCredit: "Photo by Example Author, CC BY 4.0",
  seoTitle: "Why fast antibiotic tests fail",
  seoDescription: "Reasons rapid antibiotic susceptibility tests can miss resistance.",
  articleId: "a_AbCdEf123456_x",
  date: "2026-11-08",
};

describe("Markdown template generator", () => {
  it("writes a front matter block with every field the importer reads", () => {
    const md = buildMarkdownTemplate(base);
    expect(md.startsWith("---\n")).toBe(true);
    for (const key of ["title", "slug", "description", "category", "author", "tags", "date", "coverImage", "coverImageAlt", "coverImageSource", "seoTitle", "seoDescription", "articleId"]) {
      expect(md).toMatch(new RegExp(`^${key}: `, "m"));
    }
    expect(md).toContain("\n---\n");
  });

  it("imports back into the same metadata (round trip)", () => {
    const r = importMarkdown(buildMarkdownTemplate(base));
    expect(r.meta).toMatchObject({
      title: base.title,
      slug: base.slug,
      excerpt: base.excerpt,
      category: "Microbiology",
      author: base.authorName,
      tags: base.tags,
      date: base.date,
      coverImage: base.coverUrl,
      coverAlt: base.coverAlt,
      coverCredit: base.coverCredit,
      seoTitle: base.seoTitle,
      seoDescription: base.seoDescription,
    });
    expect(r.missing).toEqual([]);
  });

  it("escapes quotes and line breaks so the front matter stays valid", () => {
    const md = buildMarkdownTemplate({ ...base, title: "Line one\nline two: with a colon", excerpt: "Has \"quotes\" and a colon: yes" });
    const r = importMarkdown(md);
    expect(r.meta.title).toBe("Line one line two: with a colon");
    expect(r.meta.excerpt).toBe("Has \"quotes\" and a colon: yes");
  });

  it("leaves unfilled fields empty and reports what the owner still has to supply", () => {
    const md = buildMarkdownTemplate({ ...base, title: "", excerpt: "", categoryName: null, authorName: "", coverUrl: null, articleId: null });
    const r = importMarkdown(md);
    expect(r.meta.title).toBeUndefined();
    expect(r.missing).toEqual(expect.arrayContaining(["title", "excerpt", "category", "author"]));
    expect(md).toContain('articleId: ""');
  });

  it("includes the content placeholders, the callout examples and a footnote for references", () => {
    const md = buildMarkdownTemplate(base);
    for (const h of ["## Introduction", "## Background", "## Evidence or method", "## Discussion", "## Conclusion"]) expect(md).toContain(h);
    expect(md).toContain("> [!NOTE]");
    expect(md).toMatch(/\[\^1\]: .*https:\/\/doi\.org\//);
  });

  it("caps tags at twelve and drops empty ones", () => {
    const many = Array.from({ length: 20 }, (_, i) => `tag${i}`);
    const md = buildMarkdownTemplate({ ...base, tags: [" ", ...many] });
    expect(md).toContain('"tag0"');
    expect(md).not.toContain('"tag12"');
  });
});
