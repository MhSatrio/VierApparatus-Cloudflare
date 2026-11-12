---
title: "Sampling Distributions"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The sampling distribution of a statistic, the distribution of a sample mean or proportion across the samples that could have been drawn, how the sampling distribution of the mean narrows with sample size, why a single sample gives one value from this distribution and how the sampling distribution underlies the standard error, the confidence interval and the p-value."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain what the sampling distribution of a statistic is and how it differs from the distribution of the variable itself."
  - "Describe how the sampling distribution of a mean or a proportion is used to quantify the uncertainty of a single estimate."
references:
  - "Student. (1908). The probable error of a mean. Biometrika, 6(1), 1-25. https://doi.org/10.2307/2331554"
  - "Wasserstein, R. L., & Lazar, N. A. (2016). The ASA statement on p-values: Context, process, and purpose. The American Statistician, 70(2), 129-133. https://doi.org/10.1080/00031305.2016.1154108"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A statistic is a number computed from a sample, such as its mean or the proportion of its members with a trait. If a different sample had been drawn, the statistic would have a different value, so the statistic is itself a random variable. Its distribution over all the samples that could be drawn is the sampling distribution. The sampling distribution of a mean, for example, is centred on the population mean and has a spread equal to the standard error. It is a different distribution from that of the measurements themselves.

The sampling distribution is what allows a single sample to say something about the population. Student (1908) derived the distribution of the t statistic for small samples from normal data, and the same idea, that a statistic has a known distribution across samples, underlies all the tests and intervals in the topics that follow. The spread of the sampling distribution, the standard error, measures how far the statistic is likely to lie from the population value, and it shrinks as the sample grows.

A single sample yields one observation of the statistic, and the sampling distribution tells how much that observation might have differed. This is the logic of a confidence interval, which gives the range of population values consistent with the sample, and of a p-value, which gives the probability of a statistic at least as extreme as the one observed if a specified population value were true. Cumming (2014) argues for presenting the interval itself, since it displays the precision that the sampling distribution implies.

Wasserstein and Lazar (2016) emphasise that a p-value depends on the sampling distribution assumed, and the assumption must match the sampling process. A sample that is not random, or that is drawn with dependence between its members, does not have the distribution that the test assumes, and the result is not interpretable as stated.

Sandve et al. (2013) recommended recording how the sample was drawn, since the sampling distribution depends on the sampling design.
