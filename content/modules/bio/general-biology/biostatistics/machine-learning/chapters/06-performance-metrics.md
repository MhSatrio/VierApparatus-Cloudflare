---
title: "Performance Metrics"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The metrics that summarise how well a classifier or a regression model predicts, namely sensitivity, specificity, positive and negative predictive values and the area under the receiver operating characteristic curve for classification, and the mean squared error, the mean absolute error and the coefficient of determination for regression, the dependence of predictive values on the prevalence of the outcome, the calibration of predicted probabilities, and the choice of a metric that reflects the costs of errors in the biological context."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Calculate sensitivity, specificity and predictive values from a confusion matrix and state how the predictive values depend on prevalence."
  - "Choose a regression or classification metric that reflects the costs of the errors in the biological problem."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A classifier is judged by how its predictions agree with the true outcomes, and the agreement is summarised in a confusion matrix of true and false positives and negatives. Sensitivity is the proportion of true cases that are detected, and specificity is the proportion of non-cases that are correctly classified. These two properties belong to the test and are not affected by how common the outcome is, which makes them useful for comparing methods across populations.

The positive predictive value is the probability that a positive prediction is correct, and it depends strongly on the prevalence of the outcome. A test with high sensitivity and specificity applied to a rare outcome will produce many false positives, since the non-cases vastly outnumber the cases. Ioannidis (2005) explained how low prevalence and low positive predictive value combine to make many claimed findings false, and the prevalence in the population of use must be considered before a classifier is judged.

The area under the receiver operating characteristic curve summarises performance across all thresholds, and it equals the probability that a randomly chosen case receives a higher score than a randomly chosen non-case. It does not depend on a single threshold, but it can be misleading when the costs of errors differ, and a precision-recall curve is preferred for rare outcomes. Predicted probabilities should also be calibrated, so that a predicted risk of 0.2 corresponds to an observed frequency near 0.2 among such cases.

For regression, the mean squared error and the mean absolute error measure the size of the errors, and the coefficient of determination gives the proportion of variance predicted. Cumming (2014) argues that each metric should be reported with its interval, and that the choice of metric should follow the consequences of the errors. Sandve et al. (2013) recommended recording the metric definitions and the threshold choice, since a reported accuracy means little without them.
