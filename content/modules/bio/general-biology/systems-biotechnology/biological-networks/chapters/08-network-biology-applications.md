---
title: "Network Biology Applications"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The use of biological networks to answer practical questions, including the prioritisation of candidate disease genes by their position in an interaction network, the identification of drug targets as nodes whose perturbation disrupts a disease module, the prediction of function for uncharacterised proteins from the functions of their neighbours, the limits of guilt by association when networks are biased towards well-studied genes, and the validation of each prediction with independent data before a network-based claim is acted upon."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how a biological network can prioritise candidate genes or predict the function of an uncharacterised protein."
  - "Explain the bias of guilt-by-association predictions and state the independent evidence needed to test a network-based prediction."
references:
  - "Barabási, A.-L., & Oltvai, Z. N. (2004). Network biology: understanding the cell's functional organization. Nature Reviews Genetics, 5(2), 101-113. https://doi.org/10.1038/nrg1272"
  - "Alon, U. (2007). Network motifs: theory and experimental approaches. Nature Reviews Genetics, 8(6), 450-461. https://doi.org/10.1038/nrg2102"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Networks are used to answer practical questions. A disease gene that is not known may be sought among the neighbours of known disease genes, on the reasoning that proteins that interact are likely to contribute to the same process. Barabási and Oltvai (2004) argued that the cell's organisation can guide such searches, and the approach has been used to rank candidate genes for many conditions.

Candidate prioritisation depends on the network and its biases. A gene that lies close to many known disease genes will be ranked highly, but its high rank may reflect the number of studies on its neighbours rather than any biology. The ranking should be tested against genes whose disease role was discovered after the network was built, since such a test separates genuine predictive power from the reflection of research interest.

Drug target identification uses the idea of a disease module, a region of the network whose perturbation disrupts the disease. Nodes that lie in the module and are essential for its function are candidate targets, and Alon (2007) described how the structure of a network constrains which perturbations can change its behaviour. The candidates must be tested in experiments, since a node that is central in a network need not be a safe or effective target.

Guilt by association predicts the function of an uncharacterised protein from the functions of its neighbours. The method is useful but biased, since the neighbours of well-studied proteins are themselves well studied, and the predictions favour the functions already known. Ioannidis (2005) described how selection of this kind creates findings that do not hold, and the predicted function must be tested with independent evidence before it is accepted.

Cumming (2014) argues that a network-based prediction should be reported with its uncertainty and the precision of its ranking, and Sandve et al. (2013) recommended recording the network version, the scoring method and the validation set, so that the prediction can be checked before it is acted upon.
