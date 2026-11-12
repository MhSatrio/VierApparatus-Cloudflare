---
title: "Network Biology"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The representation and analysis of biological systems as networks, covering the graphs of molecular interactions, the sources and reliability of interaction data, the measures that describe nodes and modules, the visualisation of networks, the enrichment of network modules for function and the use of network structure to interpret perturbations, with the cautions that arise from uneven study of the molecules and from the simplification of biology into graphs."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Represent a set of molecular interactions as a graph and compute the basic measures of its nodes and modules."
  - "Explain how uneven study of molecules and the source of the interaction data can shape the structure that a network analysis finds."
references:
  - "Barabási, A.-L., & Oltvai, Z. N. (2004). Network biology: understanding the cell's functional organization. Nature Reviews Genetics, 5(2), 101-113. https://doi.org/10.1038/nrg1272"
  - "Kitano, H. (2002). Systems Biology: A Brief Overview. Science, 295(5560), 1662-1664. https://doi.org/10.1126/science.1069492"
  - "Shannon, P., Markiel, A., Ozier, O., Baliga, N. S., Wang, J. T., Ramage, D., Amin, N., Schwikowski, B., & Ideker, T. (2003). Cytoscape: A Software Environment for Integrated Models of Biomolecular Interaction Networks. Genome Research, 13(11), 2498-2504. https://doi.org/10.1101/gr.1239303"
  - "Szklarczyk, D., Gable, A. L., Lyon, D., Junge, A., Wyder, S., Huerta-Cepas, J., Simonovic, M., Doncheva, N. T., Morris, J. H., Bork, P., Jensen, L. J., & von Mering, C. (2019). STRING v11: protein-protein association networks with increased coverage, supporting functional discovery in genome-wide experimental datasets. Nucleic Acids Research, 47(D1), D607-D613. https://doi.org/10.1093/nar/gky1131"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A cell is a network of molecules: proteins bind one another, genes regulate genes and metabolites are converted by enzymes. Network biology represents these relationships as graphs and asks what their structure reveals about the organisation of the cell. Barabási and Oltvai (2004) describe the aim of the field, which is to understand the cell's functional organisation through the patterns of its connections, and Kitano (2002) placed the approach within the wider effort of systems biology.

The topic follows the path from the data to the interpretation. It begins with the representation of interactions as graphs, then turns to the sources of interaction data, of which Szklarczyk et al. (2019) describe a major resource with confidence scores. The measures that describe nodes and modules come next, followed by the visualisation of networks in Cytoscape, which Shannon et al. (2003) introduced as a software environment for such models. The later chapters address enrichment, perturbation and the limits of the approach.

Networks are a simplification, and their conclusions depend on what the graph includes. The interaction data are uneven, since well-studied proteins have many recorded links, and the structure of a network partly reflects where the experiments have looked. Ioannidis (2005) described how such selection can make findings look stronger than they are, and a network analysis must keep the bias of its data in view.
