---
title: "RNA Sequencing and Expression"
subject: "Biology"
specialization: "General Biology"
academic_level: "Experimental and Applied Biology"
description: "How RNA is sequenced to measure the expression of every transcript, how reads are counted per gene and normalised for gene length and library size, how the differential expression of genes is tested and why the counts are estimates rather than absolute quantities."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how RNA reads are counted per gene and normalised for library size and gene length."
  - "State the assumptions behind a test of differential expression and when they fail."
references:
  - "Bustin, S. A. (2000). Absolute quantification of mRNA using real-time reverse transcription polymerase chain reaction assays. Journal of Molecular Endocrinology, 25(2), 169-193. https://doi.org/10.1677/jme.0.0250169"
  - "Shendure, J., & Ji, H. (2008). Next-generation DNA sequencing. Nature Biotechnology, 26(10), 1135-1145. https://doi.org/10.1038/nbt1486"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
---

RNA sequencing measures the transcripts in a sample by converting RNA into a library and sequencing it. The reads that map to each gene are counted, and the count is taken as a measure of the gene's expression. Bustin (2000) emphasised the difference between relative and absolute quantification in measuring transcripts, and the counts from sequencing are relative. They describe the proportion of the sample's reads that fall on each gene, not the number of molecules in the cell, and the distinction must be kept in mind when the data are reported.

Normalisation corrects the counts for differences between samples. The library size, which is the total number of reads, varies between samples, and the counts are scaled to a common size. Gene length also matters, because a long gene collects more reads for the same number of transcripts. Measures that correct for both are used to compare genes within a sample, while a different normalisation is used to compare samples.

Differential expression asks whether a gene's counts differ between conditions. A statistical model of the counts is fitted, typically one that accounts for the variance being larger than the mean, and a test is applied to each gene. The test assumes that most genes do not change, and that the replicates are independent. When a large proportion of genes change, or when the replicates are technical rather than biological, the assumptions fail and the results are misleading.

Platt (1964) recommended a test that could fail, and the number of biological replicates is the central control. Ioannidis (2005) described how testing thousands of genes produces many false positives unless the results are corrected for multiple comparisons, and the correction and its threshold must be reported.

Alberts et al. (2022) describe the regulation of gene expression that the counts measure, and the difference between a change in transcription and a change in the stability of a transcript.
