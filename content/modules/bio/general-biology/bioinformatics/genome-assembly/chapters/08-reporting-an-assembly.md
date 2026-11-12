---
title: "Reporting an Assembly"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "What a report of a genome assembly must contain for another group to rebuild and judge it, including the sequencing platforms and read data with their accessions, the assembler and its version and settings, the polishing and scaffolding steps, the quality metrics with the tools that computed them and the deposition of the assembly sequence with its annotation-ready form."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "List the information a genome assembly report must contain for the assembly to be rebuilt from its reads."
  - "Deposit an assembly with its reads and metrics so that another group can check the result without repeating the project."
references:
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Taschuk, M., & Wilson, G. (2017). Ten simple rules for making research software more robust. PLOS Computational Biology, 13(4), e1005412. https://doi.org/10.1371/journal.pcbi.1005412"
---

A genome assembly is a result that many people will use, and it can only be used safely if the report describes how it was made. Peng (2011) argued that the means of reproducing a computational result must accompany it, and for an assembly this means the reads, the software, the settings and the steps that led to the sequence. A report that gives only the final sequence leaves the reader unable to tell which errors are in the data and which were introduced by the method.

The reads are the first item. The platform, the read lengths, the coverage and the accession of the raw data should be given, so that the input can be retrieved and reassembled. Wilkinson et al. (2016) set out the principles by which such data should be findable and accessible, and a deposited read set with an accession meets them.

The software and its settings are the second item. The assembler, its version, the word length or the overlap parameters and the polishing rounds should be listed, since the same reads assembled with different settings give different sequences. A report that omits the settings is one that cannot be reproduced.

The quality metrics are the third item. The contiguity, the completeness and the contamination measures should be reported with the tools used to compute them, and the reference set for any completeness measure should be named. Taschuk and Wilson (2017) recommended that research software be documented so that its results can be checked, and the metrics are the means of checking the assembly.

The assembly itself is the fourth item. The sequence should be deposited in a public archive with its accession, and the report should state which sequence version was described. Sandve et al. (2013) recommended that the outputs of an analysis be retained alongside the inputs and methods, and a deposited assembly with its reads and settings completes the record.
