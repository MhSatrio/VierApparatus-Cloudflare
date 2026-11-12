---
title: "The Kruskal-Wallis Test"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The Kruskal-Wallis test for comparing three or more independent groups by their ranks, the statistic computed from the rank sums of the groups, its approximate chi-squared distribution, the interpretation of a significant result as evidence that at least one group differs, the follow-up comparisons between pairs of groups with their correction and the reasons the test is the rank analogue of one-way analysis of variance."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Rank the observations of several groups together and compute the Kruskal-Wallis statistic from the rank sums."
  - "Explain why a significant Kruskal-Wallis result does not identify which groups differ and how the pairwise comparisons are corrected."
references:
  - "Kruskal, W. H., & Wallis, W. A. (1952). Use of ranks in one-criterion variance analysis. Journal of the American Statistical Association, 47(260), 583-621. https://doi.org/10.1080/01621459.1952.10483441"
  - "Mann, H. B., & Whitney, D. R. (1947). On a test of whether one of two random variables is stochastically larger than the other. The Annals of Mathematical Statistics, 18(1), 50-60. https://doi.org/10.1214/aoms/1177730491"
  - "Benjamini, Y., & Hochberg, Y. (1995). Controlling the false discovery rate: A practical and powerful approach to multiple testing. Journal of the Royal Statistical Society: Series B (Methodological), 57(1), 289-300. https://doi.org/10.1111/j.2517-6161.1995.tb02031.x"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The Kruskal-Wallis test extends the rank approach of the Mann-Whitney test to three or more independent groups. All the observations are pooled and ranked, the ranks are summed within each group, and a statistic is computed from the squares of the mean ranks, weighted by the group sizes. Kruskal and Wallis (1952) introduced the statistic as the rank analogue of one-way analysis of variance, and for moderate samples it is referred to a chi-squared distribution with one less than the number of groups as its degrees of freedom.

The null hypothesis is that the groups come from the same distribution, and the alternative is that at least one group tends to produce larger or smaller values than the others. A significant result shows that the groups are not all alike, and it does not show which ones differ. The test is an omnibus test, like the overall F test of analysis of variance, and it must be followed by comparisons between pairs of groups.

The pairwise comparisons are made with the rank tests of the Mann-Whitney type, and their number grows with the number of groups. The p-values of these comparisons must be corrected for multiplicity, and the Benjamini and Hochberg (1995) procedure or a family-wise correction is applied to them. Without the correction, the comparisons inflate the rate of false differences, as the multiple-testing topic describes.

Ties are handled as in the Mann-Whitney test, with the tie correction applied to the statistic. Many ties, as in ordinal scores or counts, reduce the power and must be reported.

Mann and Whitney (1947) developed the two-group case, and the Kruskal-Wallis test is its generalisation. Sandve et al. (2013) recommended recording the groups, the statistic, the correction for ties and the method of the follow-up comparisons.
