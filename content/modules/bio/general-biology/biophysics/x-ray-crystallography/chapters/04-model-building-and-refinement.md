---
title: "Model Building and Refinement"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "How an atomic model is built into the electron density calculated from the diffraction data, how the model is refined by adjusting atomic positions and displacement parameters to reduce the discrepancy with the observed intensities, the role of stereochemical restraints and the cycle of building and refinement that converges on a final model."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how an atomic model is fitted into an electron density map and then refined against the diffraction data."
  - "Explain the role of stereochemical restraints in refinement and why they are needed at moderate resolution."
references:
  - "Brünger, A. T. (1992). Free R value: A novel statistical quantity for assessing the accuracy of crystal structures. Nature, 355(6359), 472-475. https://doi.org/10.1038/355472a0"
  - "Anfinsen, C. B. (1973). Principles that govern the folding of protein chains. Science, 181(4096), 223-230. https://doi.org/10.1126/science.181.4096.223"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Kendrew, J. C., Bodo, G., Dintzis, H. M., Parrish, R. G., Wyckoff, H., & Phillips, D. C. (1958). A three-dimensional model of the myoglobin molecule obtained by X-ray analysis. Nature, 181(4610), 662-666. https://doi.org/10.1038/181662a0"
---

Once the phases are known, the electron density is calculated, and the model is built into it. The chain is traced through the density, the side chains are placed where the density shows them, and water and ligands are added where the density supports them. Kendrew et al. (1958) built their model by hand in this way, and the work of fitting the chain to the density is the step that most depends on the experience of the crystallographer, although software now assists it.

The model is refined by adjusting the positions and the displacement parameters of the atoms to reduce the difference between the calculated and observed intensities. At moderate resolution the number of observations is not enough to determine every parameter freely, and the refinement must be restrained by the stereochemistry of the molecule. The restraints require that bond lengths and angles take values seen in known structures, and Anfinsen (1973) showed that the folded chain obeys the rules of its chemistry, so the restraints encode the expected geometry.

The restraints are a source of bias. A restraint that pulls a bond towards an ideal value can prevent the model from following the density when the real geometry differs, and the weight of the restraints must be chosen so that the data can override them where the data are strong. The choice of weight affects the final geometry and the apparent accuracy of the model.

Building and refinement alternate. A model is refined, the difference density is examined for regions that are unexplained, the model is corrected and refined again, and the cycle continues until the model stops improving. The difference density, which shows where the calculated density is too high or too low, guides the corrections, and a model that leaves large unexplained peaks has not converged.

Ioannidis (2005) described how repeated cycles of building and refinement can converge on a model that fits the data it has seen, and the test that the model is correct requires independent data, as the validation chapter describes. Platt (1964) recommended that the model's features be checked against independent evidence at each stage, which prevents the cycle from following the noise.

Building and refinement turn the density into a model, and the cycle is disciplined by the restraints, the difference density and the independent checks.
