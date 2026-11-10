import matter from "gray-matter";
import { importMarkdown } from "./markdown";
import type { Block, Doc } from "./schema";
import { inlineText, truncate } from "./text";
import { CONTENT_STATUSES, normalizeDoi, parseReferenceLines, type ContentStatus, type Reference } from "../modules/shared";

/**
 * Module Markdown -> the fields of the module editor. The lesson itself is converted by the same importer the articles use
 * (markdown.ts), so a module accepts exactly the Markdown an article accepts: headings, emphasis, lists, tables, equations, code,
 * images, links, quotes, callouts and footnotes. On top of that, this reads the module's front matter, and lifts three kinds of
 * section out of the body into their own fields: "Learning Objectives", "Prerequisites" and "References".
 *
 * Nothing is saved and nothing is invented: what the file does not say stays empty, and every change the importer makes is
 * reported in `warnings` for the person to review before saving.
 */

export type ModuleImportMeta = {
  title?: string;
  slug?: string;
  subject?: string;
  specialization?: string;
  academicLevel?: string;
  description?: string;
  author?: string;
  /** What the file says; the module is never published by importing it. */
  status?: string;
  contentStatus?: ContentStatus;
};

export type ModuleImport = {
  meta: ModuleImportMeta;
  objectives: string[];
  prerequisites: string[];
  references: Reference[];
  doc: Doc;
  warnings: string[];
  /** Headings that have no text under them yet (a template skeleton is full of them). */
  emptySections: string[];
};

const str = (v: unknown): string | undefined => {
  if (typeof v === "string" || typeof v === "number") {
    const s = String(v).trim();
    return s || undefined;
  }
  return undefined;
};

/** A YAML field that may be a list or one multi-line string, as a list of non-empty lines. */
const asLines = (v: unknown): string[] =>
  Array.isArray(v) ? v.map((x) => (typeof x === "string" || typeof x === "number" ? String(x).trim() : "")).filter(Boolean) : typeof v === "string" ? v.split(/\r?\n/).map((x) => x.replace(/^\s*[-*]\s+/, "").trim()).filter(Boolean) : [];

const headingText = (b: Block) => (b.type === "heading" ? inlineText(b.content).trim() : "");
const OBJECTIVES = /^(learning\s+)?objectives?$/i;
const PREREQS = /^(prerequisites?|before you start)$/i;
const REFS = /^(references?|bibliography|works cited|sources)$/i;

/** Takes the section called `name` (a heading and the list under it) out of the blocks. An empty section is dropped; the items are returned. */
function liftSection(blocks: Block[], name: RegExp): string[] | null {
  const at = blocks.findIndex((b) => b.type === "heading" && name.test(headingText(b)));
  if (at < 0) return null;
  const next = blocks[at + 1];
  if (next?.type === "list") {
    const items = next.items.map((it) => inlineText(it).trim()).filter(Boolean);
    blocks.splice(at, 2);
    return items;
  }
  if (!next || next.type === "heading") {
    blocks.splice(at, 1);
    return [];
  }
  return null; // prose under the heading: leave it in the lesson
}

export function importModuleMarkdown(source: string): ModuleImport {
  const warnings: string[] = [];
  let data: Record<string, unknown> = {};
  try {
    // gray-matter's default engine can evaluate JavaScript front matter ("---js"). Never allow that.
    data = matter(source.replace(/^﻿/, ""), { engines: { js: () => ({}), javascript: () => ({}) } }).data ?? {};
  } catch {
    warnings.push("The front matter (the block between --- lines) could not be read and was ignored.");
  }
  const base = importMarkdown(source);
  warnings.push(...base.warnings);
  const blocks = [...base.doc.blocks];

  const status = str(data.status)?.toLowerCase();
  const cs = str(data.content_status ?? data.contentStatus)?.toLowerCase().replace(/[\s-]+/g, "_");
  const meta: ModuleImportMeta = {
    title: str(data.title) ?? base.meta.title,
    slug: str(data.slug),
    subject: str(data.subject),
    specialization: str(data.specialization),
    academicLevel: str(data.academic_level ?? data.academicLevel ?? data.level),
    description: str(data.description) ?? str(data.summary) ?? str(data.excerpt),
    author: str(data.author),
    status,
    contentStatus: CONTENT_STATUSES.find((c) => c === cs),
  };
  if (status && status !== "draft") warnings.push(`The file says status "${status}". Importing never publishes: the module keeps its own publication status, and publishing stays a separate step.`);

  // objectives and prerequisites: the front matter wins; otherwise the section of the body
  const bodyObjectives = liftSection(blocks, OBJECTIVES);
  const bodyPrereq = liftSection(blocks, PREREQS);
  const objectives = asLines(data.learning_objectives ?? data.objectives);
  const prerequisites = asLines(data.prerequisites);
  if (!objectives.length && bodyObjectives?.length) objectives.push(...bodyObjectives);
  if (!prerequisites.length && bodyPrereq?.length) prerequisites.push(...bodyPrereq);

  // references: those in the front matter, then those the body lists (a "References" section or footnotes)
  const refs: Reference[] = [];
  const seen = new Set<string>();
  const add = (text: string, doi: string) => {
    const t = text.replace(/\s+/g, " ").trim();
    if (!t) return;
    if (t.length < 10) {
      warnings.push(`A reference was skipped because it is too short to be a citation: "${truncate(t, 40)}".`);
      return;
    }
    const key = t.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    refs.push({ text: t, doi });
  };
  const fmRefs = Array.isArray(data.references) ? data.references : typeof data.references === "string" ? [data.references] : [];
  for (const r of fmRefs) {
    if (r && typeof r === "object" && "text" in r) {
      const o = r as { text?: unknown; doi?: unknown };
      const doi = normalizeDoi(String(o.doi ?? "")) ?? "";
      if (o.doi && !doi) warnings.push(`"${truncate(String(o.doi), 40)}" is not a valid DOI and was left out.`);
      add(String(o.text ?? ""), doi);
    } else if (typeof r === "string") {
      for (const x of parseReferenceLines(r)) add(x.text, x.doi);
    }
  }
  for (let i = blocks.length - 1; i >= 0; i--) {
    const b = blocks[i];
    if (b.type === "references") {
      for (const it of b.items) {
        const doi = it.doi ? (normalizeDoi(it.doi) ?? "") : "";
        add(`${inlineText(it.text)}${it.url && !doi ? ` ${it.url}` : ""}`, doi);
      }
      blocks.splice(i, 1);
    } else if (b.type === "heading" && REFS.test(headingText(b)) && (!blocks[i + 1] || blocks[i + 1].type === "heading")) {
      blocks.splice(i, 1); // an empty "References" heading from the template
    }
  }

  // headings with nothing under them yet
  const emptySections: string[] = [];
  blocks.forEach((b, i) => {
    if (b.type === "heading" && (!blocks[i + 1] || blocks[i + 1].type === "heading")) {
      const next = blocks[i + 1];
      if (!next || (next.type === "heading" && next.level <= b.level)) emptySections.push(headingText(b));
    }
  });

  const doc: Doc = { version: 1, blocks };
  if (!blocks.length) warnings.push("The file has no lesson text under the title yet.");
  return { meta, objectives, prerequisites, references: refs, doc, warnings: [...new Set(warnings)], emptySections };
}
