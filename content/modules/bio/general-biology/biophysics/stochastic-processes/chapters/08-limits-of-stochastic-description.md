---
title: "Limits of the Stochastic Description"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "The limits of stochastic models in biology, including the assumptions of well-mixed compartments and Markov dynamics that real cells may violate, the spatial structure that a simple stochastic model omits, the non-stationary processes that change their rates over time and the reporting needed to show when a stochastic description is adequate."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "State the assumptions of well-mixed and Markovian stochastic models and identify cases where they fail in cells."
  - "Describe how spatial structure and time-varying rates limit the adequacy of a simple stochastic description."
references:
  - "Gillespie, D. T. (1977). Exact stochastic simulation of coupled chemical reactions. The Journal of Physical Chemistry, 81(25), 2340-2361. https://doi.org/10.1021/j100540a008"
  - "Berg, H. C., & Purcell, E. M. (1977). Physics of chemoreception. Biophysical Journal, 20(2), 193-219. https://doi.org/10.1016/S0006-3495(77)85544-6"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

The stochastic simulation of Gillespie (1977) assumes that the reacting molecules are well mixed in a single compartment, so that any two molecules are equally likely to meet. Cells are structured. Molecules are localised to membranes, organelles and the nucleus, and their diffusion is slow relative to some reactions, so the probability of a meeting depends on position. In such systems the well-mixed description omits the spatial variation that determines the outcome, and a model that ignores it may predict the wrong distribution.

Berg and Purcell (1977) showed that the arrival of molecules at a receptor depends on the geometry and diffusion of the cell, and their analysis is a case in which the spatial structure is essential to the statistics. A simple well-mixed model of the same process gives different predictions from the spatial one, and the difference is large when the receptors are few.

The Markov assumption, that the rate of a transition depends only on the current state, also has limits. A process whose rate changes with time, such as a receptor whose sensitivity depends on its history, is not Markovian in the simple sense, and the waiting time distributions it produces are not exponential. The model must include the history, which increases its complexity and the number of parameters that must be estimated.

Ioannidis (2005) described how a model whose assumptions are not stated may be applied to a system that violates them, and the adequacy of the stochastic description must be shown for each system. Platt (1964) recommended comparing the stochastic model with a spatial or non-Markovian alternative in an experiment that discriminates between them.

A stochastic description is a useful approximation, and its limits are the points at which the cell's structure or history becomes part of the answer.
