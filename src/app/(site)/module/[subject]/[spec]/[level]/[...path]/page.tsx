import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { MathEnhancer } from "@/components/MathEnhancer";
import { ModuleShell } from "@/components/modules/ModuleShell";
import { ReadAloudBar } from "@/components/modules/ReadAloudBar";
import { SectionNav, SectionNavMobile } from "@/components/modules/SectionNav";
import { loadModule, redirectOrNotFound } from "@/lib/modules/loaders";
import { doiUrl, levelLabel, moduleHref, specHref } from "@/lib/modules/shared";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ subject: string; spec: string; level: string; path: string[] }> };

export async function generateMetadata({ params }: Ctx): Promise<Metadata> {
  const { subject, spec, level, path } = await params;
  const p = await loadModule(subject, spec, level, path.join("/"));
  if (!p) return { robots: { index: false } };
  return {
    title: `${p.node.title} · ${p.spec.name}`,
    description: p.summary || p.objectives[0] || `${p.node.title}, a ${p.level.name} module of ${p.spec.name}.`,
    alternates: { canonical: moduleHref(subject, spec, level, path) },
  };
}

/**
 * A lesson. Left: the curriculum. Centre: the lesson. Right: the sections of this lesson. Nothing else competes for the reader's
 * attention: there is NO advertising or sponsorship on this page or any page under it, by rule (and a test checks that this file
 * never imports the advertising components).
 */
