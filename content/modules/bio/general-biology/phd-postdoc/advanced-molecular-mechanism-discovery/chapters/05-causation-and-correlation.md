---
title: "Causation and Correlation of Molecular Events"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The distinction between correlation of molecular events and causal dependence in the discovery of mechanisms, covering the observation that two molecular events co-occur or change together and the possibility that both are caused by a third factor, the use of temporal ordering, intervention and dose response to move from association toward causation, the danger of inferring a mechanism from a correlation in omics data without a perturbation test, the role of causal diagrams in stating the assumed relations between events, the consideration of reverse causation in which the apparent cause is a consequence, and the reporting of the strength of the causal inference at each step."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Distinguish an association between molecular events from a causal dependence and state the experiment that moves the inference from one to the other."
  - "Identify reverse causation and common cause explanations for an observed correlation and state how each is excluded."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

Molecular events are often observed to co-occur, and the temptation is to read the co-occurrence as a mechanism. Two proteins may be found together, two transcripts may rise together, or a modification may accompany a change in activity, and each association is a hypothesis rather than a demonstration. Ioannidis (2005) described how many findings rest on associations that do not survive a test of causation, and the discipline of the field lies in separating what is observed from what is shown to be the cause.

Association can arise from a common cause, in which a third factor drives both events, or from reverse causation, in which the apparent cause is a consequence of the apparent effect. Each possibility must be considered and tested. A common cause can be removed by experiment, and reverse causation can be excluded by establishing the temporal order of the events. Cumming (2014) argues that the strength of an association should be reported with its interval, since a weak correlation with a wide interval supports little.

Moving from association toward causation requires intervention. Perturbing one event and observing whether the other changes is the test that separates a cause from a companion. A dose-response relation, in which the size of the consequence follows the size of the perturbation, strengthens the inference further. Munafò et al. (2017) argued that the strength of the causal claim should be stated at each step, so that the reader can see which parts of the mechanism are supported by intervention and which by association.

The danger is greatest in omics data, where thousands of correlations are computed and some are inevitably strong by chance. An inference of a mechanism from such a correlation, without a perturbation test, is a hypothesis that requires confirmation. Causal diagrams can state the assumed relations between events and make explicit which paths are being tested. Peng (2011) argued that the reasoning from data to mechanism should be reproducible, and the diagram provides a means of recording it.
