---
title: "Analysis of Variance"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "Analysis of variance as a parametric test that compares the means of several groups by partitioning the total variation into the variation between groups and the variation within them, the F statistic as the ratio of these components, the assumptions of normal errors and equal variances that it shares with the t test, the follow-up comparisons that must be corrected for multiplicity and the reasons a significant overall test does not identify which groups differ."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Partition the variation of a one-way design into between-group and within-group components and compute the F statistic."
  - "Explain why follow-up comparisons after a significant analysis of variance must be corrected for the number of comparisons."
references:
  - "Kruskal, W. H., & Wallis, W. A. (1952). Use of ranks in one-criterion variance analysis. Journal of the American Statistical Association, 47(260), 583-621. https://doi.org/10.1080/01621459.1952.10483441"
  - "Benjamini, Y., & Hochberg, Y. (1995). Controlling the false discovery rate: A practical and powerful approach to multiple testing. Journal of the Royal Statistical Society: Series B (Methodological), 57(1), 289-300. https://doi.org/10.1111/j.2517-6161.1995.tb02031.x"
  - "Student. (1908). The probable error of a mean. Biometrika, 6(1), 1-25. https://doi.org/10.2307/2331554"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Analysis of variance compares the means of several groups in one test. It divides the total variation of the observations into two parts: the variation of the group means around the overall mean, which reflects any true differences between groups, and the variation of the observations within each group, which reflects the noise. The ratio of the between-group mean square to the within-group mean square is the F statistic, and a large ratio means that the groups differ more than their internal variation would suggest. The test extends the t test of two groups to any number.

The assumptions are the same as for the t test: independent observations, normal errors and equal variances across the groups. Unequal variances affect the F test as they affect the t test, and the checks of the earlier topics apply. Kruskal and Wallis (1952) developed the rank analogue for the same design, which does not assume normality and is used when the assumptions fail or the data are ordinal.

A significant F statistic says only that the groups do not all have the same mean. It does not say which groups differ, and the follow-up comparisons must be made to find out. Each comparison is a test in its own right, and their number grows quickly with the number of groups. The comparisons must be corrected for multiplicity, and the Benjamini and Hochberg (1995) procedure or a family-wise correction is applied to them, so that the reported differences are not inflated by the search.

Student (1908) worked on the comparison of means and the distributions that underlie the t test, and the analysis of variance is the extension of this logic to several groups. Sandve et al. (2013) recommended recording the design, the F statistic with its degrees of freedom, the assumption checks and the corrected follow-up comparisons, since a bare significant F leaves the reader without the answer to the question of which groups differ.
