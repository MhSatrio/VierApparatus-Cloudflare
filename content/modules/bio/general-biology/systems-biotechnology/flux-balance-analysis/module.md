---
title: "Flux Balance Analysis"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "Flux balance analysis as the linear programming method that finds steady-state flux distributions in a metabolic network which maximise an objective such as biomass production, covering the objective functions and their biological justification, the linear programme that defines the feasible space, the flux variability analysis that gives the range of each flux among optimal solutions, the shadow prices that show the value of each nutrient or constraint, the in silico gene knockouts, the limits of the method in the absence of regulation and kinetics, and the reporting of a flux analysis with its medium and assumptions."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Formulate a flux balance problem from a stoichiometric matrix, bounds and an objective function."
  - "Interpret the range of a flux among optimal solutions and the shadow price of a constraint and state the limits of the method."
references:
  - "Orth, J. D., Thiele, I., & Palsson, B. Ø. (2010). What is flux balance analysis? Nature Biotechnology, 28(3), 245-248. https://doi.org/10.1038/nbt.1614"
  - "Schellenberger, J., Que, R., Fleming, R. M. T., Thiele, I., Orth, J. D., Feist, A. M., Zielinski, D. C., Bordbar, A., Lewis, N. E., Rahmanian, S., Kang, J., Hyduke, D. R., & Palsson, B. Ø. (2011). Quantitative prediction of cellular metabolism with constraint-based models: the COBRA Toolbox v2.0. Nature Protocols, 6(9), 1290-1307. https://doi.org/10.1038/nprot.2011.308"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Flux balance analysis predicts how a metabolic network distributes its material flow when it is at steady state and pursues an objective. The method uses a stoichiometric matrix and bounds on the fluxes to define the set of feasible flux distributions, and it selects from this set the distribution that maximises an objective such as the production of biomass. Orth et al. (2010) described the method as a way of predicting metabolic behaviour without the kinetic parameters that most models require, and it has become the standard approach for genome-scale models.

The method is an optimisation, which is solved as a linear programme. The objective is a linear combination of fluxes, the constraints are the steady-state balance and the bounds, and the solution is found efficiently even for networks with thousands of reactions. Schellenberger et al. (2011) implemented this approach in a software toolbox, and the chapters that follow describe the outputs of the optimisation and their interpretation.

An optimal solution is rarely unique, and many flux distributions can achieve the same objective value. The range of each flux among the optimal solutions, which is found by flux variability analysis, shows which fluxes are determined by the objective and which are free. Cumming (2014) argues that such ranges should be reported with the objective value, since the range is the honest description of what the model predicts.

Flux balance analysis is a powerful tool with clear limits. It assumes steady state, a single objective and the absence of regulation, and its predictions depend on the reconstruction and the medium. Ioannidis (2005) described how a method that can always produce an answer may produce answers that do not reflect the system, and the assumptions of each analysis should be stated. Peng (2011) argued that the means of producing a result must be available, and Sandve et al. (2013) recommended recording the objective, the bounds and the medium with every analysis.
