/** Editorial copy shared by the home page, About page and footer. */
export const brand = {
  /** One-paragraph statement shown on the home page. */
  homeStatement:
    "VierApparatus is an independent publication for people who want to understand how we know what we know. We write about biotechnology, microbiology and the methods behind research, and we try to keep the evidence and the reasoning visible.",

  /** Refined from the founding statement; used at the top of the About page. */
  aboutStatement: [
    "VierApparatus is an independent scientific knowledge platform built on one belief: science should be accessible, intellectually rigorous, and open to anyone willing to question, learn and explore.",
    "Through articles, commentary on research, and contributions from the community, we try to make complex ideas easier to understand without losing the evidence and reasoning behind them.",
    "We think scientific literacy is more than knowing the vocabulary. It is the ability to question a claim, weigh the evidence, notice uncertainty, and take part in the conversation. This site exists to make that easier.",
  ],

  sapere: {
    quote: "Sapere aude!",
    translation: "Dare to know.",
    explanation: "An invitation to think independently, question accepted ideas, and pursue knowledge through one's own understanding.",
    attribution: "Immanuel Kant, “What Is Enlightenment?” (1784), after Horace",
  },

  /** How an article labels the status of what it says. These map to the callout styles in the editor. */
  labels: [
    { name: "Established", text: "Findings that are well replicated and broadly accepted. These are stated plainly, with sources." },
    { name: "Emerging", text: "Recent or preliminary research. We say how strong the evidence is and what is still unknown." },
    { name: "Note", text: "Background, definitions and context that help read the main text." },
    { name: "Commentary", text: "The author's own interpretation or opinion, marked as such so it is never mistaken for a finding." },
    { name: "Speculation", text: "Hypotheses and open questions. Clearly labelled, never presented as fact." },
  ],

  standards: [
    "Claims that matter are tied to references. We do not invent citations, and we do not publish text just because a tool can generate it.",
    "Every article is reviewed by the editor before it goes live. Contributor submissions are proposals, not promises of publication.",
    "We separate reporting from commentary, and we say when something is uncertain.",
    "If we get something wrong, we correct it and say so. Write to the address below with the article link and the correction.",
  ],
} as const;
