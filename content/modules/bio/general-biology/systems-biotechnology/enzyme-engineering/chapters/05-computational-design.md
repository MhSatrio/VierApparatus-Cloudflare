---
title: "Computational Design"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "Computational methods for enzyme design that predict the sequences or structures likely to catalyse a chosen reaction, including the placement of a transition-state model in an active site, the scoring of candidate sequences by their energy and their compatibility with the fold, the use of evolutionary information and of machine learning trained on known variants, the experimental testing of the designs that the computation proposes, and the reasons that predicted activity is often lower than the designed value and must be measured."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how a computational design method scores candidate sequences for a target reaction."
  - "Explain why a computationally designed enzyme must be tested experimentally and why its predicted activity is often an overestimate."
references:
  - "Bornscheuer, U. T., Huisman, G. W., Kazlauskas, R. J., Lutz, S., Moore, J. C., & Robins, K. (2012). Engineering the third wave of biocatalysis. Nature, 485(7397), 185-194. https://doi.org/10.1038/nature11117"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

Computational design proposes enzyme sequences or structures that are predicted to catalyse a chosen reaction. A model of the transition state of the reaction is placed in an active site, and the program searches for amino acid arrangements that hold it in place while keeping the protein folded. Bornscheuer et al. (2012) described how such methods have produced enzymes with activities that were not present in nature, and they have become a complement to experimental design.

The candidates are scored by energy functions that estimate how well they bind the transition state and how stable the fold is. These functions are approximations, and different functions rank the same candidates differently. Evolutionary information, derived from the alignment of natural homologues, can be combined with the energy scores, and machine learning models trained on known variants can predict activity from sequence. Each of these approaches encodes assumptions that should be stated.

The designs must be tested experimentally, since a predicted activity is a hypothesis. Most designed enzymes show activity well below the predicted value, and some show none, because the model omitted dynamics, solvation or the flexibility of the protein. The distance between prediction and measurement is informative, and it should be reported as a calibration of the method.

Predicted activity is often an overestimate, and a design that is selected because its prediction is high is subject to the selection effect. Ioannidis (2005) described how the best of many predictions tends to overstate its value, and the designs should be tested as a set, with all results reported. Sandve et al. (2013) recommended recording the scoring function, its version and the candidates that were tested, so that the computation can be repeated and its calibration assessed.
