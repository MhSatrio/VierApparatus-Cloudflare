---
title: "Reporting an RNA-seq Analysis"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "What a report of an RNA-seq differential expression analysis must contain for its results to be reproduced and judged, including the design and its matrix, the reads and their accessions, the reference and annotation versions, the alignment and counting settings, the filters and their rationale, the model, the corrections and thresholds, the checks performed and the deposition of the count tables and code."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "List the information an RNA-seq report must contain for another group to repeat the differential expression analysis."
  - "Write a methods section that states the design matrix, the filters, the model and the corrections in a form that can be followed."
references:
  - "Love, M. I., Huber, W., & Anders, S. (2014). Moderated estimation of fold change and dispersion for RNA-seq data with DESeq2. Genome Biology, 15(12), 550. https://doi.org/10.1186/s13059-014-0550-8"
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A differential expression result is a list, and a list is only as useful as the description of how it was made. Peng (2011) argued that a computational result must be accompanied by the means of reproducing it, and for an RNA-seq analysis these means include the design, the data, the reference, every processing setting and the statistical rules. A report that gives the genes without these details cannot be repeated, and a repeated analysis that differs from the report cannot be explained.

The design is the first item. The conditions, the replicates, the batch structure and the design matrix with its reference group should be stated in full. Love et al. (2014) fit their model to such a matrix, and the matrix is the precise statement of the comparison.

The data and reference are the second item. The reads with their accessions, the genome assembly and the annotation with their versions, and the alignment and counting settings should be given. Wilkinson et al. (2016) set out the principles under which these inputs should be identified and made reusable, and the accessions and versions meet them.

The statistics are the third item. The filter and its rationale, the model and its dispersion estimation, the test, the correction for multiple testing and the thresholds for significance and for size should be reported. The checks performed and their outcomes belong here, together with any sample excluded and the reason.

The deposition is the fourth item. The count tables, the analysis code and the list of results should be placed in a public archive, so that the analysis can be rerun and its statistics recomputed. Sandve et al. (2013) recommended that the outputs of an analysis be kept with its inputs and steps, and a deposited count table with its code and design completes the report.
