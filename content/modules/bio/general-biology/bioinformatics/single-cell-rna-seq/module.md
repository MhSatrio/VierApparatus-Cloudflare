---
title: "Single-Cell RNA-seq"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The sequencing of the transcriptomes of individual cells, covering the methods that capture single cells and label their transcripts, the quality control of cell barcodes and their counts, the normalisation and dimensionality reduction of sparse data, the clustering of cells into types and states, the integration of datasets from several experiments and the interpretation of cell types and trajectories with the cautions that the data demand."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how a single-cell RNA-seq method captures and labels the transcripts of individual cells and what limits the number of genes detected per cell."
  - "Describe the analysis from a count matrix of cells to clusters of cell types and state the checks needed before a cluster is called a cell type."
references:
  - "Tang, F., Barbacioru, C., Wang, Y., Nordman, E., Lee, C., Xu, N., Wang, X., Bodeau, J., Tuch, B. B., Siddiqui, A., Lao, K., & Surani, M. A. (2009). mRNA-Seq whole-transcriptome analysis of a single cell. Nature Methods, 6(5), 377-382. https://doi.org/10.1038/nmeth.1315"
  - "Macosko, E. Z., Basu, A., Satija, R., Nemesh, J., Shekhar, K., Goldman, M., Tirosh, I., Bialas, A. R., Kamitaki, N., Martersteck, E. M., Trombetta, J. J., Weitz, D. A., Sanes, J. R., Shalek, A. K., Regev, A., & McCarroll, S. A. (2015). Highly Parallel Genome-wide Expression Profiling of Individual Cells Using Nanoliter Droplets. Cell, 161(5), 1202-1214. https://doi.org/10.1016/j.cell.2015.05.002"
  - "Stuart, T., Butler, A., Hoffman, P., Hafemeister, C., Papalexi, E., Mauck, W. M., Hao, Y., Stoeckius, M., Smibert, P., & Satija, R. (2019). Comprehensive Integration of Single-Cell Data. Cell, 177(7), 1888-1902. https://doi.org/10.1016/j.cell.2019.05.031"
  - "Wolf, F. A., Angerer, P., & Theis, F. J. (2018). SCANPY: large-scale single-cell gene expression data analysis. Genome Biology, 19(1), 15. https://doi.org/10.1186/s13059-017-1382-0"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Bulk RNA sequencing measures the average transcriptome of many cells, which hides the differences between them. Single-cell RNA sequencing measures the transcriptome of each cell separately, so that the cell types, states and transitions in a tissue can be seen. Tang et al. (2009) described the first whole-transcriptome sequencing of a single cell, and Macosko et al. (2015) described a method that captures thousands of cells in droplets, which made the approach practical at scale. The data it produces are large, sparse and noisy, and their analysis has its own methods.

The topic follows the path from the capture of cells to the interpretation of their types. The first chapters describe how cells are captured and their transcripts labelled, and the quality control that separates real cells from empty droplets and damaged cells. The later chapters cover normalisation, the reduction of the data to a few dimensions, the clustering of cells, the integration of several datasets and the interpretation of the resulting groups.

Single-cell data invite strong claims. A cluster of cells looks like a cell type, and a trajectory looks like a process, but both are inferences from a method that has its own biases. Stuart et al. (2019) described an approach to integrating datasets from different experiments, and Wolf et al. (2018) described a scalable toolkit for analysing such data. The chapters emphasise the checks that separate a real cell type from an artefact of the analysis.
