---
title: "What a Phylogenetic Tree Represents"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "What the branches, nodes, tips and root of a phylogenetic tree represent, the difference between a tree of species and a tree of genes, why a gene tree can differ from the species tree, the meaning of branch lengths and why a tree is a model of ancestry that rests on assumptions about how sequences change."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Read a rooted phylogenetic tree and state what its tips, nodes, branches and root represent."
  - "Explain why a gene tree may differ from the species tree and what that difference can reveal."
references:
  - "Felsenstein, J. (1985). Confidence limits on phylogenies: An approach using the bootstrap. Evolution, 39(4), 783-791. https://doi.org/10.1111/j.1558-5646.1985.tb00420.x"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A phylogenetic tree is a diagram of ancestry. The tips, or leaves, are the taxa or sequences that are being compared. Each internal node represents a common ancestor from which two or more descendants arose, and the branches connect the ancestors to the tips and to one another. The root, where the tree begins, is the most recent common ancestor of all the tips, and a tree without a root shows relationships but not the direction of time. Felsenstein (1985) worked on the statistical treatment of these trees, and the structure described here is the one on which that treatment rests.

A tree of gene sequences is not automatically a tree of species. A gene can be inherited along a path that differs from the path of the organisms that carry it, through duplication, loss or lateral transfer, and the tree of one gene can differ from the tree of the species. Alberts et al. (2022) describe the processes by which genomes are inherited and rearranged, and these processes are the reason a gene tree may disagree with the species tree. The disagreement is informative, and it is not a failure of the method.

Branch lengths in many trees represent the amount of sequence change along each branch, estimated under the model of change that the analysis assumed. A long branch indicates many substitutions, which may reflect a long time, a fast rate or a poor model. The branch lengths are not times unless a clock has been assumed, and a reader should not treat them as dates.

A tree is therefore a model with assumptions at each step. The tips are chosen, the sequences are aligned, the model of change is assumed and the method searches for the tree that best fits these inputs. Sandve et al. (2013) recommended that the inputs of an analysis be recorded, and a tree reported without its inputs is a conclusion without its evidence.
