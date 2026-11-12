---
title: "Statistics of Metabolite Changes"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The statistical analysis of metabolite abundances across conditions, including the log transformation that makes changes comparable across scales, the tests for differences with replicates and the multivariate methods such as principal components and partial least squares that summarise many metabolites at once, the risk of over-fitting a classifier to a small number of samples and the correction for the many metabolites tested."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Test metabolites for differences between conditions and correct the result for the number of metabolites tested."
  - "Explain why a multivariate classifier fitted to few samples can separate groups by chance and how such a model is checked."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The abundances of metabolites are log-transformed before analysis, since they vary over several orders of magnitude and the differences between conditions are more meaningful on a log scale. The test for each metabolite is then a comparison of the log abundances between groups, with the correction for the number of metabolites tested. Ioannidis (2005) described how the number of tests inflates the number of false findings, and a metabolomic study that tests hundreds of metabolites needs the correction as much as a genomic one.

Multivariate methods summarise many metabolites at once. Principal component analysis finds the directions of greatest variation among the samples, and partial least squares discriminant analysis seeks the directions that separate the groups. Both produce attractive plots, and both can mislead. A plot in which two groups separate may reflect the instrument, the order of the runs or the chance pattern of a small sample rather than biology.

Over-fitting is the central danger of a classifier. With many metabolites and few samples, a model can separate the groups perfectly on the samples it was trained on and fail completely on new ones. The model must therefore be validated on samples withheld from the fitting, and the performance reported on those samples. A classifier reported only on its training data says nothing about its use.

Platt (1964) recommended framing tests so that they exclude competing explanations. A separation of groups should be checked against the explanation that it is produced by the run order or by a batch, and a permutation test, in which the group labels are shuffled and the separation recomputed, shows how often such a separation arises by chance.

Sandve et al. (2013) recommended recording the models and their validation, and the transformation, the test, the correction and the validation set are the statistics of a metabolomic result.
