---
title: "Spatial Statistics"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The statistical analysis of observations that have locations, covering the spatial autocorrelation that makes nearby observations similar and violates the independence of ordinary tests, the measures of autocorrelation such as Moran's I, the variogram and kriging for interpolating a continuous surface, the analysis of point patterns for clustering and regularity, spatial regression that models the dependence explicitly, and the role of scale and sampling design in the conclusions drawn from maps."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how spatial autocorrelation violates the independence assumed by ordinary tests and state a measure that detects it."
  - "Describe the variogram and the interpolation by kriging, and state the scale at which a spatial result applies."
references:
  - "Legendre, P. (1993). Spatial autocorrelation: Trouble or new paradigm? Ecology, 74(6), 1659-1673. https://doi.org/10.2307/1939924"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
---

Spatial statistics analyses observations that have locations, such as the presence of a species in a plot, the incidence of a disease in a district or the expression of a gene in a region of tissue. Its central fact is that observations which are close together tend to resemble each other, and this spatial autocorrelation violates the assumption of independence on which ordinary tests rely. Two plots next to each other carry partly the same information, so treating them as separate replicates overstates the sample size and the precision of any estimate.

The topic begins with the measures of autocorrelation, which quantify the resemblance of nearby observations, and the methods that follow use this dependence in different ways. Legendre (1993) argued that spatial autocorrelation is a property to be modelled rather than an error to be removed, and the measures and models in this topic follow that view. The variogram describes how the difference between observations grows with distance, and kriging uses it to interpolate a continuous surface from scattered samples.

Point patterns, in which the events themselves are the data, are analysed for clustering and regularity against a model of random placement. Spatial regression models the dependence explicitly, so that the effect of a predictor is estimated without the distortion of the autocorrelation. Cumming (2014) argues that each estimate should be reported with its interval, and for a map the interval shows how much the surface depends on the particular samples taken.

The final chapters address scale and reporting. A pattern depends on the scale at which it is observed, and a conclusion drawn at one scale may not hold at another. Peng (2011) argued that a result must be reproducible from its means, and Sandve et al. (2013) and Wilkinson et al. (2016) set out the practices of recording and depositing the data so that the maps and their analyses can be repeated.
