---
title: "Reporting a Knowledge Graph"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "What a report of a biological knowledge graph and of the analyses performed on it must contain, including the sources and their versions, the build rules and filters, the identifier mappings and the number of unmapped records, the typed queries and the weighting of paths, the evaluation of any prediction with its hold-out design and the deposition of the graph in a standard format with the code that builds and queries it."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "List the information a knowledge graph report must contain for another group to rebuild the graph and repeat its queries."
  - "Deposit the graph in a standard format with its build code and its provenance so that its claims can be checked."
references:
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Himmelstein, D. S., Lizee, A., Hessler, C., Brueggeman, L., Chen, S. L., Hadley, D., Green, A., Khankhanian, P., & Baranzini, S. E. (2017). Systematic integration of biomedical knowledge prioritizes drugs for repurposing. eLife, 6, e26726. https://doi.org/10.7554/eLife.26726"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A knowledge graph is a compilation, and its value to others depends on whether they can rebuild it and check the claims made from it. Peng (2011) argued that the means of reproducing a computational result must accompany it, and for a graph these means are the sources, the build rules and the queries. A report that presents a ranking of candidates without the graph that produced it cannot be assessed, since the ranking depends on choices that the reader cannot see.

The sources are the first item. Each source should be listed with its version and the date of retrieval, since the graph changes as the sources are updated. Wilkinson et al. (2016) set out the principles under which the inputs of a dataset should be identified and described, and the source versions are the identifiers of the graph's inputs.

The build rules are the second item. The identifier mappings, the number of records that failed to map, the merging rules, the score thresholds and the filters applied should be reported. These decisions determine which entities and relations the graph contains, and a reader who wants to compare two graphs needs them.

The queries and the evaluation are the third item. The typed path patterns, the weighting of paths, the held-out design of any prediction and the evaluation measure should be stated. Himmelstein et al. (2017) evaluated their predictions against known indications, and such an evaluation must be reported with the method that produced it.

The deposition is the fourth item. The graph should be placed in a standard format in a public archive with an identifier, together with the code that builds and queries it. Sandve et al. (2013) recommended keeping the outputs of an analysis with its inputs and steps, and a deposited graph with its build code allows the claims to be rebuilt and tested.
