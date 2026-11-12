---
title: "Predictive Biological Modeling"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The construction, fitting and validation of predictive models of biological systems at doctoral and postdoctoral level, covering the choice of a model class suited to the question and the data, the estimation of parameters from data with their uncertainty, the distinction between a model that explains the data it was fitted to and one that predicts new data, the validation by withheld data and prospective testing, the sensitivity analysis that identifies which parameters the predictions depend on, the identifiability of parameters that the data cannot determine separately, the calibration of predictive intervals against observed outcomes, and the reporting of the model, the code, the data and the predictive performance."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Fit a predictive model, estimate its parameters with intervals and validate its predictions on data withheld from fitting."
  - "Distinguish a model that explains its training data from one that predicts new data and state the test that separates them."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

A predictive model of a biological system represents its behaviour in a form that can be used to forecast what will happen under conditions not yet observed. Its purpose determines how it should be built and tested. A model that explains the data it was fitted to may fail entirely on new data, and the difference between explanation and prediction is the central discipline of the field. Ioannidis (2005) described how models fitted to the data that generated them routinely overstate their accuracy, and the validation must be designed to test prediction.

The model class is chosen to suit the question and the data, and a more complex model is not necessarily more accurate. Parameters are estimated from the data, and each estimate must be reported with its interval, since the predictions depend on the parameters and their uncertainty propagates into them. Cumming (2014) argues that a prediction without its interval gives an impression of precision that the data do not support.

Validation tests the model on data withheld from fitting, and the strongest test is prospective, in which the model predicts outcomes before they are observed. A model that predicts withheld data well has demonstrated some generality, while one that performs only on its training data has not. Peng (2011) argued that the predictions of a model should be reproducible from its code and data, and the validation should be repeated by others where possible.

Sensitivity analysis identifies which parameters the predictions depend on, and identifiability analysis asks whether the data can determine each parameter separately. A parameter that the predictions do not depend on need not be estimated precisely, and one that the data cannot identify must be reported as uncertain. Munafò et al. (2017) argued that the code, the data and the predictive performance should be reported, so that the model can be reused and its claims tested.
