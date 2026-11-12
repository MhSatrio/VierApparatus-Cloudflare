---
title: "Potential Outcomes"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The potential outcomes framework in which each unit has a value of the outcome under each level of an exposure, the individual causal effect as the difference between two potential outcomes that cannot both be observed, the average causal effect as the mean of the individual effects, the fundamental problem of causal inference that a unit is observed under one exposure only, and the assumptions of consistency, no interference and the stable treatment value that give the framework its meaning."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Define the potential outcomes of a unit and the individual and average causal effects built from them."
  - "State the fundamental problem of causal inference and the assumptions of consistency and no interference."
references:
  - "Rubin, D. B. (1974). Estimating causal effects of treatments in randomized and nonrandomized studies. Journal of Educational Psychology, 66(5), 688-701. https://doi.org/10.1037/h0037350"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The potential outcomes framework treats each unit as having a value of the outcome under each exposure it could have received. For a patient, there is an outcome if treated and an outcome if untreated, and the causal effect of treatment for that patient is the difference between them. Rubin (1974) developed this framework to define causal effects without relying on the design of a study, so that the same definition applies to experiments and to observational data.

The difficulty is that only one potential outcome can be observed for each unit, since a patient is either treated or untreated at a given time. This is the fundamental problem of causal inference, and it means that the individual effect is never directly observed. Every method for estimating causal effects is therefore a way of constructing the missing outcome from the outcomes of other units, and the validity of the method depends on how well the constructed outcome stands in for the unobserved one.

The average causal effect is the mean of the individual effects across the population, and it can be estimated without knowing any individual effect. In a randomised experiment, the average outcome of the treated group estimates the average potential outcome under treatment, and the difference between the two groups estimates the average effect. Cumming (2014) argues that such an average should be reported with its interval, since the population average may conceal large variation among individuals.

Two assumptions give the framework its meaning. Consistency requires that the observed outcome of a unit equals its potential outcome under the exposure it received, and the exposure must be defined clearly enough to have one meaning. No interference requires that one unit's exposure does not affect another's outcome, which fails for infectious diseases and shared environments. Sandve et al. (2013) recommended recording the definitions of the exposure and the outcome, so that the assumptions can be judged against the study.
