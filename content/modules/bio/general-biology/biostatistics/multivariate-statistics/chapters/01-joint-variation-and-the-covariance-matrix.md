---
title: "Joint Variation and the Covariance Matrix"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "How the joint variation of several biological variables is described by a covariance matrix whose diagonal holds the variances and whose off-diagonal entries hold the covariances, the correlation matrix that standardises the variables, the geometric picture of samples as points in a space of the variables, the effect of differing scales on the matrix and the reasons a multivariate description must be read through the associations among the variables rather than one variable at a time."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Write the covariance and correlation matrix of several biological variables and read the associations among them."
  - "Explain why the scale of the variables changes the covariance matrix and when the correlation matrix is preferred."
references:
  - "Hotelling, H. (1933). Analysis of a complex of statistical variables into principal components. Journal of Educational Psychology, 24(6), 417-441. https://doi.org/10.1037/h0071325"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Several variables measured on the same samples have a joint distribution that is described by their covariance matrix. The diagonal of the matrix holds the variance of each variable, and the off-diagonal entries hold the covariance between each pair. The matrix is symmetric, and it summarises every pairwise association in one object. Hotelling (1933) used this matrix as the starting point for finding the principal components, and every method of the topic begins from it.

The scale of the variables determines the matrix. A variable measured in millimetres has a variance a million times that of the same quantity in metres, and a covariance matrix of unstandardised variables is dominated by the variables with the largest scale. The correlation matrix standardises each variable to unit variance, so that the associations are compared on equal terms. The choice between the two is a decision about what the analysis should weight, and it must be stated.

Samples can be viewed as points in the space whose axes are the variables. The covariance matrix describes the shape of the cloud of points, its spread in each direction and the tilt of its principal axes. A strong correlation between two variables stretches the cloud along a diagonal, and the reduction of the data to fewer dimensions follows the directions in which the cloud is stretched most.

A multivariate description must be read through the associations among variables. Reading one variable at a time misses the pattern that appears only in combination, and reading the correlations alone misses the scale and the spread that matter for interpretation. Cumming (2014) argues for showing the data and their associations together, since the matrix of numbers alone conveys less than a plot of the samples.

Sandve et al. (2013) recommended recording the variables, their scaling and the matrix used, since the multivariate result depends on these choices.
