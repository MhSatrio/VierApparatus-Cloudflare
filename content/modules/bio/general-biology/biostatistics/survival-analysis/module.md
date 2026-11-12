---
title: "Survival Analysis"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "Survival analysis for biological and medical data in which the outcome is the time until an event, such as death, relapse or the appearance of a tumour, covering censored observations whose event has not occurred by the end of follow-up, the Kaplan-Meier estimate of the survival curve, the comparison of survival between groups with the log-rank test, the Cox proportional hazards regression that estimates the effect of predictors on the hazard, the assumptions of proportional hazards and their checks and the reporting of hazard ratios with their intervals."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Estimate a survival curve from censored data with the Kaplan-Meier method and explain how censoring is handled."
  - "Fit a Cox proportional hazards model and interpret the hazard ratio of a predictor with its interval."
references:
  - "Kaplan, E. L., & Meier, P. (1958). Nonparametric estimation from incomplete observations. Journal of the American Statistical Association, 53(282), 457-481. https://doi.org/10.1080/01621459.1958.10501452"
  - "Cox, D. R. (1972). Regression models and life-tables. Journal of the Royal Statistical Society Series B: Statistical Methodology, 34(2), 187-202. https://doi.org/10.1111/j.2517-6161.1972.tb00899.x"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Many biological and medical questions concern the time until an event. How long do patients survive after treatment, how long until a tumour recurs, how long until a seedling emerges? The outcome is a time, and it is often incomplete: some individuals have not experienced the event when the study ends or when they leave it, and their times are censored. Survival analysis is the set of methods designed for this structure, and it cannot be replaced by a comparison of mean times, since the censored observations carry information that a mean ignores or misuses.

The topic covers the estimation of survival curves with the Kaplan-Meier method, Kaplan and Meier (1958), which uses the censored observations correctly, the comparison of groups with the log-rank test, and the Cox proportional hazards regression, Cox (1972), which estimates how predictors change the rate of the event. The chapters address the assumptions of each method, the checks that test them and the reporting of hazard ratios in a form that a clinician or biologist can read.

The censoring is the point at which survival analysis must be understood before it is used. A censored individual contributes the time it was observed, not the time to the event, and treating censoring as an event, or as the end of the study, biases every estimate. The method is correct only when censoring is independent of the event process, and the assumption must be considered for each study, since an individual who drops out because they are unwell is not censored at random.
