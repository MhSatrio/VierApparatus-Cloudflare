---
title: "Gene Regulatory Networks"
subject: "Biology"
specialization: "General Biology"
academic_level: "Advanced Biological Mechanisms"
description: "How regulators acting on one another form networks whose feedback loops produce stable cell states, and how the logic of small network motifs can be analysed."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the common network motifs in gene regulation and the behaviour each one can produce."
  - "Explain how positive feedback in a network can create two stable cell states."
references:
  - "Jacob, F., & Monod, J. (1961). Genetic regulatory mechanisms in the synthesis of proteins. Journal of Molecular Biology, 3(3), 318-356. https://doi.org/10.1016/S0022-2836(61)80072-7"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

A gene regulatory network is a set of genes in which the products of some genes regulate the expression of others. The network is described as a directed graph, in which the nodes are genes and the edges are regulatory interactions that may activate or repress. Jacob and Monod (1961) described a single operon in which a repressor controls its own genes; networks in cells contain many such relationships, and their collective behaviour can be much richer than any single interaction.

Small recurring patterns, called network motifs, appear more often than chance would predict. A feed-forward loop, in which a regulator controls a target both directly and through an intermediate, can filter transient signals or delay a response. A negative autoregulatory loop, in which a gene represses itself, speeds the response of the gene and reduces the noise in its expression. A positive feedback loop, in which a gene activates itself, can produce memory and bistability. Each motif has characteristic dynamics that can be predicted from its structure.

Bistability is the key property for cell fate decisions. A network with positive feedback can have two stable states of expression, and a cell in one state remains there until a signal pushes it into the other. Such networks are thought to control the choice between alternative fates during development and to maintain the identity of differentiated cells.

Networks are inferred from data by measuring the expression of many genes under perturbation and by testing which regulatory relationships explain the changes. The inferred networks are provisional, and the test of a network is whether its predictions hold when a gene is perturbed in a new way.

Alberts et al. (2022) describe the transcription factors and signalling inputs that form the nodes and edges of real networks. Network analysis combines measurements of gene expression with models of the regulatory interactions, and the best-supported networks are those whose predictions have been tested experimentally.
