---
title: "Binning and Genome Quality"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How contigs from a metagenome are binned into putative genomes using sequence composition and abundance across samples, the reasons binning errors occur between closely related organisms, the quality standards that classify a recovered genome as high, medium or low quality and the way the quality of each bin determines the uses to which it can be put."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the signals used to bin contigs and the reasons binning fails between closely related organisms."
  - "Classify a recovered genome by its completeness and contamination and state which analyses each class supports."
references:
  - "Quince, C., Walker, A. W., Simpson, J. T., Loman, N. J., & Segata, N. (2017). Shotgun metagenomics, from sampling to analysis. Nature Biotechnology, 35(9), 833-844. https://doi.org/10.1038/nbt.3935"
  - "Segata, N., Waldron, L., Ballarini, A., Narasimhan, V., Jousson, O., & Huttenhower, C. (2012). Metagenomic microbial community profiling using unique clade-specific marker genes. Nature Methods, 9(8), 811-814. https://doi.org/10.1038/nmeth.2066"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Binning groups the contigs of a metagenome into bins, each intended to represent one genome. Two signals are commonly used. The first is sequence composition, such as the frequencies of short words, which tends to be similar across the contigs of one organism. The second is abundance, which tends to be similar across samples for the contigs of one organism, since they rise and fall together. Combining the two gives bins that are more reliable than either signal alone, and Quince et al. (2017) describe these signals as part of the analysis of a shotgun study.

Binning fails most often between closely related organisms. Two strains of one species share composition and abundance pattern, and their contigs fall into the same bin, producing a mixed genome. A long repeat that is shared between organisms can also pull contigs into the wrong bin. The errors are the reason that each bin must be checked for contamination, and a bin with mixed contigs cannot be treated as one organism.

Genome quality is classified by completeness and contamination. A high-quality bin is nearly complete, with few copies of genes that should occur once and little contamination. A medium-quality bin is substantially complete but with some contamination, and a low-quality bin is fragmentary or mixed. The classes are conventions, and the thresholds that separate them should be stated with the classification.

The class determines the use. A high-quality bin can support analysis of its genes and its metabolism, while a low-quality bin supports only a statement about the presence of a few marker genes. Segata et al. (2012) showed that marker genes can identify the presence of a clade without requiring a complete genome, and this is the appropriate level of claim for a fragment.

Sandve et al. (2013) recommended that the thresholds and the tools of an analysis be recorded, and the quality class of each bin is a result that depends on them.
