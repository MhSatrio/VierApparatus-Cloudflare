---
title: "Instrumental Variables"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The instrumental variable as a variable that affects the exposure, has no path to the outcome except through the exposure, and shares no common cause with the outcome, the use of such a variable to estimate the effect of an exposure in the presence of unmeasured confounding, the Wald estimator as the ratio of the effect of the instrument on the outcome to its effect on the exposure, the requirement of relevance and exclusion restriction, the Mendelian randomisation design that uses genetic variants as instruments, and the reporting of the assumptions that cannot be tested directly."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "State the three conditions for an instrumental variable and explain why each is needed."
  - "Calculate the Wald estimator from the effects of an instrument on the exposure and on the outcome."
references:
  - "Greenland, S., Pearl, J., & Robins, J. M. (1999). Causal Diagrams for Epidemiologic Research. Epidemiology, 10(1), 37-48. https://doi.org/10.1097/00001648-199901000-00008"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

An instrumental variable is a variable that can estimate the causal effect of an exposure when the exposure is confounded by factors that cannot be measured. The instrument must affect the exposure, must have no path to the outcome except through the exposure, and must share no common cause with the outcome. When these conditions hold, the variation in the exposure caused by the instrument is free of the confounding, and it can be used to estimate the effect of the exposure on the outcome.

The simplest estimator is the Wald ratio, which divides the effect of the instrument on the outcome by its effect on the exposure. If an instrument increases the exposure by a given amount and the outcome changes by a given amount, the ratio gives the effect of the exposure on the outcome for those whose exposure was changed by the instrument. Greenland et al. (1999) described how such a ratio is derived from the causal structure, and its interpretation depends on the population in which the instrument operates.

The conditions are demanding and most cannot be tested. Relevance, that the instrument affects the exposure, can be checked from the data. The exclusion restriction, that the instrument affects the outcome only through the exposure, cannot be verified from the data, and it must be justified by the biology. A weak instrument, one that affects the exposure only slightly, gives an unstable estimate with a wide interval, and Cumming (2014) argues that such an estimate must be reported with its interval.

Mendelian randomisation uses genetic variants as instruments, on the reasoning that alleles are assigned at conception independently of most confounders. The design is widely used, but its validity depends on the exclusion restriction, since a variant may affect the outcome through pleiotropic pathways. Ioannidis (2005) warned that a method that can produce strong results from many analyses should be checked against the assumptions behind it, and the assumptions of an instrument should be stated openly.
