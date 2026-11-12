---
title: "Reporting Simulations"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "What a molecular dynamics study must report for its results to be reproduced and judged, including the force field and its version, the system and its composition, the protocol of equilibration and production, the length and number of trajectories, the convergence checks, the software and the stored trajectories."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "List the information a molecular dynamics report must contain for another group to repeat the simulation."
  - "Judge a simulation study by whether its convergence, validation and reporting allow its claims to be checked."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Shaw, D. E., Maragakis, P., Lindorff-Larsen, K., Piana, S., Dror, R. O., Eastwood, M. P., Bank, J. A., Jumper, J. M., Salmon, J. K., Shan, Y., & Wriggers, W. (2010). Atomic-level characterization of the structural dynamics of proteins. Science, 330(6002), 341-346. https://doi.org/10.1126/science.1187409"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

A molecular dynamics result is reproducible only if another group can rebuild the system and run the simulation as it was run. Ioannidis (2005) described how the failure to report the conditions of a study makes its results impossible to test, and simulations are particularly exposed to this, since many choices of setup, parameters and analysis affect the outcome. The report is therefore the means by which a simulation becomes a result rather than an output.

The force field is named with its version and the parameters used for each molecule, including any modifications. The system is described by its composition, its size, the water model and the concentration and identity of the ions. The protocol is stated in full: the equilibration steps, the thermostat and barostat, the time step and the treatment of long-range electrostatics. Shaw et al. (2010) reported the protocol of their long simulations in this way, and the detail is what allows the comparison of studies.

The sampling is reported as the length and number of the trajectories, the convergence of the properties studied and the agreement among independent runs. A result reported from a single trajectory without convergence checks cannot be judged adequate. The analysis is described, including the frames discarded for equilibration and the statistical treatment of the averages and their errors.

The validation against experiment is reported with the comparisons made, the uncertainties of the experimental values and the quantities that were not reproduced. Platt (1964) recommended that the predictions of a simulation be stated so that they could be shown false, and a report that gives its predictions and their outcome in experiments allows that test.

The software and its version are named, the analysis scripts are archived and the trajectories are deposited where possible. The trajectories are the primary data, and their availability allows the analysis to be repeated and extended.

A molecular dynamics report is a set of choices made visible, and the simulation can be trusted only so far as those choices are shown and justified.
