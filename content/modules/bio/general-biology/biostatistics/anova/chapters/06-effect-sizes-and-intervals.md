---
title: "Effect Sizes and Intervals"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The effect sizes that summarise the importance of a factor or an interaction in analysis of variance, including the eta squared and partial eta squared proportions of variation explained, the intervals for differences between means derived from the residual variance, the standardised mean difference that expresses an effect in units of the residual standard deviation and the reasons that a significant F does not establish that an effect is large."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Compute the proportion of variation explained by a factor and state what it does and does not measure."
  - "Compute an interval for a difference between two means from the residual variance of an analysis of variance."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Wasserstein, R. L., & Lazar, N. A. (2016). The ASA statement on p-values: Context, process, and purpose. The American Statistician, 70(2), 129-133. https://doi.org/10.1080/00031305.2016.1154108"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A significant F statistic reports the strength of the evidence that a factor has an effect, and it says nothing about how large that effect is. A factor with a very large sample may produce a highly significant F and explain a trivial share of the variation. Cumming (2014) argues that the effect size and its interval are the primary results, and the analysis of variance supplies them in several forms that a reader can use.

The proportion of variation explained, eta squared, is the sum of squares of a term divided by the total sum of squares. Partial eta squared divides by the sum of the term's sum of squares and the residual, which makes the figure comparable across terms in a multi-factor design. Both are descriptions of the sample, and they are biased upward in small samples, so the adjusted version is often reported. Neither tells the reader whether the effect is biologically important, which requires knowledge of the system.

An interval for the difference between two means is computed from the residual mean square, which pools the variation of all the groups. Using the pooled residual is more precise than using the two groups alone when the variances are similar, and the interval should state the degrees of freedom of the residual on which it is based. Wasserstein and Lazar (2016) note that a p-value conveys neither the size of an effect nor its precision, and the interval conveys both.

The standardised mean difference expresses an effect in units of the residual standard deviation. It allows effects measured in different units or in different studies to be compared, and it is widely used in meta-analysis. The standardisation depends on the residual variance, which depends on the design and the noise of the measurement, so the comparability is only approximate.

Sandve et al. (2013) recommended recording the effect sizes with the tests, so that a reader can judge the importance of an effect and not only its significance.
