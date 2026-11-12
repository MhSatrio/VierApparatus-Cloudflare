---
title: "Multiple Alignment and Phylogenetic Trees"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How three or more sequences are aligned together to reveal conserved positions and shared structure, the progressive and iterative methods used by MUSCLE and MAFFT, how a phylogenetic tree is inferred from an alignment by distance or likelihood methods, and how bootstrap support is used to express the confidence of each branch of the tree."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how a multiple sequence alignment is built and why aligning many sequences at once reveals conserved positions."
  - "Explain how bootstrap resampling is used to assess the confidence of the branches of a phylogenetic tree."
references:
  - "Edgar, R. C. (2004). MUSCLE: multiple sequence alignment with high accuracy and high throughput. Nucleic Acids Research, 32(5), 1792-1797. https://doi.org/10.1093/nar/gkh340"
  - "Katoh, K., & Standley, D. M. (2013). MAFFT Multiple Sequence Alignment Software Version 7: Improvements in Performance and Usability. Molecular Biology and Evolution, 30(4), 772-780. https://doi.org/10.1093/molbev/mst010"
  - "Felsenstein, J. (1985). Confidence limits on phylogenies: An approach using the bootstrap. Evolution, 39(4), 783-791. https://doi.org/10.1111/j.1558-5646.1985.tb00420.x"
---

A multiple sequence alignment places three or more sequences in columns so that positions that descend from a common ancestral residue line up. Conserved columns indicate residues that are constrained by function or structure, and variable columns indicate those that have changed, so the alignment is a summary of evolutionary history as well as a data structure. Aligning many sequences exactly is computationally expensive, and most practical tools use heuristics.

The most common strategy is progressive alignment. Pairs of sequences are aligned first, guided by a tree of their similarities, and the alignments are then merged step by step. Edgar (2004) described MUSCLE, which improves the initial alignment by repeatedly re-estimating the tree and realigning the sequences, and this iterative refinement gives accurate alignments at high speed. Katoh and Standley (2013) described MAFFT, which uses fast methods to identify homologous regions and offers several refinement options.

Once an alignment exists, a phylogenetic tree can be inferred from it. Distance methods compute the evolutionary distance between each pair of sequences and build a tree from the distances. Likelihood methods evaluate the probability of the observed alignment for each candidate tree under an explicit model of substitution, and they choose the tree with the highest probability. The methods can give different trees when the sequences are very similar or very divergent.

The reliability of each branch is assessed by bootstrap resampling. Felsenstein (1985) proposed resampling the columns of the alignment with replacement, rebuilding the tree from each resampled alignment and recording how often each branch appears. A branch that appears in most of the resampled trees is well supported, while one that appears rarely is not.

Bootstrap support measures the consistency of the data with a branch, not the probability that the branch is correct. An alignment with errors or with a model that does not fit can give strong support for a wrong tree, so the support values must be read with the quality of the alignment in mind.
