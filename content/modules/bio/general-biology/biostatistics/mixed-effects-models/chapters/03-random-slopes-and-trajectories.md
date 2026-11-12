---
title: "Random Slopes and Trajectories"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "Random-slope models in which each individual has its own rate of change over time as well as its own baseline, the modelling of individual growth or response trajectories, the covariance between random intercepts and slopes, the population trajectory described by the fixed effects, the prediction of individual trajectories by shrinkage and the reasons a random slope should be justified by the data because it adds parameters that can be poorly estimated in small studies."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Specify a random-slope model that allows each individual its own trajectory over time and interpret the population slope."
  - "Explain the covariance between random intercepts and random slopes and why a random slope should be justified by the data."
references:
  - "Laird, N. M., & Ware, J. H. (1982). Random-effects models for longitudinal data. Biometrics, 38(4), 963-974. https://doi.org/10.2307/2529876"
  - "Bates, D., Mächler, M., Bolker, B., & Walker, S. (2015). Fitting linear mixed-effects models using lme4. Journal of Statistical Software, 67(1), 1-48. https://doi.org/10.18637/jss.v067.i01"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A random slope extends the random intercept by allowing each individual to change at its own rate. A growth study in which some animals gain weight faster than others is described by a population trajectory and by individual deviations in both the starting value and the rate of change. Laird and Ware (1982) described this family of models for trajectories, and the population slope is the fixed effect that summarises the average rate of change across individuals.

The random intercept and the random slope are typically correlated. Individuals who start high may change more slowly, or the reverse, and the covariance between them is estimated along with their variances. The covariance matrix of the random effects describes how the trajectories differ, and it is often the most interesting output of the model for a biologist who wants to know whether individuals diverge over time.

Each individual's trajectory is predicted by combining the population trend with that individual's data, with shrinkage toward the population for individuals with few observations. The prediction is useful for describing an individual, but it borrows strength from the population, and it should not be presented as if it were a measurement of the individual alone.

The random slope adds parameters, and these can be poorly estimated in small studies. A model with a random slope for each individual may fail to converge or give a slope variance that is unreliable, and the simpler random-intercept model may then be preferable. Ioannidis (2005) described how a more complex model fitted to limited data can produce results that do not hold, and the random slope should be justified by a clear question about individual change.

Bates et al. (2015) describe how such models are specified and fitted, and Sandve et al. (2013) recommended recording the random structure, the convergence of the fit and the covariance estimated.
