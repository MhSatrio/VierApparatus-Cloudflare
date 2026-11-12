---
title: "Containment and Control"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The design of engineered organisms that remain under control, including biological containment through auxotrophy that makes a strain dependent on a nutrient absent from the environment, kill switches that trigger cell death when a signal is applied or removed, the escape of an engineered function through mutation or horizontal transfer, the evaluation of each safety feature by its failure rate measured over many generations, and the principle that containment must be verified experimentally rather than assumed from the design."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe biological containment strategies and state the failure modes that each one is subject to."
  - "Explain why a containment feature must be measured by its failure rate over many generations and not only by its design."
references:
  - "Gardner, T. S., Cantor, C. R., & Collins, J. J. (2000). Construction of a genetic toggle switch in Escherichia coli. Nature, 403(6767), 339-342. https://doi.org/10.1038/35002131"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

An engineered organism must be controlled, so that its function does not persist or spread beyond the purpose for which it was built. Containment strategies try to make the organism depend on conditions that exist only in the laboratory or the process. An auxotroph requires a nutrient that is not present in the environment, so that it cannot survive outside the medium supplied to it. The design of containment is part of the engineering, and it is judged by how well it performs in practice rather than by how it is described.

A kill switch causes the death of the cell when a signal is applied or removed. It can be built from a toxin under the control of a regulator that the signal turns on, or from a regulator whose removal from the medium allows the toxin to be expressed. The kill switch is only as reliable as its components, and it is subject to mutation, since a cell that inactivates the toxin gains an advantage and may come to dominate a population over generations.

Escape occurs when an engineered function is lost through mutation, or when a genetic element is transferred to other organisms by horizontal transfer. The rate of escape is a property of the design and the environment, and it must be measured. A containment feature that appears secure over a few generations may fail over many, since the population is large and mutations occur at a steady rate, and the failure rate per generation is the quantity that matters.

Each safety feature should be evaluated by its measured failure rate, reported with its interval and the number of generations and cells over which it was tested. Ioannidis (2005) described how a feature that works in a short experiment may fail when tested more widely, and Cumming (2014) argues that the failure rate should be shown with its uncertainty. Sandve et al. (2013) recommended recording the design, the test conditions and the failure data, and Gardner et al. (2000) showed the importance of testing genetic constructs in the cells that will use them.
