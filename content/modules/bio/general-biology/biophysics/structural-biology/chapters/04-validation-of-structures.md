---
title: "Validation of Structures"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "How a structural model is validated: the geometric checks of bond lengths, angles and steric contacts, the fit to the experimental data and its free-residual measure, the test of the model against data withheld from refinement and the comparison of the structure with independent evidence about the molecule's function."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the geometric and experimental checks that validate a structural model."
  - "Explain why a free-residual test against withheld data guards against over-fitting."
references:
  - "Brünger, A. T. (1992). Free R value: A novel statistical quantity for assessing the accuracy of crystal structures. Nature, 355(6359), 472-475. https://doi.org/10.1038/355472a0"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Anfinsen, C. B. (1973). Principles that govern the folding of protein chains. Science, 181(4096), 223-230. https://doi.org/10.1126/science.181.4096.223"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

A structural model must pass several validations before it is trusted. The geometric check tests whether the bond lengths, bond angles and torsions lie within the ranges observed in known structures, and whether atoms come too close to one another. Anfinsen (1973) showed that the folded chain obeys the rules of chemistry, and a model that violates them is unlikely to be right, however well it fits the data. The geometric check catches errors that the fit alone would not reveal.

The fit to the data is measured by a residual, which expresses the disagreement between the observed and calculated quantities. Brünger (1992) introduced the free R value, which computes the residual on a set of reflections withheld from refinement. The free R value guards against over-fitting, because a model that has fitted the noise of the data will fit the working reflections better than the free ones. A large gap between the working and free residuals is the signature of over-fitting, and the free value is the honest measure of the model's accuracy.

The test against withheld data is the central safeguard. Any parameter that is adjusted to fit the data is tested on data that were not used in the adjustment, and the test is only as good as the independence of the withheld set. A set that is chosen badly, or that shares its structure with the working set, gives a falsely reassuring free value.

Comparison with independent evidence is the final test. A structure must agree with the functional data on the molecule, such as the effect of mutations on the active site, the known binding partners and the measured activity. A structure that fits the diffraction data but places the active site in a position inconsistent with the function is not a correct model of the molecule in its active state.

Ioannidis (2005) described how a validation that checks the model against the data it was refined on gives an optimistic impression, and Platt (1964) recommended the comparison with withheld and independent evidence as the test that could reveal an error.

Validation is the set of tests that a model must pass beyond fitting the data it was built from, and each test guards against a different kind of error.
