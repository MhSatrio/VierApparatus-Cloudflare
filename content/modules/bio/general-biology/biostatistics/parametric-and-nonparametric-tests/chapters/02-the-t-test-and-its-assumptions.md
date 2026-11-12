---
title: "The t Test and Its Assumptions"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The t test in the form in which it is applied to biological comparisons, the pooled and the Welch versions for two groups, the assumptions of normal errors, independence and equal or unequal variances, the diagnostic checks that inform the choice of version, the reporting of the t statistic with its degrees of freedom and the effect with its interval, and the circumstances in which a t test should be replaced by a rank test or a transformation."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Choose between the pooled and the Welch t test for two groups and state the check that informs the choice."
  - "Report a t test with its statistic, degrees of freedom, p-value and the difference with its interval."
references:
  - "Student. (1908). The probable error of a mean. Biometrika, 6(1), 1-25. https://doi.org/10.2307/2331554"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Wasserstein, R. L., & Lazar, N. A. (2016). The ASA statement on p-values: Context, process, and purpose. The American Statistician, 70(2), 129-133. https://doi.org/10.1080/00031305.2016.1154108"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The t test compares the means of two groups by the difference between them divided by its standard error. Two versions are in common use. The pooled version combines the variances of the groups into a single estimate, which is valid only when the population variances are equal. The Welch version estimates the standard error separately and adjusts the degrees of freedom, which keeps the test valid when the variances differ. Student (1908) gave the basis of the t distribution, and later work extended the test to unequal variances, which is why the Welch form is the safer default for biological groups of unequal size or spread.

The choice between the two versions should follow from a check of the variances. A large ratio of the variances, or groups of very different size with different spreads, makes the pooled test unreliable, and the Welch test is then the appropriate one. A reported result should name the version used, since the two give different degrees of freedom and slightly different p-values.

The assumptions of normal errors and independence are checked as described in the inferential topic. Normality matters most for small samples, and a strongly skewed sample may call for a transformation, such as the logarithm, before the t test is applied, or for a rank test in its place. Independence cannot be checked by the test itself and must be justified by the design.

The result should be reported completely. The t statistic, its degrees of freedom, the exact p-value and the difference between the means with its confidence interval together give the reader the test, the evidence and the size of the effect. Cumming (2014) argues that the interval conveys the most, and a report that gives only the p-value leaves the reader unable to judge the effect.

Wasserstein and Lazar (2016) note that a p-value answers a question about the model, and the version of the t test, the assumptions and the checks are the conditions under which the answer holds. Sandve et al. (2013) recommended recording these choices with the result.
