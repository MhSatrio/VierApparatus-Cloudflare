---
title: "Spatial Transcriptomics"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The measurement of gene expression in its spatial context within a tissue section, covering the spot-based methods that capture transcripts at defined locations and whose spots may contain several cells, the imaging-based methods that detect individual transcripts in situ with high resolution but a limited gene panel, the deconvolution of spot data into cell-type proportions using a reference from single-cell data, the registration of the tissue image to the molecular map, the spatial statistics that test whether a cell type or a gene is clustered, randomly distributed or dispersed, and the reporting of the resolution, the panel and the uncertainty of each spatial claim."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Choose between spot-based and imaging-based spatial methods according to the resolution and gene coverage the question requires."
  - "Deconvolve spot data into cell-type proportions and report the uncertainty of each proportion."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

Spatial transcriptomics maps the expression of genes onto the architecture of a tissue, so that the location of each transcript and each cell type can be seen. Spot-based methods capture transcripts from defined positions on a slide, each spot receiving the molecules from the cells that overlie it. Imaging-based methods detect individual transcripts within the tissue, giving higher resolution but usually measuring a limited panel of genes. The choice between them depends on whether the question requires cellular resolution or broad gene coverage.

A spot can contain several cells of different types, so the expression in each spot is a mixture. Deconvolution estimates the proportion of each cell type in each spot, using a reference of cell-type profiles usually derived from single-cell data. The estimates are uncertain, since the reference may not match the tissue and the mixing may not be linear, and the uncertainty should be reported with the proportions. Ioannidis (2005) described how a model that fits the data well may still be wrong about the components it infers, and the deconvolution must be checked against independent evidence.

The tissue image must be registered to the molecular map, so that each spot or transcript is placed correctly on the histology. Registration errors shift the assignment of molecules to cells and can create false neighbourhoods. The method of registration and its accuracy should be reported, since the spatial claims depend on it.

Spatial statistics test whether a cell type or a gene is clustered, randomly distributed or dispersed across the tissue. The choice of test and its null model determine the conclusion, and a clustering that appears under one model may disappear under another. Cumming (2014) argues that the strength of spatial association should be reported with its interval, and Munafò et al. (2017) argued that the null model should be stated, so that the spatial claim can be judged.
