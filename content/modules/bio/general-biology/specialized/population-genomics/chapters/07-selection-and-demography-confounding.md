---
title: "Selection and Demography Confounding"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "The confounding of signatures of selection with those of demography, which is the central difficulty of population genomic inference, covering the way that a bottleneck reduces diversity across the whole genome and so mimics selection, the way that population expansion shifts the frequency spectrum towards rare variants and mimics balancing selection, the use of genome-wide neutral baselines fitted to the same demographic model, the joint inference of demography and selection, the simulation of neutral data under the inferred history to test whether a candidate region is unusual, and the caution that a model which accounts for demography may still miss selection or detect it spuriously."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how a population bottleneck can produce a signature that resembles a selective sweep."
  - "Describe the use of simulations under an inferred demographic model to test whether a candidate region is unusual."
references:
  - "Nielsen, R. (2005). Molecular Signatures of Natural Selection. Annual Review of Genetics, 39(1), 197-218. https://doi.org/10.1146/annurev.genet.39.073003.112420"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The most difficult problem in population genomics is that selection and demography leave similar signatures. A population bottleneck reduces diversity across the whole genome, and a genome scan will find many regions with low diversity, which can be mistaken for selective sweeps. Nielsen (2005) explained that the same signals can be produced by either, and the distinction is essential to any claim that a gene has been under selection.

A population expansion has the opposite effect on the frequency spectrum, shifting it towards rare variants in a way that can resemble the signature of balancing selection in some statistics. The same confusion applies, and a claim of balancing selection that does not account for expansion may be mistaken. The shape of the spectrum must be interpreted together with the demographic history inferred from the genome as a whole.

A neutral baseline fitted to the same demographic model is the standard remedy. The baseline is the distribution of the statistic expected under neutrality given the inferred history, and a candidate region is judged against this distribution rather than against the genome-wide average. The model must be inferred from the data, and its uncertainty propagates into the baseline.

Joint inference of demography and selection fits both at once, and it is more powerful but also more demanding. The model is more complex, and the parameters are more poorly determined. Simulations under the inferred history generate the distribution of the statistic under neutrality, and the observed value is compared with it. Ioannidis (2005) described how a model that accounts for some confounders may still miss others, and the simulations should be checked for their adequacy. Cumming (2014) argues that the comparison should be reported with its interval, and Sandve et al. (2013) recommended recording the demographic model, the simulations and their number.
