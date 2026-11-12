---
title: "Testing Stochastic Models"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "How stochastic models are tested against data, including the comparison of simulated and measured distributions, the use of likelihood to compare models with different numbers of parameters, the experiments that perturb a process in a predicted way and the reporting that allows another group to repeat the test."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Compare a stochastic model with measured distributions using likelihood and a penalty for complexity."
  - "Design a perturbation experiment whose outcome the model predicts and which could show the model to be wrong."
references:
  - "Gillespie, D. T. (1977). Exact stochastic simulation of coupled chemical reactions. The Journal of Physical Chemistry, 81(25), 2340-2361. https://doi.org/10.1021/j100540a008"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

A stochastic model makes predictions about distributions, not averages, and its test must compare distributions. The simulated distribution of molecule numbers or waiting times is set against the measured one, and the agreement is judged by a statistic that measures the discrepancy between them. A visual match between two histograms is not sufficient, because the eye is not a calibrated test, and the statistic must account for the size of the sample on which the measured distribution is based.

Likelihood provides a principled comparison between models. The likelihood of the data under each model is the probability of observing those data if the model were true, and the models are compared by their likelihoods. A model with more parameters always fits at least as well, so the comparison must penalise the extra parameters, as information criteria do. Ioannidis (2005) described how a flexible model can absorb the noise in a data set and appear to explain it, and the penalty is the safeguard against that error.

The strongest test is a perturbation experiment whose outcome the model predicts. If a model asserts that a particular step controls the noise, changing that step should change the noise in a predicted direction and by a predicted amount. A model that predicts the outcome of an experiment not used to build it has passed a test it could have failed. Platt (1964) recommended exactly this kind of discriminating experiment, and a stochastic model gains credibility only through such predictions.

The reporting of the test must allow it to be repeated. The data, the model structure, the fitted parameters, the simulation settings and the comparison statistic must be given, and the code must be available. Without these, another group cannot tell whether the model fits or whether the fit depended on choices made in the analysis.

The test of a stochastic model is whether it predicts the distribution of a new experiment, and a model that cannot be tested in this way explains the data without predicting anything.
