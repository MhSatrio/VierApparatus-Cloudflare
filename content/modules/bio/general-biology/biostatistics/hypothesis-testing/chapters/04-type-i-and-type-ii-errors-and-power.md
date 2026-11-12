---
title: "Type I and Type II Errors and Power"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The two kinds of error a hypothesis test can make, the false rejection of a true null that is controlled by the significance level and the failure to reject a false null that is governed by the power, how power depends on the effect size, the variance, the sample size and the significance level, the calculation of the sample size needed to detect an effect of a given size and the reason that an underpowered study that reports a significant result overestimates the effect."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Define the type I error rate and the power of a test and state how each depends on the design."
  - "Explain why a significant result from an underpowered study tends to overestimate the effect and how the sample size is planned to avoid this."
references:
  - "Neyman, J., & Pearson, E. S. (1933). On the problem of the most efficient tests of statistical hypotheses. Philosophical Transactions of the Royal Society of London. Series A, Containing Papers of a Mathematical or Physical Character, 231(694-706), 289-337. https://doi.org/10.1098/rsta.1933.0009"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A test can err in two ways. A type I error is the rejection of a true null hypothesis, a false positive, and its probability is the significance level chosen for the test. A type II error is the failure to reject a false null hypothesis, a false negative, and the power of the test is one minus its probability. Neyman and Pearson (1933) set out this framework, in which the two errors trade against each other for a given sample, and the power depends on the alternative hypothesis that the test is designed to detect.

Power rises with the size of the effect, the number of observations and the significance level, and falls with the variability of the data. A large effect in a precise experiment is easy to detect, while a small effect measured with much noise may be missed even with a real difference. The power calculation requires an assumed effect size, and the assumption must be justified by previous work or by the smallest effect that matters biologically.

Planning the sample size is the practical use of power. The investigator states the effect size of interest, the variability expected, the significance level and the power desired, and computes the number of observations needed. A study designed in this way has a known chance of detecting the effect, and a study without this planning may be unable to answer its question.

An underpowered study that reaches significance overestimates the effect. Only the chance overestimates of the true effect will pass the threshold when the power is low, so the significant estimate is larger than the truth. Ioannidis (2005) described this as one of the reasons that published effects shrink on replication, and the problem is most serious in small studies of small effects.

Cumming (2014) argues that the estimate with its interval, rather than the test, should drive the interpretation, since the interval shows the range of effects compatible with the data, and the power calculation tells the reader how much the study could have shown. Sandve et al. (2013) recommended that the power and the sample size planning be recorded with the design.
