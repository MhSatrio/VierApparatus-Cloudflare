import type { Metadata } from "next";
import { ScreenshotCarousel, type Shot } from "@/components/software/ScreenshotCarousel";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Software",
  description: "Scientific tools and research utilities made by VierApparatus. VierStation, a local research workspace for organising biological data, starts with version 0.2.0.",
  alternates: { canonical: "/software" },
};

/**
 * Software page. Each application is one section in the same layout; to add an application, add a section below and its
 * screenshots under public/images/software/. VierStation is the only one for now.
 */
const VIERSTATION = {
  version: "0.2.0",
  platform: "Windows",
  download: "https://github.com/VierApparatus/VierStation/releases/download/v0.2.0/VierStation-Setup-0.2.0.exe",
  release: "https://github.com/VierApparatus/VierStation/releases/tag/v0.2.0",
  video: "https://www.youtube-nocookie.com/embed/4TMJ7baJzeE",
};

const SHOTS: Shot[] = [
  { src: "/images/software/01-vierstation-sequence-lab.webp", alt: "VierStation Sequence Lab showing a merged DNA sequence and a log of the steps applied to it", caption: "Sequence Lab: a merged DNA sequence, with a log of each step" },
  { src: "/images/software/02-vierstation-phylogenetic-tree.webp", alt: "VierStation phylogenetic tree with labelled branches, bootstrap support values and the tree settings", caption: "Phylogenetic tree with bootstrap support values" },
  { src: "/images/software/03-vierstation-proteins.webp", alt: "VierStation Proteins list with the details of the selected protein beside it", caption: "Proteins: a list of records, with the details of the selected one" },
  { src: "/images/software/04-vierstation-sample-map.webp", alt: "VierStation Sample map: samples placed on a map, with a legend of how precise each location is", caption: "Sample map, with a legend of how precise each location is" },
  { src: "/images/software/05-vierstation-relationship-graph.webp", alt: "VierStation Chemicals list next to a relationship graph linking the selected records", caption: "Chemicals and their relationships, shown as a graph" },
  { src: "/images/software/06-vierstation-analysis-heatmap.webp", alt: "VierStation Analysis: a heatmap with clustered rows and columns, and the run settings on the left", caption: "Analysis: a clustered heatmap with its run settings" },
];

export default function SoftwarePage() {
  return (
    <>
      <section className="bg-white py-14 sm:py-20">
        <div className="container-page max-w-4xl">
          <p className="eyebrow">Software</p>
          <h1 className="mt-3 text-4xl sm:text-5xl">Our software</h1>
          <p className="mt-5 text-lg text-ink/90">
            Scientific tools, research utilities, and applications developed to make scientific work more accessible, efficient, and reproducible.
          </p>
        </div>
      </section>

      <section id="vierstation" aria-labelledby="vierstation-title" className="bg-sky/40 py-14 sm:py-20">
        <div className="container-page max-w-5xl">
          <p className="eyebrow">01. VierStation</p>
          <h2 id="vierstation-title" className="mt-3 text-3xl sm:text-4xl">
            Your Laboratory, Organized.
          </h2>

          <div className="mt-8 overflow-hidden rounded-xl border border-ink/10 bg-black shadow-card">
            <div className="relative aspect-video">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={VIERSTATION.video}
                title="VierStation demonstration video"
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
          <p className="mt-2 text-sm text-ink/70">
            Video on YouTube.{" "}
            <a href="https://youtu.be/4TMJ7baJzeE" className="text-brand underline underline-offset-4" target="_blank" rel="noopener noreferrer">
              Open it on YouTube
            </a>
            .
          </p>

          <div className="mt-12">
            <ScreenshotCarousel shots={SHOTS} label="VierStation screenshots" />
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div className="space-y-5 text-lg text-ink/90">
              <h3 className="text-2xl">About VierStation</h3>
              <p>
                VierStation is a research workspace for biology. It keeps the working chain from a DNA sequence to a gene, a protein, a chemical, a structure and a
                finished analysis in one database, so every link between two records is stored and can be checked later. It has tables, boards, a calendar and a gallery
                over the same records, and a relationship explorer that draws how the records connect.
              </p>
              <p>
                It also looks things up for you. When you ask, it queries public databases such as NCBI, UniProt, PubChem, RCSB PDB and others, and keeps their answers in
                a local cache. Every stored link records where its information came from and how strong the evidence is.
              </p>
              <p>
                It runs on your own computer. There is no account and no sign-up: the workspace opens straight away, works offline for the data you already have, and
                makes automatic backups of its database.
              </p>
            </div>

            <dl className="space-y-4 self-start rounded-xl border border-ink/10 bg-white p-6 shadow-card">
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wide text-ink/60">Version</dt>
                <dd className="mt-1 text-lg">{VIERSTATION.version}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wide text-ink/60">Developer</dt>
                <dd className="mt-1 text-lg">VierApparatus</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wide text-ink/60">Platform</dt>
                <dd className="mt-1 text-lg">{VIERSTATION.platform}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wide text-ink/60">Distribution</dt>
                <dd className="mt-1 text-lg">
                  <a href={VIERSTATION.release} className="text-brand underline underline-offset-4" target="_blank" rel="noopener noreferrer">
                    GitHub Releases
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-12 flex flex-col items-start gap-3 rounded-xl border border-ink/10 bg-white p-6 shadow-card sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-semibold">VierStation {VIERSTATION.version} for {VIERSTATION.platform}</p>
              <p className="mt-1 text-sm text-ink/70">Windows installer (.exe) from GitHub.</p>
            </div>
            <a href={VIERSTATION.download} className="btn btn-primary">
              Download VierStation
            </a>
          </div>
          <p className="mt-3 text-sm text-ink/70">
            Version notes:{" "}
            <a href={VIERSTATION.release} className="text-brand underline underline-offset-4" target="_blank" rel="noopener noreferrer">
              the v{VIERSTATION.version} release on GitHub
            </a>
            .
          </p>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="container-page max-w-3xl">
          <p className="text-base text-ink/80">
            More software from VierApparatus will be listed here as it is released. Questions about the software: {site.email}.
          </p>
        </div>
      </section>
    </>
  );
}
