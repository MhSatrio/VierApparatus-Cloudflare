---
title: "Integrative Modelling"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The construction of models of large or flexible molecular assemblies by combining data from several sources, covering the sources of restraints such as crosslinking mass spectrometry, small-angle scattering, electron microscopy at low resolution, and computational predictions of individual subunits, the scoring function that expresses how well a model satisfies each source, the sampling of many configurations to find those that satisfy the restraints, the weighting of the sources and the test that conclusions do not depend on an arbitrary weight, the assessment of the precision and the uncertainty of the resulting ensemble, and the reporting of the restraints, the scoring and the models with the same care as high-resolution structures."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Combine data from several structural sources into a scoring function and test whether the conclusion depends on the weight given to each source."
  - "Report an integrative model with its restraints, its ensemble and its uncertainty."
references:
  - "Jumper, J., Evans, R., Pritzel, A., Green, T., Figurnov, M., Ronneberger, O., Tunyasuvunakool, K., Bates, R., Žídek, A., Potapenko, A., Bridgland, A., Meyer, C., Kohl, S. A. A., Ballard, A. J., Cowie, A., Romera-Paredes, B., Nikolov, S., Jain, R., Adler, J., . . . Hassabis, D. (2021). Highly accurate protein structure prediction with AlphaFold. Nature, 596(7873), 583-589. https://doi.org/10.1038/s41586-021-03819-2"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

Many biological assemblies are too large or too flexible to be determined by a single method, so their models are built by combining several sources of information. Crosslinking mass spectrometry identifies pairs of residues that are close together, small-angle scattering gives the overall shape, low-resolution electron microscopy gives the envelope, and computational predictions give the structures of individual subunits. Jumper et al. (2021) showed that predicted subunit structures can now be accurate enough to serve as components of such models, and the integration uses them together with the experimental data.

Each source is expressed as a restraint, and a scoring function measures how well a candidate model satisfies all of them. The sampling method searches for models with good scores, and the result is an ensemble of models rather than a single structure. Ioannidis (2005) described how a model can fit the data it was built to fit while failing on data it was not, and the scoring must be checked against sources that were not used in its construction.

The weight given to each source determines the balance between them, and the choice of weight can change the conclusion. A sensitivity analysis that varies the weights and shows whether the conclusion persists is necessary. Cumming (2014) argues that the uncertainty of the conclusion should be reported with its interval, and a conclusion that holds only for one weight is weak.

The precision of the ensemble and the uncertainty of the model should be reported, and the restraints and the scoring should be deposited so that the model can be checked. Munafò et al. (2017) argued that an integrative model deserves the same level of reporting as a high-resolution structure, because its uncertainty is often greater and its consequences can be larger.
