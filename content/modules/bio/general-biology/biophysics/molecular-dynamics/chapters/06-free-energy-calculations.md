---
title: "Free Energy Calculations"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "How the free energies of binding, conformational change and mutation are calculated from molecular dynamics simulations, including free energy perturbation, thermodynamic integration and umbrella sampling, the convergence and hysteresis checks these calculations require and the sources of error that can make a computed free energy differ from a measured one."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe free energy perturbation, thermodynamic integration and umbrella sampling and the quantity each computes."
  - "State the checks that show a computed free energy is converged and the errors that can make it differ from experiment."
references:
  - "Zwanzig, R. W. (1954). High-temperature equation of state by a perturbation method. I. Nonpolar gases. The Journal of Chemical Physics, 22(8), 1420-1426. https://doi.org/10.1063/1.1740409"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Anfinsen, C. B. (1973). Principles that govern the folding of protein chains. Science, 181(4096), 223-230. https://doi.org/10.1126/science.181.4096.223"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

Free energy perturbation was introduced by Zwanzig (1954), who showed that the difference in free energy between two states can be estimated from an average over the other state's distribution of the exponential of the energy difference. In a simulation, the energy of the system is changed gradually from one state to the other, and the free energy change is accumulated from the small steps. The method gives the free energy of binding, of mutation and of other changes that a simulation can represent, and it is the basis of much of the computational estimation of binding affinity.

Thermodynamic integration computes the same difference by integrating the average of the derivative of the energy with respect to a coupling parameter that runs from one state to the other. The integral is evaluated numerically at several values of the parameter, and the convergence of each point must be checked. Umbrella sampling restrains the system along a reaction coordinate with a bias potential, so that all the values along the coordinate are visited, and the bias is removed by a reweighting that recovers the unbiased free energy profile.

Each calculation requires checks. Free energy perturbation is sensitive to the overlap between the two states, and a poor overlap gives a biased estimate that converges slowly. Thermodynamic integration requires that every coupling window be converged, and a window that is not converged distorts the integral. Umbrella sampling requires that the windows overlap, and the agreement between forward and reverse calculations, the hysteresis, reveals whether the sampling is adequate.

The computed free energy can differ from the measured one for several reasons. The force field may be inaccurate, the sampling may be incomplete, the states may not be those of the experiment, or the calculation may omit a contribution such as the entropy of the solvent. Ioannidis (2005) described how a computed free energy that agrees with experiment in a few cases may be presented as general, and the discrepancies must be reported with the successes.

Platt (1964) recommended a test that could show the calculation to be wrong, and the comparison of computed and measured binding free energies for a set of ligands is such a test, since it reveals systematic errors.

Free energy calculations turn a trajectory into a thermodynamic quantity, and their value depends on the convergence checks and on comparison with experiment.
