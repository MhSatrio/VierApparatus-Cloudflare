---
title: "Reporting Evolutionary Models"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The reporting of evolutionary models and their inferences so that the assumptions, the methods, the calibration and the uncertainty can be evaluated and reproduced, covering the statement of the model and its assumptions about population size, structure, selection and sampling, the description of the data and their provenance, the inference method with its approximations and their tested accuracy, the estimates with intervals and the null model against which selection or demographic claims were tested, the simulation-based calibration of the method and its coverage, the model fit and the checks against alternatives, the deposition of the sequences, the code and the seeds with identifiers, and the explicit statement of the assumptions whose violation would change the conclusion."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Report an evolutionary inference with its assumptions, the calibration of its method and the null model used for each claim."
  - "State the assumptions whose violation would change the conclusion and the evidence that tests them."
references:
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

An evolutionary inference is a conclusion about a history that cannot be observed directly, and its report must make the assumptions that support it visible. The model must be stated with its assumptions about population size, structure, selection and sampling, and the data must be described with their provenance. Munafò et al. (2017) argued that a conclusion about the past depends on the reasoning that connects the data to it, and that reasoning must be open to examination.

The inference method must be described with its approximations and the evidence for their accuracy. A method whose approximations have been tested by simulation is more credible than one whose accuracy is assumed, and the calibration results should be reported. Peng (2011) argued that the procedure must be reproducible, and the approximations are part of the procedure that the reader needs to repeat.

Each estimate should be reported with its interval, and each claim of selection or of demographic change should be accompanied by the null model against which it was tested. Cumming (2014) argues that the uncertainty of an estimate must be visible to the reader, and a claim of selection without its null model is not interpretable. The fit of the model and the checks against alternatives should also be reported, since a model that fits well may still be wrong.

Ioannidis (2005) described how claims that rest on an unstated assumption are fragile when the assumption fails, and the report should state the assumptions whose violation would change the conclusion. It should also state the evidence that tests each such assumption, so that the reader knows which conclusions are secure and which depend on untested premises.

The sequences, the code and the random seeds should be deposited with identifiers, so that the inference can be reproduced and extended by others. An evolutionary conclusion that cannot be checked from its deposited materials is a conclusion that must be taken on trust, and the report should make trust unnecessary.
