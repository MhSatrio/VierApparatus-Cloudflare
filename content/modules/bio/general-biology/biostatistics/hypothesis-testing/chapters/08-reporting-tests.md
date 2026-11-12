---
title: "Reporting Tests"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "How the results of hypothesis tests are reported so that they can be interpreted correctly, including the test used with its variant, the test statistic, the degrees of freedom and the exact p-value rather than a threshold, the effect size with its confidence interval, the number of tests performed and the correction applied, the planned and exploratory analyses distinguished and the deposition of the data and code that reproduce the test."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Write a result of a hypothesis test that gives the test, the statistic, the degrees of freedom, the exact p-value and the effect with its interval."
  - "Distinguish planned from exploratory analyses in a report and state the number of tests performed."
references:
  - "Wasserstein, R. L., & Lazar, N. A. (2016). The ASA statement on p-values: Context, process, and purpose. The American Statistician, 70(2), 129-133. https://doi.org/10.1080/00031305.2016.1154108"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A reported test should let the reader reconstruct the result and judge its meaning. The test must be named precisely, including its variant, since a pooled and a Welch t test or a parametric and a rank-based test give different answers from the same data. The test statistic and its degrees of freedom are reported with the exact p-value, not with a threshold such as p less than 0.05, since the exact value conveys the strength of the evidence that the threshold hides. Wasserstein and Lazar (2016) recommend this practice, and it is the minimum a reader needs.

The effect is reported with its interval. The difference between means, or the ratio, is stated in the units of the study with its confidence interval, which Cumming (2014) argues should be the primary result. A test without its effect size leaves the reader unable to judge whether a significant difference is large enough to matter, and an interval gives both the size and the precision in one statement.

The number of tests and the correction must be stated. A report that performed twenty tests and corrected for them should say so and give the corrected values, and a report that performed a single test should say that too. The reader must be able to see how many comparisons lay behind the reported result.

Planned and exploratory analyses must be distinguished. The planned analysis is the one the protocol specified, and the exploratory ones were chosen after the data were seen. Both can be reported, but the exploratory ones should be labelled as such, since their p-values do not carry the same meaning. Peng (2011) argued that a computational result is valid only when its steps are available, and the distinction is part of those steps.

The data and the code that produced the test should be deposited, with identifiers, so that the test can be recomputed. Wilkinson et al. (2016) set out the principles under which such data should be findable and reusable, and Sandve et al. (2013) recommended keeping the outputs of an analysis with its inputs and steps.
