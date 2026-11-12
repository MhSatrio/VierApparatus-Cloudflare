---
title: "Biological Networks as Graphs"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How biological systems are represented as graphs of nodes and edges, the distinction between physical interaction networks, regulatory networks and metabolic networks, the directed and undirected forms of a graph and what each captures, the weighting of edges by evidence and the choices made when a biological relationship is converted into a single edge."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Represent a set of biological relationships as a graph and state what the nodes and edges mean for each type of network."
  - "Explain why the choice of directed or undirected edges and the weighting of evidence change the structure that an analysis can find."
references:
  - "Barabási, A.-L., & Oltvai, Z. N. (2004). Network biology: understanding the cell's functional organization. Nature Reviews Genetics, 5(2), 101-113. https://doi.org/10.1038/nrg1272"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A graph consists of nodes joined by edges. In a biological network the nodes are molecules, such as proteins, genes or metabolites, and the edges are the relationships between them. Barabási and Oltvai (2004) describe how the same mathematical object serves several kinds of biological network, and each kind carries a different meaning. A physical interaction network links proteins that bind one another, a regulatory network links a transcription factor to the genes it controls, and a metabolic network links the substrates and products of reactions.

The type of edge matters. A physical interaction is symmetric, so an undirected edge is appropriate, while a regulatory relationship has a direction, from regulator to target, and needs a directed edge. A metabolic network is often drawn with the metabolites as nodes and the reactions as edges, and the choice of representation changes which nodes are close and which paths exist. Alberts et al. (2022) describe the molecular relationships that these graphs record, and the direction of each reflects a biological fact that the graph must keep.

Edges carry evidence, and the evidence should be recorded as a weight. A relationship found in a high-throughput experiment and one found in a detailed study of a single pair of proteins are not equivalent, and treating them as equal edges mixes reliable and unreliable information. The weighting or the threshold on confidence is a decision that changes the network, and it must be stated.

A biological relationship may need to be converted into a single edge, although the relationship has several aspects. Two proteins may bind and also regulate one another, and a single edge hides which relationship it represents. The conversion is a simplification, and the reader should know what each edge stands for.

Sandve et al. (2013) recommended recording the steps of an analysis, and the definition of nodes and edges, the direction and the weighting are the representation on which every network result depends.
