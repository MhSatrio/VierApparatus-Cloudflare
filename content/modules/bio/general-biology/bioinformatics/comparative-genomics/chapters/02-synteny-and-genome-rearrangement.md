---
title: "Synteny and Genome Rearrangement"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "What synteny means, the conservation of gene order between genomes, how rearrangements such as inversions, translocations and fusions are detected from the blocks of an alignment, the difference between a rearrangement that is real and one that reflects an assembly error and how the rate and type of rearrangement are used to infer the history of two lineages."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Define synteny and identify a conserved block of genes that is shared in order between two genomes."
  - "Distinguish a real rearrangement from an assembly error that produces the same pattern in an alignment."
references:
  - "Delcher, A. L., Kasif, S., Fleischmann, R. D., Peterson, J., White, O., & Salzberg, S. L. (1999). Alignment of whole genomes. Nucleic Acids Research, 27(11), 2369-2376. https://doi.org/10.1093/nar/27.11.2369"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Synteny is the conservation of gene order between genomes. Two species may share a block of genes in the same order on the same chromosome, even when the genes have diverged in sequence, and the block is evidence of a common ancestral arrangement. Delcher et al. (1999) describe the alignments from which such blocks are read, and the blocks are the units of a synteny map.

A rearrangement is a change in the arrangement of blocks. An inversion reverses a block, a translocation moves it to another chromosome and a fusion or fission joins or splits chromosomes. The order and orientation of the blocks in the alignment reveal these changes, and the number and type of changes on each lineage describe the history of rearrangement. Alberts et al. (2022) describe the mechanisms of chromosome change, through which such events arise in the cell.

Not every break in a synteny block is a real rearrangement. An assembly error, such as a misjoined scaffold, can place two blocks in the wrong order, and an annotation error can split a gene across a boundary. The alignment will show the same pattern for these as for a real change, so the candidate rearrangement must be checked against the assembly and against independent evidence before it is reported.

The check is to examine the breakpoints. A real breakpoint is supported by reads or a physical map that spans it, and an assembly error often lies where the reads do not cover the region. A rearrangement supported in both genomes, or in several related species, is more credible than one found in a single assembly.

Sandve et al. (2013) recommended that the steps leading to a result be recorded, and the breakpoints, their evidence and the rule used to call them are the record of a rearrangement analysis.
