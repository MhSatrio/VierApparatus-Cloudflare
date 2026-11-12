---
title: "Reporting Survival Analyses"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "What a report of a survival analysis must contain for its curves and hazard ratios to be understood and repeated, including the definition of the time origin, the event and the censoring, the number of individuals and events in each group, the survival curves with their numbers at risk, the hazard ratios with their intervals and the time scale, the assumption checks and their adaptations, and the deposition of the time, event and predictor data with the code."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "List the definitions and counts a survival report must give so that the curves and hazard ratios can be interpreted."
  - "Report a Cox model with its hazard ratios, intervals, assumption checks and the number of events per predictor."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Cox, D. R. (1972). Regression models and life-tables. Journal of the Royal Statistical Society Series B: Statistical Methodology, 34(2), 187-202. https://doi.org/10.1111/j.2517-6161.1972.tb00899.x"
---

A survival report is interpretable only when the time, the event and the censoring are defined. Peng (2011) argued that the means of reproducing a computational result must accompany it, and for a survival analysis these means are the definitions, the data and the model. A report that gives a hazard ratio without its time origin, its event definition or its count of events cannot be assessed, and a survival curve without its numbers at risk hides the support for its tail.

The definitions and counts are the first item. The time origin, the event, the censoring rule and the follow-up period should be stated, with the number of individuals, the number of events and the number censored in each group. Cumming (2014) argues that the precision of an estimate depends on these counts, and a survival estimate with few events is imprecise however it looks.

The curves and the numbers at risk are the second item. The Kaplan-Meier curves with their confidence bands, and the numbers at risk beneath them at regular times, should be given, so that the reader can see the support for each part. A comparison between groups should give the test used and its result.

The model is the third item. The predictors, the hazard ratios with their intervals, the time scale and the reference levels should be reported. The assumption checks, and any adaptation such as stratification or time-varying coefficients, must be described, since they determine the interpretation of the hazard ratios. Cox (1972) defined the model whose coefficients are reported, and the report must make clear which quantity is estimated.

The data and code are the fourth item. The time, event and predictor data, with an identifier, and the code that fitted the model should be deposited. Wilkinson et al. (2016) set out the principles under which such data should be findable and reusable, and Sandve et al. (2013) recommended keeping the outputs of an analysis with its inputs and steps.
