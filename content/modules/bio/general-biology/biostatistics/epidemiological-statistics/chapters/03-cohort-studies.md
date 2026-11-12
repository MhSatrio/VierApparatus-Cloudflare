---
title: "Cohort Studies"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The cohort design in which exposed and unexposed groups are followed forward in time to observe the incidence of an outcome, the prospective and retrospective forms, the estimates of risk, rate and risk ratio that the design supports, the loss to follow-up and competing causes of death that bias the results, and the choice of the comparison group to avoid selection bias."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe a cohort study and identify the risk, rate and risk ratio that it estimates."
  - "Explain how loss to follow-up and competing causes of death bias the estimates of a cohort study."
references:
  - "Greenland, S., Pearl, J., & Robins, J. M. (1999). Causal Diagrams for Epidemiologic Research. Epidemiology, 10(1), 37-48. https://doi.org/10.1097/00001648-199901000-00008"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A cohort study identifies a group of people, classifies them by exposure and follows them forward in time to see who develops the outcome. The exposed and unexposed groups are defined before the outcome occurs, so the direction of the comparison is clear and the exposure precedes the disease. The design can be prospective, with the cohort assembled and followed from the start, or retrospective, with the cohort defined from existing records and followed over a past period. Both forms use the same logic of comparing incidence between the groups.

The design supports the direct estimation of the cumulative incidence in each group and of the risk ratio between them. When people are followed for different lengths of time, the incidence rate per person-year is the appropriate measure, and the ratio of rates is then the rate ratio. Greenland et al. (1999) described the structure of such comparisons, and the choice between risk and rate should follow from how the follow-up was carried out, not from what is convenient to calculate.

Two problems bias the estimates in a cohort. Loss to follow-up removes individuals whose outcomes are unknown, and if the losses differ between the exposed and unexposed, the comparison is distorted. Competing causes of death remove individuals who could otherwise have developed the outcome, and the risk over a period is then underestimated in the group with the higher mortality from other causes. Both problems should be quantified and reported with the number lost in each group and the reasons for loss.

The unexposed comparison group must be chosen with the same care as the exposed group. Ioannidis (2005) described how selection of participants can produce associations that do not hold, and a cohort in which the exposed are drawn from one source and the unexposed from another is vulnerable to this bias. Sandve et al. (2013) recommended recording the definition of each group and the procedure for identifying the outcome, so that the comparison can be checked and repeated.
