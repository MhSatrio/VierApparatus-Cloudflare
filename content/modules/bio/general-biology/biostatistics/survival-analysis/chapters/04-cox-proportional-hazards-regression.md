---
title: "Cox Proportional Hazards Regression"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "Cox proportional hazards regression for the effect of several predictors on the rate of an event, the hazard as the instantaneous rate of the event given survival to a time, the hazard ratio as the constant multiplicative effect of a predictor on that rate, the partial likelihood that estimates the coefficients without specifying the baseline hazard, the adjustment for confounders and the interpretation of the hazard ratio with its interval, together with the common misreading of a hazard ratio as a ratio of risks or of median times."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Fit a Cox proportional hazards model with several predictors and interpret each hazard ratio with its interval."
  - "Explain what the Cox model estimates without specifying the baseline hazard and why a hazard ratio is not a ratio of risks or of median survival times."
references:
  - "Cox, D. R. (1972). Regression models and life-tables. Journal of the Royal Statistical Society Series B: Statistical Methodology, 34(2), 187-202. https://doi.org/10.1111/j.2517-6161.1972.tb00899.x"
  - "Kaplan, E. L., & Meier, P. (1958). Nonparametric estimation from incomplete observations. Journal of the American Statistical Association, 53(282), 457-481. https://doi.org/10.1080/01621459.1958.10501452"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

The hazard is the instantaneous rate of the event at a given time, among the individuals still event-free at that time. Cox (1972) proposed a regression in which the hazard of each individual is a baseline hazard, which may vary with time and is left unspecified, multiplied by a function of its predictors. The model estimates the coefficients of the predictors without specifying the baseline, because it uses only the order in which events occur, through the partial likelihood. This is the reason the Cox model is so widely used: it describes the effects of predictors without the need for a distributional model of survival.

The hazard ratio is the exponential of a coefficient, the ratio of the hazards of two individuals who differ in one predictor and share the others. Under the proportional hazards assumption it is constant over time. A hazard ratio of 0.7 means that, at any moment, an individual with the predictor has seventy per cent of the event rate of one without it, given that both are still event-free. Cumming (2014) argues that the interval of the hazard ratio should be reported, since it shows the range of plausible multiplicative effects.

A hazard ratio is not a ratio of risks, and it is not a ratio of median survival times. The risk of the event over a fixed period depends on the baseline hazard as well as on the ratio, and the median survival is a different summary of the same curves. Reporting the hazard ratio as if it were a risk ratio overstates or understates the effect depending on the time scale and the baseline, and the reader must be told which quantity is reported.

The model is adjusted for the predictors included in it, and the adjusted hazard ratio is subject to the same limits as any adjusted effect: an unmeasured confounder or a predictor that lies on the causal path can bias it. Ioannidis (2005) described how the selection of predictors produces findings that do not hold, and the predictors should be fixed by the biology before the model is fitted.

Sandve et al. (2013) recommended recording the predictors, the hazard ratios with their intervals and the assumption checks, since the interpretation of a hazard ratio depends on the model and the time scale.
