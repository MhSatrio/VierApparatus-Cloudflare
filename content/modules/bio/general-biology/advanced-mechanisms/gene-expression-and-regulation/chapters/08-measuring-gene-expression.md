---
title: "Measuring Gene Expression"
subject: "Biology"
specialization: "General Biology"
academic_level: "Advanced Biological Mechanisms"
description: "The methods that measure gene expression in bulk and in single cells, including sequencing of RNA, single-molecule imaging and reporter systems, and the limits of each."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Compare bulk RNA sequencing with single-cell and single-molecule methods."
  - "Explain how each measurement method can mislead if its limits are ignored."
references:
  - "Watson, J. D., & Crick, F. H. C. (1953). Molecular structure of nucleic acids: A structure for deoxyribose nucleic acid. Nature, 171(4356), 737-738. https://doi.org/10.1038/171737a0"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

Measuring gene expression means counting molecules of RNA or protein. The method chosen determines what can be known. Bulk methods average over millions of cells and report a population mean, which hides the variation described in the chapter on noise. Single-cell methods report the distribution across cells, and single-molecule methods count individual RNA molecules in each cell. Each has a different sensitivity, resolution and cost, and each can mislead when its limits are not understood.

Bulk RNA sequencing reverse-transcribes the RNA of a sample into DNA and sequences it in parallel. The amount of each transcript is estimated by the number of reads that map to it. The method is sensitive and inexpensive per gene, and it provides a broad view of the transcriptome. Its weakness is that it averages over cell types and states, so a change in the proportion of cells can look like a change in the expression of every cell.

Single-cell RNA sequencing assigns the reads from each cell to that cell, usually with a barcode. It reveals the cell types in a tissue and the variation within each type. The data are sparse, because many transcripts are not detected in any given cell, and the technical noise of the method must be modelled before biological variation can be interpreted.

Watson and Crick (1953) established the base-pairing rules on which the detection of RNA by complementary probes depends, and single-molecule fluorescence in situ hybridisation uses this pairing. Labelled probes bind a target RNA, and each molecule appears as a diffraction-limited spot. The method counts molecules directly, which allows the burst kinetics of the previous chapter to be measured, but it is limited to a set of targets chosen in advance.

Reporter systems measure expression by linking a regulatory sequence to a gene that produces a detectable product, such as a fluorescent protein. They can be followed in living cells over time, but the reporter may not reproduce the behaviour of the endogenous gene, because the context of the insertion can change its regulation.

Ioannidis (2005) described how measurements that are flexibly analysed can produce findings that do not hold. The same caution applies to expression data, where the normalisation and thresholds used to call a gene expressed must be stated in advance and tested for robustness. Alberts et al. (2022) describe the biochemistry of the molecules being measured, which determines how they can be detected.
