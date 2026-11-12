---
title: "Misuse of Tests and Selective Reporting"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The ways hypothesis tests are misused in biological research, including the repeated testing of data until a significant result appears, the choice of analysis after seeing the results, the omission of tests that failed to reach significance, the dichotomisation of a continuous result at a threshold and the publication of a single significant comparison from many, with the reasons each practice inflates false findings and the safeguards of preregistration and full reporting."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Identify three practices that inflate the rate of false findings and explain how each produces significance from chance."
  - "State the safeguards that limit selective reporting and explain how each limits the inflation."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Wasserstein, R. L., & Lazar, N. A. (2016). The ASA statement on p-values: Context, process, and purpose. The American Statistician, 70(2), 129-133. https://doi.org/10.1080/00031305.2016.1154108"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Ioannidis (2005) identified a set of practices that make published findings less reliable than they appear, and most of them concern the use of tests. Repeated testing of the same data until one comparison is significant is the simplest. If an analyst tries several outcomes, several subgroups and several models, the chance that one of them reaches the threshold by chance rises steeply, and the reported result is the survivor of a search. The inflation is invisible in the final report unless the search is disclosed.

Choosing the analysis after the results are seen is a related error. The direction of a test, the outcome that is reported, the exclusion of outliers and the transformation of the data may each be selected because it gives the expected answer. Each choice is defensible on its own, and together they can produce a significant result from noise. Wasserstein and Lazar (2016) warn that the p-value is valid only for the analysis that was planned, and a p-value from a chosen analysis is not the p-value the test describes.

Omitting the tests that failed is the third practice. A study that performs twenty comparisons and reports the one significant result gives a false impression of the evidence, since nineteen null results are part of the picture. The unreported tests should be counted, and their results reported, so that the reader can see how often the significant result would be expected by chance.

Dichotomising a continuous result at a threshold discards information and makes small differences appear to be categories. Cumming (2014) argues that the magnitude of an effect with its interval is more informative than a decision at a cut-off, and a result that is significant on one side of a threshold and not on the other is not a qualitative difference.

The safeguards are preregistration, which records the planned analysis before the data are collected, and full reporting, which states every test performed with its result. Sandve et al. (2013) recommended that the steps of an analysis be recorded, and the list of planned and performed analyses is the record that allows a reader to judge the evidence.
