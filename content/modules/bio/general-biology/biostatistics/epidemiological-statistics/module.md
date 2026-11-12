---
title: "Epidemiological Statistics"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The statistics of disease in populations, covering the measures of frequency such as prevalence, incidence and person-time rates, the risk ratio and odds ratio as measures of association, the design of cohort, case-control and cross-sectional studies and the estimates each supports, confounding and its control by standardisation and adjustment, the surveillance of disease and the detection of clusters, and the reporting of epidemiological studies with their denominators and intervals."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Calculate prevalence, incidence and a rate from counts and denominators and state which of them each design can estimate."
  - "Explain how confounding distorts an association and how standardisation or adjustment reduces the distortion."
references:
  - "Greenland, S., Pearl, J., & Robins, J. M. (1999). Causal Diagrams for Epidemiologic Research. Epidemiology, 10(1), 37-48. https://doi.org/10.1097/00001648-199901000-00008"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Epidemiological statistics describes the occurrence of disease in populations and the association between exposures and outcomes. The basic data are counts of cases and the denominators, which are the populations or person-times from which the cases arose. A count without its denominator says little, since a hundred cases in a city of a million and a hundred cases in a town of a thousand are very different events, and the first step of any epidemiological analysis is to state the population at risk.

The measures of frequency answer different questions. Prevalence is the proportion of a population affected at a given time, incidence is the rate of new cases in a population at risk over a period, and a person-time rate uses the time each individual was observed. Greenland et al. (1999) emphasised that the measure of association depends on the design that produced the data, and a study cannot estimate every measure from every design. The chapters follow this logic, from the measures of frequency to the designs that produce them and the associations that they support.

Confounding is the central threat to any association. A confounder is related to both the exposure and the outcome and is not on the path between them, so its distribution differs between the exposed and unexposed and distorts the apparent effect. Standardisation and adjustment remove the distortion when the confounder is measured, and the adjustment is only as good as the choice of confounders. Ioannidis (2005) described how flexible choice of variables produces findings that do not hold, and the confounders should be fixed on the basis of the subject before the analysis.

Cumming (2014) argues that every estimate of frequency or association should be reported with its interval and its denominator, and Sandve et al. (2013) recommended recording the definitions and the data used to derive each count. The reporting of epidemiological studies, covered in the final chapter, follows these principles so that the reader can judge the population, the design and the precision of each result.
