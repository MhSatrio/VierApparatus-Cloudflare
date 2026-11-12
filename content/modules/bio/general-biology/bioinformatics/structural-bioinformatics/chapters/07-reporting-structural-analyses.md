---
title: "Reporting Structural Analyses"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "What a report of a structural bioinformatics study must contain for its comparisons, models, classifications and predictions to be checked and repeated, including the structures and their entry identifiers, the templates and their alignment, the software and its version, the scores with their normalisation and reference sets, the validation performed and the deposition of the models and the alignments with their identifiers."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "List the information a structural bioinformatics report must contain for another group to repeat the comparison or model."
  - "Deposit a model and its alignment with the report so that the structure can be checked without rebuilding it."
references:
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Berman, H. M. (2000). The Protein Data Bank. Nucleic Acids Research, 28(1), 235-242. https://doi.org/10.1093/nar/28.1.235"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A structural result is a claim about a shape, and a reader must be able to see the structures, the methods and the choices that produced it. Peng (2011) argued that the means of reproducing a computational result must accompany it, and for a structural study this means the structures, the templates, the alignments, the scores and the validation. A figure of a superposed structure, without the score and the reference set behind it, cannot be assessed.

The structures are the first item. Each should be identified by its Protein Data Bank entry and chain, with the region used and the version of the entry, since the structure and its coverage determine every later claim. Berman (2000) describes the archive from which the identifiers are drawn, and the identifiers are the means of retrieving the structures.

The methods are the second item. The software and its version, the comparison or modelling method, the alignment of target to template, the scoring function and its normalisation, and the reference set against which significance was judged should be listed. The sensitivity of the result to these choices should be reported when it was tested.

The validation is the third item. The geometric checks, the independent tests and the robustness checks performed should be described with their outcomes, since a result that passed them can be trusted in proportion. Sandve et al. (2013) recommended recording the steps of an analysis, and the validation is part of those steps.

The deposition is the fourth item. The models, the alignments and the classifications used should be placed in a public archive with their identifiers, so that the structural claim can be checked and reused. Wilkinson et al. (2016) set out the principles under which such data should be findable and reusable, and a deposited model with its alignment meets them.
