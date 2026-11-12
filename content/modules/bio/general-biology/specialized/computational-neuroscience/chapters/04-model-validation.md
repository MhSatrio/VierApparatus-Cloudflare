---
title: "Model Validation"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "The validation of a neural model against data that were not used to build or fit it, including the holdout of recorded data from the fitting, the prediction of new experimental conditions that the model was not fitted to, the comparison of the model with alternative models that explain the same data, the cross-validation of the model across animals and sessions, the test of a model's prediction by a targeted experiment, and the reasons that a model that describes the training data well may still fail to generalise."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Validate a neural model on data withheld from fitting and on a new experimental condition."
  - "Compare a model with an alternative model by a criterion that penalises complexity and explain why a good fit alone is insufficient."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

A model is validated when it predicts data that played no part in building or fitting it. A good fit to the data that produced the model is not evidence of its correctness, since a flexible model can fit almost any data. The validation must test the model against something new, and Ioannidis (2005) described why this distinction is essential: a result judged on the data that generated it overstates its accuracy.

The simplest validation holds back part of the recorded data during fitting and tests the model on it. The holdout must be chosen so that it is independent, for example by holding out whole animals or sessions rather than individual spikes from the same recording, since data from the same source are correlated and a holdout from the same source flatters the model.

A stronger validation predicts a new experimental condition that the model was not fitted to, such as a different stimulus or a manipulation of the circuit. The prediction can then be tested by a new experiment, and a correct prediction gives more support than a good fit. A model that fails such a test must be revised, and the revision should be recorded.

Alternative models should be compared with the same data, using a criterion that penalises the number of parameters, so that a model is not preferred merely for its flexibility. Peng (2011) argued that the comparison is reproducible only if the models and the criterion are fully specified. Cumming (2014) argues that the difference in fit between models should be reported with its interval, since a small difference may not be meaningful.
