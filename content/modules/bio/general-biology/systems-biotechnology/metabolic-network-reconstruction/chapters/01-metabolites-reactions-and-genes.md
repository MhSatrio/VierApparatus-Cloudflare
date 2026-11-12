---
title: "Metabolites, Reactions and Genes"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The elements of a metabolic reconstruction, namely the metabolites with their identifiers and compartments, the reactions with their stoichiometry, reversibility and bounds, and the genes that encode the enzymes, the conventions for naming and identifying each element so that it can be matched across databases, the distinction between a reaction that is known to occur in the organism and one inferred from homology, and the recording of the evidence supporting each element."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Write a biochemical reaction as a stoichiometric equation with its compartments, reversibility and flux bounds."
  - "Distinguish a reaction supported by direct evidence from one inferred from homology and record the evidence for each."
references:
  - "Thiele, I., & Palsson, B. Ø. (2010). A protocol for generating a high-quality genome-scale metabolic reconstruction. Nature Protocols, 5(1), 93-121. https://doi.org/10.1038/nprot.2009.203"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

A metabolic reconstruction is built from three kinds of element. Metabolites are the chemical species, each with an identifier, a name and the compartment in which it is found. Reactions are the transformations between metabolites, written as stoichiometric equations that state how many units of each substrate are consumed and each product formed. Genes are the coding sequences that encode the enzymes that catalyse the reactions, and the link between them is the basis of the model.

Each reaction carries a direction and bounds. A reaction is reversible if it can run in both directions under physiological conditions, and irreversible otherwise, and the bounds on its flux set the range of rates it can take. These constraints determine the space of feasible behaviour of the network, and they must be set from thermodynamic reasoning or from measurement rather than chosen to produce a desired result. Thiele and Palsson (2010) described the conventions for setting them.

Identifiers must be consistent so that a metabolite or reaction in one database can be matched with the same entity in another. Inconsistent names produce duplicate metabolites that the model treats as distinct, and a reaction that appears twice may be counted twice in the solution. A reconstruction should use a standard set of identifiers and state the database and version from which each was drawn.

Each reaction should be recorded with the evidence that supports it. A reaction shown by experiment in the organism is more secure than one inferred from the presence of a homologous gene in a related species, and the two should be distinguished. Cumming (2014) argues that uncertainty should be shown, and a reconstruction can record a confidence level for each element. Sandve et al. (2013) recommended recording the sources and identifiers, since the reaction list is the basis of every later analysis.
