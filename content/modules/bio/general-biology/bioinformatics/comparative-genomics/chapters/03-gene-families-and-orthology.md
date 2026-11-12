---
title: "Gene Families and Orthology"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How gene families are defined by sequence similarity and how the members of a family are classified as orthologues or paralogues, why the distinction matters for inferring function from another species, the methods used to cluster genes into families across several genomes, the expansion and contraction of families in each lineage and the errors that arise when families are clustered at the wrong threshold."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Define orthologues and paralogues and explain why the distinction matters for transferring a function between species."
  - "Describe how genes are clustered into families across genomes and how the threshold affects the families found."
references:
  - "Altschul, S. F., Gish, W., Miller, W., Myers, E. W., & Lipman, D. J. (1990). Basic local alignment search tool. Journal of Molecular Biology, 215(3), 403-410. https://doi.org/10.1016/S0022-2836(05)80360-2"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A gene family is a set of genes that descend from a common ancestral gene. Members are found by sequence similarity, using searches of the kind described by Altschul et al. (1990), and the family is then examined for its internal structure. Two members of a family may be orthologues, which were separated by a speciation event, or paralogues, which arose by a duplication within one genome. Alberts et al. (2022) describe the duplication of genes as one of the main sources of new function, and the distinction between the two kinds of relationship depends on this history.

The distinction matters for function. Orthologues usually retain the function of their common ancestor, so a function determined in one species can often be transferred to its orthologue in another. Paralogues may have diverged in function after the duplication, so the transfer is less safe. An analysis that assigns the function of a human gene to a mouse gene by name alone may be correct for orthologues and wrong for paralogues, and the relationship must be determined first.

Families are built by clustering. Genes from several genomes are compared, and those that are similar above a threshold are grouped. The threshold determines the result: a low threshold merges distant families and a high one splits true families into fragments. The threshold must be chosen with the expected divergence in mind, and the families should be examined for the cases where the clustering is uncertain.

Family size changes between lineages. A family that has expanded in one species may reflect an adaptation or a neutral accumulation of duplicates, and a family that has contracted may reflect loss. The change must be tested against the expected background, since a difference in size may be an artefact of assembly or annotation. Ioannidis (2005) described how multiple comparisons inflate the number of apparent findings, and a comparison of many families needs a correction for the number of tests.

Sandve et al. (2013) recommended that the thresholds of a clustering be recorded, since they determine the families that every later analysis will treat as units.
