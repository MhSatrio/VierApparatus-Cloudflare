---
title: "Phylogenetic Comparative Methods"
subject: "Biology"
specialization: "General Biology"
academic_level: "Core Biological Sciences"
description: "How the evolutionary relationships among species are used to test hypotheses about traits, correcting for the non-independence of related species."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain why related species cannot be treated as independent data points."
  - "Describe how a phylogeny is used to test an evolutionary hypothesis across species."
references:
  - "Darwin, C. (1859). On the origin of species by means of natural selection, or the preservation of favoured races in the struggle for life. John Murray."
  - "Felsenstein, J. (1985). Confidence limits on phylogenies: An approach using the bootstrap. Evolution, 39(4), 783. https://doi.org/10.2307/2408678"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

A comparison of traits across species is a common way to test hypotheses about evolution. For example, one might ask whether larger animals live longer, or whether a particular diet is associated with a particular body shape. The problem is that species are not independent. Closely related species share ancestry and often share traits, so a correlation found across species may reflect a single evolutionary event rather than repeated association. Darwin (1859) noted that the similarity among species reflects their descent, and modern comparative methods take this into account.

Phylogenetic comparative methods use a tree to model the expected similarity of species. The tree specifies how much shared history each pair of species has, and the methods estimate the correlation between traits after accounting for that shared history. A trait that is correlated across species only because the species share an ancestor is then distinguished from a trait that varies independently with another.

The tree itself must be estimated, and its uncertainty affects the comparison. Felsenstein (1985) introduced bootstrap support as a measure of confidence in branches, and comparative studies use the uncertainty of the tree to test the robustness of their conclusions. A result that depends on one tree topology is weaker than one that holds across many plausible trees.

The methods can be used to reconstruct the state of a trait in an ancestor. By assuming a model of how the trait changes along branches, the state at the nodes of the tree can be estimated, and this allows the timing of changes to be inferred. Such reconstructions are model-dependent, and their reliability is tested by simulation.

Alberts et al. (2022) describe how comparisons of genes and proteins across species reveal the functions that have been conserved and those that have changed. Comparative methods are applied to traits, sequences and behaviour, and they are essential for testing macroevolutionary hypotheses in the next chapter.
