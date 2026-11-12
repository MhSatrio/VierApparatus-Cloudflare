---
title: "Toggle Switch and Cellular Memory"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The genetic toggle switch built from two mutually repressing genes that holds one of two stable states, the flipping of the switch by a transient chemical or thermal input, the persistence of the state through cell divisions as a form of cellular memory, the tests that distinguish a true bistable switch from one whose two states are a transient response, the effect of noise and of the expression level of the repressors on the stability of the states, and the reporting of the switch's thresholds and its memory time."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the genetic toggle switch and explain how mutual repression produces two stable states."
  - "State the tests that show a switch is bistable and report its memory and thresholds."
references:
  - "Gardner, T. S., Cantor, C. R., & Collins, J. J. (2000). Construction of a genetic toggle switch in Escherichia coli. Nature, 403(6767), 339-342. https://doi.org/10.1038/35002131"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The genetic toggle switch consists of two repressor genes, each of which represses the other. When one repressor is highly expressed it keeps the other off, and the state in which the first is on and the second off is stable, and the reverse state is equally stable. Gardner et al. (2000) built this circuit in Escherichia coli, and it showed that a bistable switch could be constructed from defined genes and maintained across generations of cells.

The switch is flipped by a transient input. A chemical that inactivates one repressor, or a brief rise in temperature that destabilises it, can push the system across its threshold to the other state, and the new state persists after the input is removed. This response is the signature of a bistable system, in which the state depends on the history of the input and not only on its present value, and it distinguishes the switch from a graded response.

The persistence of the state through cell division makes the toggle a form of cellular memory, since the daughter cells inherit the concentrations of the repressors and remain in the same state. Gardner et al. (2000) showed that the memory persists over many generations, although occasional switching by noise limits how long any state can be held. The rate of spontaneous switching is a key property, and it should be measured rather than assumed.

Tests must distinguish true bistability from a transient response. A switch that returns to its original state when the input is removed is not bistable, and the hysteresis of the response must be shown by varying the input up and down. Cumming (2014) argues that the thresholds and the switching rates should be reported with their intervals, and Ioannidis (2005) described how a single striking demonstration may not reproduce, so the switch should be shown in several cells and experiments.
