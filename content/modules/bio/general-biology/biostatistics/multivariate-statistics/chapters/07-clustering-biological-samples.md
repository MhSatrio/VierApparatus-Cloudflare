---
title: "Clustering Biological Samples"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "Cluster analysis as the grouping of biological samples by their similarity without known group labels, including the hierarchical clustering that builds a tree of nested groups and its linkage choices, the k-means partitioning into a chosen number of groups, the dependence of the clusters on the distance measure and the number of groups, the tests of stability that show whether a cluster persists under resampling, and the caution that a cluster found in data is not evidence that the groups are real classes of biology."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Cluster samples by hierarchical clustering and by k-means and state how the choice of distance and linkage changes the groups."
  - "Test the stability of a cluster under resampling and explain why a cluster found in the data does not by itself establish a biological class."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Felsenstein, J. (1985). Confidence limits on phylogenies: An approach using the bootstrap. Evolution, 39(4), 783-791. https://doi.org/10.1111/j.1558-5646.1985.tb00420.x"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Cluster analysis groups samples by their similarity when no group labels are known. Hierarchical clustering builds a tree in which the most similar samples are joined first and the groups are then merged in order of decreasing similarity, and the tree is cut at a chosen level to give the groups. K-means divides the samples into a chosen number of groups so as to minimise the spread within each. Both methods always produce groups, whether or not the data contain any, and this is the first thing a reader must understand about them.

The result depends on choices. The distance measure, the linkage that determines how groups are merged, and the number of groups all change the clusters, and two reasonable choices can give different partitions of the same samples. A report must state these choices and show how sensitive the groups are to them. A cluster that appears under one choice and vanishes under another is not a stable feature of the data.

Stability is tested by resampling. Samples are removed or perturbed, the clustering is repeated, and the frequency with which each group reappears is recorded. Felsenstein (1985) introduced the bootstrap for the support of branches in a tree, and the same resampling idea gives the stability of a cluster. A group that persists under resampling is more credible than one that does not.

A cluster is not evidence that the groups are real classes of biology. The data may be continuous, and any partition of a continuum is arbitrary. Ioannidis (2005) described how the search for structure in many variables produces patterns that do not replicate, and a cluster is a hypothesis about structure that must be tested in independent samples.

Platt (1964) recommended a test that can show a hypothesis to be wrong, and a claimed class of cells, tissues or patients should be tested against independent data that could confirm or refute it. Sandve et al. (2013) recommended recording the distance, the linkage, the number of groups and the stability assessment, since each determines the clusters reported.
