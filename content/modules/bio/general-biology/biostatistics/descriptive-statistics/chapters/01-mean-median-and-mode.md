---
title: "Mean, Median and Mode"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The measures of the centre of a biological sample, namely the arithmetic mean, the median and the mode, how each is computed, how each responds to skewness and to extreme values, the appropriate choice of measure for symmetric, skewed and categorical data and the reason that a report should state which measure of centre it uses and why."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Compute the mean, median and mode of a sample and state how a single extreme value changes each."
  - "Choose a measure of centre for a skewed biological variable and justify the choice."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The arithmetic mean is the sum of the values divided by their number. It is the quantity that the central limit theorem concerns and the one most used in biology, but it responds to every value, so a single extreme value can move it far from the bulk of the data. The median is the middle value when the data are ordered, and it is unaffected by how extreme the largest or smallest values are. The mode is the most frequent value, and it is the only measure of centre that applies to categorical data.

The choice depends on the shape of the distribution. For a symmetric variable, such as the height of plants of one variety, the mean and median are close, and either describes the centre. For a skewed variable, such as the concentration of a metabolite with a long upper tail, the mean is pulled toward the tail and the median describes the typical individual better. Cumming (2014) argues that the centre should be reported with the spread, so that the reader sees how the values are distributed around it.

A report should state which measure it uses and why. A reader who sees a mean for a skewed variable may take it as typical when it is not, and a median reported without the variable's spread may hide a bimodal distribution. The statement of the measure is a small part of a report, but it determines how the numbers are read.

Sandve et al. (2013) recommended recording the steps of an analysis, and the measure of centre used for each variable, with the reason for its choice, is part of the record.
