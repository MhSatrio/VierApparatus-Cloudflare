---
title: "Clustering and Definition of Cell States"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The computational definition of cell types and states by clustering and the assessment of how well the clusters reflect biology, covering dimensionality reduction that places cells in a low-dimensional space of their most variable genes, the choice of the number of principal components and of the clustering resolution that determines how many clusters are found, the stability of clusters under resampling and parameter changes, the use of marker genes to name clusters and the danger of naming a cluster by a gene that is shared with others, the inference of trajectories that describe transitions between states, and the reporting of the clustering parameters and of the stability with its uncertainty."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Assess the stability of a clustering under changes in parameters and resampling, and report the result."
  - "Name clusters by marker genes that are specific to them and state the risk of naming a cluster by a shared gene."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

Cell types and states are defined computationally by clustering cells that have similar profiles. The procedure begins with dimensionality reduction, which places each cell in a space of its most variable genes, and then groups the cells by proximity in that space. The result depends on the choices made at each step, including the number of dimensions retained and the resolution of the clustering, and a clustering that appears clear may be an artefact of those choices. Ioannidis (2005) described how a result that depends on a parameter can be made to appear robust by selecting the parameter, and the stability of the clustering must be tested.

A clustering is stable when it is reproduced under resampling of the cells and under reasonable changes in the parameters. Clusters that persist across these tests are more likely to reflect biology, while clusters that appear only under one setting are fragile. Cumming (2014) argues that the stability should be quantified and reported with its uncertainty, rather than described as clear.

Clusters are named by marker genes, which are genes expressed specifically in them. A marker must be specific, because a gene shared among several clusters cannot distinguish them, and naming a cluster by a shared gene misleads the reader. The markers should be reported with the strength of their specificity, and the names should be justified by the evidence rather than by convention.

Trajectory inference describes how cells move between states, and it assumes an ordering that the data may or may not support. A trajectory inferred from a snapshot is a hypothesis about the dynamics, not a measurement of them. Peng (2011) argued that the parameters of the inference should be reported, so that the trajectory can be reproduced and its assumptions examined. Munafò et al. (2017) argued that the clustering and its stability should be reported in full, since the cell types of a study depend on them.
