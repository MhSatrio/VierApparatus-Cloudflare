---
title: "Simulating Proteins in Water"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "How a protein is simulated in an explicit or implicit solvent, the setup of a simulation box with water and ions, the treatment of long-range electrostatics, the equilibration that brings the system to the desired temperature and pressure, and the question of how far the simulated protein in water represents the protein in the cell."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how a protein is placed in a solvent box with ions and equilibrated before production."
  - "Explain how the solvent model and the treatment of long-range electrostatics affect the simulated dynamics."
references:
  - "Shaw, D. E., Maragakis, P., Lindorff-Larsen, K., Piana, S., Dror, R. O., Eastwood, M. P., Bank, J. A., Jumper, J. M., Salmon, J. K., Shan, Y., & Wriggers, W. (2010). Atomic-level characterization of the structural dynamics of proteins. Science, 330(6002), 341-346. https://doi.org/10.1126/science.1187409"
  - "Karplus, M., & McCammon, J. A. (1983). Dynamics of proteins: Elements and function. Annual Review of Biochemistry, 52(1), 263-300. https://doi.org/10.1146/annurev.bi.52.070183.001403"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

A protein in a simulation is surrounded by water and ions, and the solvent is either represented explicitly, as many water molecules, or implicitly, as a continuum with a dielectric constant. Explicit water is more realistic and far more costly, since the number of water molecules is often several times the number of protein atoms. Karplus and McCammon (1983) discussed the representation of the solvent in the simulation of proteins, and the choice determines which dynamics the simulation can capture. Shaw et al. (2010) simulated proteins in explicit solvent at long timescales, which required considerable computing resources.

The simulation box is filled with water and ions to a chosen concentration, and the box must be large enough that the protein does not interact with its own images across the periodic boundaries. The ions neutralise the charge of the protein and set the ionic strength, which screens the electrostatic interactions as described in the molecular biophysics topic. The box size and the ion concentration are part of the conditions, and they must be reported.

Long-range electrostatics are treated by methods that sum the interactions over the periodic images, since a simple cut-off would distort the forces between distant charges. The choice of method affects the forces and the dynamics, and an inadequate treatment can produce artefacts such as an artificial ordering of the water or a distortion of the protein's structure.

Equilibration brings the system to the chosen temperature and pressure before the production run. The water is relaxed around the protein, the thermostat and barostat are applied, and the structure is allowed to settle. The production run begins only after the properties have stabilised, and the equilibration must be shown rather than assumed.

The question of how far a simulated protein represents the cell arises here. The cell contains crowding molecules, membranes, partners and ions at different concentrations, and a simulation in a simple solvent omits these. Ioannidis (2005) described how a simulation in idealised conditions may be assumed to describe the cell, and Platt (1964) recommended comparisons with experimental measurements under conditions closer to the cell.

Simulating a protein in water is a model of the protein's environment as much as of the protein, and the representation of that environment limits what the simulation can show.
