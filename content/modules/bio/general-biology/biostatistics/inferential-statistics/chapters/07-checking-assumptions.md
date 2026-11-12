---
title: "Checking Assumptions"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The assumptions on which inferential methods depend, including independence of observations, the distribution assumed for the errors, the equality of variances between groups and the linearity of a relationship, the diagnostic plots and tests used to check each assumption, the consequences of a violated assumption for the validity of an interval or a p-value and the practice of stating the assumptions and the checks in the report."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "List the assumptions behind a confidence interval for a mean and state a check for each."
  - "Explain why violating independence is usually more serious than violating normality and how the two are distinguished in practice."
references:
  - "Student. (1908). The probable error of a mean. Biometrika, 6(1), 1-25. https://doi.org/10.2307/2331554"
  - "Wasserstein, R. L., & Lazar, N. A. (2016). The ASA statement on p-values: Context, process, and purpose. The American Statistician, 70(2), 129-133. https://doi.org/10.1080/00031305.2016.1154108"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Every inferential method is derived under assumptions, and its validity depends on them. The interval for a mean assumes that the observations are independent and that their distribution is close enough to normal for the sample size, and the test that compares two groups assumes in addition that the variances are similar. If an assumption is false, the nominal error rate of the method no longer holds, and the interval or the p-value does not mean what it states. The assumptions must therefore be stated and checked.

Independence is the most important assumption and the hardest to check. Observations from the same individual, the same litter or the same batch are correlated, and treating them as independent makes the standard error too small and the interval too narrow. The check is a consideration of the design rather than a plot: the analyst asks how the observations were generated and whether any structure links them. Student (1908) assumed independence in deriving the t distribution, and the assumption carries the most weight in practice.

Normality of the errors is less critical for large samples, because the central limit theorem makes the mean approximately normal, and it matters more for small samples and skewed data. A histogram, a quantile plot of the residuals and a comparison of the mean and median are the usual checks. A strongly skewed sample of small size is a sign that a rank-based method or a transformation should be considered.

The equality of variances matters when two groups are compared with a standard test. Unequal variances change the standard error of the difference, and a test that assumes equality can give a false sense of precision. The check is to compare the variances or the spreads of the groups, and the correction for unequal variances is a standard alternative.

Ioannidis (2005) described how flexible checking, in which assumptions are tested until one is satisfied, can itself produce false results, and the decision to use a particular method should be made from the design before the outcome is seen. Wasserstein and Lazar (2016) note that the p-value is conditional on the model, and the checks reveal whether the condition holds.

Sandve et al. (2013) recommended recording the assumptions and their checks, since a reader can judge a result only when the conditions of its method are known.
