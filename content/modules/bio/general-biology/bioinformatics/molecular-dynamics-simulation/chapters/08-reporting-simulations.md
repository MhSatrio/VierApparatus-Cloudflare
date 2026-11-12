---
title: "Reporting Simulations"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "What a report of a molecular dynamics study must contain for its trajectories and their analyses to be reproduced and judged, including the system and its composition, the force field, water model and software with their versions, the protocol of setup, equilibration and production, the sampling and replicates, the convergence and error estimates and the deposition of the input files and the trajectories with their identifiers."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "List the information a molecular dynamics report must contain for another group to repeat the simulation and its analysis."
  - "Deposit the input files and the trajectories with the report so that the reported properties can be recomputed."
references:
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Abraham, M. J., Murtola, T., Schulz, R., Páll, S., Smith, J. C., Hess, B., & Lindahl, E. (2015). GROMACS: High performance molecular simulations through multi-level parallelism from laptops to supercomputers. SoftwareX, 1-2, 19-25. https://doi.org/10.1016/j.softx.2015.06.001"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A molecular dynamics result is a set of averages from a trajectory, and an average without its method is not a result. Peng (2011) argued that a computational result must be accompanied by the means of reproducing it, and for a simulation the means are the input files, the parameters, the protocol and the trajectory. A reported average, with no description of its sampling or error, cannot be judged or compared with another simulation.

The system and its parameters are the first item. The molecule, its composition, the box, the water model, the ions and their concentration, and the force field with its version should be stated. Abraham et al. (2015) describe the GROMACS package, whose version and settings belong in the report, since the same system run with different software can differ in detail.

The protocol is the second item. The minimisation, the equilibration stages and their lengths, the thermostat and barostat, the time step and the constraints and the production run length should be given. The protocol determines the state from which the sampling begins, and a reader who wants to repeat the simulation needs it in full.

The sampling and the error are the third item. The number of replicates, the sampling time, the convergence checks and the statistical error of each reported average should be stated. A property reported without its error or its convergence is incomplete, and a reader cannot judge whether a difference between two simulations is significant.

The deposition is the fourth item. The input files, the parameter files and the trajectories should be placed in a public archive with identifiers, so that the analysis can be repeated and checked. Wilkinson et al. (2016) set out the principles under which such data should be findable and reusable, and a deposited trajectory with its inputs meets them. Sandve et al. (2013) recommended keeping the outputs of an analysis with its inputs and steps.
