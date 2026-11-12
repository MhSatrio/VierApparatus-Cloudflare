---
title: "Parametric and Nonparametric Tests"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The distinction between parametric tests, which assume a distribution with parameters such as the normal, and nonparametric tests, which use the ranks of the data and make fewer assumptions, covering the t test and analysis of variance, the Mann-Whitney, Wilcoxon signed-rank and Kruskal-Wallis rank tests, the comparison of agreement between two methods of measurement, the efficiency of each family when its assumptions hold and the choice of test for a given biological design."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain the difference between a parametric and a nonparametric test and state the assumptions each requires."
  - "Choose a parametric or a rank-based test for a given biological design and state the reason for the choice."
references:
  - "Mann, H. B., & Whitney, D. R. (1947). On a test of whether one of two random variables is stochastically larger than the other. The Annals of Mathematical Statistics, 18(1), 50-60. https://doi.org/10.1214/aoms/1177730491"
  - "Wilcoxon, F. (1945). Individual comparisons by ranking methods. Biometrics Bulletin, 1(6), 80-83. https://doi.org/10.2307/3001968"
  - "Kruskal, W. H., & Wallis, W. A. (1952). Use of ranks in one-criterion variance analysis. Journal of the American Statistical Association, 47(260), 583-621. https://doi.org/10.1080/01621459.1952.10483441"
  - "Bland, J. M., & Altman, D. G. (1986). Statistical methods for assessing agreement between two methods of clinical measurement. The Lancet, 327(8476), 307-310. https://doi.org/10.1016/S0140-6736(86)90837-8"
  - "Student. (1908). The probable error of a mean. Biometrika, 6(1), 1-25. https://doi.org/10.2307/2331554"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A parametric test assumes that the data come from a distribution with a known form, usually the normal, and uses its parameters to compute the test. The t test and analysis of variance are the main examples. A nonparametric test makes no assumption about the form of the distribution and replaces the values by their ranks, so that the test depends only on the order of the observations. Rank tests are more robust to skewed data and outliers, and they are less powerful than the parametric tests when those tests' assumptions hold.

The topic covers the two families and the tests that represent each. The Mann-Whitney test, described by Mann and Whitney (1947), compares two independent groups by their ranks. The Wilcoxon signed-rank test, from Wilcoxon (1945), handles matched pairs. The Kruskal-Wallis test, from Kruskal and Wallis (1952), extends the comparison to several groups. The Bland-Altman analysis, from Bland and Altman (1986), addresses agreement between two methods of measurement, which is a different question from the difference between groups.

The choice between the families is a judgement about the data and the design. A test is not chosen because it gives the desired result. Student (1908) derived the t distribution for normal data, and the t test remains the standard when its assumptions are reasonable, while the rank tests are preferred for small skewed samples and ordinal data. The decision should be made from the design and the distribution before the comparison is run.

Sandve et al. (2013) recommended recording the test chosen and the reason for the choice, and the ranks used, the handling of ties and the software version, since rank tests have details that affect the result.
