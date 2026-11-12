---
title: "The P-Value and What It Means"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The p-value as the probability, under the null hypothesis, of a test statistic at least as extreme as the one observed, what a p-value does and does not measure, the misreadings that treat it as the probability that the null is true or as the size of an effect, the dependence of a p-value on the sample size and the reasons the 0.05 threshold is a convention rather than a law, following the statement of the American Statistical Association."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Define a p-value precisely and state the assumption under which it is computed."
  - "Identify the common misreadings of a p-value and explain why each is wrong."
references:
  - "Wasserstein, R. L., & Lazar, N. A. (2016). The ASA statement on p-values: Context, process, and purpose. The American Statistician, 70(2), 129-133. https://doi.org/10.1080/00031305.2016.1154108"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The p-value is the probability, computed under the null hypothesis and the model, of obtaining a test statistic at least as extreme as the one observed. It is a statement about the data given the null. It is not the probability that the null is true, and it is not the probability that the result would be found again. Wasserstein and Lazar (2016) set out these points in the statement of the American Statistical Association, and their first principle is that a p-value indicates how incompatible the data are with a specified model.

Several misreadings are common. A p-value is not the size of an effect: a tiny effect in a large sample gives a small p-value, and a large effect in a small sample may give a large one. It is not the probability of a false positive: that depends on the prior probability that the hypothesis is true, which is the point of the analysis by Ioannidis (2005). And a p-value above the threshold does not show that there is no effect, only that the data do not reject the null under the model.

The threshold of 0.05 is a convention that has been treated as a boundary between truth and falsehood. Wasserstein and Lazar (2016) warn against this, since the difference between a p-value of 0.04 and one of 0.06 is not a difference in the evidence that justifies such different conclusions. Cumming (2014) argues that the interval conveys the size and precision of the effect far better than a p-value, and the p-value should be read alongside them.

The sample size affects the p-value directly. With enough observations, almost any difference becomes statistically significant, and with few observations a substantial difference may not reach significance. A reader must therefore judge the p-value against the size of the effect and the sample, not against a threshold alone.

Sandve et al. (2013) recommended that the exact p-values of an analysis be reported with the test used, and the statistic and the sample size should accompany them.
