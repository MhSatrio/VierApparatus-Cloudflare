---
title: "Recording NCBI Data in an Analysis"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "What an analysis must record about the NCBI data it used so that another person can repeat the retrieval and reach the same records, including the database name, the exact query, the date of retrieval, the accession and version of each record, the taxonomic identifiers and the scripts that produced the dataset."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "List the information that must accompany a dataset built from NCBI records."
  - "Produce a retrieval record that another person could use to rebuild the dataset exactly."
references:
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
  - "Sayers, E. W., Bolton, E. E., Brister, J. R., Canese, K., Chan, J., Comeau, D. C., Connor, R., Funk, K., Kelly, C., Kim, S., Madej, T., Marchler-Bauer, A., Lanczycki, C., Lathrop, S., Lu, Z., Thibaud-Nissen, F., Murphy, T., Phan, L., Skripchenko, Y., . . . Sherry, S. T. (2022). Database resources of the National Center for Biotechnology Information. Nucleic Acids Research, 50(D1), D20-D26. https://doi.org/10.1093/nar/gkab1112"
---

A dataset built from NCBI records is only as useful as the record of how it was built. The records change, the search results change with the date, and a dataset assembled by hand leaves no trace of its steps. The purpose of this chapter is to set out what an analysis must write down, so that the dataset can be rebuilt from the same sources by someone who was not involved in the first build.

The first item is the database and the query. The name of the database, the exact text of each query, the field tags and the date range should be written in full. Sayers et al. (2022) describe the collection that each query is run against, and the database name identifies which part of it was used.

The second item is the set of records. Each sequence should be listed with its accession and version, its length and its organism, together with the taxonomic identifier. The date of retrieval should be recorded, since the records may be revised after it. A table of these fields is the most useful single document an analysis can provide.

The third item is the procedure. The script that retrieved the records, the version of the script, the software used and the environment in which it ran belong with the dataset. Sandve et al. (2013) recommended that every step of an analysis be recorded in this way, and a retrieval script with its parameters is the clearest form of that record.

The fourth item is the access and reuse condition. The records in the NCBI collection are freely available, and their reuse is governed by the terms the NCBI publishes. The analysis should state that the records were obtained from the public archive and that the terms were followed.

Wilkinson et al. (2016) set out the FAIR principles, in which a dataset is findable and reusable only when its identifiers, its provenance and its access conditions are described. A retrieval record that contains these four items meets that standard for a dataset built from NCBI records.
