---
title: "The Mann-Whitney Test"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The Mann-Whitney test for comparing two independent groups by the ranks of their observations, the calculation of the rank-sum statistic, the null hypothesis it tests in terms of the probability that a value from one group exceeds a value from the other, the handling of ties, the normal approximation for larger samples and the reasons it compares distributions in position rather than the means of the groups."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Rank the observations of two independent groups and compute the Mann-Whitney statistic from the rank sums."
  - "State what the Mann-Whitney test compares and explain why it is not a test of the difference in means."
references:
  - "Mann, H. B., & Whitney, D. R. (1947). On a test of whether one of two random variables is stochastically larger than the other. The Annals of Mathematical Statistics, 18(1), 50-60. https://doi.org/10.1214/aoms/1177730491"
  - "Wilcoxon, F. (1945). Individual comparisons by ranking methods. Biometrics Bulletin, 1(6), 80-83. https://doi.org/10.2307/3001968"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The Mann-Whitney test compares two independent groups without assuming a distribution. All the observations from both groups are pooled and ranked from smallest to largest, the ranks are summed for each group, and the difference between the rank sums, expressed as a statistic, is compared with the distribution expected if the ranks were assigned at random. Mann and Whitney (1947) introduced the test and its distribution, and it is the rank analogue of the two-sample t test. It is used where the data are skewed, ordinal or contain outliers.

The test asks whether one group tends to produce larger values than the other. Its null hypothesis is that a randomly chosen value from one group is as likely to exceed a value from the other as the reverse, and the alternative is that one group is stochastically larger. The test does not compare the means, and a significant result can arise from a difference in shape or spread as well as in location. A reader who interprets it as a test of the means is making an error.

Ties, which occur when two observations have the same value, are handled by assigning each tied observation the average of the ranks it spans. The tie correction changes the variance of the statistic, and a large number of ties, which is common in counts and in measurements of limited precision, must be accounted for. The software should state how ties were treated.

For larger samples, the distribution of the rank sum is approximated by the normal, and a z statistic is computed with its p-value. The approximation is good for moderate samples, and for very small samples the exact distribution is used. The method and the version of the approximation should be recorded.

Wilcoxon (1945), whose rank test for paired data is treated in the next chapter, pioneered this family of methods, and Sandve et al. (2013) recommended recording the ranking, the handling of ties and the method of computing the p-value for a rank test.
