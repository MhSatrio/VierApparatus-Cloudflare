---
title: "Whole-Genome Alignment"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How two genomes are aligned as a whole, the identification of the maximal unique matches that anchor the alignment, the MUMmer approach introduced by Delcher et al., the chaining of matches into conserved blocks, the handling of repeats that match many places and the way the resulting alignment reveals the regions shared by the two genomes and those that are specific to one."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how maximal unique matches are used to anchor an alignment of two genomes."
  - "Describe how repeated sequence is handled in a whole-genome alignment and why it must not be used as an anchor."
references:
  - "Delcher, A. L., Kasif, S., Fleischmann, R. D., Peterson, J., White, O., & Salzberg, S. L. (1999). Alignment of whole genomes. Nucleic Acids Research, 27(11), 2369-2376. https://doi.org/10.1093/nar/27.11.2369"
  - "Altschul, S. F., Gish, W., Miller, W., Myers, E. W., & Lipman, D. J. (1990). Basic local alignment search tool. Journal of Molecular Biology, 215(3), 403-410. https://doi.org/10.1016/S0022-2836(05)80360-2"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Aligning two whole genomes is far larger than aligning two genes, and an exhaustive comparison is impractical. Delcher et al. (1999) described a method that first finds the maximal unique matches, which are exact matches of substantial length that occur only once in each genome. These matches are the anchors of the alignment. They are rare enough to be found quickly and specific enough to be placed with confidence, and the rest of the alignment is built between them.

The anchors are then chained into a sequence that is consistent in order and orientation in both genomes. Between two anchors that lie in the same order, the intervening sequence is aligned by a dynamic programming method of the kind described by Needleman and Wunsch, which is feasible because the gaps between anchors are short. Where anchors are out of order, the alignment reveals a rearrangement, and the blocks of matching sequence show the regions that have moved.

Repeats are excluded from the anchors. A repeated sequence matches many places in a genome, so it cannot be placed uniquely, and an anchor built from it would join unrelated regions. The use of unique matches is the reason the method remains accurate in repeat-rich genomes, and the exclusion of repeats is a design decision that should be stated.

The result is a map of the genomes. Its conserved blocks show the regions shared by the two genomes, and its gaps show the regions specific to one of them. The map is a model of the relationship, and the regions it marks as specific must be checked, since an apparent absence may be an alignment gap or an assembly error.

Altschul et al. (1990) introduced the local alignment framework on which the matching of smaller regions relies, and Sandve et al. (2013) recommended that the parameters of such an alignment, including the minimum length of an anchor, be recorded with the result.
