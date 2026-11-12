---
title: "Integration and Timescales"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The integration of the submodels of a whole-cell model on a shared timescale and the management of processes that operate on very different timescales, covering the synchronisation of submodels that update at different rates, the use of a common clock and the handling of events such as division that change the state of the cell discontinuously, the stochastic simulation of molecules present in small numbers alongside deterministic treatment of abundant species, the numerical stability of coupled stiff systems, the choice of time step and the verification that the result does not depend on it, and the reporting of the integration scheme and of its convergence."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Integrate submodels that operate on different timescales and state how the time step is chosen and verified."
  - "Explain why a result that depends on the time step is not yet a result and state the convergence test that reveals this."
references:
  - "Karr, J. R., Sanghvi, J. C., Macklin, D. N., Gutschow, M. V., Jacobs, J. M., Bolival, B., Assad-Garcia, N., Glass, J. I., & Covert, M. W. (2012). A whole-cell computational model predicts phenotype from genotype. Cell, 150(2), 389-401. https://doi.org/10.1016/j.cell.2012.05.044"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

The submodels of a whole-cell model must be run together, and they operate on very different timescales. Metabolic reactions occur in milliseconds, transcription and translation in minutes, and the cell cycle in tens of minutes or hours. Karr et al. (2012) integrated such processes on a shared clock, and the integration determines whether the coupled system behaves as the biology does. A fast process that is updated too rarely will be misrepresented, and a slow one that is updated too often wastes computation.

Some molecules are present in very small numbers, and their dynamics are dominated by chance. These are simulated stochastically, while abundant species are often treated deterministically, and the boundary between the two treatments must be chosen with care. Events such as division change the state of the cell discontinuously, and they require explicit handling so that the molecules are partitioned correctly between the daughters.

The time step is a numerical choice, and the result must not depend on it. A simulation that changes qualitatively when the time step is halved is not yet a valid result. Ioannidis (2005) described how a result that depends on an arbitrary choice of analysis is not robust, and the convergence of the simulation with the time step should be tested and reported.

The numerical stability of a coupled stiff system is a further concern, since some reactions are very fast compared with the rest. The integration scheme must be chosen so that these reactions do not cause instability, and its accuracy should be reported. Cumming (2014) argues that the variation of the output across replicate simulations should be reported with its interval, since the stochastic elements make each run different. Peng (2011) argued that the scheme and the time step must be recorded, so that the simulation can be repeated exactly.
