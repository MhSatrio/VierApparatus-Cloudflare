---
title: "Why Integrate Omics Layers"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The reasons a biological system is studied across several molecular layers, including the flow of information from genome to transcript to protein to metabolite and the regulation that acts at each step, the way a single layer can miss a process that another reveals, the disagreement between layers that is itself informative, and the limits of integration when the layers measure different things at different times and scales."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the flow of information between molecular layers and the regulation that acts at each step."
  - "Explain why disagreement between two layers can be informative and why integration does not always increase agreement."
references:
  - "Hasin, Y., Seldin, M., & Lusis, A. (2017). Multi-omics approaches to disease. Genome Biology, 18(1), 83. https://doi.org/10.1186/s13059-017-1215-1"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Aebersold, R., & Mann, M. (2016). Mass-spectrometric exploration of proteome structure and function. Nature, 537(7620), 347-355. https://doi.org/10.1038/nature19949"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The central dogma of molecular biology describes a flow of information from DNA to RNA to protein, and Alberts et al. (2022) describe the regulation that acts at each step. A gene may be present in the genome and silent in the transcriptome, a transcript may be abundant and poorly translated, and a protein may be stable for a long time after its transcript has gone. Each layer therefore measures a different aspect of the same system, and a single layer gives an incomplete view. The motivation for integration is that the regulatory relationships between the layers are themselves the object of study.

Hasin et al. (2017) review the case for combining layers in the study of disease, where a genetic variant may act through changes in expression, protein abundance and metabolite levels that a single measurement would not link. The integration can show the chain from a variant to its consequence, and it can separate the variants that act through one route from those that act through another.

Disagreement between layers is informative. A gene whose transcript changes while its protein does not is a candidate for post-transcriptional regulation, and a protein whose abundance changes without a change in its transcript suggests a change in its stability or its translation. Aebersold and Mann (2016) describe the proteome as measured directly, and comparing it with the transcriptome reveals where the regulation acts. Integration does not always increase agreement; often its value lies in the disagreement.

The limits are real. The layers may be measured in different samples, at different times and with different sensitivities, so that a difference between them may reflect the measurement rather than the biology. The integration must account for these differences, and a claim of biological disagreement should be tested against the measurement variation of each layer.

Sandve et al. (2013) recommended recording the design of an analysis, and for an integrated study the matching of samples across layers and the measurement of each layer are part of that design.
