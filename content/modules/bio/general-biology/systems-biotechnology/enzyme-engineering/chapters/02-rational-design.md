---
title: "Rational Design"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "Rational enzyme design in which residues are chosen for mutation from knowledge of the structure and the mechanism, including the targeting of the active site, of the substrate-binding pocket and of residues in the second shell, the use of multiple sequence alignments to identify conserved and variable positions, the design of small libraries that test a hypothesis about a residue, the risk that a designed change destabilises the fold, and the limits of rational design when the structure is unknown or the effect of a change depends on distant residues."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Choose residues for mutation from a structure and an alignment and state the hypothesis that each mutation tests."
  - "Explain why a rationally designed change can fail through destabilisation or distant effects and how a small library tests the hypothesis."
references:
  - "Bornscheuer, U. T., Huisman, G. W., Kazlauskas, R. J., Lutz, S., Moore, J. C., & Robins, K. (2012). Engineering the third wave of biocatalysis. Nature, 485(7397), 185-194. https://doi.org/10.1038/nature11117"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Rational design chooses the residues to mutate from an understanding of the enzyme, rather than by testing random variants. The structure shows which residues line the active site and the pocket, and an alignment of the enzyme with its relatives shows which positions are conserved and which vary. Bornscheuer et al. (2012) described how these sources of information are combined to propose a small set of changes, each supported by a reason.

The most direct targets are the residues of the active site, since they contact the substrate and take part in catalysis. The second shell, the residues that surround the active site and position the first, is also a common target, because changes there can alter the orientation of the substrate without disturbing the chemistry. A change in the pocket can alter the specificity, and the design should state which property the change is meant to alter.

A rational library is small, and it tests a hypothesis. If a residue is believed to restrict the substrate, mutating it to a smaller residue should widen the substrate range, and the outcome either supports or refutes the belief. Cumming (2014) argues that the effect of each mutation should be reported with its interval across replicate assays, since a single measurement may not distinguish a real change from variation.

A designed change may destabilise the fold, and a mutation that improves the active site may unfold the enzyme. The design should therefore consider the stability of the protein along with its activity, and the effects on both should be measured. Sandve et al. (2013) recommended recording the reason for each mutation, since a design that cannot be explained by its hypothesis cannot be learned from when it fails.
