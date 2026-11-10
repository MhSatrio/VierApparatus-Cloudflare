import { cache } from "react";
import { notFound, permanentRedirect } from "next/navigation";
import { findRedirect, getModulePage, getSubjectTree, getSubjectWithSpecializations } from "../store/modules";

/**
 * Per-request caches for the public module pages. A page and its generateMetadata both need the same tree or module, and this
 * makes them share one database read instead of two.
 */
export const loadTree = cache((subject: string, spec: string) => getSubjectTree(subject, spec));
export const loadSpecializations = cache((subject: string) => getSubjectWithSpecializations(subject));
export const loadModule = cache((subject: string, spec: string, level: string, trail: string) => getModulePage(subject, spec, level, trail ? trail.split("/") : []));

/**
 * A page that found nothing: if the address is an old one (a renamed subject or level, or the structure before specializations
 * existed) send the visitor, permanently, to where it lives now; otherwise it is a plain 404.
 */
export async function redirectOrNotFound(...segments: string[]): Promise<never> {
  const to = await findRedirect(`/module/${segments.filter(Boolean).join("/")}`);
  if (to) permanentRedirect(to);
  notFound();
}
