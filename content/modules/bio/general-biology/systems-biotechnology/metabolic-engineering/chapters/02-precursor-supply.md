---
title: "Precursor Supply"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The supply of the precursor molecules that a heterologous pathway consumes, the competition between the pathway and the host's own metabolism for the same precursor, the strategies that increase precursor flux such as overexpressing the upstream enzymes, deleting competing branches and redirecting carbon from central metabolism, the consequences of depleting an essential precursor for growth, and the use of a metabolic model to identify the precursor that limits the yield."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Identify the precursor that limits a pathway's yield and state the strategies that increase its supply."
  - "Explain how deleting a competing branch can raise the yield of a product while reducing growth, and how to test the trade-off."
references:
  - "Keasling, J. D. (2010). Manufacturing Molecules Through Metabolic Engineering. Science, 330(6009), 1355-1358. https://doi.org/10.1126/science.1193990"
  - "Keasling, J. D. (2012). Synthetic biology and the development of tools for metabolic engineering. Metabolic Engineering, 14(3), 189-195. https://doi.org/10.1016/j.ymben.2012.01.004"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

A pathway can produce no more than the precursor that feeds it, so the supply of the precursor often limits the yield of the product. The precursor is drawn from the central metabolism of the host, and the host uses the same precursor for its own growth and for the reactions it needs. The engineer must increase the flow of the precursor into the pathway without starving the cell, which is a balance between the demands of the product and the demands of life.

The strategies for increasing supply include overexpressing the upstream enzymes that make the precursor, deleting the branches that consume it without benefit, and redirecting carbon from the central pathways into the precursor. Each strategy changes the flux of many reactions, and its effect can be predicted with a model of the network. Keasling (2012) described how such tools are used together to design the supply of a precursor.

Deleting a competing branch can raise the yield of the product, but it may also reduce growth, since the branch may have supplied a building block the cell needs. The trade-off between growth and production is central to the design of production strains, and it is measured by the rate of growth and the rate of production together. A strain that grows well but produces little, or produces well but grows slowly, must be judged by the balance that matters for the process.

The precursor that limits the yield can be identified from a model of the network, by finding the reaction whose increase raises the product flux most, or by measuring the concentrations of the precursors in the cell. Cumming (2014) argues that the effect of each strategy should be reported with its interval, since small increases in yield may be within the variation between cultures. Ioannidis (2005) described how a strategy that is chosen after an initial result may not reproduce, and the strategies should be tested as a pre-specified set.
