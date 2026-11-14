import { cache } from "react";
import { notFound, permanentRedirect } from "next/navigation";
import { ttlMemo } from "../memo";
import { findRedirect, getModulePage, getSubjectTree, getSubjectWithSpecializations } from "../store/modules";

/**
 * Per-request caches for the public module pages. A page and its generateMetadata both need the same tree or module, and this
 * makes them share one database read instead of two.
 */
/**
 * The tree of one specialization (levels, every module's title and status) is the same for all of its lessons, and building it costs
 * three round trips plus CPU. A crawler walking a specialization asks for it hundreds of times, so one server instance keeps each tree
 * for 30 seconds (a missing one too, so junk addresses do not repeat the lookups). The lesson text itself is never cached here.
 */
const cachedTree = ttlMemo(getSubjectTree, { ttlMs: 30_000, max: 60, key: (subject, spec) => `${subject}/${spec}` });

export const loadTree = cache((subject: string, spec: string) => cachedTree(subject, spec));
export const loadSpecializations = cache((subject: string) => getSubjectWithSpecializations(subject));
export const loadModule = cache(async (subject: string, spec: string, level: string, trail: string) =>
  getModulePage(subject, spec, level, trail ? trail.split("/") : [], { tree: await cachedTree(subject, spec) }),
);

/**
 * A page that found nothing: if the address is an old one (a renamed subject or level, or the structure before specializations
 * existed) send the visitor, permanently, to where it lives now; otherwise it is a plain 404.
 */
export async function redirectOrNotFound(...segments: string[]): Promise<never> {
  const to = await findRedirect(`/module/${segments.filter(Boolean).join("/")}`);
  if (to) permanentRedirect(to);
  notFound();
}
