---
title: "Categorical Predictors and Dummy Coding"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "How categorical predictors such as genotype, treatment or site enter a regression through dummy coding, in which each non-reference level receives an indicator and its coefficient is the difference from the reference level, the choice of reference level and its effect on the interpretation, the equivalence between a regression on dummy variables and an analysis of variance, the interaction of a categorical predictor with a continuous one and the reporting of the contrasts that the coding produces."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Code a categorical predictor with dummy variables and interpret each coefficient as a difference from the reference level."
  - "Explain how the choice of reference level changes the coefficients without changing the fitted model."
references:
  - "Nelder, J. A., & Wedderburn, R. W. M. (1972). Generalized linear models. Journal of the Royal Statistical Society. Series A (General), 135(3), 370-384. https://doi.org/10.2307/2344614"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A categorical predictor enters a regression through dummy coding. One level is chosen as the reference, and each of the other levels receives an indicator variable that is one for individuals at that level and zero otherwise. The coefficient of each indicator is the difference between the mean of its level and the mean of the reference, holding the other predictors fixed. A factor with four levels therefore adds three coefficients to the model, and the intercept is the expected response at the reference level.

The reference level determines the meaning of the coefficients, but not the fitted model. Changing the reference changes the coefficients, which become differences from a different baseline, and it does not change the predicted values or the overall fit. A reader must therefore know the reference level before interpreting a coefficient, and a table that shows coefficients without the reference is ambiguous. Nelder and Wedderburn (1972) describe the linear predictor in which such coding is used, and the same principle applies in every family.

A regression on dummy variables is the same model as the analysis of variance. The tests of the factor in the regression correspond to the F test of the factor in the analysis of variance, and the coefficients correspond to the contrasts with the reference. The two routes give identical results for the same model, and the choice between them is a matter of presentation.

A categorical predictor interacts with a continuous one when the slope of the continuous predictor differs between the levels. The interaction is coded with products of the dummy variables and the continuous predictor, and its coefficients show how the slope differs from the reference slope. Cumming (2014) argues that the difference between slopes should be reported with its interval, since it describes the difference in the response to the continuous predictor across the groups.

Sandve et al. (2013) recommended recording the coding and the reference levels, since a regression with categorical predictors is not interpretable without them.
