---
title: "Model Validation and Agreement with Data"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The validation of a structural model against the data and against independent evidence, covering the geometric validation that tests bond lengths, angles, torsions and steric clashes against known chemistry, the fit to the experimental data measured by the agreement statistics appropriate to each method, the cross-validation that withholds data during model building and tests the model on them, the comparison with independent structural evidence such as mutagenesis or functional data, the detection of overfitting when the model fits the noise, and the statement of which regions of the model are well supported and which are not."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Validate a structural model geometrically and against the experimental data, and state what each test can detect."
  - "Identify regions of a model that are poorly supported and report them separately from well-supported regions."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

Validation tests whether a structural model is a plausible description of the molecule and whether it agrees with the evidence. Geometric validation checks that bond lengths, angles and torsions lie within the ranges observed in known structures, and that no two atoms are placed so close that they could not coexist. A model that fails these tests is wrong in its local chemistry, whatever its fit to the data. Ioannidis (2005) described how a check that a model passes can give false reassurance when it is not the right check, and each test should be understood.

The fit to the experimental data is measured by statistics appropriate to each method. Each statistic has a different meaning, and a good value for one does not guarantee a good value for another. A model may fit the data well in one region and poorly in another, and the overall statistic can hide this. Cumming (2014) argues that the uncertainty of each region should be reported, since an average fit conceals the local variation.

Cross-validation withholds part of the data during model building and tests the model on it. A model that fits the withheld data as well as the used data is less likely to be overfitted. Overfitting, in which the model reproduces the noise rather than the signal, is one of the most common errors in structural work, and its detection depends on this independent test.

Independent structural evidence, such as mutagenesis, functional assays or data from a different method, tests the model in ways that the original data could not. Agreement with independent evidence strengthens confidence in the model, and disagreement indicates a problem to be investigated. Peng (2011) argued that the means to check a result should be available, and the validation statistics and the independent evidence should be reported with the model. Munafò et al. (2017) argued that the regions of the model that are poorly supported should be identified, so that readers do not mistake uncertainty for detail.
