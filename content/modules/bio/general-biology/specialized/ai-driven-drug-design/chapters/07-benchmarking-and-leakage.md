---
title: "Benchmarking and Data Leakage"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "The benchmarking of AI methods in drug design against common datasets, and the data leakage that can make a method appear to perform better than it does, covering the public benchmarks used to compare methods and the temptation to tune methods to them, the leakage that occurs when information from the test set enters the training through duplicates, near-duplicates, shared scaffolds or the use of test labels in feature selection, the temporal split that tests a model on compounds reported after its training data, the leaderboards that reward small differences, and the need for held-out sets that are kept untouched until the final evaluation."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how data leakage through near-duplicate compounds inflates the performance of a model and state the split that detects it."
  - "Explain why a benchmark that is used repeatedly for model selection loses its value as an independent test."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

A benchmark is a standard dataset on which methods are compared, and its value depends on its being independent of the methods tested. When many methods are tuned to the same benchmark, the methods are selected to fit its peculiarities, and the benchmark loses its power to discriminate. Ioannidis (2005) described how repeated selection among analyses inflates the apparent success of the best, and a benchmark used in this way becomes a source of such inflation.

Data leakage occurs when information from the test set enters the training. Near-duplicate compounds, such as those that differ only by a salt or a stereoisomer, can appear in both sets and allow the model to memorise the answer. Shared scaffolds, the common core structures of a chemical series, can leak the same information. The use of test labels in feature selection is a more subtle leak, which inflates the performance without the investigator noticing. Peng (2011) argued that a result is reproducible only if its procedure is fully specified, and the procedure should show that the test set was never used in training.

A temporal split tests a model on compounds that were reported after its training data were collected, which mimics the use of a model on new chemistry. Temporal splits are often more demanding than random ones, and they give a realistic estimate of performance. The split should be described with the dates, since a model that performs well on early compounds may not perform on later ones.

Leaderboards reward small differences that may be within the noise of the benchmark, and a method that tops a leaderboard may not be better in practice. The difference between methods should be tested with its interval, and the held-out test set should be kept untouched until the final evaluation. Cumming (2014) argues that differences should be reported with their intervals rather than as rank positions, and Ioannidis (2005) described how such rankings may reflect chance.
