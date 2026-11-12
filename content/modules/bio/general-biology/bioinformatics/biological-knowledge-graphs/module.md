---
title: "Biological Knowledge Graphs"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "Biological knowledge graphs that integrate many sources of information about genes, proteins, diseases, drugs and pathways into one graph of typed entities and relations, covering how the graph is built from databases and the literature, how its entities and relations are defined by ontologies, how paths through the graph are queried to generate hypotheses, the prioritisation of candidates such as drug repurposing opportunities and the provenance and evidence that must accompany every edge for a graph-based claim to be checked."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how a biological knowledge graph integrates entities and relations from several sources and what the types of its nodes and edges mean."
  - "Explain how a path through a knowledge graph becomes a hypothesis and what evidence must support it before it is claimed."
references:
  - "Himmelstein, D. S., Lizee, A., Hessler, C., Brueggeman, L., Chen, S. L., Hadley, D., Green, A., Khankhanian, P., & Baranzini, S. E. (2017). Systematic integration of biomedical knowledge prioritizes drugs for repurposing. eLife, 6, e26726. https://doi.org/10.7554/eLife.26726"
  - "Szklarczyk, D., Gable, A. L., Lyon, D., Junge, A., Wyder, S., Huerta-Cepas, J., Simonovic, M., Doncheva, N. T., Morris, J. H., Bork, P., Jensen, L. J., & von Mering, C. (2019). STRING v11: protein-protein association networks with increased coverage, supporting functional discovery in genome-wide experimental datasets. Nucleic Acids Research, 47(D1), D607-D613. https://doi.org/10.1093/nar/gky1131"
  - "Barabási, A.-L., & Oltvai, Z. N. (2004). Network biology: understanding the cell's functional organization. Nature Reviews Genetics, 5(2), 101-113. https://doi.org/10.1038/nrg1272"
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A biological knowledge graph joins many sources into one structure. Its nodes are typed entities such as genes, proteins, diseases, compounds and pathways, and its edges are typed relations such as binds, treats, causes or is part of. Himmelstein et al. (2017) describe a graph of this kind assembled from many biomedical databases, and they used paths through it to rank existing drugs as candidates for diseases they were not approved for. The graph turns a collection of separate records into a network that can be searched for connections no single source contains.

The topic follows the life of such a graph. It begins with how the graph is assembled from its sources, with the typing of entities and relations that makes the assembly coherent. The protein interaction and association resources, such as the one described by Szklarczyk et al. (2019), supply some of the edges. The querying of paths and the prioritisation of candidates come next, and the final chapters address the evidence, the provenance and the reporting that a graph-based claim requires.

A graph gives connections, and a connection is not a mechanism. Barabási and Oltvai (2004) described the network view of the cell, and the graph of knowledge inherits both the value and the limits of that view. A path between a drug and a disease records that a chain of relations exists in the sources, and the claim that the drug treats the disease needs evidence beyond the path.
