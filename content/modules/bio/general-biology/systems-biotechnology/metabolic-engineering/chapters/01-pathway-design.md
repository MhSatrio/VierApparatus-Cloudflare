---
title: "Pathway Design"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The design of a heterologous metabolic pathway from a precursor to a target compound, the selection of enzymes from databases and from other organisms that catalyse each step, the matching of enzymes to the host's conditions of pH, temperature and cofactor availability, the choice between a short pathway with few steps and a longer one that avoids a toxic intermediate, the stoichiometric calculation of the maximal theoretical yield of the pathway, and the importance of testing each enzyme in the host rather than assuming its activity from the literature."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Assemble a candidate pathway from a precursor to a target and calculate its theoretical maximal yield from the stoichiometry."
  - "Explain why an enzyme's activity measured elsewhere must be tested in the host before the pathway is built."
references:
  - "Keasling, J. D. (2010). Manufacturing Molecules Through Metabolic Engineering. Science, 330(6009), 1355-1358. https://doi.org/10.1126/science.1193990"
  - "Orth, J. D., Thiele, I., & Palsson, B. Ø. (2010). What is flux balance analysis? Nature Biotechnology, 28(3), 245-248. https://doi.org/10.1038/nbt.1614"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A pathway design links a precursor to the target through a sequence of reactions, each catalysed by an enzyme. The design starts from the target and works back to a precursor the host can supply, and it chooses the enzyme for each step from the literature and from databases. Keasling (2010) described how pathways for valuable compounds have been assembled from enzymes of many organisms, and the design must match each enzyme to the reaction it will catalyse.

The enzymes must work in the host. An enzyme from a plant may require a pH, a temperature or a cofactor that the host does not provide, and its activity may be lost when it is expressed in a foreign cell. The conditions under which the host grows are part of the design, and an enzyme chosen without them may be inactive. Orth et al. (2010) emphasised that the network context determines what a pathway can do, so the host's supply of cofactors should be checked against the pathway's demands.

Pathways can differ in length, and a shorter route with fewer steps may be preferable to a longer one. A longer route may avoid a toxic intermediate or use a cheaper precursor, and the choice depends on the trade-offs. The theoretical maximal yield of each candidate can be calculated from its stoichiometry, which gives an upper limit for comparison and shows how much of the precursor is lost in each route.

An enzyme's activity reported in the literature may have been measured under different conditions, and it should be tested in the host before the pathway is assembled. Ioannidis (2005) described how a result that is not reproduced in a new setting cannot be relied upon, and Cumming (2014) argues that each enzyme's activity should be reported with its interval. Sandve et al. (2013) recommended recording the enzyme sources, the stoichiometry and the calculation of the maximal yield.
