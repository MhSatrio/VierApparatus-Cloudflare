---
title: "Network Inference"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The inference of a network from measurements of its components rather than from a curated database, including correlation and partial correlation networks in which edges reflect associations among expression profiles, the distinction between a correlation and a direct interaction, the Bayesian and regression approaches that estimate directed regulation, the problems of indirect edges, feedback loops and insufficient samples, and the validation of an inferred network against known interactions and new perturbation experiments."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain why a correlation network contains indirect edges and how a partial correlation reduces them."
  - "State how an inferred network is validated against known interactions and against perturbation experiments."
references:
  - "Barabási, A.-L., & Oltvai, Z. N. (2004). Network biology: understanding the cell's functional organization. Nature Reviews Genetics, 5(2), 101-113. https://doi.org/10.1038/nrg1272"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Many networks are not available in databases and must be inferred from measurements, such as the expression of genes across many samples. The simplest approach joins two components when their measurements are correlated, but a correlation is not an interaction. If gene A regulates gene B, which regulates gene C, then A and C are correlated even though they do not interact directly, and a correlation network contains these indirect edges. Barabási and Oltvai (2004) noted that a network's edges should represent the relation claimed, and a correlation network represents association.

Partial correlation reduces the problem by measuring the correlation between two components after the influence of all the others has been removed. An edge that survives this adjustment is more likely to be direct, although the adjustment requires many samples relative to the number of components, and it fails when the components are strongly collinear. The estimate of partial correlation should be reported with its uncertainty, since it is less precise than a simple correlation.

Directed regulation can be estimated by regression or Bayesian methods, which model each target as a function of its candidate regulators. These methods can suggest a direction but they rely on assumptions about the timing and independence of the measurements, and a feedback loop violates the assumption of a simple direction. Ioannidis (2005) described how a method that searches over many candidate networks will find structures that do not hold, and the search should be validated on data not used for the search.

An inferred network is validated against known interactions, which show how many of its edges are already documented, and against perturbation experiments, which test whether the predicted dependence of one component on another is observed when it is altered. Cumming (2014) argues that the precision of each inferred edge should be reported, and Sandve et al. (2013) recommended recording the method, its settings and the samples used, so that the network can be reinferred and its edges checked.
