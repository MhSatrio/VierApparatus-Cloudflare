import Link from "next/link";
import type { Metadata } from "next";
import { ContentsList } from "@/components/modules/ContentsList";
import { JsonLd } from "@/components/JsonLd";
import { LandingAds, loadLandingAds } from "@/components/modules/LandingAds";
import { ModuleShell } from "@/components/modules/ModuleShell";
import { loadTree, redirectOrNotFound } from "@/lib/modules/loaders";
import { countModules, levelLabel, moduleHref, specHref } from "@/lib/modules/shared";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ subject: string; spec: string; level: string }> };

export async function generateMetadata({ params }: Ctx): Promise<Metadata> {
  const { subject, spec, level } = await params;
  const tree = await loadTree(subject, spec);
  const lv = tree?.levels.find((l) => l.slug === level);
  if (!tree || !lv) return { robots: { index: false } };
  return { title: `${lv.name} · ${tree.spec.name}`, description: lv.description, alternates: { canonical: moduleHref(subject, spec, level) } };
}

/** An academic level: its description and its table of contents. A contents page, so advertising is allowed here. */
export default async function LevelPage({ params }: Ctx) {
  const { subject, spec, level } = await params;
  const tree = await loadTree(subject, spec);
  const at = tree ? tree.levels.findIndex((l) => l.slug === level) : -1;
  if (!tree || at < 0) return redirectOrNotFound(subject, spec, level);
  const lv = tree.levels[at];
  const prev = tree.levels[at - 1];
  const next = tree.levels[at + 1];
  const c = countModules(lv.nodes);
  const ads = await loadLandingAds();
  return (
    <ModuleShell tree={tree} activeLevel={lv.slug}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${lv.name} (${tree.spec.name})`,
          description: lv.description,
          url: `${site.url}${moduleHref(subject, spec, level)}`,
          isPartOf: { "@type": "CollectionPage", name: `${tree.spec.name} learning modules`, url: `${site.url}${specHref(subject, spec)}` },
        }}
      />
      <div className={ads.any ? "xl:grid xl:grid-cols-[minmax(0,1fr)_16rem] xl:gap-10" : ""}>
        <div className="min-w-0">
          <nav aria-label="Breadcrumb" className="text-sm text-ink/70">
            <Link href="/module" className="hover:text-brand">
              Modules
            </Link>{" / "}
            <Link href={`/module/${subject}`} className="hover:text-brand">
              {tree.subject.name}
            </Link>{" / "}
            <Link href={specHref(subject, spec)} className="hover:text-brand">
              {tree.spec.name}
            </Link>{" "}
            / {lv.name}
          </nav>
          <p className="mt-5 text-sm font-semibold text-brand">{levelLabel(lv)}</p>
          <h1 className="mt-1 text-3xl sm:text-5xl">{lv.name}</h1>
          <p className="mt-4 max-w-3xl text-lg text-ink/85">{lv.description}</p>
          <p className="mt-3 text-sm text-ink/70">{c.total === 0 ? "The modules of this level are in preparation." : `${c.readable} of ${c.total} modules available. The others are coming soon.`}</p>

          <h2 className="sr-only">Table of contents</h2>
          <div className="mt-8">
            <ContentsList tree={tree} level={lv} />
          </div>

          <nav aria-label="Other levels" className="mt-12 grid gap-4 sm:grid-cols-2">
            {prev ? (
              <Link prefetch={false} href={moduleHref(subject, spec, prev.slug)} className="rounded-xl border border-ink/10 p-4 hover:border-brand/60">
                <span className="text-xs font-semibold uppercase tracking-wide text-ink/60">Previous level</span>
                <span className="mt-1 block font-semibold">{prev.name}</span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link prefetch={false} href={moduleHref(subject, spec, next.slug)} className="rounded-xl border border-ink/10 p-4 text-right hover:border-brand/60">
                <span className="text-xs font-semibold uppercase tracking-wide text-ink/60">Next level</span>
                <span className="mt-1 block font-semibold">{next.name}</span>
              </Link>
            )}
          </nav>
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
