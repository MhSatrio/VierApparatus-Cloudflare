import type { Metadata } from "next";
import { ContributeForm } from "@/components/ContributeForm";

export const metadata: Metadata = {
  title: "Join as contributor",
  description: "Propose an article for VierApparatus. Every submission is reviewed by the editor for accuracy, originality, references and relevance.",
  alternates: { canonical: "/contribute" },
};

export default function ContributePage() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="container-page max-w-3xl">
        <p className="eyebrow">Contribute</p>
        <h1 className="mt-3 text-4xl sm:text-5xl">Join as contributor</h1>
        <p className="mt-4 text-lg text-ink/85">
          If you can explain something well, we would like to read your proposal. Tell us what you want to write and what the article will rest on. You do not need an institutional affiliation; you do need to be accurate and show your sources.
        </p>
        <ol className="mt-6 list-decimal space-y-1 pl-5 text-ink/85">
          <li>You send a proposal, with a draft if you have one.</li>
          <li>The editor reviews it and replies: accepted, needs revision, or not a fit.</li>
          <li>Accepted pieces are edited together and published under your name.</li>
        </ol>
        <div className="mt-10">
          <ContributeForm />
        </div>
      </div>
    </section>
  );
}
