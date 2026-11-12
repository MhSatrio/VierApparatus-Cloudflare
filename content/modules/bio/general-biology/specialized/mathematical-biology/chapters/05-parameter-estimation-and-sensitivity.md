---
title: "Parameter Estimation and Sensitivity"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "The estimation of the parameters of a biological model from data and the analysis of how sensitive the model's predictions are to each parameter, covering the least-squares and likelihood methods used to fit parameters, the identifiability of parameters that the data cannot separate, the local sensitivity analysis that measures the change in an output for a small change in a parameter, the global sensitivity analysis that explores the parameter space as a whole, the uncertainty propagation from parameters to predictions, and the reporting of parameter values with their uncertainties and the sensitivity of the conclusions to them."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Estimate a model parameter from data with an interval and state the assumptions behind the estimate."
  - "Distinguish local from global sensitivity analysis and state when each is needed."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A model is only as useful as its parameters are known, and parameters are usually estimated from data that are noisy and incomplete. Estimation minimises the discrepancy between the model and the data, using least squares or a likelihood function, and the estimate is accompanied by an uncertainty that reflects the data. A parameter that the data cannot determine is unidentifiable, and the model may then give predictions that depend on an arbitrary choice.

Local sensitivity analysis measures how much an output changes when a parameter is changed slightly around its estimated value. It is computed from the derivatives of the output with respect to the parameters, and it identifies the parameters to which the conclusions are most sensitive. The analysis is valid only near the point at which it is computed, and a large change in a parameter may produce a very different response.

Global sensitivity analysis explores the whole space of plausible parameter values and records how the outputs vary across it. It is more demanding, since it requires many model runs, but it reveals interactions between parameters and the behaviour far from the estimates. The ranges of the parameters must be justified, since a conclusion that holds only for a narrow range may be fragile.

The uncertainty of the parameters propagates to the predictions, and the predictions should be reported with intervals that reflect this propagation. Cumming (2014) argues that the intervals should be reported with the predictions, not only with the parameters. Ioannidis (2005) described how a conclusion that depends on a narrow choice of parameters may not hold more widely, and Sandve et al. (2013) recommended recording the parameter ranges, the estimation method and the sensitivity analysis performed.
