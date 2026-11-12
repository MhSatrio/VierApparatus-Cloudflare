---
title: "Tree-Building Methods"
subject: "Biology"
specialization: "General Biology"
academic_level: "Core Biological Sciences"
description: "The main approaches to building a phylogenetic tree from characters: distance, parsimony and likelihood, and the assumptions each one makes."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the principle of parsimony and of maximum likelihood."
  - "Explain why different tree-building methods can give different answers."
references:
  - "Felsenstein, J. (1985). Confidence limits on phylogenies: An approach using the bootstrap. Evolution, 39(4), 783. https://doi.org/10.2307/2408678"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

A tree-building method takes a set of characters or sequences and produces a tree. The methods differ in how they measure the similarity of organisms and in the model of evolution they assume. Distance methods compute a measure of difference between each pair of sequences and build a tree from the matrix of differences. They are fast and simple, but they summarise the data before analysis and can lose information.

Parsimony methods choose the tree that requires the fewest changes of character states to explain the data. The principle is that the simplest explanation, with the fewest evolutionary events, is preferred. Parsimony works well when changes are rare, but it can be misled when the rate of change differs among lineages, because long branches can attract each other and produce a false grouping.

Likelihood methods calculate the probability of the observed data under a specified model of how characters change, and they choose the tree that makes the data most probable. The approach uses a model explicitly, which allows the assumptions to be stated and tested. It is computationally demanding, and the results depend on the model chosen.

Felsenstein (1985) introduced a way of expressing the confidence in a tree through bootstrapping. The method resamples the characters with replacement, builds a tree from each resample and records how often each branch appears. The proportion of resamples that support a branch is its bootstrap value, and it indicates how strongly the data favour the grouping. Bootstrap values are not probabilities, but they are widely used as a measure of support.

Alberts et al. (2022) describe the molecular evolution of genes, including the rates at which sequences change, which determine how informative they are for building trees. The choice of model should reflect this biology, because the rates and patterns of change are not the same across genes and lineages.

The methods are tested on simulated data with known trees, and on empirical datasets where independent evidence supports a particular grouping. A tree that is robust across methods is more reliable than one that depends on a single approach.
