---
title: "Ordination and Community Data"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "Ordination methods that arrange samples along gradients of community composition, including the distance measures suited to species counts, the principal coordinates and non-metric scaling that place samples in a low-dimensional space that preserves their dissimilarities, the constrained ordination that relates the composition to environmental variables and the interpretation of an ordination as a summary of pairwise dissimilarities whose distortions must be checked."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Compute a dissimilarity matrix for species count data and produce an ordination that places the samples along the main gradients."
  - "State what an ordination preserves and what it distorts and check the distortion before interpreting the axes."
references:
  - "Hotelling, H. (1933). Analysis of a complex of statistical variables into principal components. Journal of Educational Psychology, 24(6), 417-441. https://doi.org/10.1037/h0071325"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

Ecological and microbiological data are often tables of species or taxon counts across samples, and the samples differ in their composition in ways that a set of univariate tests would not capture. Ordination arranges the samples in a low-dimensional space so that samples with similar composition lie close together. It is related to principal component analysis, but it works from a dissimilarity matrix chosen for counts, which often handles the many zeros and the unequal totals of such data better than the covariance of the raw counts.

The dissimilarity measure is the first choice. A measure that treats joint absences as evidence of similarity misleads when most species are absent from most samples, and a measure that is sensitive to the total count of each sample confounds composition with depth. The measure should be chosen for the data, and its choice must be reported with the ordination, since two measures can give different pictures of the same samples.

Principal coordinates and non-metric scaling place the samples so that their distances in the space approximate the dissimilarities. The former preserves the dissimilarities as well as a low-dimensional space allows, and the latter preserves their ranks. Both distort some dissimilarities, and the distortion must be checked, since an apparent cluster in the plot may reflect the projection rather than the data. The stress of the ordination measures the fit.

Constrained ordination relates the composition to measured environmental variables, showing which gradients explain the pattern. The result is a relation between composition and environment, and it is subject to the same caution as regression: a variable that is correlated with the gradient may be the cause or merely a marker. Alberts et al. (2022) describe how organisms are shaped by their environments, but an ordination reveals association, not mechanism.

Sandve et al. (2013) recommended recording the dissimilarity measure, the method of ordination and its stress, since the picture depends on each of them.
