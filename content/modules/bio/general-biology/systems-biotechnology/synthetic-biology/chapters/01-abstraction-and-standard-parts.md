---
title: "Abstraction and Standard Parts"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The engineering principles of abstraction and standardisation applied to biological parts, the hierarchy of parts, devices and systems that allows a designer to work at each level, the definition of a part by its function and its interfaces, the registry of standard parts with their documented behaviour, the gap between the idealised part and the context-dependent behaviour of the same sequence in a cell, and the need for each standard to be backed by characterisation data."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the hierarchy of parts, devices and systems and state what each level abstracts away."
  - "Explain why a standard part must be accompanied by characterisation data and why the same sequence can behave differently in different cells."
references:
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

Engineering succeeds by abstraction. An electronic designer uses a resistor by its resistance without considering its atoms, and a synthetic biologist aims to use a promoter by its strength and its regulation without considering every molecular interaction. Parts are the lowest level of this hierarchy, and they are combined into devices, which are combined into systems. Each level hides the detail of the level below, and the design becomes manageable when the detail can be ignored safely.

Standardisation means that parts are defined by their function and their interfaces, so that they can be exchanged between designs. A standard part has a documented sequence, a stated function and a defined way of connecting to other parts, and a registry of such parts allows a designer to choose among them. The idea is useful for building libraries, but it assumes that the part performs the same function wherever it is used, and that assumption is not always true.

The same sequence can behave differently in different cells, because the host's transcription machinery, its growth state and the other genes present all affect the expression of the part. A promoter characterised in one strain may be weaker or stronger in another, and a designed device may fail when it is moved to a new context. The abstraction is therefore an approximation whose limits must be measured for each context in which the part is used.

Every standard part should be accompanied by characterisation data, including the conditions under which the data were obtained and the variability between measurements. Cumming (2014) argues that a part's behaviour should be reported with its interval, since a single measurement may not reflect its typical performance. Sandve et al. (2013) recommended recording the sequence, the strain and the conditions, and Peng (2011) argued that a design is reproducible only when its means of construction are available.
