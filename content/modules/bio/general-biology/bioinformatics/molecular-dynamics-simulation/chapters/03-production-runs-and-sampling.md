---
title: "Production Runs and Sampling"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How the production run of a molecular dynamics simulation is performed and sampled, covering the time step and the constraints that allow it, the output frequency of the trajectory, the use of replicate simulations started from different velocities, the sampling limitations that leave rare events unobserved within practical simulation times and the reasons a single long run is not automatically a better sample than several shorter ones."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Choose a time step, output frequency and run length for a production simulation and state the reason for each."
  - "Explain why replicate simulations give a better sample of conformations than a single run and how the rare events of a protein can be missed."
references:
  - "Phillips, J. C., Hardy, D. J., Maia, J. D. C., Stone, J. E., Ribeiro, J. V., Bernardi, R. C., Buch, R., Fiorin, G., Hénin, J., Jiang, W., McGreevy, R., Melo, M. C. R., Radak, B. K., Skeel, R. D., Singharoy, A., Wang, Y., Roux, B., Aksimentiev, A., Luthey-Schulten, Z., . . . Tajkhorshid, E. (2020). Scalable molecular dynamics on CPU and GPU architectures with NAMD. The Journal of Chemical Physics, 153(4), 044130. https://doi.org/10.1063/5.0014475"
  - "Abraham, M. J., Murtola, T., Schulz, R., Páll, S., Smith, J. C., Hess, B., & Lindahl, E. (2015). GROMACS: High performance molecular simulations through multi-level parallelism from laptops to supercomputers. SoftwareX, 1-2, 19-25. https://doi.org/10.1016/j.softx.2015.06.001"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The production run is the simulation whose trajectory is analysed. Its time step must be short enough to resolve the fastest motions, typically the vibrations of bonds involving hydrogen atoms, and the constraints that fix those bonds allow a longer step. Phillips et al. (2020) describe NAMD, whose production runs on large machines depend on these choices, and Abraham et al. (2015) describe the same considerations in GROMACS. The time step, the output frequency and the total length are settings that determine what the trajectory can show.

The output frequency controls the sampling of the trajectory. Writing a configuration too rarely misses fast processes, and writing too often produces files that are costly to analyse without adding information once the correlation between frames is short. The frequency should be matched to the timescales of the properties of interest, and the analysis should account for the correlation between successive frames.

Replicate simulations started from different initial velocities give a better sample than a single run of the same total length. Each replicate explores its region of conformational space, and the agreement between replicates is a test of whether the sampling is adequate. A single long run may remain trapped in one region, and the replicates reveal this, since they start from the same structure and can diverge.

Rare events are the limit of sampling. A conformational change that occurs once per microsecond may not appear in a simulation of a few hundred nanoseconds, and its absence is not evidence that it does not happen. Ioannidis (2005) described how the absence of an effect in a small sample is weak evidence that the effect is absent, and the same logic applies to the sampling of a simulation.

Alberts et al. (2022) describe the dynamic behaviour of proteins, from the fast fluctuations of residues to the slower changes of domains, and the simulation can observe only the timescales that its length allows. Sandve et al. (2013) recommended recording the settings of an analysis, and the time step, the output frequency, the run length and the number of replicates are the record of the sampling.
