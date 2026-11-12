---
title: "Uncertainty Propagation Through Simulation Chains"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The propagation of uncertainty through a chain of simulations at different scales, covering the identification of each source of uncertainty at each scale including parameter, structural, numerical and approximation uncertainty, the propagation of parameter uncertainty by sampling the parameter distribution and running the chain for each sample, the separation of the contribution of each scale to the total uncertainty so that the largest source can be targeted, the handling of nonlinear dependence in which the output is not a simple sum of contributions, the calibration of the propagated predictive interval against observed outcomes at the coarse scale, and the reporting of the total uncertainty with its components and their relative contributions."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Propagate parameter uncertainty through a chain of simulations by sampling and report the total uncertainty with its components."
  - "Identify the scale that contributes most to the total uncertainty and state the measurement that would reduce it."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

A prediction from a multiscale simulation carries the uncertainty of every scale it depends on, and the total is not simply the sum of the parts. Each source must be identified: the parameters of each model, the structure of each representation, the numerical error of each solver and the approximation introduced by each coupling. Ioannidis (2005) described how an analysis that considers only one source of uncertainty can appear far more certain than it is, and a complete inventory is the first step.

Parameter uncertainty is propagated by sampling the parameter distribution and running the whole chain for each sample. The distribution of the outputs gives the predictive uncertainty, and its interval should be reported. Cumming (2014) argues that the interval must reflect the actual distribution of outputs, which may be skewed, and not be assumed to be symmetric about the mean.

The contribution of each scale to the total uncertainty can be separated, so that the largest source is identified. This is the most useful output for planning, since it indicates which measurement would most reduce the uncertainty of the prediction. A scale whose contribution is small need not be measured more precisely, and the analysis directs effort toward the largest source.

Nonlinear dependence means that the output is not a simple sum of the contributions of the scales. Interactions between scales can amplify or reduce the uncertainty, and a sensitivity analysis that varies several scales together reveals them. The decomposition into contributions should be reported with its method and its limits.

The propagated predictive interval should be calibrated against observed outcomes at the coarse scale, so that its stated coverage can be checked. A chain whose intervals are too narrow is overconfident, and the calibration reveals this. Munafò et al. (2017) argued that the total uncertainty and its components should be reported, so that readers can judge the prediction and see what would reduce it. Peng (2011) argued that the sampling procedure must be recorded for the propagation to be reproduced.
