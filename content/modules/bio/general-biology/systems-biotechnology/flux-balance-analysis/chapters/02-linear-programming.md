---
title: "Linear Programming"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The linear programme that flux balance analysis solves, with its linear objective, its equality constraints for the steady-state balance of each metabolite, and its inequality constraints for the bounds on each flux, the geometry of the feasible region as a convex polytope whose vertices correspond to extreme flux distributions, the reasons that the problem can be solved efficiently even for very large networks, the detection of infeasibility when the bounds cannot all be satisfied, and the numerical tolerances that can make an apparently optimal solution differ slightly from the true optimum."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Write a flux balance problem as a linear programme with equality and inequality constraints."
  - "Explain the geometry of the feasible region and why a linear programme can be solved efficiently for large networks."
references:
  - "Orth, J. D., Thiele, I., & Palsson, B. Ø. (2010). What is flux balance analysis? Nature Biotechnology, 28(3), 245-248. https://doi.org/10.1038/nbt.1614"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Flux balance analysis is a linear programme. The objective is a weighted sum of fluxes, the steady-state balance of each metabolite is a set of linear equations, and the bounds on each flux are linear inequalities. The feasible region is therefore a convex polytope in the space of fluxes, and the optimum lies at a vertex or on a face of it. Orth et al. (2010) explained that this structure is what makes the method tractable for genome-scale networks with thousands of reactions.

The steady-state constraints are the equality constraints, one for each internal metabolite, which state that its production and consumption balance. The bounds are the inequality constraints, which set each flux between a lower and an upper limit. Irreversible reactions have a lower bound of zero, reversible ones may be negative, and exchange reactions bound the uptake and secretion of nutrients and products. The combination of these constraints defines what the network can do.

A linear programme can be solved efficiently by well-established algorithms, and this efficiency is the reason for the method's popularity. The solution is a flux vector that maximises the objective, and it can be found in a time that grows gently with the size of the network. Cumming (2014) argues that the results of an optimisation should be reported with the precision of the solver, since numerical tolerances mean that a solution may differ slightly from the true optimum.

When the bounds cannot all be satisfied, the programme is infeasible, and this signals an error in the reconstruction or the medium rather than a biological result. An infeasible model should be diagnosed before it is used, and the diagnosis should be recorded. Sandve et al. (2013) recommended recording the solver, its version and its tolerances, so that a solution can be reproduced and an infeasibility can be traced to its cause.
