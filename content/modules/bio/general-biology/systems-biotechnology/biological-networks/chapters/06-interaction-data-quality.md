---
title: "Interaction Data Quality"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The sources and quality of interaction data that populate biological network databases, including experimental methods such as yeast two-hybrid and affinity purification with their characteristic false positives and false negatives, the bias of the literature towards well-studied proteins, the confidence scores that combine evidence from several methods, the consistency of interactions across databases, and the filtering of edges by evidence level with its effect on the structure of the resulting network."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the principal experimental methods for detecting interactions and their characteristic errors."
  - "Filter a network by evidence level and explain how the filter changes the structure that is analysed."
references:
  - "Barabási, A.-L., & Oltvai, Z. N. (2004). Network biology: understanding the cell's functional organization. Nature Reviews Genetics, 5(2), 101-113. https://doi.org/10.1038/nrg1272"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

The interactions in a biological network come from experiments, and each experimental method has its own errors. Yeast two-hybrid assays detect binary interactions in a non-native setting and produce both false positives and false negatives. Affinity purification followed by mass spectrometry identifies complexes but cannot tell which proteins bind directly. Each method has characteristic error rates, and a network that combines them inherits these errors in proportions that depend on which methods were used.

The literature is biased towards well-studied proteins. A protein that has been the subject of many papers accumulates many interactions, while a protein studied rarely appears poorly connected, and this bias creates hubs for reasons of research interest rather than biology. Barabási and Oltvai (2004) noted that this bias can affect the structure of networks built from the literature, and it should be considered before the degree of a node is interpreted.

Confidence scores combine the evidence from several methods and sources into a single measure for each edge. Their calculation depends on weights chosen for each kind of evidence, and different weights give different rankings. Ioannidis (2005) described how the choice of method and threshold can be adjusted to produce a desired result, and the weights should be fixed and reported rather than tuned to the analysis that follows.

Filtering edges by evidence level changes the network that is analysed. A stringent threshold removes many false positives and many real interactions, and the structure that remains may differ substantially from the full network. Cumming (2014) argues that the effect of the filter should be reported with the measures computed, and Sandve et al. (2013) recommended recording the databases, their versions, the confidence scores and the threshold used, so that the network can be rebuilt.
