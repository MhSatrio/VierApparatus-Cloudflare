---
title: "Features and Their Annotation"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How a mass spectrometry measurement becomes a feature defined by its retention time and mass-to-charge ratio, how features are annotated by matching their masses and fragment spectra to reference libraries, the levels of confidence that distinguish a fully matched identification from a tentative one and from a feature that is only assigned a chemical class, and the isomers and adducts that make annotation ambiguous."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how a feature is defined by its mass and retention time and how it is matched to a reference library."
  - "State the confidence level of an annotation and explain why a mass match alone is not an identification."
references:
  - "Wishart, D. S., Feunang, Y. D., Marcu, A., Guo, A. C., Liang, K., Vázquez-Fresno, R., Sajed, T., Johnson, D., Li, C., Karu, N., Sayeeda, Z., Lo, E., Assempour, N., Berjanskii, M., Singhal, S., Arndt, D., Liang, Y., Badran, H., Grant, J., . . . Scalbert, A. (2018). HMDB 4.0: the human metabolome database for 2018. Nucleic Acids Research, 46(D1), D608-D617. https://doi.org/10.1093/nar/gkx1089"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A mass spectrometer records, for each ion it detects, its mass-to-charge ratio and the time at which it eluted from the chromatography column. A feature is a group of such ions that share a retention time and a mass pattern, and it stands for a compound present in the sample. The feature has no name. Its identity must be inferred by matching its mass and its fragment spectrum against a library of reference compounds, and the matching is the annotation step.

Wishart et al. (2018) describe the human metabolome database, which holds the reference spectra and masses that such matches are made against. A match to a library entry is good evidence only if the library contains the compound, and a feature from a metabolite absent from the library cannot be matched correctly even when its mass is distinctive. The annotation is therefore limited by the coverage of the library.

Annotation carries levels of confidence. A feature matched to a reference standard by both its retention time and its fragment spectrum is identified with high confidence. A feature matched only by its mass is a putative annotation, and a feature assigned only to a chemical class is less specific still. The distinction matters, since many metabolites have the same mass, and a mass match alone cannot separate them. Isomers, which share a formula, and adducts, which are the same molecule carrying an extra ion, make the problem more difficult.

Each annotation must be reported with its level. A list of identified metabolites that mixes confident and putative identities without distinction overstates what the analysis shows. The levels can be used to filter the list, and the filter should be stated.

Sandve et al. (2013) recommended recording the steps of an analysis, and the library, its version and the matching thresholds are the record of an annotation.
