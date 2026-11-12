---
title: "The Design Matrix"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How the design of an RNA-seq experiment is encoded as a design matrix that states which samples belong to which group and which batch, how the coefficients of the model are interpreted as log fold changes between groups, how batch is included as a covariate to remove its effect and how a poorly specified design makes a comparison impossible to estimate."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Write a design matrix for a two-group experiment with a batch and interpret the coefficient of the group effect."
  - "Explain why batch must be included in the design when batch and condition are not perfectly confounded and why a confounded design cannot be rescued by the model."
references:
  - "Love, M. I., Huber, W., & Anders, S. (2014). Moderated estimation of fold change and dispersion for RNA-seq data with DESeq2. Genome Biology, 15(12), 550. https://doi.org/10.1186/s13059-014-0550-8"
  - "Robinson, M. D., McCarthy, D. J., & Smyth, G. K. (2010). edgeR: a Bioconductor package for differential expression analysis of digital gene expression data. Bioinformatics, 26(1), 139-140. https://doi.org/10.1093/bioinformatics/btp616"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

The design matrix is the means by which the model is told the structure of the experiment. Each row is a sample and each column is a term of the model: an intercept, an indicator for the group to which the sample belongs and any other factor such as batch. Love et al. (2014) fit their model with such a matrix, and Robinson et al. (2010) use the same form in edgeR. The matrix states the comparison, and the comparison is what the model estimates.

For two groups, the matrix has an intercept column of ones and a column that is one for the treated samples and zero for the controls. The coefficient of the second column is the log fold change between the groups, which is the quantity reported. A positive coefficient means higher expression in the treated group, and the magnitude, after the transformation back from the logarithm, gives the fold change. The interpretation depends on the coding of the groups, so the reference group must be stated.

Batch is added as a further column when the samples were processed in batches. Including it removes the effect of the batch from the estimate of the group effect, but only where the batch and the group are not perfectly aligned. If every treated sample was processed in one batch and every control in another, the group effect and the batch effect cannot be separated, and no model can estimate the group effect from these data. The design must be checked for this confounding before the analysis is run.

The design is therefore a claim about the experiment. A design that does not reflect the actual processing, or that omits a known source of variation, will give estimates that are biased in ways the model cannot detect. Ioannidis (2005) described how analytical flexibility inflates findings, and a design written before the data are analysed fixes the comparison and removes that flexibility.

Sandve et al. (2013) recommended that the design of an analysis be recorded. The design matrix, with the reference group and the covariates, should be reported in full.
