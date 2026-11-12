---
title: "Entities, Relations and Ontologies"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How the entities and relations of a biological knowledge graph are defined and named, the role of ontologies and controlled vocabularies in giving each entity a single identifier that different sources can share, the mapping of source identifiers to the graph's identifiers, the typing of relations with their directions and their meanings and the errors that arise when the same entity is represented by several identifiers or when a relation is used with two different meanings."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain why a knowledge graph needs a shared identifier for each entity and how an ontology provides one."
  - "Identify the errors that follow when one entity has several identifiers or one relation is used with two meanings."
references:
  - "Himmelstein, D. S., Lizee, A., Hessler, C., Brueggeman, L., Chen, S. L., Hadley, D., Green, A., Khankhanian, P., & Baranzini, S. E. (2017). Systematic integration of biomedical knowledge prioritizes drugs for repurposing. eLife, 6, e26726. https://doi.org/10.7554/eLife.26726"
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
  - "Benson, D. A., Cavanaugh, M., Clark, K., Karsch-Mizrachi, I., Lipman, D. J., Ostell, J., & Sayers, E. W. (2012). GenBank. Nucleic Acids Research, 41(D1), D36-D42. https://doi.org/10.1093/nar/gks1195"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

An entity in a knowledge graph must have one identifier that every source can map to. Without this, the same gene may appear as a symbol in one source, a protein accession in a second and an Ensembl identifier in a third, and the graph would count them as three genes. Ontologies and controlled vocabularies provide the shared identifiers. They define a term, give it a stable code and relate it to other terms, and a graph that uses them can join records from many sources that use different names for the same thing. The accession numbers of sequence archives, described by Benson et al. (2012), are one form of such identifier.

Mapping the source identifiers to the graph's identifiers is a substantial task. A source may use a symbol that is ambiguous, an identifier that has been retired or a term that is more general than the graph's. The mapping must be recorded, and the number of records that failed to map should be reported, since unmapped records are missing from the graph and bias any result drawn from it.

Relations are typed and directed. A relation such as encodes runs from a gene to a protein, and treats runs from a drug to a disease. The direction matters, since reversing a treatment relation to a disease relation changes its meaning entirely. A relation with two meanings, such as associated with, used for both a causal link and a correlation, will produce false paths, and the graph should separate relations by their meaning.

Himmelstein et al. (2017) integrated many biomedical sources with such typing, and the consistency of identifiers and relations was the condition for their paths to mean anything. Wilkinson et al. (2016) set out the FAIR principles, in which data should use shared vocabularies and identifiers, and the ontology is the means of meeting that principle for a knowledge graph.

Sandve et al. (2013) recommended recording the identifiers, the mappings and the versions of the vocabularies used, since a graph built with one version of an ontology may not join correctly with another.
