import Link from "next/link";
import type { Metadata } from "next";
import { brand } from "@/lib/brand";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Why VierApparatus exists: an independent science publication built on accessible, evidence-based writing and open to contributors.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-white py-14 sm:py-20">
        <div className="container-page max-w-3xl">
          <p className="eyebrow">About</p>
          <h1 className="mt-3 text-4xl sm:text-5xl">Science should be accessible.</h1>
          <div className="mt-8 space-y-5 text-lg text-ink/90">
            {brand.aboutStatement.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="why-title" className="bg-sky/40 py-14 sm:py-20">
        <div className="container-page max-w-3xl">
          <p className="eyebrow">Why this exists</p>
          <h2 id="why-title" className="mt-3 text-3xl sm:text-4xl">
            Understanding the world should not depend on where you work.
          </h2>
          <div className="mt-6 space-y-5 text-lg text-ink/90">
            <p>
              Scientific knowledge becomes more valuable the more widely it can be understood, questioned and used. Too often it stays inside institutions, behind paywalls and in vocabulary that only specialists share.
            </p>
            <p>
              VierApparatus is an independent project founded by {site.founder}, who wanted to keep learning in the open: to explain research clearly, comment on it honestly, and give other people a place to do the same. It is a small publication and it does not claim to be more than that.
            </p>
            <p>
              It is also a place to disagree well. Readers are invited to challenge what we publish, with evidence, and we will say so when we change our minds.
            </p>
          </div>
        </div>
      </section>

      <section id="how-we-write" aria-labelledby="how-title" className="bg-white py-14 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">How we write</p>
            <h2 id="how-title" className="mt-3 text-3xl sm:text-4xl">
              Reporting is separate from commentary.
            </h2>
            <p className="mt-4 text-lg text-ink/90">
              Some sentences report what has been found. Others interpret it, and some are the author&apos;s opinion or a guess. They should never look the same, so articles label them.
            </p>
            <ul className="mt-6 space-y-4">
              {brand.labels.map((l) => (
                <li key={l.name} className="border-l-4 border-sky pl-4">
                  <p className="font-semibold">{l.name}</p>
                  <p className="text-ink/85">{l.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Editorial standards</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">What you can expect from us.</h2>
            <ul className="mt-6 list-disc space-y-3 pl-5 text-lg text-ink/90">
              {brand.standards.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <p className="mt-6 text-ink/90">
              Corrections and questions:{" "}
              <a className="text-brand underline underline-offset-4" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </p>
          </div>
        </div>
      </section>

      <section aria-label="Sapere aude" className="bg-ink py-14 text-white sm:py-20">
        <div className="container-page max-w-3xl">
          <figure className="text-center">
            <blockquote>
              <p className="text-3xl italic sm:text-4xl">{brand.sapere.quote}</p>
              <p className="mt-2 text-xl text-sky">{brand.sapere.translation}</p>
            </blockquote>
            <figcaption className="mt-5 text-white/80">
              <p>{brand.sapere.explanation}</p>
              <p className="mt-2 text-sm text-white/60">{brand.sapere.attribution}</p>
            </figcaption>
          </figure>
        </div>
      </section>

      <section aria-labelledby="community-title" className="bg-white py-14 sm:py-20">
        <div className="container-page max-w-3xl">
          <p className="eyebrow">Community</p>
          <h2 id="community-title" className="mt-3 text-3xl sm:text-4xl">
            Write with us.
          </h2>
          <p className="mt-4 text-lg text-ink/90">
            Researchers, students and careful amateurs are welcome to propose articles. You do not need an institutional affiliation; you do need to be accurate, show your sources and be open to editing. Every proposal is read by the editor, and nothing is published without review.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/contribute" className="btn btn-primary">
              Join as contributor
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
