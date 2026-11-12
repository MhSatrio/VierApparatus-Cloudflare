---
title: "Spatial Regression"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "Regression models for an outcome observed at locations when the residuals are spatially correlated, the spatial lag model in which the neighbours' values enter the model, the spatial error model in which the correlation sits in the residuals, the consequences of ignoring the dependence for the standard errors and the significance of the predictors, the diagnostics that choose between the models, and the interpretation of coefficients when the spatial term absorbs part of the predictor's effect."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Distinguish a spatial lag model from a spatial error model and state the source of dependence each represents."
  - "Explain how ignoring spatial dependence in a regression changes the standard errors and the significance of a predictor."
references:
  - "Legendre, P. (1993). Spatial autocorrelation: Trouble or new paradigm? Ecology, 74(6), 1659-1673. https://doi.org/10.2307/1939924"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

Ordinary regression assumes that the residuals are independent. When an outcome is observed at locations, the residuals of nearby observations are often correlated, because the processes that the predictors do not capture operate across space. The estimates of the coefficients may remain unbiased, but their standard errors are wrong, and a predictor may appear significant when the dependence is ignored. Spatial regression models make the dependence explicit, so that the effects of the predictors are estimated with an honest precision.

The spatial lag model includes the average of the outcome at neighbouring locations as a predictor. It represents a process in which the value at one place depends on the values at its neighbours, such as the spread of an organism or an infection. The spatial error model places the dependence in the residuals, representing an unmeasured spatially structured factor that affects the outcome. The two models answer different questions, and the choice between them should rest on the process believed to generate the pattern rather than on which fits better alone.

Diagnostic tests examine the residuals of an ordinary regression for spatial dependence, and the results indicate which spatial model to fit. Legendre (1993) argued that the dependence should be examined and modelled rather than ignored, since it carries information about the process. A model that absorbs the dependence into a lag term changes the meaning of the predictor coefficients, because part of the effect of a predictor may pass through the neighbours, and the interpretation must follow the model.

Cumming (2014) argues that the coefficients should be reported with their intervals, and the spatial parameter should be reported as well. Peng (2011) argued that a regression is reproducible only when its weights, its software and its data are available, and the spatial weights and the model specification should be recorded with the results.
