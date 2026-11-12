---
title: "Scoring Functions and Their Limits"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The scoring functions that rank docking poses, including the empirical and knowledge-based functions that sum terms for hydrogen bonds, hydrophobic contact and steric fit, the approximations that make them fast, the errors that come from the neglect of solvation and entropy and the reasons a docking score correlates only loosely with a measured binding affinity and is poor at ranking different ligands."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the terms a docking scoring function sums and the approximations it makes to be fast."
  - "Explain why a docking score ranks the poses of one ligand better than it ranks different ligands against one another."
references:
  - "Trott, O., & Olson, A. J. (2010). AutoDock Vina: Improving the speed and accuracy of docking with a new scoring function, efficient optimization, and multithreading. Journal of Computational Chemistry, 31(2), 455-461. https://doi.org/10.1002/jcc.21334"
  - "Friesner, R. A., Banks, J. L., Murphy, R. B., Halgren, T. A., Klicic, J. J., Mainz, D. T., Repasky, M. P., Knoll, E. H., Shelley, M., Perry, J. K., Shaw, D. E., Francis, P., & Shenkin, P. S. (2004). Glide: A New Approach for Rapid, Accurate Docking and Scoring. 1. Method and Assessment of Docking Accuracy. Journal of Medicinal Chemistry, 47(7), 1739-1749. https://doi.org/10.1021/jm0306430"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
---

A scoring function estimates the energy of a pose from its contacts. It sums terms for the hydrogen bonds between ligand and receptor, for the hydrophobic contact between their surfaces, for the steric clash of atoms that are too close and for the loss of freedom as the ligand is fixed. Trott and Olson (2010) describe a function that combines such terms with a simple form, chosen so that poses can be scored quickly, and Friesner et al. (2004) describe a function designed for accurate ranking of the poses of a single ligand.

The approximations are the source of the error. Solvation, the effect of the surrounding water on the energy of binding, is treated crudely or not at all, and the entropy of the ligand and the protein is only estimated. These neglected terms are often as large as the terms that are included, and their omission is the main reason that scores fail to reproduce measured affinities.

A docking score is therefore a good guide to the pose of one ligand and a poor guide to the ranking of several different ligands. The poses of one molecule can be ordered by their scores with some reliability, but the scores of different molecules include differences in size, flexibility and solvation that the function does not capture. A ranking of many ligands by docking score is a hypothesis to be tested, not a measurement of affinity.

Ioannidis (2005) described how selecting the best of many results inflates their apparent value, and a virtual screen that selects the top scores from many molecules is exposed to this bias. The hit rate of the screen, measured against experiment, is the test of its value, and a screen that reports only its best scores without the rate of confirmation is misleading.

Platt (1964) recommended that a test be designed to exclude alternatives, and the test of a scoring function is its agreement with measured affinities for a set of complexes, which should be reported with the function's error.
