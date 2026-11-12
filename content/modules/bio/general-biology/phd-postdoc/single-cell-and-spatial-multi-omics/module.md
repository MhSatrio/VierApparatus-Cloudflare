---
title: "Single-Cell and Spatial Multi-Omics"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The measurement of several molecular layers, such as transcriptome, epigenome and proteome, in individual cells and in their spatial context within tissues, covering the isolation and barcoding of single cells and nuclei, the amplification of low input material and its bias, the integration of data from several modalities measured on the same or on matched cells, the spatial transcriptomic methods that map expression onto tissue sections, the computational clustering and trajectory inference that define cell states and their transitions, the statistical treatment of sparse count data with its dropout and batch effects, and the reporting of cell-type composition and marker genes with their uncertainty."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how single-cell and spatial methods capture several molecular layers and state the bias each introduces."
  - "Analyse sparse single-cell count data with appropriate normalisation and report cell-type proportions with intervals."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

Single-cell and spatial methods have made it possible to measure molecules in each cell and to place each cell within the tissue it inhabits. Bulk measurements average over millions of cells and can hide the diversity that matters, while single-cell methods reveal the composition of a tissue and the states its cells occupy. Ioannidis (2005) described how averages can conceal the heterogeneity on which a conclusion depends, and the single-cell approach addresses this directly.

Several molecular layers can now be measured from the same cells, including transcription, chromatin accessibility and protein abundance. Each measurement has its own technical bias, and the bias differs between modalities and between cells. The integration of modalities must account for these differences, and the claim that two layers agree should be tested rather than assumed. Peng (2011) argued that the methods that produce a dataset determine what can be concluded from it, and the description of the method is part of the result.

Spatial transcriptomic methods map expression onto a tissue section, so that each measurement carries a location. This allows the investigator to ask where a cell state occurs and what neighbours it has, questions that dissociated cells cannot answer. The resolution of each method differs, and a method that measures spots containing several cells requires deconvolution, which introduces its own uncertainty.

Single-cell count data are sparse, with many zeros that reflect both true absence and technical dropout. Normalisation, batch correction and the choice of clustering method all affect the result, and each must be stated. Cumming (2014) argues that the uncertainty of each estimate, such as the proportion of a cell type, should be reported with its interval, since a cluster with few cells has a wide interval that a single point estimate conceals.

The chapters that follow examine the isolation of cells, the bias of amplification, the integration of modalities, the spatial methods, the computational definition of cell states, the statistics of sparse data, the batch and dropout problems and the reporting of results. Munafò et al. (2017) argued that the code and the processed data should be deposited with the raw data, so that the definition of each cell state can be checked by others.
