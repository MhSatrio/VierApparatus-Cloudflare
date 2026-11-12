---
title: "Poisson and Rate Models"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "Poisson regression for counts with a log link, the interpretation of coefficients as rate ratios, the offset that adjusts for unequal exposure such as sampling effort or sequencing depth, the test of overdispersion that compares the variance with the mean, the negative binomial regression that allows the variance to exceed the mean and the reporting of rate ratios with their intervals."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Fit a Poisson regression with an offset to a count and interpret the coefficient as a rate ratio."
  - "Test a count model for overdispersion and state when a negative binomial model should replace the Poisson."
references:
  - "Nelder, J. A., & Wedderburn, R. W. M. (1972). Generalized linear models. Journal of the Royal Statistical Society. Series A (General), 135(3), 370-384. https://doi.org/10.2307/2344614"
  - "Love, M. I., Huber, W., & Anders, S. (2014). Moderated estimation of fold change and dispersion for RNA-seq data with DESeq2. Genome Biology, 15(12), 550. https://doi.org/10.1186/s13059-014-0550-8"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Poisson regression models a count as a function of predictors, with a log link that keeps the expected count positive and makes the effects multiplicative. The coefficient of a predictor is the log of a rate ratio, and its exponential is the factor by which the expected count is multiplied for a unit change in the predictor. Nelder and Wedderburn (1972) describe the Poisson family with its log link, and it is the standard model for counts of events such as colonies, mutations or reads.

Counts are often observed over different amounts of exposure: a plate counted for longer, a sample sequenced more deeply, a field surveyed for more hours. The offset is a term in the linear predictor that adjusts for this exposure, with its coefficient fixed at one, so that the model estimates the rate per unit of exposure rather than the raw count. Omitting the offset when exposures differ confounds the effect of the predictor with the effect of the exposure.

The Poisson model assumes that the variance equals the mean. Biological counts frequently violate this, because the biological variation between units adds to the sampling variation, and the variance exceeds the mean. Love et al. (2014) modelled RNA sequencing counts for this reason, and the negative binomial model, which allows the variance to be a function of the mean, is the usual remedy. A test of overdispersion compares the Pearson statistic or the deviance with its degrees of freedom, and a value well above one indicates that the Poisson standard errors are too small.

Cumming (2014) argues that a rate ratio should be reported with its interval, since the interval shows the range of plausible multiplicative effects. The report should state the offset and the reference level, since both determine the rate ratio's meaning.

Sandve et al. (2013) recommended recording the exposure, the offset and the dispersion check, since a count model without these is not interpretable.
