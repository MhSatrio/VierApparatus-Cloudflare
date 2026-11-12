---
title: "Multivariate Tests of Group Differences"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "Tests that ask whether groups differ overall across several variables at once, including the multivariate analysis of variance that generalises the F test to vectors of measurements, the test statistics that combine the between-group and within-group covariance matrices, the reasons a multivariate test can detect a difference in the joint pattern that no single variable shows and the cautions that the tests require more samples than variables and that a significant overall result must be followed by an examination of which variables carry it."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how a multivariate test combines the between-group and within-group covariance to test for a difference in the joint pattern of several variables."
  - "State the requirement on sample size relative to the number of variables and explain why a significant overall test must be followed by an examination of the variables."
references:
  - "Hotelling, H. (1933). Analysis of a complex of statistical variables into principal components. Journal of Educational Psychology, 24(6), 417-441. https://doi.org/10.1037/h0071325"
  - "Benjamini, Y., & Hochberg, Y. (1995). Controlling the false discovery rate: A practical and powerful approach to multiple testing. Journal of the Royal Statistical Society: Series B (Methodological), 57(1), 289-300. https://doi.org/10.1111/j.2517-6161.1995.tb02031.x"
  - "Wasserstein, R. L., & Lazar, N. A. (2016). The ASA statement on p-values: Context, process, and purpose. The American Statistician, 70(2), 129-133. https://doi.org/10.1080/00031305.2016.1154108"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A multivariate test asks whether groups differ in the joint pattern of several variables, not whether any one variable differs. Two groups may have identical means for each measurement and differ in the correlation between them, and a test of each variable separately would miss this. The multivariate analysis of variance combines the between-group and within-group covariance matrices into a test statistic, and several such statistics, such as Wilks' lambda, the Pillai trace and the Hotelling-Lawley trace, are in use. Hotelling (1933) gave the basis for the multivariate generalisation of the t test.

The test requires that the within-group covariance matrix be estimable, which needs more samples than variables. When the variables outnumber the samples, the matrix is singular and the test cannot be computed, and when the samples barely exceed the variables, the test has little power and its results are unstable. The sample size must be planned with the number of variables in mind, and a study with many measurements per sample must have many samples to support a multivariate test.

A significant overall result says that the groups differ in their joint pattern, and it does not say which variables carry the difference. The variables must be examined, with each one tested or with a contrast that isolates the pattern. The examination is a set of tests, and their number must be corrected, as Benjamini and Hochberg (1995) describe, since a multivariate result followed by many univariate tests inflates the false discoveries.

Wasserstein and Lazar (2016) observe that a p-value from a multivariate test is conditional on the model and the assumptions of multivariate normality and equal covariance, which are often violated in biological data. The assumptions must be checked, and the result reported with them.

Sandve et al. (2013) recommended recording the test statistic used, the sample sizes and the follow-up examination, since a multivariate conclusion depends on each.
