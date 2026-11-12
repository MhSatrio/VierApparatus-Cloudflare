---
title: "Collinearity and Predictor Choice"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "Collinearity among the predictors of a regression, in which predictors are strongly correlated and their separate effects are imprecisely estimated, the variance inflation factor that measures its severity, the consequences for the interpretation of individual coefficients that change sign or lose significance when a correlated predictor is added, the choice of predictors that reflects the biology rather than the correlation of the data and the remedies of combining, centring or dropping predictors with an honest account of what is lost."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Compute the variance inflation factor of a predictor and state the level at which collinearity is a concern."
  - "Explain why a coefficient can change sign when a correlated predictor is added and how the predictors should be chosen."
references:
  - "Nelder, J. A., & Wedderburn, R. W. M. (1972). Generalized linear models. Journal of the Royal Statistical Society. Series A (General), 135(3), 370-384. https://doi.org/10.2307/2344614"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Collinearity occurs when two or more predictors are strongly correlated with one another. Their separate effects are then hard to distinguish, because the data contain little information about how each changes when the other is held fixed. The standard errors of the coefficients inflate, and the estimates become unstable: a small change in the data can shift them widely, and a coefficient can change sign or lose its significance when a correlated predictor is added. Nelder and Wedderburn (1972) describe the least squares estimation in which this instability arises from the structure of the predictors.

The variance inflation factor measures the severity of collinearity for each predictor. It is the factor by which the variance of its coefficient is increased by the correlation with the others, and values above a conventional level, often around five or ten, signal a problem worth examining. The threshold is a convention, and the consequences for interpretation are what matter.

The choice of predictors should follow the biology, not the correlations in the data. Two predictors that measure essentially the same thing, such as two indices of body size, cannot both be interpreted as independent effects, and the model should include one, or combine them into a single measure with a clear meaning. Choosing predictors to make the coefficients significant is the flexibility that Ioannidis (2005) described as producing false findings.

Remedies include centring the predictors, which reduces some collinearity without changing the model, combining correlated predictors into a single index, and dropping one of a pair. Each has a cost. Dropping a predictor changes the question the model answers, and combining predictors changes what the coefficient means. The remedy should be chosen for the biological question and reported with its consequences.

Cumming (2014) argues that the interval of each coefficient shows the imprecision that collinearity causes, and the report should give the intervals alongside the variance inflation factors. Sandve et al. (2013) recommended recording the predictors chosen and the reason for each, since the coefficients depend on the set.
