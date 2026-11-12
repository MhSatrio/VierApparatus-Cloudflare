---
title: "Network Measures"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The measures used to describe the nodes and the whole of a biological network, including the degree and its distribution, the clustering coefficient, the betweenness centrality that identifies nodes on many shortest paths, the shortest path length and the modularity of a partition, the interpretation of these measures in biological terms and the caution needed before a high-degree node is called essential."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Compute the degree, clustering and betweenness of the nodes of a small network and state what each measures."
  - "Explain why a high-degree node may reflect the attention a protein has received rather than its importance to the network."
references:
  - "Barabási, A.-L., & Oltvai, Z. N. (2004). Network biology: understanding the cell's functional organization. Nature Reviews Genetics, 5(2), 101-113. https://doi.org/10.1038/nrg1272"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The structure of a network is described by numbers computed for each node and for the whole graph. The degree of a node is the number of its edges, and the distribution of degrees across the network shows whether most nodes have few edges and a few have many. Barabási and Oltvai (2004) discussed the degree distributions reported for biological networks and the interpretation placed on them, and the degree is the simplest measure of a node's connectedness.

The clustering coefficient of a node measures how often its neighbours are also connected to one another. A high clustering indicates a locally dense group, which may be a functional module, such as a complex whose members all bind one another. The betweenness centrality of a node counts how many shortest paths between other pairs of nodes pass through it, and a node with high betweenness is a bridge between parts of the network. The shortest path length between two nodes gives the number of steps needed to connect them, and the average over all pairs describes the network as a whole.

The measures are descriptive, and their biological meaning depends on the network. A high-degree node may be essential to the cell, or it may be a protein that has been studied intensively and therefore has many recorded interactions. Ioannidis (2005) described how the attention given to some subjects can make them appear more important in the data than they are, and the same bias applies to the degree of a protein in a network built from the literature.

The measures should be computed on the network as it is, and their values should be compared with a null model in which the edges are rewired while the degrees are kept. A measure that matches the null model is no evidence of structure, and a measure that exceeds it shows structure beyond the degree sequence.

Sandve et al. (2013) recommended recording the measures and the network on which they were computed, since a value of a measure has no meaning without its network.
