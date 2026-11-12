---
title: "Relaxation and Protein Dynamics"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "How NMR relaxation rates report the motions of individual bonds in a protein on picosecond to nanosecond timescales, the model-free analysis that separates the overall tumbling of the molecule from the internal motions, the dynamics of backbone and side chains and the conformational exchange on slower timescales that relaxation experiments reveal."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how relaxation rates of nuclei report the motions of the bonds they are attached to."
  - "Explain the model-free analysis and how it separates overall tumbling from internal motion."
references:
  - "Shaw, D. E., Maragakis, P., Lindorff-Larsen, K., Piana, S., Dror, R. O., Eastwood, M. P., Bank, J. A., Jumper, J. M., Salmon, J. K., Shan, Y., & Wriggers, W. (2010). Atomic-level characterization of the structural dynamics of proteins. Science, 330(6002), 341-346. https://doi.org/10.1126/science.1187409"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

Nuclear spins relax back to equilibrium after a perturbation, and the rate of relaxation depends on the fluctuating magnetic fields that the molecule's motion produces at each nucleus. The rate therefore reports the motion of the bond to which the nucleus is attached, on a timescale from picoseconds to nanoseconds. Measured for each residue along the chain, the relaxation rates give a profile of the mobility of the backbone and side chains, showing which parts are rigid and which are flexible. Shaw et al. (2010) compared the dynamics of simulations with such measurements, and the relaxation data are one of the principal experimental checks on dynamics.

The overall tumbling of the molecule also affects relaxation. A large molecule tumbles slowly and relaxes faster than a small one, so the internal motions must be separated from the tumbling before they can be interpreted. The model-free analysis of Lipari and Szabo describes the internal motion by an order parameter, which measures how restricted the bond is, and an effective correlation time, which measures how fast the motion occurs. The analysis fits these parameters to the relaxation rates, with the tumbling determined from the molecule's shape.

The order parameter ranges from one for a rigid bond to zero for a freely moving one. Values near one indicate a well-ordered structure, while low values indicate flexibility, and the profile along the chain reveals the regions that move. The interpretation depends on the model, and the model must be justified, since several models can fit the same rates.

Relaxation experiments also detect slower motions. Conformational exchange on a timescale of microseconds to milliseconds broadens the resonances of the atoms involved, and this broadening is measured by the relaxation dispersion experiments. The exchange reveals the minor states that a protein populates, which matter for its function, and the slow motion is inaccessible to the fast relaxation measures.

Ioannidis (2005) described how the order parameters from a model may be interpreted as physical motions when they reflect the model's assumptions, and Platt (1964) recommended a test that could separate the alternatives, such as the consistency of the parameters across independent fields or temperatures.

Relaxation gives the mobility of each part of a protein, and its analysis separates the motions of the molecule from the motions of its bonds.
