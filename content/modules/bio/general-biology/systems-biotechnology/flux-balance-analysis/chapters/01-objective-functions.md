---
title: "Objective Functions"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The objective function that flux balance analysis maximises, the biomass reaction that represents the production of the building blocks of a cell in proportion to their abundance, the assumption that a growing microorganism maximises its growth rate under given conditions, the alternative objectives such as ATP production, the production of a target metabolite and the minimisation of total flux, and the reasons that the choice of objective determines the predicted behaviour and must be justified by the biology."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain the biomass reaction and the assumption that growth is the objective of a microorganism under the modelled conditions."
  - "Compare alternative objectives and state how the choice changes the predicted flux distribution."
references:
  - "Orth, J. D., Thiele, I., & Palsson, B. Ø. (2010). What is flux balance analysis? Nature Biotechnology, 28(3), 245-248. https://doi.org/10.1038/nbt.1614"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The objective function is the quantity that flux balance analysis maximises, and it determines which of the many feasible flux distributions is predicted. The most common objective for microorganisms is the biomass reaction, a pseudo-reaction that consumes the metabolic building blocks, such as amino acids, nucleotides, lipids and cofactors, in proportions that match the composition of a cell. Maximising it predicts a growth rate. Orth et al. (2010) explained that the biomass reaction is a representation of the cell's requirements and not a measured quantity.

The assumption that a microorganism maximises its growth rate is a modelling choice that has been supported in many conditions but not in all. It is most plausible for fast-growing bacteria in a nutrient-rich medium, and it is less plausible for cells that store reserves, respond to stress or switch their metabolism for reasons unrelated to growth. The biology of the organism and the conditions should therefore be considered before the biomass objective is adopted.

Other objectives are used for other questions. Maximising the production of ATP predicts the energy-optimal metabolism, minimising the total flux predicts an economical use of enzymes, and maximising the secretion of a target metabolite predicts the yield for a biotechnological purpose. Each objective produces a different flux distribution, and comparing the predictions under several objectives is a way to see how far the conclusions depend on the choice.

The choice of objective must be justified and reported, since it determines the predictions. Ioannidis (2005) described how a flexible choice of analysis can produce a result that matches an expectation, and an objective selected because it reproduces the data would be such a choice. Sandve et al. (2013) recommended recording the objective, the biomass composition and the reason for choosing it, so that the analysis can be repeated and its assumptions tested.
