---
title: "The Wilcoxon Signed-Rank Test"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The Wilcoxon signed-rank test for paired or matched observations, the calculation of the differences within each pair, the ranking of their absolute values, the sum of the ranks of the positive and negative differences, the assumption that the distribution of the differences is symmetric about the median, the handling of zero differences and the reasons the test is preferred to the sign test when the magnitudes of the differences carry information."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Compute the signed-rank statistic for a set of paired observations, including the handling of zero differences."
  - "Explain what the signed-rank test assumes about the differences and why it uses their magnitudes as well as their signs."
references:
  - "Wilcoxon, F. (1945). Individual comparisons by ranking methods. Biometrics Bulletin, 1(6), 80-83. https://doi.org/10.2307/3001968"
  - "Mann, H. B., & Whitney, D. R. (1947). On a test of whether one of two random variables is stochastically larger than the other. The Annals of Mathematical Statistics, 18(1), 50-60. https://doi.org/10.1214/aoms/1177730491"
  - "Student. (1908). The probable error of a mean. Biometrika, 6(1), 1-25. https://doi.org/10.2307/2331554"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The Wilcoxon signed-rank test is used for paired observations, such as measurements of the same individuals before and after a treatment or of two methods applied to the same samples. For each pair the difference is computed, and the absolute values of the differences are ranked from smallest to largest. The ranks are then given the sign of their difference, and the sum of the positive ranks is compared with the distribution expected if the signs were random. Wilcoxon (1945) introduced the method for paired comparisons, and it is the rank analogue of the paired t test.

The test uses both the sign and the magnitude of each difference, which is what distinguishes it from the simpler sign test. A pair with a large difference contributes more than a pair with a small one, so the test extracts more information from the data when the magnitudes are meaningful. The sign test discards this information and is less powerful, though it requires fewer assumptions.

The assumption is that the distribution of the differences is symmetric about its median. This is weaker than the normality required by the paired t test, but it is not zero. A set of differences that is strongly skewed violates the assumption, and the median of the differences is then not a good summary of the effect. The symmetry can be examined by a plot of the differences.

Zero differences are normally excluded from the analysis, since they carry no information about the sign. The number excluded must be reported, since a large number of zeros reduces the effective sample size and may indicate a measurement that is too coarse to detect the effect.

Mann and Whitney (1947) developed the rank approach for independent groups, and the signed-rank test is its counterpart for pairs. Student (1908) gave the parametric paired comparison, and Sandve et al. (2013) recommended recording the number of pairs, the number of zero differences excluded and the method used for the p-value.
