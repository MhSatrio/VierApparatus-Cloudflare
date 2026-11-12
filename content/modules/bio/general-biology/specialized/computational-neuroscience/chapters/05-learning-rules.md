---
title: "Learning Rules"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "The mathematical rules that describe how the strength of synapses changes with activity, including Hebbian learning in which coincident activity strengthens a connection, spike-timing-dependent plasticity in which the order and timing of spikes determine the direction of change, the error-driven rules that adjust connections to reduce a prediction error, the stability problems that unconstrained Hebbian learning creates and the normalisation that prevents them, and the link between these rules and the synaptic plasticity measured in experiments."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Write a Hebbian learning rule and state the instability that it creates without a normalising constraint."
  - "Describe spike-timing-dependent plasticity and state the experimental measurement it is fitted to."
references:
  - "Yuste, R. (2015). From the neuron doctrine to neural networks. Nature Reviews Neuroscience, 16(8), 487-497. https://doi.org/10.1038/nrn3962"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Learning in the brain is thought to involve changes in the strength of synapses, and computational models describe these changes with learning rules. The Hebbian rule states that a synapse is strengthened when the neurons on either side are active together, a principle summarised as neurons that fire together wire together. Yuste (2015) described how this idea links the activity of a circuit to the synaptic changes that store its experience, and it is the basis of many models of memory.

A simple Hebbian rule is unstable, since a synapse that is strengthened becomes more active, which strengthens it further, until the connections grow without limit. Normalisation, in which the total strength of the synapses onto a neuron is held constant, prevents this runaway. The choice of normalisation is part of the model, and its effect on the learned connections should be reported.

Spike-timing-dependent plasticity makes the change depend on the order and the timing of the spikes. A synapse is strengthened when the presynaptic spike precedes the postsynaptic spike by a few milliseconds, and it is weakened when the order is reversed. The window of timing and the magnitudes of the changes are fitted to experiments, and the fitted rule can be tested by predicting the changes produced by new spike patterns.

Error-driven rules adjust connections to reduce the difference between a prediction and the outcome, and they are used to model learning in circuits that must match a target. These rules link learning to a signal of error, which may be carried by neuromodulators in the brain. Sandve et al. (2013) recommended recording the rule, its parameters and the simulation conditions, since small changes in the learning rule can change the learned network.
