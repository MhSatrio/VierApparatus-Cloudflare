---
title: "Structure Alignment and the TM-score"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How two protein structures are superposed and aligned residue by residue to maximise a similarity score, the TM-score that normalises the score by the length of the protein and makes scores comparable across proteins of different sizes, the rotation and translation that minimise the distance between the aligned residues and the difference between a global structural similarity and a local match of a shared motif."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how a structure alignment superposes two structures and what a TM-score measures."
  - "Distinguish a global structural similarity from a local match of a shared motif and state which the TM-score reports."
references:
  - "Zhang, Y. (2005). TM-align: a protein structure alignment algorithm based on the TM-score. Nucleic Acids Research, 33(7), 2302-2309. https://doi.org/10.1093/nar/gki524"
  - "Holm, L., & Sander, C. (1993). Protein structure comparison by alignment of distance matrices. Journal of Molecular Biology, 233(1), 123-138. https://doi.org/10.1006/jmbi.1993.1489"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A structure alignment places the residues of one protein against those of another and moves one structure in space so that the aligned residues lie close together. The procedure has two coupled parts. The superposition is the rotation and translation that brings the aligned residues together, and the alignment is the choice of which residues correspond. Each depends on the other, and the best result is found by alternating between them until the score stops improving.

Zhang (2005) described TM-align, which optimises the TM-score. The score is designed so that its value does not depend strongly on the length of the proteins, and a random pair of unrelated proteins receives a low score whatever their size. A TM-score above a value around one half is generally taken to indicate that the two proteins share a fold, and the value is normalised by the length of one of the structures, which must be stated, since the normalisation changes the value.

Holm and Sander (1993) compared structures by their distance matrices, and the two approaches agree on the main idea, that the shape can be compared without reference to orientation. The distance-matrix method is sensitive to local rearrangements in a way that a superposition method may not be, and the choice of method changes which relationships are found.

A global similarity and a local match are different claims. Two proteins that share a catalytic motif in a shared arrangement may be globally dissimilar, and a global score will not report the motif. A local analysis is needed to find such a match, and the global TM-score cannot establish it.

Sandve et al. (2013) recommended recording the method and the normalisation, so that a reader knows which of the two structures the score was normalised by and whether the score refers to the whole protein or to a region.
