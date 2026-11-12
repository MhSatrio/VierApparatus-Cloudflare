---
title: "Reporting Predicted Structures"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "What a report of a predicted protein structure must contain for it to be interpreted and repeated, including the method and its version, the sequence and the database versions used to build the alignment, the depth of the alignment, the per-residue and aligned-error confidence, the validation performed and the deposition of the model with its confidence data and the sequence it was built from."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "List the information a report of a predicted structure must contain for a reader to judge its reliability."
  - "Deposit a predicted model with its confidence data so that the claims made from it can be checked."
references:
  - "Jumper, J., Evans, R., Pritzel, A., Green, T., Figurnov, M., Ronneberger, O., Tunyasuvunakool, K., Bates, R., Žídek, A., Potapenko, A., Bridgland, A., Meyer, C., Kohl, S. A. A., Ballard, A. J., Cowie, A., Romera-Paredes, B., Nikolov, S., Jain, R., Adler, J., . . . Hassabis, D. (2021). Highly accurate protein structure prediction with AlphaFold. Nature, 596(7873), 583-589. https://doi.org/10.1038/s41586-021-03819-2"
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A predicted structure is a computational result, and its report must let a reader judge how far to rely on it. Peng (2011) argued that a computational result must be accompanied by the means of reproducing it, and for a predicted model these means include the sequence, the alignment, the method and its version, and the confidence values. A figure of a predicted fold without these details conveys a shape but not its reliability.

The sequence and the alignment are the first items. The exact sequence modelled, including any construct boundaries, and the databases searched to build the alignment, with their versions, should be stated. The depth of the alignment, the number of sequences that supported the prediction, is one of the strongest indicators of its reliability and must be reported with it.

The confidence data are the second item. The per-residue confidence and the predicted aligned error should be deposited with the model, since a reader needs them to judge each region. Jumper et al. (2021) describe these measures, and the model without them is incomplete.

The validation and the method are the third item. The version of the predictor, its settings and any comparison with experimental structures should be reported, along with the class of the protein and the accuracy that the method has shown on comparable targets. Sandve et al. (2013) recommended recording the steps of an analysis, and these are the steps that determine the model.

The deposition is the fourth item. The predicted model, its confidence data and the sequence should be placed in a public archive with identifiers, so that another group can use the model and check the claims made from it. Wilkinson et al. (2016) set out the principles under which such data should be findable and reusable, and a deposited model with its confidence data meets them.
