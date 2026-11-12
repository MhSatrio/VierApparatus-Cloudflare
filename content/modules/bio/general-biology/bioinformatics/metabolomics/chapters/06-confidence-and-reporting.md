---
title: "Confidence and Reporting"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How the confidence of each metabolite identification is stated and carried through an analysis, the reporting standards that a metabolomic study must meet, the list of information that allows the identifications, the processing and the statistics to be repeated and the deposition of the raw data and the annotated feature tables with their accessions."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "State the confidence level of every metabolite in a result and keep that level through the statistics and the pathway analysis."
  - "List the information a metabolomic report must contain for the identifications and statistics to be repeated."
references:
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Wishart, D. S., Feunang, Y. D., Marcu, A., Guo, A. C., Liang, K., Vázquez-Fresno, R., Sajed, T., Johnson, D., Li, C., Karu, N., Sayeeda, Z., Lo, E., Assempour, N., Berjanskii, M., Singhal, S., Arndt, D., Liang, Y., Badran, H., Grant, J., . . . Scalbert, A. (2018). HMDB 4.0: the human metabolome database for 2018. Nucleic Acids Research, 46(D1), D608-D617. https://doi.org/10.1093/nar/gkx1089"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A metabolomic result is only as strong as the identifications beneath it. Peng (2011) argued that the means of reproducing a computational result must accompany it, and for metabolomics this means the raw data, the processing, the annotation with its confidence and the statistics. A list of named metabolites with their changes, without the confidence of each identity, cannot be judged, since a reader cannot tell which names are secure and which are guesses.

The confidence level of each identification must be reported with the identity, and it must survive into the statistics and the pathway analysis. A pathway built from putative identifications should be labelled as such, and a conclusion that depends on a low-confidence identity should say so. Wishart et al. (2018) describe the database whose entries and their evidence support these levels, and the reference used for each identity should be given.

The information needed for repetition is extensive. It includes the instrument and its method, the chromatography, the mass accuracy, the library and its version, the normalisation, the quality control, the filters, the missing-value rule and the statistical model, together with the software and its versions. Sandve et al. (2013) recommended recording the steps of an analysis, and each of these is a step that changes the result.

The data must be deposited. The raw files, the feature tables and the annotations should be placed in a public repository with accessions, so that the identifications can be checked against the spectra. Wilkinson et al. (2016) set out the principles under which such data should be findable and reusable, and a deposited dataset with its annotation levels meets them.

A metabolomic report that states the confidence of its identities, its processing and its data is one that another group can build upon, and that is the standard the field needs.
