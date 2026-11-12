---
title: "Comparing Survival and the Log-Rank Test"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The comparison of survival curves between groups with the log-rank test, which compares the observed and expected numbers of events in each group at every event time across the risk sets, the assumption that the hazards are proportional over time, the reasons the test is most powerful when the hazard ratio is constant and the way crossing survival curves violate the assumption and make the test misleading, with the reporting of the test, the survival curves and the numbers at risk."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Compare the survival curves of two groups with the log-rank test and explain what it tests at each event time."
  - "Recognise crossing survival curves and state why the log-rank test is then unsuitable as a summary of the difference."
references:
  - "Kaplan, E. L., & Meier, P. (1958). Nonparametric estimation from incomplete observations. Journal of the American Statistical Association, 53(282), 457-481. https://doi.org/10.1080/01621459.1958.10501452"
  - "Cox, D. R. (1972). Regression models and life-tables. Journal of the Royal Statistical Society Series B: Statistical Methodology, 34(2), 187-202. https://doi.org/10.1111/j.2517-6161.1972.tb00899.x"
  - "Wasserstein, R. L., & Lazar, N. A. (2016). The ASA statement on p-values: Context, process, and purpose. The American Statistician, 70(2), 129-133. https://doi.org/10.1080/00031305.2016.1154108"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The log-rank test compares the survival of two or more groups by examining the events in order. At each time at which an event occurs, the number of events expected in each group is computed from the numbers at risk, under the hypothesis that the groups have the same survival, and the observed events are compared with these expectations. The differences are summed over all event times and standardised, giving a statistic that is compared with the chi-squared distribution.

The test is most powerful when the hazard of one group is a constant multiple of the other's over time, the proportional hazards assumption that Cox (1972) introduced into the regression framework. Under this assumption, the test is a sensible summary of the difference in survival, and its p-value answers whether the groups differ. When the assumption fails, the test still tests a difference, but the difference it detects is an average over time that may not describe the groups at any particular time.

Crossing survival curves are a common violation. One treatment may be worse early and better late, so that the curves cross, and the log-rank test may show little difference because the early and late effects cancel. A reader who sees a non-significant test may conclude that the treatments are equivalent, when in fact their survival differs in a way that changes sign. The curves must be inspected before the test is interpreted.

Wasserstein and Lazar (2016) warn that a p-value answers a specific question under specific assumptions, and a test whose assumption is violated answers a question that the reader did not ask. The log-rank test should be accompanied by the curves, the numbers at risk and a check of the proportional hazards assumption.

Sandve et al. (2013) recommended recording the test, the curves and the assumption check, since each is needed to interpret the comparison.
