---
title: "Reporting Mixed Models"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "What a report of a mixed-effects analysis must contain for the design, the random structure and the results to be understood and repeated, including the model formula with its fixed and random terms, the estimation method and the convergence checks, the fixed effects with their intervals and the approximation used for the tests, the variance components with their intervals and the intraclass correlation, the number of units and observations and the deposition of the data and code."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Write the model formula of a mixed-effects analysis in a report so that a reader can recreate the random structure."
  - "List the results of a mixed model a report must give, including the variance components and the test approximation."
references:
  - "Bates, D., Mächler, M., Bolker, B., & Walker, S. (2015). Fitting linear mixed-effects models using lme4. Journal of Statistical Software, 67(1), 1-48. https://doi.org/10.18637/jss.v067.i01"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A mixed-effects result is defined by its random structure as much as by its fixed effects, and a report that omits the structure cannot be understood or repeated. Peng (2011) argued that the means of reproducing a computational result must accompany it, and for a mixed model the most important means is the model formula, which states the fixed and random terms exactly. Bates et al. (2015) show how such formulae are written, and the report should give the formula in the form the software accepts.

The design and the sample are the first item. The number of units at each level, the number of observations per unit and the handling of missing data should be stated, since the variance components depend on the number of units. A report that gives only the number of observations hides the number of individuals that the random effects are estimated from.

The estimation and the checks are the second item. The estimation method, the convergence status, any boundary estimates and the approximation used for the degrees of freedom should be given. These determine whether the fixed effects and the variance components can be trusted.

The results are the third item. The fixed effects should be reported with their intervals in the units of the study, and the variance components with their intervals and the intraclass correlation. Cumming (2014) argues that the intervals convey the precision of each estimate, and the components describe where the variation lies.

The deposition is the fourth item. The data, the code and the model formula should be placed in a public archive with identifiers, so that the analysis can be repeated. Wilkinson et al. (2016) set out the principles under which such data should be findable and reusable, and Sandve et al. (2013) recommended keeping the outputs of an analysis with its inputs and steps.
