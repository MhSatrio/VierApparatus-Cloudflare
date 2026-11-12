---
title: "Rooting and Interpreting Trees"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How an unrooted tree is rooted using an outgroup or a midpoint, how the position of the root changes the meaning of every branch, how a tree is read for relationships of ancestry and for the groups it supports, the difference between a monophyletic group and a grouping by shared similarity and the common errors of interpreting a tree as a timeline or a classification."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Root a phylogenetic tree using an outgroup or the midpoint method and explain how the choice of root changes the interpretation."
  - "Distinguish a monophyletic group from a group defined by similarity and read a tree for the relationships it supports."
references:
  - "Tamura, K., Stecher, G., Peterson, D., Filipski, A., & Kumar, S. (2013). MEGA6: Molecular Evolutionary Genetics Analysis Version 6.0. Molecular Biology and Evolution, 30(12), 2725-2729. https://doi.org/10.1093/molbev/mst197"
  - "Felsenstein, J. (1985). Confidence limits on phylogenies: An approach using the bootstrap. Evolution, 39(4), 783-791. https://doi.org/10.1111/j.1558-5646.1985.tb00420.x"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

A tree inferred from sequences is often unrooted. It shows which taxa are close to one another, but not in what direction time ran. The root is placed by an outgroup, a taxon known to lie outside the group of interest, or by the midpoint method, which places the root at the middle of the longest path between two tips. Tamura et al. (2013) describe the midpoint and outgroup options in MEGA, and the choice is a decision that changes the meaning of the whole tree.

The root determines the direction of every branch. Moving the root to another position changes which group is ancestral and which is derived, and a relationship that is clear in one rooting may be reversed in another. The rooting should therefore be justified, and the sensitivity of the conclusions to the root should be checked.

A tree supports the groups that descend from a common ancestor. A monophyletic group contains an ancestor and all of its descendants, and it is the only kind of group that a tree can claim as a line of descent. A group defined by similarity, such as the animals that share a body plan, may not be monophyletic, and a tree may show that such a group is split across the tree. Alberts et al. (2022) describe how the classification of organisms reflects ancestry, and a grouping that is not monophyletic is an artefact of similarity rather than descent.

Branch support must be read with the group. Felsenstein (1985) described the bootstrap as the means of measuring that support, and a group with high support is a group the data consistently recover. A group with low support is one the data do not settle, and it should not be used as a basis for a classification.

A tree is not a timeline. The vertical position of the nodes is not a date, and the length of a branch is not a time unless a clock was assumed. Reading the tree for time requires additional assumptions, and a claim about when a lineage arose is a further step beyond the tree.
