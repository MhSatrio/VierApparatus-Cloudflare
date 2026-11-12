---
title: "Reporting Epidemiological Studies"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "What a report of an epidemiological study must contain for its measures of frequency and association to be interpreted, including the source and definition of the population, the design and its sampling, the counts and denominators of each measure, the confounders considered and how they were controlled, the intervals of each estimate and the losses and their reasons, together with the deposition of the data and code."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "List the populations, counts, denominators and confounders that an epidemiological report must give for its estimates to be interpreted."
  - "Report a study with its design, its measure of association, its interval and its losses so that a reader can judge its validity."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

An epidemiological result depends on the population from which it was drawn and the design that produced it, and a report must describe both before its numbers can be read. The source of the population, the definition of the condition and of the exposure, and the period and place of the study should come first. Peng (2011) argued that a result is reproducible only when the means of producing it are available, and for an epidemiological study the means include the definitions and the sampling frame.

Each measure should be reported with its denominator and its interval. A count of cases means little without the population at risk, and a risk ratio or odds ratio means little without the interval that shows its precision. Cumming (2014) argues that the interval conveys the range of effects compatible with the data, and a report should give it for every measure of frequency and association. The measure chosen should match the design, and the report should say which measure it is.

Losses, confounders and their control must be described. The number lost to follow-up or non-response in each group, the reasons for loss, the confounders considered and the way each was controlled all determine how far the estimate can be trusted. Ioannidis (2005) described how undisclosed choices of this kind lead to findings that do not hold, and the report should state the adjustments made and the variables that were not measured.

The data and the code should be deposited with identifiers. Wilkinson et al. (2016) set out principles under which the data should be findable, accessible and reusable, and Sandve et al. (2013) recommended keeping the inputs, the steps and the outputs of an analysis together, so that the estimates can be reproduced by others and checked against the stated definitions.
