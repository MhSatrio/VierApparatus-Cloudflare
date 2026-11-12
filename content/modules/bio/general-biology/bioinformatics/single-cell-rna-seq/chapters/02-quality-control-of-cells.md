---
title: "Quality Control of Cells"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The quality checks that separate real cells from empty droplets, doublets and damaged or dying cells in single-cell RNA-seq, including the number of genes and molecules detected per cell, the fraction of reads from mitochondrial genes as a marker of stress, the detection of doublets where two cells share a droplet and the thresholds that remove low-quality cells, with the reasons each threshold must be chosen and reported."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Identify empty droplets, doublets and low-quality cells in a single-cell dataset from the counts and the mitochondrial fraction."
  - "Choose and report quality thresholds for a dataset and state how they affect the cells retained."
references:
  - "Macosko, E. Z., Basu, A., Satija, R., Nemesh, J., Shekhar, K., Goldman, M., Tirosh, I., Bialas, A. R., Kamitaki, N., Martersteck, E. M., Trombetta, J. J., Weitz, D. A., Sanes, J. R., Shalek, A. K., Regev, A., & McCarroll, S. A. (2015). Highly Parallel Genome-wide Expression Profiling of Individual Cells Using Nanoliter Droplets. Cell, 161(5), 1202-1214. https://doi.org/10.1016/j.cell.2015.05.002"
  - "Wolf, F. A., Angerer, P., & Theis, F. J. (2018). SCANPY: large-scale single-cell gene expression data analysis. Genome Biology, 19(1), 15. https://doi.org/10.1186/s13059-017-1382-0"
  - "Taschuk, M., & Wilson, G. (2017). Ten simple rules for making research software more robust. PLOS Computational Biology, 13(4), e1005412. https://doi.org/10.1371/journal.pcbi.1005412"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Not every droplet in a single-cell run contains a cell, and not every droplet with a cell contains only one. Empty droplets contribute barcodes with very few molecules, and doublets, where two cells share a barcode, contribute mixed profiles that look like hybrids. Damaged cells contribute profiles dominated by mitochondrial transcripts, because the cytoplasmic RNA leaks away while the mitochondrial RNA remains. Macosko et al. (2015) described the droplet system that produces these barcodes, and the quality checks are needed because the system does not distinguish these cases on its own.

The first measures are the number of genes and the number of molecules detected per barcode. Barcodes with very few molecules are empty droplets, and barcodes with an unusually large number may be doublets. The thresholds are set from the distribution of the data, and a threshold placed in the wrong part of the distribution removes real cells or keeps empty ones. Wolf et al. (2018) describe a toolkit in which these measures are computed and filtered, and the filtering steps are standard in such software.

The fraction of reads from mitochondrial genes is the marker of stress or damage. A cell with a high fraction has lost much of its cytoplasmic RNA, and its profile is distorted. The threshold for this fraction depends on the tissue, since some cell types are naturally rich in mitochondria, so a single cut-off applied to all data can remove a real population.

Doublets are detected by computational methods that look for barcodes whose profiles resemble mixtures of two other cells. These methods estimate the rate of doublets from the number of cells loaded, and they flag cells that are likely to be doublets rather than proving it. A doublet mistaken for a new cell type is one of the most common errors in single-cell analysis.

Taschuk and Wilson (2017) recommended that the thresholds of an analysis be stated and tested, and Sandve et al. (2013) recommended recording the decisions that determine the data used. The thresholds, the number of cells removed at each step and the reasons for each removal are the record of quality control.
