---
title: "Extending and Updating Models"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The extension of a whole-cell model with new knowledge and the updating of its predictions as the knowledge base changes, covering the modular architecture that allows a submodel to be replaced without rebuilding the whole, the version control of the knowledge base and the model so that each prediction can be traced to the version that produced it, the re-validation required after each change, the comparison of successive versions to see which predictions have changed and why, the community contribution of new submodels with their own validation, and the governance of a shared model in which changes are reviewed before they are adopted."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Replace a submodel in a modular whole-cell model and state the re-validation that the change requires."
  - "Compare two model versions and identify which predictions changed and the input that caused each change."
references:
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Karr, J. R., Sanghvi, J. C., Macklin, D. N., Gutschow, M. V., Jacobs, J. M., Bolival, B., Assad-Garcia, N., Glass, J. I., & Covert, M. W. (2012). A whole-cell computational model predicts phenotype from genotype. Cell, 150(2), 389-401. https://doi.org/10.1016/j.cell.2012.05.044"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

A whole-cell model is not finished. New genes are annotated, new parameters are measured and new processes are discovered, and the model must change to reflect them. A modular architecture, in which each submodel has defined inputs and outputs, allows one submodel to be replaced without rebuilding the rest. Karr et al. (2012) built their model in components of this kind, and the architecture is what makes continued development practical.

Version control of the knowledge base and of the model allows each prediction to be traced to the version that produced it. Without this traceability, a prediction published years earlier cannot be reproduced, and a change in the model may silently alter results that others have relied upon. Peng (2011) argued that the reproducibility of a computational result depends on the availability of its exact inputs and procedures, and the version record provides them.

Every change requires re-validation, since a new submodel or a new parameter can alter predictions that were previously validated. The validation of the earlier version does not transfer automatically to the later one. Ioannidis (2005) described how a model that is changed without re-testing can drift from its validated performance, and re-validation after each change is the safeguard.

Comparing successive versions shows which predictions have changed and the input responsible for each change. A change that alters a central prediction should be examined, and the reason for it should be recorded. Cumming (2014) argues that the change in each prediction should be reported with its interval, since a change that is within the uncertainty is not a real revision.

A shared model benefits from contributions by the community, and each contributed submodel should carry its own validation. The governance of such a model, in which changes are reviewed before they are adopted, protects its integrity. Munafò et al. (2017) argued that openness to contribution must be combined with the discipline of review, so that the model improves without losing the reliability on which it depends.
