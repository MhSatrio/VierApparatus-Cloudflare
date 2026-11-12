---
title: "Steady States and Stability"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The steady states of a dynamic model at which all rates vanish, their calculation from the algebraic conditions on the variables, the linearisation of the equations around a steady state to obtain the Jacobian, the stability of a steady state judged from the eigenvalues of the Jacobian, the stable and unstable steady states that determine whether a system returns to a state after a disturbance, the multiple steady states that arise from feedback, and the interpretation of stability as a property of the model at the parameters used."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Find the steady states of a simple model by setting its rates to zero and state the number of steady states it can have."
  - "Judge the stability of a steady state from the eigenvalues of the linearised system and interpret a stable state biologically."
references:
  - "Alon, U. (2007). Network motifs: theory and experimental approaches. Nature Reviews Genetics, 8(6), 450-461. https://doi.org/10.1038/nrg2102"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A steady state is a set of concentrations at which every rate of change is zero, so that the system stays where it is. Finding the steady states is an algebraic problem: the rates are set to zero and the equations are solved for the variables. A linear pathway usually has one steady state, while a system with feedback can have several, and the number of steady states is one of the first properties to establish for a model.

Stability describes what happens after a small disturbance. A steady state is stable if the system returns to it, and unstable if the system moves away. The test uses the linearisation of the equations around the steady state, which is summarised in the Jacobian matrix of partial derivatives. The eigenvalues of the Jacobian determine the behaviour: if all have negative real parts, the state is stable, and if any has a positive real part, it is unstable. Alon (2007) noted that the stability of a motif determines the function it can perform in a network.

Feedback can produce several steady states, of which some are stable and some are not. A system with positive feedback may have two stable states separated by an unstable one, and the state it occupies depends on its history. The stable states are the ones that a cell can maintain, and the unstable ones are thresholds between them. This structure underlies the switches of many biological processes.

Stability is a property of the model at the parameters used, and a small change in a parameter can alter it. The analysis should therefore be repeated over a range of parameter values, and the region of stability reported. Cumming (2014) argues that the parameters and the conclusions drawn from them should be reported with their uncertainty, and Sandve et al. (2013) recommended recording the steady states and the parameter values at which they were computed.
