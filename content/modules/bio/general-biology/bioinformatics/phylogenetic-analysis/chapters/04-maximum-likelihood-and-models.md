---
title: "Maximum Likelihood and Models"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How maximum-likelihood methods evaluate a candidate tree by the probability of the observed alignment under an explicit model of sequence substitution, the models that describe the rates of change between residues or bases and the way the choice of model affects the tree, the search through tree space that the software performs and the reasons a model should be justified rather than chosen by habit."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how a maximum-likelihood method scores a tree by the probability of the alignment given the tree and a model."
  - "Describe what a substitution model assumes about the rates of change and state how the model choice is justified."
references:
  - "Nguyen, L.-T., Schmidt, H. A., von Haeseler, A., & Minh, B. Q. (2015). IQ-TREE: A Fast and Effective Stochastic Algorithm for Estimating Maximum-Likelihood Phylogenies. Molecular Biology and Evolution, 32(1), 268-274. https://doi.org/10.1093/molbev/msu300"
  - "Stamatakis, A. (2014). RAxML version 8: a tool for phylogenetic analysis and post-analysis of large phylogenies. Bioinformatics, 30(9), 1312-1313. https://doi.org/10.1093/bioinformatics/btu033"
  - "Felsenstein, J. (1985). Confidence limits on phylogenies: An approach using the bootstrap. Evolution, 39(4), 783-791. https://doi.org/10.1111/j.1558-5646.1985.tb00420.x"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A maximum-likelihood method evaluates a candidate tree by asking how probable the observed alignment would be if that tree and a model of sequence change were true. The tree with the highest probability is preferred. The method uses the sequences directly, site by site, and so it retains the information that a distance method discards. Nguyen et al. (2015) describe IQ-TREE, which searches for such trees using a stochastic algorithm, and Stamatakis (2014) describes RAxML, which pursues the same goal for very large datasets.

The model is the core of the method. A substitution model states the rates at which one residue or base changes into another, and the frequencies of the residues at equilibrium. Simple models assume that all changes occur at the same rate and that all sites evolve alike, and richer models allow the rates to differ between pairs of residues and between sites. The model determines the probability of each alignment column given a tree, so the choice of model changes the tree that scores highest.

The model should be justified by the data rather than chosen by habit. A simple model applied to sequences with complex rate variation will give a poorer fit and may mislead the tree search, while an elaborate model applied to a small alignment may fit noise. The software can compare models by statistics that balance fit against complexity, and the comparison should be reported with the model that was selected.

The search is a heuristic through the space of trees, which is far too large to enumerate. The software proposes rearrangements of the tree and keeps those that increase the likelihood, and the search may end at a local optimum. Repeating the search from different starting trees checks whether the result is stable.

Sandve et al. (2013) recommended that the models and the search settings of an analysis be recorded. The model, its parameters and the number of independent searches are part of the record of a maximum-likelihood tree.
