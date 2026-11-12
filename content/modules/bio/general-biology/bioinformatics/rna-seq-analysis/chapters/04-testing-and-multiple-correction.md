---
title: "Testing and Multiple Correction"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How the test of each gene is carried out in a differential expression analysis, the Wald and likelihood ratio tests of the fitted model, the p-values they produce, the correction of these p-values for the thousands of genes tested using the false discovery rate and the reasons a single threshold on corrected values is a statement about the list of genes and not about each gene separately."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how a p-value is obtained for the group effect of a gene from the fitted negative binomial model."
  - "Apply a false discovery rate correction to the p-values of all genes tested and interpret the resulting threshold correctly."
references:
  - "Love, M. I., Huber, W., & Anders, S. (2014). Moderated estimation of fold change and dispersion for RNA-seq data with DESeq2. Genome Biology, 15(12), 550. https://doi.org/10.1186/s13059-014-0550-8"
  - "Robinson, M. D., McCarthy, D. J., & Smyth, G. K. (2010). edgeR: a Bioconductor package for differential expression analysis of digital gene expression data. Bioinformatics, 26(1), 139-140. https://doi.org/10.1093/bioinformatics/btp616"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The model yields, for each gene, an estimate of the group effect and a test of whether that effect differs from zero. The test is typically a Wald test, which compares the estimate with its standard error, or a likelihood ratio test, which compares the fit of the model with and without the group term. Love et al. (2014) use the Wald test with their fitted model, and the output is a p-value for each gene. The p-value is the probability of an effect at least this large if the true effect were zero, under the model.

Thousands of genes are tested, and a threshold of 0.05 applied to each would call hundreds of genes significant by chance even if none changed. The correction for multiple testing addresses this. The Benjamini-Hochberg procedure controls the false discovery rate, which is the expected fraction of the called genes that are false. Ioannidis (2005) described how repeated testing without correction inflates the number of false findings, and the correction is the means of limiting that inflation.

The corrected value is an adjusted p-value, often called a q-value or an adjusted p-value depending on the software. A threshold on it, such as 0.05, selects a list of genes whose expected false fraction is below that level. The threshold is a statement about the list as a whole. It does not say that any single gene in the list is certainly changed, and a reader who interprets it that way misreads the result.

The correction must cover all the genes tested, including those with low counts that were filtered out. A filter applied before the test reduces the number of tests and changes the correction, so the filter should be fixed in advance and reported. Testing only the genes that passed a filter chosen after seeing the data is a form of flexibility that the correction cannot repair.

Sandve et al. (2013) recommended that the thresholds and the corrections of an analysis be recorded, so that the list it produces can be reproduced exactly.
