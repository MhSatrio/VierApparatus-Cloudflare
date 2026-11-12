---
title: "Parameter Estimation Across Scales"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The estimation of the parameters of a multiscale simulation from data at each scale, covering the use of data at the fine scale to estimate the parameters of the fine model and of data at the coarse scale to estimate the parameters that the coupling passes upward, the danger of fitting all parameters to the coarse data alone so that the fine model is not constrained, the hierarchical estimation in which the levels are estimated in sequence or jointly with their uncertainty, the identifiability of parameters across scales and the correlations introduced by coupling, the use of approximate Bayesian methods when the likelihood of the multiscale model is intractable, and the reporting of the data at each scale, the estimation method and the intervals of the parameters."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Estimate the parameters of a multiscale model from data at each scale and state why fitting all parameters to coarse data alone is inadequate."
  - "Report the parameters with intervals and state the correlations that the coupling introduces among them."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

A multiscale model has parameters at every scale, and each should be estimated from data at the scale to which it belongs. The fine-scale parameters are best constrained by fine-scale measurements, and the parameters passed upward by the coupling are best constrained by data at the coarse scale. Fitting every parameter to the coarse data alone is tempting, because the coarse data are often the most available, but it leaves the fine model unconstrained and can produce a coarse fit that is achieved for the wrong reasons. Ioannidis (2005) described how a model fitted to a single summary can match it while being wrong in its components.

Hierarchical estimation proceeds through the levels in sequence or jointly, with the uncertainty carried from one level to the next. Joint estimation captures the correlations between levels but is more demanding, and sequential estimation is simpler but may underestimate the total uncertainty. The choice must be stated and its consequences examined. Cumming (2014) argues that the interval of each parameter should be reported, and the intervals should reflect the uncertainty that the hierarchy introduces.

Parameters across scales may be unidentifiable individually, and the coupling introduces correlations among them, so that a combination is determined while its components are not. The correlations should be reported, since a claim about one parameter may depend on another that is poorly known. Munafò et al. (2017) argued that such correlations are part of the result, and they should be shown rather than hidden in a point estimate.

When the likelihood of the multiscale model cannot be computed, approximate Bayesian methods compare simulated and observed data, and the tolerance of the approximation must be reported. Peng (2011) argued that the estimation procedure is part of the result and must be documented, so that the parameters can be reproduced. The data at each scale, the method used and the intervals of the estimated parameters should all accompany the model.
