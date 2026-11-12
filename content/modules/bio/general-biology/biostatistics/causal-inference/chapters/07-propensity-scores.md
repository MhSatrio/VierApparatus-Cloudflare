---
title: "Propensity Scores"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The propensity score as the probability of receiving the exposure given the measured covariates, the balancing property by which units with the same score have the same distribution of those covariates in the exposed and unexposed, the estimation of the score by logistic regression, its use for matching, stratification and weighting, the diagnostic checks of balance and of the overlap between groups, and the limit that a propensity score balances only the measured covariates and cannot remove unmeasured confounding."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Define the propensity score and explain why balancing it balances the measured covariates."
  - "Check the balance and the overlap of the groups after weighting or matching and state the limit of the method."
references:
  - "Rubin, D. B. (1974). Estimating causal effects of treatments in randomized and nonrandomized studies. Journal of Educational Psychology, 66(5), 688-701. https://doi.org/10.1037/h0037350"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

The propensity score is the probability that a unit receives the exposure given its measured covariates. It summarises the covariates in one number, and the key property is that units with the same score have the same distribution of the covariates whether they were exposed or not. Balancing the score therefore balances all the measured covariates at once, which is a practical advantage when there are many confounders. Rubin (1974) provided the foundation for the comparison of groups that have been made comparable in this way.

The score is usually estimated by a logistic regression of the exposure on the covariates, and the model should include the terms that the biology suggests, including non-linear terms and interactions where they matter. The score is then used to match exposed and unexposed units with similar scores, to stratify the sample into groups with similar scores, or to weight the units so that the two groups resemble each other. Each use estimates a slightly different effect, and the target population must be stated.

The balance must be checked after the adjustment, since a model that does not balance the covariates does not remove the confounding. The standardised difference of each covariate between the groups is the usual check, with differences below about 0.1 taken as adequate. The overlap of the scores between the groups should also be examined, because units with scores near zero or one have no comparable counterpart in the other group, and their inclusion extrapolates the comparison beyond the data.

Ioannidis (2005) described how repeated attempts to find an adjustment that gives the desired result produce findings that do not hold, and the model for the score should be fixed before the outcome is examined. Cumming (2014) argues that the estimate should be reported with its interval, and the limit of the method must be stated: a propensity score balances the measured covariates only, and an unmeasured confounder remains. The balance and the overlap should be reported with the estimate.
