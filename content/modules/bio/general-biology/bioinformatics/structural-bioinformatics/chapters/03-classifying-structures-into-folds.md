---
title: "Classifying Structures into Folds"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How protein structures are classified into folds and families by their structural similarity, the hierarchy that groups structures by class, architecture, topology and homologous superfamily, the use of structure comparison to place a new structure in the hierarchy and the way a classification is revised as new structures are determined, with the caution that a classification of shape is not a classification of function."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the levels of a structural classification and state what each level groups together."
  - "Place a new structure in a classification by comparing it with the representatives of each fold."
references:
  - "Holm, L., & Sander, C. (1993). Protein structure comparison by alignment of distance matrices. Journal of Molecular Biology, 233(1), 123-138. https://doi.org/10.1006/jmbi.1993.1489"
  - "Berman, H. M. (2000). The Protein Data Bank. Nucleic Acids Research, 28(1), 235-242. https://doi.org/10.1093/nar/28.1.235"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The structures in the Protein Data Bank, described by Berman (2000), number in the hundreds of thousands, and their organisation requires a classification. Structural classifications group the domains of proteins into a hierarchy of levels. At the top are the broad classes, such as proteins built mainly of helices, mainly of strands or of both, and below them the architectures, the topologies and the families of proteins that share an evolutionary origin. Each level is defined by the shape of the structures it contains, and the levels become more specific as they descend.

The classification uses structural comparison to decide membership. A new structure is compared with the representatives of each fold, using the methods of the earlier chapters, and placed in the fold with which it shares the most similarity. Holm and Sander (1993) described the comparison that underlies this kind of classification, and the placement of a new structure depends on the comparison's score and on the reference set against which it was made.

Classifications are revised. A structure determined later may show a relationship that was not visible earlier, and two folds may be merged or a fold split as new structures are added. The version of the classification should therefore be stated with any result that uses it, since a structure's class may change without the structure itself changing.

A structural class is a classification of shape, and shape is not function. Alberts et al. (2022) describe how proteins of a common fold can carry out different tasks, and two proteins in one fold may have diverged in function as far as their sequences have diverged. A claim that a structure's fold implies a function needs evidence beyond the classification.

Sandve et al. (2013) recommended recording the version of any resource that an analysis relies on, and the version of the classification, like the version of the database of structures, is part of the record.
