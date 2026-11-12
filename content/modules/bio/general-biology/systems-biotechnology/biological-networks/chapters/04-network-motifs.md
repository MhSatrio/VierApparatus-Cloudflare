---
title: "Network Motifs"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "Network motifs as small recurring subgraphs whose frequency in a biological network exceeds that in randomised networks with the same degree sequence, the feedforward loop and the single-input module and their dynamic functions such as response acceleration and pulse generation, the counting of motifs and the empirical p-values from randomisation, the difficulty that motifs of three or four nodes overlap and that their significance depends on the null model, and the need to test the predicted function of a motif experimentally."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Define a network motif and describe how its significance is assessed against randomised networks."
  - "Explain the dynamic function of a feedforward loop and state the experiment that would test it."
references:
  - "Alon, U. (2007). Network motifs: theory and experimental approaches. Nature Reviews Genetics, 8(6), 450-461. https://doi.org/10.1038/nrg2102"
  - "Barabási, A.-L., & Oltvai, Z. N. (2004). Network biology: understanding the cell's functional organization. Nature Reviews Genetics, 5(2), 101-113. https://doi.org/10.1038/nrg1272"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A network motif is a small pattern of interactions, usually of three or four nodes, that occurs in a biological network more often than in randomised networks that preserve the number of connections at each node. The best known is the feedforward loop, in which one regulator controls a target both directly and through a second regulator. Alon (2007) showed that motifs of this kind recur across transcriptional networks of bacteria, yeast and other organisms, and that their recurrence suggests a function selected in evolution.

The feedforward loop can perform defined dynamic functions depending on the signs of its edges. A coherent loop, in which the direct and indirect paths act in the same direction, can delay the response to a sustained signal and so filter out brief fluctuations, while an incoherent loop can speed the response or generate a pulse. These functions can be predicted from the dynamics of the motif, and they can be tested by measuring the response of the target to a sustained or a transient input.

Motifs are counted in the network and compared with their frequency in randomised networks that keep the degree of each node. The empirical p-value is the proportion of randomised networks with at least as many copies of the motif as the observed network, and it depends on the number of randomised networks generated. The choice of randomisation is part of the result, since a different null model changes what is considered over-represented.

Motifs overlap, so that one edge may belong to several motifs, and their counts are not independent. Ioannidis (2005) described how many comparisons, each with a modest chance of a false positive, can produce several significant motifs by chance, and a correction for the number of motifs tested should be applied. Barabási and Oltvai (2004) noted that structure should be interpreted in relation to function, and a motif should be tested experimentally before its function is claimed. Cumming (2014) argues that the enrichment should be reported with its interval, and Sandve et al. (2013) recommended recording the randomisation procedure and the number of randomised networks.
