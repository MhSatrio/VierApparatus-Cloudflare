---
title: "Simulation Before Building"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The simulation of a genetic circuit before it is built, using the gate response functions and the dynamics of the regulators to predict the output for each input combination, the use of a simulation to choose between designs and to find the operating range, the limits of the predictions when the model omits the load of the circuit on the host and the crosstalk between parts, the comparison of simulated and measured truth tables, and the caution against treating a simulation as a substitute for measurement."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Simulate the output of a circuit for each input combination from the response functions of its gates."
  - "Explain which effects a simple circuit simulation omits and why the simulation must be compared with measurement."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Nielsen, A. A. K., Der, B. S., Shin, J., Vaidyanathan, P., Paralanov, V., Strychalski, E. A., Ross, D., Densmore, D., & Voigt, C. A. (2016). Genetic circuit design automation. Science, 352(6281), aac7341. https://doi.org/10.1126/science.aac7341"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Simulation predicts the output of a circuit for each combination of inputs before any DNA is assembled. The simplest simulation composes the response functions of the gates in the order of the circuit, passing the output of each gate as the input of the next, and it yields a predicted truth table. Simulation is valuable because it is cheap, and it can compare many designs and reveal those that cannot reach the required output levels.

A simulation can also find the operating range of a circuit, which is the set of inputs over which its outputs are reliably high or low. A design whose operating range does not match the inputs available in the experiment will fail whatever its logic, and the simulation shows this before the cells are built. The range should be reported with the thresholds used to define it, since the range depends on those thresholds.

Simple simulations omit effects that matter in the cell. The load that the circuit places on the host reduces growth and changes the expression of every gene, and crosstalk between regulators can change the behaviour of a gate. A simulation that assumes independent gates will overestimate the performance of a circuit whose components interact, and its predictions must be treated as optimistic until these effects are measured.

The simulated truth table must be compared with the measured one. Ioannidis (2005) described how a model that is judged only on the data used to build it gives an inflated impression of its accuracy, so the comparison should use circuits that were not used to set the parameters. Cumming (2014) argues that the agreement should be reported as a difference with its interval for each input combination, and Nielsen et al. (2016) showed that automated pipelines depend on this comparison to improve their libraries. Sandve et al. (2013) recommended recording the simulation code and the parameters it used.
