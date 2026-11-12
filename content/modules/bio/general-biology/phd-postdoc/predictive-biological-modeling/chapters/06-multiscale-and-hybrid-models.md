---
title: "Multiscale and Hybrid Models"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "Models that connect processes at different scales, from molecular events to cells, tissues and populations, covering the identification of the scales that matter for the question, the coupling of a detailed model at one scale to a coarser model at the next, the passing of parameters and averages between scales and the error introduced at each transfer, the hybrid models that combine continuous equations with discrete stochastic events, the testing of each scale against data at that scale before coupling, the propagation of uncertainty across the coupled model, and the reporting of the assumptions at each interface between scales."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Identify the scales that matter for a question and state the assumption made at each interface between them."
  - "Test each scale against data at that scale before coupling it and propagate the uncertainty through the coupled model."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

Biological systems operate at many scales at once, from the binding of molecules to the behaviour of tissues and populations. A multiscale model connects these scales, so that the detail of one level informs the behaviour of the next. Each transfer between scales involves an approximation, since the detailed model must be summarised before it can be used by the coarser one, and the approximation introduces error that must be controlled. Ioannidis (2005) described how a chain of approximations can produce results that are far from the truth while each step appears reasonable.

The scales that matter depend on the question, and including a scale that does not affect the answer adds complexity without value. The assumption made at each interface must be stated, since it determines what the coarser model can and cannot represent. Cumming (2014) argues that the error introduced at each interface should be quantified, so that the reader can see which part of the uncertainty comes from which approximation.

Each scale should be tested against data at that scale before the scales are coupled. A detailed model that does not describe its own level cannot be trusted to inform the level above it. Only when each component has been validated is the coupled model built, and the validation of the coupled model should be separate from that of its components.

Hybrid models combine continuous equations, which describe the average behaviour of a large population, with discrete stochastic events, which describe rare or individual occurrences. The hybrid representation is efficient, but its switching between regimes must be checked. Uncertainty must be propagated through the coupled model, so that the predictions carry the combined uncertainty of all their components. Munafò et al. (2017) argued that the assumptions at each interface should be reported, so that a reader can judge the model and reproduce it. Peng (2011) argued that the code that couples the scales must be available, since the coupling is part of the model.
