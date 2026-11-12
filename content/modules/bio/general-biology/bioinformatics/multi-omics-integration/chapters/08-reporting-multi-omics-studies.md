---
title: "Reporting Multi-Omics Studies"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "What a report of a multi-omics study must contain for its integrated results to be checked and repeated, including the sample design and the matching of samples across layers, the platform and processing of each layer, the normalisation and batch structure, the integration strategy and its model, the interpretation and the tests supporting it, and the deposition of each layer's data with the integrated tables and code."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "List the information a multi-omics report must contain for another group to repeat the integration and check its interpretation."
  - "Deposit each omics layer and the integrated results with identifiers so that the matching of samples can be verified."
references:
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Hasin, Y., Seldin, M., & Lusis, A. (2017). Multi-omics approaches to disease. Genome Biology, 18(1), 83. https://doi.org/10.1186/s13059-017-1215-1"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A multi-omics study produces several datasets and an integrated result, and a reader must be able to see how the layers were matched, normalised and combined. Peng (2011) argued that a computational result must be accompanied by the means of reproducing it, and for an integrated study the means are every layer's data, the matching and the integration method. A report that presents a factor or a network without these details asks the reader to accept the integration on trust.

The design and the matching are the first item. The number of samples, the layers measured for each, the means by which samples were matched and the balance of the biological groups across batches should be stated. Hasin et al. (2017) describe the design choices that govern whether integrated results are interpretable, and the report should show them.

The platforms and processing are the second item. Each layer's platform, its processing, its normalisation and its batch structure should be given, since each changes the data that integration combines. Wilkinson et al. (2016) set out the principles under which these inputs should be identified and made reusable.

The integration is the third item. The strategy, the model, the number of factors or modules, the consistency checks and the tests of the interpretation should be reported with their outcomes. A reader who wants to repeat the integration needs the model and its settings, and a reader who wants to judge the interpretation needs the tests.

The deposition is the fourth item. Each layer's data, the matching table, the integrated tables and the code should be placed in a public archive with identifiers. Sandve et al. (2013) recommended keeping the outputs of an analysis with its inputs and steps, and a deposited multi-omics dataset with its matching and code allows the integration to be repeated and checked.
