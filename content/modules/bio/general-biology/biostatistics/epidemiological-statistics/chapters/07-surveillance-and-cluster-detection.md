---
title: "Surveillance and Cluster Detection"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The routine collection of notifiable disease counts over time and place, the monitoring of counts against an expected baseline to detect unusual increases, the spatial and temporal clusters of cases that may signal a common source, the scan statistics and control charts that test for clusters while allowing for multiple testing, and the distinction between a real cluster and the chance grouping that random events always produce."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Monitor a disease count against an expected baseline and state the signal that would prompt investigation."
  - "Explain why an apparent cluster of cases can arise by chance and how a cluster test allows for the search across many places and times."
references:
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Surveillance is the continuous collection and analysis of disease counts, so that changes in occurrence are noticed early. Notifiable diseases are reported by clinicians and laboratories to a central authority, and the counts are compared with what is expected from past years, seasons and population size. The purpose is to detect unusual increases quickly enough for an investigation to be useful, and the expected baseline must be estimated from data that were recorded in the same way.

A cluster is an unusual concentration of cases in time, place or both. Clusters are of interest because they may indicate a common source, such as a contaminated supply or a point of exposure, but a cluster is also what random events produce. When many places and periods are examined, some will show high counts by chance alone, and the search for clusters is a multiple testing problem. Peng (2011) argued that a finding must be reproducible by its method, and the method of a cluster search must state the places, periods and expected counts used.

Scan statistics and control charts provide ways to test for clusters while allowing for the search. A scan statistic moves a window across space or time and records the most unusual count, and its distribution under the null hypothesis is found by simulation or theory, so that the chance of a cluster this large is known. Control charts track a count against its expected value and signal when it exceeds a limit. Both methods give a result that is adjusted for the number of places and times examined, and neither proves that a cluster has a cause.

The reporting of a surveillance result should give the baseline, the method, the period and the place, and the decision taken. Sandve et al. (2013) recommended recording the steps of an analysis so that its output can be repeated, and Wilkinson et al. (2016) set out principles under which the surveillance data should be findable and reusable for later review.
