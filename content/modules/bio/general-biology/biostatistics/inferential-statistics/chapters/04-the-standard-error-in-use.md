---
title: "The Standard Error in Use"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "How the standard error of an estimate is computed and used across biological studies, including the standard error of a mean, of a difference between two means and of a proportion, the role of the standard error in confidence intervals and test statistics, the distinction between the standard error and the standard deviation of the data, and the errors that arise when a standard error is reported as a measure of the spread of the observations."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Compute the standard error of a mean, of a difference between two independent means and of a proportion."
  - "Distinguish the standard error from the standard deviation and state which should be reported to describe the spread of the data."
references:
  - "Student. (1908). The probable error of a mean. Biometrika, 6(1), 1-25. https://doi.org/10.2307/2331554"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The standard error of an estimate is the standard deviation of its sampling distribution, and it measures how far the estimate is likely to lie from the parameter. For a mean it is the standard deviation of the observations divided by the square root of the sample size. Student (1908) gave the basis of this relation for the mean. For the difference between two independent means, the variances of the two estimates add, so the standard error of the difference is the square root of the sum of the squared standard errors of the two means.

For a proportion, the standard error depends on the proportion itself and on the sample size: the variance of a sample proportion is the proportion times one minus the proportion, divided by the sample size. A proportion near one half is the most uncertain, and a proportion near zero or one is more precisely estimated for the same size. The formula is an approximation that works well for moderate samples and fails for very small ones, where an exact interval is preferred.

The standard error is the quantity from which confidence intervals and test statistics are built. An interval is the estimate plus and minus a critical value times the standard error, and a test statistic is the estimate divided by its standard error. The same quantity therefore drives both, which is why an interval that excludes zero corresponds to a test that rejects.

The standard error must not be confused with the standard deviation of the data. The standard deviation describes the variability of the observations, and it does not shrink as the sample grows. The standard error describes the uncertainty of the mean, and it does. Cumming (2014) observes that a standard error bar drawn on a graph is easily read as the spread of the data, and it makes the observations look more consistent than they are.

Sandve et al. (2013) recommended stating which of the two quantities a figure or table reports, since the same numbers can describe very different things.
