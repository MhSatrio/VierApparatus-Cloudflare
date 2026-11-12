---
title: "Early, Intermediate and Late Integration"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The three strategies for combining omics data, namely early integration that concatenates the features of all layers into one matrix before analysis, intermediate integration that learns a shared representation across layers while keeping their structure, and late integration that analyses each layer separately and combines the results, with the strengths and failure modes of each and the reasons the choice must match the question and the relation between the layers."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe early, intermediate and late integration and the kind of data each treats."
  - "Explain why early integration can be dominated by the layer with the most features and what each strategy assumes about the layers."
references:
  - "Ritchie, M. D., Holzinger, E. R., Li, R., Pendergrass, S. A., & Kim, D. (2015). Methods of integrating data to uncover genotype-phenotype interactions. Nature Reviews Genetics, 16(2), 85-97. https://doi.org/10.1038/nrg3868"
  - "Hasin, Y., Seldin, M., & Lusis, A. (2017). Multi-omics approaches to disease. Genome Biology, 18(1), 83. https://doi.org/10.1186/s13059-017-1215-1"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Early integration concatenates the features of all the layers into a single matrix, with one row per sample and a column for every feature of every layer, and then applies an ordinary analysis. It is simple and it allows any method to be used, but the layers are not on comparable scales, and the layer with the most features tends to dominate the result. Ritchie et al. (2015) describe the approach and its practical problems, and a standardisation of each layer before concatenation is needed to prevent one layer from swamping the others.

Intermediate integration learns a representation that is shared across the layers while keeping the structure of each. Methods such as joint factor models find components that explain variation in several layers at once, so that a factor with loadings on the transcriptome and the proteome describes a process visible in both. The approach uses the relations between the layers directly, and it is the strategy that most closely matches the idea of integration. It is also the most complex, and its results depend on the model and on the number of factors chosen.

Late integration analyses each layer on its own and combines the results at the end. Each layer is tested, and the lists of changed features are overlapped or ranked together. The approach is robust to differences in scale and makes the analysis of each layer transparent, but it cannot find a relationship that is too weak to be significant in any single layer, since the information is combined only after each analysis is complete.

The choice depends on the question and on how the layers relate. If the layers are expected to share a signal strongly, early or intermediate integration can find it. If they measure different things, late integration is safer, since forcing a shared representation on unrelated layers creates spurious structure. Ioannidis (2005) described how flexible analysis produces findings that are less reliable than they appear, and the strategy should be fixed before the data are combined.

Hasin et al. (2017) discuss these strategies in the context of disease, and Sandve et al. (2013) recommended recording the strategy, the standardisation and the model of an analysis, since the integrated result depends on each.
