import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { LandingAds, loadLandingAds } from "@/components/modules/LandingAds";
import { Cover } from "@/components/modules/Cover";
import { ModuleShell } from "@/components/modules/ModuleShell";
import { loadTree, redirectOrNotFound } from "@/lib/modules/loaders";
import { countModules, levelLabel, moduleHref, readableSequence, specHref } from "@/lib/modules/shared";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ subject: string; spec: string }> };

export async function generateMetadata({ params }: Ctx): Promise<Metadata> {
  const { subject, spec } = await params;
  const tree = await loadTree(subject, spec);
  if (!tree) return { robots: { index: false } };
  return { title: `${tree.spec.name} · ${tree.subject.name}`, description: tree.spec.description, alternates: { canonical: specHref(subject, spec) } };
}

/** A specialization's landing page: what it covers, and its academic levels. The curriculum is always beside it. Advertising is allowed here. */
export default async function SpecializationPage({ params }: Ctx) {
  const { subject, spec } = await params;
  const tree = await loadTree(subject, spec);
  if (!tree) return redirectOrNotFound(subject, spec);
  const ads = await loadLandingAds();
  const all = countModules(tree.levels.flatMap((l) => l.nodes));
  const first = readableSequence(tree)[0];
  const here = specHref(tree.subject.slug, tree.spec.slug);
  return (
    <ModuleShell tree={tree}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${tree.spec.name} learning modules`,
          description: tree.spec.description,
          url: `${site.url}${here}`,
          isPartOf: { "@type": "CollectionPage", name: `${tree.subject.name} learning modules`, url: `${site.url}/module/${tree.subject.slug}` },
        }}
      />
      <div className={ads.any ? "xl:grid xl:grid-cols-[minmax(0,1fr)_16rem] xl:gap-10" : ""}>
        <div className="min-w-0">
          <nav aria-label="Breadcrumb" className="text-sm text-ink/70">
            <Link href="/module" className="hover:text-brand">
              Modules
            </Link>{" / "}
            <Link href={`/module/${tree.subject.slug}`} className="hover:text-brand">
              {tree.subject.name}
            </Link>{" "}
            / {tree.spec.name}
          </nav>
          <header className="mt-4 flex flex-wrap items-center gap-5">
            <Cover thumb={tree.spec.coverThumbUrl} art={tree.spec.slug} spec />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-brand">{tree.subject.name}</p>
              <h1 className="mt-1 text-3xl sm:text-5xl">{tree.spec.name}</h1>
            </div>
          </header>
          <p className="mt-6 max-w-3xl text-lg text-ink/85">{tree.spec.description}</p>
          <p className="mt-4 text-sm text-ink/70">
            {tree.levels.length} academic levels · {all.total === 0 ? "curriculum in preparation" : `${all.readable} of ${all.total} modules available`}
          </p>
          {first && (
            <p className="mt-5">
              <Link href={first.href} className="btn btn-primary">
                Start reading: {first.title}
              </Link>
            </p>
          )}

          <h2 className="mt-12 text-2xl sm:text-3xl">Academic levels</h2>
          <ol className="mt-5 grid gap-5 md:grid-cols-2">
            {tree.levels.map((l) => {
              const c = countModules(l.nodes);
              const disciplines = l.nodes.filter((n) => n.kind === "discipline").map((n) => n.title);
              return (
                <li key={l.id}>
                  <Link prefetch={false} href={moduleHref(tree.subject.slug, tree.spec.slug, l.slug)} className="block h-full rounded-xl border border-ink/10 bg-white p-5 shadow-card transition-colors hover:border-brand/60">
                    <p className="text-sm font-semibold text-brand">{levelLabel(l)}</p>
                    <p className="mt-2 text-ink/85">{l.description}</p>
                    {disciplines.length > 0 && <p className="mt-3 text-sm text-ink/65">{disciplines.slice(0, 4).join(" · ")}</p>}
                    <p className="mt-3 text-sm font-semibold">{c.total === 0 ? "In preparation" : `${c.readable} of ${c.total} modules available`}</p>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
        {ads.any && (
          <div className="mt-10 xl:mt-0">
            <LandingAds ads={ads} />
          </div>
        )}
      </div>
    </ModuleShell>
  );
}
