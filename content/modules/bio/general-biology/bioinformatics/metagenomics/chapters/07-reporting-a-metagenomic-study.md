---
title: "Reporting a Metagenomic Study"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "What a report of a metagenomic study must contain for its results to be compared and repeated, including the sampling and extraction methods, the sequencing platform and depth, the controls and their outcomes, the reference databases and their versions, the profiling and binning methods with their thresholds, the quality of the recovered genomes and the deposition of the reads and assemblies with their accessions."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "List the information a metagenomic study must report so that its profile and its genomes can be compared with other studies."
  - "Write a methods section for a metagenomic study that states its controls and the limits of its reference data."
references:
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Quince, C., Walker, A. W., Simpson, J. T., Loman, N. J., & Segata, N. (2017). Shotgun metagenomics, from sampling to analysis. Nature Biotechnology, 35(9), 833-844. https://doi.org/10.1038/nbt.3935"
  - "Taschuk, M., & Wilson, G. (2017). Ten simple rules for making research software more robust. PLOS Computational Biology, 13(4), e1005412. https://doi.org/10.1371/journal.pcbi.1005412"
---

A metagenomic study produces a profile of a community and, often, genomes recovered from it. Peng (2011) argued that the means of reproducing a result must accompany it, and for a metagenome the means are many: the sampling, the extraction, the controls, the sequencing, the reference data and the software. Quince et al. (2017) describe the chain of decisions that links a sample to a result, and the report must make each link visible, since the result cannot be interpreted without them.

The sample and its processing come first. The site, the date, the sampling method, the extraction protocol and the sequencing platform and depth should be stated. The controls, both negative and mock, should be described with their outcomes, since they show the contamination and bias that the study has to account for.

The analysis comes second. The reference databases and their versions, the profiling method with its marker set, the binning method with its thresholds and the functional annotation with its matching criteria should be stated. Taschuk and Wilson (2017) recommended that the software of an analysis be documented and tested, and the versions of the tools are part of the documentation.

The results must include the quality of what was recovered. Each genome should be reported with its completeness, its contamination and its class, and each profile with the reference set on which it depends. A result without these measures cannot be placed beside other studies.

The data must be deposited. The raw reads, the assemblies and the recovered genomes should be placed in public archives with accessions, so that others can reanalyse them. Wilkinson et al. (2016) set out the principles under which such deposition makes data findable and reusable, and a deposited dataset with its methods is the complete form of a metagenomic study.
