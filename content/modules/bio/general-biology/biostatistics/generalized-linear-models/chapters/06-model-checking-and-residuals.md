---
title: "Model Checking and Residuals"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "How a fitted generalised linear model is checked, including the deviance and Pearson residuals that account for the non-normal variance of each family, the plots of residuals against fitted values and predictors that reveal misspecified links or missing terms, the check of the mean-variance relation implied by the family, the detection of influential observations in models without normal errors and the consequences of a wrong distribution or link for the standard errors and the interpretation of the coefficients."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Compute deviance and Pearson residuals and use them to check the mean-variance relation of a fitted generalised linear model."
  - "Identify a misspecified link or a missing term from a plot of residuals against a predictor."
references:
  - "Nelder, J. A., & Wedderburn, R. W. M. (1972). Generalized linear models. Journal of the Royal Statistical Society. Series A (General), 135(3), 370-384. https://doi.org/10.2307/2344614"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The residuals of a generalised linear model are not the simple differences of the linear model, because the variance of the response changes with its mean. Deviance residuals and Pearson residuals rescale the differences by the variance implied by the family, so that they can be compared across the range of the fitted values. Nelder and Wedderburn (1972) describe the family-based variance function on which these residuals are built, and the checks of the model rest on them.

A plot of the residuals against the fitted values checks the mean-variance relation. For a Poisson model the Pearson residuals should have a spread that does not depend on the fitted value once scaled, and a spread that grows with the fitted value indicates that the variance is larger than the family allows. The check is the diagnostic for overdispersion described in the previous chapter, and it should be made for each family.

A plot of the residuals against each predictor reveals a misspecified link or a missing term. A curve in the residuals against a continuous predictor indicates that the linear term is inadequate and that a transformation or a polynomial term is needed. A pattern against a categorical predictor indicates that a level has been treated wrongly. Such plots are the practical means of testing the model's form.

Influential observations also matter for generalised models. A count with an unusually large value relative to its expected count can dominate the fit, and the diagnostics of the regression topic apply in a modified form. The decision to retain or exclude an observation must be made on its measurement, not on the effect it has on the coefficients.

Cumming (2014) argues that the adequacy of a model should be shown rather than assumed, and the residual plots are the means of showing it. Sandve et al. (2013) recommended recording the residual checks and their outcomes, since the reader needs them to judge the coefficients and their standard errors.
