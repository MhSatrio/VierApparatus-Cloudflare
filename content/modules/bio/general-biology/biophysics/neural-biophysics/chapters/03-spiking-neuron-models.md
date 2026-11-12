---
title: "Spiking Neuron Models"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "The models used to describe the firing of neurons, from the detailed Hodgkin-Huxley conductance model to the leaky integrate-and-fire model that replaces the spike with a reset, the firing rate and f-I curve they predict, the trade-off between biophysical detail and computational tractability and the test of each model against recorded spike trains."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the Hodgkin-Huxley model and the integrate-and-fire model and state what each captures and omits."
  - "Explain how a neuron's firing rate depends on its input current and how models are tested against recorded spikes."
references:
  - "Hodgkin, A. L., & Huxley, A. F. (1952). A quantitative description of membrane current and its application to conduction and excitation in nerve. The Journal of Physiology, 117(4), 500-544. https://doi.org/10.1113/jphysiol.1952.sp004764"
  - "Hopfield, J. J. (1982). Neural networks and physical systems with emergent collective computational abilities. Proceedings of the National Academy of Sciences of the United States of America, 79(8), 2554-2558. https://doi.org/10.1073/pnas.79.8.2554"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

The Hodgkin-Huxley model describes the spike in terms of the sodium and potassium conductances, each with its own voltage and time dependence, and it reproduces the shape and the threshold of the action potential with accuracy. Its detail is also its cost: it has many parameters, and simulating a network of such neurons is computationally demanding. Hodgkin and Huxley (1952) fitted their equations to the squid axon, and the model is the reference against which simpler descriptions are judged.

The leaky integrate-and-fire model replaces the spike with a simple rule. The membrane potential is a leaky integral of the input current, and when it reaches a threshold the neuron is said to fire, its potential is reset and the spike is recorded as an event. The model captures the timing of the spike and the firing rate as a function of the input, and it omits the shape of the spike and the conductances that generate it. Its simplicity makes it useful for the study of networks, where the detail of each spike is not needed.

The firing rate of a model neuron as a function of its input current is the f-I curve, which describes how the neuron encodes the strength of its input in its rate. The shape of the curve depends on the model and on the properties of the neuron, and the f-I curve is a convenient way to compare a model with recordings. The curve may have a threshold below which the neuron does not fire, and a slope that determines the gain of the encoding.

The choice of model involves a trade-off. A detailed model reproduces the biophysics of the spike and of the channels, and it can be tested against the currents measured in voltage clamp. A simple model reproduces the spike timing and the rates, and it can be simulated in large networks. The question determines the appropriate model, and the claim made from a model must match its level of detail.

Models are tested against recorded spike trains. The timing of the spikes, their rates and their variability are compared with the model's predictions, and the agreement is measured by statistics that account for the variability of the recording. Ioannidis (2005) described how a model that fits the rates may fail to reproduce the timing, and Platt (1964) recommended tests that discriminate between models by the features of the spike train that they predict differently.

Spiking models range from the detailed conductance description to the reset of the integrate-and-fire model, and each captures the features of the neuron that its level of detail allows.
