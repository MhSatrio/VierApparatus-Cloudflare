---
title: "Effect Sizes"
subject: "Biology"
specialization: "General Biology"
academic_level: "Advanced Research Methodology"
description: "The choice and calculation of effect sizes for meta-analysis, covering the standardised mean difference that expresses a difference between groups in units of the pooled standard deviation, the log odds ratio and the log risk ratio for binary outcomes, the correlation coefficient and its transformation to Fisher's z for continuous associations, the variance and standard error of each effect size that determine its weight, the conversion of effects between metrics, the handling of studies that report only summary statistics, and the reporting of each effect with its confidence interval so that the magnitude and the precision can be read together."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Choose an effect size appropriate to the outcome type and compute its variance from the reported statistics."
  - "Explain why each effect is reported with its confidence interval and how the variance determines the weight of a study."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Higgins, J. P. T., & Thompson, S. G. (2002). Quantifying heterogeneity in a meta-analysis. Statistics in Medicine, 21(11), 1539-1558. https://doi.org/10.1002/sim.1186"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

An effect size is a number that expresses the magnitude of a result in a form that can be compared across studies. Raw differences cannot be combined when the studies measure the outcome on different scales, so the effect is standardised. The standardised mean difference divides the difference between two group means by a pooled standard deviation, which allows studies with different instruments to be placed on one scale. Cumming (2014) argues that the effect should be reported with its interval, since the size alone does not show how precisely it was estimated.

For binary outcomes, such as the presence or absence of a response, the log odds ratio and the log risk ratio are common choices. They are analysed on the logarithmic scale because their sampling distribution is closer to normal there, and the results are converted back for presentation. For associations between two continuous measures, the correlation coefficient is often transformed to Fisher's z, which is approximately normal and has a variance that depends only on the sample size.

Each effect size has a variance, and the variance determines its weight in the pooled estimate. Larger studies have smaller variances and therefore greater weight, so the choice of formula for the variance matters. The variance must be computed from the reported standard errors, standard deviations, sample sizes or counts, and the formula must be stated in the report. Ioannidis (2005) described how errors in such calculations can change the pooled result, so each value should be checked.

Studies sometimes report only a p-value or a test statistic, and the effect must then be recovered from it with a stated conversion. The conversion is an approximation, and its use must be reported with the number of studies it affected. Higgins & Thompson (2002) provided the framework within which the variance of each study and the variation among studies are estimated together, and the choice of effect size must be consistent with it.
