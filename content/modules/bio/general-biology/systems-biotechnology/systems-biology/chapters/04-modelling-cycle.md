---
title: "The Modelling Cycle"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The iterative cycle of systems biology in which a model is built from known interactions, its predictions are tested by experiment, and the discrepancies lead to a revised model, the role of a model as a hypothesis that can be wrong, the choice of experiments that discriminate between competing models, the avoidance of overfitting a model to the data that built it, and the validation of the final model on independent measurements."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the cycle of building, testing and revising a systems model and the role of a discriminating experiment."
  - "Explain how overfitting makes a model appear to predict the data that built it and state how independent validation guards against this."
references:
  - "Kitano, H. (2002). Systems Biology: A Brief Overview. Science, 295(5560), 1662-1664. https://doi.org/10.1126/science.1069492"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

Systems biology advances through a cycle. A model is built from the known interactions of a system, its predictions are compared with new measurements, and the discrepancies show where the model is incomplete or wrong. The revised model makes new predictions, and the cycle repeats. Kitano (2002) described this iterative combination of experiment and model as the defining method of the field, and it is what distinguishes systems biology from a catalogue of components.

A model is a hypothesis, and it is useful only if it can be shown to be wrong. A model that is consistent with every observation may be consistent because it is flexible enough to fit anything, and a model that cannot be contradicted by any experiment teaches nothing. The most valuable experiments are those that discriminate between competing models, because they force a choice between the explanations that the data could otherwise not decide.

Overfitting is the principal danger in this cycle. A model with many free parameters can be tuned to fit the data that built it, and its fit then gives no evidence that it describes the system. Ioannidis (2005) described how repeated adjustment of a model until it fits produces findings that do not hold, and the same flaw appears in systems models. The parameters should be estimated from one set of data and the model tested on another.

Cumming (2014) argues that the agreement between a model and the data should be reported as an estimate with its uncertainty, rather than as a yes or no. Peng (2011) argued that a model must be reproducible, and the cycle is only as trustworthy as the record of each model, each experiment and each revision. The model and its version history should be kept together.
