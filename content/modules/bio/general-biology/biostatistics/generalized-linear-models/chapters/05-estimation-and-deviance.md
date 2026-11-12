---
title: "Estimation and Deviance"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "How the coefficients of a generalised linear model are estimated by maximum likelihood using iteratively reweighted least squares, the deviance as twice the difference between the log likelihood of the saturated model and that of the fitted model, the null deviance and the residual deviance, the use of the change in deviance to compare nested models and the approximations on which these comparisons rely for small samples."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how a generalised linear model is fitted by iteratively reweighted least squares and why this estimates the maximum likelihood."
  - "Compute the deviance of a fitted model and use the change in deviance to compare two nested models."
references:
  - "Nelder, J. A., & Wedderburn, R. W. M. (1972). Generalized linear models. Journal of the Royal Statistical Society. Series A (General), 135(3), 370-384. https://doi.org/10.2307/2344614"
  - "Akaike, H. (1974). A new look at the statistical model identification. IEEE Transactions on Automatic Control, 19(6), 716-723. https://doi.org/10.1109/TAC.1974.1100705"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Nelder and Wedderburn (1972) showed that the coefficients of a generalised linear model can be estimated by a single iterative procedure, which repeatedly fits a weighted least squares problem to a working response until the estimates stop changing. The procedure maximises the likelihood of the data under the model, and its result is the maximum likelihood estimate. The weights and the working response depend on the family and the link, which is why one algorithm serves every member of the family.

The deviance is the measure of fit for these models. It is twice the difference between the log likelihood of the saturated model, which fits every observation exactly, and the log likelihood of the fitted model. The null deviance is the deviance of the model with only an intercept, and the residual deviance is that of the fitted model. The reduction from null to residual deviance measures how much of the variation the predictors explain, in the sense of the likelihood.

Nested models are compared by the change in deviance. The difference between the deviances of two nested models is referred to a chi-squared distribution with the number of added parameters as its degrees of freedom, and the test is a likelihood ratio test. The approximation is good for large samples, and it is poor for small samples and for discrete responses with few counts, where the deviance is a biased guide.

Akaike (1974) introduced an information criterion that uses the maximised likelihood and penalises the number of parameters, and it provides a comparison of non-nested models that the deviance test cannot give. Both tools compare models on the same data, and the comparison does not establish that the better model is correct.

Sandve et al. (2013) recommended recording the estimation method, the deviances and the comparisons made, since the model choice depends on these values.
