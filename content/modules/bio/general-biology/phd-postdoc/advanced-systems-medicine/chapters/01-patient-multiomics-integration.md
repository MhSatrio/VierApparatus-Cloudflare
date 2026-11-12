---
title: "Integrating Patient Multi-Omic Data"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The integration of multi-omic measurements from patients into a common analysis, covering the harmonisation of data from genomics, transcriptomics, proteomics and clinical records that differ in platform, scale and missingness, the handling of batch effects that align with clinical sites, the imputation of missing measurements and the uncertainty it adds, the reduction of dimensionality that retains the signal and the risk of discarding a rare but important signal, the adjustment for confounders such as age, sex and treatment, the consent and privacy constraints that govern the use of patient data, and the reporting of the harmonisation, the adjustment and the missingness with their effect on the results."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Harmonise multi-omic patient data from platforms with different scales and missingness and state the effect of each step on the results."
  - "Adjust for confounders and state how batch effects aligned with clinical sites can produce a spurious stratification."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

Patient data arrive from many platforms, each with its own scale, its own noise and its own pattern of missing values. Genomic variants, transcript abundances, protein levels and clinical variables cannot be combined until they are placed on comparable scales and their differences in quality are recognised. The harmonisation is a set of decisions, and each affects the results that follow. Ioannidis (2005) described how the analytic choices made in preparing data can determine the conclusion, and the choices must be stated and tested.

Batch effects are a particular danger in patient data, because the batches often coincide with clinical sites, times of sampling or the kind of patient recruited. A stratification that separates patients by batch will look biological while reflecting the processing, and the batch structure must be examined before any stratification is accepted. Cumming (2014) argues that the variation between sites should be reported with its interval, since site differences can be as large as the biological differences under study.

Missing measurements are common in clinical data, and imputation fills them with estimates that carry their own uncertainty. Imputation can create relationships that are not present in the data, and the sensitivity of the results to the imputation method should be shown. Munafò et al. (2017) argued that the proportion of missing data and the method of handling it should be reported, since a result that depends on imputation is less secure than one that does not.

Confounders such as age, sex and treatment can produce associations that mimic disease biology, and the analysis must adjust for them. Dimensionality reduction retains the main signal in the data, but it can discard a rare yet important feature, and the reduction should be checked against the features it removes. Peng (2011) argued that the steps applied to the data must be documented so that the analysis can be repeated, and the consent and privacy conditions that govern patient data should be stated in the report.
