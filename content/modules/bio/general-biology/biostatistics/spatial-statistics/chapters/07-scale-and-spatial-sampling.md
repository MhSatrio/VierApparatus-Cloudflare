---
title: "Scale and Spatial Sampling"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The dependence of spatial patterns on the scale of observation, the modifiable areal unit problem in which the boundaries of regions change the statistics, the grain and extent of a sampling design and their effect on the patterns that can be detected, the choice of sampling designs such as random, systematic and stratified placement of plots, and the reasons that a conclusion drawn at one scale may fail at another."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how the grain and extent of a sampling design limit the patterns that it can detect."
  - "Describe the modifiable areal unit problem and state how a change of regional boundaries can change a result."
references:
  - "Legendre, P. (1993). Spatial autocorrelation: Trouble or new paradigm? Ecology, 74(6), 1659-1673. https://doi.org/10.2307/1939924"
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

A spatial pattern depends on the scale at which it is observed. The grain is the size of the smallest unit sampled, and the extent is the size of the whole region studied. A fine grain reveals small-scale variation that a coarse grain averages out, and a small extent cannot show a pattern that operates over larger distances. A conclusion about a pattern is therefore a conclusion about a particular grain and extent, and it may not hold when either is changed.

The modifiable areal unit problem arises when data are aggregated into regions whose boundaries are chosen arbitrarily. Different boundaries, even with the same number of regions, can give different correlations, different clusters and different regression coefficients, because the aggregation changes the values that are analysed. Legendre (1993) emphasised that the scale of the study shapes the apparent autocorrelation, and a result based on one set of boundaries should be tested against others.

Sampling designs determine which patterns can be seen. Random placement of plots gives unbiased estimates but may leave gaps and clusters by chance. Systematic placement covers the region evenly and reveals regularity, but it can alias with a periodic pattern. Stratified placement samples each of several zones, which ensures coverage of rare habitats and allows comparison between them. The design should be chosen to answer the question, and the reasons for the choice should be recorded.

Wilkinson et al. (2016) set out principles under which the sampling design, the grain, the extent and the boundaries should be documented, so that the scale of the result is clear to a reader. Cumming (2014) argues that a result should be reported with its interval and with the scale to which it refers, since an estimate without its scale can be misapplied to a different region.
