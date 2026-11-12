---
title: "Structure Calculation from NMR Restraints"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "How an ensemble of NMR structures is calculated from distance, dihedral and other restraints by simulated annealing and energy minimisation, the role of the force field in filling the gaps between restraints, the meaning of the spread of the ensemble and the difference between the precision of an ensemble and its accuracy."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how structures are calculated from NMR restraints by simulated annealing and energy minimisation."
  - "Distinguish the precision of an NMR ensemble from its accuracy and explain why the two can differ."
references:
  - "Anfinsen, C. B. (1973). Principles that govern the folding of protein chains. Science, 181(4096), 223-230. https://doi.org/10.1126/science.181.4096.223"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

A set of NMR restraints does not define a unique structure, because the restraints are sparse relative to the number of degrees of freedom in the molecule. The calculation therefore produces an ensemble: many structures, each generated from random starting conformations and refined by a simulated annealing procedure that satisfies the restraints while obeying the force field. Each member of the ensemble satisfies the data, and the differences among the members show where the data leave the structure undetermined. Anfinsen (1973) showed that the chain has a defined fold, and the ensemble represents the range of folds consistent with the data.

The force field fills the gaps. Between the restraints, the bond lengths, the angles, the van der Waals contacts and the electrostatics are determined by the force field, and the structure in regions with few restraints depends on it. The force field's energy function combines the restraint energies with its own, and the relative weight of the two determines how far the structure is driven by the data and how far by the force field.

The spread of the ensemble reports its precision, the reproducibility of the calculation. A tight ensemble is precise, but precision is not accuracy. An ensemble can agree closely with itself while being systematically wrong, if the restraints are biased or the force field distorts the structure. Ioannidis (2005) described how a precise ensemble may be presented as an accurate structure, and Platt (1964) recommended tests of accuracy, such as the comparison with a structure determined by another method or with the mutational effects on function.

The number of restraints per residue indicates how well the structure is determined. A protein with many long-range restraints has a well-defined fold, while one with few restraints per residue has a broad ensemble that describes the uncertainty honestly. The ensemble should be reported with the restraints and the statistics of their satisfaction, so that the reader can see how much the data constrain.

Restraint violations are a sign of error. A calculated structure that violates a restraint by a large amount either indicates an incorrect restraint, an error in the assignment or a conformation that cannot be reconciled with the data, and such violations must be examined rather than discarded.

Structure calculation converts restraints into an ensemble of models, and the ensemble is a faithful report only when its precision and its accuracy are both assessed.
