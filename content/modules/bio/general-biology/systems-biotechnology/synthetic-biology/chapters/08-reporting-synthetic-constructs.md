---
title: "Reporting Synthetic Constructs"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "What a report of a synthetic biology construct must contain for it to be rebuilt, characterised and compared, including the sequence and its deposition with identifiers, the parts and their characterisation data, the chassis, strain and growth conditions, the measurements of behaviour with their replicates and intervals, the controls for burden and context, the containment features and their tested failure rates, and the deposition of the design, the data and the analysis code."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "List the sequence, chassis, conditions, controls and measurements that a synthetic construct report must give."
  - "Report a construct's behaviour with its replicates, intervals and controls so that another group can rebuild and compare it."
references:
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

A synthetic construct must be reported in enough detail to be rebuilt, because a description that cannot be turned into a working organism is of little use to others. The sequence should be given in full and deposited with an identifier, and each part should be named with its source and version. Peng (2011) argued that a result is reproducible only when its means are available, and for a construct the means include the sequence and the procedure for assembling it.

The chassis, the strain, the growth conditions and the medium should be recorded, since the behaviour of a construct depends on them. A construct measured in one strain at one temperature may behave differently elsewhere, and a report that omits these conditions makes the measurement impossible to compare. Sandve et al. (2013) recommended recording the inputs, the steps and the outputs of a study together, and in synthetic biology the inputs include the strain and the medium.

The behaviour of the construct should be reported with its replicates, its variability and its intervals. Cumming (2014) argues that an estimate should be given with its precision, and a construct measured in a few cells or one culture should be described as such. Ioannidis (2005) described how a result from limited measurements may not reproduce, so the number of independent experiments and the number of cells should be stated.

The controls and the containment features should be reported. A construct should be compared with a control for metabolic burden and with a reference part, and any containment feature should be given with its tested failure rate. The design, the sequence, the data and the analysis code should be deposited together, so that the construct can be rebuilt and its claims tested by others.
