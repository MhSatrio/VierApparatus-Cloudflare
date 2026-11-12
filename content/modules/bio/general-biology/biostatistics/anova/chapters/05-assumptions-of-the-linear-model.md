---
title: "Assumptions of the Linear Model"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The assumptions of the linear model that underlies analysis of variance, namely that the residuals are independent with a normal distribution and constant variance across the groups, the residual plots that check these assumptions, the consequences of heteroscedasticity and of non-normality for the F tests and the transformations and robust alternatives used when the assumptions fail, with the reasons the independence of the residuals depends on the design rather than on any plot."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Check the residuals of a linear model for constant variance and normality with plots and state what each plot reveals."
  - "Explain why independence of the residuals cannot be verified from a plot and must be secured by the design."
references:
  - "Nelder, J. A., & Wedderburn, R. W. M. (1972). Generalized linear models. Journal of the Royal Statistical Society. Series A (General), 135(3), 370-384. https://doi.org/10.2307/2344614"
  - "Wasserstein, R. L., & Lazar, N. A. (2016). The ASA statement on p-values: Context, process, and purpose. The American Statistician, 70(2), 129-133. https://doi.org/10.1080/00031305.2016.1154108"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The linear model assumes that the residuals, the differences between the observations and the fitted values, are independent, normally distributed and have constant variance across the groups. The F tests of the analysis of variance are exact under these assumptions, and their p-values can be misleading when they fail. Nelder and Wedderburn (1972) describe the model within which these assumptions are stated, and the checks of residuals are the practical means of examining them after the model has been fitted.

Residual plots show whether the variance is constant. A plot of residuals against fitted values should show a band of even width, and a funnel shape, with the spread increasing with the mean, indicates that the variance depends on the level of the response. Biological variables often have this property, and a logarithmic transformation frequently stabilises the variance, as the descriptive topic on transformations explained. A normal probability plot of the residuals checks the distribution, and departures in the tails matter most for small samples.

Independence cannot be checked by a plot of this kind. The residuals may look random while the observations are correlated because they come from the same individual, the same batch or the same site. The independence must be secured by the design and by the model, which may need random effects for the clustering, a topic treated in a later chapter of this series. A residual plot that looks perfect does not establish independence.

When the assumptions fail, the options are a transformation, a more appropriate model or a robust method. Wasserstein and Lazar (2016) note that a p-value is computed under the model, and an analysis that violates the model's assumptions reports a p-value that does not mean what it states. The honest response is to change the model, not to report the p-value anyway.

Sandve et al. (2013) recommended recording the residual checks and their outcomes, together with any transformation or alternative model used.
