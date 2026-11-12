---
title: "Molecular Dynamics Simulation"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The computational workflow of molecular dynamics simulation of biomolecules, covering the choice of force field and water model, the setup and equilibration of a system, the production runs and their sampling, the analysis of trajectories for structure, flexibility and interaction, the convergence and statistical error of simulated properties and the reporting that allows a simulation to be repeated and its results judged."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Set up and equilibrate a biomolecular simulation and state the choices of force field, water model and ensemble made at each step."
  - "Judge whether a simulated property has converged and report its statistical uncertainty."
references:
  - "Abraham, M. J., Murtola, T., Schulz, R., Páll, S., Smith, J. C., Hess, B., & Lindahl, E. (2015). GROMACS: High performance molecular simulations through multi-level parallelism from laptops to supercomputers. SoftwareX, 1-2, 19-25. https://doi.org/10.1016/j.softx.2015.06.001"
  - "Hess, B., Kutzner, C., van der Spoel, D., & Lindahl, E. (2008). GROMACS 4: Algorithms for Highly Efficient, Load-Balanced, and Scalable Molecular Simulation. Journal of Chemical Theory and Computation, 4(3), 435-447. https://doi.org/10.1021/ct700301q"
  - "Hornak, V., Abel, R., Okur, A., Strockbine, B., Roitberg, A., & Simmerling, C. (2006). Comparison of multiple Amber force fields and development of improved protein backbone parameters. Proteins: Structure, Function, and Bioinformatics, 65(3), 712-725. https://doi.org/10.1002/prot.21123"
  - "Phillips, J. C., Hardy, D. J., Maia, J. D. C., Stone, J. E., Ribeiro, J. V., Bernardi, R. C., Buch, R., Fiorin, G., Hénin, J., Jiang, W., McGreevy, R., Melo, M. C. R., Radak, B. K., Skeel, R. D., Singharoy, A., Wang, Y., Roux, B., Aksimentiev, A., Luthey-Schulten, Z., . . . Tajkhorshid, E. (2020). Scalable molecular dynamics on CPU and GPU architectures with NAMD. The Journal of Chemical Physics, 153(4), 044130. https://doi.org/10.1063/5.0014475"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A molecular dynamics simulation follows the motion of the atoms of a biomolecule and its solvent over time, by integrating Newton's equations of motion with forces given by a force field. The method gives a trajectory, a sequence of configurations from which structure, flexibility and interactions can be measured. Abraham et al. (2015) describe GROMACS, a widely used simulation package, and Phillips et al. (2020) describe NAMD, another, and both turn the force field into a trajectory on large computers.

The topic follows the workflow of a simulation. It begins with the choice of force field and water model, since these determine every result that follows, and Hornak et al. (2006) describe the development of the protein backbone parameters of one widely used family. The setup and equilibration of the system come next, then the production run and the analysis of the trajectory. The final chapters address convergence and the reporting that allows the simulation to be repeated.

A simulation is a model of a physical system with approximate forces, and its trajectory is a sample of configurations, not a measurement. The reader must know the length of the sampling, the convergence of the properties and the uncertainty of the averages, since a short simulation can give confident-looking results that are not representative.
