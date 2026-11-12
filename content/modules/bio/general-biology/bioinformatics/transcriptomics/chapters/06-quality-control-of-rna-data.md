---
title: "Quality Control of RNA Data"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The quality checks applied to RNA sequencing data before analysis, including the integrity of the starting RNA, the quality of the reads and their adapters, the mapping rate and the distribution of reads across genes and transcript regions, the detection of rRNA and genomic DNA contamination, the sample-to-sample correlation and the decision to exclude a sample, with the reasons each check protects the analysis from error."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "List the quality checks an RNA sequencing dataset passes before analysis and state what each check detects."
  - "Decide whether a sample should be excluded and record the reason and the effect of the exclusion."
references:
  - "Wang, Z., Gerstein, M., & Snyder, M. (2009). RNA-Seq: a revolutionary tool for transcriptomics. Nature Reviews Genetics, 10(1), 57-63. https://doi.org/10.1038/nrg2484"
  - "Dobin, A., Davis, C. A., Schlesinger, F., Drenkow, J., Zaleski, C., Jha, S., Batut, P., Chaisson, M., & Gingeras, T. R. (2013). STAR: ultrafast universal RNA-seq aligner. Bioinformatics, 29(1), 15-21. https://doi.org/10.1093/bioinformatics/bts635"
  - "Taschuk, M., & Wilson, G. (2017). Ten simple rules for making research software more robust. PLOS Computational Biology, 13(4), e1005412. https://doi.org/10.1371/journal.pcbi.1005412"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Quality control is the first analysis of an RNA sequencing dataset, and it decides whether the rest of the analysis can be trusted. Wang et al. (2009) noted that the quality of the starting RNA and the library limits what the reads can show, and the checks begin with the material and continue through the reads. A problem caught at this stage is cheap to correct, while one that reaches the differential expression analysis can distort every result.

The reads are checked for quality, for the adapter sequences that the library added and for the length distribution. Low-quality bases at the ends of reads are trimmed, and adapters are removed, so that the reads that remain can be mapped. The checks are summarised per sample, and a sample with systematically poor reads is noted for the decisions that follow.

The alignment is checked by its mapping rate, the fraction of reads placed on the genome. Dobin et al. (2013) describe STAR, an aligner designed for spliced RNA reads, and the rate at which it places reads is a sign of library quality. A low rate may indicate contamination, a wrong reference or a degraded sample, and the reasons should be investigated before the sample is used.

The distribution of reads across the genome is informative. In an RNA library, most reads fall on exons, and a large share on introns or intergenic regions suggests genomic DNA contamination or incomplete RNA processing. A high share of reads from ribosomal RNA indicates that the depletion step failed. Each of these patterns is a reason to examine the sample.

Sample correlation is the last check. Replicates of one condition should correlate strongly, and a replicate that correlates poorly with the others may be an outlier. A sample may be excluded, but the exclusion must be decided by a rule fixed in advance and reported with its reason. Sandve et al. (2013) recommended that the processing of data be recorded, and a list of the checks with their outcomes and any exclusions is the record of quality control.
