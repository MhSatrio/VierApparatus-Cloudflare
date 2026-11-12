---
title: "Selection Bias and Colliders"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "Selection bias as the distortion of an association when the study population is selected on a variable that is affected by both the exposure and the outcome or by their causes, the collider as a variable with two arrows pointing into it that opens a non-causal path when conditioned upon, the surprising association created by adjusting for a collider, the example of a hospital-based study that induces an association between conditions that are independent in the population, and the need to avoid conditioning on colliders and to consider the selection process in the causal graph."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Identify a collider on a causal graph and explain why conditioning on it opens a non-causal association."
  - "Describe how selection into a study can create an association between two variables that are independent in the population."
references:
  - "Greenland, S., Pearl, J., & Robins, J. M. (1999). Causal Diagrams for Epidemiologic Research. Epidemiology, 10(1), 37-48. https://doi.org/10.1097/00001648-199901000-00008"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

A collider is a variable that has two arrows pointing into it, from two other variables on a causal graph. Two variables that are independent in the population are not associated through a collider, because the path between them is blocked at the collider. Conditioning on the collider, by adjusting for it or by restricting the analysis to a level of it, opens the path and creates an association between the two variables that has no causal basis. Greenland et al. (1999) showed that this is one of the most common errors in observational analysis.

A clear example is a study of a disease in a hospital population. Suppose two conditions are independent in the population, and that each makes hospital admission more likely. Among hospital patients, a person without one condition is more likely to have the other, because admission is the collider, and the association between the two conditions appears in the hospital sample even though it does not exist in the population. The bias is produced by the selection, not by any biology of the conditions.

Selection bias of this kind arises whenever the study population is chosen on a variable that is affected by the exposure, the outcome or their causes. Volunteers, survivors and those who attend a clinic are selected by processes that can create associations among the variables that determine selection. Ioannidis (2005) described how selection of participants produces findings that do not hold, and the process of selection should be drawn on the causal graph so that its consequences can be anticipated.

The remedy is to avoid conditioning on colliders and to consider the selection process explicitly. Adjusting for a variable because it is available and correlated with the exposure can introduce a collider bias, and the graph shows which variables are colliders. Cumming (2014) argues that an association should be reported with its interval and with the population to which it applies, since a selected population may show associations that the general population does not.
