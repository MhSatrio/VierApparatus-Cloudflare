---
title: "Sampling and Convergence"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "Whether a molecular dynamics simulation samples the states that matter, the timescales of biological motions that a simulation must cover, the problem of rare events that are seldom visited in a trajectory, the convergence of averages with simulation length and the enhanced sampling methods that accelerate exploration of the energy landscape."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Judge whether a simulation has sampled the states relevant to its question and whether its averages have converged."
  - "Explain why rare events are difficult to simulate and how enhanced sampling methods address this."
references:
  - "Shaw, D. E., Maragakis, P., Lindorff-Larsen, K., Piana, S., Dror, R. O., Eastwood, M. P., Bank, J. A., Jumper, J. M., Salmon, J. K., Shan, Y., & Wriggers, W. (2010). Atomic-level characterization of the structural dynamics of proteins. Science, 330(6002), 341-346. https://doi.org/10.1126/science.1187409"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

A simulation can only report the states it visits. A protein whose important conformational change occurs once per second cannot be studied by a trajectory of a microsecond, because the change is not sampled at all. Shaw et al. (2010) extended simulations to timescales long enough to observe conformational changes of proteins, and their results depended on the length and the number of trajectories as well as on the force field. The first requirement of a simulation is that it samples the timescales that the question requires.

Convergence means that an average does not change when the simulation is lengthened. The average of a property is computed as a function of time, and a converged average is one that has settled to a stable value and fluctuates around it. A simulation that has not converged gives an average that depends on how long it was run, and the apparent result may change with further simulation. The convergence must be checked for each property, since some converge far more slowly than others.

Rare events are the central problem. A transition between two states that is seldom observed in a trajectory has a poorly determined rate, and the estimate of the free energy barrier is uncertain. Enhanced sampling methods bias the simulation to visit the rare states more often, and the bias is removed afterwards by a correction. The methods make the rare events accessible, but they introduce assumptions about the reaction coordinate that must be justified.

Multiple independent trajectories help. Running many short simulations from different starting points samples the landscape more broadly than a single long run, and the agreement among them is a check on convergence. A disagreement among trajectories shows that the sampling is not yet adequate, and the result must not be reported as converged.

Ioannidis (2005) described how a simulation that appears to reach a stable state may have simply not visited the other states, and Platt (1964) recommended the comparison of independent runs as a test that could reveal the missing states.

The adequacy of a simulation is a question about the states it has sampled, and its answer must be shown by convergence and by the agreement of independent trajectories.
