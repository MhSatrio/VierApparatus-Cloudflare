---
title: "Metabolic Engineering"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The redesign of the metabolism of a microorganism to produce a chosen compound, covering the design of heterologous pathways that convert a precursor into a product, the supply of precursors and cofactors that the pathway draws upon, the balance of redox and energy cofactors, the analysis of flux control that identifies the steps limiting production, the toxicity of products and intermediates and the tolerance that cells develop, the iterative cycles of strain improvement, the metrics of yield, titre and productivity, and the reporting of engineered strains so that their performance can be compared."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Design a heterologous pathway for a target compound and identify the precursor and cofactor demands it places on the host."
  - "Define yield, titre and productivity and explain why a high value of one does not guarantee high values of the others."
references:
  - "Keasling, J. D. (2010). Manufacturing Molecules Through Metabolic Engineering. Science, 330(6009), 1355-1358. https://doi.org/10.1126/science.1193990"
  - "Keasling, J. D. (2012). Synthetic biology and the development of tools for metabolic engineering. Metabolic Engineering, 14(3), 189-195. https://doi.org/10.1016/j.ymben.2012.01.004"
  - "Orth, J. D., Thiele, I., & Palsson, B. Ø. (2010). What is flux balance analysis? Nature Biotechnology, 28(3), 245-248. https://doi.org/10.1038/nbt.1614"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

Metabolic engineering redesigns the metabolism of a cell so that it makes a compound that it does not make naturally, or makes more of one that it does. Keasling (2010) described it as the use of the cell as a factory, in which pathways are assembled from enzymes that may come from other organisms and the flow of material is directed towards the product. The field depends on understanding the metabolism of the host well enough to know where the flow can be increased and where it will be lost.

The topic begins with the design of the pathway, which links a precursor to the target through a series of enzymatic steps. Each step must be catalysed by an enzyme that works in the host, and the pathway must be balanced with the host's own metabolism. Keasling (2012) argued that tools from synthetic biology and from systems analysis are both needed, since the pathway is designed by synthetic methods but its behaviour is governed by the whole network.

The product draws on precursors and cofactors that the host also needs for growth. A pathway that consumes a precursor starves the host, and a pathway that consumes a cofactor disturbs the redox balance. Orth et al. (2010) showed that constraint-based models can reveal these competitions, and they are used to identify which reactions compete with the product for resources.

The remaining chapters cover the control of flux, the effects of toxicity, the iterative improvement of strains and the reporting of results. Ioannidis (2005) described how a strain that appears to perform well in a single experiment may not reproduce, and Cumming (2014) argues that yields should be reported with their intervals. Sandve et al. (2013) and Peng (2011) recommended recording the strains, the pathways and the conditions so that each result can be reproduced.