export default async function ModuleReadingPage({ params }: Ctx) {
  const { subject, spec, level, path } = await params;
  const p = await loadModule(subject, spec, level, path.join("/"));
  if (!p) return redirectOrNotFound(subject, spec, level, ...path);
  const base = `/module/${subject}`;
  const sections = [...p.headings.filter((h) => h.level <= 3).map((h) => ({ id: h.id, text: h.text, level: h.level })), ...(p.references.length ? [{ id: "module-references", text: "References", level: 2 as const }] : [])];
  const chapters = p.node.children;
  const url = `${site.url}${moduleHref(subject, spec, level, path)}`;
  return (
    <ModuleShell tree={p.tree} activeLevel={p.level.slug} activeId={p.node.id} moduleId={p.node.id}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "LearningResource",
          name: p.node.title,
          description: p.summary || undefined,
          url,
          inLanguage: "en",
          educationalLevel: p.level.name,
          about: `${p.subject.name}: ${p.spec.name}`,
          teaches: p.objectives.length ? p.objectives : undefined,
          dateModified: p.updatedAt,
          datePublished: p.publishedAt ?? undefined,
          publisher: { "@type": "Organization", name: site.name, url: site.url },
          isPartOf: { "@type": "CollectionPage", name: `${p.level.name} (${p.spec.name})`, url: `${site.url}${moduleHref(subject, spec, level)}` },
        }}
      />
      <article className="module-reading">
        <nav aria-label="Breadcrumb" className="text-sm text-ink/70">
          <Link href="/module" className="hover:text-brand">
            Modules
          </Link>{" / "}
          <Link href={base} className="hover:text-brand">
            {p.subject.name}
          </Link>
          {" / "}
          <Link href={specHref(subject, spec)} className="hover:text-brand">
            {p.spec.name}
          </Link>
          {p.crumbs.map((c) => (
            <span key={c.href}>
              {" / "}
              <Link href={c.href} className="hover:text-brand">
                {c.title}
              </Link>
            </span>
          ))}
        </nav>

        <div className="mt-5 xl:grid xl:grid-cols-[minmax(0,1fr)_13rem] xl:gap-10">
          <div className="min-w-0">
            <SectionNavMobile headings={sections} />
            <header className="max-w-3xl">
              <p className="text-sm font-semibold text-brand">{levelLabel(p.level)}</p>
              <h1 className="mt-1 text-3xl sm:text-5xl">{p.node.title}</h1>
              {p.summary && <p className="mt-4 text-xl text-ink/85">{p.summary}</p>}
              <p className="mt-4 text-sm text-ink/70">
                {p.readingMinutes} min read
                {p.updatedAt && (
                  <>
                    {" · Updated "}
                    <time dateTime={p.updatedAt}>{new Date(p.updatedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}</time>
                  </>
                )}
              </p>
            </header>

            <div className="mt-6 max-w-3xl">
              <ReadAloudBar />
            </div>

            <div className="mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
              {p.objectives.length > 0 && (
                <section aria-labelledby="objectives" className="rounded-xl border border-ink/10 bg-sky/30 p-5">
                  <h2 id="objectives" className="text-lg">
                    Learning objectives
                  </h2>
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    {p.objectives.map((o) => (
                      <li key={o}>{o}</li>
                    ))}
                  </ul>
                </section>
              )}
              {p.prerequisites.length > 0 && (
                <section aria-labelledby="prerequisites" className="rounded-xl border border-ink/10 p-5">
                  <h2 id="prerequisites" className="text-lg">
                    Before you start
                  </h2>
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    {p.prerequisites.map((o) => (
                      <li key={o}>{o}</li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            <div className="prose-article mt-10 max-w-3xl" data-narration-root dangerouslySetInnerHTML={{ __html: p.html }} />
            {p.hasMath && <MathEnhancer html={p.html} />}

            {chapters.length > 0 && (
              <section aria-labelledby="chapters" className="mt-10 max-w-3xl">
                <h2 id="chapters" className="text-2xl">
                  Chapters in this module
                </h2>
                <ul className="mt-3 divide-y divide-ink/10 rounded-xl border border-ink/10">
                  {chapters.map((c) => (
                    <li key={c.id} className="px-4 py-3">
                      {c.readable ? (
                        <Link prefetch={false} href={moduleHref(subject, spec, level, c.trail)} data-module-id={c.id} className="mod-link font-semibold text-brand underline underline-offset-4">
                          {c.title}
                        </Link>
                      ) : (
                        <span className="font-semibold text-ink/75">
                          {c.title} <span className="text-xs font-normal">(coming soon)</span>
                        </span>
                      )}
                      {c.summary && <p className="mt-1 text-sm text-ink/75">{c.summary}</p>}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {p.references.length > 0 && (
              <section aria-labelledby="module-references" className="mt-12 max-w-3xl">
                <h2 id="module-references" className="text-2xl">
                  References
                </h2>
                <ol className="mt-4 space-y-3 text-[0.95rem]">
                  {p.references.map((r, i) => (
                    <li key={i} className="pl-1">
                      {r.text}
                      {r.doi && (
                        <>
                          {" "}
                          <a href={doiUrl(r.doi)} target="_blank" rel="noopener noreferrer" className="break-all text-brand underline underline-offset-4">
                            {doiUrl(r.doi)}
                          </a>
                        </>
                      )}
                    </li>
                  ))}
                </ol>
                <p className="mt-4 text-xs text-ink/60">Callouts marked Commentary or Speculation in the lesson separate interpretation and open questions from established findings.</p>
              </section>
            )}

            <nav aria-label="Previous and next module" className="mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
              {p.prev ? (
                <Link prefetch={false} href={p.prev.href} rel="prev" className="rounded-xl border border-ink/10 p-4 hover:border-brand/60">
                  <span className="text-xs font-semibold uppercase tracking-wide text-ink/60">Previous</span>
                  <span className="mt-1 block font-semibold">{p.prev.title}</span>
                </Link>
              ) : (
                <span />
              )}
              {p.next && (
                <Link prefetch={false} href={p.next.href} rel="next" className="rounded-xl border border-ink/10 p-4 text-right hover:border-brand/60">
                  <span className="text-xs font-semibold uppercase tracking-wide text-ink/60">Next</span>
                  <span className="mt-1 block font-semibold">{p.next.title}</span>
                </Link>
              )}
            </nav>
          </div>
          <SectionNav headings={sections} />
        </div>
      </article>
    </ModuleShell>
  );
}
