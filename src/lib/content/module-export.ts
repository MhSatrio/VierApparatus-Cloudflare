import type { Doc } from "./schema";
import { docToMarkdown } from "./export";
import type { ContentStatus, PublicationStatus, Reference } from "../modules/shared";
import { doiUrl, normalizeDoi } from "../modules/shared";

/**
 * The Markdown format of a learning module: YAML front matter (the module's details) followed by its lesson in Markdown. This
 * file has no server code, so the editor writes the template and the export itself, from what is on screen. Reading the format
 * back is module-import.ts (it needs the server-side parser).
 */

export type ModuleMdInput = {
  title: string;
  slug?: string;
  subject: string;
  specialization: string;
  academicLevel: string;
  description: string;
  author: string;
  status: PublicationStatus;
  contentStatus?: ContentStatus;
  prerequisites: string[];
  objectives: string[];
  references: Reference[];
  doc: Doc;
};

/** A JSON string is a valid YAML double-quoted scalar, which is the simplest way to quote anything safely. */
const q = (s: string) => JSON.stringify(s);
const list = (key: string, items: string[]) => (items.length ? `${key}:\n${items.map((i) => `  - ${q(i)}`).join("\n")}` : `${key}: []`);

/** A reference as one line: the APA text, then its DOI as a link (the importer reads that back as the DOI). */
export const referenceLine = (r: Reference) => {
  const doi = r.doi ? normalizeDoi(r.doi) : null;
  return doi ? `${r.text} ${doiUrl(doi)}` : r.text;
};

export function moduleToMarkdown(m: ModuleMdInput): string {
  const front = [
    "---",
    `title: ${q(m.title)}`,
    ...(m.slug ? [`slug: ${q(m.slug)}`] : []),
    `subject: ${q(m.subject)}`,
    `specialization: ${q(m.specialization)}`,
    `academic_level: ${q(m.academicLevel)}`,
    `description: ${q(m.description)}`,
    `author: ${q(m.author)}`,
    `status: ${m.status}`,
    ...(m.contentStatus ? [`content_status: ${m.contentStatus}`] : []),
    list("prerequisites", m.prerequisites),
    list("learning_objectives", m.objectives),
    list("references", m.references.map(referenceLine)),
    "---",
  ];
  const body = docToMarkdown(m.doc);
  return `${front.join("\n")}\n\n# ${m.title}\n\n${body}${body ? "\n" : ""}`;
}

export type TemplateContext = { subject?: string; specialization?: string; academicLevel?: string; title?: string; author?: string };

/**
 * The blank module the importer understands, ready to be filled in outside the site and imported later. The body is a skeleton:
 * the importer accepts any structure, so every heading can be changed, removed or added to.
 */
export function buildModuleTemplate(c: TemplateContext = {}): string {
  const title = c.title || "Introduction to Cell Biology";
  return `---
# VierApparatus learning module. Fill in the details below, write the lesson under the title, then import this file
# in the Module Editor (Import / export tab). Nothing is published by importing: you review and save first.
title: ${q(title)}
subject: ${q(c.subject || "Biology")}
specialization: ${q(c.specialization || "General Biology")}
academic_level: ${q(c.academicLevel || "Basic")}
description: ""
author: ${q(c.author || "VierApparatus")}
status: draft
prerequisites: []
learning_objectives: []
references: []
# description: one or two sentences saying what the module covers.
# learning_objectives: what the learner will be able to do, one per line, for example
#   - "Explain what a cell is."
# references: one APA 7th edition reference per line, followed by its DOI link when it has one, for example
#   - "Author, A. (2020). Title of the work. Journal Name, 1(2), 3-4. https://doi.org/10.1234/abcd"
# Only genuine, verifiable sources. Never invent a citation or a DOI. Empty fields are fine: the importer fills in nothing for you.
---

# ${title}

## Learning Objectives

## Introduction

## 1. Historical Background

## 2. Cell Theory

## 3. Cellular Organization

### 3.1 Prokaryotic Cells

### 3.2 Eukaryotic Cells

## Practical Applications

## Case Studies

## Knowledge Check

## Further Reading

## References
`;
}

/** A download name for a module file. */
export const moduleFileName = (title: string, ext = "md") => `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "module"}.${ext}`;
