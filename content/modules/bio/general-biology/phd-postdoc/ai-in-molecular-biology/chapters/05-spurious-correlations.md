---
title: "Spurious Correlations and Shortcut Learning"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The detection of spurious correlations and shortcut learning in molecular machine learning, covering the cases in which a model learns an artefact of the data such as the batch, the plate position, the sequencing centre or the length of a sequence rather than the biology, the construction of control datasets in which the artefact is decorrelated from the label to test whether the model still succeeds, the use of counterfactual examples that alter only the biological feature of interest, the stratified evaluation within groups defined by the artefact, the recognition that a model can achieve high performance by exploiting the composition of the training set, and the reporting of the controls that exclude shortcut solutions."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Identify a shortcut that a model could exploit and construct a control dataset in which the shortcut no longer predicts the label."
  - "Evaluate a model within strata defined by a suspected artefact and report whether its performance depends on the artefact."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

A model learns whatever is most predictive in its training data, and this is not always the biology. Batch, plate position, sequencing centre or the length of a sequence can each be correlated with the label by accident of how the data were collected. A model that exploits such a correlation will perform well on the training data and poorly on data collected differently, and its apparent success is a shortcut rather than an understanding. Ioannidis (2005) described how spurious associations can produce findings that appear robust, and shortcut learning is the machine learning form of that error.

A control dataset is constructed in which the artefact is decorrelated from the label, so that the shortcut no longer predicts the outcome. If the model's performance falls substantially on the control, it was relying on the shortcut. The control must be designed with care, since removing the correlation may also remove the biology. Cumming (2014) argues that the performance on each dataset should be reported with its interval, so that the drop can be judged against the uncertainty.

Counterfactual examples alter only the biological feature of interest and leave the rest of the example unchanged. A model that responds to the counterfactual in the expected way has learned the feature, while one that does not has learned something else. Peng (2011) argued that the procedure for constructing such examples must be described so that the test can be repeated by others.

Stratified evaluation groups the examples by the suspected artefact and evaluates the model within each group. If performance is similar across groups, the artefact is unlikely to be driving the prediction. If it differs, the model's success depends on the artefact, and this must be reported. Munafò et al. (2017) argued that the strata should be defined before the evaluation, so that the test cannot be chosen to show the result that is wanted.

A model can achieve high performance by exploiting the composition of its training set, and the composition may be specific to a laboratory or a period. The controls that exclude shortcut solutions should be reported in full, including those that failed, since a control that reveals a shortcut is itself an important result.
