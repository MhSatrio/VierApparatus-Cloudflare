---
title: "Modular Organisation"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The organisation of biological systems into modules, groups of interacting components that perform a function largely independently of others, the hierarchy of modules within modules that gives a system its layered structure, the reuse of modules in different contexts, the interfaces through which modules communicate, the way that modularity supports evolution and engineering by allowing parts to change without disrupting the whole, and the difficulty of defining module boundaries when interactions cross them."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe a module in a biological system and explain how its interfaces with other modules define its function."
  - "Explain why modular organisation helps a system evolve and how it complicates the definition of module boundaries."
references:
  - "Kitano, H. (2002). Systems Biology: A Brief Overview. Science, 295(5560), 1662-1664. https://doi.org/10.1126/science.1069492"
  - "Alon, U. (2007). Network motifs: theory and experimental approaches. Nature Reviews Genetics, 8(6), 450-461. https://doi.org/10.1038/nrg2102"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Biological systems are organised into modules, which are groups of components that interact strongly among themselves and weakly with others, and that perform a function with some independence. A signalling pathway, a metabolic pathway and a transcriptional programme are examples at different scales. Kitano (2002) noted that modularity is one of the principles that makes biological systems both robust and understandable, since a module can be studied as a unit before its links to the rest of the system are considered.

Modules are arranged hierarchically, so that a module at one level is composed of smaller modules at the level below. A cell contains organelles, each organelle contains complexes, and each complex contains proteins, and each level of the hierarchy has its own interactions and its own function. Alon (2007) described network motifs as the small building blocks of such structures, and the modules are assemblies of these motifs performing larger tasks.

A module communicates with other modules through its interfaces, which are the components that transmit signals or metabolites across its boundary. The interfaces determine how a module can be used in another context, and a module with a well-defined interface can be reused without understanding its internals. This reuse is one reason that modularity supports evolution, since a new function can be built by combining existing modules, and it is also the basis of engineering in synthetic biology.

Module boundaries are not always clear. Interactions cross the supposed boundaries of modules, and a component may belong to several modules at once, which makes the definition of a module depend on the purpose of the analysis. Sandve et al. (2013) recommended recording the definitions and the data used to draw them, since a modular decomposition that is not stated cannot be checked or reproduced by another group.
