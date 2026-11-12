---
title: "Guide Design and Specificity"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The design of guide sequences that target a chosen genomic site with high activity and few off-target sites, the requirement of a protospacer adjacent motif next to the target, the influence of the guide's sequence on the efficiency of the cut, the search of the genome for sequences that resemble the guide and may be cut, the scores that rank guides by predicted activity and specificity, and the limits of these predictions, which must be checked by measurement in the cells that will be edited."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Choose a guide sequence for a target by checking the motif requirement and searching the genome for similar sites."
  - "Explain why a predicted guide score is a hypothesis that must be checked by measurement in the target cells."
references:
  - "Doudna, J. A., & Charpentier, E. (2014). The new frontier of genome engineering with CRISPR-Cas9. Science, 346(6213), 1258096. https://doi.org/10.1126/science.1258096"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A guide is designed for a target site, and its quality determines whether the edit succeeds. The first requirement is the protospacer adjacent motif, without which the nuclease will not cut, so the target must be followed by the motif in the genome. The second is the sequence of the guide itself, since some sequences cut more efficiently than others, for reasons that depend on the composition and on the local chromatin. Doudna and Charpentier (2014) described these requirements as the basis of guide design.

Specificity concerns the sites other than the target that the guide may cut. A guide with a sequence similar to a site elsewhere in the genome may cut there, and the search of the genome for such sites is an essential step in the design. The number and the position of predicted off-target sites should be reported for each guide, since an off-target cut in an important gene can change the phenotype of an edited cell.

Scores are used to rank guides by their predicted activity and specificity. These scores are derived from experiments with other guides and cells, and they are useful for ranking, but their absolute values are uncertain. Ioannidis (2005) described how a model fitted to one set of data may fail on another, and a score derived in one cell type may not hold in another.

Every predicted guide should be tested by measurement in the cells that will be edited. The activity should be measured with replicates, and the off-target cuts should be checked at the predicted sites. Cumming (2014) argues that the activity and the specificity should be reported with their intervals, and Sandve et al. (2013) recommended recording the sequences, the scores and the measurements for each guide.
