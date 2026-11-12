---
title: "Reporting Predictive Models"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The reporting of a predictive model of a biological system so that it can be understood, reproduced, reused and tested, covering the statement of the purpose and the intended domain of the model, the full description of the equations or the algorithm and of the assumptions behind them, the parameter estimates with intervals and the method of estimation, the sensitivity and identifiability results, the validation by withheld data and by prospective prediction with the performance measures and their uncertainty, the calibration of the predictive intervals, the deposition of the code, the data and the random seeds with identifiers, and the explicit statement of the conditions outside which the model should not be used."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Report a predictive model with its equations, parameters, validation and calibration so that an independent group can reproduce and test it."
  - "State the domain of validity of a model and the conditions outside which its predictions should not be used."
references:
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

A predictive model is useful only to those who can understand it, reproduce it and judge its reliability. Its report must therefore state the purpose, the intended domain and the equations or algorithm, together with the assumptions behind them. Munafò et al. (2017) argued that a model described only in general terms cannot be tested, and the report must make every component explicit enough for another group to implement it.

The parameter estimates should be reported with their intervals and the method used to obtain them. The sensitivity and identifiability results show which parameters matter and which the data determine, and they should accompany the estimates. Cumming (2014) argues that an estimate without its interval invites a level of confidence that the data may not support, and each parameter should be reported in this way.

The validation should be reported with the data withheld, the prospective predictions and the performance measures, each with its uncertainty. The calibration of the predictive intervals should be given, so that the claimed coverage can be checked against the observations. Ioannidis (2005) described how models that are validated only on their training data overstate their accuracy, and the report should make clear which validation was performed.

The code, the data and the random seeds should be deposited with identifiers, so that the model can be run again and its results reproduced. Peng (2011) argued that the reproducibility of a computational result depends on the availability of its code and data, and a model report without them is incomplete.

Finally, the report must state the conditions outside which the model should not be used. A model fitted to one population, environment or range of conditions may fail when applied beyond them, and a responsible report says where its predictions are reliable and where they are not. This statement protects those who might otherwise apply the model in situations it was never tested to describe.
