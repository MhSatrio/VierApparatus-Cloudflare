---
title: "The Exponential Family and Link Functions"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The exponential family of distributions that a generalised linear model uses, including the normal, binomial, Poisson and gamma members, the link function that maps the expected response to the linear predictor, the canonical links of each family, the logit link for proportions, the log link for rates and counts, and the reason the choice of link determines how the coefficients are interpreted on the scale of the response."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Name the members of the exponential family used in biology and state the response each models."
  - "Explain the role of the link function and interpret a coefficient on the scale of the link."
references:
  - "Nelder, J. A., & Wedderburn, R. W. M. (1972). Generalized linear models. Journal of the Royal Statistical Society. Series A (General), 135(3), 370-384. https://doi.org/10.2307/2344614"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The exponential family is a class of distributions whose densities share a common form, and it includes the normal, the binomial, the Poisson and the gamma distributions among others. Nelder and Wedderburn (1972) showed that a single fitting procedure, iterative weighted least squares, estimates the coefficients for any member of the family, and this is the reason one framework covers so many biological responses. Each member has a variance that depends on its mean in a particular way, and the variance function is what distinguishes the models.

The link function connects the expected response to the linear predictor. For a normal response the link is the identity, so the mean is the linear predictor itself. For a binomial response, the logit link keeps the mean between zero and one and produces the logistic model. For a Poisson count, the log link keeps the mean positive and makes the coefficients multiplicative. The canonical link of each family is the one that arises naturally from its form, but other links are often used where they suit the biology better.

The interpretation of a coefficient depends on the link. Under the log link, a coefficient is the log of a multiplicative effect on the mean, and its exponential is the ratio of means. Under the logit link, a coefficient is the log of an odds ratio. The scale must be stated, and a coefficient reported without its link is ambiguous.

The choice of family must match the response. A proportion of a whole is modelled by the binomial with its denominator, a count by the Poisson or a family that allows overdispersion, and a positive continuous measurement with variance that grows with its mean by the gamma. Sandve et al. (2013) recommended recording the family and the link, since the interpretation and the checks depend on both.
