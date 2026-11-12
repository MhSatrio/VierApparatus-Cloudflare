---
title: "Networks in Biology and Medicine"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "Applications of network biology in biology and medicine, including the interpretation of gene expression changes in the context of interaction networks, the identification of disease modules in which the proteins associated with a disease cluster, the prioritisation of candidate genes for a disease and the use of networks to suggest drug targets, with the limits that the completeness and bias of interaction data place on each application."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe three applications of network biology in medicine and the question each answers."
  - "Judge whether a network-based result supports the claim made in a given application, given the completeness and bias of its data."
references:
  - "Barabási, A.-L., & Oltvai, Z. N. (2004). Network biology: understanding the cell's functional organization. Nature Reviews Genetics, 5(2), 101-113. https://doi.org/10.1038/nrg1272"
  - "Kitano, H. (2002). Systems Biology: A Brief Overview. Science, 295(5560), 1662-1664. https://doi.org/10.1126/science.1069492"
  - "Szklarczyk, D., Gable, A. L., Lyon, D., Junge, A., Wyder, S., Huerta-Cepas, J., Simonovic, M., Doncheva, N. T., Morris, J. H., Bork, P., Jensen, L. J., & von Mering, C. (2019). STRING v11: protein-protein association networks with increased coverage, supporting functional discovery in genome-wide experimental datasets. Nucleic Acids Research, 47(D1), D607-D613. https://doi.org/10.1093/nar/gky1131"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Network biology is applied to the understanding of disease. Kitano (2002) described the aim of systems biology as the explanation of complex diseases through the interactions of their components, and networks are the means of expressing those interactions. Diseases are rarely the product of a single gene, and the proteins associated with a disease often cluster in the network, which suggests that the disease reflects the disturbance of a module rather than of a single molecule.

Several applications follow. The changes measured in an experiment can be placed on a network to reveal the modules they affect, and the Szklarczyk et al. (2019) resource is one of the sources of interactions for such work. The proteins associated with a disease can be examined for the modules in which they cluster, and a candidate gene can be prioritised by its position near the known disease genes. A network may also suggest a drug target, since a protein central to a disease module is a candidate for intervention, though a candidate is not a target that has been shown to work.

Each application is limited by the data on which it rests. A candidate gene near known disease genes may be near them because the disease genes have been studied intensively, as Barabási and Oltvai (2004) discussed for network structure, and the proximity then reflects the attention rather than the biology. Ioannidis (2005) described how the selection and the flexibility of analysis produce findings that look stronger than the evidence supports, and a prioritisation drawn from a biased network must be checked against independent evidence.

The predictions must be tested. A candidate gene or drug target suggested by a network is a hypothesis, and its value is established by experiment in cells or in patients. A network that suggests many candidates should be judged by the proportion that the experiments confirm, not by the number suggested.

Sandve et al. (2013) recommended recording the inputs and steps of an analysis, and the network source, its version, the threshold and the disease annotation are the inputs of a network-based medical claim.
