---
title: "Simple Linear Regression"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The simple linear regression of a biological response on one continuous predictor, the model that writes the expected response as an intercept plus a slope times the predictor, the least squares estimates of the intercept and slope, the residual variance and the standard errors of the estimates, the interpretation of the slope as the change in the expected response per unit of the predictor and the coefficient of determination as the proportion of variation explained."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Fit a simple linear regression by least squares and interpret the intercept, the slope and the coefficient of determination."
  - "State the assumptions of the simple linear model and explain what the slope's standard error and interval measure."
references:
  - "Nelder, J. A., & Wedderburn, R. W. M. (1972). Generalized linear models. Journal of the Royal Statistical Society. Series A (General), 135(3), 370-384. https://doi.org/10.2307/2344614"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The simple linear regression describes the expected value of a response as a straight line in one predictor: the expected response equals an intercept plus a slope times the predictor, plus a residual that varies around zero. The line is estimated by least squares, which chooses the intercept and slope that minimise the sum of the squared residuals. The slope is the change in the expected response for a unit change in the predictor, and it is the quantity that most biological questions concern: how much does the response change as the dose, the temperature or the concentration changes.

The estimates have standard errors, from which intervals and tests follow in the usual way. The standard error of the slope depends on the residual variance and on the spread of the predictor, so a predictor measured over a wide range gives a more precise slope than one measured over a narrow range. The interval of the slope is the most informative summary of the relationship, and Cumming (2014) argues that it should be reported alongside the estimate.

The coefficient of determination, R squared, is the proportion of the variation in the response explained by the line. It is a description of the fit in the sample, and a high value does not establish that the relation is causal or that the model will predict new observations well. Nelder and Wedderburn (1972) set out the linear model within which the least squares estimates are the maximum likelihood estimates, and the interpretation of the slope follows from that model.

The simple model assumes that the relationship is linear, that the residuals are independent with constant variance and that they are approximately normal. The checks of residuals described in the analysis of variance topic apply, and the scatter of the data with the fitted line is the first check.

Sandve et al. (2013) recommended recording the model, the estimates and the checks, so that a reader can see what the line is claimed to describe.
