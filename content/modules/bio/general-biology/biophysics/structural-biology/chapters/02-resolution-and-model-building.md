---
title: "Resolution and Model Building"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "How the resolution of a structural measurement determines which atoms can be placed in a model, the difference between a model that is consistent with the data and one that is uniquely determined by them, how side chains and loops are built into density of varying quality and how the uncertainty of individual atomic positions should be reported."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Relate the resolution of a density map to the atoms that can be placed reliably in it."
  - "Describe how a model is built and refined into experimental data and how its uncertainty is reported."
references:
  - "Kendrew, J. C., Bodo, G., Dintzis, H. M., Parrish, R. G., Wyckoff, H., & Phillips, D. C. (1958). A three-dimensional model of the myoglobin molecule obtained by X-ray analysis. Nature, 181(4610), 662-666. https://doi.org/10.1038/181662a0"
  - "Anfinsen, C. B. (1973). Principles that govern the folding of protein chains. Science, 181(4096), 223-230. https://doi.org/10.1126/science.181.4096.223"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

A structural measurement produces a map of density or of distances, and the model is built to fit it. The resolution of the map is the smallest spacing at which features can be distinguished, and it determines what can be placed in the model. At high resolution, individual atoms and the side chains of the protein are visible, and their positions can be assigned with confidence. At low resolution, only the backbone outline and the larger secondary structures may be seen, and the assignment of side chains is a guess informed by the sequence and the chemistry. Kendrew et al. (1958) built their myoglobin model at a resolution that revealed the chain's course, and the sequence assignment required further evidence.

A model that fits the data is not necessarily the correct one. Many arrangements of atoms can be consistent with a low-resolution map, and the choice among them depends on the constraints of chemistry and of the sequence. Anfinsen (1973) showed that the structure follows from the chemistry of the chain, and the model must obey the rules of bond lengths, angles and steric contacts as well as fit the density. A model that fits the density but violates these rules is not a valid structure.

Loops and flexible regions are the hardest to build. Their density is weak because the atoms move or are disordered, and the model in these regions is less certain. The uncertainty should be reported as a property of each part of the model, and the regions of low confidence should not be interpreted as if they were as well determined as the core.

Refinement improves the fit of the model to the data. The positions and the displacement parameters of the atoms are adjusted to reduce the discrepancy, and the process is repeated as the model is rebuilt. The risk is over-fitting, in which the model is adjusted to the noise of the data, and the protection is a cross-validation against data that were not used in refinement.

Ioannidis (2005) described how a model refined closely to noisy data may look convincing while being wrong in detail, and Platt (1964) recommended testing the model against independent constraints, which reveals the places where it has been over-fitted.

A structural model is a set of atomic positions with uncertainties, and the resolution of the data determines how precisely those positions can be stated.
