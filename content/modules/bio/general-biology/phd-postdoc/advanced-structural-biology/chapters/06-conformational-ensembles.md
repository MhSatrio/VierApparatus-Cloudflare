---
title: "Conformational Ensembles and Dynamics"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The representation of a protein as an ensemble of conformations rather than a single structure, covering the observation that many proteins sample several conformations that differ in function, the description of the ensemble by the populations and the structures of its members, the use of molecular dynamics simulation to generate candidate conformations and the force field that determines their energies, the experimental constraints that select among the simulated conformations, the distinction between the equilibrium populations and the rates of interconversion, the role of ligand binding in shifting the populations, and the reporting of the ensemble with its uncertainty and the sampling limits of the simulation."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe a protein as an ensemble of conformations with populations and state how a single structure can mislead about function."
  - "Explain how the sampling limits of a molecular dynamics simulation constrain the conclusions drawn about populations."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

A single structure is a snapshot of a molecule that may sample many conformations. Many proteins switch between conformations that differ in activity, and the function depends on the populations of these states rather than on any one of them. A description that gives only one structure can therefore mislead about how a protein works, and the ensemble is the more faithful representation.

The ensemble is described by the structures of its members and by their populations. The populations determine the average behaviour, and a change in population, such as that produced by ligand binding, can change the function without changing any structure. Cumming (2014) argues that the populations should be reported with their uncertainty, since a population estimated from limited data may be known only roughly.

Molecular dynamics simulation generates candidate conformations by integrating the motion of the atoms under a force field. The force field determines the energies of the conformations, and different force fields can give different populations. The sampling is limited by the simulated time, and a conformation that is rare in the simulation may be common in nature, or the reverse. Ioannidis (2005) described how a model that samples only part of its space can produce conclusions that are confined to that part, and the sampling limits must be reported.

Experimental constraints, such as nuclear Overhauser effects, fluorescence measurements or small-angle scattering, select among the simulated conformations and improve the estimates of their populations. The constraints must be consistent with the simulation, and any disagreement must be investigated. Munafò et al. (2017) argued that the simulation settings, the force field and the constraints should be deposited, so that the ensemble can be reproduced and its populations tested by others.
