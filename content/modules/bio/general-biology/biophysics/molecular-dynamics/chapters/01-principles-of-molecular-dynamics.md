---
title: "Principles of Molecular Dynamics"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "The principles of molecular dynamics: the classical description of atoms as particles with positions and velocities, the forces derived from an energy function, the use of Newton's equations to generate a trajectory and the statistical mechanics that relates the trajectory to the thermodynamic averages that experiments measure."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how forces derived from an energy function drive the motion of atoms in a simulation."
  - "Relate a time average along a trajectory to the ensemble average that statistical mechanics defines."
references:
  - "Karplus, M., & McCammon, J. A. (1983). Dynamics of proteins: Elements and function. Annual Review of Biochemistry, 52(1), 263-300. https://doi.org/10.1146/annurev.bi.52.070183.001403"
  - "Zwanzig, R. W. (1954). High-temperature equation of state by a perturbation method. I. Nonpolar gases. The Journal of Chemical Physics, 22(8), 1420-1426. https://doi.org/10.1063/1.1740409"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

A molecular dynamics simulation treats each atom as a point with a mass, a position and a velocity, and it assumes that the atoms move according to the classical equations of motion. The force on each atom is the negative gradient of an energy function that depends on the positions of all the atoms, and the energy function contains terms for the bonds, the angles, the torsions and the non-bonded interactions between atoms. Karplus and McCammon (1983) set out this framework for proteins, and it remains the basis of the method. The simulation is a numerical solution of a large set of coupled equations.

The classical approximation neglects the quantum behaviour of electrons, which is adequate for the motions of most atoms but not for the making and breaking of bonds, and the reactive processes of enzymes are often treated by a combined quantum and classical method. The approximation is a choice that must be justified for the question, since a simulation that cannot represent a bond breaking cannot describe a chemical reaction.

A simulation produces a time series of states, and the statistical mechanics of the earlier topic relates the average of a property along the trajectory to the ensemble average. The relation holds when the trajectory samples the ensemble adequately, which requires that the simulation be long enough to visit the relevant states many times. The perturbation methods of Zwanzig (1954) provide the basis for many of the free energy calculations that use simulations.

The time average and the ensemble average are equal only in the limit of long simulation and adequate sampling. A short simulation may give a time average that depends on the starting configuration, and the comparison with an experimental ensemble average is valid only when the simulation has equilibrated. The equilibration must be checked, not assumed.

Ioannidis (2005) described how a simulation that is presented as a result may depend on its starting point and length, and Platt (1964) recommended the comparison with measured averages that tests whether the simulation has reached the ensemble.

A molecular dynamics trajectory is a set of atomic motions generated from a model, and its averages describe the ensemble only when the sampling is adequate.
