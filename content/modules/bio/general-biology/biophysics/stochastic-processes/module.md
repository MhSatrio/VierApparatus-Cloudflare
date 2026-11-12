---
title: "Stochastic Processes"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "The random processes that drive biological events, including the stochastic simulation of chemical reactions in small volumes, the Markov models of molecular state changes, the waiting time distributions of single events and the noise that propagates through gene expression and signalling, with the methods used to simulate and test such processes."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the stochastic simulation of reactions in a small volume and explain when it is required."
  - "Use a Markov model to describe the random transitions of a molecule between states and state how its parameters are tested."
references:
  - "Gillespie, D. T. (1976). A general method for numerically simulating the stochastic time evolution of coupled chemical reactions. Journal of Computational Physics, 22(4), 403-434. https://doi.org/10.1016/0021-9991(76)90041-3"
  - "Gillespie, D. T. (1977). Exact stochastic simulation of coupled chemical reactions. The Journal of Physical Chemistry, 81(25), 2340-2361. https://doi.org/10.1021/j100540a008"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

# Stochastic Processes

The Mathematical Foundations topic introduced probability and the stochastic simulation of reactions. This topic develops the random processes themselves: the events that occur at random times, the chains of states that molecules move through and the noise that these randomnesses produce in the cell. Many biological events are rare, such as the binding of a transcription factor to a site or the opening of a single channel, and their timing is best described as a random process rather than an average rate.

The chapters follow the structure of these processes. The stochastic simulation of reactions in small volumes comes first, following the algorithm that Gillespie (1976; 1977) developed, and the distribution of waiting times between events is then described. Markov models of state transitions follow, applied to channels and molecular switches, and the propagation of noise through gene expression and signalling is treated next. The final chapters address the testing of stochastic models against data and the interpretation of noise as a feature of biological systems.

Gillespie (1976) showed that the time to the next reaction in a well-mixed small volume can be sampled exactly from its probability distribution, and this exact method replaces an approximation that fails when molecules are few. The method is the appropriate tool when the number of molecules is small, and it is the reason stochastic simulation is central to modelling cellular regulation.

Ioannidis (2005) described how a stochastic model with many free parameters can reproduce any observed noise, and Platt (1964) recommended a test of the model against an experiment that changes the noise in a predicted way, which distinguishes the model from alternatives.

Random events are the substrate of cellular decisions, and a model of them is a model of when and how often each event occurs, not of its average alone.
