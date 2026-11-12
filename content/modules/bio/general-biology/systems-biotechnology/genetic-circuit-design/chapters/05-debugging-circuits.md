---
title: "Debugging Circuits"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The systematic diagnosis of a genetic circuit that fails in the cell, by measuring each gate separately and then the assembled circuit, by testing the gates in isolation and in combination to locate the failing component, by checking for crosstalk, toxicity and mutation of the construct, by reading the output at each stage to find where the signal is lost, and by recording each diagnosis so that the library and the design rules can be improved."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Diagnose a circuit that fails by measuring its gates separately and in combination to find the component that loses the signal."
  - "Distinguish failure caused by crosstalk, toxicity and mutation and state the test that identifies each."
references:
  - "Nielsen, A. A. K., Der, B. S., Shin, J., Vaidyanathan, P., Paralanov, V., Strychalski, E. A., Ross, D., Densmore, D., & Voigt, C. A. (2016). Genetic circuit design automation. Science, 352(6281), aac7341. https://doi.org/10.1126/science.aac7341"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

A circuit that fails in the cell has several possible causes, and the first task is to find which component is responsible. The diagnosis proceeds from the parts to the whole. Each gate is measured alone with its input and output, so that its response can be compared with the library, and then the gates are measured in pairs and finally as the assembled circuit. The stage at which the expected signal disappears marks the component that needs attention.

Crosstalk is one of the most common causes. A regulator may bind a promoter it was not intended for, or an input may act on more than one gate, and the output then differs from the specification in a systematic way. The test is to vary each input separately and observe whether an output changes that should not. Nielsen et al. (2016) found that orthogonality failures were a frequent reason for a design to behave unexpectedly, and each unexpected response should be traced to its source.

Toxicity and load are a second cause. A regulator that is expressed at high levels may slow or kill the cell, and the circuit then appears to fail because the cells are unhealthy. A control with the circuit's regulators but without its output will reveal this, since growth and viability are measured in the same cells. The effect of load on growth should be reported alongside the circuit's behaviour.

Mutation is a third cause, since a construct may be inactivated by a change in the sequence during growth. Sequencing the construct after the experiment, and measuring the output of populations at several times, reveals such changes. Cumming (2014) argues that each diagnosis should be reported with its measurement and its uncertainty, and Peng (2011) argued that a debugging record must be kept so that the cause can be reproduced. Each diagnosis should be entered into the library so that the same failure is not repeated.
