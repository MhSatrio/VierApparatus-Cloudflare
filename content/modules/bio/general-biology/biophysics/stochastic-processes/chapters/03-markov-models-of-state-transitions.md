---
title: "Markov Models of State Transitions"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "Markov models describe a molecule or a channel as hopping between discrete states with fixed transition rates, the transition matrix and the steady-state occupancy it implies, how such models describe ion channel gating and molecular switches and how the rates are estimated from recordings and tested against the dwell time distributions they predict."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe a molecule or channel as a Markov model with states and transition rates and state the steady-state occupancy."
  - "Estimate transition rates from recordings and test the model against the predicted dwell time distributions."
references:
  - "Hodgkin, A. L., & Huxley, A. F. (1952). A quantitative description of membrane current and its application to conduction and excitation in nerve. The Journal of Physiology, 117(4), 500-544. https://doi.org/10.1113/jphysiol.1952.sp004764"
  - "Gillespie, D. T. (1977). Exact stochastic simulation of coupled chemical reactions. The Journal of Physical Chemistry, 81(25), 2340-2361. https://doi.org/10.1021/j100540a008"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
---

A Markov model describes a system that occupies a set of discrete states and moves between them with rates that depend only on the current state. A channel that can be closed, open or inactivated is a three-state model, and a molecular switch that alternates between two conformations is a two-state model. The rates of transition define a matrix, and the steady-state occupancy of each state is found from the matrix. Hodgkin and Huxley (1952) described the gating of the sodium and potassium conductances by variables that behave as first-order transitions, and Markov models generalise this description to channels with more states.

The dwell time in a state is exponentially distributed, with a mean equal to the inverse of the total rate of leaving it, as the earlier chapter on waiting times showed. A recording of a single channel therefore yields a sequence of open and closed dwells, and the distribution of each gives the rates of leaving that state. The model is tested by comparing the predicted distribution of dwell times and the sequence of transitions with the recording, and a model that predicts the dwells but not the sequence of states is incomplete.

Estimating the rates from data requires care. The record must be long enough to sample the rare transitions, and the time resolution of the recording must be fine enough to detect brief events. Brief events that are missed by the recording lead to overestimated dwell times, which bias the rates. The correction for missed events is part of the estimation, and its assumptions must be stated.

Ioannidis (2005) described how a model with many states can fit a recording whose information does not justify the states, and Platt (1964) recommended a test that could separate the alternatives, such as a model with one additional state against one without, which the recording either supports or does not.

A Markov model is a summary of the states and their exchanges, and its usefulness depends on whether the recording supports the states it assumes.
