---
title: "Reporting Dynamic Models"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "What a report of a dynamic model must contain for its equations, parameters and simulations to be reproduced and tested, including the biological scope and the assumptions, the equations and the rate laws in a standard machine-readable form, the parameters with their values, units, sources and uncertainties, the initial conditions, the data used for fitting and for validation, the solver and its tolerances, the random seeds and the number of runs for stochastic models, and the deposition of the model with its code."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "List the equations, parameters, initial conditions and solver details that a dynamic model report must give."
  - "Report a model's fit and validation separately, with the uncertainty of its parameters and the data used for each."
references:
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Kitano, H. (2002). Systems Biology: A Brief Overview. Science, 295(5560), 1662-1664. https://doi.org/10.1126/science.1069492"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A dynamic model is a set of claims about how a system behaves, and its report must allow these claims to be reproduced and tested. Peng (2011) argued that a computational result must be accompanied by the means of reproducing it, and for a dynamic model these means are the equations, the parameters, the initial conditions and the solver. Kitano (2002) emphasised that such models are meant to be shared and combined, and a report that cannot be rerun limits their use.

The equations and the rate laws should be given in a standard, machine-readable form, together with the units of each variable and parameter. The scope of the model, the organism and the conditions it describes, and its assumptions, such as mass action or quasi-steady state, should be stated. The initial conditions are part of the model and must be given, since a trajectory depends on them.

The parameters should be listed with their values, units, sources and uncertainties, and each value should be traced to its origin, whether a literature measurement or an estimate from the data. The data used to fit the model and the data used to validate it should be reported separately. Ioannidis (2005) described how a model judged on the data that produced it overstates its accuracy, and Cumming (2014) argues that the agreement should be reported with its intervals.

The solver, its tolerances and its version should be recorded, together with the random seeds and the number of runs for a stochastic model. The model, the code and the data should be deposited together. Sandve et al. (2013) recommended keeping the inputs, steps and outputs of an analysis together, so that the model's simulations can be regenerated and its claims tested by others.
