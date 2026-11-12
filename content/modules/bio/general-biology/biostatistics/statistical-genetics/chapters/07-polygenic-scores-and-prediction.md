---
title: "Polygenic Scores and Prediction"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The polygenic score as a weighted sum of the allele counts across many variants, with weights taken from the effect estimates of a discovery study, the clumping and thresholding of variants to reduce their correlation, the evaluation of a score in an independent sample by its prediction accuracy and its calibration, the reduction of accuracy in populations different from the discovery sample, and the caution needed before a score is used to predict an individual's risk."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Construct a polygenic score from effect estimates and evaluate it in an independent sample."
  - "Explain why the accuracy of a polygenic score falls in populations that differ from the discovery sample."
references:
  - "Visscher, P. M., Wray, N. R., Zhang, Q., Sklar, P., McCarthy, M. I., Brown, M. A., & Yang, J. (2017). 10 Years of GWAS Discovery: Biology, Function, and Translation. The American Journal of Human Genetics, 101(1), 5-22. https://doi.org/10.1016/j.ajhg.2017.06.005"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A polygenic score sums the allele counts across many variants, each weighted by its estimated effect on the trait, to give a single value for each individual. The weights come from a discovery study, and the score aims to predict a trait in people who were not in that study. Because most traits are influenced by many variants of small effect, the score can capture a part of the genetic variance that no single variant reaches, and this is its appeal.

Before the weights are applied, the variants are usually pruned or clumped to reduce the correlation between them, since linkage disequilibrium makes neighbouring variants redundant. A threshold on the discovery p-value selects which variants enter the score. Visscher et al. (2017) noted that the choice of threshold and clumping parameters changes the score, and the parameters are often selected by their performance in a validation sample. A score evaluated in the same sample that chose its parameters will look better than it is.

The score is judged by its prediction accuracy in an independent sample, measured as the correlation or the variance explained, and by its calibration, which is the agreement between predicted and observed values. Cumming (2014) argues that the accuracy should be reported with its interval, since the estimate from a modest sample may vary widely. Ioannidis (2005) described how the selection of the best-performing score inflates its apparent accuracy, and a test in a truly separate sample is needed.

Accuracy falls when a score is applied to populations that differ from the discovery sample, because the linkage patterns and allele frequencies differ and the weights transfer poorly. A score developed in one ancestry group may predict little in another, and its use for individual risk is therefore limited to the population where it was validated. Sandve et al. (2013) recommended recording the discovery and validation samples, the parameters and the code, so that the score can be reproduced and its scope stated.
