---
title: "Multivariate Statistics"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "Statistical methods for many variables measured on the same samples, covering the description of joint variation by the covariance matrix, principal component analysis that finds the directions of greatest variance and its interpretation through loadings and scores, the discriminant and classification methods that separate groups from many measurements, the multivariate tests of group differences, the cautions that arise when the number of variables is large relative to the number of samples and the reporting that makes a multivariate result checkable."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Compute the principal components of a set of correlated biological variables and interpret the loadings and scores."
  - "Explain why a multivariate separation of groups can arise by chance when the number of variables is large and state how it is validated."
references:
  - "Hotelling, H. (1933). Analysis of a complex of statistical variables into principal components. Journal of Educational Psychology, 24(6), 417-441. https://doi.org/10.1037/h0071325"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Wasserstein, R. L., & Lazar, N. A. (2016). The ASA statement on p-values: Context, process, and purpose. The American Statistician, 70(2), 129-133. https://doi.org/10.1080/00031305.2016.1154108"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Biology measures many things at once. A plant is described by its height, leaf area, root mass and flowering time, and a cell by the expression of thousands of genes. Multivariate statistics analyses these joint measurements, asking how the variables vary together, which directions in the data carry most information and whether groups of samples separate in the space of their measurements. Hotelling (1933) introduced principal component analysis, one of the oldest and most used of these methods, which finds the directions of greatest variance in the data.

The topic covers the description of joint variation, the reduction of many variables to a few components, the separation of groups by discriminant methods and the multivariate tests that ask whether groups differ overall. Each method summarises the data in a particular way, and each can produce an impressive picture that hides a poor fit or a chance pattern. The interpretation of loadings, the choice of the number of components and the validation of any separation are treated as essential parts of the analysis.

The combination of many variables and few samples is the central risk. With more variables than samples, a separation of groups can always be found, and the apparent accuracy of a classification is an artefact of the fitting. Ioannidis (2005) described how such flexibility produces findings that do not replicate, and the validation of a multivariate result on data withheld from the analysis is the defence. Wasserstein and Lazar (2016) remind readers that the p-values of multivariate tests depend on the model and the assumptions behind them.
