---
title: "Bioconductor for Genomic Data"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The Bioconductor project of R packages for genomic data, its common data classes that store expression, annotation and genomic ranges with their metadata, how an experiment is represented as a single object that carries the data and the sample information together and the value of shared, peer-reviewed software for the analysis of high-throughput data."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain why Bioconductor represents a high-throughput experiment as one object that carries the data together with its sample information and annotation."
  - "Describe how the Bioconductor project reviews and documents its packages and why this matters for the reliability of analyses."
references:
  - "Gentleman, R. C., Carey, V. J., Bates, D. M., Bolstad, B., Dettling, M., Dudoit, S., Ellis, B., Gautier, L., Ge, Y., Gentry, J., Hornik, K., Hothorn, T., Huber, W., Iacus, S., Irizarry, R., Leisch, F., Li, C., Maechler, M., Rossini, A. J., . . . Zhang, J. (2004). Bioconductor: open software development for computational biology and bioinformatics. Genome Biology, 5(10), R80. https://doi.org/10.1186/gb-2004-5-10-r80"
  - "Huber, W., Carey, V. J., Gentleman, R., Anders, S., Carlson, M., Carvalho, B. S., Bravo, H. C., Davis, S., Gatto, L., Girke, T., Gottardo, R., Hahne, F., Hansen, K. D., Irizarry, R. A., Lawrence, M., Love, M. I., MacDonald, J., Obenchain, V., Oleś, A. K., . . . Morgan, M. (2015). Orchestrating high-throughput genomic analysis with Bioconductor. Nature Methods, 12(2), 115-121. https://doi.org/10.1038/nmeth.3252"
  - "Stein, L. D. (2010). The case for cloud computing in genome informatics. Genome Biology, 11(5), 207. https://doi.org/10.1186/gb-2010-11-5-207"
---

Bioconductor is a project that develops R packages for the analysis of genomic data. Gentleman et al. (2004) founded it on the principle that the packages should share a common set of data structures, so that the output of one analysis can be the input of another and so that the software is developed openly by a community. Its packages are reviewed before they are accepted and maintained against a schedule of releases, which gives users a stable base for their analyses.

The central idea is the container. A high-throughput experiment is stored as one object that holds the matrix of measurements, the information about each sample, the annotation of each gene and the location of each feature in the genome. Huber et al. (2015) describe the classes that implement this design, and the advantage is that the sample information cannot drift away from the measurements, because they are stored together and subsetted together.

Genomic ranges, the intervals of the genome that a feature occupies, are a second common class. An annotation of genes or of reads is a set of ranges with metadata, and operations such as finding overlaps or counting reads within a region can be expressed in a few lines.

The shared structure reduces the number of errors that arise from mismatched data. A sample that is dropped from the metadata but not from the matrix, or a gene whose annotation is misaligned, is a common error in ad hoc analyses, and the container makes such errors harder to commit.

Stein (2010) noted that the growth of genomic data required shared and well-engineered software, and the Bioconductor model of shared structures and reviewed packages answers that need.
