/**
 * Learning-module vocabulary and pure helpers, shared by the server store and by browser components. It imports nothing from
 * the database layer, so a client component can use it without pulling server code into the bundle.
 *
 * The shape of the platform:
 *   subject (Biology)  ->  specialization (Bioinformatics)  ->  level (Foundations, Core, ...)  ->  discipline (a grouping heading)  ->  module  ->  chapter
 * The public address of a module is /module/<subject>/<specialization>/<level>/<module>, and of a chapter .../<module>/<chapter>.
 */

export const CONTENT_STATUSES = ["not_started", "outlined", "drafting", "scientific_review", "final"] as const;
export type ContentStatus = (typeof CONTENT_STATUSES)[number];
export const CONTENT_STATUS_LABEL: Record<ContentStatus, string> = {
  not_started: "Not started",
  outlined: "Outlined",
  drafting: "Drafting",
  scientific_review: "Scientific review",
  final: "Final",
};

export const PUBLICATION_STATUSES = ["draft", "published", "archived"] as const;
export type PublicationStatus = (typeof PUBLICATION_STATUSES)[number];
export const PUBLICATION_LABEL: Record<PublicationStatus, string> = { draft: "Draft", published: "Published", archived: "Archived" };

export type NodeKind = "discipline" | "module" | "chapter";
export const NODE_KIND_LABEL: Record<NodeKind, string> = { discipline: "Discipline", module: "Module", chapter: "Chapter" };

/** The smallest body a module can have and still be published. A module is a lesson, not a heading. */
export const MIN_PUBLISH_WORDS = 100;

/** One entry of the reference list. `text` is the full APA 7th edition reference; `doi` is the bare DOI (10.xxxx/...), or empty. */
export type Reference = { text: string; doi: string };

/** Reads a DOI from what people paste: a bare DOI, "doi:10....", or a https://doi.org/... link. Returns null if it is not a DOI. */
export function normalizeDoi(raw: string): string | null {
  const t = raw
    .trim()
    .replace(/^https?:\/\/(dx\.)?doi\.org\//i, "")
    .replace(/^doi:\s*/i, "");
  return /^10\.\d{4,9}\/\S+$/.test(t) && t.length <= 200 ? t : null;
}

export const doiUrl = (doi: string) => `https://doi.org/${doi.split("/").map(encodeURIComponent).join("/")}`;

/** Address of a module page. `trail` is the module's slug followed by the slugs of nested chapters. */
export const moduleHref = (subjectSlug: string, specSlug: string, levelSlug: string, trail: string[] = []) =>
  ["/module", subjectSlug, specSlug, levelSlug, ...trail].filter(Boolean).join("/");

export const specHref = (subjectSlug: string, specSlug: string) => `/module/${subjectSlug}/${specSlug}`;

/** A main subject (Biology, Chemistry, ...) or, with the same shape, one of its specializations. Both live in one table. */
export type SubjectInfo = { id: string; slug: string; name: string; tagline: string; description: string; accent: string; sort: number; coverUrl: string; coverThumbUrl: string };
export type SpecializationInfo = SubjectInfo & { subjectSlug: string };
export type LevelInfo = { id: string; slug: string; num: number; name: string; description: string };

/** A node of the table of contents. Only what the navigation needs: no body text. */
export type TreeNode = {
  id: string;
  kind: NodeKind;
  slug: string;
  title: string;
  summary: string;
  status: PublicationStatus;
  contentStatus: ContentStatus;
  /** Whether a reader can open it: published and with a body. Everything else is shown as "coming soon". */
  readable: boolean;
  readingMinutes: number;
  /** Slugs from the module down to this node (empty for a discipline). */
  trail: string[];
  /** Set on a module that belongs to another specialization and is only listed here: where its page really is. */
  linkHref?: string;
  /** The id of the link row (not of the module), so a shared entry can be removed from this level. */
  linkId?: string;
  children: TreeNode[];
};

export type TreeLevel = LevelInfo & { nodes: TreeNode[] };
/** One specialization with its academic levels. `subject` is the main subject above it. */
export type SubjectTree = { subject: SubjectInfo; spec: SpecializationInfo; levels: TreeLevel[] };

/** The address of a node as listed in a level: a shared module links to its real page. */
export const nodeHref = (tree: SubjectTree, level: { slug: string }, n: { trail: string[]; linkHref?: string }) => n.linkHref ?? moduleHref(tree.subject.slug, tree.spec.slug, level.slug, n.trail);

export type Crumb = { title: string; href: string };

/** Depth-first list of everything a reader can open, in curriculum order. Used for Previous / Next and for progress. */
export function readableSequence(tree: SubjectTree): { id: string; title: string; href: string; levelName: string }[] {
  const out: { id: string; title: string; href: string; levelName: string }[] = [];
  const walk = (nodes: TreeNode[], level: TreeLevel) => {
    for (const n of nodes) {
      if (n.readable && n.kind !== "discipline" && !n.linkHref) out.push({ id: n.id, title: n.title, href: moduleHref(tree.subject.slug, tree.spec.slug, level.slug, n.trail), levelName: level.name });
      walk(n.children, level);
    }
  };
  for (const level of tree.levels) walk(level.nodes, level);
  return out;
}

/** Counts of modules (not disciplines or chapters) in a list of nodes. */
export function countModules(nodes: TreeNode[]): { total: number; readable: number } {
  let total = 0;
  let readable = 0;
  const walk = (list: TreeNode[]) => {
    for (const n of list) {
      if (n.kind === "module") {
        total++;
        if (n.readable) readable++;
      }
      walk(n.children);
    }
  };
  walk(nodes);
  return { total, readable };
}

export const levelLabel = (l: { num: number; name: string }) => `Level ${String(l.num).padStart(2, "0")} · ${l.name}`;

/**
 * Reads a pasted list of references, one per line. A DOI anywhere in a line (a bare DOI, "doi:10....", or a https://doi.org/ link)
 * is taken out of the text and kept as the reference's DOI, so it is shown once, as a link. Blank lines are ignored.
 */
export function parseReferenceLines(input: string): Reference[] {
  const out: Reference[] = [];
  for (const raw of input.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) continue;
    const m = /(?:https?:\/\/(?:dx\.)?doi\.org\/|doi:\s*)?(10\.\d{4,9}\/[^\s"<>]+)/i.exec(line);
    if (!m) {
      out.push({ text: line, doi: "" });
      continue;
    }
    const doi = m[1].replace(/[.,;)\]]+$/, "");
    const text = (line.slice(0, m.index) + line.slice(m.index + m[0].length)).replace(/\s{2,}/g, " ").replace(/[\s,;:]+$/, "").trim();
    out.push({ text: text.length >= 10 ? text : line, doi: normalizeDoi(doi) ?? "" });
  }
  return out;
}
