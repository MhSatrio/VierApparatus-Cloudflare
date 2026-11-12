---
title: "Confounding and Adjustment"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "Confounding as the distortion of a causal effect by a common cause of the exposure and the outcome, the adjustment by stratification or regression that blocks the backdoor paths when the confounders are measured, the requirement of exchangeability within strata that the adjustment is meant to achieve, the residual confounding from unmeasured variables and from measurement error, and the warning against adjusting for variables that are consequences of the exposure or of the outcome."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how a common cause produces confounding and how adjustment for it blocks the backdoor path."
  - "Identify the residual confounding that remains after adjustment for measured covariates and state how it can be bounded."
references:
  - "Greenland, S., Pearl, J., & Robins, J. M. (1999). Causal Diagrams for Epidemiologic Research. Epidemiology, 10(1), 37-48. https://doi.org/10.1097/00001648-199901000-00008"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

Confounding occurs when a common cause of the exposure and the outcome makes them associated even when the exposure has no effect. A socioeconomic factor that influences both diet and disease, for example, produces an association between diet and disease that is partly or wholly non-causal. The confounder lies on a backdoor path between exposure and outcome, and adjustment removes the association it carries by holding the confounder fixed, either by stratification or by a regression model.

Adjustment works when it creates exchangeability, which means that within each stratum of the confounders the exposed and unexposed would have had similar outcomes if they had received the same exposure. Greenland et al. (1999) described this condition, and it is the causal meaning of adjustment. A stratified analysis that compares like with like within each level of the confounder estimates the effect, provided the confounders are sufficient and correctly measured.

Residual confounding remains when some confounders are unmeasured or measured with error. Adjustment cannot remove what has not been recorded, and an error in the measurement of a confounder leaves part of its distortion in the estimate. The direction and size of the residual bias can sometimes be bounded by a sensitivity analysis, which asks how strong an unmeasured confounder would need to be to explain the observed association.

Ioannidis (2005) described how the choice of covariates after seeing the data produces findings that do not hold, and the set of confounders should be fixed in advance from the causal graph. Cumming (2014) argues that the adjusted estimate should be reported with its interval, since adjustment reduces bias but adds variance, and the interval shows the cost of the adjustment.
