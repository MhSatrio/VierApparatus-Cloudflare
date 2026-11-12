---
title: "Choosing Taxa and Sequences"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How the taxa and the sequences of a phylogenetic analysis are chosen, the choice of an outgroup, the sampling that affects whether a tree can resolve a question, the choice of a gene or a set of genes and the screening of sequences for contamination, paralogy and poor quality before they enter the analysis."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Choose the taxa and an outgroup for a phylogenetic analysis and state how each choice affects the tree."
  - "Screen sequences for paralogy, contamination and poor quality before they are aligned."
references:
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Felsenstein, J. (1985). Confidence limits on phylogenies: An approach using the bootstrap. Evolution, 39(4), 783-791. https://doi.org/10.1111/j.1558-5646.1985.tb00420.x"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

The tree that an analysis produces is shaped first by the sequences it receives. The taxa must represent the question: a study of the relationships within a family that samples only one genus cannot resolve the branches within the family, and a sample that is dense in one part of the tree and sparse elsewhere will be resolved unevenly. Felsenstein (1985) showed that the statistical support for a branch depends on the data available for it, so a branch of interest must be sampled well enough to be supported.

An outgroup is a taxon known to lie outside the group of interest. It provides the reference that places the root of the tree, since the root cannot be found from the ingroup alone. The outgroup should be as close to the ingroup as the evidence allows, but distant enough that it is clearly outside, and a poor choice of outgroup can pull the root to the wrong place. The choice should be justified and its effect examined.

The gene or genes chosen determine what the tree can show. A gene that evolves quickly may resolve close relationships but saturate for distant ones, where repeated substitutions obscure the ancestry. A slowly evolving gene resolves deep branches but may give too little variation for close ones. Several genes can be combined, but only if they share a history that makes combining them reasonable, which the analysis should test.

Sequences must be screened before they enter the analysis. Paralogues, which are copies of a gene produced by duplication within a genome, are not orthologues, which are copies separated by speciation, and mixing them produces a tree of gene duplications rather than of species. Contaminating sequences from another organism and sequences of poor quality also distort the tree. Sandve et al. (2013) recommended checking the inputs of an analysis, and the screening step is the check for this one.

The record of taxa and sequences is part of the result. The name, the accession and the source of each sequence should be listed, along with the outgroup and the reason for its choice, so that another group can assemble the same dataset.
