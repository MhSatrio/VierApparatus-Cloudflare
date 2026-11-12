---
title: "Confounding and Standardisation"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "Confounding as the distortion of an association by a variable that is related to both the exposure and the outcome and does not lie on the causal path between them, the direct and indirect standardisation of rates to remove differences in the age or structure of populations, the stratified analysis that examines the association within levels of a confounder, and the limits of adjustment for variables that were not measured or were measured with error."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Identify a confounder by its relation to both the exposure and the outcome and explain how it distorts an association."
  - "Compare two populations with different age structures using direct standardisation and state the standard population used."
references:
  - "Greenland, S., Pearl, J., & Robins, J. M. (1999). Causal Diagrams for Epidemiologic Research. Epidemiology, 10(1), 37-48. https://doi.org/10.1097/00001648-199901000-00008"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

A confounder is a variable that is associated with the exposure and is also a cause of the outcome, without lying on the causal path between them. If older people are more likely to be exposed and also more likely to fall ill, age distorts the apparent association between exposure and disease. The distortion may be large enough to create an association where none exists, or to hide one that does. Greenland et al. (1999) described how the path structure determines which variables must be controlled, and not every correlated variable is a confounder.

Standardisation removes the distortion of rates caused by differences in the age structure of populations. Direct standardisation applies the age-specific rates of each population to a common standard population, which gives the rates that each population would have had with the same age structure. The choice of the standard population affects the numbers but not the comparison, provided the same standard is used for both populations. Indirect standardisation instead applies the age-specific rates of a standard population to each population, and is useful when the age-specific rates of one population are not well estimated.

Stratification examines the association within levels of the confounder. If the association is similar in each stratum, a summary measure may be calculated across the strata, and the summary is free of the confounding by the stratifying variable. Ioannidis (2005) warned that choosing the confounders after seeing the results allows the analyst to produce whichever association is desired, and the confounders should be fixed in advance on the basis of the subject.

Adjustment is only as good as the variables measured. An unmeasured confounder or a confounder measured with error will leave residual distortion, and the reader must be told which variables were controlled and how. Cumming (2014) argues that the adjusted estimate should be reported with its interval, since adjustment reduces bias at the cost of precision and the interval shows how much of the estimate depends on the adjustment.
