---
title: "Regression Analysis"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "Linear regression as the modelling of a biological response as a function of one or more predictors, covering the simple and multiple regression models, the estimation of coefficients by least squares, the interpretation of each coefficient as an adjusted effect, the assessment of fit and of the predictors, the diagnostics that detect influential observations and violated assumptions, the collinearity among predictors and the reporting of the model in a form a biologist can use."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Fit a multiple linear regression to a biological response and interpret each coefficient as an effect adjusted for the other predictors."
  - "Diagnose a regression for influential observations, collinearity and violated assumptions and state how each is handled."
references:
  - "Nelder, J. A., & Wedderburn, R. W. M. (1972). Generalized linear models. Journal of the Royal Statistical Society. Series A (General), 135(3), 370-384. https://doi.org/10.2307/2344614"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Wasserstein, R. L., & Lazar, N. A. (2016). The ASA statement on p-values: Context, process, and purpose. The American Statistician, 70(2), 129-133. https://doi.org/10.1080/00031305.2016.1154108"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Regression models a response as a function of one or more predictors. A biologist who measures the growth of plants at several levels of nitrogen and several levels of light is asking how each predictor relates to growth, and a regression model answers this with a coefficient for each predictor. The linear regression is the most used form, and it is the model that underlies the analysis of variance treated in the previous topic, since a factor is simply a set of indicator predictors.

The topic covers the model and its estimation, the interpretation of its coefficients, the checks of fit and the diagnostics. Nelder and Wedderburn (1972) placed the linear model within the family of models whose coefficients are estimated and interpreted in the same way, and the later topic on generalised models extends this family to responses that are not normal. The interpretation of coefficients as adjusted effects, which is the defining feature of multiple regression, is treated with care, since the adjustment depends on what other predictors are included.

Regression is powerful and easily misused. A model with many predictors fits the data closely and may predict poorly, and the choice of predictors can be made to produce a desired result. Wasserstein and Lazar (2016) note that the p-value of a coefficient depends on the model, and the report should state the model and not only its best-fitting form. The reader should be able to see every model considered.
