---
title: "Building a Graph from Sources"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The practical construction of a biological knowledge graph from its sources, including the choice of sources and their versions, the extraction of entities and relations from databases and from curated resources such as the protein association network of STRING, the merging of duplicate nodes, the scoring and filtering of edges by their evidence and the record of each build so that a graph can be rebuilt and compared with earlier versions."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the steps by which a knowledge graph is built from several sources, including the merging of duplicate nodes."
  - "Explain why the record of each build, with its source versions and filters, is needed to rebuild and compare the graph."
references:
  - "Szklarczyk, D., Gable, A. L., Lyon, D., Junge, A., Wyder, S., Huerta-Cepas, J., Simonovic, M., Doncheva, N. T., Morris, J. H., Bork, P., Jensen, L. J., & von Mering, C. (2019). STRING v11: protein-protein association networks with increased coverage, supporting functional discovery in genome-wide experimental datasets. Nucleic Acids Research, 47(D1), D607-D613. https://doi.org/10.1093/nar/gky1131"
  - "Himmelstein, D. S., Lizee, A., Hessler, C., Brueggeman, L., Chen, S. L., Hadley, D., Green, A., Khankhanian, P., & Baranzini, S. E. (2017). Systematic integration of biomedical knowledge prioritizes drugs for repurposing. eLife, 6, e26726. https://doi.org/10.7554/eLife.26726"
  - "Taschuk, M., & Wilson, G. (2017). Ten simple rules for making research software more robust. PLOS Computational Biology, 13(4), e1005412. https://doi.org/10.1371/journal.pcbi.1005412"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A knowledge graph is built by a pipeline that reads each source, converts its records into the graph's entities and relations, merges the entities that refer to the same thing and writes the result. The choice of sources comes first, since each contributes its own kinds of relation and its own errors. A resource of protein associations, such as the one described by Szklarczyk et al. (2019), contributes edges with confidence scores, and a database of curated drug indications contributes edges of another type. The sources must be chosen for the question the graph is meant to answer.

Each source is parsed into the graph's vocabulary, and the duplicates are merged. The same protein may appear in several sources under different identifiers, and a merge step identifies the records that refer to one entity and assigns them one node. The merge is a source of error: two distinct genes with similar names may be merged wrongly, and a gene split by a source may be left as two nodes. The number of merges and the rule used should be recorded.

Edges are scored and filtered by their evidence. A score threshold removes weak associations, and the threshold changes the graph and the paths that can be found through it. Taschuk and Wilson (2017) recommended that research software be tested, and a graph build should be checked for the expected counts of nodes and edges and for the presence of known relations.

Himmelstein et al. (2017) built their graph by integrating many sources and by recording how each contributed, which is what allows the graph to be assessed. The build record, with the versions of the sources, the rules for merging and the thresholds for filtering, is the means of rebuilding the graph and comparing it with earlier versions.

Sandve et al. (2013) recommended recording the steps of an analysis, and the build record is the record of how the graph came to be.
