---
title: "Stochastic Simulation of Reactions"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "The stochastic simulation algorithm of Gillespie, which samples the time to the next reaction and the reaction that occurs from their probabilities, how it differs from deterministic rate equations in small volumes, the cost of simulating many reactions and the conditions under which the deterministic description is an adequate approximation."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the steps of the stochastic simulation algorithm and the probabilities from which each step is sampled."
  - "Explain when a deterministic rate equation fails to describe a reacting system and when it is adequate."
references:
  - "Gillespie, D. T. (1976). A general method for numerically simulating the stochastic time evolution of coupled chemical reactions. Journal of Computational Physics, 22(4), 403-434. https://doi.org/10.1016/0021-9991(76)90041-3"
  - "Gillespie, D. T. (1977). Exact stochastic simulation of coupled chemical reactions. The Journal of Physical Chemistry, 81(25), 2340-2361. https://doi.org/10.1021/j100540a008"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
---

The stochastic simulation algorithm treats a reacting mixture as a set of discrete molecules, each reaction as an event with a probability per unit time, and the system as a sequence of events in time. At each step the algorithm draws the time to the next event from an exponential distribution whose rate is the sum of all reaction propensities, and it then chooses which reaction occurs in proportion to its propensity. The molecule counts are updated and the process repeats. Gillespie (1976) showed that this procedure gives an exact sample of the random trajectory of the system, rather than an approximation to its average.

The distinction from the deterministic approach matters when the molecule numbers are small. A deterministic rate equation gives the expected concentration, which is the average over many possible trajectories. When a species is present in only a few copies, the trajectories differ widely, and the average describes none of them well. Alberts et al. (2022) describe gene regulation in which a transcription factor may be present in a handful of molecules, and the deterministic description can miss the switching between states that the stochastic simulation reveals.

The method is computationally costly, because every reaction event must be simulated. For systems with many reactions and many molecules, the cost grows rapidly, and approximate methods that group events are used. The exact method remains the reference against which the approximations are checked, and an approximation must be shown to reproduce the exact statistics in the regime where it is applied.

The deterministic approximation is adequate when the molecule numbers are large, because the fluctuations are then small relative to the averages. The threshold depends on the system, and it must be checked rather than assumed. Gillespie (1977) gave the exact formulation for coupled reactions, and the regime of validity follows from the magnitude of the fluctuations in the species of interest.

Ioannidis (2005) described how a simulation that is not validated against measured variability can produce predictions that look precise but are not tested, and Platt (1964) recommended comparing the simulated distributions with the measured distributions of single cells, which reveals whether the model captures the noise.

Simulation is a way to follow the randomness of a small system through time, and its results must be compared with the variability that single cells show.
