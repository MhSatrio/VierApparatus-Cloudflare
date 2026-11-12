---
title: "Reporting Single-Cell Analyses"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "What a report of a single-cell RNA-seq study must contain for its cell types and states to be reproduced and judged, including the capture method and its cell and molecular barcodes, the quality thresholds and the cells removed, the normalisation and feature selection, the integration method and its checks, the clustering resolution, the markers and identity evidence and the deposition of the count matrices and code."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "List the information a single-cell report must contain for another group to rebuild its clusters and cell-type assignments."
  - "Deposit the count matrices, the cell annotations and the code with the report so that the clusters can be checked."
references:
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Wolf, F. A., Angerer, P., & Theis, F. J. (2018). SCANPY: large-scale single-cell gene expression data analysis. Genome Biology, 19(1), 15. https://doi.org/10.1186/s13059-017-1382-0"
---

A single-cell study produces cell types, and the types are only as credible as the chain of decisions that produced them. Peng (2011) argued that the means of reproducing a computational result must accompany it, and in a single-cell study this includes the capture, the quality control, the normalisation, the integration and the clustering. A report that gives a figure of cell types without these decisions cannot be checked, and a cluster that depends on an unstated threshold may not appear when the analysis is repeated.

The capture and the data are the first item. The capture method, the barcode design, the number of cells loaded and recovered, and the accessions of the raw data should be given. Wilkinson et al. (2016) set out the principles under which data should be identified and made reusable, and the deposited data meet them.

The processing is the second item. The quality thresholds and the number of cells removed at each step, the normalisation, the features selected and the number of components should be stated with the software and its version. Wolf et al. (2018) describe the toolkit in which these steps are typically performed, and the version of the toolkit is part of the record.

The integration and clustering are the third item. The integration method and its checks, the clustering resolution and the number of clusters should be reported, and the markers and the evidence for each identity should accompany them. A reader who wants to rename a cluster needs to know the basis on which it was named.

The deposition is the fourth item. The count matrices, the cell annotations with their clusters and identities, and the analysis code should be placed in a public archive. Sandve et al. (2013) recommended that the outputs of an analysis be kept with its inputs and steps, and a deposited annotated matrix with its code allows another group to recluster the data and test the claims.
