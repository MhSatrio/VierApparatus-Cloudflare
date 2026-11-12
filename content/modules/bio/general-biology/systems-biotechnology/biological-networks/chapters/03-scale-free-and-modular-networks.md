---
title: "Scale-Free and Modular Networks"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The scale-free form of a network whose degree distribution follows a power law so that a few hubs hold many edges, the preferential attachment that produces such networks in growth models, the robustness of scale-free networks to random failure and their fragility to the removal of hubs, the modular organisation in which dense groups of nodes are joined by sparse links, the algorithms that detect modules, and the caution that a power law fitted to noisy interaction data can be an artefact of incomplete sampling."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe a scale-free network and explain why it is robust to random removal of nodes but fragile to the removal of hubs."
  - "State the caution needed before a power law is fitted to a biological degree distribution."
references:
  - "Barabási, A.-L., & Oltvai, Z. N. (2004). Network biology: understanding the cell's functional organization. Nature Reviews Genetics, 5(2), 101-113. https://doi.org/10.1038/nrg1272"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Alon, U. (2007). Network motifs: theory and experimental approaches. Nature Reviews Genetics, 8(6), 450-461. https://doi.org/10.1038/nrg2102"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

A scale-free network has a degree distribution that follows a power law, so that most nodes have few edges and a small number have very many. Barabási and Oltvai (2004) described such networks in biology, and they arise in growth models in which new nodes preferentially attach to nodes that are already well connected. The hubs of such a network are a feature of its growth, and they shape its behaviour in ways that a random network with the same average degree does not.

Scale-free networks are robust to the random loss of nodes, because most nodes are poorly connected and their loss rarely disconnects the network. They are fragile to the targeted loss of hubs, because the hubs carry many of the paths between other nodes. This pattern suggests that the essential proteins of a cell may be its hubs, and it has been tested by comparing the lethality of deletions with the degree of the deleted gene.

Modular networks contain dense groups of nodes joined to one another by fewer links. A module may correspond to a complex, a pathway or a functional unit, and its detection is an important step in understanding a network. Algorithms that detect modules search for partitions of the nodes that maximise the density within groups relative to the density between them, and different algorithms can give different partitions for the same network.

A power law is easily claimed and hard to establish. The tail of a distribution based on few nodes can be fitted by many shapes, and the sampling of interactions in biological databases is biased towards well-studied proteins, which produces hubs artificially. Ioannidis (2005) described how selective sampling creates patterns that do not reflect the underlying system. Alon (2007) recommended comparing structure with randomised networks, and Sandve et al. (2013) recommended recording the fitting method and the data, so that a claimed power law can be checked. Cumming (2014) argues that the fitted exponent should be reported with its interval.
