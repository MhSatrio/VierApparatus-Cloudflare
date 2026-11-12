---
title: "Categorical Data and Contingency Tables"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "How categorical biological data are summarised as counts and proportions, the construction of a contingency table that cross-tabulates two categorical variables, the row, column and total proportions and the odds and risk ratios that compare groups, the proportion of a category with its confidence interval and the caution that a proportion computed from a small number of observations can be very imprecise."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Construct a contingency table from categorical biological data and compute the row proportions and a risk ratio."
  - "Compute the confidence interval of a proportion and explain why a proportion from few observations is imprecise."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Many biological variables are categories: a genotype, a response to treatment, a species, a presence or absence. Their summary is a count, the number of individuals in each category, and a proportion, the count divided by the total. A contingency table cross-tabulates two categorical variables, so that each cell holds the number of individuals with a given combination of categories. The table is the basic summary of association between categories, and it is the input to the tests of later topics.

Proportions are compared between groups through row or column proportions, and the comparison is often expressed as a risk ratio, the proportion in one group divided by the proportion in another, or as an odds ratio. The two are not interchangeable: the risk ratio is intuitive when the outcome is common, while the odds ratio is the quantity that arises in many models and is more misleading as an estimate of risk when the outcome is common. The ratio chosen must be stated with its interpretation.

A proportion computed from a few observations is imprecise. Ten successes out of twenty gives a proportion of one half, but the interval around it is very wide, and a proportion of one out of two gives an interval that spans most of the scale. Cumming (2014) argues that the interval should accompany the proportion, since the proportion alone suggests a precision that the data do not have.

Ioannidis (2005) described how a result that appears strongly in a small table can be a product of chance and of selection, and a striking proportion from a small group should be treated with caution until it has been confirmed in an independent sample.

Sandve et al. (2013) recommended recording the counts behind each proportion, so that the reader can see the size of the groups as well as the ratio between them.
