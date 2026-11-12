---
title: "Plasticity and Learning"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "How the strengths of synapses change with activity and how these changes implement learning in networks, the Hebbian rule that strengthens connections between co-active neurons, the spike-timing dependence of plasticity, the physical constraints that keep learning stable and the test of learning rules against the synaptic changes measured in tissue."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the Hebbian rule and the spike-timing dependence of synaptic plasticity."
  - "Explain how a learning rule changes network connections and what stabilises the learning."
references:
  - "Bliss, T. V. P., & Lømo, T. (1973). Long-lasting potentiation of synaptic transmission in the dentate area of the anaesthetized rabbit following stimulation of the perforant path. The Journal of Physiology, 232(2), 331-356. https://doi.org/10.1113/jphysiol.1973.sp010273"
  - "Hopfield, J. J. (1982). Neural networks and physical systems with emergent collective computational abilities. Proceedings of the National Academy of Sciences of the United States of America, 79(8), 2554-2558. https://doi.org/10.1073/pnas.79.8.2554"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

Learning in a network is a change in its connections, and the rule that governs the change determines what the network learns. Hebb proposed that a connection is strengthened when the neurons on either side are active together, and the rule has been the starting point for models of learning. The synaptic changes measured by Bliss and Lømo (1973) are the experimental counterpart of such a rule, in which activity that drives a postsynaptic cell strengthens the synapses that contributed to it.

The timing of the spikes matters. The spike-timing dependence of plasticity strengthens a synapse when the presynaptic spike precedes the postsynaptic one, and weakens it when the order is reversed, with the size of the change depending on the interval between the spikes. The rule links the causal order of activity to the direction of change, and it provides a physical basis for the detection of correlations in time.

Learning rules must be stable. A rule that strengthens connections without limit produces runaway excitation, and one that weakens them without limit eliminates the connections that carry information. The network of Hopfield (1982) stores patterns in its connections, and a learning rule must write the patterns without destroying those already stored, which is a constraint on the form of the rule. Homeostatic mechanisms that regulate the total strength of a neuron's inputs are one way of keeping the learning stable.

The rules are tested against the synaptic changes measured in tissue. The dependence of the change on the timing, on the frequency and on the history of the synapse is compared with the prediction of the rule, and the agreement is the test of the rule's biological basis. Ioannidis (2005) described how a rule that reproduces a learned function may be accepted without the test of the individual synaptic changes, and Platt (1964) recommended measurements of the synapses themselves that could discriminate between rules.

Learning changes the connections, and the rule that governs the change determines the network's capacity to store and to stabilise what it learns.
