---
title: "Reporting Whole-Cell Models"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The reporting of a whole-cell model so that its knowledge base, its submodels, its integration, its validation and its gaps can be evaluated and reproduced, covering the deposition of the knowledge base with the source and evidence of each entry, the description of each submodel with its representation and parameters with intervals, the integration scheme and the convergence of the simulation with the time step, the validation against independent data with agreement statistics and their uncertainty, the reporting of failed predictions alongside successful ones, the sensitivity analysis and the parameters that dominate the predictions, the explicit list of gaps and of the predictions they make impossible, the code and version with identifiers, and the statement of the organism, the conditions and the scope within which the model is claimed to be valid."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Report a whole-cell model with its knowledge base, submodels, integration, validation, sensitivity and gaps so that it can be reproduced."
  - "State the organism, the conditions and the scope within which the model is claimed to be valid."
references:
  - "Karr, J. R., Sanghvi, J. C., Macklin, D. N., Gutschow, M. V., Jacobs, J. M., Bolival, B., Assad-Garcia, N., Glass, J. I., & Covert, M. W. (2012). A whole-cell computational model predicts phenotype from genotype. Cell, 150(2), 389-401. https://doi.org/10.1016/j.cell.2012.05.044"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

A whole-cell model is a large object, and its report must allow a reader to examine each of its parts. The knowledge base should be deposited with the source and the evidence of each entry, so that the origin of every prediction can be found. Munafò et al. (2017) argued that a model of this scale can be trusted only when its inputs are open to inspection, and the knowledge base is the first of those inputs.

Each submodel should be described with its representation and its parameters, each parameter given with its interval. The integration scheme and the convergence of the simulation with the time step must be reported, so that the numerical results can be distinguished from the artefacts of computation. Peng (2011) argued that the procedure that produces a result must be reproducible, and the integration is part of that procedure.

The validation should be reported against independent data, with agreement statistics and their uncertainty. Failed predictions must be reported alongside the successful ones, and the reader should be able to see the full performance of the model. Cumming (2014) argues that the uncertainty of each agreement should be stated, and a validation that reports only its successes overstates the model's accuracy.

The sensitivity analysis should identify the parameters that dominate the predictions, and the explicit list of gaps should state the predictions that they make impossible. Ioannidis (2005) described how a model that does not state its limits will be trusted beyond them, and the gaps are the statement of those limits.

The code and the version of the model should be deposited with identifiers, and the report should state the organism, the conditions and the scope within which the model is claimed to be valid. A model of one organism under particular conditions is not a model of the cell in general, and the claim must be limited accordingly.
