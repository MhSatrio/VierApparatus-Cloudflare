---
title: "Moran's I and Geary's C"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "Global measures of spatial autocorrelation that summarise the resemblance of neighbouring values in one statistic, Moran's I as a measure of covariance among neighbours scaled by variance, Geary's C as a measure based on squared differences among neighbours, the expected value under the null hypothesis of no spatial pattern, the test of significance by permutation or by a theoretical distribution, and the local versions that show where the autocorrelation is concentrated."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Calculate a global measure of spatial autocorrelation from values and a weights matrix and compare it with its expected value under no pattern."
  - "Test the significance of a spatial autocorrelation statistic by permutation and explain what a local measure adds."
references:
  - "Legendre, P. (1993). Spatial autocorrelation: Trouble or new paradigm? Ecology, 74(6), 1659-1673. https://doi.org/10.2307/1939924"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

Global measures summarise the spatial autocorrelation of a whole map in one number. Moran's I is based on the covariance between the values at pairs of neighbouring locations, scaled by the variance of the values, and weighted by the spatial weights matrix. Its values near the expected value under no pattern indicate randomness, values above it indicate that similar values cluster, and values below it indicate that dissimilar values lie next to each other. The expected value is slightly below zero, which is why the comparison must be made against it rather than against zero.

Geary's C is based on the squared differences between neighbouring values rather than on their covariance. It is more sensitive to local differences, while Moran's I is more sensitive to broad patterns, and the two measures can disagree when the pattern is complex. Legendre (1993) pointed out that the choice between them should follow the question, and the report should state which measure was used and why it answers the question asked.

The significance of the statistic is usually tested by permutation. The values are shuffled among the locations many times, the statistic is recalculated for each shuffle, and the observed value is compared with the distribution of the shuffled values. A permutation test makes no assumption about the distribution of the data and is robust to departures from normality, and the number of permutations should be stated so that the p-value can be reproduced.

A global statistic can hide local structure, since a strong cluster in one area may be offset by a weak pattern elsewhere. Local versions of the measures identify the locations that contribute most to the global value, and they show where the autocorrelation is concentrated. Cumming (2014) argues that the magnitude of the statistic should be reported with its interval, and Sandve et al. (2013) recommended recording the weights, the number of permutations and the seed used for the random shuffles.
