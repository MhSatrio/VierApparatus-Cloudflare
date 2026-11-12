---
title: "Negative Binomial Models and Dispersion"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "Why RNA-seq counts are modelled with a negative binomial distribution rather than a Poisson or a normal one, how the dispersion parameter describes the variation between replicates beyond sampling noise, how dispersion is estimated for each gene and shrunk toward the trend of genes with similar expression as in DESeq2, and the consequences for the power of a study with few replicates."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain why the variance of RNA-seq counts exceeds the mean and how the negative binomial distribution describes this."
  - "Describe how dispersion is shrunk toward a trend across genes and why this matters when replicates are few."
references:
  - "Love, M. I., Huber, W., & Anders, S. (2014). Moderated estimation of fold change and dispersion for RNA-seq data with DESeq2. Genome Biology, 15(12), 550. https://doi.org/10.1186/s13059-014-0550-8"
  - "Robinson, M. D., McCarthy, D. J., & Smyth, G. K. (2010). edgeR: a Bioconductor package for differential expression analysis of digital gene expression data. Bioinformatics, 26(1), 139-140. https://doi.org/10.1093/bioinformatics/btp616"
  - "Wang, Z., Gerstein, M., & Snyder, M. (2009). RNA-Seq: a revolutionary tool for transcriptomics. Nature Reviews Genetics, 10(1), 57-63. https://doi.org/10.1038/nrg2484"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The count of reads for a gene varies between replicates even when the biology is identical. Some of the variation is the sampling of fragments, which a Poisson distribution describes, where the variance equals the mean. In RNA-seq data the variance is larger than the mean, because the amount of RNA varies between biological samples as well. Love et al. (2014) model the counts with a negative binomial distribution, whose variance is the mean plus a term proportional to the square of the mean, and the extra term is the dispersion. Robinson et al. (2010) use the same distribution in edgeR.

The dispersion parameter describes how much the replicates vary beyond sampling. A gene with a large dispersion has a noisy count across replicates, and its fold change is less precisely known. Dispersion is a property of the gene and the experiment, and it is estimated from the replicates. With few replicates, the per-gene estimate is itself unreliable, since the variance of a sample of two or three values is poorly determined.

Shrinkage addresses this. The dispersion estimates of genes with similar expression level tend to cluster, and the estimate for each gene can be pulled toward the trend of its neighbours in expression. Love et al. (2014) describe this shrinkage, which stabilises the estimates and reduces the number of spuriously large dispersions and fold changes for genes with few counts. Wang et al. (2009) described the wide dynamic range of RNA-seq, and the shrinkage is needed because that range makes low-count genes especially noisy.

The consequences for power are direct. A study with two replicates per group has little information about dispersion, and it can detect only large changes. The design should be planned with the expected dispersion in mind, and a study that will be underpowered should say so rather than report a long list of nominal findings.

Sandve et al. (2013) recommended recording the statistical model and its parameters, and the distribution, the dispersion estimator and its shrinkage are part of that record.
