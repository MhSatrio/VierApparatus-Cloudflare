---
title: "Reporting Population Genomics"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "What a population genomics report must contain for its inferences about diversity, history and selection to be judged and reproduced, including the populations, the sampling design and the number and relatedness of individuals, the sequencing approach and depth, the variant calling and quality filters with the number of variants retained, the statistics used with their windows and their filters, the demographic model and the neutral baseline, the candidate regions with their significance after correction, the recombination maps used, and the deposition of the genotypes, the scripts and the simulations."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "List the sampling, calling, filtering, model and baseline details that a population genomics report must give."
  - "Report the candidate regions of selection with their baseline, their statistic, their correction for multiple testing and the demographic model that was assumed."
references:
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Nielsen, R. (2005). Molecular Signatures of Natural Selection. Annual Review of Genetics, 39(1), 197-218. https://doi.org/10.1146/annurev.genet.39.073003.112420"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

A population genomics report makes claims about the history and the adaptation of populations, and these claims can be judged only if the data and the analysis are fully described. The populations and the sampling design should be stated, with the number of individuals, their locations and their relatedness. Peng (2011) argued that a result is reproducible only with the means of producing it, and for a population genomic study those means include the samples, the sequencing and the software.

The variant calling and the quality filters should be reported, along with the number of variants retained at each step. The statistics used should be stated with their windows, their filters and their definitions, since small changes in these can change the results. Nielsen (2005) emphasised that the inference depends on these choices, and the report should make them explicit.

The demographic model and the neutral baseline on which candidate regions are judged must be reported, since the inference of selection depends on them. The candidate regions should be reported with their significance after correction for the number of tests, and the threshold should be justified. Cumming (2014) argues that the estimates should be given with their intervals, and Ioannidis (2005) described how a claimed signal of selection that depends on an unstated model may not hold when the model is changed.

The genotypes, the scripts and the simulations should be deposited with identifiers, so that the analysis can be repeated and its candidates checked by others. Sandve et al. (2013) recommended keeping the inputs, steps and outputs of an analysis together, which allows a population genomic inference to be reproduced and revised as better data become available.
