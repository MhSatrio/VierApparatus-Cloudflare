---
title: "Reporting Transcriptome Data"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "What a report of a transcriptome study must contain for its results to be reproduced and judged, including the design and replicates, the reference genome and annotation with their versions, the library method and depth, the alignment and quantification settings, the quality control with its exclusions, the normalisation and the deposition of the raw reads and count tables with their accessions."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "List the information a transcriptome report must contain for another group to rebuild its count tables from the raw reads."
  - "Deposit the raw reads, the count tables and the code with the report so that the results can be checked."
references:
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A transcriptome study produces a table of counts, and the table is only as meaningful as the chain of steps that made it. Peng (2011) argued that the means of reproducing a computational result must accompany it, and for a transcriptome this means the design, the data and every processing decision between the reads and the table. A report that gives only a list of changed genes leaves the reader unable to tell whether the list depends on the reference, the settings or the excluded samples.

The design is the first item. The conditions, the number of biological replicates per condition, the batch structure and the question the comparison answers should be stated. The reader needs to know which comparison the reported changes come from, and the replicates determine how far the changes can be trusted.

The reference is the second item. The genome assembly and the annotation release, each with its version, must be given, since the gene identifiers and the transcript structures depend on them. Wilkinson et al. (2016) set out the principles under which such inputs should be identified, and an analysis that names its reference release can be repeated.

The processing is the third item. The library method, the sequencing depth, the trimming, the aligner and the quantification settings, the normalisation and the treatment of ambiguous reads should be stated with the software versions. The quality control, with its outcomes and the excluded samples, belongs here as well, since an exclusion changes the result.

The deposition is the fourth item. The raw reads should be placed in a public archive with their accessions, and the count tables and the analysis code should accompany the report. Sandve et al. (2013) recommended that the outputs of an analysis be kept with its inputs and steps, and a deposited count table with its code allows the changes to be checked and reanalysed.
