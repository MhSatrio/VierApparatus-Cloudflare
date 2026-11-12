---
title: "When Parametric Tests Apply"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The conditions under which parametric tests are valid and efficient, including the assumptions of a known distribution family, independence, equal variances across groups and an adequate sample size, how the central limit theorem relaxes the normality requirement for large samples, the efficiency gain of parametric tests when their assumptions hold and the checks that decide whether a parametric test is justified for a given biological dataset."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "List the assumptions of a parametric test and state how the central limit theorem relaxes one of them for large samples."
  - "Explain why a parametric test is more efficient than a rank test when its assumptions hold and why this gain is lost when they do not."
references:
  - "Student. (1908). The probable error of a mean. Biometrika, 6(1), 1-25. https://doi.org/10.2307/2331554"
  - "Mann, H. B., & Whitney, D. R. (1947). On a test of whether one of two random variables is stochastically larger than the other. The Annals of Mathematical Statistics, 18(1), 50-60. https://doi.org/10.1214/aoms/1177730491"
  - "Wasserstein, R. L., & Lazar, N. A. (2016). The ASA statement on p-values: Context, process, and purpose. The American Statistician, 70(2), 129-133. https://doi.org/10.1080/00031305.2016.1154108"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A parametric test is derived under a model in which the data follow a particular distribution, and the test is valid only as far as the model holds. The t test assumes normal errors, equal variances in the two groups for the pooled version, and independent observations. When these hold, the parametric test uses the information in the data optimally and has the greatest power for a given sample size. Student (1908) showed the form of the distribution on which the test relies for small normal samples.

The central limit theorem relaxes the normality requirement for the mean of a large sample, since the mean of many observations is approximately normal whatever their distribution. A t test applied to the means of two groups of thirty or more observations is therefore often robust to moderate departures from normality. The protection does not extend to the data themselves, or to small samples from strongly skewed distributions, where the approximation fails and the test's p-value is unreliable.

Independence and equal variances are not relaxed by the central limit theorem. Correlated observations inflate the apparent sample size, and unequal variances change the standard error of the difference. Wasserstein and Lazar (2016) note that a p-value is valid only under the model that produced it, and these two assumptions are part of that model.

The efficiency of the parametric test is its advantage when the assumptions hold. A test with more power extracts more evidence from a sample, which matters when samples are costly, as they often are in biology. When the assumptions fail, the advantage can be lost or reversed, and a rank test may then be the more reliable choice.

Sandve et al. (2013) recommended recording the assumptions of a test and the checks made to support them, so that a reader can judge whether the parametric result is justified for the data.
