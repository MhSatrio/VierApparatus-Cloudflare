---
title: "Confidence Intervals"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The confidence interval as a range of population values consistent with the sample, how it is constructed from an estimate and its standard error and the critical value, the meaning of the confidence level in terms of repeated sampling, the common misreading that a 95 per cent interval has a 95 per cent probability of containing the parameter, the interpretation of a difference between groups by its interval and the advantage of intervals over a bare p-value as a report of precision."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Construct a confidence interval for a mean from a sample and interpret its width and its position."
  - "Explain the meaning of the confidence level in repeated sampling and avoid the common misreading of a single interval."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Wasserstein, R. L., & Lazar, N. A. (2016). The ASA statement on p-values: Context, process, and purpose. The American Statistician, 70(2), 129-133. https://doi.org/10.1080/00031305.2016.1154108"
  - "Student. (1908). The probable error of a mean. Biometrika, 6(1), 1-25. https://doi.org/10.2307/2331554"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A confidence interval is a range computed from a sample that is constructed by a procedure which, applied to many samples, would contain the population parameter for a stated proportion of them. For a mean, the interval is the sample mean plus and minus a critical value times the standard error. The critical value comes from the t distribution, which Student (1908) derived for small samples, and it is larger for small samples because the standard error is itself uncertain.

The confidence level describes the procedure, not the interval. A 95 per cent level means that about ninety-five of every hundred intervals so constructed would contain the true mean. It does not mean that the particular interval has a ninety-five per cent probability of containing it, since the true mean is fixed and the interval either contains it or does not. The distinction is subtle, and it is the most common error in reading an interval.

The interval shows precision as well as location. A narrow interval says that the data pin the parameter down, and a wide one says that they do not. Cumming (2014) argues that the interval should be the primary report of an estimate, since it displays both the size of an effect and the uncertainty around it, which a p-value alone does not.

A difference between two groups is reported by its interval as well. An interval for the difference that excludes zero is the same information as a significant test at the corresponding level, but it also gives the size of the difference and its plausible range. Wasserstein and Lazar (2016) note that a p-value conveys neither size nor precision, and the interval conveys both.

Sandve et al. (2013) recommended recording the method of constructing the interval, since intervals computed by different methods can differ, particularly for small samples and skewed data.
