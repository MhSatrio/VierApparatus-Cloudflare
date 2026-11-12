---
title: "Pharmacokinetic and Pharmacodynamic Modelling"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "Pharmacokinetic and pharmacodynamic models that link the dose of a drug to its concentration in the body and to its effect, covering the compartmental models of absorption, distribution, elimination and clearance, the estimation of their parameters from concentration time courses with the variability between individuals, the population models that describe the distribution of parameters across a population with mixed effects, the exposure-response relationship that connects concentration to effect and the threshold or saturation that shapes it, the propagation of parameter uncertainty into predicted dose and response, and the reporting of the model structure, the parameters with intervals and the population variability."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Fit a compartmental pharmacokinetic model to concentration data and report each parameter with its interval."
  - "Describe the variability between individuals with a population model and propagate it into a predicted dose response."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

Pharmacokinetic models describe what the body does to a drug, and pharmacodynamic models describe what the drug does to the body. A compartmental model represents the body as a set of compartments between which the drug moves, and the parameters of absorption, distribution, elimination and clearance are estimated from concentrations measured over time. The model structure is chosen to match the data, and a structure that is more complex than the data can support will produce unstable parameter estimates.

The parameters are estimated from concentration time courses, and each estimate must carry its interval. Individuals differ in their parameters, and a population model describes the distribution of each parameter across individuals with mixed effects, separating the typical value from the variability and the residual error. Cumming (2014) argues that the variability should be reported alongside the typical value, since a dose appropriate for the average individual may be inappropriate for many.

The exposure-response relationship connects the concentration of the drug to its effect, and it often shows a threshold below which there is no effect and a saturation above which further exposure adds little. The shape of this relationship determines the dose that is needed, and its estimation requires data across the range of concentrations of interest. Ioannidis (2005) described how a relationship estimated from a narrow range may not describe the behaviour outside it.

Parameter uncertainty propagates into the predicted dose and response, and the prediction should be reported as a distribution across the population rather than as a single value. The uncertainty of the typical value and the variability among individuals are different quantities, and both should be stated. Munafò et al. (2017) argued that the model structure, the parameters and the variability should be reported in full, so that the prediction can be reproduced and its basis judged.
