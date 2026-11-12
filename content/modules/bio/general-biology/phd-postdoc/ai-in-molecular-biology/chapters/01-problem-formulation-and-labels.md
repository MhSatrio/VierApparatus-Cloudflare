---
title: "Problem Formulation and Labels"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The formulation of a machine learning problem in molecular biology so that its label reflects a real biological quantity measured with known error, covering the distinction between the quantity of interest and the proxy that is available as a label, the measurement error and batch effects in the labels that set a ceiling on achievable performance, the class balance and its effect on the choice of metric, the definition of positive and negative examples, the handling of missing and censored labels, the avoidance of labels that encode the answer through the features, and the documentation of how each label was obtained."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Distinguish the biological quantity of interest from the proxy used as a label and state the error the proxy introduces."
  - "Identify labels that encode the answer through the features and state how such leakage is removed."
references:
  - "LeCun, Y., Bengio, Y., & Hinton, G. (2015). Deep learning. Nature, 521(7553), 436-444. https://doi.org/10.1038/nature14539"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

Every machine learning model learns a mapping from inputs to a label, and its performance can never exceed the quality of the label. In molecular biology the label is often a proxy for the quantity of interest: a measured binding signal stands in for affinity, a expression level stands in for activity, and a classification stands in for function. The proxy carries its own error, and the model cannot be more accurate than the proxy allows. LeCun et al. (2015) described how representation learning extracts structure from data, but it cannot recover information that the label does not carry.

Measurement error and batch effects in the labels set a ceiling on performance that should be estimated. If two replicate measurements of the same quantity disagree by a certain amount, no model predicting one of them can be expected to agree with the other more closely than that. Ioannidis (2005) described how the failure to account for measurement error produces claims of accuracy that cannot be achieved, and the ceiling should be stated before the model is evaluated.

The class balance affects the choice of metric. A dataset in which positives are rare will give high accuracy to a model that predicts negative for everything, and a metric such as precision or recall, or a measure that accounts for chance, is needed. Cumming (2014) argues that the metric should be reported with its interval, since performance on a rare class is estimated from few examples and is uncertain.

Labels must not encode the answer through the features. A feature that is derived from the outcome, or a feature that is measured after the event the model is meant to predict, gives the model access to information it would not have in practice. Munafò et al. (2017) argued that the origin of each label and each feature should be documented, so that such leakage can be detected and removed.
