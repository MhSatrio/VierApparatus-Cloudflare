---
title: "Agreement Between Two Methods"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "How two methods of measurement are compared for agreement rather than for association, the Bland-Altman analysis that plots the difference between the methods against their average, the bias as the mean difference, the limits of agreement as the bias plus and minus about two standard deviations of the differences, the reasons correlation and a t test of the means do not establish agreement and the interpretation of the limits against the clinical or biological tolerance that matters."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Construct a Bland-Altman plot for two methods of measurement and compute the bias and the limits of agreement."
  - "Explain why a high correlation between two methods does not establish that they agree."
references:
  - "Bland, J. M., & Altman, D. G. (1986). Statistical methods for assessing agreement between two methods of clinical measurement. The Lancet, 327(8476), 307-310. https://doi.org/10.1016/S0140-6736(86)90837-8"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A new method of measurement is often compared with an established one, and the question is whether they agree, not whether they are associated. Bland and Altman (1986) showed that the usual approaches answer the wrong question. A high correlation between two methods shows that they rank the subjects in the same order, but it does not show that they give the same values: one method may read systematically higher than the other and still correlate perfectly. A t test of the two means tests whether their averages differ, which is also not the question of agreement for individual measurements.

Their proposed analysis plots the difference between the two measurements of each subject against the average of the two. The mean difference is the bias, which shows any systematic offset between the methods. The limits of agreement are the bias plus and minus about two standard deviations of the differences, and they indicate the range within which most differences between the methods are expected to lie. The plot also shows whether the differences depend on the size of the measurement, which would indicate that the agreement changes across the range.

The limits of agreement are judged against the tolerance that matters. Whether two methods agree well enough depends on the use to which the measurement is put, and the limits must be compared with the difference that would change a decision. A method whose limits are narrow relative to the clinical or biological tolerance is acceptable, and one whose limits are wide is not, whatever its correlation with the other.

Cumming (2014) argues that the interval of an estimate should be reported, and the limits of agreement are a form of interval for the individual differences. The bias has its own confidence interval, which should be given, since the mean difference is an estimate from a sample.

Sandve et al. (2013) recommended recording the method of comparison, the plot and the limits, since agreement is a property of the particular pair of methods in the particular range studied.
