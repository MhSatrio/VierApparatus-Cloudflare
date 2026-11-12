---
title: "Molecular Dynamics in Drug Design"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "The use of molecular dynamics simulations to model the motion of a protein and a ligand over time, covering the simulation of binding and unbinding events that reveal the pathways of a ligand, the estimation of the free energy of binding by methods such as free energy perturbation and thermodynamic integration, the importance of sampling long enough to observe the relevant motions, the force fields that represent the interactions, the role of water and ions in the simulation, the reproducibility that depends on the settings of the simulation, and the reporting of simulations with their length, their replicates and the uncertainty of the free energy."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how a molecular dynamics simulation models the motion of a ligand in its binding site and state the time scales it can reach."
  - "Explain why a binding free energy from simulation requires sampling and replicates and state the uncertainty that must be reported."
references:
  - "Jorgensen, W. L. (2004). The Many Roles of Computation in Drug Discovery. Science, 303(5665), 1813-1818. https://doi.org/10.1126/science.1096361"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Molecular dynamics simulations follow the motion of every atom in a protein and a ligand over time, using a force field to calculate the forces between them. The simulation reveals the flexibility of the protein, the movement of the ligand into and out of its site and the water molecules that move with it. Jorgensen (2004) described how such simulations extended the role of computation from the static picture of docking to the dynamics of binding, which is essential to many questions in drug design.

The simulation can reach time scales of microseconds for systems of modest size, but many binding events occur over longer times. The result depends on whether the relevant motions have been sampled, and a simulation that is too short may miss the binding pathway or the conformations that matter. The length of the simulation and the number of independent replicates must be reported, since they determine what can be concluded.

Binding free energies can be estimated from simulations by methods such as free energy perturbation, which computes the change in free energy as one ligand is transformed into another, and thermodynamic integration. These methods are more accurate than docking scores, but they are expensive and sensitive to the force field, the sampling and the set-up. The free energy must be reported with its uncertainty, estimated from replicate runs.

The force field and the treatment of water and ions influence the result, and the choice of each must be stated. Different force fields can give different free energies for the same ligand, and the sensitivity of the result to these choices should be tested. Cumming (2014) argues that the free energies should be reported with their intervals across replicates, and Sandve et al. (2013) recommended recording the force field, the software version, the settings and the simulation length.
