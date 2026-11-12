---
title: "High-Dimensional Data and Overfitting"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The problems that arise when the number of variables greatly exceeds the number of samples, as is common in omics data, including the singularity of the covariance matrix, the spurious separation of groups by chance, the optimistic bias of the training error, the use of regularised methods that shrink the coefficients and the feature selection that must be nested within the validation to avoid selecting variables on the same data used to assess them."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain why a multivariate separation of groups is guaranteed to appear when there are far more variables than samples."
  - "Describe how feature selection performed on the full dataset invalidates the estimate of classification error and how it is nested within validation to avoid this."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Ritchie, M. D., Holzinger, E. R., Li, R., Pendergrass, S. A., & Kim, D. (2015). Methods of integrating data to uncover genotype-phenotype interactions. Nature Reviews Genetics, 16(2), 85-97. https://doi.org/10.1038/nrg3868"
  - "Benjamini, Y., & Hochberg, Y. (1995). Controlling the false discovery rate: A practical and powerful approach to multiple testing. Journal of the Royal Statistical Society: Series B (Methodological), 57(1), 289-300. https://doi.org/10.1111/j.2517-6161.1995.tb02031.x"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Omics data often have thousands of variables for tens of samples, and the classical multivariate methods break down in this regime. The covariance matrix cannot be inverted, so the discriminant and the multivariate test cannot be computed, and the methods that do run will find separations and associations by chance. Ioannidis (2005) described how the multiplicity of tests and the flexibility of analysis produce findings that do not hold, and high-dimensional data present this problem in its most extreme form.

Regularised methods make the problem tractable. They shrink the coefficients toward zero, or force some to be exactly zero, so that the model uses only a subset of the variables and remains stable when there are more variables than samples. The degree of shrinkage is a tuning parameter, and it is chosen by validation rather than by the fit to the data that produced it. Ritchie et al. (2015) discuss the integration of many features, and regularisation is one of the means by which such integration is kept from overfitting.

Feature selection is the most dangerous step. A common practice is to select the variables that best distinguish the groups and then to estimate the classification error on the same data. The selection has been made using the outcome, so the error estimate is grossly optimistic, and the classifier appears to work when it does not. The selection must be nested within the validation, so that each validation fold selects its own variables without seeing the samples it is tested on.

The false discovery rate correction of Benjamini and Hochberg (1995) controls the number of false variables in a list, and it is the appropriate tool when the question is which variables are associated with the outcome. A classifier is judged differently, by the error it makes on withheld samples, and the two criteria should not be confused.

Sandve et al. (2013) recommended recording the selection procedure, the validation design and the tuning, since the reported performance of a high-dimensional method depends on how they were done.
