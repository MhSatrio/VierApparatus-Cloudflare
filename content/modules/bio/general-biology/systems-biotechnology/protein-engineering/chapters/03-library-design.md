---
title: "Library Design"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The design of variant libraries that sample the sequence space efficiently, including the choice of positions to vary, the number of changes per variant, the use of focused libraries that concentrate on a few positions expected to matter, the reduced alphabets that limit the amino acids tested at each position to a manageable set, the coverage that a library must achieve to contain a given variant with a chosen probability, and the trade-off between the breadth of a library and the depth at which each region is explored."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Choose the positions and the number of changes for a focused library and state the reason for each choice."
  - "Calculate the library size needed to contain a chosen variant with a stated probability and explain the trade-off between breadth and depth."
references:
  - "Packer, M. S., & Liu, D. R. (2015). Methods for the directed evolution of proteins. Nature Reviews Genetics, 16(7), 379-394. https://doi.org/10.1038/nrg3927"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A library is designed to find the variants that matter, and its design decides how efficiently the search proceeds. The first choice is which positions to vary. A library that varies every position weakly explores everything shallowly, while a focused library that varies a few well-chosen positions explores those regions thoroughly. Packer and Liu (2015) described how focused libraries are used when knowledge of the protein points to a few positions, and the choice should be justified by that knowledge.

The number of changes per variant is the second choice. Variants with one or two changes are easier to interpret and more often functional, while variants with many changes are more likely to be damaged and harder to attribute. The number of changes is set by the mutation rate or by the design of the library, and it should be reported.

Reduced alphabets limit the amino acids tested at each position to a small set that covers the chemical diversity of the positions. A reduced alphabet makes the library smaller and easier to screen, and it can be designed to include the residues most likely to change the property of interest. The reduction is a hypothesis about which residues matter, and it should be stated as such.

The coverage of a library is the probability that a given variant is present. For a library of size N and a variant whose probability of occurrence in a single member is p, the chance of finding it at least once is one minus the probability of missing it in every member. Ioannidis (2005) described how a search that is not powered to find the rare result will often miss it, and the library should be large enough for the variants sought. Cumming (2014) argues that the library size and the coverage should be reported with the findings, and Sandve et al. (2013) recommended recording the design so that the library can be regenerated.
