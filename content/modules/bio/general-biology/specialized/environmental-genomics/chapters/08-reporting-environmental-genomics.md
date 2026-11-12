---
title: "Reporting Environmental Genomics"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "What an environmental genomics report must contain for its species lists and its functional claims to be reproduced and judged, including the habitat, the sampling design and the number of replicates, the collection, preservation and extraction methods, the marker or the sequencing approach, the primers and their coverage, the controls and their results, the bioinformatic pipeline with its version and parameters, the reference database and its version, the assignment confidence and the detection probabilities, and the deposition of the raw reads and the analysis code."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "List the sampling, marker, control, pipeline and database details that an environmental genomics report must give for a survey to be reproduced."
  - "Report a species list with its detection probabilities, its controls and the errors that could affect it."
references:
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Taberlet, P., Coissac, E., Pompanon, F., Brochmann, C., & Willerslev, E. (2012). Towards next-generation biodiversity assessment using DNA metabarcoding. Molecular Ecology, 21(8), 2045-2050. https://doi.org/10.1111/j.1365-294X.2012.05470.x"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

An environmental genomics survey can be reproduced and judged only if every step from the field to the species list is reported. The habitat, the sampling design and the number of replicates should be stated first, since they determine which organisms can be detected and how confidently absence can be claimed. Peng (2011) argued that a result is reproducible only with the means of producing it, and for a survey those means include the samples, the chemistry and the software.

The methods of collection, preservation and extraction should be reported, along with the marker or sequencing approach, the primers and their coverage of the target groups. Taberlet et al. (2012) showed that the choice of primers strongly affects the taxa detected, so the primers must be reported with their known biases. The controls and their results should be given, since they show the contamination that the survey must exclude.

The bioinformatic pipeline should be reported with its version and parameters, and the reference database with its version. The confidence of each assignment and the detection probabilities for each species should be given, since a species list without these is incomplete. Cumming (2014) argues that the abundances and the detection probabilities should be shown with their intervals, and Ioannidis (2005) described how a species list from a single pipeline may hide errors that a second pipeline would reveal.

The raw reads and the analysis code should be deposited with identifiers. Sandve et al. (2013) recommended keeping the inputs, steps and outputs of an analysis together, so that the species list can be regenerated and its claims checked by others.
