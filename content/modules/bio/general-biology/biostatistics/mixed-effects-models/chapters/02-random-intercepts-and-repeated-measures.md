---
title: "Random Intercepts and Repeated Measures"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The random-intercept model for repeated measurements on the same individuals, in which each individual has its own baseline and the observations within an individual are correlated, the estimation of the between-individual and residual variance, the intraclass correlation that measures the share of variation due to individuals, the handling of unbalanced and missing repeated measurements that a mixed model allows and the reasons a repeated measures analysis that ignores the correlation understates its standard errors."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Specify a random-intercept model for repeated measurements and compute the intraclass correlation from its variance components."
  - "Explain why ignoring the correlation among repeated measurements understates the standard errors of the treatment effects."
references:
  - "Laird, N. M., & Ware, J. H. (1982). Random-effects models for longitudinal data. Biometrics, 38(4), 963-974. https://doi.org/10.2307/2529876"
  - "Bates, D., Mächler, M., Bolker, B., & Walker, S. (2015). Fitting linear mixed-effects models using lme4. Journal of Statistical Software, 67(1), 1-48. https://doi.org/10.18637/jss.v067.i01"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The simplest mixed model for repeated measurements gives each individual its own intercept, a random effect that shifts the whole trajectory of that individual up or down. Measurements taken on the same individual then share this intercept and are correlated, and the model captures the correlation through the variance of the intercepts. Laird and Ware (1982) described this structure for longitudinal data, and it is the standard model for the repeated measures of a biological study.

The variance components separate the variation between individuals from the residual variation within them. The intraclass correlation is the share of the total variance that lies between individuals, and it measures how strongly the measurements of one individual resemble each other. A high intraclass correlation means that the repeated measurements carry little information beyond what one measurement gives, and the effective sample size is much smaller than the number of observations.

A repeated measures analysis that ignores the correlation treats each observation as independent. The standard error of a treatment effect then uses the residual variance alone, and when the correlation is high it is much too small. Cumming (2014) argues that the precision of an estimate must reflect the design, and an interval computed from the wrong standard error is precise in appearance only.

A mixed model handles unbalanced data naturally. Individuals may contribute different numbers of measurements, and some measurements may be missing, and the model uses all the available data without discarding individuals who lack one time point. The estimation with maximum likelihood or restricted maximum likelihood, as Bates et al. (2015) implement, supports this flexibility.

Sandve et al. (2013) recommended recording the random structure, the variance components and the intraclass correlation, since these describe how the repeated measurements relate.
