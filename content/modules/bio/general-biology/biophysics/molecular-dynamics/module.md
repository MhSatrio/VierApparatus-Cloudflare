---
title: "Molecular Dynamics"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "Molecular dynamics simulation as a method for following the motions of biological molecules atom by atom: the force fields that describe the interactions, the numerical integration of the equations of motion, the sampling that must be adequate to be meaningful, the calculation of free energies from simulations and the validation and reporting that determine whether a simulation can be trusted."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how a molecular dynamics simulation is set up, run and analysed, from force field to trajectory."
  - "Judge a simulation by its sampling, its validation against experiment and the completeness of its reporting."
references:
  - "Karplus, M., & McCammon, J. A. (1983). Dynamics of proteins: Elements and function. Annual Review of Biochemistry, 52(1), 263-300. https://doi.org/10.1146/annurev.bi.52.070183.001403"
  - "Shaw, D. E., Maragakis, P., Lindorff-Larsen, K., Piana, S., Dror, R. O., Eastwood, M. P., Bank, J. A., Jumper, J. M., Salmon, J. K., Shan, Y., & Wriggers, W. (2010). Atomic-level characterization of the structural dynamics of proteins. Science, 330(6002), 341-346. https://doi.org/10.1126/science.1187409"
  - "Anfinsen, C. B. (1973). Principles that govern the folding of protein chains. Science, 181(4096), 223-230. https://doi.org/10.1126/science.181.4096.223"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

# Molecular Dynamics

Molecular dynamics simulates the motion of a molecule by calculating the forces on each atom from a model of their interactions and integrating Newton's equations forward in small time steps. The method gives a trajectory, a record of the positions of every atom over time, which can reveal motions that experiment cannot yet resolve directly. Karplus and McCammon (1983) described the early simulations of proteins and the elements of their dynamics, and the field has since grown to simulate proteins for microseconds and longer. Shaw et al. (2010) showed how long simulations of proteins could be compared with experiment at atomic resolution.

The chapters follow the steps of a simulation. The principles come first, followed by the force fields that describe the interactions, the numerical integration and the choice of time step. The adequacy of the sampling, which determines whether the simulation explores the states that matter, is then treated, along with the calculation of free energies from simulations. The validation of simulations against experiment and the reporting that allows them to be judged follow, and the final chapter addresses the limits of the method.

A simulation is a model of a molecule, and its results depend on the model and on how long it has been run. Ioannidis (2005) described how a result from a model that is not validated may be presented with a precision that it does not have, and Platt (1964) recommended the comparison of simulated and measured quantities that could show the model to be wrong.

Alberts et al. (2022) describe the biological molecules whose motions are simulated, and the simulation is useful only where its model captures the features that matter in the cell.
