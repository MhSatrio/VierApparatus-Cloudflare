---
title: "Controlling Bias in the Analysis"
subject: "Biology"
specialization: "General Biology"
academic_level: "Experimental and Applied Biology"
description: "How flexibility in choosing outcomes, exclusions and statistical tests inflates false positives, how to pre-specify the analysis and how to report all planned and unplanned analyses transparently."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Identify the forms of analytic flexibility that inflate false positive rates."
  - "Describe how a pre-specified analysis plan and multiple-testing correction limit this inflation."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

A study presents the result of its analysis, and that analysis is itself a set of choices. The investigator decides which outcome to report, which samples to exclude, which covariates to adjust for, which test to apply and when to stop collecting data. Each choice is defensible in isolation, but the set of choices gives the investigator many routes to a significant result. Ioannidis (2005) argued that this flexibility is one of the main reasons that published findings are unreliable, because it allows the chance variation in a dataset to be selected as a finding.

The effect on the false positive rate can be large. If an investigator tries several outcomes, several exclusion rules and several tests, the probability of finding at least one significant result by chance rises well above the nominal threshold of five per cent. The inflation is invisible to a reader who sees only the reported result, which is why it must be controlled by the design of the study rather than by the judgement of the reader.

Pre-specification is the main remedy. The outcome, the exclusion criteria, the covariates, the test and the stopping rule are written down before the data are collected, and the analysis follows the plan. Deviations are reported, with their reasons, so that readers can judge their effect.

Multiple testing correction adjusts the threshold when several tests are performed. The Bonferroni correction divides the threshold by the number of tests, and false discovery rate methods control the expected proportion of false positives among the reported results. The choice of method depends on whether the tests are planned as a family and on the cost of false positives.

Platt (1964) argued that strong inference requires the investigator to specify alternatives and to test them decisively, which is the opposite of searching through analyses for a pattern. Alberts et al. (2022) describe the biological measurements whose analysis is at issue. The complete reporting of all analyses, including those that were not significant, is the final safeguard.
