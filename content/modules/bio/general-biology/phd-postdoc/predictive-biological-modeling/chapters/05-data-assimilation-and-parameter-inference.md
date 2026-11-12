---
title: "Data Assimilation and Parameter Inference"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The inference of model parameters and states from time-course and noisy observational data, covering the state-space formulation that separates the dynamics of the system from the observation process, the filtering methods that update the estimate of the hidden state as data arrive, the likelihood-based estimation of parameters from the observations, the approximate Bayesian computation used when the likelihood is intractable, the assessment of the fit through residuals and posterior predictive checks, and the reporting of the posterior distribution of parameters and the predictive uncertainty of the states."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Separate the dynamics of a system from the observation process in a state-space model and state what each component represents."
  - "Check the fit of a fitted dynamical model with posterior predictive checks and report the posterior uncertainty of its parameters."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

Biological systems evolve over time, and the observations of them are noisy and incomplete. A state-space model separates the dynamics of the system, which describe how the hidden state changes, from the observation process, which describes how the state produces the measurements. This separation makes the uncertainty of each component explicit, and it allows the hidden state to be estimated from data that do not measure it directly. Ioannidis (2005) described how a model that absorbs noise into its dynamics can appear to fit while describing nothing real, and the separation guards against this.

Filtering methods update the estimate of the hidden state as each observation arrives, combining the prediction of the dynamics with the new data. The estimate at each time carries its own uncertainty, and that uncertainty must be reported. Cumming (2014) argues that the interval of each estimate should be shown over time, since the uncertainty of a state may change as data accumulate.

Parameters are estimated from the observations by a likelihood that depends on the model. When the likelihood cannot be computed, approximate Bayesian computation compares simulated data with the observations and retains the parameters that produce close matches. The approximation introduces a tolerance, and the sensitivity of the result to the tolerance must be shown. Peng (2011) argued that such approximations must be described, since they determine the answer.

The fit of the model is assessed by residuals and by posterior predictive checks, which compare data simulated from the fitted model with the observed data. A systematic pattern in the residuals or a mismatch in the simulated and observed distributions indicates that the model is missing something. Munafò et al. (2017) argued that the posterior distribution of the parameters and the predictive uncertainty should be reported in full, so that the conclusions can be judged against them.
