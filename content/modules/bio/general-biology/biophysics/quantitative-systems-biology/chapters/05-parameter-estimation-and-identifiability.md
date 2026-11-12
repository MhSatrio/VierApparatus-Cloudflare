---
title: "Parameter Estimation and Identifiability"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "How the unknown rate constants and concentrations of a biological model are estimated by fitting the model to measured data, the least-squares objective, the difference between structural and practical identifiability and the way poorly constrained parameters limit what a model can predict."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how model parameters are estimated by fitting a model to data and what the objective function measures."
  - "Explain the difference between structural and practical identifiability and why both matter for prediction."
references:
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Kitano, H. (2002). Systems Biology: A Brief Overview. Science, 295(5560), 1662-1664. https://doi.org/10.1126/science.1069492"
---

A mechanistic model contains parameters that are not known in advance, such as rate constants, binding affinities and initial concentrations. To use the model, these values are estimated by comparing the model's predictions with measured data. The usual approach defines an objective function, often the sum of squared differences between the predicted and measured values weighted by their uncertainties, and searches for the parameter values that minimise it. Kitano (2002) argued for quantitative models of this kind in systems biology.

Fitting is more difficult than the arithmetic suggests. The objective function may have many local minima, and the search may end in a poor one unless it is started from several points. The result depends on the data used, so a fit to a time course at one dose of a drug may not describe the response at another dose.

Identifiability asks whether the data can determine a parameter at all. A parameter is structurally non-identifiable if two different values give exactly the same predictions, for example when two rate constants appear only as a product in the equations. No amount of data can separate such parameters. A parameter is practically non-identifiable if the data are too few or too noisy to constrain it, even though the model would allow it to be found in principle.

Both kinds of non-identifiability limit prediction. A model whose parameters are poorly constrained may fit the training data well and still give very different predictions under new conditions. Platt (1964) argued that a scientific inference becomes strong when it rests on a test that can exclude the alternatives, and a parameter that cannot be pinned down means that the test has not yet been designed.

The remedy is to report confidence intervals or profiles for each parameter, to test whether they are identifiable from the planned experiments and, where needed, to design new measurements that constrain the poorly determined values.
