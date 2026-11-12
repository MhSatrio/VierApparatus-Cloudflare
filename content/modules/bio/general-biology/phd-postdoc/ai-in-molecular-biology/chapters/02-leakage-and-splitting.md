---
title: "Leakage and Data Splitting"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The avoidance of leakage between training and evaluation data in molecular machine learning, covering the splitting of sequences by sequence identity so that close homologues fall on the same side of the split, the splitting of structures by fold or by family so that the model cannot recognise a relative of a training example, the splitting of data by time, lab or source when the goal is generalisation to new settings, the danger of preprocessing or feature selection performed on the full dataset before splitting, the nested cross-validation that keeps model selection inside the training data, and the reporting of the splitting strategy and of the similarity between training and test sets."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Split a molecular dataset by sequence identity or fold so that close relatives do not appear on both sides of the split."
  - "Use nested cross-validation to keep model selection inside the training data and report the similarity between training and test sets."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

Leakage is the most common reason that a molecular machine learning model appears to perform better than it does. Proteins, genes and molecules that are closely related share features, and a model evaluated on a random split will often be tested on relatives of its training examples. It then succeeds by recognising relatives, which will not help it on a genuinely new case. Ioannidis (2005) described how the inflation of reported performance by such errors has damaged the credibility of many fields, and the split is the first defence.

Sequences should be split by sequence identity, so that homologues with high identity fall on the same side of the split. Structures should be split by fold or by family, since two proteins with different sequences may share a fold and a function. The threshold of similarity should be stated, and its effect on the performance should be examined. Cumming (2014) argues that the performance under a stricter split is more informative about generalisation, and the interval of that performance should be reported.

When the goal is generalisation to new settings, such as new laboratories, new time points or new sources of data, the split should follow those boundaries. A model that performs well within one laboratory may fail in another, and the split by source reveals this. Munafò et al. (2017) argued that the conditions of evaluation must match the claim being made, and a claim of generality requires a test across the boundary that defines generality.

Preprocessing and feature selection performed on the full dataset before splitting leak information from the test set into the model. Every step that uses the data to make a decision must be performed within the training data alone. Nested cross-validation keeps the selection of models and hyperparameters inside an inner loop of the training data, and the outer loop provides an unbiased estimate of performance. Peng (2011) argued that the steps of an analysis must be recorded so that such separation can be verified.

The splitting strategy and the similarity between the training and test sets should be reported. A reader cannot judge the evaluation without knowing how close the test examples are to the training examples. The report should state the similarity measure, the threshold and the resulting distribution of similarity across the two sets.
