---
title: "Perturbation and Robustness"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How the structure of a biological network is used to predict the effects of perturbing its nodes, including the removal of hubs and of bridges, the robustness of the network to random and targeted attacks, the propagation of an effect through the network and the difference between a prediction from structure and the observed effect of a knockout, with the reason that structural importance is not always functional importance."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Predict the effect of removing a node from a network by its structural position and state the assumption that the prediction makes."
  - "Explain why the structural importance of a node may differ from its biological importance and how experiments test the difference."
references:
  - "Barabási, A.-L., & Oltvai, Z. N. (2004). Network biology: understanding the cell's functional organization. Nature Reviews Genetics, 5(2), 101-113. https://doi.org/10.1038/nrg1272"
  - "Kitano, H. (2002). Systems Biology: A Brief Overview. Science, 295(5560), 1662-1664. https://doi.org/10.1126/science.1069492"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

A network can be used to predict what happens when a node is perturbed. Removing a node removes its edges, and the consequences depend on where it sits. A hub, with many edges, or a bridge, which lies on many shortest paths, may disconnect parts of the network when removed, and Barabási and Oltvai (2004) discussed the view that such nodes are important for the robustness of cellular networks. The structural prediction is that removing a central node causes the largest disruption, and the test of the prediction is the observed effect of the removal.

Robustness is the ability of a network to keep its function when parts are removed. Networks with a heavy-tailed degree distribution are robust to random removal, since most nodes have few edges, and vulnerable to the removal of hubs. Kitano (2002) described robustness as a property of biological systems that arises from their feedback and redundancy, and the structure of the network is one part of that property, not the whole.

The structural prediction assumes that importance follows position, and this assumption is often wrong. A protein with few edges may be essential to a process if its partners have no substitutes, and a hub may be dispensable if its many partners perform redundant tasks. The structure gives a hypothesis about importance, and the knockout experiment is the test that can show the hypothesis to be wrong.

Platt (1964) recommended a test that discriminates between alternatives, and the comparison of structural prediction with experimental knockout is such a test. A set of knockouts whose effects are measured and compared with the predicted ranking shows how well the structure predicts function.

Ioannidis (2005) described how a result that is selected because it looks striking can overstate its meaning, and a prediction that a few hubs are essential should be compared with the whole set of perturbations tested, not with the most dramatic one. The predictions and their outcomes should be reported together.
