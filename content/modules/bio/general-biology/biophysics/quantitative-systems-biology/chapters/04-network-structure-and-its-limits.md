---
title: "Network Structure and Its Limits"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "How biological networks are represented as graphs of nodes and edges, the measures used to describe their structure such as degree, clustering and modularity, the claim that some biological networks have hub-dominated structures and the statistical care needed before such a claim is accepted."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the graph representation of a biological network and the measures of degree and clustering used to describe it."
  - "Explain why a network structure measured from incomplete data may not reflect the true network."
references:
  - "Barabási, A.-L., & Oltvai, Z. N. (2004). Network biology: understanding the cell's functional organization. Nature Reviews Genetics, 5(2), 101-113. https://doi.org/10.1038/nrg1272"
  - "Kitano, H. (2002). Systems Biology: A Brief Overview. Science, 295(5560), 1662-1664. https://doi.org/10.1126/science.1069492"
---

A biological network can be drawn as a graph, in which nodes are molecules or genes and edges are the interactions between them. The degree of a node is the number of its edges, and the degree distribution describes how many nodes have each degree. Barabási and Oltvai (2004) reviewed the use of such graphs in biology and showed how the structure of a network can be described by its degree distribution, its clustering, which measures how often neighbours of a node are also neighbours of one another, and its modules, which are groups of densely connected nodes.

Some measured biological networks have been reported to contain hubs, which are nodes with many more edges than most others. Barabási and Oltvai (2004) discussed the view that such hubs may be essential for the robustness of the network, because removing a hub disrupts many interactions at once. Their discussion shows that structure is a useful way to organise the data, but a structural feature is not automatically a biological one.

The measurements behind a network are often incomplete and biased. Interactions that have been studied intensively appear with many edges, while others are missing because nobody has looked for them. A high-degree node may therefore reflect the attention it has received, not its importance in the cell. The degree distribution of a measured network may differ from that of the true network, and a conclusion about hubs drawn from the measured structure requires a check that the sampling does not produce the pattern.

Kitano (2002) argued that a network's structure matters only as far as it explains the behaviour of the system, so a graph should be linked to a model of how signals move through it. A structural description that does not predict a perturbation experiment is a description, not an explanation.

The practical lesson is that network measures should be reported with the method by which the network was assembled, and the degree of incompleteness should be stated.
