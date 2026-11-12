---
title: "In Silico Gene Knockouts"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The simulation of single and multiple gene deletions by removing the reactions that the gene's Boolean rule disables and re-optimising the objective, the prediction of essential genes whose deletion reduces growth to zero and of synthetic lethal pairs whose joint deletion is lethal while each alone is not, the comparison of predicted essentiality with mutant growth data, the role of the medium in determining which genes are essential, and the limits of the prediction when metabolic regulation, alternative enzymes or evolution compensate for the deletion."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Simulate a gene deletion by removing the reactions it disables and predict whether growth is lost."
  - "Explain why the essentiality of a gene depends on the medium and why a predicted essential gene may not be essential in vivo."
references:
  - "Schellenberger, J., Que, R., Fleming, R. M. T., Thiele, I., Orth, J. D., Feist, A. M., Zielinski, D. C., Bordbar, A., Lewis, N. E., Rahmanian, S., Kang, J., Hyduke, D. R., & Palsson, B. Ø. (2011). Quantitative prediction of cellular metabolism with constraint-based models: the COBRA Toolbox v2.0. Nature Protocols, 6(9), 1290-1307. https://doi.org/10.1038/nprot.2011.308"
  - "Orth, J. D., Thiele, I., & Palsson, B. Ø. (2010). What is flux balance analysis? Nature Biotechnology, 28(3), 245-248. https://doi.org/10.1038/nbt.1614"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

An in silico knockout simulates the deletion of a gene by removing the reactions that its Boolean rule disables, and then re-optimising the objective. If the maximal growth falls to zero, the gene is predicted to be essential, and if growth is reduced without being lost, the gene is predicted to be important but not essential. Schellenberger et al. (2011) described how these simulations are carried out for every gene of a genome, which gives a complete prediction of essentiality from the reconstruction.

Two genes may be non-essential individually but essential together, when each can compensate for the loss of the other. Such synthetic lethal pairs reveal redundancy in the network, and they are predicted by simulating each pair of deletions. The number of pairs grows rapidly with the number of genes, so the search must be restricted or approximated, and the method used should be reported.

The prediction depends on the medium. A gene needed to synthesise a nutrient that is present in the medium may be non-essential there but essential in a medium without it, and the essentiality of a gene is a property of the gene and its environment together. Orth et al. (2010) emphasised that flux balance predictions are conditional on the constraints imposed, and an essentiality prediction must be stated with its medium.

Predicted essential genes should be compared with the growth of mutants, and the agreement reported with its uncertainty. Ioannidis (2005) described how a predicted set of essential genes can be compared with experiment in many ways, and the comparison should be specified before it is made. Cumming (2014) argues that the sensitivity and specificity of the predictions should be reported with their intervals, and Sandve et al. (2013) recommended recording the deletions simulated, the medium and the results.
