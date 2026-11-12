---
title: "Multimodal Integration"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The integration of several molecular modalities measured from single cells, such as transcriptome, chromatin accessibility and surface protein abundance, covering the measurement of two or more modalities in the same cell and the paired data that allow direct comparison, the matched measurement in separate cells that requires an alignment of cell states across datasets, the anchoring methods that find correspondences between datasets through shared neighbourhoods, the assessment of whether the correspondence reflects biology or an artefact of the integration, the inference of regulatory links between chromatin accessibility and expression, and the reporting of the integration method and of the degree of agreement with its uncertainty."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Distinguish paired multimodal measurement from matched measurement in separate cells and state the alignment each requires."
  - "Assess whether an integration reflects biology or an artefact of the integration method."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

Integration combines measurements of different molecular layers so that the relationship between them can be studied. The simplest case is paired measurement, in which two modalities are obtained from the same cell, and the relationship can then be examined directly. Paired measurements are technically demanding, and many datasets instead measure each modality in different cells, which requires the states of the cells to be aligned computationally before they can be compared.

Alignment across datasets finds correspondences between cells that occupy similar states. Anchoring methods identify pairs of cells that are neighbours in both datasets and use them to map one onto the other. The method can be powerful, but it can also force correspondences that do not exist, because every dataset is mapped onto every other by construction. Ioannidis (2005) described how a method can produce apparent agreement whatever the underlying truth, and the test of an integration must be independent of the method.

The agreement between modalities must be assessed for biological meaning. A cell state that appears in both datasets after integration may be real, or it may be an artefact of forcing the datasets to match. Tests include examining whether the correspondence holds in held-out data and whether the integration preserves differences that are known to be biological. Cumming (2014) argues that the strength of the agreement should be reported with its uncertainty rather than as a single measure of success.

The relationship between chromatin accessibility and gene expression can suggest regulatory links, in which an accessible region is associated with the expression of a nearby gene. Such links are associations, and their causal interpretation requires the perturbation tests described in other chapters. Peng (2011) argued that the method and the parameters used to infer each link should be reported, so that the regulatory claim can be reproduced.
