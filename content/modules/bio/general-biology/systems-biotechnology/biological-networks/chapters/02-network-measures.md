---
title: "Network Measures"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The quantitative measures of network structure, namely the degree of a node and the degree distribution, the clustering coefficient that captures local density, the average path length and the diameter that capture global reach, the betweenness centrality of nodes that lie on many shortest paths, and the comparison of these measures with the values expected in random networks of the same size or degree sequence, together with the reasons that a single measure rarely settles the biological question."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Calculate the degree, clustering coefficient and average path length of a small network and interpret each measure biologically."
  - "Compare a network measure with its value in randomised networks and explain why a null model is needed."
references:
  - "Barabási, A.-L., & Oltvai, Z. N. (2004). Network biology: understanding the cell's functional organization. Nature Reviews Genetics, 5(2), 101-113. https://doi.org/10.1038/nrg1272"
  - "Alon, U. (2007). Network motifs: theory and experimental approaches. Nature Reviews Genetics, 8(6), 450-461. https://doi.org/10.1038/nrg2102"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

The simplest measure of a node is its degree, the number of edges that it has. The distribution of degree across all nodes describes the network as a whole, and many biological networks have a heavy-tailed distribution in which a few hubs have very many edges. Barabási and Oltvai (2004) reported that such hubs are often essential proteins, and the degree distribution is the first property to examine when a network is described.

The clustering coefficient measures how densely the neighbours of a node are connected to one another. A high value means that the node sits in a locally tight group, as a set of proteins that form a complex would. The average clustering over a network indicates how modular it is, and it is compared with the value expected in a random network with the same number of nodes and edges, since a random network of this kind has low clustering by construction.

The average path length is the mean number of steps along the shortest route between pairs of nodes, and the diameter is the longest of these shortest routes. Short average path lengths mean that information or influence can pass quickly across the network, which is characteristic of many biological networks. Betweenness centrality counts how many shortest paths pass through a node, and nodes with high betweenness can be bottlenecks that connect different parts of the system.

A measure is meaningful only against a null model. Alon (2007) showed that motif counts must be compared with randomised networks that preserve the degrees, and the same principle applies to every measure. Ioannidis (2005) described how the chance of a striking structure rises with the number of comparisons made, and a measure that exceeds its null value by a small margin may be produced by the choice of the network rather than by biology. Cumming (2014) argues that the comparison should be reported as an estimate with its interval, and the null model should be stated.
