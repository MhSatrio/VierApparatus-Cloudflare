---
title: "Outliers and Robust Summaries"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "How outliers are identified in biological data, the distinction between an outlier caused by error and a genuine extreme value, the rules of thumb based on the interquartile range, the effect of outliers on the mean, the standard deviation and the correlation, robust summaries such as the median and the trimmed mean that resist extreme values and the discipline of deciding how to treat an outlier before looking at its effect on the result."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Identify potential outliers with a rule based on the interquartile range and state whether each is an error or a genuine extreme value."
  - "Compare a mean with a robust summary for a dataset containing an outlier and state which describes the typical value."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

An outlier is a value that lies far from the rest of the data. It may be the result of a measurement error, a contaminated sample or a failed assay, in which case it should not be part of the analysis. It may also be a genuine extreme value of a skewed biological variable, such as a cell that is much larger than its neighbours, and removing it would discard real biology. The first task is to decide, from the process that produced the value, which of these it is, before its effect on the result is considered.

A common rule flags as possible outliers the values more than one and a half interquartile ranges beyond the quartiles. The rule is a screening device and not a verdict, since a skewed distribution will produce flagged values that are genuine. A flagged value should be examined against the record of its measurement, and the decision recorded. Removing values because they make a result unwelcome is a form of the flexibility that Ioannidis (2005) described as producing false findings.

The effect of an outlier depends on the statistic. The mean and the standard deviation are sensitive to extreme values, and a single large value can move them substantially. The median and the interquartile range are robust, and the trimmed mean, which discards a fixed fraction of the extremes, is a compromise between the two. A robust summary describes the typical value without being dominated by the tail, which is the reason it is preferred for skewed data.

Cumming (2014) argues that the effect of an outlier should be shown rather than hidden, so that a reader can see how much the conclusion depends on it. A result reported with and without the outlier, or with a robust summary alongside the mean, makes the dependence visible.

Sandve et al. (2013) recommended that the treatment of outliers be recorded and decided in advance where possible, and the rule, the values flagged and the reason for any removal form the record of the decision.
