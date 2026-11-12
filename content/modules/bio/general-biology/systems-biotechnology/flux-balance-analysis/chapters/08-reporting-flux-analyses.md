---
title: "Reporting Flux Analyses"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "What a report of a flux balance analysis must contain for its predictions to be interpreted and reproduced, including the model and its version, the medium and the uptake and secretion bounds, the objective function and its justification, the solver and its tolerances, the optimal objective value with the flux variability ranges and the shadow prices, the in silico knockouts with their medium, the comparison with experimental data with intervals, and the deposition of the model, the constraints and the code."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "List the model, medium, objective, solver and bounds that a flux analysis report must give for the predictions to be reproduced."
  - "Report flux ranges, shadow prices and knockout predictions with the conditions under which each was computed."
references:
  - "Schellenberger, J., Que, R., Fleming, R. M. T., Thiele, I., Orth, J. D., Feist, A. M., Zielinski, D. C., Bordbar, A., Lewis, N. E., Rahmanian, S., Kang, J., Hyduke, D. R., & Palsson, B. Ø. (2011). Quantitative prediction of cellular metabolism with constraint-based models: the COBRA Toolbox v2.0. Nature Protocols, 6(9), 1290-1307. https://doi.org/10.1038/nprot.2011.308"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A flux balance result depends on many settings, and a report that gives only the predicted growth rate cannot be reproduced or judged. The model and its version should be given first, together with the medium and the uptake and secretion bounds, since these determine the feasible space. Peng (2011) argued that a computational result is reproducible only with the means of producing it, and for a flux analysis these means are the model, the constraints, the objective and the solver.

The objective and its justification should be stated. The biomass composition, if one is used, should be given, and the reason for choosing the objective should be explained, since the predictions follow from it. The solver, its version and its numerical tolerances should be recorded, because an optimum reported to many digits may vary between solvers in the last places, and the tolerance determines which solutions are counted as optimal. Schellenberger et al. (2011) described the software and its settings for this purpose.

The outputs should be reported with the conditions under which each was computed. The optimal objective, the flux ranges from variability analysis, the shadow prices and the reduced costs each depend on the bounds and the objective, and a value without these conditions is incomplete. Cumming (2014) argues that the ranges and the predictions should be reported with their precision, and the in silico knockouts should be listed with the medium in which they were simulated.

The comparison with experiment should be reported with its data and its agreement. Ioannidis (2005) described how a comparison chosen after the results are known can seem to confirm a model, and the comparison should be specified before it is made. The model, the constraints, the objective and the code should be deposited, and Sandve et al. (2013) recommended keeping these inputs, steps and outputs together so that a flux analysis can be repeated.
