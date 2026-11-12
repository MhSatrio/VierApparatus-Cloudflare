---
title: "Atomic Model Building in Cryo-EM"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "How an atomic model is built into a cryo-EM density map, the use of known high-resolution structures of components and of stereochemical restraints, the flexible fitting of models into maps of moderate resolution and the validation that tests whether a cryo-EM model is supported by its map and by its geometry."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how an atomic model is built into a cryo-EM map of a given resolution."
  - "State the validation that tests whether a cryo-EM model is supported by its map and by its geometry."
references:
  - "Brünger, A. T. (1992). Free R value: A novel statistical quantity for assessing the accuracy of crystal structures. Nature, 355(6359), 472-475. https://doi.org/10.1038/355472a0"
  - "Bai, X.-c., McMullan, G., & Scheres, S. H. W. (2015). How cryo-EM is revolutionizing structural biology. Trends in Biochemical Sciences, 40(1), 49-57. https://doi.org/10.1016/j.tibs.2014.10.005"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Anfinsen, C. B. (1973). Principles that govern the folding of protein chains. Science, 181(4096), 223-230. https://doi.org/10.1126/science.181.4096.223"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

A cryo-EM map is a density, and an atomic model is built into it in the same way as a crystal structure. The chain is traced through the density, and the high-resolution structures of the domains or of homologous proteins are fitted where they are available, since they provide the geometry that the density at moderate resolution cannot. Anfinsen (1973) showed that the chain follows the rules of its chemistry, and the fitted models must obey these rules, which restrain the placement of atoms where the map is ambiguous.

At moderate resolution, the map may not define the backbone and side chains uniquely, and the fitting is constrained by the geometry of known structures. Flexible fitting moves a model within the map to improve the agreement, while keeping the geometry reasonable. The method can improve a model, but it can also drive it into a shape that fits the density without being correct, and the restraints must be weighed carefully.

The validation of a cryo-EM model combines several measures. The fit of the model to the map is measured by a correlation over the atoms, and the geometry is checked against the stereochemical standards. The model is also compared with the half-maps, so that the agreement is tested against the data that were not used to build the final average. Brünger (1992) established the principle that a model must be tested against data withheld from its construction, and the cryo-EM half-map test follows that principle.

A model fitted to a map may be wrong in the regions where the map is weak. Peripheral domains and flexible loops are often poorly resolved, and the model in these regions should be reported as uncertain rather than as determined. Ioannidis (2005) described how a complete-looking model may hide regions that the data do not support, and Platt (1964) recommended reporting the regions of confidence and the regions of doubt.

Atomic models of cryo-EM maps are built from the density and the chemistry together, and their reliability is set by the resolution of the map and by the validation that tests the fit.
