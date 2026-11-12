---
title: "Dynamic Systems Modeling"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The mathematical modelling of biological systems as dynamical systems whose variables change over time, covering ordinary differential equations built from rate laws and mass action, the steady states and their stability, the oscillators produced by delayed negative feedback, the bistable switches produced by positive feedback, the stochastic effects that matter when molecule numbers are small, the estimation of parameters from time-course data, and the reporting of a dynamic model so that its equations, parameters and simulations can be reproduced."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Write an ordinary differential equation model of a biological process from its rate laws and identify its steady states."
  - "Explain how stability, oscillation and bistability arise from the structure of a dynamical system and state when stochastic effects matter."
references:
  - "Elowitz, M. B., & Leibler, S. (2000). A synthetic oscillatory network of transcriptional regulators. Nature, 403(6767), 335-338. https://doi.org/10.1038/35002125"
  - "Kitano, H. (2002). Systems Biology: A Brief Overview. Science, 295(5560), 1662-1664. https://doi.org/10.1126/science.1069492"
  - "Alon, U. (2007). Network motifs: theory and experimental approaches. Nature Reviews Genetics, 8(6), 450-461. https://doi.org/10.1038/nrg2102"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Dynamic models describe how the quantities of a biological system change over time. The concentrations of proteins, mRNAs and metabolites are the variables, and differential equations give their rates of change in terms of the other variables and the parameters of the system. Kitano (2002) argued that such models are needed to explain the behaviour of systems whose components interact over time, since the static pictures of networks cannot show oscillation, switching or the response to a changing input.

The equations are built from rate laws, which state how fast each reaction proceeds given the concentrations of its reactants. Mass action is the simplest rate law, in which the rate is proportional to the product of the reactant concentrations, and the enzyme kinetics and regulatory functions of real systems are often approximations of it. The steady states of the model are the concentrations at which all rates vanish, and their stability determines whether the system returns to them after a disturbance.

The behaviours that the model can show depend on its structure. Delayed negative feedback can produce sustained oscillations, as Elowitz and Leibler (2000) demonstrated with a synthetic oscillator in bacteria. Positive feedback can produce two stable states, in which the system remains in one or the other depending on its history. Alon (2007) noted that these behaviours are the functions of the recurring network motifs, and a model can show which structures produce them.

Dynamic models have many parameters, and their predictions depend on them, so the estimation of parameters and their uncertainty are central. Ioannidis (2005) described how a model with many free parameters can be fitted to almost any data, and the parameters must be estimated from data that are separate from those used to test the model. Cumming (2014) argues that the parameter estimates should be reported with their intervals, and Peng (2011) and Sandve et al. (2013) argued for the reproducibility of the equations, parameters and simulations on which the model's claims rest.
