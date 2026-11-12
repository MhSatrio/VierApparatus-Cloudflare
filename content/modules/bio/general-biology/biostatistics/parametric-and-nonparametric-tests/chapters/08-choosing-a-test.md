---
title: "Choosing a Test"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "A structured approach to choosing a statistical test for a biological design, covering the type of variable and the number of groups, the pairing or independence of the observations, the distribution and the sample size, the test that follows from each combination and the discipline of fixing the choice in advance and reporting the reasons, so that the test is chosen from the design rather than from the result it gives."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Choose a test from the type of variable, the number of groups, the pairing of observations and the distribution of the data."
  - "Explain why the choice of test must be fixed before the result is seen and how to report the reasons for the choice."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Wasserstein, R. L., & Lazar, N. A. (2016). The ASA statement on p-values: Context, process, and purpose. The American Statistician, 70(2), 129-133. https://doi.org/10.1080/00031305.2016.1154108"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The choice of statistical test is made from the design of the study, not from the result. The first question is the type of the outcome: a continuous measurement, a count, a category or a rank. The second is the number of groups being compared and whether the groups are independent or the observations are paired or repeated. The third is the distribution and the size of the sample, which decide whether a parametric or a rank-based test is appropriate. Each combination of answers leads to a standard test, and the decision tree that results is the means of making the choice systematically.

For two independent groups with a continuous outcome and roughly normal data, the two-sample t test, in its Welch form when the variances may differ, is the usual choice. For two independent groups with a skewed or ordinal outcome, the Mann-Whitney test is preferred. For paired measurements, the paired t test or the Wilcoxon signed-rank test applies by the same logic. For three or more groups, the analysis of variance or the Kruskal-Wallis test is used, followed by corrected comparisons. For categories, a test of independence in a contingency table applies, and for agreement between two methods the Bland and Altman analysis is the appropriate approach.

The choice must be fixed before the data are examined. A researcher who tries several tests and reports the one that is significant is practising the selective reporting that Ioannidis (2005) described as producing false findings. The decision should be written in the protocol, with the reasons, and any change made after the data are seen should be reported as such.

Wasserstein and Lazar (2016) remind readers that a p-value answers a question about a specific test under its assumptions, and a test chosen for its result answers a different question than the one it claims to. Cumming (2014) argues that the estimate with its interval should be the basis of the conclusion, with the test as a supporting statement.

Sandve et al. (2013) recommended recording the design, the variables, the assumptions and the reasons for the test, so that the choice can be assessed by a reader who was not present at the decision.
