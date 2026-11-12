---
title: "Capturing Individual Cells"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How individual cells are isolated and their transcripts labelled in single-cell RNA-seq, from the early plate-based methods of Tang et al. to the droplet method of Macosko et al. with cell and molecular barcodes, the limits on the number of genes detected per cell and the way capture efficiency and dropout shape the data the analysis must work with."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how a droplet method labels the transcripts of each cell with a cell barcode and a molecular barcode."
  - "Explain why single-cell data contain many zeros and what dropout means for the analysis."
references:
  - "Tang, F., Barbacioru, C., Wang, Y., Nordman, E., Lee, C., Xu, N., Wang, X., Bodeau, J., Tuch, B. B., Siddiqui, A., Lao, K., & Surani, M. A. (2009). mRNA-Seq whole-transcriptome analysis of a single cell. Nature Methods, 6(5), 377-382. https://doi.org/10.1038/nmeth.1315"
  - "Macosko, E. Z., Basu, A., Satija, R., Nemesh, J., Shekhar, K., Goldman, M., Tirosh, I., Bialas, A. R., Kamitaki, N., Martersteck, E. M., Trombetta, J. J., Weitz, D. A., Sanes, J. R., Shalek, A. K., Regev, A., & McCarroll, S. A. (2015). Highly Parallel Genome-wide Expression Profiling of Individual Cells Using Nanoliter Droplets. Cell, 161(5), 1202-1214. https://doi.org/10.1016/j.cell.2015.05.002"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

Tang et al. (2009) showed that the transcriptome of a single cell could be sequenced by isolating the cell, converting its RNA to DNA and amplifying the product before sequencing. The method was laborious, and each cell required its own reaction, which limited the number of cells that could be studied. The principle, however, was that each cell is a separate sample, and the reads must be assigned to their cell of origin.

Macosko et al. (2015) made the method scalable by encapsulating each cell with a bead in a droplet. The bead carries a cell barcode, a short sequence that is shared by all the molecules from that droplet, and a molecular barcode that is unique to each captured transcript. The cell barcode assigns the reads to their cell, and the molecular barcode allows the original number of transcripts to be estimated by collapsing reads that share it. Thousands of cells can be processed in a single run.

The data are sparse. A typical cell yields only a fraction of its transcripts to the library, and many genes are not detected in a given cell even when they are expressed. The absence of a count in a cell is therefore ambiguous: it may be a true absence or a failure of capture. This dropout is the most important feature of single-cell data, and the analysis must account for it rather than treat zeros as zeros.

Alberts et al. (2022) describe the cell as the unit of biology, and the single-cell method is an attempt to study that unit directly. The method's limits, including the dropout and the loss of spatial information, mean that the data describe the cells that were captured, which may not be all the cells of a tissue.

The capture method must be reported with the data, since its efficiency and its barcodes determine what can be inferred.
