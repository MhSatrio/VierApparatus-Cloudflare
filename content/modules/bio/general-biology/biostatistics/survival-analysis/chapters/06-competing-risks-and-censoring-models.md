---
title: "Competing Risks and Censoring Models"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "Competing risks, in which individuals can experience one of several mutually exclusive events and the occurrence of one prevents the others, the cause-specific hazard that treats the other events as censored, the cumulative incidence function that estimates the probability of each event in the presence of the others and the reasons the Kaplan-Meier estimate of the event of interest overstates its probability when competing events are treated as censoring."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain why treating a competing event as censoring overstates the probability of the event of interest."
  - "Describe the cumulative incidence function and state how it differs from one minus the Kaplan-Meier survival."
references:
  - "Kaplan, E. L., & Meier, P. (1958). Nonparametric estimation from incomplete observations. Journal of the American Statistical Association, 53(282), 457-481. https://doi.org/10.1080/01621459.1958.10501452"
  - "Cox, D. R. (1972). Regression models and life-tables. Journal of the Royal Statistical Society Series B: Statistical Methodology, 34(2), 187-202. https://doi.org/10.1111/j.2517-6161.1972.tb00899.x"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

In many studies an individual can experience one of several events, and the occurrence of one prevents the others. A patient may die of the disease under study or of another cause, and once the other cause has occurred the disease can no longer be observed. These are competing risks. Treating the competing event as censoring, which the Kaplan-Meier method would do by default, assumes that the individual would have experienced the event of interest later if the competing event had not occurred, and this assumption is usually false.

The consequence is an overestimate. Censoring the competing deaths keeps the individuals in the risk set for the disease longer than they would have been, and the estimated probability of the disease is too high. The error grows with the frequency of the competing event, and it can be substantial in older populations, where other causes of death are common. Kaplan and Meier (1958) developed the estimator for independent censoring, and it does not apply directly to competing events.

The appropriate quantity is the cumulative incidence function, which gives the probability of the event of interest by a given time, in the presence of the competing events. It is not one minus the Kaplan-Meier survival, since that quantity assumes the competing events are censored. The cause-specific hazard, which models the rate of each event among those still event-free, is the basis of regression for competing risks, as Cox (1972) gave the framework for the single-event hazard.

The report must state which events were competing and how they were treated. A survival estimate that censors competing deaths should be labelled as such, and the cumulative incidence should be given where the probability of the event of interest is the question.

Sandve et al. (2013) recommended recording the definition of each event and the treatment of the competing events, since they determine the estimated probability.
