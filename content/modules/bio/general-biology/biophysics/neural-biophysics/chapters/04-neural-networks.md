---
title: "Neural Networks"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "How networks of connected neurons compute, the physical models of networks such as the associative memory of Hopfield, in which stored patterns are attractors of the network dynamics, the energy function that governs the settling of a network to a stable state and the way connectivity, excitation and inhibition determine the activity the network can sustain."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how a Hopfield network stores patterns as stable states and retrieves them from partial inputs."
  - "Explain how connectivity and the balance of excitation and inhibition shape the activity a network can sustain."
references:
  - "Hopfield, J. J. (1982). Neural networks and physical systems with emergent collective computational abilities. Proceedings of the National Academy of Sciences of the United States of America, 79(8), 2554-2558. https://doi.org/10.1073/pnas.79.8.2554"
  - "Hodgkin, A. L., & Huxley, A. F. (1952). A quantitative description of membrane current and its application to conduction and excitation in nerve. The Journal of Physiology, 117(4), 500-544. https://doi.org/10.1113/jphysiol.1952.sp004764"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

Hopfield (1982) showed that a network of simple units with symmetric connections has an energy function, and that its dynamics descend this energy until the network settles into a stable state. Patterns stored in the connections become the minima of the energy, so that a partial or noisy input relaxes to the nearest stored pattern. The network performs associative memory, retrieving a whole pattern from a fragment of it, and the model connects the physics of spin systems to the computation of neural circuits, as Hopfield's paper emphasised.

The energy function gives the network its physics. The state of the network is a point in a high-dimensional space, and the energy is a landscape over that space, with valleys corresponding to the stored patterns. The dynamics move the state downhill, and the stability of a stored pattern is the depth of its valley. The capacity of the network, the number of patterns it can store before the valleys merge and retrieval fails, is a physical limit that scales with the number of units.

The biological relevance of such models depends on the connectivity. Real neural circuits have connections that are asymmetric, sparse and of both excitatory and inhibitory sign, and their dynamics may not settle to fixed states but may oscillate or fluctuate. The balance between excitation and inhibition sets the level of activity the network sustains, and a network with balanced excitation and inhibition can maintain activity without runaway excitation.

The units of a network are neurons with the firing behaviour of the previous chapter, and the network's dynamics depend on the way these units respond to their inputs. The network is described at the level of firing rates, averaged over many spikes, or at the level of individual spike times, and the choice affects the behaviour that the model can show.

Ioannidis (2005) described how a model that stores patterns in a network may be taken as a model of memory without the test that the biology uses such a mechanism, and Platt (1964) recommended tests that could distinguish the attractor dynamics from alternatives, such as the response of the network to perturbations that the attractor predicts.

Networks compute through the collective dynamics of their connections, and the stored patterns are the stable states that the dynamics select.
