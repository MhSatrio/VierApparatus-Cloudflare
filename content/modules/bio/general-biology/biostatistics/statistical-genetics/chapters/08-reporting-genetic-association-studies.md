---
title: "Reporting Genetic Association Studies"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "What a report of a genetic association study must contain for its findings to be interpreted and reproduced, including the sample size, the ancestry and the phenotype definition, the genotyping platform and the quality control thresholds, the association model and the covariates used to correct for structure, the genome-wide threshold and the replication, the effect estimates with their intervals, and the deposition of the summary statistics and the code."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "List the sample, phenotype, quality control and model details that a genetic association report must give."
  - "Report the effect estimates, the genome-wide threshold and the replication of an association with the information a reader needs."
references:
  - "Visscher, P. M., Wray, N. R., Zhang, Q., Sklar, P., McCarthy, M. I., Brown, M. A., & Yang, J. (2017). 10 Years of GWAS Discovery: Biology, Function, and Translation. The American Journal of Human Genetics, 101(1), 5-22. https://doi.org/10.1016/j.ajhg.2017.06.005"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A genetic association report must describe the sample before its findings can be weighed. The number of individuals, their ancestry, the definition of the phenotype and the criteria for including each person should be stated, because a result from a mixed or selected sample may not apply to others. Peng (2011) argued that a result is reproducible only when the means of producing it are available, and in genetics the means include the sample definition, the genotyping and the quality control applied.

The genotyping and quality control determine which variants enter the analysis. The platform, the imputation panel if one was used, the thresholds for call rate, minor allele frequency and departure from Hardy-Weinberg equilibrium, and the number of variants removed at each step should be given. These decisions change the set of tests, and therefore the multiple testing threshold, so they must be reported with their effect on the final count. Visscher et al. (2017) described how variation in these choices has complicated the comparison of studies.

The association model and the covariates should be stated, along with the method used to correct for population structure and the number of components included. The genome-wide threshold applied should be given, and each finding should be reported with its effect estimate, its interval and the allele to which the effect refers. Cumming (2014) argues that the size of an effect matters as much as its significance, and an estimate without its interval conveys less than it appears to. Ioannidis (2005) described how selective reporting of significant findings inflates their size, so the estimates for all tested variants, or at least the full set of results, should be available.

Replication should be reported with the sample, the result and the comparison with the discovery estimate. The summary statistics for all variants, the phenotype definitions and the analysis code should be deposited with identifiers, as Sandve et al. (2013) recommended, so that the association can be checked, meta-analysed and tested by others.
