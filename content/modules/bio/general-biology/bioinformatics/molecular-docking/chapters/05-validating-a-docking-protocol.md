---
title: "Validating a Docking Protocol"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How a docking protocol is validated before it is applied to new ligands, including the redocking of a ligand to the structure from which it was taken and the measure of the root-mean-square deviation of the recovered pose, the enrichment test of a virtual screen against known actives and inactives, the decoy sets that prevent a score from succeeding by chance and the reporting of the validation that shows how far the protocol can be trusted."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Validate a docking protocol by redocking a known ligand and measuring how closely the recovered pose matches the experimental one."
  - "Test a virtual screen for enrichment against known actives and decoys and state what the enrichment shows."
references:
  - "Trott, O., & Olson, A. J. (2010). AutoDock Vina: Improving the speed and accuracy of docking with a new scoring function, efficient optimization, and multithreading. Journal of Computational Chemistry, 31(2), 455-461. https://doi.org/10.1002/jcc.21334"
  - "Friesner, R. A., Banks, J. L., Murphy, R. B., Halgren, T. A., Klicic, J. J., Mainz, D. T., Repasky, M. P., Knoll, E. H., Shelley, M., Perry, J. K., Shaw, D. E., Francis, P., & Shenkin, P. S. (2004). Glide: A New Approach for Rapid, Accurate Docking and Scoring. 1. Method and Assessment of Docking Accuracy. Journal of Medicinal Chemistry, 47(7), 1739-1749. https://doi.org/10.1021/jm0306430"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A docking protocol must be validated before its results are believed. The standard test is redocking: a ligand whose experimental pose is known is removed from its complex and docked back into the same structure, and the pose recovered by the protocol is compared with the experimental one. The difference is measured as a root-mean-square deviation of the atoms of the ligand, and a deviation below about two angstroms is generally taken as success. Friesner et al. (2004) assessed their method in this way, and the test is a basic check of whether the search and the scoring can reproduce a known answer.

Redocking is a weak test when the structure was determined with the ligand present, since the site is then already in the right shape. A stronger test uses structures with ligands that differ from one another, and it checks whether the protocol works across the variety of sites that the target presents. Trott and Olson (2010) describe a program whose accuracy must be tested in this way for each target.

A virtual screen is validated by enrichment. A set of known actives is mixed with a set of decoys, molecules that resemble the actives in properties but are presumed inactive, and the screen is judged by whether it ranks the actives above the decoys. Enrichment is the rate of actives among the top ranked compounds compared with the rate in the whole set. A screen that enriches for actives is useful, and a screen that does not is not, whatever its scores.

Ioannidis (2005) described how a result that is selected from many can overstate its meaning, and a protocol that is tuned until it succeeds on the validation set is in danger of this. Platt (1964) recommended a test that can exclude alternatives, and a validation on compounds not used in tuning is the test that can show the protocol to be wrong.

Sandve et al. (2013) recommended recording the validation, and the redocking deviations, the enrichment and the composition of the decoy set should be reported with any screen.
