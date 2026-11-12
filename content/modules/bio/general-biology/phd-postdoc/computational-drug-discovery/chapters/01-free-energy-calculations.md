---
title: "Free Energy Calculations and Sampling"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The estimation of binding free energies by molecular simulation and the sampling requirements that determine whether the estimate is reliable, covering the thermodynamic cycle that relates the binding of two ligands through alchemical transformations, the windows of intermediate states between which the free energy difference is integrated or accumulated, the overlap between neighbouring windows that determines whether the estimate is precise, the convergence of the estimate as simulation time increases and the test of its hysteresis, the force field and the water model whose choice shifts the affinity, the statistical error estimated from independent replicas, and the reporting of the protocol, the convergence, the overlap and the intervals of the free energy differences."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the alchemical path between two ligands and state why the overlap between neighbouring windows determines the precision of the estimate."
  - "Test the convergence of a free energy estimate by independent replicas and report its interval."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

A binding free energy is the difference in free energy between two states, such as a ligand bound to its target and the same ligand free in solution, and it determines the affinity. Because the states cannot be simulated directly with accuracy, the difference is computed along a path, often by transforming one ligand into another through a series of intermediate states. Each intermediate is simulated, and the free energy differences between neighbouring states are summed to give the total.

The precision of the estimate depends on the overlap between neighbouring windows, since two states that sample similar configurations give a reliable difference, while states that do not overlap give an unreliable one. The windows must be placed so that the overlap is adequate, and the overlap should be reported. Ioannidis (2005) described how an estimate that is precise in appearance may rest on a poor overlap, and the overlap is the test of that appearance.

Convergence is the test that the estimate no longer changes as the simulation is lengthened. The test should be made by repeating the calculation with independent replicas and by examining the hysteresis, the difference between the forward and backward transformations. A large hysteresis indicates that the calculation has not converged, and the estimate should not be reported as final. Cumming (2014) argues that the interval of the free energy difference should reflect the spread across the independent replicas.

The force field and the water model influence the computed affinity, and their choice can shift the result by amounts that matter for the ranking of candidates. The sensitivity of the result to these choices should be tested and reported. Peng (2011) argued that the protocol, including the force field, the windows and the simulation length, must be documented so that the calculation can be repeated, and Munafò et al. (2017) argued that the convergence and the intervals should be reported with the estimate.
