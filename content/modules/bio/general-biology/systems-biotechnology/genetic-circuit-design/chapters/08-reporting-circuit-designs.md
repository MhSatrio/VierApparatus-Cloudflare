---
title: "Reporting Circuit Designs"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "What a report of a genetic circuit design must contain for it to be rebuilt, tested and compared with other designs, including the specification and its truth table, the gates and their library versions, the sequences and the context in which they were measured, the simulations and their predicted performance, the measured truth table with replicates and intervals, the separation between high and low outputs, the failures and their diagnoses, and the deposition of the specification, the design files and the data."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "List the specification, gates, sequences, simulations and measurements that a circuit design report must give."
  - "Report a circuit's measured truth table with its replicates, intervals and failures so that it can be compared with other designs."
references:
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Nielsen, A. A. K., Der, B. S., Shin, J., Vaidyanathan, P., Paralanov, V., Strychalski, E. A., Ross, D., Densmore, D., & Voigt, C. A. (2016). Genetic circuit design automation. Science, 352(6281), aac7341. https://doi.org/10.1126/science.aac7341"
---

A genetic circuit design is useful to others only if they can rebuild it and test its claims. The report should begin with the specification, the truth table and the thresholds that define high and low, since every other result depends on them. Sandve et al. (2013) recommended that the inputs, steps and outputs of an analysis be kept together, and for a circuit the inputs include the specification, the gates and the strains.

The gates and their sequences should be listed with the version of the library from which they were taken. A gate's behaviour depends on the context in which it was measured, so the host, the copy number and the medium should be given. Peng (2011) argued that a result is reproducible only with the means of producing it, and for a circuit these means are the sequences and the procedure for assembling them.

The measured truth table should be reported with its replicates, its intervals and the separation between high and low outputs. Cumming (2014) argues that each estimate should be given with its precision, and a truth table reported as a single set of values hides the variation between cells and experiments. The simulation that preceded the build should be reported alongside the measurement, with its predicted performance, so that the agreement between them can be judged.

The failures and their diagnoses should be included, since they show what was learned from the design. Nielsen et al. (2016) showed that automated design improves when failures are recorded and fed back, and a report that omits the failures gives a misleading impression of the success of the design. The specification, the design files and the data should be deposited together with identifiers.
