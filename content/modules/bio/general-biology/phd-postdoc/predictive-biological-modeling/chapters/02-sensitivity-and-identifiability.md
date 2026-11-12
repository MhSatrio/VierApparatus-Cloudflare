---
title: "Sensitivity Analysis and Identifiability"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The analysis of how the predictions of a biological model depend on its parameters and whether the data can identify those parameters, covering the local sensitivity analysis that measures the change in an output for a small change in each parameter, the global sensitivity analysis that varies all parameters across their plausible ranges and attributes the variance of the output to each, the structural identifiability that asks whether the parameters can be determined in principle from the observations, the practical identifiability that asks whether they can be determined from the data actually available, the correlations among parameters that make some combinations determined and others not, and the reporting of the sensitivity indices and the identifiable parameters with their uncertainty."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Perform a global sensitivity analysis and state which parameters account for most of the variance in a prediction."
  - "Distinguish structural from practical identifiability and state how each is tested."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

A sensitivity analysis asks how the predictions of a model change when its parameters change. A local analysis varies one parameter at a time around a chosen point and measures the response. A global analysis varies all parameters across their plausible ranges together and attributes the variance of the prediction to each parameter. Global analysis is more informative when the parameters interact, which they often do in biological systems, and the choice of method should be justified.

Identifiability asks whether the parameters can be determined from the observations. Structural identifiability concerns the model itself: two parameters that always appear as a product cannot be separated however good the data. Practical identifiability concerns the data actually available: a parameter may be identifiable in principle but poorly determined by a small or noisy dataset. Ioannidis (2005) described how a model that appears to explain data may hide parameters that the data cannot determine, and the distinction exposes this problem.

Parameters are often correlated, so that some combinations are well determined while the individual parameters are not. The correlation should be reported, since a claim about one parameter alone may be misleading when its partner is uncertain. Cumming (2014) argues that the uncertainty of each parameter, and of the relations among them, should be reported with its interval.

The sensitivity indices and the identifiable parameters should be reported with their uncertainty. A parameter that dominates the prediction is a priority for measurement, and one that the data cannot identify must be reported as uncertain. Munafò et al. (2017) argued that the analysis should be reported in full, including the parameters that were found not to matter, so that the reader can see what the model depends on.
