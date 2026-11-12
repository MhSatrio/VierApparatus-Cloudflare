---
title: "Logistic Regression"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "Logistic regression for binary biological outcomes, such as the presence or absence of a mutation, survival to a stage or response to a drug, covering the logit link that keeps probabilities between zero and one, the interpretation of coefficients as log odds ratios and of their exponentials as odds ratios, the difference between an odds ratio and a risk ratio when the outcome is common, the estimation by maximum likelihood and the assessment of fit with the deviance and with classification performance."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Fit a logistic regression to a binary outcome and interpret its coefficients as odds ratios."
  - "Explain why an odds ratio overstates a risk ratio when the outcome is common and state which measure a report should give."
references:
  - "Nelder, J. A., & Wedderburn, R. W. M. (1972). Generalized linear models. Journal of the Royal Statistical Society. Series A (General), 135(3), 370-384. https://doi.org/10.2307/2344614"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Logistic regression models the probability of a binary outcome as a function of predictors. The logit link takes the logarithm of the odds, which is the probability divided by one minus the probability, and writes it as a linear function of the predictors. The link keeps every fitted probability between zero and one, which a straight line would not. Nelder and Wedderburn (1972) describe the binomial family with its logit link, and the logistic model is the standard form of this case.

The coefficients are interpreted as log odds ratios. The exponential of a coefficient is the factor by which the odds of the outcome are multiplied for a unit increase in the predictor, holding the others constant. An odds ratio of two means that the odds double, and the interpretation is precise on the odds scale. Cumming (2014) argues that the interval of the odds ratio should be reported, since the interval shows the range of plausible effects on the odds.

An odds ratio is not a risk ratio, and the distinction matters when the outcome is common. If a disease affects half of a group, an odds ratio of two corresponds to a risk ratio considerably smaller, and reporting the odds ratio as if it were a risk overstates the effect. A report should state which measure it gives and, where the outcome is common, give the risk ratio or the predicted probabilities as well.

The fit of a logistic model is assessed with the deviance and with the classification performance, the proportion of outcomes correctly predicted. Classification performance is a measure of predictive usefulness and not of the model's correctness, and a model with a high accuracy on the sample may classify new data poorly. Ioannidis (2005) described how a result that performs well on the data used to find it may not replicate, and the classification should be checked on withheld data.

Sandve et al. (2013) recommended recording the outcome, the predictors and the measure of effect, since the same logistic model gives different impressions depending on whether odds or risks are reported.
