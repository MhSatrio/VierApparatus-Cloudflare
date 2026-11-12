---
title: "Submodels and Parameterisation"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The construction of the submodels of a whole-cell model and their parameterisation from measurements, covering the choice of representation for each process, whether as stochastic reactions, ordinary differential equations or flux balance constraints, the estimation of each parameter from its source with the conditions of the measurement, the use of independent datasets for parameterisation and for validation, the propagation of parameter uncertainty into each submodel's predictions, the handling of parameters with no measurement by assumption or by borrowing from related systems with the uncertainty that this adds, and the reporting of the representation, the parameters and their intervals for each submodel."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Choose a representation for a biological process and state the trade-off between mechanistic detail and tractability."
  - "Parameterise a submodel from measurements and state how the uncertainty of each parameter propagates into its predictions."
references:
  - "Karr, J. R., Sanghvi, J. C., Macklin, D. N., Gutschow, M. V., Jacobs, J. M., Bolival, B., Assad-Garcia, N., Glass, J. I., & Covert, M. W. (2012). A whole-cell computational model predicts phenotype from genotype. Cell, 150(2), 389-401. https://doi.org/10.1016/j.cell.2012.05.044"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

Each process in the cell is represented by a submodel, and the choice of representation depends on the process and the data. Metabolism is often represented by flux balance constraints that require the production and consumption of each metabolite to balance, while transcription and translation may be represented as stochastic reactions whose rates depend on the abundance of molecules. Karr et al. (2012) combined such representations, and the choice of each determines both the realism of the submodel and the cost of simulating it.

Each parameter is estimated from its source, and the conditions under which the measurement was made must match those of the model. A parameter taken from a different organism, a different growth rate or a different medium carries an additional uncertainty that the model must represent. Cumming (2014) argues that the interval of each parameter should be reported, and a parameter borrowed from another system should carry a wider interval than one measured in the target.

Parameterisation and validation must use separate data. A model whose parameters were tuned to reproduce a phenotype cannot be validated against that phenotype, since it was built to fit it. Ioannidis (2005) described how a model that is judged by the data used in its construction will appear to succeed, and the separation of datasets is the basic safeguard.

The uncertainty of each parameter propagates into the predictions of its submodel, and the propagated uncertainty into the whole model may be large. Where a parameter has no measurement, it must be assumed or borrowed, and the assumption adds uncertainty that should be represented. Peng (2011) argued that the parameters and their sources must be available for the model to be reproduced, and Munafò et al. (2017) argued that the representation and the parameters of each submodel should be reported, so that the model can be judged piece by piece.
