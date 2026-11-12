---
title: "Functional Profiling of a Community"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How the functions encoded by a community are profiled from its reads or contigs by matching them to protein families and pathways, the normalisation of counts by gene length and sequencing depth, the difference between the gene content of a community and the activity it has, and the reasons a functional profile may differ from a taxonomic one even when both come from the same sample."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Build a functional profile of a metagenome by matching its genes to protein families and normalise the counts for comparison."
  - "Explain why a functional profile describes the genes a community carries rather than the processes it is performing."
references:
  - "Quince, C., Walker, A. W., Simpson, J. T., Loman, N. J., & Segata, N. (2017). Shotgun metagenomics, from sampling to analysis. Nature Biotechnology, 35(9), 833-844. https://doi.org/10.1038/nbt.3935"
  - "Altschul, S. F., Gish, W., Miller, W., Myers, E. W., & Lipman, D. J. (1990). Basic local alignment search tool. Journal of Molecular Biology, 215(3), 403-410. https://doi.org/10.1016/S0022-2836(05)80360-2"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A functional profile records which genes and protein families are present in a community. The reads or contigs are translated into protein sequences, which are matched by similarity to a database of families, using the search methods of the earlier topics. Altschul et al. (1990) describe the similarity search on which the matching depends, and the matches are counted for each family and pathway. Quince et al. (2017) describe functional analysis as one of the outputs of a shotgun study, alongside the taxonomic profile.

The counts must be normalised before samples are compared. A longer gene receives more reads than a shorter one of the same abundance, and a deeper sample yields more counts for every family. The counts are therefore divided by the gene length and scaled to a common depth, and the normalisation should be stated, since different choices give different rankings of families.

A functional profile describes the genes a community carries, not the activity it has. A gene present in the DNA may be silent, and the same family may be expressed at very different levels. Alberts et al. (2022) describe how the presence of a gene in a genome differs from its expression, and the difference must be kept in view when a profile is interpreted as a description of what the community does. Measuring activity requires transcripts or proteins from the same sample.

A functional profile and a taxonomic profile of the same sample may disagree. The taxonomic profile counts organisms, and a single abundant organism can carry many genes of one family, while several rare organisms may carry the same family in small numbers. The two profiles answer different questions, and they should be interpreted separately.

Sandve et al. (2013) recommended that the processing of the data be recorded, and the matching threshold, the database version and the normalisation are the steps that must be reported with a functional profile.
