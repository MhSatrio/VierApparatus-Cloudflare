---
title: "Estimators and Their Properties"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "What an estimator is and the properties by which estimators are judged, namely unbiasedness, which means the average of the estimator over samples equals the population value, efficiency, which means a small variance, and consistency, which means the estimator converges to the true value as the sample grows, with examples from the sample mean, the sample proportion and the sample variance and the trade-off between bias and variance in small samples."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Define an estimator and state what it means for it to be unbiased, efficient and consistent."
  - "Explain why a biased estimator can sometimes have a smaller error than an unbiased one in a small sample."
references:
  - "Student. (1908). The probable error of a mean. Biometrika, 6(1), 1-25. https://doi.org/10.2307/2331554"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Wasserstein, R. L., & Lazar, N. A. (2016). The ASA statement on p-values: Context, process, and purpose. The American Statistician, 70(2), 129-133. https://doi.org/10.1080/00031305.2016.1154108"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

An estimator is a rule that computes a value from a sample to approximate a population parameter. The sample mean estimates the population mean, the sample proportion estimates a population proportion and the sample variance estimates the population variance. Each rule gives a different value for each sample, so the estimator is itself a random variable. Its quality is judged by its properties over repeated sampling, and three are central.

An estimator is unbiased if its average over all possible samples equals the parameter it estimates. The sample mean is unbiased, and the sample variance is unbiased when divided by one less than the sample size, as Student (1908) and later workers showed, which is why the correction appears in the descriptive topic. Unbiasedness is a property of the average, and a single estimate can lie far from the truth.

An estimator is efficient if its variance is small among the unbiased estimators, and consistent if it converges to the true value as the sample grows. The sample mean is consistent, and its standard error falls with the square root of the sample size. These properties describe the behaviour of the estimator as the sample is repeated or enlarged, and they guide the choice of method for a given design.

In small samples, a biased estimator may have a smaller total error than an unbiased one, because its variance is much smaller. The total error combines the squared bias and the variance, and a trade-off between them is sometimes worth making. Cumming (2014) argues for reporting the estimate with its interval, since the interval reveals how far the estimate may lie from the truth, which the bias and variance together determine.

Wasserstein and Lazar (2016) observe that the value of an estimate is the information it gives about the population, and its properties determine how far that information can be relied upon. Sandve et al. (2013) recommended that the estimator used in an analysis be stated, since the same parameter can be estimated in several ways with different properties.
