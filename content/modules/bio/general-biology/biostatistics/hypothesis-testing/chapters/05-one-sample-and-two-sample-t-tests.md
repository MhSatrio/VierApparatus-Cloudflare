---
title: "One-Sample and Two-Sample t Tests"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The t test for comparing a sample mean with a reference value and the two-sample t test for comparing the means of two independent groups, the test statistic built from the difference and its standard error, the t distribution that Student derived for small samples, the paired t test for matched observations such as measurements on the same individual before and after treatment, the Welch correction for unequal variances and the assumptions that each test requires."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Compute a one-sample and a two-sample t statistic and find the p-value from the t distribution."
  - "Choose a paired t test when observations are matched and the Welch test when the group variances differ."
references:
  - "Student. (1908). The probable error of a mean. Biometrika, 6(1), 1-25. https://doi.org/10.2307/2331554"
  - "Bland, J. M., & Altman, D. G. (1986). Statistical methods for assessing agreement between two methods of clinical measurement. The Lancet, 327(8476), 307-310. https://doi.org/10.1016/S0140-6736(86)90837-8"
  - "Wasserstein, R. L., & Lazar, N. A. (2016). The ASA statement on p-values: Context, process, and purpose. The American Statistician, 70(2), 129-133. https://doi.org/10.1080/00031305.2016.1154108"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The t test compares a mean with a reference value or two means with one another, and it is the workhorse of biological comparisons. The one-sample test computes the difference between the sample mean and the reference, divided by its standard error, and refers the result to a t distribution with one less than the sample size degrees of freedom. Student (1908) derived this distribution for small samples from normal data, which is the reason the test is valid when the sample is too small for the normal approximation.

The two-sample test compares the means of two independent groups. Its statistic is the difference between the means divided by the standard error of that difference, which combines the variances of the two groups. The pooled version assumes that the variances are equal, and the Welch version does not, and the Welch test is the safer default because it gives valid results when the group variances differ and the sample sizes are unequal.

The paired test is used when each observation in one group is matched to an observation in the other, as when the same individuals are measured before and after treatment. The test is applied to the within-pair differences, which removes the variation between individuals. Bland and Altman (1986) showed that the agreement of two methods is assessed through their differences, and the paired analysis follows the same logic.

The assumptions are the independence of the observations and a distribution for the errors close enough to normal for the sample size. The checks of the previous topic apply, and a strongly skewed small sample may need a rank-based test instead. Wasserstein and Lazar (2016) remind readers that the test answers a question about the difference in the population under these assumptions, and the answer is no stronger than the assumptions.

Sandve et al. (2013) recommended recording which form of the test was used, whether pooled or Welch, paired or independent, since the result depends on the choice.
