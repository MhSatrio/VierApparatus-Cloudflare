---
title: "Reporting Design and Power"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "What a report of an experimental design must contain for its result to be interpreted and repeated, including the unit of replication, the randomisation and blocking procedure, the effect size, variance, significance level and power assumed in the calculation, the sample size achieved after attrition, the stopping rule of any sequential design and the deposition of the protocol and data."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "List the design and power information that a report must give so that a reader can judge a null or positive result."
  - "State the assumptions of a power calculation and report the sample size achieved, not only the sample size planned."
references:
  - "Button, K. S., Ioannidis, J. P. A., Mokrysz, C., Nosek, B. A., Flint, J., Robinson, E. S. J., & Munafò, M. R. (2013). Power failure: why small sample size undermines the reliability of neuroscience. Nature Reviews Neuroscience, 14(5), 365-376. https://doi.org/10.1038/nrn3475"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A report of an experiment must allow the reader to judge its result, and for a design this means describing how the study was planned as well as what it found. The unit of replication, the randomisation procedure, the blocks and the factors should be stated first, since each determines what the comparisons mean. Peng (2011) argued that a computational result cannot be checked without the means of reproducing it, and for a design the means are the protocol and the plan, which must be available to the reader.

The power calculation should be reported with its assumptions. The effect size of interest, the variance taken from pilot data or the literature, the significance level, the power and the method of calculation should all be stated, so that the reader can see what the study was able to detect. A calculation that gives no assumptions cannot be assessed, and a null result from a study without this information is ambiguous. Button et al. (2013) showed how often such calculations are missing or underpowered, and a report should give the power for the effect that matters.

The sample size achieved should be reported as well as the size planned. Animals die, samples fail and participants withdraw, and the number analysed may fall well below the number planned. Cumming (2014) argues that the precision of each estimate depends on the number of independent units, so the number analysed, with the reasons for each loss, should appear with the result. A sequential design must also report the number of interim analyses, the boundaries used and the decisions taken at each.

The protocol and the data should be deposited with identifiers, so that the design can be checked against the plan and the analysis reproduced. Sandve et al. (2013) recommended keeping the inputs, the steps and the outputs of an analysis together, and a deposited protocol makes it possible to see whether the study followed the plan that was fixed before the data were collected.
