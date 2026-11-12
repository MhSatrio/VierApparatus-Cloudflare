---
title: "Generalized Linear Models"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "Generalized linear models that extend linear regression to responses that are not normally distributed, covering the exponential family of distributions, the link function that connects the linear predictor to the mean, the logistic regression of binary outcomes with its odds ratios, the Poisson and negative binomial regression of counts with their rates and offsets, the estimation by maximum likelihood, the deviance as the measure of fit and the checks of dispersion that determine whether a count model is adequate."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Choose a generalized linear model with a suitable distribution and link for a binary outcome and for a count, and state the interpretation of its coefficients."
  - "Check a count model for overdispersion and select a model that allows for it when the variance exceeds the mean."
references:
  - "Nelder, J. A., & Wedderburn, R. W. M. (1972). Generalized linear models. Journal of the Royal Statistical Society. Series A (General), 135(3), 370-384. https://doi.org/10.2307/2344614"
  - "Love, M. I., Huber, W., & Anders, S. (2014). Moderated estimation of fold change and dispersion for RNA-seq data with DESeq2. Genome Biology, 15(12), 550. https://doi.org/10.1186/s13059-014-0550-8"
  - "Akaike, H. (1974). A new look at the statistical model identification. IEEE Transactions on Automatic Control, 19(6), 716-723. https://doi.org/10.1109/TAC.1974.1100705"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A generalized linear model extends the linear regression of the previous topic to responses that are not normally distributed. Nelder and Wedderburn (1972) introduced the framework, in which the response follows a distribution from a broad family, the exponential family, and the expected value of the response is connected to a linear combination of predictors by a link function. Many biological responses fall outside the normal model: an outcome that is yes or no, a count of events, or a proportion of a whole. The framework handles each with a suitable distribution and link.

The topic covers the principal members of the family as they are used in biology. Logistic regression models binary outcomes, such as survival to a stage or the presence of a marker, and its coefficients are interpreted as log odds ratios. Poisson and negative binomial regression model counts, such as the number of cells or reads, with rates and offsets that account for differences in exposure. The deviance measures the fit, and the checks of dispersion decide between the simpler and the more flexible model.

Love et al. (2014) used a negative binomial model with a log link for RNA sequencing counts, and the same framework is the basis of their analysis of dispersion. The choice of distribution follows from the nature of the response, and the model must be checked after it is fitted, since a wrong distribution gives wrong standard errors and p-values.
