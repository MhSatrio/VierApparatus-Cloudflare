---
title: "Spatial Reaction-Diffusion Simulation"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The simulation of biochemical reactions that occur in space with diffusion of the molecules involved, covering the partial differential equations that describe reaction and diffusion, the numerical discretisation on a grid or mesh and its stability conditions, the stochastic spatial simulation of molecules moving and reacting on a lattice when their numbers are small, the boundary conditions imposed by cell membranes and tissue borders, the spatial patterns such as gradients and waves that the model can generate and the sensitivity of those patterns to the diffusion coefficients and the reaction rates, the check of the numerical solution against an analytical solution in a simple case, and the reporting of the discretisation, the boundary conditions and the convergence with grid size."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Discretise a reaction-diffusion problem and verify the numerical solution against an analytical solution in a simple case."
  - "State how the spatial pattern of a model depends on the diffusion coefficients and the reaction rates and test that sensitivity."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

Many biochemical processes depend on where molecules are as well as on how much of them there are. Reaction-diffusion models describe the change in concentration at each point as the sum of diffusion from neighbouring points and the local production or consumption by reaction. The equations are solved numerically on a grid or mesh, and the solution is a spatial pattern whose features depend on the parameters. Ioannidis (2005) described how a pattern that appears in a model may be an artefact of the numerical method, and the verification must come first.

The discretisation must satisfy stability conditions, since a grid that is too coarse or a time step that is too large can produce oscillations that do not exist in the continuous system. The verification of the numerical solution against an analytical solution in a simple case establishes that the method is correct before it is applied to the complex case. Cumming (2014) argues that the error of the numerical solution should be quantified and reported with its interval, since it depends on the resolution.

When the numbers of molecules are small, a deterministic solution is inadequate, and a stochastic spatial simulation moves and reacts individual molecules on a lattice. Such simulations are costly, and their results must be averaged over many runs to give probabilities and means with intervals. Peng (2011) argued that the seeds and the algorithm must be recorded, so that the stochastic results can be reproduced.

Boundary conditions represent the membranes and tissue borders that confine the reaction, and the choice of boundary condition can change the pattern that forms. The effect of the boundary should be tested, since a pattern that depends on an arbitrary boundary is not a property of the biology. The sensitivity of the pattern to the diffusion coefficients and the reaction rates must be reported, since a pattern that forms only within a narrow range of parameters is fragile. Munafò et al. (2017) argued that the discretisation, the boundary conditions and the convergence with grid size should all be reported.
