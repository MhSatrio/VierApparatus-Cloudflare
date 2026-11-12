---
title: "Platform Differences and Batch Effects"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How the measurements of different omics platforms differ in scale, dynamic range, coverage and noise, how these differences are normalised before layers are combined, the batch effects within each platform that can masquerade as biological relationships across layers, the design of batches that keep the biological groups balanced across platforms and the checks that confirm a correction has removed technical variation without removing the signal that integration seeks."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Normalise the data of two omics platforms to comparable scales and state the assumption each normalisation makes."
  - "Design batches so that the biological groups are balanced across platforms and check that a batch correction does not remove the signal."
references:
  - "Ritchie, M. D., Holzinger, E. R., Li, R., Pendergrass, S. A., & Kim, D. (2015). Methods of integrating data to uncover genotype-phenotype interactions. Nature Reviews Genetics, 16(2), 85-97. https://doi.org/10.1038/nrg3868"
  - "Hasin, Y., Seldin, M., & Lusis, A. (2017). Multi-omics approaches to disease. Genome Biology, 18(1), 83. https://doi.org/10.1186/s13059-017-1215-1"
  - "Taschuk, M., & Wilson, G. (2017). Ten simple rules for making research software more robust. PLOS Computational Biology, 13(4), e1005412. https://doi.org/10.1371/journal.pcbi.1005412"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Each omics platform produces data on its own scale. A transcriptome is measured as counts, a proteome as intensities over a wide dynamic range and a metabolome as peaks with their own noise. Before layers can be combined they must be brought to comparable scales, and the normalisation that does so makes assumptions. Quantile normalisation assumes that the distributions of the features should be the same across samples, and scaling by the variance assumes that each feature contributes equally. The choice of normalisation changes which features dominate an integrated analysis.

Batch effects are technical differences between groups of samples processed together. They arise within each platform and can be stronger than the biology. When two platforms are used on samples processed in different batches, a batch that affects one platform may coincide with a batch that affects the other, and the shared technical variation will look like a biological relationship across layers. Ritchie et al. (2015) note that the integration of layers is vulnerable to such confounding, and Hasin et al. (2017) stress that the batch structure must be recorded.

The design defends against batch confounding. The biological groups should be balanced across the batches of every platform, so that each batch contains samples from each group. A design in which all the controls were processed on one day and all the cases on another cannot separate the biology from the day, however sophisticated the analysis.

A batch correction removes technical variation, but it can also remove real signal if the correction is fitted to the biology. The check is to examine whether the biological groups remain separable after correction and whether known relationships survive, since a correction that removes all structure has removed the biology as well. Taschuk and Wilson (2017) recommended that software be tested on data with known structure, and a correction should be checked in this way.

Sandve et al. (2013) recommended recording the normalisation, the batch structure and the correction applied, since each changes the relationships that integration can find.
