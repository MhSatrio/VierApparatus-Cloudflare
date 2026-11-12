---
title: "Reporting Regression Models"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "What a report of a regression model must contain for its coefficients to be interpreted and its predictions checked, including the response and predictors with their units and coding, the reference levels, the coefficients with their intervals and standard errors, the fit statistics and the model comparison, the diagnostics and their handling of influential observations, the validation of any predictive claim and the deposition of the data and the code."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "List the information a regression report must contain for a reader to interpret each coefficient in the units of the study."
  - "Report a regression with its coefficients, intervals, diagnostics and the validation of its predictions."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A regression report must let a reader interpret each coefficient in the units of the biology and check the model that produced it. The response and each predictor should be given with their units and their coding, so that a coefficient can be read as a change in the response per unit of its predictor. Cumming (2014) argues that the estimates and their intervals should lead the report, since they show both the size and the precision of each relation.

The coefficients are reported with their intervals, and the reference levels of any categorical predictor are stated beside them. The intercept is reported with its meaning, which is the expected response when every predictor is at its reference or zero, and a report that gives an intercept without its meaning is incomplete. The fit statistics, such as the residual standard error and the proportion of variation explained, are given with the comparison of any alternative models considered.

The diagnostics and their handling are the third item. The residual checks, the influential observations and the collinearity measures should be reported with the decisions made about them, so that a reader knows whether the coefficients depend on a few points or on a fragile set of predictors. Peng (2011) argued that a computational result must be accompanied by the means of reproducing it, and the diagnostics are part of those means.

The validation of any predictive claim is the fourth item. A model used to predict new observations should be reported with its performance on withheld data, and its prediction intervals, not only its fit to the data used to build it. Wilkinson et al. (2016) set out the principles under which the data and the code should be deposited so that others can repeat the analysis, and Sandve et al. (2013) recommended keeping the outputs of an analysis with its inputs and steps.
