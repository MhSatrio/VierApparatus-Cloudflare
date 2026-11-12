---
title: "Measures of Disease Frequency"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The measures that describe how often disease occurs in a population, namely prevalence as the proportion affected at a point or period, cumulative incidence as the proportion of an initially disease-free population that becomes ill over a period, and the incidence rate as new cases per unit of person-time, the reasons these differ in a population with turnover or with varying follow-up, and the need to state the denominator with every measure."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Calculate prevalence, cumulative incidence and an incidence rate from the same set of counts and state the difference between them."
  - "Explain why a rate is needed when individuals are followed for different lengths of time."
references:
  - "Greenland, S., Pearl, J., & Robins, J. M. (1999). Causal Diagrams for Epidemiologic Research. Epidemiology, 10(1), 37-48. https://doi.org/10.1097/00001648-199901000-00008"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Prevalence is the proportion of a population that has a condition at a given time, or during a stated period. It is the number of existing cases divided by the population at that time, and it depends on both the rate at which people become ill and the duration of their illness. A disease that lasts a long time has a high prevalence even if new cases are rare, and a disease that kills quickly has a low prevalence even if its incidence is high. Prevalence is therefore a snapshot of a population rather than a measure of the risk of falling ill.

Cumulative incidence is the proportion of an initially disease-free population that becomes ill over a stated period. It is the number of new cases divided by the number at risk at the start, and it is a risk over that period. This measure assumes that everyone is followed for the whole period, and losses to follow-up or deaths from other causes make it an underestimate. Greenland et al. (1999) showed that the choice of the population at risk must be explicit, since the risk depends on who was observed.

The incidence rate uses the time each individual was observed. It is the number of new cases divided by the person-time at risk, which is the sum of the time that each person contributed while free of disease. A rate is needed when individuals enter and leave a study at different times, since a person followed for ten years contributes more information than one followed for one year. Rates have the unit of cases per unit of person-time, such as cases per thousand person-years, and this unit must be stated with the value.

Cumming (2014) argues that each measure should be reported with its interval and its denominator, so that the reader can see the size of the population and the time observed. Sandve et al. (2013) recommended recording the definition of each count and the data from which the denominator was derived, since a measure of frequency cannot be checked without the population and the period behind it.
