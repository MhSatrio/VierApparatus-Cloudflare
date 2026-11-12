---
title: "Biological Networks"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "Biological networks as graphs of molecules and their interactions, covering protein interaction, gene regulatory, metabolic and signalling networks, the measures of network structure such as degree, clustering and path length, the scale-free and modular organisation that many biological networks show, the network motifs that recur more often than chance, the inference of networks from data and the errors of interaction data, and the reporting of a network with its source, evidence and version."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Represent a biological system as a network and compute degree, clustering and path length for its nodes and edges."
  - "Explain how the quality of interaction data limits the conclusions drawn from a network and state how to report the evidence behind each edge."
references:
  - "Barabási, A.-L., & Oltvai, Z. N. (2004). Network biology: understanding the cell's functional organization. Nature Reviews Genetics, 5(2), 101-113. https://doi.org/10.1038/nrg1272"
  - "Alon, U. (2007). Network motifs: theory and experimental approaches. Nature Reviews Genetics, 8(6), 450-461. https://doi.org/10.1038/nrg2102"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A biological network represents the components of a system as nodes and their interactions as edges. Proteins that bind each other, genes that regulate one another, and metabolites linked by reactions can all be drawn this way, and the drawing allows the structure of the system to be analysed with the methods of graph theory. Barabási and Oltvai (2004) argued that a network view of the cell reveals its organisation in a way that lists of components cannot, and this view is the foundation of network biology.

The topic begins with the types of network and the measures used to describe them. The degree of a node counts its interactions, the clustering coefficient measures how many of a node's neighbours are also linked to one another, and the path length measures how many steps separate two nodes. Many biological networks have a few highly connected hubs and many poorly connected nodes, and the distribution of degree is one of the first properties to examine.

Recurring patterns of interaction, the network motifs, are the small subgraphs that appear more often in biological networks than in randomised networks with the same degree sequence. Alon (2007) showed that these motifs often perform specific functions, such as filtering or pulse generation, and their detection depends on a null model that preserves the degrees of the nodes.

Networks are only as reliable as the data from which they are built. Interaction databases combine results from many assays, each with its own false positive and false negative rates, and some edges reflect the study of a few well-known proteins rather than the whole proteome. Ioannidis (2005) described how the selection of well-studied findings can produce structures that reflect the research interest rather than the biology, and the evidence behind each edge should be recorded with the network.

Cumming (2014) argues that measures of network structure should be reported with their uncertainty, since a measure computed from an incomplete network may change substantially when further edges are discovered. Sandve et al. (2013) recommended recording the source, the version and the filtering of each network, so that its analysis can be repeated when the database changes.
