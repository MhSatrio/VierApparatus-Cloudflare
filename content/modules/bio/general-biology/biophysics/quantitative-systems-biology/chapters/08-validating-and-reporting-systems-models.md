---
title: "Validating and Reporting Systems Models"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "How a quantitative model of a biological system is validated against data it was not fitted to, the difference between calibration and validation, the risks of overfitting and of flexible model choice, and the information that a report of a systems model must include for others to reproduce and judge it."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Distinguish calibration of a model from its validation and explain why a model must be tested on data not used to fit it."
  - "List the information a report of a systems model must contain for another group to reproduce and assess it."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Kitano, H. (2002). Systems Biology: A Brief Overview. Science, 295(5560), 1662-1664. https://doi.org/10.1126/science.1069492"
---

A model is calibrated when its parameters are adjusted to reproduce a set of data, and it is validated when its predictions are compared with data that were not used in the calibration. A model that is only calibrated has shown that it can be made to fit, and nothing more. Kitano (2002) stressed that the purpose of a systems model is to predict the behaviour of a system under conditions that have not been studied, and validation on new data is the test of that purpose.

Overfitting is a particular danger. A model with many parameters and flexible structure can reproduce almost any dataset, so a good fit to the calibration data carries little weight unless the model has also been tested on independent data. Ioannidis (2005) described how flexibility in the analysis of data, together with small samples and selective reporting, can make a published result more likely to be false than true, and the same forces operate in the choice of model structure. Where many structures are tried and the best one reported, the reported model has been selected by the data it was fitted to.

Platt (1964) recommended that scientists devise alternative hypotheses and tests that exclude them. For a systems model, this means comparing the model with competing structures and with the simplest model that fits the data, and designing experiments on which the models disagree.

A report must therefore state the model, its equations and parameter values, the data used for calibration and for validation, the criteria for agreement and the alternative models that were considered. It must also give the software and the version used for the simulations, so that another group can reproduce the results.

With such a report, a systems model becomes a claim that others can check, and its predictions can be used with an honest measure of how far they can be trusted.
