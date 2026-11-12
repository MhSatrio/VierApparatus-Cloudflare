---
title: "Model Choice and Parameter Estimation"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The choice of a model class for a biological system and the estimation of its parameters from data, covering the mechanistic models that represent the processes as equations with parameters that have biological meaning, the phenomenological models that describe the pattern without claiming the mechanism, the trade-off between model complexity and the information the data contain, the maximum likelihood and Bayesian approaches to parameter estimation, the propagation of parameter uncertainty into predictions through sampling or approximation, the priors that encode existing knowledge and whose influence is tested, and the reporting of the estimates with intervals."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Choose between a mechanistic and a phenomenological model according to the purpose of the model and the information in the data."
  - "Propagate parameter uncertainty into a prediction and report the predictive interval rather than a single value."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

A model of a biological system may be mechanistic, representing the processes as equations whose parameters have biological meaning, or phenomenological, describing the pattern in the data without asserting the mechanism. The choice depends on the purpose. A mechanistic model can be used to ask what would happen if a process were changed, but it requires more knowledge and may be poorly identified by the data. A phenomenological model can predict within the range of its data but says little about causes. Ioannidis (2005) described how a model that is chosen for its fit alone may be a poor guide to what lies beyond the data.

The complexity of the model must match the information in the data. A model with more parameters than the data can support will fit the noise, and the estimates will be unstable. Information criteria and cross-validation help to balance fit against complexity, and the criterion chosen should be stated. Cumming (2014) argues that the precision of each parameter should be reported with its interval, since a parameter that is poorly determined should not be presented as known.

Parameters can be estimated by maximum likelihood, which gives the most probable values under the model, or by Bayesian methods, which give a distribution of plausible values given the data and any prior knowledge. Each approach yields uncertainty, and the predictions must carry it forward. Propagating uncertainty through the model, by sampling from the parameter distribution or by approximation, yields a predictive interval rather than a single prediction.

Priors encode existing knowledge, and their influence on the result must be tested. A prior that is strongly informative can dominate the estimate when the data are few, and the sensitivity of the conclusion to the prior should be reported. Peng (2011) argued that the model, its equations and its estimation procedure should be stated, so that the estimates can be reproduced by others from the same data.
