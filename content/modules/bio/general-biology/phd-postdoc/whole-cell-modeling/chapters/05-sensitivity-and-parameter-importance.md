---
title: "Sensitivity and Parameter Importance"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The analysis of how the behaviour of a whole-cell model depends on its parameters, covering the local sensitivity of growth, expression and division to each parameter, the global analysis that varies many parameters together to find those that dominate the variance, the identification of parameters whose uncertainty matters most for the predictions and that should therefore be measured more precisely, the detection of compensation among parameters that produce the same behaviour, the robustness of the predictions to plausible variation in the parameters, and the reporting of the sensitivity indices with their uncertainty."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Identify the parameters whose uncertainty dominates a whole-cell prediction and state which should be measured more precisely."
  - "Detect compensation among parameters and state why it limits the interpretation of a single parameter."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Karr, J. R., Sanghvi, J. C., Macklin, D. N., Gutschow, M. V., Jacobs, J. M., Bolival, B., Assad-Garcia, N., Glass, J. I., & Covert, M. W. (2012). A whole-cell computational model predicts phenotype from genotype. Cell, 150(2), 389-401. https://doi.org/10.1016/j.cell.2012.05.044"
---

A whole-cell model contains hundreds of parameters, and most of them influence the predictions only weakly. Sensitivity analysis identifies the few that dominate each behaviour, and this is the most useful information for directing experimental work. Karr et al. (2012) used such analysis to show which parts of the model were most constrained by the data, and the same logic tells an investigator which measurement would most reduce the uncertainty of a prediction.

Local sensitivity measures the response of an output to a small change in each parameter around a chosen point. It is informative near that point, but the cell's behaviour can be nonlinear, and a global analysis that varies many parameters across their plausible ranges gives a more complete picture. The variance of each output is attributed to the parameters, and the parameters that account for most of it are identified. Cumming (2014) argues that the sensitivity indices should be reported with their intervals, since the attribution depends on the ranges chosen.

Parameters that have large uncertainty and large influence on the prediction are the priorities for measurement. A parameter that is uncertain but has little effect on the output can be left alone, and the analysis guides the allocation of experimental effort. Ioannidis (2005) described how a model's apparent precision depends on the parameters that are poorly known, and the analysis reveals which of them matter.

Compensation occurs when different combinations of parameters produce the same behaviour, so that no single parameter is identifiable from the behaviour alone. The model may then predict the behaviour well while its parameters are wrong, and this limits the interpretation of any one parameter. The robustness of the predictions to plausible variation should be reported, so that the reader knows which conclusions survive the uncertainty. Munafò et al. (2017) argued that the analysis should be reported in full, including the parameters found to matter little.
