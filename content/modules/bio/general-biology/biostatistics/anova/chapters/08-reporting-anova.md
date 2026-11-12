---
title: "Reporting ANOVA"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "What a report of an analysis of variance must contain for the design and the results to be understood and repeated, including the factors and their levels, the experimental unit and the number of replicates, the model and the error terms, each F statistic with its degrees of freedom and exact p-value, the effect sizes and the intervals for the comparisons, the planned and post hoc contrasts with their corrections and the deposition of the data and the code."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Write an analysis of variance results statement that gives the design, each F statistic, the effect sizes and the corrected comparisons."
  - "Identify the experimental unit of a design and state the replication on which the tests rest."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

An analysis of variance result is a set of tests and effects, and a report must present them so that a reader can judge the design and the conclusions. Cumming (2014) argues that the effects and their intervals should lead the report, with the tests as support. The reader needs to know the design before the results, since the same F statistic means different things in different designs.

The design is the first item. The factors, their levels, the experimental unit and the number of replicates per cell or per unit should be stated, along with the blocking or nesting and the error term used for each effect. Without the experimental unit, a reader cannot tell whether the replication is genuine, and Ioannidis (2005) described how inflated replication produces findings that do not hold.

The tests are the second item. Each F statistic should be given with its degrees of freedom and its exact p-value, together with the model and the checks of its assumptions. The results of the contrasts and comparisons should be reported with their corrections, and any exploratory analysis labelled as such.

The effects are the third item. The effect sizes for each term and the intervals for the key comparisons should be given in the units of the study, so that the size of each effect is visible alongside its significance.

The data and code are the fourth item. The data set, with its design structure, and the code that fitted the model should be placed in a public archive. Peng (2011) argued that the means of reproducing a computational result must accompany it, and Wilkinson et al. (2016) set out the principles under which such data should be made findable and reusable. Sandve et al. (2013) recommended keeping the outputs of an analysis with its inputs and steps.
