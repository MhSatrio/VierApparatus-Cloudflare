---
title: "Force Fields and Water Models"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The force fields that describe the energies of biomolecules as functions of their atoms, including the bonded terms for bonds, angles and torsions and the non-bonded terms for electrostatics and van der Waals interactions, the parameter sets for proteins and nucleic acids and their development against experimental and quantum data, the water models that represent the solvent and the reasons the choice of force field and water model changes the structures and dynamics that a simulation produces."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the terms of a biomolecular force field and what each represents."
  - "Explain why the choice of force field and water model changes the simulated structures and why the choice must be justified."
references:
  - "Hornak, V., Abel, R., Okur, A., Strockbine, B., Roitberg, A., & Simmerling, C. (2006). Comparison of multiple Amber force fields and development of improved protein backbone parameters. Proteins: Structure, Function, and Bioinformatics, 65(3), 712-725. https://doi.org/10.1002/prot.21123"
  - "Hess, B., Kutzner, C., van der Spoel, D., & Lindahl, E. (2008). GROMACS 4: Algorithms for Highly Efficient, Load-Balanced, and Scalable Molecular Simulation. Journal of Chemical Theory and Computation, 4(3), 435-447. https://doi.org/10.1021/ct700301q"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A force field is a set of functions and parameters that gives the potential energy of a molecular system as a function of its atomic positions. The bonded terms describe the stretching of bonds, the bending of angles and the rotation of torsions, and the non-bonded terms describe the electrostatic attraction and repulsion of charges and the van der Waals interactions of atoms that are close. Hornak et al. (2006) describe how the parameters of one family of biomolecular force fields were developed and tested, particularly for the backbone of proteins, where the choice of parameters determines the preferred conformations of the chain.

The parameters are fitted to reference data, which may be quantum calculations of small molecules or experimental measurements of properties. A parameter set fitted to one kind of data may reproduce it well and fail on another, and the test of a force field is its agreement with data that were not used to fit it. The version of the force field must be reported, since the parameters change between versions.

The water model is the representation of the solvent, and it has as large an effect as the force field. Water models differ in the number of sites, the charges and the geometry, and they give different densities, diffusion rates and hydrogen-bond patterns. Hess et al. (2008) describe GROMACS 4, whose algorithms the simulations of such models rely on, and the water model must be chosen with the force field, since the two were fitted together.

Alberts et al. (2022) describe the role of water in determining the structure of proteins and the interactions of molecules, and the water model is therefore not a detail of the simulation. A simulation with a poor water model can misplace the hydrophobic collapse of a protein or the binding of a ligand, and the consequences must be considered when the model is chosen.

Sandve et al. (2013) recommended recording the parameters of an analysis, and the force field, the water model, the ion parameters and the software version define the physical model that the simulation represents.
