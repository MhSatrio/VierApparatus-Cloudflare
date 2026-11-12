---
title: "Case-Control Studies"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The case-control design in which individuals with the outcome are compared with a sample of individuals without it on their past exposure, the sampling of controls from the same population that produced the cases, the odds ratio as the measure of association that the design estimates directly, the risks of recall bias and of selecting controls in a way related to exposure, and the matching of controls to cases on confounders."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe a case-control study and explain why its direct estimate is the odds ratio."
  - "Choose controls from the population that produced the cases and explain how a poor choice of controls biases the association."
references:
  - "Greenland, S., Pearl, J., & Robins, J. M. (1999). Causal Diagrams for Epidemiologic Research. Epidemiology, 10(1), 37-48. https://doi.org/10.1097/00001648-199901000-00008"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

A case-control study begins with individuals who have the outcome and compares their past exposures with those of a sample of individuals who do not have it. The cases are identified by the disease and the controls are sampled from the same population. The design is efficient for rare outcomes, since following a large cohort to find a few cases is costly, and it is the usual choice when the outcome is rare and the exposure can be measured retrospectively.

The design does not give the risk of disease in each group, because the proportion of cases is fixed by the sampling rather than by the population. It estimates the odds ratio, which is the measure of association that the design supports directly. Greenland et al. (1999) emphasised that the odds ratio from a case-control study approximates the risk ratio only when the disease is rare in the population, and the reader must be told which measure is reported.

The validity of the design depends on the choice of controls. Controls should be drawn from the population that gave rise to the cases, so that an individual who became a case would have had an equal chance of being sampled as a control. A control group drawn from a different source, such as hospital patients when the cases came from the general population, may differ in exposure for reasons that are unrelated to the outcome, and the association will be biased. Ioannidis (2005) described how such selection distorts findings, and the source of the controls must be reported.

Matching controls to cases on confounders such as age and sex removes the confounding by these variables, and the analysis must then account for the matching. Recall bias also threatens the design, since cases may remember their exposures differently from controls. Cumming (2014) argues that the interval of the odds ratio should be reported with its design, so that the reader can see the precision and the assumptions behind it.
