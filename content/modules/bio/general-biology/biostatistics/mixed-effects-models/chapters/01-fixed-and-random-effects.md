---
title: "Fixed and Random Effects"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The distinction between fixed effects, whose levels are of interest in themselves and are the same in every study, and random effects, whose levels are a sample from a larger population of units such as individuals, sites or batches, the variance components that describe the spread of random effects, the shrinkage of unit estimates toward the population mean and the reasons a factor with few levels is often better treated as fixed while a factor with many levels sampled from a population is treated as random."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Decide whether a factor of a biological study should be treated as fixed or random and state the reason."
  - "Explain how a random effect shrinks the estimate for each unit toward the population mean."
references:
  - "Laird, N. M., & Ware, J. H. (1982). Random-effects models for longitudinal data. Biometrics, 38(4), 963-974. https://doi.org/10.2307/2529876"
  - "Bates, D., Mächler, M., Bolker, B., & Walker, S. (2015). Fitting linear mixed-effects models using lme4. Journal of Statistical Software, 67(1), 1-48. https://doi.org/10.18637/jss.v067.i01"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A fixed effect is a factor whose levels are the subject of the study and would be the same in a repeat of it: the two genotypes compared, the three doses tested, the two sexes. A random effect is a factor whose levels are a sample from a larger population of units, such as the individual animals drawn from a colony, the sites chosen from a region or the batches of processing. The distinction is not about the factor itself but about what the inference is meant to cover: the fixed effect is estimated for those levels, and the random effect is a source of variation to be described.

Laird and Ware (1982) described random effects as the means of modelling individual differences, with each unit's deviation from the population drawn from a distribution whose variance is estimated. The variance components are the most informative output of such a model, since they show how much the units differ relative to the residual noise, and a large unit variance tells the analyst that the individuals respond differently even when they are treated alike.

A random effect produces shrinkage. The estimate for each unit is pulled toward the population mean, and the amount of shrinkage depends on how many observations the unit contributes and how large the unit variance is. A unit with few observations is shrunk strongly, which is a sensible compromise between its own data and the population, but it means that the unit estimates are not the raw means of the units. The shrinkage must be understood when individual estimates are reported.

A factor with few levels is usually better treated as fixed, since a variance estimated from two or three levels is unreliable. A factor with many levels that are a sample from a population is usually treated as random, which also allows the inference to extend to the population. Bates et al. (2015) describe how these decisions are written in the model formula, and the choice should be reported with the reason.

Sandve et al. (2013) recommended recording which factors were fixed and which random, since the inference drawn from the model depends on the choice.
