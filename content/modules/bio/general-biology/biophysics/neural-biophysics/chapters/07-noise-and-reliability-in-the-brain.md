---
title: "Noise and Reliability in the Brain"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "The sources of noise in neural circuits, from the stochastic opening of channels and the release of synaptic vesicles to the variability of spike timing and the correlated fluctuations of populations, how noise limits the precision of neural codes and how the brain may use or tolerate noise to represent uncertainty and to compute reliably."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Identify the main sources of noise in neurons and synapses and how each limits the precision of a neural signal."
  - "Explain how neural populations may average out noise and how correlated noise limits this averaging."
references:
  - "Hodgkin, A. L., & Huxley, A. F. (1952). A quantitative description of membrane current and its application to conduction and excitation in nerve. The Journal of Physiology, 117(4), 500-544. https://doi.org/10.1113/jphysiol.1952.sp004764"
  - "Berg, H. C., & Purcell, E. M. (1977). Physics of chemoreception. Biophysical Journal, 20(2), 193-219. https://doi.org/10.1016/S0006-3495(77)85544-6"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

Neural signals are noisy at every level. Channels open and close stochastically, so that the current in a small patch of membrane fluctuates, and synaptic vesicles are released with a probability rather than with certainty. The spike times vary from trial to trial even when the stimulus is repeated, and the responses of neighbouring neurons are often correlated through shared inputs. Berg and Purcell (1977) showed that the statistics of molecular arrival limit the precision of a cell's sensing, and similar limits apply to the sensing and signalling of neurons.

The noise of the individual neuron sets a floor on the precision of its signal. A neuron that responds to a stimulus with a variable spike count conveys the stimulus with a limited accuracy, and the accuracy improves with the length of the observation window, since the noise averages over time. The trade-off between the precision and the speed of a neural response follows from this averaging, and it constrains how quickly the brain can act on sensory information.

Populations of neurons can average out individual noise. If the noise in different neurons is independent, the population signal improves with the number of neurons, as the square root of their number. Correlated noise, arising from shared inputs or from the coupling of the neurons, does not average out, and it limits the population's precision regardless of its size. The structure of the correlations is therefore as important as the number of neurons, and it is measured by the covariance of the responses across trials.

The brain may use noise rather than merely tolerate it. Variability can represent uncertainty, and the variance of a population response may encode the confidence of a decision. Stochastic resonance, in which a weak signal is detected more effectively in the presence of some noise, provides another possible use. The question of what the brain does with its noise is answered by measuring whether the variability carries information that the animal uses.

Ioannidis (2005) described how the variability of neural responses may be treated as noise to be discarded when it may carry information, and Platt (1964) recommended experiments that could show whether the variability predicts the behaviour, which would reveal its use.

The brain is a noisy system whose reliability comes from the averaging of its populations, and whose noise may carry information as well as limit it.
