---
title: "Retrieving Sequences Programmatically"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How to retrieve many NCBI records by script rather than by hand, using the Entrez programming utilities, how the request rate limits are kept within the published policy, how records are fetched in batches and saved in standard formats and how a retrieval script checks its own output so that a failed request is not mistaken for a successful one."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Write a script that retrieves a list of accessions in batches and saves the records in FASTA format."
  - "Keep a retrieval script within the request limits of the NCBI and detect failed or empty responses."
references:
  - "Sayers, E. W., Bolton, E. E., Brister, J. R., Canese, K., Chan, J., Comeau, D. C., Connor, R., Funk, K., Kelly, C., Kim, S., Madej, T., Marchler-Bauer, A., Lanczycki, C., Lathrop, S., Lu, Z., Thibaud-Nissen, F., Murphy, T., Phan, L., Skripchenko, Y., . . . Sherry, S. T. (2022). Database resources of the National Center for Biotechnology Information. Nucleic Acids Research, 50(D1), D20-D26. https://doi.org/10.1093/nar/gkab1112"
  - "Taschuk, M., & Wilson, G. (2017). Ten simple rules for making research software more robust. PLOS Computational Biology, 13(4), e1005412. https://doi.org/10.1371/journal.pcbi.1005412"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Retrieving records by hand works for a few sequences, but a study may need several thousand. The NCBI provides the Entrez programming utilities for this purpose. They accept a request for a set of identifiers and return the records in a chosen format, and a script can make many such requests in sequence. Sayers et al. (2022) describe the resources that these utilities serve, and the same identifiers and formats apply to the scripted and the interactive use.

The NCBI publishes a policy on request rates. Without an API key, a script should make no more than three requests per second, and with a registered key the limit is higher. A script that exceeds the limit is refused or blocked for a time, so the requests must be spaced, and a registered key should be used for large jobs. The policy is a published rule of the service, and the script should read its current value rather than rely on a number from memory.

Requests are best made in batches. A single request may carry a list of identifiers, which reduces the number of calls and the time they take. The records come back in a standard format such as FASTA, and the script writes them to a file with the accession and version in the header line, so that each sequence keeps its identity.

A retrieval script must check its output. A request can fail, return an error page or return fewer records than requested if an identifier is no longer valid. The script should count the records received, compare the count with the number requested and report any missing identifiers. A file that looks complete but lacks some sequences is a silent error, and the count check is what detects it.

Taschuk and Wilson (2017) recommended that research software handle errors explicitly, and the count check is a practical example of that rule. Sandve et al. (2013) recommended that the retrieval be scripted so that it can be run again, which makes the steps of the dataset reproducible.
