import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { LandingAds, loadLandingAds } from "@/components/modules/LandingAds";
import { Cover } from "@/components/modules/Cover";
import { SpecializationGrid } from "@/components/modules/SpecializationGrid";
import { loadSpecializations, redirectOrNotFound } from "@/lib/modules/loaders";
import { specHref } from "@/lib/modules/shared";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ subject: string }> };

export async function generateMetadata({ params }: Ctx): Promise<Metadata> {
  const group = await loadSpecializations((await params).subject);
  if (!group) return { robots: { index: false } };
  return { title: `${group.subject.name} learning modules`, description: group.subject.description, alternates: { canonical: `/module/${group.subject.slug}` } };
}

/** A main subject: its description and the specializations to choose from. Advertising is allowed here (a landing page, not a lesson). */
export default async function SubjectPage({ params }: Ctx) {
  const { subject } = await params;
  const group = await loadSpecializations(subject);
  if (!group) return redirectOrNotFound(subject);
  const { subject: sub, specializations } = group;
  const ads = await loadLandingAds();
  const total = specializations.reduce((a, s) => a + s.moduleCount, 0);
  const readable = specializations.reduce((a, s) => a + s.readableCount, 0);
  return (
    <div className="bg-white">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${sub.name} learning modules`,
          description: sub.description,
          url: `${site.url}/module/${sub.slug}`,
          isPartOf: { "@type": "CollectionPage", name: "VierApparatus learning modules", url: `${site.url}/module` },
          hasPart: specializations.map((s) => ({ "@type": "CollectionPage", name: s.name, url: `${site.url}${specHref(sub.slug, s.slug)}` })),
        }}
      />
      <div className="container-page py-8 lg:py-12">
        <div className={ads.any ? "xl:grid xl:grid-cols-[minmax(0,1fr)_16rem] xl:gap-10" : ""}>
          <div className="min-w-0">
            <nav aria-label="Breadcrumb" className="text-sm text-ink/70">
              <Link href="/module" className="hover:text-brand">
                Modules
              </Link>{" "}
              / {sub.name}
            </nav>
            <header className="mt-4 flex flex-wrap items-center gap-5">
              <Cover thumb={sub.coverThumbUrl} art={sub.slug} />
              <div className="min-w-0">
                <h1 className="text-3xl sm:text-5xl">{sub.name}</h1>
                <p className="mt-1 text-lg text-ink/80">{sub.tagline}</p>
              </div>
            </header>
            <p className="mt-6 max-w-3xl text-lg text-ink/85">{sub.description}</p>
            <p className="mt-4 text-sm text-ink/70">
              {specializations.length} {specializations.length === 1 ? "specialization" : "specializations"} · {total === 0 ? "curriculum in preparation" : `${readable} of ${total} modules available`}
            </p>

            <h2 className="mt-12 text-2xl sm:text-3xl" id="specializations">Choose a specialization</h2>
            {specializations.length === 0 ? (
              <p className="mt-5 rounded-xl border border-dashed border-ink/25 p-6 text-ink/70">The specializations of {sub.name} are in preparation.</p>
            ) : (
              <SpecializationGrid
                subjectName={sub.name}
                items={specializations.map((s) => ({
                  id: s.id,
                  slug: s.slug,
                  name: s.name,
                  description: s.description,
                  coverThumbUrl: s.coverThumbUrl,
                  href: specHref(sub.slug, s.slug),
                  art: s.slug,
                  levelCount: s.levelCount,
                  moduleCount: s.moduleCount,
                  readableCount: s.readableCount,
                }))}
              />
            )}
          </div>
          {ads.any && (
            <div className="mt-10 xl:mt-0">
              <LandingAds ads={ads} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
