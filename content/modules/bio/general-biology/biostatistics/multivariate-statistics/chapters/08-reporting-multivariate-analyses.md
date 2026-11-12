---
title: "Reporting Multivariate Analyses"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "What a report of a multivariate analysis must contain for its components, classifications, tests and clusters to be checked and repeated, including the variables and their scaling, the sample sizes relative to the number of variables, the dissimilarity or covariance matrix used, the number of components or groups and the rule for choosing them, the validation and stability assessment and the deposition of the data and code with the results."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "List the information a multivariate report must contain for another group to reproduce the analysis and assess its validation."
  - "Report the validation of a classifier or a cluster with the design that produced its error or stability estimate."
references:
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Hotelling, H. (1933). Analysis of a complex of statistical variables into principal components. Journal of Educational Psychology, 24(6), 417-441. https://doi.org/10.1037/h0071325"
---

A multivariate result is a summary of many variables, and its meaning depends on choices that a reader cannot infer from the result itself. Peng (2011) argued that the means of reproducing a computational result must accompany it, and for a multivariate analysis these means include the variables, their scaling, the matrix analysed and the validation. A figure of components or clusters without these details conveys a picture whose reliability cannot be assessed.

The data and their scaling are the first item. The variables, their units, the transformations and the standardisation should be stated, along with the sample size and the number of variables, since the ratio between them determines what is possible. Ioannidis (2005) described how the ratio and the flexibility of analysis shape the reliability of findings, and the report must make the ratio visible.

The method is the second item. The dissimilarity or covariance matrix, the number of components or groups, the rule used to choose them and the software and its version should be listed. Hotelling (1933) defined the components whose number is chosen, and the rule for choosing it is a decision that the report must give.

The validation is the third item. The cross-validation of a classifier, the stability of clusters under resampling and the tests of the multivariate hypotheses should be described with their results. A reported classification without its validated error, or a cluster without its stability, is incomplete, and Sandve et al. (2013) recommended recording the validation as part of the analysis.

The deposition is the fourth item. The data matrix, the scaled data, the component scores or cluster labels and the code should be placed in a public archive with identifiers. Wilkinson et al. (2016) set out the principles under which such data should be findable and reusable, and a deposited dataset with its code allows a multivariate result to be reproduced and tested.
