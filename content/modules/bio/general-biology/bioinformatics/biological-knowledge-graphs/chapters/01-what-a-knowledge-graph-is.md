---
title: "What a Knowledge Graph Is"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "What a biological knowledge graph is and how it differs from a network of interactions, the typed nodes and edges that let one structure hold genes, diseases, drugs and pathways together, the difference between a graph of records and a graph of claims, and the purposes for which a knowledge graph is built, including the integration of heterogeneous sources and the generation of testable connections."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how a knowledge graph differs from a network of protein interactions in the types of nodes and edges it holds."
  - "State the purposes a knowledge graph serves and the kinds of question it can address."
references:
  - "Himmelstein, D. S., Lizee, A., Hessler, C., Brueggeman, L., Chen, S. L., Hadley, D., Green, A., Khankhanian, P., & Baranzini, S. E. (2017). Systematic integration of biomedical knowledge prioritizes drugs for repurposing. eLife, 6, e26726. https://doi.org/10.7554/eLife.26726"
  - "Barabási, A.-L., & Oltvai, Z. N. (2004). Network biology: understanding the cell's functional organization. Nature Reviews Genetics, 5(2), 101-113. https://doi.org/10.1038/nrg1272"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A knowledge graph is a network whose nodes and edges carry types. A protein interaction network has one kind of node and one kind of edge, while a knowledge graph may hold genes, proteins, diseases, drugs, anatomical structures and biological processes as distinct node types, and relations such as encodes, binds, is associated with, treats and causes as distinct edge types. The typing allows a question to be asked of the graph in terms of its kinds, such as which drugs are connected to a disease through a particular kind of protein.

Barabási and Oltvai (2004) described the network view of the cell, in which the structure of connections is the object of study. A knowledge graph extends this view by placing many kinds of biological entity in the same structure, so that a gene, a drug and a disease can be connected through a chain of different relations. The purpose is integration: information that exists in separate databases can be joined through shared entities.

A knowledge graph can be understood as a graph of records or as a graph of claims. In the first, each edge is an entry in a source database, recorded with its origin, and the graph reports what the sources say. In the second, each edge is an assertion that the graph makes, which may be inferred or predicted. The difference matters, since an assertion has a different level of support from a record, and the graph should keep the two apart.

Himmelstein et al. (2017) used a graph of this kind to generate candidate drug indications and to rank them by the connections they had in the graph, and the purpose was to suggest hypotheses for testing. The graph's connections were a means of prioritising experiments rather than a demonstration of efficacy.

Sandve et al. (2013) recommended recording the sources and versions of an analysis, and a knowledge graph must record the source and version of every edge, since its usefulness depends on knowing where each connection came from.
