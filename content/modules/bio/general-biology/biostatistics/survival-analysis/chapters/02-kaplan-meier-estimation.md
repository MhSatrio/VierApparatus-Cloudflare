---
title: "Kaplan-Meier Estimation"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The Kaplan-Meier estimator of the survival function from censored data, the product of the conditional survival probabilities at each event time, the step shape of the survival curve, the handling of censored individuals in the risk set, the median survival time read from the curve, the confidence band for the curve and the interpretation of the curve as a description of the cohort whose follow-up supports each part of it."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Compute a Kaplan-Meier survival estimate from event and censored times and read the median survival from the curve."
  - "Explain why censored individuals leave the risk set without counting as events and how this affects the curve."
references:
  - "Kaplan, E. L., & Meier, P. (1958). Nonparametric estimation from incomplete observations. Journal of the American Statistical Association, 53(282), 457-481. https://doi.org/10.1080/01621459.1958.10501452"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The Kaplan-Meier estimator builds the survival curve as a product. At each time at which an event occurs, the proportion of the individuals at risk who survive that moment is computed, and the survival probability is multiplied by these proportions as time passes. Kaplan and Meier (1958) derived this estimator for incomplete observations, and the curve it produces is a step function that drops at each event and stays flat between them.

Censored individuals are handled through the risk set. An individual censored at a given time is at risk up to that time and then leaves the risk set without having had the event, so it contributes to the denominators of the proportions before its censoring and to none after. The curve is therefore estimated from all the information available, and the individuals who leave early are not treated as survivors or as deaths.

The median survival is the time at which the curve falls to one half. It is read from the curve, and it can be undefined when the curve does not fall to one half within the follow-up. A median reported without the follow-up time and the number at risk at that point may describe a region of the curve with little information.

A confidence band for the curve shows its uncertainty. The band is wide where few individuals remain at risk, and it is narrow where many do, and a curve should be read with its band. Cumming (2014) argues that the interval conveys the precision of an estimate, and the band is the interval of a survival curve.

The curve describes the cohort that was followed. Its later parts rest on the few individuals who remain at risk, and an apparently precise tail may be the product of a handful of observations. The number at risk should be shown beneath the curve, so that a reader can see the support for each part.

Sandve et al. (2013) recommended recording the number at risk and the number of events at each time, since these determine the curve's reliability.
