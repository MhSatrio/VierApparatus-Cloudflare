---
title: "Model Checking and Posterior Predictive Checks"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "How a Bayesian model is checked against the data it describes, through posterior predictive checks that simulate new data from the fitted model and compare them with the observed data, the choice of test quantities that expose the features the model might miss, the discrepancy between the simulated and observed quantities as evidence of misfit, the use of cross-validation and information criteria for comparing Bayesian models and the reasons a model that fits the data well is not thereby correct."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Simulate replicated data from a fitted Bayesian model and compare a test quantity with the observed value."
  - "Explain what a posterior predictive check can detect and what it cannot, and why a good fit does not establish that the model is correct."
references:
  - "Gelman, A., & Shalizi, C. R. (2013). Philosophy and the practice of Bayesian statistics. British Journal of Mathematical and Statistical Psychology, 66(1), 8-38. https://doi.org/10.1111/j.2044-8317.2011.02037.x"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A Bayesian model is checked by asking whether data generated from it look like the data observed. The posterior predictive check draws parameter values from the posterior, simulates a replicate dataset for each, and compares a chosen test quantity computed from the replicates with the same quantity computed from the observed data. Gelman and Shalizi (2013) describe this check as a central part of the practice of Bayesian modelling, since it asks whether the fitted model can reproduce the features of the data that matter.

The choice of test quantity determines what the check can see. A quantity such as the mean reveals a misfit in location, while the variance, the maximum or the proportion of zeros reveal misfit in spread or in the tail. A model that reproduces the mean but not the variance has the wrong distribution, and the check exposes this only if the variance is among the quantities examined. The test quantities must be chosen for the biology, and their choice must be reported.

A discrepancy between the replicated and the observed quantity is evidence of misfit. If the observed value lies in the extreme tail of the replicated distribution, the model is unlikely to have generated the data, and the model should be revised. The check does not say how to revise it, and the revision is a judgement that must be justified by the biology.

A model that passes the check is not thereby correct. The check can reveal only the features that were tested, and a model can reproduce the quantities examined while being wrong in others. Platt (1964) recommended tests that could show a hypothesis to be wrong, and a check that the model could fail is the informative kind. Ioannidis (2005) described how a result that fits the data used to find it may not hold on new data, and the check on new data is the stronger test.

Sandve et al. (2013) recommended recording the test quantities and the discrepancies, since they show which features of the data the model was judged to capture.
