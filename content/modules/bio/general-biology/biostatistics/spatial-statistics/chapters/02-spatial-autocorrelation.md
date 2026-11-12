---
title: "Spatial Autocorrelation"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The tendency of observations at nearby locations to resemble each other, the positive and negative forms of autocorrelation, the reason that spatial dependence reduces the effective number of independent observations and inflates the type I error of ordinary tests, the definition of a spatial weights matrix that encodes which pairs are neighbours, and the distinction between autocorrelation as a feature to model and as an artefact of the sampling design."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Define spatial autocorrelation and explain how it reduces the effective number of independent observations."
  - "Construct a spatial weights matrix and state the neighbour definition that it encodes."
references:
  - "Legendre, P. (1993). Spatial autocorrelation: Trouble or new paradigm? Ecology, 74(6), 1659-1673. https://doi.org/10.2307/1939924"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Spatial autocorrelation is the tendency of observations at nearby locations to resemble each other. A plot of soil moisture is likely to be similar to its neighbours, and a population of animals clusters where conditions are favourable. Positive autocorrelation means that nearby values are alike, and negative autocorrelation means that nearby values differ, as in a checkerboard. Most biological surfaces show positive autocorrelation at small distances, and the strength of the dependence usually declines with distance.

The consequence for inference is serious. Ordinary tests assume that the observations are independent, and when neighbouring observations carry similar information, the effective sample size is smaller than the number of observations. The standard error of a mean or a regression coefficient is then underestimated, and the probability of a false positive rises above the nominal level. Legendre (1993) argued that this problem is real but that autocorrelation also carries information about the process generating the pattern, and the analysis should account for it rather than ignore it.

The dependence is encoded in a spatial weights matrix, which records for each pair of locations whether they are neighbours and, if so, how strongly they are linked. The neighbour definition may be a fixed distance, a set number of nearest neighbours or a contiguity of regions, and each choice implies a different model of the dependence. The matrix must be stated, since a result from one definition may not hold for another, and its sensitivity should be tested.

Cumming (2014) argues that an estimate affected by autocorrelation should be reported with a measure of its dependence, so that the reader can see how much the independence assumption has been relaxed. Sandve et al. (2013) recommended recording the weights and the distance threshold with the results, since autocorrelation is a property of the analysis as well as of the data.
