---
title: "Quantitative Gate Models"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "Quantitative models that describe the response of each gate and the way gates combine in a circuit, including the Hill function that gives the steady-state output for an input, the propagation of signals through a cascade in which the output of one gate sets the input of the next, the dependence of the output on the dynamics of the regulators as well as their steady states, the fitting of gate parameters from dose-response data with their uncertainties, and the use of the models to predict the performance of untested combinations of gates."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Write the Hill function that describes a gate's steady-state response and interpret its parameters."
  - "Predict the output of a two-gate cascade from the response functions and state the assumption that the cascade relies on."
references:
  - "Elowitz, M. B., & Leibler, S. (2000). A synthetic oscillatory network of transcriptional regulators. Nature, 403(6767), 335-338. https://doi.org/10.1038/35002125"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A gate model describes how the output of a gate depends on its input. The most common form is the Hill function, in which the steady-state output rises with the input as a sigmoid, with a maximum, a threshold at which the output is half maximal and a Hill coefficient that sets the steepness. The coefficient is the element that makes a gate switch-like, and it is determined by the cooperativity of the regulator's binding. Elowitz and Leibler (2000) used such cooperative repression to make their oscillator, and the same functions describe the gates of a circuit.

A cascade connects gates so that the output of one is the input of the next. If the output of the first gate is the input of the second, the second's response determines the final output, and the composite function is found by substituting one into the other. The assumption that makes this simple is that the second gate's input is not altered by the second gate itself, which holds only if the load of the second gate on the first is negligible.

Steady-state models omit the dynamics. A gate takes time to respond, and the time depends on the rates of transcription, translation and degradation of its regulator. A cascade of slow gates delays its output, and a circuit that is used at a rate faster than its gates can respond will not show its steady-state truth table. Models that include the dynamics predict the time course as well as the final state, and they are needed for circuits whose timing matters.

Gate parameters are fitted from dose-response data, with each parameter reported with its uncertainty. Cumming (2014) argues that a threshold or a steepness estimated from a few concentrations is imprecise, and the fit should show the interval. Sandve et al. (2013) recommended recording the model form, the fitting method and the data, so that the parameters can be refitted when new data become available. A model used to predict untested combinations should be validated on combinations that were not used to fit it.
