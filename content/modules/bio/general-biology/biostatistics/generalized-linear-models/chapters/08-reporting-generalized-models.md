---
title: "Reporting Generalised Models"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "What a report of a generalised linear model must contain for its coefficients to be interpreted and repeated, including the family and link, the offset and the reference levels, the coefficients on the scale of the link with their exponentials and intervals, the dispersion and its check, the deviance and the comparisons, the residual checks performed and the deposition of the data and the code."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "List the information a report of a generalised linear model must contain for a reader to interpret each coefficient on its correct scale."
  - "Write the coefficients of a count model as rate ratios with intervals and state the offset and reference level used."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A generalised model is reported so that a reader can interpret each coefficient on the scale on which it was estimated, and then translate it into the units of the biology. The coefficients are given on the scale of the link, with their exponentials, which are odds ratios, rate ratios or ratios of means, together with their intervals. Cumming (2014) argues that the interval should be the primary result, since it shows the precision of each effect on the scale that the reader needs.

The model specification is the first item. The family, the link, the offset and the reference level of each factor should be stated. A rate ratio is meaningless without its offset, and an odds ratio is meaningless without its reference level, so these are not details to be left to the methods section alone.

The fit and the checks are the second item. The dispersion, its estimate and its check should be given, along with the deviance and the comparisons between models, and the residual checks performed. A reader who sees a count model without a dispersion check cannot judge whether its standard errors are credible.

The data and code are the third item. Peng (2011) argued that the means of reproducing a computational result must accompany it, and Wilkinson et al. (2016) set out the principles under which such data should be made findable and reusable. The dataset, its structure and the code that fitted the model should be deposited with identifiers.

Sandve et al. (2013) recommended keeping the outputs of an analysis with its inputs and steps, and for a generalised model these are the data, the specification and the fitting code. A report built on these items can be repeated and checked by a reader who was not present at the analysis.
