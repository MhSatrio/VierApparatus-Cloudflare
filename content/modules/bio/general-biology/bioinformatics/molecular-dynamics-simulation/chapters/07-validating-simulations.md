---
title: "Validating Simulations"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How a molecular dynamics simulation is validated against experimental data, including the comparison of simulated structures with crystal and NMR structures, the agreement of simulated observables such as NMR order parameters and scattering curves with measurements, the test of a force field on known thermodynamic properties and the recognition that agreement with a few observables does not prove that the simulation is correct."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Compare a simulated structure or observable with an experimental measurement and state the agreement that the comparison supports."
  - "Explain why agreement with a few observables does not validate every property of a simulation."
references:
  - "Hornak, V., Abel, R., Okur, A., Strockbine, B., Roitberg, A., & Simmerling, C. (2006). Comparison of multiple Amber force fields and development of improved protein backbone parameters. Proteins: Structure, Function, and Bioinformatics, 65(3), 712-725. https://doi.org/10.1002/prot.21123"
  - "Berman, H. M. (2000). The Protein Data Bank. Nucleic Acids Research, 28(1), 235-242. https://doi.org/10.1093/nar/28.1.235"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A simulation is a model, and its results must be compared with experiment before they are believed. The comparison is most often made with structures. A simulated protein is compared with its crystal or NMR structure, usually by the root-mean-square deviation of its backbone, and the agreement shows whether the simulation stays near the experimental state. Berman (2000) describes the archive from which the experimental structures are drawn, and the comparison is only as good as the structures used.

Observables offer a more demanding test. Nuclear magnetic resonance measures order parameters that describe the mobility of bonds, and a simulation can predict them from its trajectory. Scattering experiments measure a curve that a simulated ensemble can reproduce. The agreement of these observables tests the dynamics as well as the average structure, and a simulation that matches the structure but not the mobility is wrong in an important respect.

The force field can be tested on thermodynamic properties of small molecules, such as their densities and free energies of solvation, against experimental values. Hornak et al. (2006) describe the development and testing of the parameters for a family of force fields, and such tests are the basis of confidence in the parameters.

Agreement with a few observables does not validate the whole simulation. A force field may reproduce the structures that were compared and fail on the populations of other states, and a simulation may match one NMR observable while misplacing another. Platt (1964) recommended comparisons that discriminate between alternatives, and the most informative test is one that the simulation could fail.

The validation must be reported with its observables and their comparison, since a reader needs to know which properties were tested and which were not. Sandve et al. (2013) recommended recording the checks performed, and a validation section that lists the observables compared and the agreement obtained is the record of how far the simulation can be trusted.
