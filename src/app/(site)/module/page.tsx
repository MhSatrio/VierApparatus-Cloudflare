import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { Cover } from "@/components/modules/Cover";
import { site } from "@/lib/site";
import { listSubjects } from "@/lib/store/modules";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Learning modules",
  description: "Structured science learning from absolute beginner to doctoral research: biology and its specializations, chemistry, physics, mathematics, computer science and statistics.",
  alternates: { canonical: "/module" },
};

/** The entry to the learning platform: choose a subject. (No advertising on this page.) */
export default async function ModulesPage() {
  const subjects = await listSubjects();
  const bio = subjects.find((s) => s.slug === "bio");
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "VierApparatus learning modules",
          url: `${site.url}/module`,
          hasPart: subjects.map((s) => ({ "@type": "CollectionPage", name: s.name, url: `${site.url}/module/${s.slug}` })),
        }}
      />
      <section className="bg-sky/40 py-14 sm:py-20">
        <div className="container-page">
          <p className="eyebrow">Learn</p>
          <h1 className="mt-3 max-w-3xl text-4xl sm:text-5xl">Study science, level by level</h1>
          <p className="mt-5 max-w-2xl text-lg text-ink/85">
            Structured learning modules that take you from the first principles to doctoral and postdoctoral research. Choose a subject, follow its academic levels, and read at your own pace.
          </p>
          {bio && (
            <p className="mt-8 flex flex-wrap gap-3">
              <Link href="/module/bio" className="btn btn-primary">
                Start with Biology
              </Link>
              <a href="#subjects" className="btn btn-secondary">
                See all subjects
              </a>
            </p>
          )}
        </div>
      </section>

      <section id="subjects" aria-labelledby="subjects-title" className="bg-white py-14 sm:py-16">
        <div className="container-page">
          <h2 id="subjects-title" className="text-3xl">
            Choose a subject
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((s) => {
              const pct = s.moduleCount ? Math.round((s.readableCount / s.moduleCount) * 100) : 0;
              return (
                <li key={s.id}>
                  <Link href={`/module/${s.slug}`} className="group flex h-full flex-col rounded-xl border border-ink/10 bg-white p-6 shadow-card transition-colors hover:border-brand/60">
                    <Cover thumb={s.coverThumbUrl} art={s.slug} />
                    <h3 className="mt-5 text-2xl group-hover:text-brand">{s.name}</h3>
                    <p className="mt-1 text-ink/80">{s.tagline}</p>
                    <div className="mt-auto pt-5">
                      {s.moduleCount > 0 ? (
                        <>
                          <div className="h-1.5 overflow-hidden rounded-full bg-ink/10" role="img" aria-label={`${s.readableCount} of ${s.moduleCount} modules available`}>
                            <div className="h-full rounded-full bg-brand" style={{ width: `${pct}%` }} />
                          </div>
                          <p className="mt-2 text-sm text-ink/70">
                            {s.specializationCount} {s.specializationCount === 1 ? "specialization" : "specializations"} · {s.readableCount} of {s.moduleCount} modules available
                          </p>
                        </>
                      ) : (
                        <p className="text-sm text-ink/70">
                          {s.specializationCount} {s.specializationCount === 1 ? "specialization" : "specializations"} · curriculum in preparation
                        </p>
                      )}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="how-title" className="border-t border-ink/10 bg-white py-14 sm:py-16">
        <div className="container-page">
          <h2 id="how-title" className="text-3xl">
            How the modules are organised
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="text-xl">Subjects and specializations</h3>
              <p className="mt-2 text-ink/85">Choose a main subject, then a specialization: Biology, for example, opens into General Biology, Molecular Biology, Bioinformatics, Biomedical Sciences and more.</p>
            </div>
            <div>
              <h3 className="text-xl">Academic levels and modules</h3>
              <p className="mt-2 text-ink/85">Every specialization is divided into academic levels, from foundations for an absolute beginner up to PhD and postdoctoral research. Inside a level, modules are grouped by discipline.</p>
            </div>
            <div>
              <h3 className="text-xl">Chapters and sections</h3>
              <p className="mt-2 text-ink/85">Larger modules are split into chapters. While you read, the sections of the page stay one click away on the right.</p>
            </div>
          </div>
          <div className="mt-10 rounded-xl border border-ink/10 bg-sky/30 p-6">
            <h3 className="text-xl">Our standards</h3>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-ink/85">
              <li>References are real and checkable, in APA 7th edition, with a DOI link whenever the source has one.</li>
              <li>Established knowledge is kept apart from hypotheses, disputed findings and speculation, which are marked in the text.</li>
              <li>Depth grows with the level: beginner modules start from scratch; doctoral modules discuss current literature, limits of the methods and open questions.</li>
              <li>A module appears as a lesson only after it has been written and reviewed. Until then it is listed as coming soon.</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
