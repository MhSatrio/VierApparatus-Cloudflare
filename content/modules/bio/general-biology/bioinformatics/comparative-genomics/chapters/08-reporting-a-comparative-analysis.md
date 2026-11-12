---
title: "Reporting a Comparative Analysis"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "What a report of a comparative genomics study must contain, including the genomes compared with their accessions and versions, the assembly and annotation pipeline applied to each, the alignment and orthology methods with their thresholds, the controls performed, the tests used for selection and gene family change with their corrections and the deposition of the derived data so that the comparison can be repeated and judged."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "List the information a comparative genomics report must contain for its comparison to be repeated."
  - "Write a comparative report that states the controls performed and the limits of its sampling."
references:
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Taschuk, M., & Wilson, G. (2017). Ten simple rules for making research software more robust. PLOS Computational Biology, 13(4), e1005412. https://doi.org/10.1371/journal.pcbi.1005412"
---

A comparative genomics result is a claim about the differences between genomes, and it can be checked only if the reader knows which genomes were compared and how. Peng (2011) argued that the means of reproducing a computational result must accompany it, and for a comparison this means the genomes, the pipeline, the thresholds and the tests. A report that gives the differences without these details asks the reader to accept them on trust, which is the opposite of what a comparison should provide.

The genomes are the first item. Each should be listed with its assembly accession, its annotation release and the date of retrieval, since the comparison is only as reliable as the inputs. The sampling of species and its phylogeny should be stated, because the interpretation of every shared or unique feature depends on it.

The methods are the second item. The pipeline used to make each annotation, the alignment and orthology methods, their thresholds and the software versions must be recorded, so that the comparison can be rerun. Wilkinson et al. (2016) set out the principles under which these inputs should be identified and described, and the deposition of the derived data with its identifiers supports them.

The controls and tests are the third item. The consistency checks, the checks for absent genes and the tests for selection or family change should be reported with their outcomes and with the corrections applied for multiple comparisons. Taschuk and Wilson (2017) recommended that research software be tested, and a comparison whose controls are reported is one whose results can be trusted.

The derived data are the fourth item. The orthology clusters, the alignments and the tables of results should be deposited with the report, so that a reader can examine the claims without repeating the computation. Sandve et al. (2013) recommended that the outputs of an analysis be kept with its inputs and steps, and the deposited data complete that record.
