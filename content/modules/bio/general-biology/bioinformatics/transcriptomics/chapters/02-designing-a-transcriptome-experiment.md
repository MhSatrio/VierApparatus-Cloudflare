---
title: "Designing a Transcriptome Experiment"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How a transcriptome experiment is designed to answer its question, including the choice of conditions and their controls, the number of biological replicates needed to detect a change, the batch structure that prevents processing effects from being mistaken for biology, the planning of sequencing depth and the reasons a design must be fixed before the samples are collected."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Design a transcriptome experiment with matched controls, biological replicates and a batch structure that separates processing effects from biology."
  - "Explain why biological replicates, not additional sequencing of the same sample, are needed to estimate variation between conditions."
references:
  - "Wang, Z., Gerstein, M., & Snyder, M. (2009). RNA-Seq: a revolutionary tool for transcriptomics. Nature Reviews Genetics, 10(1), 57-63. https://doi.org/10.1038/nrg2484"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A transcriptome experiment answers a question about a difference, and the design determines whether the difference can be seen. The conditions compared must differ in the factor of interest and in nothing else. Controls, such as untreated samples or a vehicle-only group, establish the baseline, and the comparison is made against them. Wang et al. (2009) noted the importance of experimental design in the early uses of the method, and a design that is weak cannot be rescued by the analysis.

Biological replicates are the central requirement. Sequencing the same RNA twice, as technical replicates, measures the noise of the library, but it does not measure the variation between organisms or cells. The variation between biological replicates is what determines whether a change in expression is larger than the natural spread, and a study with few biological replicates can detect only very large changes. The number needed is estimated from the variation expected, which may be taken from pilot data, and the design should be fixed in advance.

Batches must be structured. Samples processed on different days, with different reagents or by different people, can differ in ways that look like biology. A design that places all the treated samples in one batch and all the controls in another confounds the two, and no analysis can separate them afterwards. The samples should be distributed across batches so that each batch contains both conditions, and the batch should be recorded and included in the model.

Platt (1964) recommended designs that can exclude alternative explanations, and a transcriptome design that controls the batch does exactly this for the effect of processing. Ioannidis (2005) described how flexibility in analysis inflates false findings, and a design fixed before the data are collected limits that flexibility.

Sandve et al. (2013) recommended that the design of an analysis be recorded, and the conditions, the replicates, the batches and the sequencing depth form the design that must be reported.
