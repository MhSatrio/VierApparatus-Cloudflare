/**
 * Markdown template generator. It writes the front matter that the existing importer (markdown.ts, frontMatterToMeta) reads,
 * so a generated template imports back with the same title, summary, topic, author, tags, cover and SEO fields. Keys the
 * importer does not use (articleId) are written for reference and ignored on import.
 *
 * Pure function: no database, no browser APIs. It is used by the editor's Markdown tab and by the unit tests.
 */

export type TemplateInput = {
  title: string;
  slug: string;
  excerpt: string;
  categoryName: string | null;
  authorName: string;
  tags: string[];
  coverUrl: string | null;
  coverAlt: string;
  coverCredit: string;
  seoTitle: string;
  seoDescription: string;
  /** Permanent article ID (a_…), or null for an article that has not been saved yet. */
  articleId: string | null;
  /** Publication date as YYYY-MM-DD. */
  date: string;
};

/** A YAML double-quoted string. JSON string syntax is valid YAML, so this escapes quotes and line breaks safely. */
const yamlString = (s: string) => JSON.stringify(s.replace(/\r?\n/g, " ").trim());

const line = (key: string, value: string, hint: string) => `${key}: ${value}${hint ? `  # ${hint}` : ""}`;

export function buildMarkdownTemplate(i: TemplateInput): string {
  const slug = i.slug.trim();
  const tags = i.tags.map((t) => t.trim()).filter(Boolean).slice(0, 12);
  const front = [
    "---",
    line("title", yamlString(i.title), "the headline readers see (3+ characters)"),
    line("slug", yamlString(slug), "the web address after /articles/; leave empty to generate it from the title"),
    line("description", yamlString(i.excerpt), "1–2 sentences shown on cards and in search results (20+ characters)"),
    line("category", yamlString(i.categoryName ?? ""), "must match an existing topic name"),
    line("author", yamlString(i.authorName), "the byline readers see"),
    line("tags", `[${tags.map(yamlString).join(", ")}]`, "keywords, for example [\"microbiology\", \"methods\"]"),
    line("date", yamlString(i.date), "publication date, YYYY-MM-DD"),
    line("coverImage", yamlString(i.coverUrl ?? ""), "HTTPS address of the cover image (optional)"),
    line("coverImageAlt", yamlString(i.coverAlt), "describe the cover image for people who cannot see it"),
    line("coverImageSource", yamlString(i.coverCredit), "who made the image, and its licence"),
    line("seoTitle", yamlString(i.seoTitle), "title for search engines (up to 70 characters; empty = the headline)"),
    line("seoDescription", yamlString(i.seoDescription), "summary for search engines (up to 170 characters; empty = the summary)"),
    line("articleId", yamlString(i.articleId ?? ""), "reference only: the permanent Article ID (ignored on import)"),
    "---",
  ];

  const body = [
    "",
    "## Introduction",
    "",
    "[State the question and why it matters. One or two paragraphs.]",
    "",
    "## Background",
    "",
    "[Summarise what is already established. Cite each source as a footnote, for example a claim.[^1]]",
    "",
    "## Evidence or method",
    "",
    "[Describe the data, the method or the argument. Say clearly what was measured, what was reported and what is inferred.]",
    "",
    "> [!NOTE]",
    "> [A note for readers. Use [!COMMENTARY] for your own view and [!SPECULATION] for a guess, so readers can tell them apart.]",
    "",
    "## Discussion",
    "",
    "[Interpret the evidence and state its limits.]",
    "",
    "## Conclusion",
    "",
    "[The short answer to the question in the introduction.]",
    "",
    "[^1]: Replace with a real source: Author, A. (Year). Title of the work. Journal, volume(issue), pages. https://doi.org/10.xxxx/xxxxx",
    "",
  ];

  return [...front, ...body].join("\n");
}

/** The fields the template fills in automatically, for the editor's explanation. */
export const TEMPLATE_FILLED_FIELDS = ["title", "slug", "description", "category", "author", "tags", "date", "coverImage", "coverImageAlt", "coverImageSource", "seoTitle", "seoDescription", "articleId"] as const;
