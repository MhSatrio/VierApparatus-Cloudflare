---
title: "Genotype Calling and Quality"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "The calling of genotypes from sequencing reads and the quality control that determines which genotypes are reliable, covering the mapping of reads to a reference and the errors introduced by misalignment, the probabilistic genotype calls that give a likelihood for each genotype rather than a hard call, the filters on read depth, mapping quality and missing data, the heterozygote excess or deficit that can reveal calling errors, the propagation of genotype uncertainty into the estimates of diversity and selection, and the reporting of quality control with the filters applied and the number of variants retained at each step."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how genotypes are called from reads and state why a probabilistic call is preferable to a hard call for low-depth data."
  - "Explain how quality filters change the set of variants analysed and state the statistics that reveal calling errors."
references:
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

Population genomic analyses depend on genotypes, and genotypes are called from sequencing reads that have been mapped to a reference genome. Errors can enter at each stage: reads may be misaligned, and bases may be miscalled, so that a true heterozygote appears as a homozygote or the reverse. The quality of the genotypes determines the quality of every estimate that follows, and the calling must be designed and checked with that in mind.

Probabilistic genotype calling assigns each individual a likelihood for each possible genotype, rather than a single hard call. This is important at low depth, where a single read may not reveal the genotype, and the uncertainty of the call should be carried into the analysis. Sandve et al. (2013) recommended that the calling procedure be recorded, since its choices affect the genotypes that all later analyses use.

Quality filters remove variants and samples that are unreliable. Filters on read depth, mapping quality and the proportion of missing data are common, and each changes the set of variants analysed. A filter that removes low-depth sites may also remove rare variants, and this affects the estimate of diversity. The filters and the number of variants retained after each step should be reported.

A heterozygote excess or deficit at a locus can reveal calling errors, since a systematic error tends to produce a departure from the expected proportion of heterozygotes. Such departures should be examined rather than discarded silently. Cumming (2014) argues that the uncertainty in the genotypes should be reported with the estimates, and Ioannidis (2005) described how a filter that removes inconvenient variants can bias the result, so the filters should be fixed before the analysis is run.
