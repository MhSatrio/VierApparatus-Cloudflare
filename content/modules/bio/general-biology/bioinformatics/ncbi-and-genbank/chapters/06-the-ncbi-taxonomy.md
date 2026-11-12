---
title: "The NCBI Taxonomy"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The NCBI Taxonomy database as a shared list of organism names and identifiers, the taxonomic ID and its use in queries, the lineage of an organism and why the same species can carry different names in different databases, together with the practice of resolving names to taxonomic IDs before comparing datasets."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Resolve a scientific name to its NCBI taxonomic identifier and retrieve its lineage."
  - "Explain why a species name alone is not a reliable key when merging datasets from different sources."
references:
  - "Sayers, E. W., Bolton, E. E., Brister, J. R., Canese, K., Chan, J., Comeau, D. C., Connor, R., Funk, K., Kelly, C., Kim, S., Madej, T., Marchler-Bauer, A., Lanczycki, C., Lathrop, S., Lu, Z., Thibaud-Nissen, F., Murphy, T., Phan, L., Skripchenko, Y., . . . Sherry, S. T. (2022). Database resources of the National Center for Biotechnology Information. Nucleic Acids Research, 50(D1), D20-D26. https://doi.org/10.1093/nar/gkab1112"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
---

The NCBI Taxonomy database is a list of the organisms that appear in the NCBI resources, together with a unique numerical identifier for each, called the taxonomic ID. Sayers et al. (2022) describe the taxonomy as one of the shared resources of the collection, and it is the means by which records from different databases can be tied to the same organism without relying on its name.

Each entry has a lineage, the chain of higher groups to which the organism belongs. The lineage of a species runs through its genus, family and order up to the domain, and the lineage is used to select records by group, for example all the bacteria in a set of records. Alberts et al. (2022) describe the classification of living things into the three domains, and the lineage is the database form of that classification.

Names are a weak key. A species may have several names over time, one may be a synonym of another, and the same name may be used for different organisms in different fields. An analysis that merges datasets by name can therefore join records that describe different organisms, or fail to join records that describe the same one. Converting every name to its taxonomic ID before merging avoids both errors.

The taxonomy changes as the classification changes. A species may be moved to a new genus, and the taxonomic ID stays the same while the name and the lineage change. The version of the taxonomy used should be recorded for the same reason as the version of the sequence records.

Wilkinson et al. (2016) recommended that identifiers be used in place of names where they exist, and the taxonomic ID is the identifier that serves this purpose for organisms.
