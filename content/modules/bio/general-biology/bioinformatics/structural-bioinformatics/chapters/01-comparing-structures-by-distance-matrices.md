---
title: "Comparing Structures by Distance Matrices"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How two protein structures are compared by the matrices of distances between their residues, how the DALI method finds the alignment that maximises the agreement of these matrices, why the comparison is robust to rotation and translation, the Z-score that expresses the similarity relative to the structures in a reference set and the interpretation of a significant structural similarity between proteins with little sequence identity."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain why a distance matrix describes a protein's shape independently of its orientation in space."
  - "Interpret a structural similarity score and state why a significant structural match can exist between proteins with little sequence identity."
references:
  - "Holm, L., & Sander, C. (1993). Protein structure comparison by alignment of distance matrices. Journal of Molecular Biology, 233(1), 123-138. https://doi.org/10.1006/jmbi.1993.1489"
  - "Zhang, Y. (2005). TM-align: a protein structure alignment algorithm based on the TM-score. Nucleic Acids Research, 33(7), 2302-2309. https://doi.org/10.1093/nar/gki524"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A protein's three-dimensional shape can be described by the distances between its residues, and this description does not depend on how the protein is oriented in space. The matrix of distances between the alpha carbons of all residue pairs captures the fold, and two proteins with similar folds have similar matrices. Holm and Sander (1993) used this property to compare structures, and the DALI method finds the alignment of two proteins that maximises the agreement of their distance matrices.

The alignment is not a sequence alignment. It places residues of one structure against residues of the other so that the corresponding distances agree, and the residues need not be close in sequence. A fold can be conserved while the sequence has diverged far beyond the reach of a sequence search, and the structural comparison is the means of finding such relationships.

The score is normalised. A similarity measure on its own depends on the size of the proteins, and Holm and Sander (1993) expressed the agreement as a Z-score, which compares it with the scores of many unrelated structures of similar size. A large Z-score means that the agreement is unlikely to arise by chance, and the reference set against which it is measured must be stated.

Zhang (2005) described TM-align, which uses a score designed to be less sensitive to the length of the proteins than earlier measures, and the choice of score changes which pairs appear similar. A structural comparison should state its score and its reference set, since the same two proteins can rank differently under different measures.

A significant structural similarity is evidence of a shared fold, and it may indicate a shared ancestor. It is not evidence of a shared function, since proteins of one fold can perform different tasks. Sandve et al. (2013) recommended recording the method and its parameters, and the score, the reference set and the alignment used are the record of a structural comparison.
