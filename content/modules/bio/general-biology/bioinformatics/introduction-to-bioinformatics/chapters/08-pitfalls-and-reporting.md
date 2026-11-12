---
title: "Pitfalls and Reporting in Bioinformatics"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The common pitfalls of bioinformatic analysis, including multiple testing without correction, overinterpreting significant hits, flexible analysis choices that inflate apparent findings, contamination and batch effects, and the information a bioinformatic report must contain so that its conclusions can be judged."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Identify three common pitfalls of bioinformatic analysis and describe how each can produce a spurious result."
  - "List what a bioinformatic report must state so that another group can judge and reproduce its conclusions."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Altschul, S. F., Gish, W., Miller, W., Myers, E. W., & Lipman, D. J. (1990). Basic local alignment search tool. Journal of Molecular Biology, 215(3), 403-410. https://doi.org/10.1016/S0022-2836(05)80360-2"
---

Bioinformatic analyses produce large numbers of results, and this creates opportunities for error. The most common is multiple testing: if thousands of genes are tested for an effect at a significance threshold of 0.05, about fifty will pass by chance alone. Correction for the number of tests is essential, but it is often omitted or applied only to the results that were reported. Ioannidis (2005) explained how such selection, together with small effects and flexible analysis, makes a published finding more likely to be false than true, and the same forces operate in genomic studies.

A second pitfall is overinterpreting a significant hit. The search methods of the previous chapters report E-values and scores, and a hit with a small E-value shows that the match is unlikely to be random, not that the two sequences share the function that a database annotation claims. Altschul et al. (1990) defined the statistics of such hits, and the statistics say nothing about the biology of the match.

A third pitfall is flexibility in the analysis. Choosing the filter, the normalisation, the threshold or the software after seeing the data can produce a result that fits the data by construction. The defence is to fix the analysis plan before the data are examined, or to report the results of all reasonable choices.

Batch effects and contamination are a fourth source of error. Samples processed on different days or with different reagents can differ for reasons that have nothing to do with the biology, and a contaminating sequence can appear as a genuine signal. These errors are found by checking the design of the experiment and the quality control of the data before the analysis.

A report must state the data sources and versions, the processing steps and their parameters, the statistical methods and their corrections, the software versions and the code. Sandve et al. (2013) argued that such information is what allows the reader to judge a result, and without it the result cannot be trusted or built upon.
