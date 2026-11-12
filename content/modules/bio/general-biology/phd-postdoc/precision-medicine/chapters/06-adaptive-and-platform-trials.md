---
title: "Adaptive and Platform Trials"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "Adaptive and platform trials that evaluate several precision therapies within a common infrastructure, covering the master protocol that governs many sub-studies under shared procedures, the arms that enter and leave the platform according to pre-specified rules, the shared control group that increases efficiency but requires that the population be stable over time, the Bayesian decision rules that express the probability that an arm is superior and the thresholds chosen for action, the control of the false positive rate across the many comparisons made over the life of the platform, the risk of drift in the population and in the standard of care that the shared control may not reflect, and the reporting of each arm, each decision rule and each result with its uncertainty and the time at which it was made."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe a master protocol with several sub-studies and state the rules by which arms enter and leave the platform."
  - "Explain the risk that a shared control group reflects a changing population or standard of care and state how it is checked."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

A platform trial evaluates several therapies against a common control within one master protocol, and the arms enter and leave as results accumulate. The design is efficient, because a shared control serves many comparisons and a therapy that fails can be dropped quickly. The price is complexity, since the rules governing entry, exit and the decisions must be fixed in advance, and the many comparisons over the life of the platform create a multiplicity problem. Ioannidis (2005) described how a series of looks at accumulating data can produce false findings, and the platform must control for this.

Decision rules may be Bayesian, expressing the probability that an arm is superior to control and the thresholds at which the arm is dropped or declared effective. The thresholds must be chosen with the consequences of each error in view, and the operating characteristics of the rules, including the false positive and false negative rates, should be determined by simulation before the platform starts. Cumming (2014) argues that the posterior estimate of each effect should be reported with its interval, rather than only the decision it triggered.

A shared control group increases the efficiency of the platform, but it assumes that the control population is stable over time. If the standard of care changes, or the population enrolled changes, the control in early periods will not be comparable with the control in late periods, and an arm compared with the mixed control may appear to differ for reasons unrelated to the therapy. The stability must be checked, and the comparison must be adjusted for time where the control has changed. Munafò et al. (2017) argued that changes to the protocol and the population should be recorded, so that the drift can be detected.

The control of the false positive rate across the many comparisons is essential, and the platform must state how the error is allocated across arms and over time. Peng (2011) argued that the decision rules and the data must be documented so that each decision can be reproduced. The report should give each arm, each decision rule and each result with its uncertainty and the time at which the decision was made.
