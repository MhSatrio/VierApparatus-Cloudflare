---
title: "Multiscale Biological Simulation"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The simulation of biological systems across several spatial and temporal scales at doctoral and postdoctoral level, covering the choice of the scales that determine the question and the representation appropriate to each, the coupling of molecular, cellular and tissue simulations so that the output of one informs the input of the next, the coarse-graining that summarises fine detail for the coarser model and the error introduced by the summary, the spatial simulation of reaction and diffusion and of tissue mechanics, the parameter estimation across scales with data at each level, the uncertainty propagation through a chain of simulations, the verification of numerical convergence at each scale, and the reporting of the scales, the couplings and the uncertainty with the code and data deposited."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Choose the scales that determine a question and state the representation and coupling used at each interface."
  - "Propagate uncertainty through a chain of simulations and report the total with its components."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

Many biological phenomena emerge from interactions across scales, so that a tissue behaviour depends on the molecular events in its cells and the cellular events depend on the tissue environment. A multiscale simulation represents each scale with a model suited to it and couples the models so that information passes between them. The approach extends the whole-cell logic of Karr et al. (2012) beyond the single cell, and it inherits the same demands for careful coupling and honest validation.

The scales that matter depend on the question, and a model that includes detail irrelevant to the answer adds cost without value. Each scale is represented with a model that matches its physics and its data, and the choice of representation determines what can be computed. Cumming (2014) argues that the representation should be justified by the question and the precision it must achieve, rather than by convenience.

The coupling between scales requires a summary of fine detail that the coarser model can use, and every summary introduces an approximation. The error of each approximation should be quantified, since a chain of approximations can accumulate error that is larger than any single step suggests. Ioannidis (2005) described how a sequence of individually reasonable assumptions can produce a conclusion that is far from the truth, and the cumulative error must be examined.

Uncertainty propagates through the chain, and the total uncertainty of a prediction depends on the uncertainty at every scale. Peng (2011) argued that the code that couples the models is part of the result and must be deposited, and Munafò et al. (2017) argued that the uncertainty at each scale should be reported so that readers can see where it comes from. The following chapters examine the choice of scales, the coupling, the spatial simulation, the parameter estimation across scales and the verification of the chain.
