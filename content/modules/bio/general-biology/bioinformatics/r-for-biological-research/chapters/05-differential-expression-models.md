---
title: "Differential Expression Models"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How count data from RNA sequencing are modelled for differential expression, why a simple t-test on counts is inappropriate, the negative binomial model and its dispersion, the shrinkage of noisy estimates in DESeq2 and edgeR, the design matrix that encodes the experimental groups and the correction of p-values for the thousands of genes tested."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain why read counts are modelled with a negative binomial distribution rather than a normal distribution and what the dispersion parameter represents."
  - "Write a design matrix for a two-group experiment and explain how the model estimates the log fold change for a gene."
references:
  - "Love, M. I., Huber, W., & Anders, S. (2014). Moderated estimation of fold change and dispersion for RNA-seq data with DESeq2. Genome Biology, 15(12), 550. https://doi.org/10.1186/s13059-014-0550-8"
  - "Robinson, M. D., McCarthy, D. J., & Smyth, G. K. (2010). edgeR: a Bioconductor package for differential expression analysis of digital gene expression data. Bioinformatics, 26(1), 139-140. https://doi.org/10.1093/bioinformatics/btp616"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

The count of reads that map to a gene in an RNA sequencing experiment varies between replicates, and the variance of the count grows with its mean. A normal distribution with constant variance, which the simple t-test assumes, does not describe such data. Love et al. (2014) modelled the counts with a negative binomial distribution, whose variance is the mean plus a term proportional to the square of the mean. The extra term is the dispersion, which describes the biological variation between replicates beyond what sampling noise would produce.

The model is fitted with a design matrix that encodes the experimental groups. For a two-group comparison, the matrix has a column for the intercept and a column that indicates membership of the treated group, and the coefficient of that column is the log fold change between the groups. More complex designs, with batches or several factors, add columns in the same way, and the design must be stated in the analysis so that the comparison is clear.

Estimates of dispersion are unreliable when the number of replicates is small. Love et al. (2014) shrank each gene's dispersion and fold change toward the values of genes with similar expression, which stabilises the estimates and reduces the number of spuriously large fold changes for genes with low counts. Robinson et al. (2010) developed edgeR, which uses a related approach with an empirical Bayes estimate of the dispersion.

Testing thousands of genes requires correcting for multiplicity. The procedure of Benjamini and Hochberg is the usual choice, and it controls the false discovery rate across the set of tests. Ioannidis (2005) described how repeated and flexible testing inflates the rate of false findings, and the correction should be applied to all the genes tested, not only to those that pass a filter.

The number of replicates limits what can be found. A gene that changes strongly in one replicate and not in others cannot be identified with confidence, and the power of the design should be estimated before the experiment is run.
