---
title: "Sampling and Phylogenetic Context"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "Why the choice of genomes in a comparison determines what the comparison can show, the role of the phylogenetic tree of the sampled species in interpreting shared and unique features, the problem of uneven sampling among lineages and the use of an explicit phylogenetic framework to place each difference on the branch where it arose."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how the choice of species in a comparison limits what can be concluded about the ancestry of a feature."
  - "Use the phylogeny of the sampled species to place a shared or unique feature on the branch where it most likely arose."
references:
  - "Felsenstein, J. (1985). Confidence limits on phylogenies: An approach using the bootstrap. Evolution, 39(4), 783-791. https://doi.org/10.1111/j.1558-5646.1985.tb00420.x"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A feature shared by two genomes may have been inherited from their common ancestor, or it may have arisen independently in each. A feature found in only one genome may be new to that lineage, or it may have been lost from the others. Without knowing the relationships among the species compared, these cases cannot be told apart, and the sampling of species therefore determines what a comparison can reveal. Felsenstein (1985) showed that the tree of relationships is the framework in which statistical statements about ancestry are made, and the same framework applies to features of genomes.

The phylogeny of the sampled species is used to place each feature. A feature shared by all species of a clade and absent from the rest most likely arose on the branch leading to that clade. A feature shared by two distant species but absent from their close relatives may have been acquired independently, or the close relatives may have lost it, and the tree allows these explanations to be weighed. Alberts et al. (2022) describe how the classification of organisms reflects their ancestry, and the tree is the basis for such reasoning.

Uneven sampling distorts the picture. If one lineage is densely sampled and another sparsely, features will appear to be lineage-specific in the dense group simply because more genomes were examined. The sampling should be balanced, or the analysis should account for the uneven density when it counts features.

A feature that is unique to the sampled genomes may be present in unsampled ones. The claim about a feature must therefore be stated with its sampling, and the list of genomes is part of the result. Conclusions about the origin of a feature are conditional on the species included.

Sandve et al. (2013) recommended that the inputs of an analysis be recorded, and the species, their tree and the rule for placing features on it are the inputs of a comparative conclusion.
