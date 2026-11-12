---
title: "Robustness and Perturbation"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "Robustness as the ability of a biological system to maintain its function despite perturbations to its components or environment, the perturbation experiments that test a system by altering one part and measuring the response, the distinction between robustness to parameter changes and robustness to structural change, the trade-offs in which robustness to one perturbation makes a system fragile to another, and the design of perturbation experiments with replication, controls and intervals that allow the response to be quantified."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Define robustness in a biological system and design a perturbation experiment that tests it."
  - "Explain why a system robust to one perturbation may be fragile to another and state how replication and controls support the inference."
references:
  - "Kitano, H. (2002). Systems Biology: A Brief Overview. Science, 295(5560), 1662-1664. https://doi.org/10.1126/science.1069492"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Robustness is the maintenance of a biological function despite perturbation, whether the perturbation is a mutation, a change in concentration or a change in the environment. A robust system continues to perform its function over a wide range of conditions, and the study of robustness is a way of learning the design of a system from how it fails to fail. Kitano (2002) identified robustness as a central property of biological systems that systems biology must explain.

Perturbation experiments test robustness by altering one component and measuring the response of the system. A knockout removes a gene, an inhibitor reduces the activity of a protein, and a change in an input alters the environment that the system senses. The response is measured across many components and conditions, and a robust system shows little change in its output. The experiment must include controls and replication, since a single perturbation may produce an effect by chance or by an off-target action of the reagent.

Robustness is not a single property. A system may be robust to changes in the strength of its interactions and fragile to the loss of a component, or the reverse. Robustness to parameter changes is a property of the network's dynamics, while robustness to structural change depends on its architecture and redundancy. A design that protects against one perturbation can make the system sensitive to another, and this trade-off is part of the explanation of why biological systems are not robust to everything.

Cumming (2014) argues that the response to a perturbation should be reported as an estimate with its interval, and the number of replicates behind each estimate should be stated. Ioannidis (2005) described how a single striking result from a perturbation can fail to replicate, and the response should be confirmed in independent experiments. Sandve et al. (2013) recommended recording the reagents, the controls and the measurements, so that a perturbation experiment can be repeated.
