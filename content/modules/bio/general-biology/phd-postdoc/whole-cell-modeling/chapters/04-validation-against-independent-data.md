---
title: "Validation Against Independent Data"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The validation of whole-cell model predictions against data that were not used to construct or parameterise the model, covering the prediction of growth rate across media and genetic perturbations and its comparison with measured growth with intervals, the prediction of gene expression changes after a perturbation and their comparison with transcriptomic data, the prediction of essential genes by in silico knockouts and their comparison with experimental knockout screens, the calculation of agreement statistics with their uncertainty, the identification of predictions that fail and the investigation of their cause, and the distinction between a model that reproduces known phenotypes and one that predicts new ones."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Validate a whole-cell prediction against an experiment that was not used in building the model and report the agreement with its interval."
  - "Distinguish reproduction of known phenotypes from prediction of new ones and state why only the second strengthens the model."
references:
  - "Karr, J. R., Sanghvi, J. C., Macklin, D. N., Gutschow, M. V., Jacobs, J. M., Bolival, B., Assad-Garcia, N., Glass, J. I., & Covert, M. W. (2012). A whole-cell computational model predicts phenotype from genotype. Cell, 150(2), 389-401. https://doi.org/10.1016/j.cell.2012.05.044"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

Validation is the test that distinguishes a model from a description. A model that reproduces the phenotypes it was built to match has shown only that its parameters were adjusted correctly, while one that predicts a phenotype that was not used in its construction has shown that it captures something real. Karr et al. (2012) predicted phenotypes that were then compared with experiments, and this comparison is what gives the model its credibility. Ioannidis (2005) described how a model that is validated only against the data it was built from is not validated at all.

Growth rate across media and genetic perturbations is a basic prediction, and it can be compared with measured growth with intervals. The agreement is estimated across conditions, and the conditions in which the model fails are as important as those in which it succeeds. Cumming (2014) argues that the difference between predicted and measured growth should be reported with its interval, since a difference that is small relative to the measurement error is not a failure.

Predicted changes in gene expression after a perturbation can be compared with transcriptomic data, and the comparison should be made on the genes whose expression the model represents. The agreement should be quantified, and genes that the model fails to predict should be listed. In silico knockouts predict which genes are essential, and these predictions can be checked against experimental knockout screens. The agreement statistics should be reported with their uncertainty.

Predictions that fail should be investigated, and the cause identified where possible. A failure may point to a missing process, a wrong parameter or a mistake in the knowledge base, and each reveals something about the model. Munafò et al. (2017) argued that failed predictions should be reported with the successful ones, so that the validation reflects the true performance of the model.
