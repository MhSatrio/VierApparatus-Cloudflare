---
title: "Evaluation Metrics and Baselines"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The evaluation of molecular machine learning models with metrics that match the biological decision and with baselines that set the standard a model must exceed, covering the choice of metrics such as area under the curve, precision, recall, root mean squared error and rank correlation according to the decision the prediction supports, the reporting of performance on the subsets of examples that matter most, the calibration of predicted probabilities, the simple baselines such as nearest neighbour, sequence identity or the mean of the training set that a complex model must surpass, the variation of performance across splits and seeds with intervals, and the statistical comparison of models that accounts for the paired nature of their evaluation on the same examples."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Choose evaluation metrics that match the biological decision and report them with intervals across splits and seeds."
  - "Compare a model with simple baselines and with a paired statistical test on the same examples."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

The choice of metric determines what a model is judged to do well, and a metric that does not match the biological decision can reward a model that is useless for it. A classifier that is used to select candidates for experiments should be judged by the precision among its top ranked predictions, not by its overall accuracy. A regression that predicts a quantity should be judged by an error that is meaningful on the scale of the quantity. Ioannidis (2005) described how a favourable metric can conceal a poor model, and the metric should be fixed in advance of the evaluation.

Performance should be reported on the subsets of examples that matter most, since an average across all examples can hide failure on the important ones. A model that predicts the common class well and the rare class poorly may be of little use when the rare class is the target. The subsets should be defined before the evaluation, and their size should be reported, since the uncertainty of a performance estimate grows as the subset shrinks. Cumming (2014) argues that each performance estimate should be given with its interval.

Calibration of predicted probabilities matters when the probabilities are used to make decisions. A model that outputs a probability of 0.9 should be right about nine times in ten when it says so, and a calibration plot or measure reveals whether this holds. Munafò et al. (2017) argued that the calibration should be reported alongside the discrimination, since the two answer different questions about the model.

Every complex model must be compared with simple baselines, such as the nearest neighbour in sequence space, the sequence identity to the closest training example or the mean of the training data. A model that does not exceed a baseline adds little, however sophisticated it is. The baseline should be implemented with the same care as the model, and its performance reported with the same intervals.

Models should be compared statistically on the same examples, using a paired test that accounts for the fact that both models are evaluated on the same items. An unpaired comparison of two performance figures ignores this structure and can mislead. The variation across splits and random seeds should be reported, so that differences smaller than the variation are not interpreted as improvements.
