---
title: "Linking Proteins to Pathways"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How a list of identified or changed proteins is connected to pathways and protein interaction networks, the use of interaction databases with confidence scores, the enrichment of pathway terms against a background of measured proteins, the problem that well-studied proteins attract more annotation and interaction data than others and the cautions needed before a network module is read as a functional unit."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Map a list of proteins onto interaction and pathway resources and state the background against which any enrichment is measured."
  - "Explain how annotation bias in interaction databases can make some pathways look more active than they are."
references:
  - "Szklarczyk, D., Gable, A. L., Lyon, D., Junge, A., Wyder, S., Huerta-Cepas, J., Simonovic, M., Doncheva, N. T., Morris, J. H., Bork, P., Jensen, L. J., & von Mering, C. (2019). STRING v11: protein-protein association networks with increased coverage, supporting functional discovery in genome-wide experimental datasets. Nucleic Acids Research, 47(D1), D607-D613. https://doi.org/10.1093/nar/gky1131"
  - "Aebersold, R., & Mann, M. (2016). Mass-spectrometric exploration of proteome structure and function. Nature, 537(7620), 347-355. https://doi.org/10.1038/nature19949"
  - "Barabási, A.-L., & Oltvai, Z. N. (2004). Network biology: understanding the cell's functional organization. Nature Reviews Genetics, 5(2), 101-113. https://doi.org/10.1038/nrg1272"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A list of proteins is most useful when it is connected to what the proteins do together. Interaction databases record which proteins bind or act on one another, and pathway resources group proteins by the process in which they take part. Szklarczyk et al. (2019) describe STRING, a resource of protein association networks that combines evidence from several sources and gives each association a confidence score, and the connections it provides allow a list of proteins to be read as a network.

The network view is a hypothesis about function. Barabási and Oltvai (2004) described how the organisation of biological networks can reveal modules of proteins that work together, and a dense group of interacting proteins in a list is a candidate for a shared process. The module is a claim about the network as it is recorded, and it inherits the biases of the data from which the network was built.

The most serious bias is uneven study. Well-studied proteins have many recorded interactions and many annotations, while poorly studied ones have few. A pathway that contains many well-studied proteins will look connected and active in a list of identified proteins, whether or not it is more active in the sample. Aebersold and Mann (2016) describe the proteome-wide measurements that could reduce this bias, but the interaction data remain uneven, and a result must be checked against the number of annotations behind each pathway.

Enrichment of pathway terms must be measured against a background. The background should be the set of proteins that could have been detected in the experiment, not all proteins in the organism, since proteins that the method cannot detect would otherwise make every pathway look enriched. The choice of background is the same issue as in transcriptomics, and it changes the result in the same way.

Ioannidis (2005) described how a result that is selected from many candidates can overstate its meaning, and the same applies to the pathways that a list is found to match. The pathways tested, their number, the background and the correction for multiple testing must be reported with the enrichment.

Sandve et al. (2013) recommended that the data and the resources used in an analysis be recorded, and the versions of the interaction database and the confidence threshold belong to that record.
