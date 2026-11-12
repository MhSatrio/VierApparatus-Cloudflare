---
title: "Biophysical Models of Neurons"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "Biophysical models of single neurons in which the membrane is treated as a capacitor in parallel with conductances for sodium, potassium and leak currents, the Hodgkin-Huxley equations whose gating variables describe the opening and closing of voltage-gated channels, the reduced models such as the leaky integrate-and-fire neuron that capture firing with fewer parameters, the trade-off between biophysical detail and tractability, and the choice of model complexity according to the question the model is meant to answer."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Write the membrane equation of a neuron as a capacitor in parallel with ionic conductances and state the role of each term."
  - "Choose between a detailed biophysical model and a reduced model according to the question and state what the reduction omits."
references:
  - "Hodgkin, A. L., & Huxley, A. F. (1952). A quantitative description of membrane current and its application to conduction and excitation in nerve. The Journal of Physiology, 117(4), 500-544. https://doi.org/10.1113/jphysiol.1952.sp004764"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The membrane of a neuron behaves like an electrical circuit. It stores charge like a capacitor, and it conducts ions through channels that act like conductances in parallel. The voltage across the membrane changes as the currents through these channels flow, and the membrane equation expresses this balance. Hodgkin and Huxley (1952) built their model on this description, with a sodium conductance and a potassium conductance that depend on the voltage, and a leak conductance that remains constant.

The gating variables of the Hodgkin-Huxley model describe the probability that each channel is open, and they change with the voltage at rates that the experiments determined. The sodium channel has an activation gate that opens rapidly and an inactivation gate that closes after a delay, and the potassium channel opens more slowly. The interplay of these gates produces the rise and fall of the action potential, and the model reproduces its shape and its threshold.

Reduced models omit much of this detail. The leaky integrate-and-fire neuron represents the membrane by a single voltage that integrates its input and emits a spike when it reaches a threshold, after which it resets. The reduced model captures firing with few parameters and is efficient in large networks, but it cannot reproduce the shape of the action potential or the behaviour of the channels that the detailed model describes.

The choice of model complexity follows from the question. A model that asks how the channels shape the firing of a neuron needs the biophysical detail, while a model that asks how a network of neurons generates a rhythm may need only the reduced form. The detail should not be added for its own sake, since each added parameter must be estimated and each adds uncertainty. Cumming (2014) argues that the uncertainty in the parameters should be reported with their intervals, and Sandve et al. (2013) recommended recording the equations and the parameter values used.
