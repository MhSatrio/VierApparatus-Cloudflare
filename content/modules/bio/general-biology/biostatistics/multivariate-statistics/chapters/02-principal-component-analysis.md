---
title: "Principal Component Analysis"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "Principal component analysis as the rotation of a set of correlated biological variables onto orthogonal axes of decreasing variance, the eigenvectors that give the loadings of each variable, the scores of each sample on the components, the proportion of variance explained by each component, the choice of how many components to keep, the interpretation of components through their loadings and the cautions that a component is a direction of variance and not necessarily a biological process."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Compute the principal components of a standardised dataset and state the loadings and scores they give."
  - "Choose the number of components to retain and explain why a component is a direction of variance rather than a biological process."
references:
  - "Hotelling, H. (1933). Analysis of a complex of statistical variables into principal components. Journal of Educational Psychology, 24(6), 417-441. https://doi.org/10.1037/h0071325"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Principal component analysis rotates a set of correlated variables onto new axes that are uncorrelated with one another. The first axis lies in the direction of greatest variance in the data, the second in the direction of greatest remaining variance orthogonal to the first, and so on. Hotelling (1933) gave the method and its mathematics, and the axes are the eigenvectors of the covariance or correlation matrix, with their eigenvalues giving the variance along each. The coefficients that define each axis are its loadings, and the position of each sample along it is its score.

The proportion of the total variance carried by each component is its eigenvalue divided by the sum of all eigenvalues. Usually a few components carry most of the variance, and the data are summarised by retaining them. The choice of how many to keep is a judgement, and several rules are used, such as keeping components with eigenvalues above one for a standardised analysis or stopping at a clear break in the scree of eigenvalues. The number retained should be reported with the rule used.

The interpretation of a component rests on its loadings. A component with large loadings on several variables of one kind is a candidate for the factor those variables share, such as overall size or a contrast between two groups of measurements. The name given to a component is an interpretation, and it should be checked against the samples: a component is valid as a summary when it separates samples in a way that makes biological sense, not merely because its loadings look coherent.

A component is a direction of variance, and it is not necessarily a biological process. The direction of greatest variance may reflect a batch effect, a difference in measurement precision or the sampling of individuals, and a component that is driven by a single noisy variable is a measurement artefact. Ioannidis (2005) described how a pattern found in one dataset may not hold in another, and a component should be checked against independent data before its meaning is claimed.

Sandve et al. (2013) recommended recording the number of components, the loadings and the rule for choosing them, since a principal component analysis is defined by these choices.
