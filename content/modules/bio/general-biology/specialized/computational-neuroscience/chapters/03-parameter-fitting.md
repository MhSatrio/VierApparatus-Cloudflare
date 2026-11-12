---
title: "Parameter Fitting"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "The fitting of the parameters of a neural model to recorded data, including the objective function that measures the discrepancy between the model and the data, the optimisation algorithms and the risk of local minima, the identifiability of parameters that the data cannot determine, the overfitting of models with many parameters to noise in the recording, the regularisation and the choice of priors that constrain the fit, and the estimation of parameter uncertainty by profile likelihood or resampling."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Define an objective function for fitting a neural model to recorded data and state how it weights the data."
  - "Explain why an unidentifiable parameter cannot be estimated and state how its uncertainty is shown."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Hodgkin, A. L., & Huxley, A. F. (1952). A quantitative description of membrane current and its application to conduction and excitation in nerve. The Journal of Physiology, 117(4), 500-544. https://doi.org/10.1113/jphysiol.1952.sp004764"
---

A neural model has parameters, such as the conductances of its channels or the strengths of its connections, that must be estimated from recorded data. Hodgkin and Huxley (1952) estimated the parameters of their model from voltage clamp measurements, and the same principle is applied to models of many kinds. The fitting adjusts the parameters so that the model reproduces the recorded behaviour as closely as possible, and the quality of the fit depends on the objective function that defines closeness.

The objective is often a sum of squared differences between the simulated and recorded values, weighted by the precision of the measurements. The choice of weights matters, since a fit that ignores the noise in the data will give too much weight to the noisiest points. The objective must be defined before the fit, and its form should be reported.

Optimisation finds the parameters that minimise the objective, and the landscape of the objective can have many local minima. A fit that starts from one point may settle in a poor minimum, and the search should be repeated from many starting points to find the best. The number of starts and the spread of the solutions should be reported, since they show whether the best fit is reliable.

A parameter that the data cannot determine is unidentifiable, and its estimate is an artefact of the fit. Models with many parameters are prone to this, and to the overfitting of noise. Ioannidis (2005) described how a model with enough freedom can fit any data, so its fit does not show that it is right, and the number of parameters should be justified by the data. Cumming (2014) argues that the uncertainty in each parameter should be shown with its interval, and profile likelihood or resampling can give these intervals.
