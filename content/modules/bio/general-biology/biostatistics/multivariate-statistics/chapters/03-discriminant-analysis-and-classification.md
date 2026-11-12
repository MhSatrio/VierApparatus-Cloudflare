---
title: "Discriminant Analysis and Classification"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "Discriminant analysis as the method for assigning samples to known groups from several measurements, the linear discriminant function that maximises the separation of the group means relative to the within-group variation, the classification of new samples by the discriminant scores, the estimation of the classification error by cross-validation and the cautions that a classifier fitted to few samples in many variables separates the groups in the training data by chance and fails on new samples."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Fit a linear discriminant function that separates two known groups from several measurements and classify a new sample."
  - "Estimate the classification error of a discriminant function by cross-validation and explain why the training error is optimistic."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Discriminant analysis assigns a sample to one of several known groups from its measurements. A linear discriminant function is a weighted sum of the variables chosen so that the group means are as far apart as possible relative to the variation within the groups. A new sample is assigned to the group whose score it is closest to, and the method is used in biology for the classification of tissues, species, disease states and cell types from several measurements at once.

The fitting uses the same covariance structure as principal component analysis, but with the groups taken into account. The discriminant function is the direction that best separates the group means, given the within-group covariance, and the classification boundary is placed between the groups. The function has as many dimensions as the groups allow, and its power to separate depends on the distance between the means and the size of the within-group variation.

The error of a classifier is the central question. The error on the samples used to fit the function is optimistic, since the function was chosen to separate those samples. With many variables and few samples, a function can separate the training samples perfectly by chance and classify new samples no better than guessing. Ioannidis (2005) described how a result that performs well on the data used to find it may not replicate, and this is the failure of the training error.

Cross-validation estimates the error honestly. The samples are divided, the function is fitted to all but one part and tested on the withheld part, and the process is repeated until every sample has been withheld once. The average error on the withheld samples is the estimate, and it is the figure a report should give. Platt (1964) recommended tests that could show a hypothesis to be wrong, and a classifier that fails on withheld data has been shown wrong.

Sandve et al. (2013) recommended recording the cross-validation design and the error estimate, since a classification result without a validated error has no value for prediction.
