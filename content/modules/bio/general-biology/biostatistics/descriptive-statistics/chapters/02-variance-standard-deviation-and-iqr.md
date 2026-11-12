---
title: "Variance, Standard Deviation and the Interquartile Range"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The measures of the spread of a biological sample, namely the sample variance and standard deviation that use the squared deviations from the mean, the interquartile range that uses the middle half of the ordered values and is robust to extremes, the sample size correction that makes the variance an unbiased estimate, the relation between the standard deviation and the standard error and the choice of spread measure for a given distribution."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Compute the sample variance, standard deviation and interquartile range of a dataset and state what each describes."
  - "Explain the difference between the standard deviation of a sample and the standard error of its mean."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Student. (1908). The probable error of a mean. Biometrika, 6(1), 1-25. https://doi.org/10.2307/2331554"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The sample variance is the average of the squared deviations of the values from their mean, with the sum divided by one less than the sample size rather than by the sample size itself. The correction makes the variance an unbiased estimate of the population variance, since the mean is itself estimated from the same data. Its square root, the standard deviation, is in the units of the measurement and describes the typical distance of a value from the mean. Student (1908) worked with these quantities in deriving the distribution of the mean of a small sample.

The interquartile range is the difference between the third and first quartiles, the values below which three quarters and one quarter of the data lie. It describes the spread of the middle half of the data and is unaffected by the most extreme values, which makes it the natural companion of the median for a skewed variable. A dataset with a few very large values may have a large standard deviation and a small interquartile range, and the two together show that the spread is driven by the tail.

The standard deviation of a sample is not the standard error of its mean. The standard deviation describes the variability of the individual values, while the standard error describes the uncertainty of the mean, and the standard error is smaller by the square root of the sample size. Confusing the two is a common error in biology, and Cumming (2014) argues that the uncertainty of an estimate is better shown by a confidence interval than by a standard error bar alone.

The choice of spread measure follows from the distribution. For a symmetric variable, the standard deviation with the mean is the natural summary. For a skewed variable, the interquartile range with the median describes the data better, and the two should be reported as a pair with the measure of centre.

Sandve et al. (2013) recommended recording the measures used, and a report that gives a mean without its spread, or a standard deviation without saying whether it is the standard error, leaves the reader unable to judge the data.
