---
title: "Phylogenetic Inference and Diversification"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The inference of phylogenetic trees and the estimation of the tempo of diversification from them, covering the models of sequence evolution that determine the likelihood of a tree, the choice of model by information criteria or cross-validation, the uncertainty of tree topology and branch lengths expressed by bootstrap or posterior sampling, the birth-death models that estimate speciation and extinction rates from the branching times, the sampling fraction of species that must be accounted for because incomplete sampling biases the rates, the test of whether diversification rates changed through time or differ among lineages, and the reporting of trees with their support and of the rates with intervals and the sampling assumption."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Estimate a phylogenetic tree and report the support for each clade with its uncertainty."
  - "Estimate diversification rates from branching times and state how incomplete species sampling biases the estimates."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

A phylogenetic tree is inferred from sequences by evaluating the likelihood of the data under a model of sequence evolution, and the tree that maximises the likelihood, or that has the highest posterior probability, is taken as the estimate. The model of evolution determines the likelihood, and its choice affects the topology and the branch lengths. Model selection by information criteria or by cross-validation balances the fit against the complexity of the model, and the criterion chosen should be reported. Ioannidis (2005) described how the choice of an analysis after the results are seen can produce a favourable answer, and the model should be chosen by a stated rule.

The support for each clade expresses the uncertainty of the topology. Bootstrap resampling and posterior sampling give these supports, and a clade with low support should not be interpreted as established. Cumming (2014) argues that the uncertainty of the tree should be reported with its interval, since a single tree presented without support conveys a precision that the data may not carry.

Birth-death models estimate speciation and extinction rates from the branching times of a tree. These rates describe the tempo of diversification, and they can reveal whether diversification accelerated or slowed through time. The estimates depend on the assumptions of the model, and their intervals can be wide, particularly for extinction, which is hard to detect from the tree alone.

Incomplete sampling of species biases the estimated rates, since the species that are missing are not random with respect to their branching. The sampling fraction must be accounted for, and the sensitivity of the rates to the assumed fraction should be shown. Peng (2011) argued that the sampling and the model assumptions must be documented so that the rates can be reproduced, and Munafò et al. (2017) argued that the rates should be reported with the sampling assumption that they depend on.
