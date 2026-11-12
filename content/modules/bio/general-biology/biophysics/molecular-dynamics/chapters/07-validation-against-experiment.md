---
title: "Validation Against Experiment"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "How the predictions of a molecular dynamics simulation are validated against experimental measurements, including the comparison of structures, of fluctuations measured by nuclear magnetic resonance and crystallographic B-factors, of the rates of conformational change and of the free energies of binding, and the interpretation of agreement and disagreement."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Compare simulated structures, fluctuations and rates with the corresponding experimental measurements."
  - "Interpret agreement and disagreement between a simulation and experiment in terms of the force field and the sampling."
references:
  - "Shaw, D. E., Maragakis, P., Lindorff-Larsen, K., Piana, S., Dror, R. O., Eastwood, M. P., Bank, J. A., Jumper, J. M., Salmon, J. K., Shan, Y., & Wriggers, W. (2010). Atomic-level characterization of the structural dynamics of proteins. Science, 330(6002), 341-346. https://doi.org/10.1126/science.1187409"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Karplus, M., & McCammon, J. A. (1983). Dynamics of proteins: Elements and function. Annual Review of Biochemistry, 52(1), 263-300. https://doi.org/10.1146/annurev.bi.52.070183.001403"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

A simulation is valid to the extent that it reproduces experiment. The comparison is made across several kinds of quantity. The average structure of the simulation is compared with a crystal or NMR structure by the root-mean-square deviation of the atoms. The fluctuations of the atoms are compared with the B-factors of crystallography or with the order parameters of NMR, which report how much each part of the protein moves. The rates of conformational change are compared with the rates measured by relaxation methods. Karplus and McCammon (1983) discussed the fluctuations that these measures reflect, and Shaw et al. (2010) compared simulated dynamics with experiment across several timescales.

Agreement must be interpreted with care. A simulation that reproduces the average structure may still get the fluctuations wrong, and a simulation that reproduces a rate may do so for the wrong reasons. The comparison should use several independent quantities, since each can agree by accident, and the agreement across quantities is stronger evidence than the agreement of one.

Disagreement is informative. If a simulation predicts a fluctuation that the experiment does not show, the cause may be the force field, which overestimates the mobility, or the sampling, which has not converged, or the experiment, which averages over a different population. Each explanation predicts a different pattern of disagreement across quantities, and the pattern is the means of separating them.

The experimental measurements themselves carry uncertainty and assumptions. A B-factor reflects both the motion and the static disorder of the crystal, and an order parameter depends on the model used to extract it from the relaxation. The comparison must therefore account for the uncertainty of the measurement as well as of the simulation.

Ioannidis (2005) described how a simulation that agrees with one measurement may be presented as validated when the agreement is a coincidence of the chosen comparison, and Platt (1964) recommended comparisons that could reveal the simulation to be wrong, such as a prediction for a mutant or a condition that has not yet been measured.

Validation tests whether the simulation captures the experiment, and the discrepancies are as useful as the agreements in revealing what the model gets wrong.
