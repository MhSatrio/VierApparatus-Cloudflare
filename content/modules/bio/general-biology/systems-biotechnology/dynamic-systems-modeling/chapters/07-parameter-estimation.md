---
title: "Parameter Estimation"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The estimation of the parameters of a dynamic model from time-course data by minimising the difference between simulated and measured values, the least-squares objective and its weighting by measurement error, the local optimisation that may converge to a poor minimum and the use of multiple starts, the practical identifiability of parameters that the data cannot determine, the profile likelihood and bootstrap estimates of parameter uncertainty, and the division of the data into a fitting set and a validation set."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Estimate the parameters of a dynamic model from time-course data by least squares and state how measurement error weights the objective."
  - "Explain why a parameter may be unidentifiable and describe how to estimate the uncertainty of the parameters."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Most parameters of a dynamic model are not known and must be estimated from time-course data. The estimation minimises the discrepancy between the simulated trajectories and the measurements, usually as a weighted sum of squares in which each measurement is weighted by the inverse of its error variance, so that precise measurements count more than noisy ones. The procedure is an optimisation over the parameter space, and its success depends on the data, the model and the algorithm.

The optimisation is usually local, and it can converge to a poor minimum that is not the best fit. Repeating the optimisation from many starting points is the standard remedy, and the best of the solutions found should be compared with the others. A fit that appears good from one start may be far from the global optimum, and the number of starts and the spread of their results should be reported.

Some parameters cannot be estimated from the data, however good the fit. A parameter is practically unidentifiable if changing it can be compensated by changes in other parameters without altering the predicted trajectories, and such parameters have wide uncertainty whatever the number of measurements. Identifiability should be checked before the parameter values are interpreted, since an estimate of an unidentifiable parameter is an artefact of the optimisation.

The uncertainty of the estimates can be assessed by profile likelihood, which traces how the fit worsens as a parameter is moved away from its optimum, or by bootstrap resampling of the data. Cumming (2014) argues that the estimates should be reported with these intervals, and Ioannidis (2005) described how a fitted model that is judged on the data it was fitted to overstates its accuracy. The data should be divided into a set for fitting and a set for validation, and Sandve et al. (2013) recommended recording both, together with the optimiser and its starts.
