---
title: "Hierarchical Models"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "Hierarchical Bayesian models in which the parameters of several groups are drawn from a common population distribution, so that the groups share information and their estimates are shrunk toward the overall mean, the hyperparameters that describe the population distribution, the partial pooling that lies between treating groups separately and pooling them completely, and the reasons the hierarchical structure is natural for biological data collected from many individuals, sites or experiments."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Specify a hierarchical model in which group parameters are drawn from a common distribution and state what the hyperparameters describe."
  - "Explain partial pooling and why a group with few observations is shrunk more strongly toward the population mean."
references:
  - "Gelman, A., & Shalizi, C. R. (2013). Philosophy and the practice of Bayesian statistics. British Journal of Mathematical and Statistical Psychology, 66(1), 8-38. https://doi.org/10.1111/j.2044-8317.2011.02037.x"
  - "Laird, N. M., & Ware, J. H. (1982). Random-effects models for longitudinal data. Biometrics, 38(4), 963-974. https://doi.org/10.2307/2529876"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A hierarchical model treats the parameters of several groups as draws from a common distribution. Each group, such as an individual, a site or an experiment, has its own parameter, and the population of these parameters is described by hyperparameters, such as their mean and spread. The groups share information through the population distribution, so that a group with little data borrows strength from the others. Gelman and Shalizi (2013) discuss hierarchical models as a central tool of Bayesian practice, and the structure is the Bayesian counterpart of the random effects of the mixed-model topic.

The result is partial pooling. Treating each group separately gives estimates that are noisy for small groups, and pooling all groups together ignores their differences. The hierarchical model lies between these, shrinking each group's estimate toward the population mean by an amount that depends on how many observations the group has. A group with many observations is shrunk little, and a group with few is shrunk strongly, which is a sensible compromise between the group's data and the population.

Laird and Ware (1982) described the random-effects structure that the frequentist mixed model uses for the same purpose, and the hierarchical Bayesian model extends it by placing priors on the hyperparameters. The priors on the spread of the population are often the most influential choice, since a population with a very small spread shrinks the groups strongly, and the prior must be reasoned about with care.

The hierarchical structure fits biological data well, because samples are usually drawn from populations of individuals, sites or experiments that differ, and the question concerns both the individuals and the population they represent. The shrinkage of individual estimates is an honest consequence of the model, and it must be explained to readers who expect the raw means.

Sandve et al. (2013) recommended recording the hierarchical structure, the priors on the hyperparameters and the resulting shrinkage, since these determine the group estimates reported.
