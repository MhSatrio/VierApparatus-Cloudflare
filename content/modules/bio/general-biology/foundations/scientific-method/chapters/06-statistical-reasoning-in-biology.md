---
title: "Statistical Reasoning in Biology"
subject: "Biology"
specialization: "General Biology"
academic_level: "Foundations of Biology"
description: "How statistics help decide whether a difference is larger than the variation expected by chance, and what a p-value does and does not mean."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain what a p-value measures and what it does not measure."
  - "Describe why the size of an effect matters as much as its statistical significance."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

Statistics provide a common language for judging whether an observed difference is larger than the variation that biological systems produce by chance. The central tool is the significance test, which asks how probable the observed result would be if there were no real effect. The probability is the p-value. A small p-value indicates that the observed result would be unusual under the assumption of no effect, which is evidence against that assumption.

A p-value is often misread. It is not the probability that the hypothesis is true, and it is not the probability that the result will replicate. It is a statement about data expected under a specified model. A p-value of 0.04 means that, if the model of no effect is correct, results at least this extreme would occur about four times in a hundred repetitions. It does not say how large the effect is or how important it is.

Effect size is therefore a necessary companion to the p-value. A treatment may change an outcome by a tiny and biologically meaningless amount, and that change may still be statistically significant when the sample is very large. Another treatment may have a large effect that fails to reach significance in a small study. Reporting the estimated difference with its uncertainty, usually as a confidence interval, gives the reader the information needed to judge whether the result matters.

Ioannidis (2005) showed that the probability that a published finding is true depends on the prior odds that the tested relationship exists, on the power of the study and on the bias in its design and reporting. Significance alone does not settle the question. A surprising result from a small, underpowered study with flexible analysis has a lower chance of being true than a modest result from a well-designed study of a plausible hypothesis.

Alberts et al. (2022) note that many biological measurements are noisy, and that careful investigators choose analyses before seeing the data. The statistical habit that serves biology best is to state the question, the planned analysis and the threshold for interpretation in advance, and then to report what was found, including results that were not expected.
