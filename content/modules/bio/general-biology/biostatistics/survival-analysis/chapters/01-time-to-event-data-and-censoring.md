---
title: "Time-to-Event Data and Censoring"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The structure of time-to-event data, in which each individual has a time, an event indicator and a censoring status, the types of censoring including right censoring at the end of follow-up, loss to follow-up and competing events, the assumption that censoring is independent of the event process, the consequences of informative censoring for survival estimates and the reporting of the number of events and of censored individuals with the follow-up time."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the data of a time-to-event study and state for each individual the time, the event indicator and the censoring status."
  - "Explain why an independent censoring assumption is needed and give an example of informative censoring that would bias an estimate."
references:
  - "Kaplan, E. L., & Meier, P. (1958). Nonparametric estimation from incomplete observations. Journal of the American Statistical Association, 53(282), 457-481. https://doi.org/10.1080/01621459.1958.10501452"
  - "Cox, D. R. (1972). Regression models and life-tables. Journal of the Royal Statistical Society Series B: Statistical Methodology, 34(2), 187-202. https://doi.org/10.1111/j.2517-6161.1972.tb00899.x"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

Time-to-event data record, for each individual, the time at which it was observed, and whether the event of interest occurred at that time. An individual who died during follow-up has an event at its observed time. An individual who was still alive when the study ended has a censored time: the event did not occur in the observed period, and the time is a lower bound on the true time to the event. Kaplan and Meier (1958) showed how these censored observations can be used in the estimation of the survival curve, which is why the data are not simply the times of the events.

The most common censoring is right censoring at the end of follow-up, but censoring also occurs when individuals are lost to follow-up, withdraw from the study or are alive when the analysis is performed. Competing events complicate the picture: an individual who died of another cause cannot experience the event of interest, and the treatment of such competing events changes what the survival curve estimates.

The central assumption is that censoring is independent of the event process. Given the characteristics of an individual, the time at which it is censored must carry no information about the time to the event. If patients who feel worse are more likely to drop out, their censoring is informative, and the survival curve overestimates survival, since the patients most likely to die have left the record. Cox (1972) developed the regression framework that presumes this independence, and the assumption must be considered for each study rather than taken for granted.

Cumming (2014) argues that the estimate and its precision should be reported together, and survival estimates have intervals that show their uncertainty. The number of events and the number of censored individuals, with the follow-up time, must be given, since a survival curve based on few events is imprecise however smooth it appears.

Ioannidis (2005) described how selective loss of subjects can bias findings, and informative censoring is a form of selection that the study must examine and report. Sandve et al. (2013) recommended recording the censoring rule and the counts, since the reader must know which individuals contributed to each part of the curve.
