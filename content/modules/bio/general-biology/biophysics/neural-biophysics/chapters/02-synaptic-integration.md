---
title: "Synaptic Integration"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "How a neuron sums the synaptic inputs it receives in space and time, the difference between linear and nonlinear summation, the role of the threshold and the spike initiation zone in converting the summed input into a decision to fire and the way inhibitory inputs shunt and subtract from the excitation."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how excitatory and inhibitory synaptic inputs are summed in space and time to determine whether a neuron fires."
  - "Describe the conditions under which synaptic summation is linear and when it is nonlinear."
references:
  - "Hodgkin, A. L., & Huxley, A. F. (1952). A quantitative description of membrane current and its application to conduction and excitation in nerve. The Journal of Physiology, 117(4), 500-544. https://doi.org/10.1113/jphysiol.1952.sp004764"
  - "Bliss, T. V. P., & Lømo, T. (1973). Long-lasting potentiation of synaptic transmission in the dentate area of the anaesthetized rabbit following stimulation of the perforant path. The Journal of Physiology, 232(2), 331-356. https://doi.org/10.1113/jphysiol.1973.sp010273"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

A neuron receives thousands of synaptic inputs, each producing a small depolarisation or hyperpolarisation at its location, and it must sum these to decide whether to fire. The summation is spatial, because inputs at different places on the dendrites contribute differently, and temporal, because inputs that arrive close together in time add more than inputs spread apart. The cable properties of the previous chapter determine how much each input is attenuated before it reaches the spike initiation zone, and the sum that arrives there is the quantity the neuron acts upon.

When the inputs are small, the summation is approximately linear: the response to two inputs is the sum of the responses to each. The linearity is lost as the inputs grow, because the active channels in the dendrites and the soma respond nonlinearly, and the threshold for firing introduces a strong nonlinearity at the output. The distinction between the linear and the nonlinear regimes determines which computations a neuron can perform.

Inhibitory inputs act in two ways. A hyperpolarising input subtracts from the excitation, while a shunting input, which opens conductances near the reversal potential of the inhibitory channels, divides the excitation without changing the potential much. The shunting inhibition is strongest close to the site of the excitation, so its effect depends on its location on the dendrite. Hodgkin and Huxley (1952) described the conductances whose changes produce these effects, and the shunt is a change in the membrane conductance of the same kind.

The threshold is set by the spike initiation zone, usually near the axon hillock, where the density of sodium channels is high. The sum of the inputs must depolarise this zone to threshold for a spike to occur, and the inputs that reach it through the dendrites are the ones that matter. The spike is an all-or-nothing response, and the neuron's output is therefore a thresholded function of its inputs.

Synaptic change alters the integration. Long-term potentiation, described by Bliss and Lømo (1973), strengthens the synapses that are active together, and this changes the weight of each input in the sum. The integration is therefore not fixed, and the neuron's computation changes with its experience.

Ioannidis (2005) described how the linearity of summation may be assumed from measurements in a limited range of inputs, and Platt (1964) recommended measurements across the range of inputs that could reveal the nonlinearity where it exists.

A neuron sums its synaptic inputs in space and time, and its output is a threshold on that sum, which changes with the synapses that have been active.
