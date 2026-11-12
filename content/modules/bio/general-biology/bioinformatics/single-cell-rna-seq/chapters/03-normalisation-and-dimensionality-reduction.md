---
title: "Normalisation and Dimensionality Reduction"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How single-cell count data are normalised for differences in capture depth between cells, how a small set of highly variable genes is selected, the reduction of the data to a few principal components and the use of a neighbourhood graph and a two-dimensional embedding to display the cells, with the cautions that a visual embedding can exaggerate or invent structure."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Normalise a single-cell count matrix for differences in depth and select highly variable genes before reducing dimensions."
  - "Explain how principal components and a neighbourhood graph summarise the cells and why a two-dimensional plot can mislead."
references:
  - "Wolf, F. A., Angerer, P., & Theis, F. J. (2018). SCANPY: large-scale single-cell gene expression data analysis. Genome Biology, 19(1), 15. https://doi.org/10.1186/s13059-017-1382-0"
  - "Stuart, T., Butler, A., Hoffman, P., Hafemeister, C., Papalexi, E., Mauck, W. M., Hao, Y., Stoeckius, M., Smibert, P., & Satija, R. (2019). Comprehensive Integration of Single-Cell Data. Cell, 177(7), 1888-1902. https://doi.org/10.1016/j.cell.2019.05.031"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Cells differ in the number of molecules captured, and a cell with a deeper capture will show higher counts for every gene. Normalisation scales the counts of each cell to a common total, so that the comparison between cells reflects biology rather than capture depth. The scaled values are often log-transformed to reduce the influence of the most abundant transcripts. Wolf et al. (2018) describe these steps as the standard starting point in a single-cell analysis, and their software applies them as a default sequence.

Most of the genes in a single-cell dataset carry little information about cell type. A small set of highly variable genes, whose expression differs most between cells, is selected to focus the analysis. The selection is a choice that changes the result, since a gene left out cannot contribute to the clusters. Stuart et al. (2019) describe an approach to selecting features that works across datasets, and the choice should be reported.

The selected genes are reduced to a few principal components, which summarise the main directions of variation among the cells. The components are the input to the clustering and to the visualisation, and the number of components retained is a decision that affects the clusters. Too few components lose real structure, and too many add noise.

A neighbourhood graph connects each cell to its most similar cells in the reduced space, and a two-dimensional embedding displays the graph. The embedding is a drawing of the data, and it can exaggerate or create separation that is not present in the high-dimensional space. A cluster visible in the plot must be confirmed in the reduced data before it is interpreted.

Sandve et al. (2013) recommended that the parameters of an analysis be recorded, and the normalisation, the number of genes, the number of components and the neighbourhood size determine the clusters that the analysis reports.
