---
title: "Hypothesis Testing and Its Errors"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "The logic of testing a null hypothesis, the p-value as the probability of data at least as extreme under that hypothesis, the two kinds of error that a test can make, the power of a test to detect a real effect and the multiple comparisons that inflate the rate of false positives."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain what a p-value measures and what it does not measure."
  - "Describe the two kinds of error in a hypothesis test and the role of power in controlling the second."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

A hypothesis test asks whether the data are consistent with a null hypothesis, usually that there is no effect. The test calculates the probability of data at least as extreme as those observed, if the null hypothesis were true. This is the p-value. A small p-value means that the observed data would be unlikely under the null hypothesis, and it is taken as evidence against it. The p-value is a statement about the data given the hypothesis, not the probability that the hypothesis is true, and this distinction is frequently overlooked.

A test can make two kinds of error. A false positive, or type one error, rejects a null hypothesis that is true, and it occurs at a rate set by the chosen threshold, commonly five per cent. A false negative, or type two error, fails to reject a null hypothesis that is false, and it occurs when the study lacks the power to detect the effect. Power is the probability of detecting a real effect of a given size, and a study of low power will miss real effects and report that they are absent.

Ioannidis (2005) described how the combination of low power and a conventional threshold produces a literature in which many significant results are false, because the proportion of true effects among those tested is small. A significant result from a study of low power is therefore less likely to be true than its p-value suggests, and the power must be stated.

Multiple comparisons inflate the rate of false positives. Each test carries a chance of a false positive, and testing many outcomes or many subgroups increases the chance that at least one will appear significant by chance. The correction for multiple testing reduces the threshold for each test so that the overall error rate is controlled, and the correction must be prespecified or it becomes a form of selection.

Platt (1964) recommended a strategy of testing alternatives that could be shown to be wrong, and a test designed with a clear alternative hypothesis and a power calculation is more informative than one that asks only whether the effect differs from zero.

The hypothesis test is a tool for weighing evidence against a stated null, and its errors are controlled by design, power and the honest accounting of the comparisons made.
