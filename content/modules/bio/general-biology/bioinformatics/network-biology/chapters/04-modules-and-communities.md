---
title: "Modules and Communities"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How modules, groups of nodes that are more densely connected to one another than to the rest of the network, are found by community detection, how the modularity of a partition measures its quality, the biological interpretation of a module as a complex, a pathway or a functional unit, the sensitivity of modules to the resolution and to the incompleteness of the data and the need to test a module's function against independent evidence."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain the idea of modularity and how a community detection method partitions a network into modules."
  - "State what a module is taken to mean biologically and the evidence needed to support that interpretation."
references:
  - "Barabási, A.-L., & Oltvai, Z. N. (2004). Network biology: understanding the cell's functional organization. Nature Reviews Genetics, 5(2), 101-113. https://doi.org/10.1038/nrg1272"
  - "Kitano, H. (2002). Systems Biology: A Brief Overview. Science, 295(5560), 1662-1664. https://doi.org/10.1126/science.1069492"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A module is a group of nodes that are more densely connected among themselves than with the rest of the network. The idea is that a biological function is carried out by a set of molecules that interact with one another, and the modules of a network are candidates for such sets. Barabási and Oltvai (2004) described the modular organisation of cellular networks as a central feature of their structure, and Kitano (2002) placed modularity within the broader view of systems biology, in which functions emerge from the interaction of parts.

Community detection methods find a partition of the network into modules. They seek the partition that maximises modularity, a measure that compares the density of edges within each group with the density expected if the edges were placed at random while keeping the degrees. A partition with high modularity has more edges inside its groups than chance would give. The result depends on the method and on a resolution parameter, which sets how large the modules are, and a single network may have several reasonable partitions.

A module is interpreted as a complex, a pathway or a functional unit, and each interpretation requires evidence. A densely connected group may be a protein complex whose members bind one another, or it may be a group of proteins that are well studied together and therefore linked in the literature. The second case is a bias of the data rather than a biological unit, and the difference must be tested.

Platt (1964) recommended that an interpretation be tested against its alternatives. A module interpreted as a pathway should be checked for its enrichment in known pathway members against a background, and the evidence that its members act together should be sought in experiments that do not depend on the literature used to build the network.

Sandve et al. (2013) recommended recording the method, the resolution and the partition used, since the modules reported depend on each. Kitano (2002) emphasised that the function of a system is a property of its parts together, and a module that is named by its members should be tested as a unit.
