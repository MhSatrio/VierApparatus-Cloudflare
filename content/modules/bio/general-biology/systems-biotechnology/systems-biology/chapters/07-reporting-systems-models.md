---
title: "Reporting Systems Models"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "What a report of a systems biology study must contain for its model to be judged, reused and tested, including the biological scope and the assumptions, the network or equations in a standard machine-readable form, the parameters with their sources and uncertainty, the data used to fit the model and the data used to validate it, the software and solver versions, the perturbations and their replicates, and the deposition of the model with its code and data."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "List the scope, structure, parameters and validation that a systems model report must give for the model to be reused."
  - "Distinguish the data used to fit a model from the data used to validate it and report both."
references:
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

A systems model is valuable only if other researchers can understand, rerun and test it. Its report must therefore state what the model describes, which organism, pathway and conditions it covers, and which assumptions it makes about the system. Peng (2011) argued that a computational result must be accompanied by the means of reproducing it, and for a systems model these means are the structure, the equations, the parameters and the code.

The structure should be given in a standard machine-readable form, so that the network or the equations can be loaded and simulated without retyping. The parameters should be listed with their values, units, sources and uncertainties, and each value taken from the literature should be traced to its source. A parameter that was estimated from data should state the data and the method used to estimate it, since a fitted value depends on both.

The data used to build the model and the data used to test it must be reported separately. Ioannidis (2005) described how a model fitted and tested on the same data appears to succeed when it has not been shown to predict anything new. The validation should compare predictions with measurements that were not used in fitting, and the agreement should be reported with its uncertainty. Cumming (2014) argues that the agreement should be given as an estimate with an interval, not as a judgement of fit.

The software, the solver and their versions should be recorded, since numerical methods can give different results across implementations. The perturbations simulated, their replicates and the conditions should be listed, and the model, the code and the data should be deposited together. Sandve et al. (2013) recommended keeping these elements together so that a model can be rerun by others.
