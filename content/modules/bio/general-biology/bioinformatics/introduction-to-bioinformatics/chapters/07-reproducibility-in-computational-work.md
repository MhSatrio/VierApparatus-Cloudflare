---
title: "Reproducibility in Computational Work"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "Why a computational analysis must be reproducible from its data and code, the practices that make it so, including recording software versions, scripting every step, managing random seeds and keeping the raw data unchanged, and the way reproducibility lets others check a result and find its errors."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "List the practices that allow a computational analysis to be repeated by another person and explain why each matters."
  - "Explain why a result that cannot be reproduced cannot be relied upon, even when it was produced by a correct method."
references:
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Taschuk, M., & Wilson, G. (2017). Ten simple rules for making research software more robust. PLOS Computational Biology, 13(4), e1005412. https://doi.org/10.1371/journal.pcbi.1005412"
---

A computational result is reproducible when another person, with the same data and code, obtains the same output. Peng (2011) described reproducibility as the minimum standard for computational science, since the code that produces a figure is part of the scientific record, and a figure that cannot be regenerated cannot be checked. The standard is difficult to meet, because analyses are built from many steps, each with its own software, parameters and version, and small changes in any of them can change the result.

Sandve et al. (2013) set out a series of practical rules. Every step should be scripted, so that the analysis can be rerun from the raw data without manual intervention. The software and its version should be recorded, along with the operating environment. Random processes should be given fixed seeds so that the results are repeatable. The raw data should be kept unchanged, and all transformations should be written as code that can be inspected.

Software itself must be developed with care. Taschuk and Wilson (2017) recommended practices such as version control, automated tests and clear documentation, which make it easier to detect errors and to change the code without breaking it. They noted that research software is often written quickly by people who are not software specialists, and that these practices reduce the chance of an error going unnoticed.

Reproducibility also protects against error in the original analysis. When an analysis is scripted, a second person can rerun it, change one parameter and see how the result depends on it. A result that depends sensitively on an arbitrary choice is then visible, which is valuable information.

The aim is not perfect repetition of every computation, which is sometimes impossible, but a record that allows the result to be understood, checked and rebuilt.
