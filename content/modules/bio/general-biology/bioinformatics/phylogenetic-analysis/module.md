---
title: "Phylogenetic Analysis"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The practical inference of phylogenetic trees from sequence data, covering the choice of taxa and sequences, the alignment that precedes tree building, the distance and maximum-likelihood methods and the software that implements them, the model of sequence evolution and its effect on the tree, the bootstrap support of each branch, the rooting of a tree and the reporting that allows a phylogenetic result to be checked and repeated."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Infer a phylogenetic tree from a multiple sequence alignment using a distance method and a maximum-likelihood method, and compare the two."
  - "Interpret the bootstrap support of each branch and report the tree, its model and its rooting so that the analysis can be repeated."
references:
  - "Felsenstein, J. (1985). Confidence limits on phylogenies: An approach using the bootstrap. Evolution, 39(4), 783-791. https://doi.org/10.1111/j.1558-5646.1985.tb00420.x"
  - "Tamura, K., Stecher, G., Peterson, D., Filipski, A., & Kumar, S. (2013). MEGA6: Molecular Evolutionary Genetics Analysis Version 6.0. Molecular Biology and Evolution, 30(12), 2725-2729. https://doi.org/10.1093/molbev/mst197"
  - "Stamatakis, A. (2014). RAxML version 8: a tool for phylogenetic analysis and post-analysis of large phylogenies. Bioinformatics, 30(9), 1312-1313. https://doi.org/10.1093/bioinformatics/btu033"
  - "Nguyen, L.-T., Schmidt, H. A., von Haeseler, A., & Minh, B. Q. (2015). IQ-TREE: A Fast and Effective Stochastic Algorithm for Estimating Maximum-Likelihood Phylogenies. Molecular Biology and Evolution, 32(1), 268-274. https://doi.org/10.1093/molbev/msu300"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A phylogenetic tree is a hypothesis about the order in which lineages separated. Inferring one from sequence data is a chain of decisions: which sequences to include, how to align them, which model of change to assume, which method to use to search for the tree and how to judge the support for each branch. Each decision changes the answer, and a tree that is presented without its decisions cannot be assessed.

The topic follows that chain. It begins with the choice of taxa and sequences, then the methods that infer trees from distances and from likelihoods, with the software that implements them. Felsenstein (1985) described the bootstrap that measures the support for each branch, and the later chapters cover the model of sequence change, the rooting of the tree and the report that makes the analysis repeatable.

The tools named in the topic, MEGA, RAxML and IQ-TREE, are examples of the family of programs in use. Tamura et al. (2013), Stamatakis (2014) and Nguyen et al. (2015) describe their own methods, and the topic compares what each does rather than treating any one as the standard.
