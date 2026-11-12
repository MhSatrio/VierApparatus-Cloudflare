---
title: "Scaffolding and Gap Filling"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How contigs are ordered and oriented into scaffolds using long-range information such as paired reads, long reads that span gaps and physical maps, how the gaps between contigs are estimated and filled with sequence where the reads allow, the errors that scaffolding can introduce when a join is wrong and the checks that confirm the scaffolds reflect the genome rather than the assembler's assumptions."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how paired reads or long reads provide the information that orders and orients contigs into a scaffold."
  - "Identify a wrong join in a scaffold and describe the evidence that would reveal it."
references:
  - "Koren, S., Walenz, B. P., Berlin, K., Miller, J. R., Bergman, N. H., & Phillippy, A. M. (2017). Canu: scalable and accurate long-read assembly via adaptive k-mer weighting and repeat separation. Genome Research, 27(5), 722-736. https://doi.org/10.1101/gr.215087.116"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

Contigs are separated by gaps, and their order and orientation are unknown unless additional information is available. Scaffolding uses long-range evidence to place them. Paired reads, in which two reads come from the ends of a fragment of known approximate length, link contigs that are far apart in the sequence, and long reads that span a gap link the contigs on either side. Koren et al. (2017) describe the long-read assembly on which such linking can be based, and the scaffold is the result of joining the contigs by this evidence.

The gap between two linked contigs is estimated from the distance the linking evidence implies, and it is recorded as a run of unknown bases of that length. Where reads span the gap, the sequence can be filled with the bases the spanning reads carry, and the gap is then closed. A gap that cannot be spanned remains open, and its length is an estimate that carries uncertainty.

A wrong join is a serious error. If two contigs are joined in the wrong order or orientation, the scaffold contains a false arrangement that may appear plausible. A join that spans a repeat can connect two copies of the repeat, and the scaffold then misplaces the sequence on either side. Such errors are found by checking the join against independent evidence, such as a second library or a physical map, and by examining whether the joined region contains a repeat.

The scaffold must reflect the genome rather than the assembler's assumptions. The method used to order the contigs should be recorded, along with the size distribution it assumed for the paired reads, since a wrong size assumption shifts the estimated gaps. Sandve et al. (2013) recommended recording the assumptions of an analysis, and the library size is one of the assumptions that most directly affects the scaffold.

Peng (2011) argued that a computational result must be available for others to check, and a scaffold is checkable when its joins and their supporting evidence are listed. A scaffold reported only as a sequence cannot be tested, while a list of joins with their evidence allows the reader to examine each one.
