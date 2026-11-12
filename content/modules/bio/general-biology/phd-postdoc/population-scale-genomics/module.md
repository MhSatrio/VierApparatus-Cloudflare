---
title: "Population-Scale Genomics"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The analysis of genomes sampled from very large populations at doctoral and postdoctoral level, covering the design of population cohorts and biobanks with their sampling frames and the bias of who participates, the genome-wide association analysis that tests millions of variants for association with traits and the multiple-testing threshold that controls false discoveries, the control of population stratification and of relatedness that otherwise produce spurious associations, the estimation of heritability and the polygenic scores that aggregate many small effects with their accuracy across ancestries, the fine-mapping that identifies causal variants within an associated region, and the reporting of the cohort, the analysis, the thresholds and the uncertainty of each estimate with the data access conditions."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Design a genome-wide association analysis with a multiple-testing threshold and control for population stratification and relatedness."
  - "Evaluate a polygenic score across ancestry groups and report its accuracy with an interval."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

Population-scale genomics analyses the genomes of very large samples, often numbering in the hundreds of thousands, to find the genetic variants that influence traits and diseases. The scale brings statistical power that earlier studies lacked, and it also brings problems that scale magnifies: a small bias in sampling or in analysis can produce many spurious findings. Ioannidis (2005) described how the early genetic association studies of small size produced many results that did not replicate, and the large studies were designed to remedy that failure while introducing their own demands.

The design of a cohort or biobank determines who is represented, and participation is rarely random. People who volunteer for such studies may differ systematically from those who do not, and the sampling frame limits the generalisation of the findings. The composition of the cohort must be reported, and the representation of different ancestries must be stated, since the findings will apply best to the groups that are well represented. Cumming (2014) argues that the precision of an estimate in each group should be reported with its interval, since the under-represented groups carry the widest uncertainty.

Genome-wide association analysis tests millions of variants, and the multiple-testing threshold controls the number of false discoveries that such a number of tests would otherwise produce. The threshold is conventionally set very low, and the association must exceed it to be reported. Munafò et al. (2017) argued that the number of tests and the threshold should be reported with the findings, so that the significance of each can be judged.

Population stratification, in which allele frequencies differ with ancestry and the trait also differs, and relatedness among participants, can produce associations that reflect ancestry or kinship rather than biology. These confounders must be controlled through principal components, mixed models or the exclusion of related individuals, and the control must be reported. Peng (2011) argued that the analysis must be documented so that the controls can be checked and the associations reproduced.

Heritability and polygenic scores aggregate the effects of many small variants, and their accuracy must be evaluated in each ancestry group, since a score developed in one group often performs worse in others. Fine-mapping identifies the causal variant within an associated region, and its inference depends on the linkage structure of the region. The results should be reported with their uncertainty, and the data access conditions should be stated so that the analysis can be verified by approved researchers.
