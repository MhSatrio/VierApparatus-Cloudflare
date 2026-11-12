---
title: "Clustering Cells into Types"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How cells are grouped into clusters on a neighbourhood graph using community detection, the resolution parameter that sets how many clusters are found, the identification of the genes that define each cluster through differential expression between clusters, the assignment of cluster identities from known marker genes and the cautions that a cluster is a hypothesis about a cell type that must be tested."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Cluster cells on a neighbourhood graph and explain how the resolution parameter changes the number of clusters."
  - "Identify the marker genes of each cluster and state the evidence needed before a cluster is named as a cell type."
references:
  - "Wolf, F. A., Angerer, P., & Theis, F. J. (2018). SCANPY: large-scale single-cell gene expression data analysis. Genome Biology, 19(1), 15. https://doi.org/10.1186/s13059-017-1382-0"
  - "Stuart, T., Butler, A., Hoffman, P., Hafemeister, C., Papalexi, E., Mauck, W. M., Hao, Y., Stoeckius, M., Smibert, P., & Satija, R. (2019). Comprehensive Integration of Single-Cell Data. Cell, 177(7), 1888-1902. https://doi.org/10.1016/j.cell.2019.05.031"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Clustering groups the cells that are most similar in the neighbourhood graph into communities, and each community is a candidate cell type or state. The community detection method finds groups whose internal connections are dense and whose connections to other groups are sparse. The resolution parameter controls how finely the graph is divided: a higher resolution yields more clusters, and a lower one yields fewer. Wolf et al. (2018) describe the graph-based clustering used in their toolkit, and the resolution is a choice that must be reported.

Each cluster is characterised by its marker genes, those whose expression is higher in the cluster than in the others. The markers are found by a differential expression test between each cluster and the rest, and the test is the same kind of comparison used for bulk data, applied to cells. The genes that come out are the basis of the interpretation, and they must be checked for the artefacts of the data, such as mitochondrial or ribosomal genes that reflect quality rather than type.

Naming a cluster requires evidence beyond its markers. A cluster is named as a cell type when its markers match the known markers of that type, and the match should be checked against the literature and, where possible, against independent data. Alberts et al. (2022) describe the differentiation of cells and the markers of the main cell types, and the names are given with reference to that knowledge.

Clusters are hypotheses. A cluster may be a real cell type, a state of one cell type, a mixture of two types or an artefact of the resolution chosen. Platt (1964) recommended that a hypothesis be tested against its alternatives, and a cluster should be tested by checking whether it is stable across resolutions and across the integrated datasets described by Stuart et al. (2019).

Sandve et al. (2013) recommended recording the parameters of an analysis, and the resolution and the markers that define each cluster must be reported with the clusters.
