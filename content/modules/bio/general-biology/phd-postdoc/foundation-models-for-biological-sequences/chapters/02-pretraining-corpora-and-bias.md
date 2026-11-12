---
title: "Pretraining Corpora and Representation Bias"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The construction of pretraining corpora for biological sequence models and the representation bias that the corpus introduces, covering the redundancy of sequence databases in which many near-identical sequences from a few well-studied organisms dominate, the deduplication by sequence identity that reduces the over-weighting of families, the under-representation of organisms, environments and proteins that are rarely sequenced and the consequent poorer performance on them, the sampling strategies that balance the corpus across taxonomic groups, the curation errors and contamination in public databases that enter the corpus, and the reporting of the corpus composition, the deduplication threshold and the groups on which the model performs less well."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Assess the redundancy and taxonomic composition of a pretraining corpus and state how deduplication changes what the model learns."
  - "Evaluate a model's performance across taxonomic groups and report the groups on which it performs less well."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

A model can only learn from the sequences it is shown, and the sequences in public databases are far from a random sample of life. Many near-identical sequences from a few well-studied organisms dominate the records, while most species and most environments are sparsely represented. A corpus built from these records inherits their composition, and the model learns the statistics of the sequenced world rather than of the biological one. Ioannidis (2005) described how the composition of the literature shapes what is believed, and the corpus shapes what the model believes.

Deduplication by sequence identity reduces the over-weighting of large families, in which hundreds of near-identical sequences would otherwise dominate training. The threshold of identity must be stated, since a stricter threshold removes more redundancy and a looser one retains more of the family structure. The effect of the threshold on performance should be measured rather than assumed.

Under-representation of organisms and proteins has a consequence that is often invisible in aggregate metrics. A model may perform well on average while performing poorly on the groups that are rarely sequenced, and the average conceals the disparity. The evaluation must therefore be stratified by taxonomic group. Cumming (2014) argues that the performance in each stratum should be reported with its interval, since the strata with few examples have the widest uncertainty and are the most likely to be misjudged.

Sampling strategies can balance the corpus across taxonomic groups, giving more weight to rare groups than their frequency in the databases would produce. Such balancing is a choice with consequences, and its effect on the performance of well-studied groups must also be reported. Public databases contain curation errors and contamination, which enter the corpus and can be learned. Peng (2011) argued that the composition of a dataset must be documented for its results to be interpreted, and Munafò et al. (2017) argued that the groups on which a model performs less well should be reported as a limitation rather than omitted.
