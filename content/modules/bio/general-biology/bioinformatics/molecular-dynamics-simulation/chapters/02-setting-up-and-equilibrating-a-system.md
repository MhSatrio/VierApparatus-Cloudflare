---
title: "Setting Up and Equilibrating a System"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How a biomolecular system is built for simulation, covering the solvation of the molecule in a box of water, the addition of ions to a stated concentration and to neutralise the charge, the energy minimisation that removes steric clashes, the equilibration of temperature and pressure under restraints and the checks that show the system is stable before the production run begins."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the steps that build and prepare a solvated biomolecular system before the production run."
  - "State the checks that show an equilibrated system is stable and explain why a production run must not begin before them."
references:
  - "Hess, B., Kutzner, C., van der Spoel, D., & Lindahl, E. (2008). GROMACS 4: Algorithms for Highly Efficient, Load-Balanced, and Scalable Molecular Simulation. Journal of Chemical Theory and Computation, 4(3), 435-447. https://doi.org/10.1021/ct700301q"
  - "Abraham, M. J., Murtola, T., Schulz, R., Páll, S., Smith, J. C., Hess, B., & Lindahl, E. (2015). GROMACS: High performance molecular simulations through multi-level parallelism from laptops to supercomputers. SoftwareX, 1-2, 19-25. https://doi.org/10.1016/j.softx.2015.06.001"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Taschuk, M., & Wilson, G. (2017). Ten simple rules for making research software more robust. PLOS Computational Biology, 13(4), e1005412. https://doi.org/10.1371/journal.pcbi.1005412"
---

A simulation begins with a system that is physically reasonable. The biomolecule is placed in a box of solvent, usually water, with a margin that keeps its periodic images from interacting, and ions are added to the stated concentration and in a number that neutralises the net charge. The box, the margin, the ion concentration and the treatment of the periodic boundary are all set by the user, and each affects the results. Hess et al. (2008) describe the algorithms by which GROMACS handles such boxes, and Abraham et al. (2015) describe the workflow of the package.

The initial structure is then minimised. The placement of atoms from the solvation may leave steric clashes, and an energy minimisation moves the atoms to remove them. The minimisation is a local search, and it lowers the energy without exploring the thermal motion of the system. It prepares the system for the dynamics but does not represent its state.

Equilibration brings the system to the chosen temperature and pressure. The atoms of the biomolecule are often restrained at first, so that the solvent relaxes around them, and the restraints are released in stages. The equilibration should be long enough that the energy, the temperature, the pressure and the density stop drifting, and the checks are the evidence that this has happened.

A production run must not begin until the system is stable. A run started from an unequilibrated system includes a transient that contaminates the early trajectory, and the properties averaged from it are biased. The equilibration checks should be recorded, and the production run should start from the end of the equilibration.

Taschuk and Wilson (2017) recommended that the steps of research software be tested, and the checks on the equilibrated system are a test of the setup. Sandve et al. (2013) recommended recording the steps of an analysis, and the box, the ions, the minimisation and the equilibration protocol are the record of how the simulation was started.
