---
title: "Interpreting Single-Molecule Data"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "How single-molecule traces are analysed, including the detection of steps and states in noisy records, the statistical treatment of dwell times and transition rates, the choice of thresholds and the risk that analysis choices shape the states reported and the way the results are reproduced across molecules and laboratories."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how steps and states are detected in a noisy single-molecule record and how the choice of method affects the result."
  - "State the analysis choices that could change the reported states and how they are reported and tested."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Moerner, W. E., & Orrit, M. (1999). Illuminating single molecules in condensed matter. Science, 283(5408), 1670-1676. https://doi.org/10.1126/science.283.5408.1670"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

A single-molecule trace is noisy, and the states it contains must be identified by an analysis. A step detection algorithm searches for abrupt changes in the signal, a hidden Markov model assigns each point to a state, and a threshold separates the levels of the signal. Each method makes choices, such as the level of noise it tolerates or the number of states it allows, and these choices can change the states that are reported. Ioannidis (2005) described how the flexibility of analysis can produce results that depend on the analyst, and the analysis of single-molecule data is vulnerable to the same problem.

The distribution of dwell times and transition rates is derived from the states. The dwells are exponentially distributed if the states are Markovian, and the rates are estimated from their means. The estimates depend on the states having been identified correctly, and a brief state that is missed by the analysis biases the dwells of the states around it. The correction for missed events must be applied, and its assumptions stated.

The threshold is a particular source of bias. A threshold set close to a level can split a single state into two, and a threshold set far from a level can merge two states. The threshold should be set from the noise of the record and from a criterion established in advance, and not by inspection of the data in the way that produces the desired result. Platt (1964) recommended a procedure that could show the analysis to be wrong, such as the application of the same analysis to simulated traces with known states.

The reproducibility of the analysis must be shown. The same traces analysed by different methods or by different investigators should give consistent states, and the states should be found in many molecules rather than in a few. The reporting must state the method, its parameters, the criteria used and the results of the test on simulated data.

Single-molecule data are rich, and the states they reveal are only as reliable as the analysis that identifies them and the controls that test it.
