---
title: "Reviewed and Unreviewed Entries"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The difference between the manually curated and the automatically annotated sections of UniProt, how a reviewed entry is marked and how it is produced, why an unreviewed entry may carry a correct sequence with an inferred function, and how an analysis should choose between the two and state its choice."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Identify whether a UniProt entry is reviewed and explain what that status means for its annotation."
  - "Decide when an unreviewed entry is acceptable and state that decision in the analysis."
references:
  - "The UniProt Consortium. (2023). UniProt: the Universal Protein Knowledgebase in 2023. Nucleic Acids Research, 51(D1), D523-D531. https://doi.org/10.1093/nar/gkac1052"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

UniProt divides its records into two sections. The reviewed section contains entries that have been curated by experts, who check the annotation against the published literature and write the function, location and features with evidence. The unreviewed section contains entries generated from the sequence archives by automatic methods, which are far more numerous. The UniProt Consortium (2023) describes the two sections, and the status of an entry is shown in its header.

The reviewed status is a statement about the process. It means that a curator has examined the entry, and it does not mean that every statement in the entry is certain. A reviewed entry can still carry an annotation that has been revised since, so the version of the entry matters. The status is a reason to trust the annotation more than an unreviewed one, not a guarantee.

An unreviewed entry may carry a correct sequence whose function is only inferred. Such an entry is useful for finding a protein and its family, and it can be the only record for a species with few studies. An analysis that uses such an entry for its function should say so and should treat the function as a hypothesis, since the inference may have come from a distant relative.

The choice follows from the question. For a claim about the function of a protein in a well-studied organism, the reviewed entry is the appropriate source. For a sequence search across many species, the unreviewed section gives broader coverage, and the function is then not the question being answered.

Sandve et al. (2013) recommended recording the sources of an analysis, and the review status of each entry is part of that record. A dataset that mixes reviewed and unreviewed entries should state which entries came from which section.
