---
title: "Network Representation"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The representation of a biological system as a graph of nodes and edges, the distinction between directed and undirected edges and between weighted and unweighted edges, the adjacency matrix as the numerical form of a network, the bipartite networks that link two types of entity such as genes and processes, and the choices of what counts as a node and an edge that determine which questions the network can answer."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Represent a set of biological interactions as a graph and write its adjacency matrix."
  - "Choose between directed, weighted and bipartite representations according to the biological interaction."
references:
  - "Barabási, A.-L., & Oltvai, Z. N. (2004). Network biology: understanding the cell's functional organization. Nature Reviews Genetics, 5(2), 101-113. https://doi.org/10.1038/nrg1272"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

A network is a set of nodes joined by edges, and a biological system is translated into this form by deciding what the nodes are and what the edges mean. In a protein interaction network the nodes are proteins and the edges are physical bindings. In a regulatory network a directed edge runs from a regulator to its target. Barabási and Oltvai (2004) described how such choices define the network, and a network is only a representation of the biology that its definitions allow.

The distinction between directed and undirected edges matters for the biology. A binding between two proteins has no direction, while a regulation of one gene by another has a clear direction, and an analysis that ignores the direction may combine effects that are opposite in sign. Weighted edges carry a quantity such as the strength of an interaction or the number of observations supporting it, and they must be used with a stated meaning, since a weight is not the same as an interaction.

A network is stored numerically as an adjacency matrix, whose entry in row i and column j records whether node i is joined to node j, and by what weight. The matrix is the form in which most algorithms operate, and it makes the network's properties computable. For an undirected network the matrix is symmetric, and for a directed one it need not be, which is a further reason to state the direction clearly.

Bipartite networks link two different kinds of entity, such as genes and the biological processes they participate in, or drugs and the targets they bind. They can be projected onto one kind of node, which connects two genes if they share a process, but the projection loses information about which process links them. Sandve et al. (2013) recommended recording the definitions of the nodes and edges, since the questions a network can answer depend entirely on these choices, and Cumming (2014) argues that the evidence for each edge should be reported with its strength.
