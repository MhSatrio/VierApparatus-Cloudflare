---
title: "Modelling Biological Systems"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "How a mathematical model of a biological system is built from its components and their interactions, how its parameters are estimated and its structure is chosen, the use of stochastic simulation for systems with small numbers of molecules and the principle that a model is valuable only when its predictions are tested against new data."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Build a model of a biological system from its components and state the assumptions that define its structure."
  - "Explain when a stochastic simulation is needed in place of a deterministic model and how it is run."
references:
  - "Gillespie, D. T. (1977). Exact stochastic simulation of coupled chemical reactions. The Journal of Physical Chemistry, 81(25), 2340-2361. https://doi.org/10.1021/j100540a008"
  - "Hodgkin, A. L., & Huxley, A. F. (1952). A quantitative description of membrane current and its application to conduction and excitation in nerve. The Journal of Physiology, 117(4), 500-544. https://doi.org/10.1113/jphysiol.1952.sp004764"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

A model of a biological system is a simplified representation of its components and their interactions, written in mathematical form so that its behaviour can be derived and compared with measurements. Alberts et al. (2022) describe the components of cellular systems, and a model chooses which of these to include. The choice is a hypothesis about what matters for the behaviour of interest, and the structure must be justified by the biology rather than by the convenience of the mathematics.

Hodgkin and Huxley (1952) provided a classic example. They described the membrane as a set of conductances, each with a gating variable whose dynamics they measured, and the structure of the model followed from the experimental observations of the currents. Their model is detailed but still a simplification, since it omits the spatial structure of the axon and the molecular basis of the gates, and its usefulness depends on those omissions being acceptable for the question.

Parameters are estimated by fitting the model to data. A model with many parameters can fit almost any data, so the number of parameters must be small enough that they are constrained by the measurements. The uniqueness of the estimates should be checked, since different combinations of parameters may give the same behaviour.

When the number of molecules is small, a deterministic model, which treats concentrations as continuous, misrepresents the system. Gillespie (1977) developed an exact algorithm for simulating the random sequence of reactions in such a system, in which the time to the next reaction and the reaction that occurs are drawn from probability distributions. The method gives a sample of the random behaviour, and many runs are needed to estimate its distribution.

Ioannidis (2005) described how a model that is fitted to the data it was built from can appear to explain them while predicting nothing new. Platt (1964) argued that a model is most valuable when its prediction is tested in a situation that could show it false, and the test of a model is its prediction for new conditions, not its fit to the old.

A model is an argument in mathematical form, and it is judged by whether its predictions survive the experiments designed to test them.
