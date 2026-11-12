---
title: "Heritability and Polygenic Scores"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The estimation of heritability from genetic data and the construction of polygenic scores that aggregate the effects of many variants to predict an individual's trait, covering the estimation of SNP heritability from the relationship between genetic similarity and phenotypic similarity with its standard error, the distinction between heritability in a population and the causal effect of a genotype, the construction of a polygenic score from variant effect sizes estimated in a discovery sample, the tuning of the score in a validation sample, the accuracy of the score measured as the variance explained with its interval, the decline of accuracy when the score is applied to ancestry groups other than the discovery sample, and the reporting of the score, its accuracy and its transferability with intervals."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Construct a polygenic score from discovery effect sizes and test its accuracy in an independent validation sample with an interval."
  - "Explain why the accuracy of a polygenic score declines in ancestry groups different from the discovery sample."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

Heritability describes how much of the variation in a trait in a population is associated with genetic variation. It is estimated from the relationship between genetic similarity and phenotypic similarity among individuals, and the estimate carries a standard error that depends on the sample size. A heritability is a property of a population in its environment, and it does not state how much a particular genotype causes a trait. Cumming (2014) argues that the standard error should be reported with the estimate, since a heritability from a modest sample can be imprecise.

A polygenic score sums the effects of many variants, each weighted by its effect size estimated in a discovery sample, to give an individual a score for the trait. The score is a prediction, and its accuracy is the proportion of the trait variance it explains in an independent validation sample. Ioannidis (2005) described how the accuracy of a prediction can be overstated when the validation is not independent of the discovery, and the separation of the samples is essential.

The tuning of the score, such as the choice of the number of variants or the threshold of significance, must be done in a validation sample that differs from the one used to test the final accuracy. Tuning and testing in the same sample inflate the apparent accuracy. The accuracy should be reported with its interval, since it depends on the size of the validation sample.

The accuracy of a polygenic score declines when it is applied to ancestry groups other than the one in which the effect sizes were estimated, because the linkage and the frequencies of the variants differ between groups. This decline is a central limitation, and it must be quantified in each group before the score is used. Munafò et al. (2017) argued that the transferability of the score should be reported honestly, since a score that works well in one group and poorly in others can widen existing inequalities in care.

Peng (2011) argued that the discovery effect sizes, the tuning procedure and the validation data must be documented so that the score can be reproduced. The score, its accuracy and its transferability should all be reported with their intervals.
