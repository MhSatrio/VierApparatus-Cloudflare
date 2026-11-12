---
title: "Models and the Limits of Mathematics"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "The limits of mathematical description in biology, including the problems of overfitting, unidentifiable parameters, the sensitivity of predictions to unmeasured assumptions and the difference between a model that describes data and one that explains the mechanism, with the criteria for judging when a model is adequate for its purpose."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Distinguish a model that describes data from one that explains the mechanism generating them."
  - "State the criteria by which a model is judged adequate for a given purpose."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Anfinsen, C. B. (1973). Principles that govern the folding of protein chains. Science, 181(4096), 223-230. https://doi.org/10.1126/science.181.4096.223"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

A mathematical model can describe data without explaining them. A curve with enough parameters will pass through almost any set of points, and a good fit is therefore weak evidence that the model is right. Ioannidis (2005) described how flexibility in modelling, like flexibility in analysis, allows many models to appear to fit, and the fit must be judged against the number of parameters and against predictions the model makes beyond the data used to build it.

A model that explains the mechanism makes claims about the components and their interactions that can be tested independently. Anfinsen (1973) showed that the folding of a protein is determined by its sequence and environment, and a model of folding that reproduces the observed kinetics may or may not describe the actual pathway. The mechanism is judged by experiments that manipulate its components, and a fitted curve alone does not show this.

Parameters that cannot be identified from the data give a false sense of precision. When different combinations of parameter values give the same predictions, the individual values are not determined, and reporting a single set as the answer misleads. Identifiability must be examined before the parameters are interpreted.

Predictions are sensitive to assumptions that the data do not test. A model may depend on a value that was assumed rather than measured, and changing that value may change the conclusion. A sensitivity analysis, which varies the unmeasured assumptions and records the effect on the prediction, shows which conclusions are robust and which depend on a guess.

Platt (1964) recommended the strategy of testing alternative models against one another with experiments designed to discriminate between them. Adequacy is judged by purpose: a model that predicts a response well enough to guide a decision may be adequate for that purpose while being inadequate as an explanation of the mechanism.

A model is a tool with a purpose, and its usefulness depends on whether its claims match the question it was built to answer.
