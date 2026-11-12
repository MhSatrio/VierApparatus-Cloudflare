---
title: "Ensemble Docking and Receptor Flexibility"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "Ensemble approaches that account for the flexibility of the receptor by docking a ligand against several conformations, covering the sources of receptor conformations from crystal structures, from molecular dynamics snapshots and from computational ensembles, the selection of conformations that represent the binding site without redundancy, the combination of scores across the ensemble by the best score or by an average, the risk that the best score across many conformations rewards chance, the calibration of the ensemble ranking against measured potencies, and the reporting of the conformations, the combination rule and the agreement with measurement."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Select a set of receptor conformations that represents the binding site without redundancy and state the source of each."
  - "Choose a rule for combining scores across an ensemble and state the chance-rewarding risk that the choice creates."
references:
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

A receptor is not a rigid object, and a ligand may bind to a conformation that a single structure does not show. Ensemble docking addresses this by placing a candidate ligand against several conformations of the binding site, which may come from crystal structures of different complexes, from snapshots of a molecular dynamics simulation or from a computational ensemble. The ensemble must represent the flexibility of the site without including many near-identical conformations that would over-weight one region of conformational space.

The combination of scores across the ensemble requires a rule, and the choice of rule matters. Taking the best score across many conformations is attractive because a ligand may bind one conformation well, but it also rewards chance, since the more conformations are tested, the more likely one of them will give a favourable score by accident. Ioannidis (2005) described how a search over many options produces a best result that is inflated by selection, and the number of conformations tested must be considered when judging the best score.

The ranking produced by the ensemble should be calibrated against measured potencies, and the agreement reported with its interval. Cumming (2014) argues that a ranking agreement should be quantified with its uncertainty, since a small set of measured ligands gives a wide interval on any correlation. The rule and the calibration must be fixed before the ranking is used to choose compounds.

Munafò et al. (2017) argued that the conformations used, the rule for combining scores and the agreement with measurement should all be reported. A reader cannot judge an ensemble ranking without knowing which conformations were used and how they were combined, and the report should give the number of conformations tested along with the selected rule.
